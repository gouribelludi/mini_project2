# Mini Project 2 — Neuro Paincare AI

Neuro Paincare AI is a student mini-project for exploring digital support for
people managing chronic and neuropathic pain. It combines a React web
application with a Spring Boot backend for account registration and login,
AI-assisted pain assessment and chat, and health-tracking features.

> **Important:** This project is an educational prototype, not a medical
> device or a substitute for diagnosis, treatment, or advice from a qualified
> healthcare professional. AI-generated content and example datasets may be
> incomplete or inaccurate. For urgent symptoms, contact local emergency
> services.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Run locally](#run-locally)
- [Application routes](#application-routes)
- [Backend API](#backend-api)
- [Data and persistence](#data-and-persistence)
- [Supporting chatbot materials](#supporting-chatbot-materials)
- [Build and tests](#build-and-tests)
- [Current limitations and future work](#current-limitations-and-future-work)

## Features

The current application includes:

- **Account access:** registration and login pages, with password hashes
  stored by the backend.
- **Pain assessment:** enter a body area, pain level, sensation, timing, and
  additional details. The backend uses the Gemini API to generate a care-plan
  response and can consult the sample historical pain CSV.
- **Body mapping:** select a body area and provide pain details through the
  mapping workflow.
- **AI chat:** send a message to the backend and display an AI-generated
  response, with suggested questions in the interface.
- **Dashboard:** view pain history, care-plan insights, medication reminders,
  and a daily self-care checklist.
- **Trackers:** record daily water, sleep, and mood values.
- **Emergency assistance:** search for nearby emergency centers using
  location/search services and show results on a map.
- **Profile:** view and edit profile details and recent assessment activity.

The frontend also contains login, registration, and password-reset screens.
The password-reset screen is currently a visual interface; a password-reset
service is not implemented.

## Technology

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite 8, React Router, Axios, Framer Motion |
| Backend | Java 17, Spring Boot 4, Spring Web MVC, Spring Security, Spring Data JPA |
| Database | MySQL |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Map/location services | Browser location and third-party IP, Nominatim, Overpass, and map services |

## Project structure

```text
mini_project2/
├── README.md
├── generate_qna.py
├── neuropain_care_chatbot_qna.csv
├── care_backend/
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/com/neuropain/care/
│       │   │   ├── config/       # Security and CORS configuration
│       │   │   ├── controller/   # Authentication and application APIs
│       │   │   ├── dto/          # API request and response models
│       │   │   ├── model/        # JPA entities
│       │   │   ├── repository/   # Database repositories
│       │   │   └── service/      # Gemini and CSV services
│       │   └── resources/
│       │       ├── application.properties
│       │       └── pain.csv
│       └── test/
└── neuropain-care-ai-frontend/
    ├── package.json
    ├── package-lock.json
    ├── index.html
    ├── generate_questions_pdf.py
    ├── bootpress-chatbot-questions-500.pdf
    └── src/
        ├── components/
        ├── context/
        ├── data/
        ├── pages/
        └── services/
```

## Prerequisites

- Java 17 or newer
- Node.js compatible with Vite 8 and npm
- MySQL server
- Internet access for Gemini requests and the emergency location/map features
- A Google Gemini API key for live AI responses

## Configuration

### MySQL

The backend configuration is in
`care_backend/src/main/resources/application.properties`. It is currently set
up for a local MySQL server and the database name `paincare_db`. Configure a
MySQL account that can create/use this database, or update the datasource
settings for your own database:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/paincare_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Gemini API key

Set the `GEMINI_API_KEY` environment variable before starting the backend.
Spring Boot maps it to the `gemini.api.key` configuration property. Keep API
keys private: do not add them to source control, screenshots, or this README.
If a key has been committed or exposed, revoke it and create a replacement in
Google AI Studio.

The backend listens on port `8080`. The frontend API client is configured to
call `http://localhost:8080/api`. The backend's CORS configuration permits the
Vite development origin `http://localhost:5173`.

## Run locally

Open two terminals from the project root.

### 1. Start the backend

Ensure MySQL is running and the datasource credentials are configured. In
PowerShell:

```powershell
$env:GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"
cd .\care_backend
.\mvnw.cmd spring-boot:run
```

The service will start at `http://localhost:8080`.

### 2. Start the frontend

In a second terminal:

```powershell
cd .\neuropain-care-ai-frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Register
an account to access the protected application pages.

## Application routes

| Path | Page |
| --- | --- |
| `/` | Login |
| `/login` | Login |
| `/register` | Registration |
| `/forgot-password` | Password-reset interface (reset service not yet connected) |
| `/home` | Home |
| `/options` | Choose an assessment workflow |
| `/assessment` | Pain assessment |
| `/body-mapping` | Body-mapping assessment |
| `/chatbot` | AI chat assistant |
| `/dashboard` | Health dashboard |
| `/trackers` | Daily trackers |
| `/suggestion` | Generated care-plan display |
| `/emergency` | Emergency assistance and nearby centers |
| `/profile` | User profile and recent activity |

All paths except login, registration, and forgot password are wrapped in the
frontend's protected-route component.

## Backend API

All API routes use the `/api` prefix. Request and response bodies are JSON.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register with `name`, `email`, and `password` |
| `POST` | `/api/auth/login` | Log in with `email` and `password` |
| `POST` | `/api/pain-assessment` | Generate care-plan recommendations |
| `POST` | `/api/chat` | Send a chat message and receive an AI response |

Pain-assessment requests use the fields `bodyPart`, `painLevel`, `sensation`,
`timing`, and `details`. Chat requests use `message`. Account records are
stored in MySQL; passwords are hashed with BCrypt.

## Data and persistence

- `care_backend/src/main/resources/pain.csv` is a sample historical dataset
  that the backend searches for rows matching the selected body area.
- User accounts are persisted in MySQL.
- Assessment history, profile details, dashboard checklists, reminders, and
  tracker values are stored by the frontend in browser `localStorage`, keyed
  by the signed-in user's email. This data is local to the browser and is not
  synchronized between devices.
- The emergency page relies on external location and map services. Results
  depend on network availability, browser location permissions, and those
  providers.

## Supporting chatbot materials

- `neuropain_care_chatbot_qna.csv` contains chatbot question-and-answer
  material.
- `generate_qna.py` generates a PDF from the root Q&A CSV; the generated PDF
  is written to the project root.
- `neuropain-care-ai-frontend/generate_questions_pdf.py` generates the
  included `bootpress-chatbot-questions-500.pdf`.

These materials are supporting/knowledge-base files. The running chat flow
currently sends messages to the Gemini API; it does not load the Q&A CSV or
PDF as a chatbot knowledge base.

## Build and tests

Build the frontend:

```powershell
cd .\neuropain-care-ai-frontend
npm run build
```

Run backend tests:

```powershell
cd .\care_backend
.\mvnw.cmd test
```

## Current limitations and future work

The following areas are not fully implemented and are possible future
improvements for **Mini Project 2**:

- Connect the password-reset page to a secure reset-token and email workflow.
- Replace local-only profile, assessment, dashboard, and tracker data with
  authenticated backend persistence and synchronization.
- Add automated frontend tests and expand backend tests for authentication,
  assessment, and chat endpoints.
- Improve input validation, API error handling, and security controls before
  any public or production deployment.
- Add accessible, clinically reviewed care guidance and clear safety
  escalation behavior; AI output must remain supplementary.
- Integrate and maintain the chatbot CSV/PDF as a searchable, reviewed
  knowledge base if that is desired.
- Add the planned component and interaction areas where needed: dedicated AI
  recommendation/remedy/warning components, richer body-model visualization,
  reusable chatbot/voice-assistant components, emergency action/hospital
  components, and additional exercise, mood, sleep, and water tracker
  components.

These items describe potential work, not features that should be assumed to
exist in the current application.
