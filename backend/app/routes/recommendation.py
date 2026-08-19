from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Job, SwipeHistory, User
from app.schemas import JobResponse
from app.routes.auth import get_current_user
from app.services.swipe_learning_service import recommend_jobs

import json


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


# =====================================================
# GET RECOMMENDATIONS
# =====================================================

@router.get("/", response_model=list[JobResponse])
def get_recommendations(
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):

    # ==========================================
    # GET LOGGED-IN USER
    # ==========================================

    user = (
        db.query(User)
        .filter(User.email == current_user_email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user_id = user.id

    # ==========================================
    # GET EVERY JOB USER HAS ALREADY SWIPED
    # ==========================================

    all_swipes = (
        db.query(SwipeHistory)
        .filter(SwipeHistory.user_id == user_id)
        .all()
    )

    swiped_job_ids = [
        swipe.job_id
        for swipe in all_swipes
    ]

    # ==========================================
    # GET LIKED JOBS
    # ==========================================

    liked_swipes = (
        db.query(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "LIKE"
        )
        .all()
    )

    liked_job_ids = [
        swipe.job_id
        for swipe in liked_swipes
    ]

    # ==========================================
    # NO LIKES YET
    # ==========================================

    if not liked_job_ids:

        query = db.query(Job)

        if swiped_job_ids:
            query = query.filter(
                ~Job.id.in_(swiped_job_ids)
            )

        return query.all()

    # ==========================================
    # GET UNSWIPED JOBS
    # ==========================================

    query = db.query(Job)

    if swiped_job_ids:
        query = query.filter(
            ~Job.id.in_(swiped_job_ids)
        )

    remaining_jobs = query.all()

    # ==========================================
    # PERSONALIZED RECOMMENDATIONS
    # ==========================================

    recommended_jobs = recommend_jobs(
        user_id=user_id,
        jobs=remaining_jobs,
        db=db
    )

    # ==========================================
    # FALLBACK
    # ==========================================

    if not recommended_jobs:
        return remaining_jobs

    return recommended_jobs


# =====================================================
# RECOMMENDATION INSIGHTS
# =====================================================

@router.get("/insights")
def recommendation_insights(
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):

    # ==========================================
    # GET LOGGED-IN USER
    # ==========================================

    user = (
        db.query(User)
        .filter(User.email == current_user_email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user_id = user.id

    # ==========================================
    # GET LIKED JOBS
    # ==========================================

    liked_swipes = (
        db.query(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "LIKE"
        )
        .all()
    )

    liked_job_ids = [
        swipe.job_id
        for swipe in liked_swipes
    ]

    if liked_job_ids:

        liked_jobs = (
            db.query(Job)
            .filter(Job.id.in_(liked_job_ids))
            .all()
        )

    else:

        liked_jobs = []

    # ==========================================
    # CATEGORY KEYWORDS
    # ==========================================

    categories = {
        "AI": [
            "ai",
            "artificial intelligence",
            "gen ai",
            "generative ai",
            "llm",
            "llms",
            "rag",
            "langchain"
        ],

        "ML": [
            "machine learning",
            "ml",
            "tensorflow",
            "pytorch",
            "scikit-learn",
            "deep learning",
            "nlp",
            "numpy",
            "pandas"
        ],

        "Developer": [
            "developer",
            "software",
            "backend",
            "frontend",
            "full stack",
            "fullstack",
            "react",
            "javascript",
            "fastapi",
            "next.js"
        ]
    }

    # ==========================================
    # ANALYZE LIKED JOBS
    # ==========================================

    recommendation_categories = {
        "AI": 0,
        "ML": 0,
        "Developer": 0
    }

    for job in liked_jobs:

        job_text = " ".join([
            job.title or "",
            job.description or "",
            job.skills or ""
        ]).lower()

        for category, keywords in categories.items():

            if any(
                keyword in job_text
                for keyword in keywords
            ):
                recommendation_categories[category] += 1

    # ==========================================
    # ANALYZE RESUME
    # ==========================================

    resume_categories = {
        "AI": 0,
        "ML": 0,
        "Developer": 0
    }

    if user.resume_data:

        try:

            resume_data = json.loads(
                user.resume_data
            )

            resume_text = " ".join([
                str(resume_data.get("name", "")),
                " ".join(
                    resume_data.get("skills", [])
                ),
                " ".join(
                    resume_data.get("projects", [])
                ),
                " ".join(
                    resume_data.get("experience", [])
                )
            ]).lower()

            for category, keywords in categories.items():

                for keyword in keywords:

                    if keyword in resume_text:
                        resume_categories[category] += 1

        except Exception as e:

            print(
                f"Resume analysis failed for user "
                f"{user_id}: {e}"
            )

    # ==========================================
    # FIND TOP CATEGORY
    # ==========================================

    if any(recommendation_categories.values()):

        top_category = max(
            recommendation_categories,
            key=recommendation_categories.get
        )

    elif any(resume_categories.values()):

        top_category = max(
            resume_categories,
            key=resume_categories.get
        )

    else:

        top_category = None

    # ==========================================
    # MESSAGE
    # ==========================================

    if liked_jobs:

            message = (
        f"Your job preferences are currently most aligned "
        f"with {top_category} roles."
    )

    else:

        message = (
        f"Your resume is strongly aligned with "
        f"{top_category} roles. "
        f"Start swiping on jobs to improve personalized "
        f"recommendations."
    )

    # ==========================================
    # RETURN
    # ==========================================

    return {
        "user_id": user_id,
        "total_liked_jobs": len(liked_jobs),
        "recommendation_categories": recommendation_categories,
        "resume_categories": resume_categories,
        "top_category": top_category,
        "message": message
    }