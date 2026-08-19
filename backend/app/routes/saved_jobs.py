from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SavedJob, Job
from app.schemas import SaveJobRequest

router = APIRouter(
    prefix="/saved-jobs",
    tags=["Saved Jobs"]
)


# Save a Job
@router.post("/")
def save_job(request: SaveJobRequest, db: Session = Depends(get_db)):

    user_id = 1

    job = db.query(Job).filter(Job.id == request.job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    already_saved = db.query(SavedJob).filter(
        SavedJob.user_id == user_id,
        SavedJob.job_id == request.job_id
    ).first()

    if already_saved:
        return {"message": "Job already saved"}

    saved = SavedJob(
        user_id=user_id,
        job_id=request.job_id
    )

    db.add(saved)
    db.commit()
    db.refresh(saved)

    return saved


# Get all Saved Jobs
@router.get("/")
def get_saved_jobs(db: Session = Depends(get_db)):

    user_id = 1

    saved_jobs = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == user_id)
        .all()
    )

    result = []

    for saved in saved_jobs:

        job = (
            db.query(Job)
            .filter(Job.id == saved.job_id)
            .first()
        )

        if job:

            result.append({
                "id": saved.id,
                "job_id": job.id,
                "company_name": job.company.name,
                "title": job.title,
                "description": job.description,
                "location": job.location,
                "salary": job.salary,
                "experience": job.experience,
                "job_type": job.job_type,
                "skills": job.skills,
                "saved_at": saved.saved_at
            })

    return result


# Remove Saved Job
@router.delete("/{saved_job_id}")
def delete_saved_job(saved_job_id: int,
                     db: Session = Depends(get_db)):

    saved = db.query(SavedJob).filter(
        SavedJob.id == saved_job_id
    ).first()

    if not saved:
        raise HTTPException(
            status_code=404,
            detail="Saved Job not found"
        )

    db.delete(saved)
    db.commit()

    return {
        "message": "Saved Job removed successfully"
    }