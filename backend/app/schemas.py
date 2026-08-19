from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# =====================================
# AUTH SCHEMAS (Milestone 1)
# =====================================

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


class LoginUser(BaseModel):
    email: EmailStr
    password: str


# =====================================
# COMPANY SCHEMAS
# =====================================

class CompanyCreate(BaseModel):
    name: str
    industry: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    is_startup: bool = False
    is_mnc: bool = False

class CompanyResponse(CompanyCreate):
    id: int

    class Config:
        from_attributes = True


# =====================================
# JOB SCHEMAS
# =====================================

class JobCreate(BaseModel):
    title: str
    description: str
    location: str
    salary: str
    experience: str
    job_type: str
    skills: str
    company_id: int
    work_mode: str


class JobResponse(BaseModel):
    id: int

    title: str
    description: str
    location: str
    salary: str
    experience: str
    job_type: str
    skills: str
    work_mode: str

    posted_date: datetime

    company: CompanyResponse

    class Config:
        from_attributes = True


# =====================================
# SWIPE SCHEMAS
# =====================================

# =====================================
# SWIPE SCHEMAS
# =====================================

class SwipeRequest(BaseModel):
    job_id: int
    action: str


class SwipeResponse(BaseModel):
    id: int
    user_id: int
    job_id: int
    action: str
    timestamp: datetime

    class Config:
        from_attributes = True


# =====================================
# SAVED JOB SCHEMAS
# =====================================

class SaveJobRequest(BaseModel):
    job_id: int


class SavedJobResponse(BaseModel):
    id: int
    user_id: int
    job_id: int
    saved_at: datetime

    class Config:
        from_attributes = True

class ApplicationCreate(BaseModel):
    job_id: int


class ApplicationStatusUpdate(BaseModel):
    status: str


class ApplicationResponse(BaseModel):
    id: int
    user_id: int
    job_id: int

    company_name: str
    job_title: str
    location: str | None = None
    salary: str | None = None

    status: str
    applied_at: datetime

    class Config:
        from_attributes = True


# =====================================
# NOTIFICATION SCHEMAS (Milestone 4)
# =====================================

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    job_id: Optional[int] = None

    notification_type: str
    title: str
    message: str

    match_score: Optional[int] = None

    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True