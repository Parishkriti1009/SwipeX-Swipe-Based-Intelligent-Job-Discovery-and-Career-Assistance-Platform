from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from datetime import datetime, timedelta
from app.routes.auth import get_current_user
from fastapi import HTTPException
from app.models import (
    User,
    Company,
    Job,
    SavedJob,
    SwipeHistory,
    Application
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

# =====================================================
# JOB SEEKER DASHBOARD
# =====================================================

@router.get("/jobseeker")
def jobseeker_dashboard(
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):

    # Find logged-in user
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

    # =====================================================
    # APPLICATION COUNTS
    # =====================================================

    total_applications = (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .count()
    )

    applied = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Applied"
        )
        .count()
    )

    shortlisted = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Shortlisted"
        )
        .count()
    )

    interview = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Interview"
        )
        .count()
    )

    accepted = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Accepted"
        )
        .count()
    )

    rejected = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.status == "Rejected"
        )
        .count()
    )

    # =====================================================
    # TIME BASED APPLICATIONS
    # =====================================================

    now = datetime.utcnow()

    week_start = now - timedelta(days=7)
    month_start = now - timedelta(days=30)

    applications_this_week = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.applied_at >= week_start
        )
        .count()
    )

    applications_this_month = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.applied_at >= month_start
        )
        .count()
    )

    # =====================================================
    # SUCCESS RATE
    # =====================================================

    if total_applications > 0:
        success_rate = round(
            (accepted / total_applications) * 100,
            2
        )
    else:
        success_rate = 0

    # =====================================================
    # EXISTING DASHBOARD DATA
    # =====================================================

    saved_jobs = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == user_id)
        .count()
    )

    liked_jobs = (
        db.query(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "LIKE"
        )
        .count()
    )

    skipped_jobs = (
        db.query(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "SKIP"
        )
        .count()
    )

    total_jobs = db.query(Job).count()

    # =====================================================
    # RETURN DASHBOARD DATA
    # =====================================================

    return {
        "user_id": user_id,

        "applications": {
            "total": total_applications,
            "applied": applied,
            "shortlisted": shortlisted,
            "interview": interview,
            "accepted": accepted,
            "rejected": rejected
        },

        "time_based": {
            "this_week": applications_this_week,
            "this_month": applications_this_month
        },

        "success_rate": success_rate,

        "job_activity": {
            "saved_jobs": saved_jobs,
            "liked_jobs": liked_jobs,
            "skipped_jobs": skipped_jobs,
            "total_jobs": total_jobs
        }
    }

# =====================================================
# RECRUITER DASHBOARD
# =====================================================

@router.get("/recruiter/{company_id}")
def recruiter_dashboard(
    company_id: int,
    db: Session = Depends(get_db)
):

    posted_jobs = (
        db.query(Job)
        .filter(Job.company_id == company_id)
        .count()
    )

    return {
        "posted_jobs": posted_jobs,
        "active_jobs": posted_jobs
    }

# =====================================================
# ADMIN DASHBOARD
# =====================================================

