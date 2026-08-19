from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.database import engine
from app.models import Base
from app.routes.jobs import router as jobs_router
from app.routes.company import router as company_router
from app.routes.swipe import router as swipe_router
from app.routes.saved_jobs import router as saved_jobs_router
from app.routes.recommendation import router as recommendation_router
from app.routes.resume import router as resume_router
from app.routes.dashboard import router as dashboard_router
from app.routes.application import router as application_router
from app.routes.notifications import router as notifications_router


# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SwipeX Backend")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(company_router)
app.include_router(swipe_router)
app.include_router(saved_jobs_router)
app.include_router(recommendation_router)
app.include_router(resume_router)
app.include_router(dashboard_router)
app.include_router(application_router)
app.include_router(notifications_router)

@app.get("/")
def home():
    return {
        "message": "Backend Running Successfully 🚀"
    }
app.include_router(jobs_router)