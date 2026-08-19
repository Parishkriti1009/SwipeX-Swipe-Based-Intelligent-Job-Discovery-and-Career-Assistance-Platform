from app.models import SwipeHistory, Job


def learn_user_preferences(user_id, db):

    liked_jobs = (
        db.query(Job)
        .join(SwipeHistory)
        .filter(
            SwipeHistory.user_id == user_id,
            SwipeHistory.action == "LIKE"
        )
        .all()
    )

    skills = set()
    companies = set()
    job_types = set()
    locations = set()

    for job in liked_jobs:

        if job.skills:
            for skill in job.skills.split(","):
                skills.add(skill.strip().lower())

        if job.company_id:
            companies.add(job.company_id)

        if job.job_type:
            job_types.add(job.job_type.lower())

        if job.location:
            locations.add(job.location.lower())

    return {
        "skills": skills,
        "companies": companies,
        "job_types": job_types,
        "locations": locations
    }

def score_job(job, preferences):

    score = 0

    if job.skills:

        job_skills = [
            skill.strip().lower()
            for skill in job.skills.split(",")
        ]

        for skill in job_skills:
            if skill in preferences["skills"]:
                score += 3

    if (
        job.job_type and
        job.job_type.lower() in preferences["job_types"]
    ):
        score += 2

    if job.company_id in preferences["companies"]:
        score += 2

    if (
        job.location and
        job.location.lower() in preferences["locations"]
    ):
        score += 1

    return score

def recommend_jobs(user_id, jobs, db):

    preferences = learn_user_preferences(user_id, db)

    recommendations = []

    for job in jobs:

        score = score_job(job, preferences)

        recommendations.append({
            "job": job,
            "score": score
        })

    recommendations.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return [
        item["job"]
        for item in recommendations
    ]