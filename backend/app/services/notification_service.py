from sqlalchemy.orm import Session

from app.models import Notification, User, Job
from app.services.job_match_service import calculate_job_match
import json


def create_notification(
    db: Session,
    user_id: int,
    notification_type: str,
    title: str,
    message: str,
    job_id: int | None = None,
    match_score: int | None = None,
):
    notification = Notification(
        user_id=user_id,
        job_id=job_id,
        notification_type=notification_type,
        title=title,
        message=message,
        match_score=match_score,
        is_read=False,
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification


def get_user_notifications(
    db: Session,
    user_id: int,
    unread_only: bool = False,
):
    query = (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
    )

    if unread_only:
        query = query.filter(
            Notification.is_read == False
        )

    return query.order_by(
        Notification.created_at.desc()
    ).all()


def mark_notification_read(
    db: Session,
    notification_id: int,
    user_id: int,
):
    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id,
            Notification.user_id == user_id,
        )
        .first()
    )

    if not notification:
        return None

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return notification


def mark_all_notifications_read(
    db: Session,
    user_id: int,
):
    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False,
        )
        .all()
    )

    for notification in notifications:
        notification.is_read = True

    db.commit()

    return len(notifications)


def notify_new_job(
    db: Session,
    job: Job,
):
    """
    Create notifications for job seekers when a new job is posted.

        Notifications:
    1. New job notification for all seekers
    2. High-match notification for users with >= 80% match
    3. Startup hiring notification for startup companies
    4. Low-competition notification for jobs with < 5 applications
    """

    job_seekers = (
        db.query(User)
        .filter(User.role.in_(["seeker", "jobseeker"]))
        .all()
    )

    notifications = []

    for user in job_seekers:

        # =====================================================
        # 1. NEW JOB NOTIFICATION
        # =====================================================

        notification = Notification(
            user_id=user.id,
            job_id=job.id,
            notification_type="new_job",
            title="🔥 New Job Opportunity",
            message=(
                f"{job.title} at {job.company.name} "
                f"is now available."
            ),
            match_score=None,
            is_read=False,
        )

        db.add(notification)
        notifications.append(notification)

        # =====================================================
        # 2. STARTUP HIRING NOTIFICATION
        # =====================================================

        if job.company and job.company.is_startup:

            startup_notification = Notification(
                user_id=user.id,
                job_id=job.id,
                notification_type="startup_hiring",
                title="🚀 Startup Hiring Alert",
                message=(
                    f"{job.company.name} is hiring for "
                    f"{job.title}."
                ),
                match_score=None,
                is_read=False,
            )

            db.add(startup_notification)
            notifications.append(startup_notification)

        # =====================================================
        # 3. HIGH MATCH NOTIFICATION
        # =====================================================

        if user.resume_data:

            try:
                resume_data = json.loads(user.resume_data)

                match = calculate_job_match(
                    resume_data,
                    job
                )

                match_score = match["match_percentage"]

                if match_score >= 80:

                    high_match_notification = Notification(
                        user_id=user.id,
                        job_id=job.id,
                        notification_type="high_match",
                        title="🎯 High Match Opportunity",
                        message=(
                            f"{job.title} at {job.company.name} "
                            f"matches your profile by "
                            f"{match_score}%."
                        ),
                        match_score=match_score,
                        is_read=False,
                    )

                    db.add(high_match_notification)
                    notifications.append(
                        high_match_notification
                    )

            except Exception as e:
                print(
                    f"Could not calculate match "
                    f"for user {user.id}: {e}"
                )
            # =====================================================
        # 4. LOW COMPETITION NOTIFICATION
        # =====================================================

        application_count = len(job.applications)

        if application_count < 5:

            low_competition_notification = Notification(
                user_id=user.id,
                job_id=job.id,
                notification_type="low_competition",
                title="💎 Low Competition Opportunity",
                message=(
                    f"{job.title} at {job.company.name} "
                    f"currently has only {application_count} "
                    f"applications. Apply early!"
                ),
                match_score=None,
                is_read=False,
            )

            db.add(low_competition_notification)
            notifications.append(
                low_competition_notification
            )

    db.commit()

    return notifications

          