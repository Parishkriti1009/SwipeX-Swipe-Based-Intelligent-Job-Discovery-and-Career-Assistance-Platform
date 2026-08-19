from app.services.job_match_service import calculate_job_match


def recommend_jobs(resume_data, jobs):

    recommendations = []

    for job in jobs:

        match = calculate_job_match(
            resume_data,
            job
        )

        recommendations.append({

            "job_id": job.id,

            "title": job.title,

            "company": job.company.name,

            "location": job.location,

            "match_percentage": match["match_percentage"],

            "matched_skills": match["matched_skills"],

            "missing_skills": match["missing_skills"],

            "recommendation": match["recommendation"]

        })

    recommendations.sort(

        key=lambda x: x["match_percentage"],

        reverse=True

    )

    return recommendations[:5]