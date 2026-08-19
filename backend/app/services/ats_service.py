def calculate_ats_score(resume_data):

    score = 0

    strengths = []
    suggestions = []


    improvement_tips = []

    ats_status = ""
    ai_summary = ""

    # -------------------------
    # Contact Information (20)
    # -------------------------

    if resume_data["name"]:
        score += 5
    else:
        suggestions.append("Add your full name.")

    if resume_data["email"]:
        score += 5
    else:
        suggestions.append("Add an email address.")

    if resume_data["phone"]:
        score += 5
    else:
        suggestions.append("Add a phone number.")

    score += 5  # Resume uploaded successfully

    # -------------------------
    # Skills (30)
    # -------------------------

    skill_count = len(resume_data["skills"])

    if skill_count >= 15:
        score += 30
        strengths.append("Excellent technical skill set.")
    elif skill_count >= 10:
        score += 25
        strengths.append("Strong technical skills.")
    elif skill_count >= 5:
        score += 18
    else:
        score += 10
        suggestions.append("Add more technical skills.")

    # -------------------------
    # Education (15)
    # -------------------------

    if resume_data["education"]:
        score += 15
        strengths.append("Education section present.")
    else:
        suggestions.append("Add education details.")

    # -------------------------
    # Experience (15)
    # -------------------------

    if resume_data["experience"]:
        score += 15
        strengths.append("Relevant experience included.")
    else:
        suggestions.append("Include internship or work experience.")

    # -------------------------
    # Projects (15)
    # -------------------------

    project_count = len(resume_data["projects"])

    if project_count >= 3:
        score += 15
        strengths.append("Excellent project portfolio.")
    elif project_count >= 1:
        score += 10
    else:
        suggestions.append("Include technical projects.")

    # -------------------------
    # Certifications (5)
    # -------------------------

    if resume_data["certifications"]:

      score += 5

    else:

       suggestions.append(
        "Add certifications to strengthen your resume."
    )

    improvement_tips.append(
        "Earn certifications from Google, Microsoft, AWS or Coursera."
    )

    if score > 100:
        score = 100
# -------------------------
# ATS Status
# -------------------------

    if score >= 90:
        ats_status = "Excellent"

    elif score >= 80:
        ats_status = "Good"

    elif score >= 70:
        ats_status = "Average"

    else:
        ats_status = "Needs Improvement"


    # -------------------------
    # AI Summary
    # -------------------------

    if score >= 90:

        ai_summary = (
            "Your resume is highly ATS-friendly with a strong technical profile."
        )

    elif score >= 80:

        ai_summary = (
            "Your resume is ATS-friendly. Adding certifications and measurable achievements can further improve it."
        )

    elif score >= 70:

        ai_summary = (
            "Your resume is average. Strengthen your skills section and add more technical projects."
        )

    else:

        ai_summary = (
            "Your resume needs improvement. Add technical skills, projects, internships, and certifications."
        )


    return {
        "ats_score": score,

        "ats_status": ats_status,

        "strengths": strengths,

        "suggestions": suggestions,

        "improvement_tips": improvement_tips,

        "ai_summary": ai_summary
    }