# kjh-web-prj
Personal & Development Blog and Portfolio

## Purpose
- What: Personal web service integrating Blog, Development Log, and Portfolio.
- Goals: long-term maintainability, simple architecture, real-world deployment/ops learning.
- Not in scope: multi-user, external auth/roles, HA/large-scale traffic, enterprise-level compliance.

## Architecture
- Single Server Principle:
  - React (SPA) is built and served as static assets by FastAPI.
- Deployment: Railway (Docker-based)
- Database: Railway-managed PostgreSQL

> Current runtime rules, repository structure, and environment facts are the single source of truth in `PROJECT_CONTEXT.txt`.

## Project Status
- This project is in a “Hardening / Polish” phase:
  - clarify experimental/placeholder areas to avoid user confusion
  - minimize sensitive exposure
  - avoid major refactors and feature expansion

## Environment (Facts)
- Local OS: Windows 11
- Python: 3.11.x
- Frontend: React + Vite + TypeScript
- Backend: FastAPI + SQLAlchemy
- DB: PostgreSQL (+ pgvector extension)

(See `PROJECT_CONTEXT.txt` for details.)

## How to Run (Local)
> NOTE: Commands may vary by local setup. Prefer `PROJECT_CONTEXT.txt` if there is any mismatch.

- Frontend (dev):
  - `cd frontend`
  - `npm install`
  - `npm run dev`

- Frontend (build):
  - `cd frontend`
  - `npm run build`
  - build output is served by backend as static assets

- Backend (dev):
  - `cd backend`
  - create venv and install requirements
  - run FastAPI entry (see `PROJECT_CONTEXT.txt` for the exact entrypoint/export)

## How to Test
- No formal automated test suite yet (manual verification only).

## Working Style
- This project follows `AGENTS.md`.
- Current active focus is tracked in `SYNC.md`.
- Facts must be kept current in `PROJECT_CONTEXT.txt`.
