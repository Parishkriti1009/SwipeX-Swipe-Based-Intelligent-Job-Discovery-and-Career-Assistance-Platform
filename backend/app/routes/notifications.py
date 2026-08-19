from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Notification
from app.schemas import NotificationResponse
from app.services.notification_service import (
    get_user_notifications,
    mark_notification_read,
    mark_all_notifications_read,
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get(
    "/{user_id}",
    response_model=list[NotificationResponse]
)
def get_notifications(
    user_id: int,
    unread_only: bool = False,
    db: Session = Depends(get_db),
):
    return get_user_notifications(
        db,
        user_id,
        unread_only
    )


@router.patch(
    "/{notification_id}/read",
    response_model=NotificationResponse
)
def read_notification(
    notification_id: int,
    user_id: int,
    db: Session = Depends(get_db),
):
    notification = mark_notification_read(
        db,
        notification_id,
        user_id,
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


@router.patch(
    "/user/{user_id}/read-all"
)
def read_all_notifications(
    user_id: int,
    db: Session = Depends(get_db),
):
    count = mark_all_notifications_read(
        db,
        user_id,
    )

    return {
        "message": "All notifications marked as read",
        "count": count,
    }