@router.get("/admin")
def admin_dashboard(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    recruiters = (
        db.query(User)
        .filter(User.role == "recruiter")
        .count()
    )

    companies = db.query(Company).count()

    jobs = db.query(Job).count()

    saved_jobs = db.query(SavedJob).count()

    swipes = db.query(SwipeHistory).count()

    return {
        "total_users": total_users,
        "recruiters": recruiters,
        "companies": companies,
        "jobs": jobs,
        "saved_jobs": saved_jobs,
        "total_swipes": swipes
    }

# =====================================================
# RESUME PERFORMANCE TRACKING
# =====================================================

@router.get("/resume-performance/{user_id}")
def resume_performance(
    user_id: int,
    db: Session = Depends(get_db)
):

    # Check user
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        return {
            "error": "User not found"
        }

    # Get all applications of this user
    applications = (
        db.query(Application)
        .filter(Application.user_id == user_id)
        .all()
    )

    total_applications = len(applications)

    # Count statuses
    applied = 0
    shortlisted = 0
    rejected = 0
    accepted = 0
    interview = 0

    for application in applications:

        status = application.status.lower()

        if status == "applied":
            applied += 1

        elif status == "shortlisted":
            shortlisted += 1

        elif status == "rejected":
            rejected += 1

        elif status == "accepted":
            accepted += 1

        elif status == "interview":
            interview += 1

    # Screening / progression rate
    if total_applications > 0:
        screening_success_rate = round(
            (
                shortlisted
                + interview
                + accepted
            )
            / total_applications * 100,
            2
        )
    else:
        screening_success_rate = 0

    # Overall performance
    if screening_success_rate >= 60:
        performance = "Excellent"

    elif screening_success_rate >= 40:
        performance = "Good"

    elif screening_success_rate >= 20:
        performance = "Average"

    else:
        performance = "Needs Improvement"

    # Suggestions
    suggestions = []

    if rejected > shortlisted:
        suggestions.append(
            "Your rejection rate is high. Consider improving resume relevance and tailoring it to job descriptions."
        )

    if shortlisted == 0 and total_applications > 0:
        suggestions.append(
            "Your resume is not getting shortlisted frequently. Consider improving ATS keywords and matching job skills."
        )

    if total_applications == 0:
        suggestions.append(
            "Apply to more jobs to generate resume performance insights."
        )

    if shortlisted > 0:
        suggestions.append(
            "Your resume is getting shortlisted. Continue targeting jobs matching your technical skills."
        )

    return {
        "user_id": user_id,

        "resume_uploaded": user.resume_data is not None,

        "total_applications": total_applications,

        "applications": {
            "applied": applied,
            "shortlisted": shortlisted,
            "interview": interview,
            "accepted": accepted,
            "rejected": rejected
        },

        "screening_success_rate": screening_success_rate,

        "performance": performance,

        "suggestions": suggestions
    }
# =====================================================
# HIRING VISUALISATION
# =====================================================

# =====================================================
# HIRING VISUALISATION
# =====================================================

@router.get("/hiring-visualisation")
def hiring_visualisation(
    db: Session = Depends(get_db)
):

    # -------------------------------------------------
    # 1. MOST DEMANDED JOB ROLES
    # -------------------------------------------------

    job_role_counts = (
        db.query(
            Job.title,
            func.count(Job.id).label("count")
        )
        .group_by(Job.title)
        .order_by(func.count(Job.id).desc())
        .all()
    )

    hiring_trends = [
        {
            "label": title,
            "value": count
        }
        for title, count in job_role_counts
    ]

    # -------------------------------------------------
    # 2. MOST DEMANDED SKILLS
    # -------------------------------------------------

    jobs = db.query(Job).all()

    skill_counts = {}

    for job in jobs:

        if not job.skills:
            continue

        skills = job.skills.split(",")

        for skill in skills:

            skill = skill.strip()

            if not skill:
                continue

            skill_key = skill.lower()

            if skill_key not in skill_counts:
                skill_counts[skill_key] = 0

            skill_counts[skill_key] += 1

    sorted_skills = sorted(
        skill_counts.items(),
        key=lambda x: x[1],
        reverse=True
    )

    top_hiring_skills = [
        {
            "label": skill,
            "value": count
        }
        for skill, count in sorted_skills[:10]
    ]

    # -------------------------------------------------
    # 3. STARTUP VS MNC
    # -------------------------------------------------

    startup_jobs = (
        db.query(Job)
        .join(Company, Job.company_id == Company.id)
        .filter(Company.is_startup == True)
        .count()
    )

    mnc_jobs = (
        db.query(Job)
        .join(Company, Job.company_id == Company.id)
        .filter(Company.is_mnc == True)
        .count()
    )

    hiring_demand_distribution = [
        {
            "name": "Startup",
            "value": startup_jobs
        },
        {
            "name": "MNC",
            "value": mnc_jobs
        }
    ]

    # -------------------------------------------------
    # 4. HIRING ACTIVITY OVER TIME
    # -------------------------------------------------

    current_date = datetime.utcnow()

    hiring_activity_over_time = []

    for i in range(5, -1, -1):

        month_date = current_date - timedelta(days=30 * i)

        month_start = month_date.replace(
            day=1,
            hour=0,
            minute=0,
            second=0,
            microsecond=0
        )

        if month_start.month == 12:
            next_month = month_start.replace(
                year=month_start.year + 1,
                month=1
            )
        else:
            next_month = month_start.replace(
                month=month_start.month + 1
            )

        applications_count = (
            db.query(Application)
            .filter(
                Application.applied_at >= month_start,
                Application.applied_at < next_month
            )
            .count()
        )

        hiring_activity_over_time.append(
            {
                "month": month_start.strftime("%b"),
                "applications": applications_count
            }
        )

    # -------------------------------------------------
    # RESPONSE
    # -------------------------------------------------

    return {
        "total_job_openings": db.query(Job).count(),

        "hiring_trends": hiring_trends[:10],

        "top_hiring_skills": top_hiring_skills,

        "hiring_demand_distribution": hiring_demand_distribution,

        "hiring_activity_over_time": hiring_activity_over_time
    }