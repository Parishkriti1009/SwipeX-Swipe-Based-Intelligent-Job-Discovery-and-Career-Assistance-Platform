from app.database import SessionLocal
from app.models import Company, Job

db = SessionLocal()

# -------------------------
# Companies
# -------------------------
companies = [
    Company(name="Google", industry="Technology", website="https://google.com"),
    Company(name="Microsoft", industry="Technology", website="https://microsoft.com"),
    Company(name="Amazon", industry="Technology", website="https://amazon.com"),
    Company(name="Netflix", industry="Entertainment", website="https://netflix.com"),
    Company(name="Adobe", industry="Software", website="https://adobe.com"),
    Company(name="Flipkart", industry="E-Commerce", website="https://flipkart.com"),
    Company(name="Zomato", industry="Food Tech", website="https://zomato.com", is_startup=True),
    Company(name="Razorpay", industry="FinTech", website="https://razorpay.com", is_startup=True),
    Company(name="Swiggy", industry="Food Tech", website="https://swiggy.com", is_startup=True),
    Company(name="Notion", industry="Productivity", website="https://notion.so", is_startup=True),
]

db.add_all(companies)
db.commit()

companies = db.query(Company).all()

# -------------------------
# Jobs
# -------------------------

jobs = [
    Job(
        title="Software Engineer",
        description="Build scalable backend services.",
        location="Bangalore",
        salary="18 LPA",
        experience="0-2 Years",
        job_type="Full Time",
        skills="Python,FastAPI,PostgreSQL",
        company_id=companies[0].id,
    ),

    Job(
        title="Frontend Developer",
        description="Develop beautiful React applications.",
        location="Remote",
        salary="15 LPA",
        experience="Fresher",
        job_type="Full Time",
        skills="React,Tailwind,JavaScript",
        company_id=companies[1].id,
    ),

    Job(
        title="Data Analyst",
        description="Analyze business insights.",
        location="Hyderabad",
        salary="12 LPA",
        experience="1 Year",
        job_type="Full Time",
        skills="SQL,Python,Power BI",
        company_id=companies[2].id,
    ),

    Job(
        title="Machine Learning Engineer",
        description="Develop AI models.",
        location="Remote",
        salary="24 LPA",
        experience="2 Years",
        job_type="Full Time",
        skills="Python,TensorFlow,PyTorch",
        company_id=companies[3].id,
    ),

    Job(
        title="AI Intern",
        description="Work on Generative AI.",
        location="Delhi",
        salary="50000/month",
        experience="Fresher",
        job_type="Internship",
        skills="Python,LLMs,RAG",
        company_id=companies[4].id,
    ),

    Job(
        title="Backend Developer",
        description="Develop REST APIs.",
        location="Pune",
        salary="14 LPA",
        experience="1 Year",
        job_type="Full Time",
        skills="FastAPI,Docker,PostgreSQL",
        company_id=companies[5].id,
    ),

    Job(
        title="SDE-1",
        description="Build scalable products.",
        location="Bangalore",
        salary="20 LPA",
        experience="Fresher",
        job_type="Full Time",
        skills="Java,Spring Boot",
        company_id=companies[6].id,
    ),

    Job(
        title="Cloud Engineer",
        description="Manage AWS infrastructure.",
        location="Remote",
        salary="18 LPA",
        experience="2 Years",
        job_type="Full Time",
        skills="AWS,Docker,Kubernetes",
        company_id=companies[7].id,
    ),

    Job(
        title="DevOps Engineer",
        description="CI/CD Automation.",
        location="Hyderabad",
        salary="19 LPA",
        experience="2 Years",
        job_type="Full Time",
        skills="Docker,Jenkins,AWS",
        company_id=companies[8].id,
    ),

    Job(
        title="Product Designer",
        description="Design user experiences.",
        location="Remote",
        salary="17 LPA",
        experience="1 Year",
        job_type="Full Time",
        skills="Figma,UI,UX",
        company_id=companies[9].id,
    ),
]

db.add_all(jobs)
db.commit()

print("✅ Companies inserted:", len(companies))
print("✅ Jobs inserted:", len(jobs))

db.close()