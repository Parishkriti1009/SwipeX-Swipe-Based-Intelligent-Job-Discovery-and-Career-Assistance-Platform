from sqlalchemy.orm import Session

from app.models import SwipeHistory, Job


def get_user_preferred_skills(db: Session, user_id: int):

    liked_swipes = (
        db.query(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "LIKE"
        )
        .all()
    )

    skill_count = {}

    for swipe in liked_swipes:

        job = (
            db.query(Job)
            .filter(Job.id == swipe.job_id)
            .first()
        )

        if not job:
            continue

        if not job.skills:
            continue

        for skill in job.skills.split(","):

            skill = skill.strip().lower()

            if skill not in skill_count:
                skill_count[skill] = 0

            skill_count[skill] += 1

    return skill_count