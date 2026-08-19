from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.routes.auth import get_current_user
from app.models import Application, Job, Company, User
from app.schemas import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationStatusUpdate
)

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)


# =====================================================
# APPLY FOR A JOB
# =====================================================

@router.post("/apply", response_model=ApplicationResponse)
def apply_job(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):

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

    if user.role.lower() not in ["seeker", "jobseeker"]:
        raise HTTPException(
            status_code=403,
            detail="Only job seekers can apply for jobs"
        )

    user_id = user.id

    # Check if job exists
    job = (
        db.query(Job)
        .filter(Job.id == application.job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Prevent duplicate applications
    existing_application = (
        db.query(Application)
        .filter(
            Application.user_id == user_id,
            Application.job_id == application.job_id
        )
        .first()
    )

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied for this job."
        )

    new_application = Application(
        user_id=user_id,
        job_id=application.job_id,
        status="Applied"
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return {
    "id": new_application.id,
    "user_id": new_application.user_id,
    "job_id": job.id,
    "company_name": job.company.name,
    "job_title": job.title,
    "location": job.location,
    "salary": job.salary,
    "status": new_application.status,
    "applied_at": new_application.applied_at
}


# =====================================================
# GET MY APPLICATIONS
# =====================================================

# =====================================================
# GET MY APPLICATIONS
# =====================================================
# =====================================================
# GET MY APPLICATIONS
# =====================================================

@router.get("/my")
def get_my_applications(
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):

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

    applications = (
        db.query(Application, Job, Company)
        .join(
            Job,
            Application.job_id == Job.id
        )
        .join(
            Company,
            Job.company_id == Company.id
        )
        .filter(
            Application.user_id == user_id
        )
        .all()
    )


    result = []

    for application, job, company in applications:

        result.append({

            "id": application.id,

            "user_id": application.user_id,

            "job_id": job.id,

            "company_name": company.name,

            "job_title": job.title,

            "location": job.location,

            "salary": job.salary,

            "status": application.status,

            "applied_at": application.applied_at

        })


    return result

# =====================================================
# GET APPLICATIONS FOR A JOB
# =====================================================

@router.get("/job/{job_id}", response_model=list[ApplicationResponse])
def get_job_applications(
    job_id: int,
    db: Session = Depends(get_db)
):

    return (
        db.query(Application)
        .filter(Application.job_id == job_id)
        .all()
    )


# =====================================================
# UPDATE APPLICATION STATUS
# =====================================================

@router.put("/{application_id}", response_model=ApplicationResponse)
def update_application_status(
    application_id: int,
    status: ApplicationStatusUpdate,
    db: Session = Depends(get_db)
):

    application = (
        db.query(Application)
        .filter(Application.id == application_id)
        .first()
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found"
        )

    # Get related job
    job = (
        db.query(Job)
        .filter(Job.id == application.job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Update status
    application.status = status.status

    db.commit()
    db.refresh(application)

    # Return the exact structure required by ApplicationResponse
    return {
        "id": application.id,
        "user_id": application.user_id,
        "job_id": job.id,
        "company_name": job.company.name,
        "job_title": job.title,
        "location": job.location,
        "salary": job.salary,
        "status": application.status,
        "applied_at": application.applied_at
    }
# =====================================================
# GET ALL APPLICATIONS (ADMIN)
# =====================================================

# =====================================================
# GET ALL APPLICATIONS (ADMIN)
# =====================================================

@router.get("/", response_model=list[ApplicationResponse])
def get_all_applications(
    db: Session = Depends(get_db)
):

    applications = (
        db.query(Application, Job, Company)
        .join(Job, Application.job_id == Job.id)
        .join(Company, Job.company_id == Company.id)
        .all()
    )

    result = []

    for application, job, company in applications:

        result.append(
            {
                "id": application.id,
                "user_id": application.user_id,
                "job_id": job.id,
                "company_name": company.name,
                "job_title": job.title,
                "location": job.location,
                "salary": job.salary,
                "status": application.status,
                "applied_at": application.applied_at,
            }
        )

    return result