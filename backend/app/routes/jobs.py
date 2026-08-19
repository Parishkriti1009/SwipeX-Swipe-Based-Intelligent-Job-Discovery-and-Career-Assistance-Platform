from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import Optional
from sqlalchemy import or_

from app.database import get_db
from app.models import Job, Company, User
from app.services.notification_service import notify_new_job
from app.routes.auth import get_current_user
from app.schemas import (
    CompanyCreate,
    CompanyResponse,
    JobCreate,
    JobResponse
)

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


# =====================================================
# TEST ROUTE
# =====================================================

@router.get("/test")
def test_jobs():
    return {"message": "Jobs router is working!"}


# =====================================================
# CREATE COMPANY
# =====================================================


@router.post("/", response_model=JobResponse)
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):
    recruiter = (
        db.query(User)
        .filter(User.email == current_user_email)
        .first()
    )

    if not recruiter:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if recruiter.role.lower() != "recruiter":
        raise HTTPException(
            status_code=403,
            detail="Only recruiters can post jobs"
        )

    company = (
        db.query(Company)
        .filter(Company.id == job.company_id)
        .first()
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    new_job = Job(
        title=job.title,
        description=job.description,
        location=job.location,
        salary=job.salary,
        experience=job.experience,
        job_type=job.job_type,
        work_mode=job.work_mode,
        skills=job.skills,
        company_id=job.company_id
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    notify_new_job(
    db=db,
    job=new_job
)

    new_job.company = company

    return new_job
    

# =====================================================
# GET ALL COMPANIES
# =====================================================

@router.get("/companies", response_model=list[CompanyResponse])
def get_all_companies(
    db: Session = Depends(get_db)
):
    return db.query(Company).all()


# =====================================================
# GET STARTUP COMPANIES
# =====================================================

@router.get("/companies/startups", response_model=list[CompanyResponse])
def get_startup_companies(
    db: Session = Depends(get_db)
):
    return (
        db.query(Company)
        .filter(Company.is_startup == True)
        .all()
    )


# =====================================================
# GET COMPANY BY ID
# =====================================================

@router.get("/companies/{company_id}", response_model=CompanyResponse)
def get_company(
    company_id: int,
    db: Session = Depends(get_db)
):

    company = (
        db.query(Company)
        .filter(Company.id == company_id)
        .first()
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


# =====================================================
# CREATE JOB
# =====================================================


# =====================================================
# GET ALL JOBS
# =====================================================

@router.get("/", response_model=list[JobResponse])
def get_all_jobs(
    db: Session = Depends(get_db)
):
    jobs = (
        db.query(Job)
        .options(joinedload(Job.company))
        .all()
    )

    return jobs


# =====================================================
# SEARCH & FILTER JOBS
# =====================================================

@router.get("/search", response_model=list[JobResponse])
def search_jobs(
    title: Optional[str] = None,
    company: Optional[str] = None,
    skill: Optional[str] = None,
    location: Optional[str] = None,
    experience: Optional[str] = None,
    job_type: Optional[str] = None,
    work_mode: Optional[str] = None,
    startup: Optional[bool] = None,
    mnc: Optional[bool] = None,
    db: Session = Depends(get_db)
):

    query = (
    db.query(Job)
    .options(joinedload(Job.company))
    .join(Company)
)

    if title:
        query = query.filter(
        or_(
            Job.title.ilike(f"%{title}%"),
            Company.name.ilike(f"%{title}%"),
            Job.skills.ilike(f"%{title}%")
        )
    )

    if company:
        query = query.filter(Company.name.ilike(f"%{company}%"))

    if skill:
        query = query.filter(Job.skills.ilike(f"%{skill}%"))

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if experience:
      query = query.filter(Job.experience.ilike(f"%{experience}%"))

    if work_mode:
      query = query.filter(Job.work_mode.ilike(f"%{work_mode}%"))

    if job_type:
        query = query.filter(Job.job_type.ilike(f"%{job_type}%"))

    if startup is not None:
        query = query.filter(Company.is_startup == startup)

    if mnc is not None:
        query = query.filter(Company.is_mnc == mnc)

    return query.all()


# =====================================================
# GET JOB BY ID
# =====================================================

@router.get("/{job_id}", response_model=JobResponse)
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return job

# =====================================================
# UPDATE JOB
# =====================================================

@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: int,
    updated_job: JobCreate,
    db: Session = Depends(get_db)
):

    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    company = (
        db.query(Company)
        .filter(Company.id == updated_job.company_id)
        .first()
    )

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    job.title = updated_job.title
    job.description = updated_job.description
    job.location = updated_job.location
    job.salary = updated_job.salary
    job.experience = updated_job.experience
    job.job_type = updated_job.job_type
    job.work_mode = updated_job.work_mode
    job.skills = updated_job.skills
    job.company_id = updated_job.company_id

    db.commit()
    db.refresh(job)

    return job


# =====================================================
# DELETE JOB
# =====================================================

@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }


# =====================================================
# GET JOBS BY COMPANY (Recruiter)
# =====================================================

@router.get("/company/{company_id}", response_model=list[JobResponse])
def get_company_jobs(
    company_id: int,
    db: Session = Depends(get_db)
):

    return (
        db.query(Job)
        .filter(Job.company_id == company_id)
        .all()
    )