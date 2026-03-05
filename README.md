# Bruin Match

A full-stack web application designed for UCLA students to find and connect with compatible roommates on one centralized platform. Users create a profile, fill out a lifestyle survey, browse other students, and form roommate groups. 

---

## Tech Stack
- React
- Node.js/Express
- PostgreSQL
- JWT Auth

---

## Features

- **Secure authentication** — signup/login with username/email + password (bcrypt hashing, JWT sessions)
- **Multi-step onboarding** — 4-step profile + lifestyle survey (13 fields total)
- **Browse & filter** — server-side filtering by academic year, housing type, room type, and move-in term with pagination
- **Match requests** *(in progress)* — send, accept, or reject roommate requests
- **Roommate groups** *(in progress)* — form and manage multi-person groups
- **Chat with roommate groups** *(in progress)* — send and receive messages with roommate groups within the app

---

## Prerequisites

- **Node.js** v20+
- **PostgreSQL** v14+
- **npm** v8+

---

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd bruin-match
```

### 2. Create the PostgreSQL database

```bash
createdb bruin_match
```

Then run the schema to create all tables:

```bash
psql -d bruin_match -f backend/schema.sql
```

### 3. Configure the backend environment

Create `backend/.env`:

```env
PORT=3001
JWT_SECRET=replace_with_a_long_random_secret

PGUSER=your_postgres_user
PGHOST=localhost
PGDATABASE=bruin_match
PGPASSWORD=your_postgres_password
PGPORT=5432
```

> **Note:** Never commit `.env` to version control. It is already listed in `.gitignore`.

### 4. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 5. Start the servers

In one terminal:

```bash
cd backend
npm start
# Server running on http://localhost:3001
```

In another terminal:

```bash
cd frontend
npm run dev
# App running on http://localhost:5173
```

---

## Database Schema

### `users`
Stores authentication credentials.

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| username | VARCHAR(50) | Unique, not null |
| email | VARCHAR(255) | Unique, not null |
| password_hash | VARCHAR(255) | bcrypt |
| created_at | TIMESTAMP | |

### `user_profiles`
Stores display and filterable profile data.

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| user_id | INTEGER FK | References `users(id)`, unique |
| full_name | VARCHAR(100) | |
| academic_year | VARCHAR(20) | Freshman / Sophomore / Junior / Senior / Grad |
| major | VARCHAR(100) | |
| gender | VARCHAR(50) | |
| contact_info | VARCHAR(255) | |
| housing_type | VARCHAR(50) | Dorms / University Apartments / Off-Campus |
| room_type | VARCHAR(100) | Classic / Deluxe / Suite / etc. |
| move_in_term | VARCHAR(50) | e.g. Fall 2025 |

### `user_preferences`
Stores lifestyle survey answers.

| Column | Type | Notes |
|---|---|---|
| id | SERIAL PK | |
| user_id | INTEGER FK | References `users(id)`, unique |
| sleep_time | VARCHAR(50) | |
| wake_time | VARCHAR(50) | |
| thermostat_temp | VARCHAR(50) | |
| guest_policy | VARCHAR(50) | |
| noise_tolerance | VARCHAR(50) | |

> Profile + preferences are written together in a single transaction (`BEGIN` / `COMMIT`) with `ON CONFLICT DO UPDATE` so partial updates are atomic.
