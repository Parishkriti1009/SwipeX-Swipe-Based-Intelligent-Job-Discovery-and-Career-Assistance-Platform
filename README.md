# SwipeX 🚀
### Swipe Your Way to Your Next Opportunity

**SwipeX — Swipe-Based Intelligent Job Discovery and Career Assistance Platform**

<p align="center">
  <a href="https://github.com/Parishkriti1009/SwipeX-Swipe-Based-Intelligent-Job-Discovery-and-Career-Assistance-Platform">
    <img src="https://img.shields.io/badge/Project-SwipeX-7B61FF?style=for-the-badge" alt="SwipeX"/>
  </a>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</p>

SwipeX is a full-stack job discovery and career assistance platform that reimagines traditional job searching through an interactive, swipe-based experience. It brings together job discovery, resume processing, ATS-oriented analysis, saved opportunities, and recruitment workflows in a unified application.

The platform combines a modern React frontend with a FastAPI backend and PostgreSQL database, providing a foundation for personalized job discovery and smarter career exploration.

**Repository:** [SwipeX on GitHub](https://github.com/Parishkriti1009/SwipeX-Swipe-Based-Intelligent-Job-Discovery-and-Career-Assistance-Platform)

**Live Frontend:** [Open SwipeX](https://swipe-x-swipe-based-intelligent-job.vercel.app/)

---

## Table of Contents

- [Overview](#overview)
- [Why SwipeX?](#why-swipex)
- [How It Works](#how-it-works)
- [Core Features](#core-features)
- [End-to-End Workflow](#end-to-end-workflow)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Backend Architecture](#backend-architecture)
- [Resume Analysis and ATS Scoring](#resume-analysis-and-ats-scoring)
- [Job Recommendations](#job-recommendations)
- [Prerequisites](#prerequisites)
- [Installation and Local Development](#installation-and-local-development)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Security Considerations](#security-considerations)
- [Project Status and Roadmap](#project-status-and-roadmap)
- [Contributing](#contributing)
- [License and Acknowledgments](#license-and-acknowledgments)

## Overview

Job searching can be fragmented and time-consuming. Candidates often have to browse numerous listings, repeatedly evaluate job descriptions, tailor their resumes, and determine which opportunities best align with their skills.

SwipeX explores a more intuitive approach by combining interactive job discovery with career assistance.

The application is organized around three user roles:

- **Job Seekers:** Explore opportunities and manage job-related interactions.
- **Recruiters:** Access recruitment-related functionality and job workflows.
- **Administrators:** Access administrative functionality.

By integrating frontend interactions, backend APIs, and persistent data storage, SwipeX provides a connected environment for job discovery and recruitment.

### The Problem

Traditional job portals can create several challenges:

- **Information overload:** Candidates must navigate numerous job listings.
- **Limited personalization:** Finding opportunities aligned with a candidate's profile can require substantial manual effort.
- **Resume uncertainty:** Candidates may struggle to understand how their resumes align with job requirements.
- **Fragmented workflows:** Job discovery, saved opportunities, and application tracking may involve separate interfaces.

### The SwipeX Approach

SwipeX introduces an interactive job-discovery experience supported by resume-related functionality and dedicated application workflows.

The platform aims to make job exploration more engaging while providing a foundation for personalized recommendations and career insights.

## Why SwipeX?

| Dimension | Traditional Job Search | SwipeX Approach |
|---|---|---|
| Job discovery | Listing-oriented browsing | Interactive, swipe-based discovery |
| Candidate information | Manual profile management | Resume-assisted career workflows |
| Resume feedback | Often handled separately | ATS-oriented analysis within the platform |
| Job relevance | Search and filters | Recommendation-oriented architecture |
| Job interactions | Navigate individual listings | Card-based interactions |
| Application workflows | Potentially fragmented | Connected job-related functionality |

### Core Benefits

- **Interactive discovery:** Explore opportunities using a swipe-based interface.
- **Resume-aware career assistance:** Process resume documents and support resume analysis.
- **Centralized workflows:** Bring job discovery and related interactions into one application.
- **Role-oriented functionality:** Organize functionality around distinct user roles.
- **Extensible architecture:** Build on a separated frontend, API, and database design.

## How It Works

### High-Level Workflow

```text
┌──────────────────────────────┐
│       User Registration      │
│       & Authentication       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Candidate Profile      │
│      & Resume Processing     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Job Discovery         │
│     Listings & Matching      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Swipe Interactions     │
│       Pass / Save / Apply    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Saved Jobs & Applications│
│       Career Assistance      │
└──────────────────────────────┘
```

### Workflow Breakdown

1. **Authentication:** Users access the application through the authentication workflow.
2. **Profile preparation:** Candidate information supports personalized career workflows.
3. **Resume processing:** Uploaded PDF resumes can be processed to extract text.
4. **Job discovery:** Users explore available opportunities through the job-discovery interface.
5. **Job interactions:** Users interact with job cards and manage saved opportunities.
6. **Application management:** Application-related operations are handled through the backend.
7. **Career assistance:** Resume analysis and recommendation functionality support the job-seeking experience.

## Core Features

### 1. Swipe-Based Job Discovery

SwipeX introduces a card-based approach to exploring job opportunities.

- Browse job opportunities through an interactive interface.
- Express interest in relevant opportunities.
- Pass on jobs that do not match preferences.
- Save opportunities for later review.
- Connect discovery interactions with job-related workflows.

### 2. Resume Processing

The backend includes resume-related functionality and PyMuPDF for PDF processing.

- Process PDF resume documents.
- Extract text for subsequent analysis.
- Support resume-related career workflows.
- Provide a foundation for structured candidate information.

### 3. ATS-Oriented Resume Analysis

Resume analysis is intended to help candidates evaluate how their resumes align with job requirements.

Depending on the implemented analysis workflow, this can support resume scoring, keyword insights, and suggestions for improving job relevance.

ATS-oriented scores are indicative and should not be interpreted as guarantees of passing an employer's screening process.

### 4. Job Recommendations

SwipeX includes a dedicated recommendation router to support recommendation-related workflows.

The recommendation layer provides a foundation for connecting candidate information with relevant job opportunities.

### 5. Saved Jobs

The platform includes dedicated saved-job functionality to help candidates keep track of interesting opportunities.

### 6. Application Management

The backend includes an application router for application-related operations.

This provides a foundation for connecting job discovery with subsequent application workflows.

### 7. Authentication

The backend includes authentication-related routing and JWT dependencies for token-based authentication workflows.

Protected resources should be accessed only after the backend validates the relevant authentication and authorization requirements.

### 8. Dashboard and Notifications

Dedicated dashboard and notification routers support these application areas.

Their exact behavior and available operations depend on the implemented route handlers and frontend integration.

## System Architecture

SwipeX follows a client-server architecture with a React frontend, a FastAPI backend, and a PostgreSQL data layer.

```text
┌──────────────────────────────────────────────────┐
│                      USER                        │
│                 Web Browser                      │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│                  FRONTEND                        │
│                  React + Vite                    │
│                                                  │
│  Components · Routing · UI State · Animations    │
│  Job Discovery · Resume UI · Dashboards          │
└───────────────────────┬──────────────────────────┘
                        │
                   HTTP / Axios
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│                   BACKEND                        │
│                   FastAPI                        │
│                                                  │
│  Authentication · Jobs · Companies               │
│  Swipes · Saved Jobs · Recommendations           │
│  Resumes · Applications · Notifications          │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│                DATABASE LAYER                    │
│                                                  │
│              SQLAlchemy ORM                      │
│              PostgreSQL                          │
│                                                  │
│  Persistent Application Data                     │
└──────────────────────────────────────────────────┘
```

### Architecture Responsibilities

| Layer | Responsibility |
|---|---|
| Presentation | Render the user interface and process user interactions |
| Routing | Handle navigation between application views |
| HTTP client | Send requests to the backend |
| API layer | Receive requests and return responses |
| Business logic | Process job, resume, and application operations |
| ORM | Map application models to relational data |
| Database | Persist application information |

This separation allows the frontend, backend, and database to be maintained independently while communicating through defined interfaces.

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend framework | React | Component-based user interface |
| Build tool | Vite | Frontend development and production builds |
| Styling | Tailwind CSS | Responsive UI styling |
| Routing | React Router DOM | Client-side navigation |
| HTTP client | Axios | Frontend-backend communication |
| Animations | Framer Motion | Interactive UI animations |
| Icons | Lucide React, React Icons | Interface iconography |
| Charts | Recharts | Data visualization |
| Backend framework | FastAPI | REST API development |
| Language | Python | Backend application logic |
| ORM | SQLAlchemy | Relational database operations |
| Database | PostgreSQL | Persistent data storage |
| Database driver | psycopg2-binary | PostgreSQL connectivity |
| Authentication dependencies | python-jose, Passlib, bcrypt | JWT-related and password-hashing functionality |
| Resume processing | PyMuPDF | PDF text extraction |
| Data validation | Pydantic | Request and data validation |
| ASGI server | Uvicorn | Running the backend |
| Version control | Git and GitHub | Source control |

Exact installed versions should be taken from the repository's dependency files.

## Backend Architecture

The FastAPI application entry point is located at:

`backend/app/main.py`

The main application initializes FastAPI, configures CORS, initializes database tables through SQLAlchemy metadata, and registers the application's routers.

### Registered API Modules

| Module | Responsibility |
|---|---|
| `auth` | Authentication workflows |
| `jobs` | Job-related operations |
| `company` | Company-related functionality |
| `swipe` | Job interaction workflows |
| `saved_jobs` | Saved-job operations |
| `recommendation` | Recommendation-related operations |
| `resume` | Resume processing workflows |
| `dashboard` | Dashboard-related operations |
| `application` | Application-related operations |
| `notifications` | Notification functionality |

These modules are registered with the main FastAPI application. Refer to their route definitions for the exact endpoint paths, HTTP methods, request schemas, and response formats.

## Resume Analysis and ATS Scoring

Resume analysis connects career assistance with job discovery.

### Conceptual Processing Pipeline

```text
┌────────────────────────────┐
│       PDF Resume           │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      PDF Text Extraction   │
│         PyMuPDF            │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│    Resume Content Analysis │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│  Resume Insights / Scoring │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│      Career Assistance     │
└────────────────────────────┘
```

### Intended Outcomes

- Extract text from resume documents.
- Support analysis of resume content.
- Help candidates identify relevant information.
- Provide a foundation for job-specific resume insights.

The exact scoring formula, extraction rules, supported file constraints, and generated feedback should be documented against the resume-processing implementation.

## Job Recommendations

The recommendation router provides a backend module for job recommendation functionality.

### Conceptual Recommendation Pipeline

```text
Candidate Profile
       │
       ▼
Candidate Attributes
       │
       ▼
Job Requirements
       │
       ▼
Relevance Evaluation
       │
       ▼
Recommended Opportunities
```

Potential recommendation signals include skills, experience, location, job type, and qualifications.

The actual scoring formula and ranking behavior depend on the recommendation implementation. Semantic embeddings, advanced ranking models, and explainable match scores are potential extensions rather than assumed capabilities.

## Prerequisites

Before running SwipeX locally, ensure you have:

- Python installed.
- Node.js and npm installed.
- PostgreSQL installed or access to a PostgreSQL database.
- Git installed.
- A code editor such as Visual Studio Code.

Use versions compatible with the project's dependency files.

## Installation and Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/Parishkriti1009/SwipeX-Swipe-Based-Intelligent-Job-Discovery-and-Career-Assistance-Platform.git

cd SwipeX-Swipe-Based-Intelligent-Job-Discovery-and-Career-Assistance-Platform
```

### 2. Create a Python Virtual Environment

From the repository root:

```bash
python -m venv .venv
```

Activate it using Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

### 3. Install Backend Dependencies

From the repository root:

```bash
pip install -r requirements.txt
```

### 4. Configure PostgreSQL

Ensure that PostgreSQL is running and that a database has been created for the application.

Inspect `backend/app/database.py` to identify the expected database configuration and environment variable names.

Configure the connection details before starting the backend.

Do not commit database credentials or production secrets to GitHub.

### 5. Start the Backend

From the repository root:

```bash
python -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

Alternatively, run the following from the `backend/` directory:

```bash
python -m uvicorn app.main:app --reload --port 8000
```

The API should be available at:

- **API root:** `http://127.0.0.1:8000/`
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **OpenAPI schema:** `http://127.0.0.1:8000/openapi.json`

The backend will require a working database connection if initialization or application operations access PostgreSQL.

### 6. Install Frontend Dependencies

Open a separate terminal:

```bash
cd frontend
npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite, typically:

`http://localhost:5173`

Ensure that the frontend API configuration points to the backend running on port `8000`.

### 8. Build for Production

From the frontend directory:

```bash
npm run build
```

### 9. Run the Linter

```bash
npm run lint
```

### 10. Preview the Production Build

```bash
npm run preview
```

The exact available npm scripts can be verified in `frontend/package.json`.

## API Documentation

SwipeX uses FastAPI to expose its backend functionality.

When the backend is running, the automatically generated interactive documentation is available at:

`http://127.0.0.1:8000/docs`

The OpenAPI specification is available at:

`http://127.0.0.1:8000/openapi.json`

These resources can be used to inspect:

- Registered endpoints.
- Supported HTTP methods.
- Request parameters and schemas.
- Response formats.
- Authentication requirements.
- Validation errors.

For accurate endpoint-level documentation, refer to the registered router definitions and the generated OpenAPI specification.

## Environment Configuration

SwipeX requires compatible configuration across the frontend, backend, and database.

Depending on the implementation, configuration may include:

- PostgreSQL connection details.
- JWT signing configuration.
- Frontend API base URL.
- CORS allowed origins.
- Resume upload or storage settings.

The exact environment variable names must match the source code.

If the repository does not already contain an environment template, consider adding a `.env.example` containing placeholder values only.

Ensure that real `.env` files and sensitive credentials remain excluded from version control.

## Deployment

The project has a frontend deployment URL:

[SwipeX on Vercel](https://swipe-x-swipe-based-intelligent-job.vercel.app/)

A functioning frontend does not necessarily mean that backend and database operations are available.

### Frontend Deployment

- Configure the production API base URL.
- Build the application using `npm run build`.
- Deploy the generated production assets.
- Ensure that the backend allows requests from the frontend origin.

### Backend Deployment

- Deploy the FastAPI application with an ASGI server.
- Configure the required environment variables.
- Ensure that the database is reachable from the backend.
- Verify the API endpoints and authentication workflows.
- Configure CORS for the production frontend.

### Database Reliability

The database must remain available for persistent application workflows to function correctly.

For reliable deployment, use a persistent database service, maintain appropriate backups, and verify database connectivity after deployment or configuration changes.

## Security Considerations

- Never commit private keys, passwords, database credentials, or signing secrets.
- Validate JWTs on protected endpoints.
- Enforce role-based authorization in the backend.
- Validate uploaded resume files and enforce reasonable size limits.
- Restrict CORS to trusted origins.
- Avoid logging sensitive candidate information.
- Use HTTPS for production traffic.
- Apply appropriate database access controls.
- Use database migrations when evolving production schemas.

These practices should be verified against the implementation before claiming that every control is fully enforced.

## Project Status and Roadmap

### Current Project Foundation

SwipeX includes a full-stack application architecture with:

- React and Vite frontend.
- FastAPI backend.
- PostgreSQL integration through SQLAlchemy.
- Authentication-related functionality.
- Dedicated job, company, swipe, and saved-job routers.
- Recommendation and resume-processing modules.
- Application, dashboard, and notification routers.

### Future Roadmap

**Phase 1 — Reliability and Documentation**
- Verify clean installation from a fresh clone.
- Document environment configuration.
- Improve database recovery and deployment reliability.
- Validate complete frontend-backend workflows.

**Phase 2 — Intelligent Job Matching**
- Improve job relevance scoring.
- Explore semantic resume-job matching.
- Add explainable recommendations.
- Evaluate recommendation quality.

**Phase 3 — Career Assistance**
- Expand resume feedback.
- Introduce job-specific skills-gap insights.
- Improve candidate profile enrichment.
- Explore personalized career recommendations.

**Phase 4 — Engineering Quality**
- Expand automated tests.
- Introduce structured database migrations.
- Improve error handling and observability.
- Strengthen deployment and security practices.

The roadmap describes potential improvements and should be updated as functionality is implemented and tested.

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Implement your changes.
4. Run the relevant checks and verify the affected workflows.
5. Commit with a descriptive message:

   ```bash
   git commit -m "Add: describe your change"
   ```

6. Push the branch and open a pull request explaining the changes.

Please do not commit credentials, sensitive candidate data, uploaded resumes, or production configuration files.

## License and Acknowledgments

### License

Refer to the repository's `LICENSE` file for the applicable terms. Add an explicit license statement once the repository's license has been verified.

### Acknowledgments

SwipeX is built using the open-source ecosystem around React, Vite, Tailwind CSS, FastAPI, SQLAlchemy, PostgreSQL, and PyMuPDF.

---

## Author

**Parishkriti Gupta**

B.Tech — Information Technology

- **GitHub:** [@Parishkriti1009](https://github.com/Parishkriti1009)
- **Project Repository:** [SwipeX](https://github.com/Parishkriti1009/SwipeX-Swipe-Based-Intelligent-Job-Discovery-and-Career-Assistance-Platform)

---

*SwipeX — Making job discovery more interactive and career exploration more intuitive.*
