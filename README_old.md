# kjh-web-prj

Personal & Development Blog + Portfolio + LLM Web Service  
Stack: FastAPI + React + PostgreSQL(+pgvector)  
Deploy: Railway

## Run (Local)
```bash
cd backend
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1

pip install -r requirements.txt
uvicorn app.main:app --reload

Endpoints
http://127.0.0.1:8000/
http://127.0.0.1:8000/health
http://127.0.0.1:8000/docs