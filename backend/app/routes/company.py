from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Company, Job
from app.schemas import CompanyCreate, CompanyResponse

router = APIRouter(
    prefix="/companies",
    tags=["Companies"]
)


# Create Company
@router.post("/", response_model=CompanyResponse)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    new_company = Company(
    name=company.name,
    industry=company.industry,
    website=company.website,
    logo_url=company.logo_url,
    is_startup=company.is_startup,
    is_mnc=company.is_mnc
)
    

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return new_company


# Get All Companies
# Get All Companies + Filter

@router.get("/")
def get_all_companies(
    type: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(Company)

    if type == "startup":
        query = query.filter(
            Company.is_startup == True
        )

    elif type == "mnc":
        query = query.filter(
            Company.is_startup == False
        )


    companies = query.all()


    result = []

    for company in companies:

        result.append({

            "id": company.id,

            "name": company.name,

            "industry": company.industry,

            "website": company.website,

            "logo_url": company.logo_url,

            "is_startup": company.is_startup,

            "open_jobs": len(company.jobs)

        })


    return result


# Get Only Startups
@router.get("/startups", response_model=list[CompanyResponse])
def get_startups(db: Session = Depends(get_db)):
    return db.query(Company).filter(
        Company.is_startup == True
    ).all()


# Get Company by ID
@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(
        Company.id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return company


# Delete Company
@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = db.query(Company).filter(
        Company.id == company_id
    ).first()

    if not company:
        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    db.delete(company)
    db.commit()

    return {
        "message": "Company deleted successfully"
    }