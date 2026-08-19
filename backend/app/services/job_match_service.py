def calculate_job_match(resume_data, job):

    # Resume skills
    resume_skills = {
        skill.strip().lower()
        for skill in resume_data["skills"]
    }

    # Job skills
    job_skills = {
        skill.strip().lower()
        for skill in job.skills.split(",")
    }

    matched_skills = sorted(list(resume_skills & job_skills))
    missing_skills = sorted(list(job_skills - resume_skills))
    if not missing_skills:
     missing_skills = ["No missing skills 🎉"]

    # =====================================================
    # Skill Score (70 Marks)
    # =====================================================

    if len(job_skills) == 0:
        skill_score = 0
    else:
        skill_score = (
            len(matched_skills) / len(job_skills)
        ) * 70

    # =====================================================
    # Experience Score (20 Marks)
    # =====================================================

    experience_score = 0

    job_experience = (job.experience or "").lower()

    resume_experience = [
        exp.lower()
        for exp in resume_data["experience"]
    ]

    if "intern" in job_experience:

        if "intern" in resume_experience:
            experience_score = 20

    elif "fresher" in job_experience:

        experience_score = 20

    elif "1" in job_experience:

        if (
            "intern" in resume_experience
            or "experience" in resume_experience
        ):
            experience_score = 15

    else:

        if "experience" in resume_experience:
            experience_score = 20

    # =====================================================
    # Education Score (10 Marks)
    # =====================================================

    education_score = 0

    education = [
        edu.lower()
        for edu in resume_data["education"]
    ]

    if (
        "b.tech" in education
        or "be" in education
        or "bachelor" in education
    ):
        education_score = 10

    # =====================================================
    # Final Match Percentage
    # =====================================================

    match_percentage = round(
        skill_score +
        experience_score +
        education_score
    )

    if match_percentage >= 80:

        recommendation = (
    f"Excellent fit! Your profile matches {match_percentage}% of this role. "
    "You satisfy the required technical skills, education and experience requirements."
)

    elif match_percentage >= 60:

       if missing_skills == ["No missing skills 🎉"]:

          recommendation = (
            f"Your profile matches {match_percentage}% of this role. "
            "You are a strong candidate for this position."
        )

       else:

        recommendation = (
         f"Good match ({match_percentage}%). "
        f"Adding experience with {', '.join(missing_skills)} "
        "will significantly improve your compatibility score."
)

    elif match_percentage >= 40:

     recommendation = (
        f"Average match ({match_percentage}%). "
        f"Improve these skills: {', '.join(missing_skills)}."
    )

    else:

      recommendation = (
        f"Current compatibility is {match_percentage}%. "
        "Consider improving the required skills before applying."
    )

    if missing_skills == ["No missing skills 🎉"]:
        missing_keyword_count = 0
    else:
        missing_keyword_count = len(missing_skills)

    return {
    "match_percentage": match_percentage,

    "skill_score": round(skill_score),
    "experience_score": experience_score,
    "education_score": education_score,

    "matched_skills": matched_skills,
    "missing_skills": missing_skills,

    "keyword_match_count": len(matched_skills),
    "missing_keyword_count": missing_keyword_count,

    "recommendation": recommendation
}