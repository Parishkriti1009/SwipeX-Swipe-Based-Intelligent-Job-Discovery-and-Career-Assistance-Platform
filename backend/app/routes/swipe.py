from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SwipeHistory, SavedJob, Job
from app.schemas import SwipeRequest

router = APIRouter(
    prefix="/swipe",
    tags=["Swipe"]
)


@router.post("/")
def swipe_job(request: SwipeRequest, db: Session = Depends(get_db)):

    # Temporary user (replace with JWT authentication later)
    user_id = 1

    # Check whether job exists
    job = db.query(Job).filter(
        Job.id == request.job_id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    # Check if already swiped
    existing_swipe = db.query(SwipeHistory).filter(
        SwipeHistory.user_id == user_id,
        SwipeHistory.job_id == request.job_id
    ).first()

    if existing_swipe:
        raise HTTPException(
            status_code=400,
            detail="You have already swiped this job."
        )

    # Save swipe history
    swipe = SwipeHistory(
        user_id=user_id,
        job_id=request.job_id,
        action=request.action.upper()
    )

    db.add(swipe)

    # Automatically save liked jobs
    if request.action.upper() == "LIKE":

        already_saved = db.query(SavedJob).filter(
            SavedJob.user_id == user_id,
            SavedJob.job_id == request.job_id
        ).first()

        if not already_saved:
            saved_job = SavedJob(
                user_id=user_id,
                job_id=request.job_id
            )

            db.add(saved_job)

    db.commit()

    return {
        "message": f"Job {request.action.lower()} recorded successfully"
    }