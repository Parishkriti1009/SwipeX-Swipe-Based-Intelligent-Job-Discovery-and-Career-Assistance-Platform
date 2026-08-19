from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    ForeignKey,
    Text
)
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


# ==========================
# USER MODEL
# ==========================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    resume_data = Column(Text, nullable=True)
    resume_filename = Column(String, nullable=True)

    # Relationships
    swipes = relationship("SwipeHistory", back_populates="user")
    saved_jobs = relationship("SavedJob", back_populates="user")
    applications = relationship("Application", back_populates="user")
    notifications = relationship("Notification", back_populates="user")


# ==========================
# COMPANY MODEL
# ==========================
class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    industry = Column(String)
    website = Column(String)
    logo_url = Column(String)

    is_startup = Column(Boolean, default=False)
    is_mnc = Column(Boolean, default=False)

    # Relationship
    jobs = relationship("Job", back_populates="company")


# ==========================
# JOB MODEL
# ==========================
class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(Text)
    location = Column(String)
    salary = Column(String)
    experience = Column(String)
    job_type = Column(String)
    work_mode = Column(String) 
    skills = Column(String)
    posted_date = Column(DateTime, default=datetime.utcnow)

    company_id = Column(Integer, ForeignKey("companies.id"))

    # Relationships
    company = relationship("Company", back_populates="jobs")
    swipes = relationship("SwipeHistory", back_populates="job")
    saved_by = relationship("SavedJob", back_populates="job")
    applications = relationship("Application", back_populates="job")


# ==========================
# SWIPE HISTORY MODEL
# ==========================
class SwipeHistory(Base):
    __tablename__ = "swipe_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))

    # LIKE or SKIP
    action = Column(String, nullable=False)

    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="swipes")
    job = relationship("Job", back_populates="swipes")


# ==========================
# SAVED JOB MODEL
# ==========================
class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))

    saved_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="saved_jobs")
    job = relationship("Job", back_populates="saved_by")


# ==========================
# APPLICATION MODEL
# ==========================
class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))

    status = Column(String, default="Applied")

    applied_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="applications")
    job = relationship("Job", back_populates="applications")


    # ==========================
# NOTIFICATION MODEL
# ==========================
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id"),
        nullable=True
    )

    notification_type = Column(
        String,
        nullable=False
    )

    title = Column(
        String,
        nullable=False
    )

    message = Column(
        Text,
        nullable=False
    )

    match_score = Column(
        Integer,
        nullable=True
    )

    is_read = Column(
        Boolean,
        default=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="notifications"
    )

    job = relationship("Job")