import json
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)
from app.services.resume_parser import (
    extract_text_from_pdf,
    parse_resume
)
from app.services.ats_service import calculate_ats_score

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Job, User

from app.services.job_match_service import calculate_job_match
from app.services.recommendation_service import recommend_jobs
from app.routes.auth import get_current_user


# =====================================================
# UPLOAD RESUME
# =====================================================

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):
    # =====================================================
    # 1. GET THE ACTUALLY LOGGED-IN USER
    # =====================================================

    user = (
        db.query(User)
        .filter(User.email == current_user_email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Logged-in user not found"
        )

    # =====================================================
    # 2. ONLY JOB SEEKERS CAN UPLOAD
    # =====================================================

    if user.role.lower() not in ["seeker", "jobseeker"]:
        raise HTTPException(
            status_code=403,
            detail="Only job seekers can upload resumes"
        )

    # =====================================================
    # 3. EXTRACT RESUME TEXT
    # =====================================================

    text = extract_text_from_pdf(file)

    # =====================================================
    # 4. PARSE RESUME
    # =====================================================

    resume_data = parse_resume(text)

    # =====================================================
    # 5. SAVE RESUME TO THE AUTHENTICATED USER
    # =====================================================

    user.resume_data = json.dumps(resume_data)
    user.resume_filename = file.filename

    # IMPORTANT:
    # We are using user.id here.
    # There is NO hardcoded user_id = 1.

    db.commit()
    db.refresh(user)

    # =====================================================
    # 6. CALCULATE ATS SCORE
    # =====================================================

    ats_result = calculate_ats_score(resume_data)

    # =====================================================
    # 7. RETURN RESPONSE
    # =====================================================

    return {
        "message": "Resume uploaded and saved successfully",
        "user_id": user.id,
        "filename": file.filename,
        "content_type": file.content_type,
        "resume_data": resume_data,
        **ats_result
    }
# =====================================================
# MATCH RESUME WITH A JOB
# =====================================================

@router.post("/match/{job_id}")
async def match_resume_with_job(
    job_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    # Get job from database
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Parse resume
    text = extract_text_from_pdf(file)
    resume_data = parse_resume(text)

    # Match with job
    match_result = calculate_job_match(
        resume_data,
        job
    )

    return {
        "job_title": job.title,
        "company": job.company.name,
        "resume_data": resume_data,
        **match_result
    }

# =====================================================
# RECOMMEND JOBS
# =====================================================

@router.post("/recommend-jobs")
async def recommend_jobs_route(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    text = extract_text_from_pdf(file)

    resume_data = parse_resume(text)
    jobs = db.query(Job).all()
    recommendations = recommend_jobs(
        resume_data,
        jobs
    )
    return {
        "total_jobs": len(jobs),
        "recommended_jobs": recommendations
    }

# =====================================================
# ATS ANALYSIS
# =====================================================

@router.get("/analysis")
def get_resume_analysis():

    return {
        "ats_score": 86,
        "missing_skills": [
            "Docker",
            "Kubernetes",
            "AWS"
        ],
        "strengths": [
            "Strong React development skills",
            "Good academic performance",
            "Multiple AI & Full Stack projects",
            "Good problem-solving abilities"
        ],
        "suggestions": [
            "Add more measurable achievements.",
            "Include GitHub and LinkedIn profile links.",
            "Mention relevant certifications.",
            "Highlight leadership and extracurricular activities."
        ]
    }