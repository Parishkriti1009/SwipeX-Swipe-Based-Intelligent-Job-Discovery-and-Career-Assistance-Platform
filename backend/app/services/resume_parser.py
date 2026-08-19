import fitz  # PyMuPDF
import re
import spacy

nlp = spacy.load("en_core_web_sm")

# You can expand this list later
SKILLS_DB = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Next.js",
    "FastAPI",
    "Django",
    "SQL",
    "PostgreSQL",
    "MongoDB",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "Azure",
    "TensorFlow",
    "PyTorch",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "LangChain",
    "LLMs",
    "RAG",
    "REST API",
    "Power BI",
    "Tailwind CSS",
    "Gen AI"
]

EDUCATION_KEYWORDS = [
    "B.Tech",
    "Bachelor",
    "BE",
    "B.Sc",
    "M.Tech",
    "MCA",
    "BCA",
    "Diploma",
    "Master"
]

EXPERIENCE_KEYWORDS = [
    "Intern",
    "Internship",
    "Experience",
    "Software Engineer",
    "Developer",
    "Worked",
    "Employment"
]

PROJECT_KEYWORDS = [
    "Project",
    "Projects",
    "Developed",
    "Built",
    "Implemented"
]

CERTIFICATION_KEYWORDS = [
    "Certification",
    "Certified",
    "Certificate",
    "AWS Certified",
    "Google Certified",
    "Microsoft Certified"
]

def extract_text_from_pdf(upload_file):
    """
    Extract text from an uploaded PDF file.
    """

    pdf_bytes = upload_file.file.read()

    pdf = fitz.open(stream=pdf_bytes, filetype="pdf")

    text = ""

    for page in pdf:
        text += page.get_text()

    pdf.close()

    # Reset file pointer
    upload_file.file.seek(0)

    return text


def parse_resume(text):

    doc = nlp(text)

    # -------------------------
    # Email
    # -------------------------
    email = None
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)

    if email_match:
        email = email_match.group()

    # -------------------------
    # Phone
    # -------------------------
    phone = None
    phone_match = re.search(r'(\+91[\-\s]?)?[6-9]\d{9}', text)

    if phone_match:
        phone = phone_match.group()

    # -------------------------
    # Name
    # -------------------------
    name = None

    lines = text.split("\n")

    for line in lines:
        line = line.strip()

        if (
            line
            and len(line.split()) >= 2
            and "@" not in line
            and "linkedin" not in line.lower()
            and "github" not in line.lower()
        ):
            name = line.title()
            break

    # -------------------------
    # Skills
    # -------------------------
    skills = []

    for skill in SKILLS_DB:
        pattern = rf"\b{re.escape(skill)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            skills.append(skill)

    # -------------------------
    # Education
    # -------------------------
    education = []

    for keyword in EDUCATION_KEYWORDS:
        pattern = rf"\b{re.escape(keyword)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            education.append(keyword)

    # -------------------------
    # Experience
    # -------------------------
    experience = []

    for keyword in EXPERIENCE_KEYWORDS:
        pattern = rf"\b{re.escape(keyword)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            experience.append(keyword)

    # -------------------------
    # Projects
    # -------------------------
    projects = []

    for line in lines:
        line = line.strip()

        if "|" in line:
            project = line.split("|")[0].strip()

            if project not in projects:
                projects.append(project)

    # -------------------------
    # Certifications
    # -------------------------
    certifications = []

    for keyword in CERTIFICATION_KEYWORDS:
        pattern = rf"\b{re.escape(keyword)}\b"

        if re.search(pattern, text, re.IGNORECASE):
            certifications.append(keyword)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "education": education,
        "experience": experience,
        "projects": projects,
        "certifications": certifications,
        "raw_text": text
    }