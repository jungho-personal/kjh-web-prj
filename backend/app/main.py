import os
from dotenv import load_dotenv
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.db.session import engine
from app.models.base import Base

from app.api.health import router as health_router

load_dotenv()

def create_app() -> FastAPI:
    app_name = os.getenv("APP_NAME", "kjh-web-prj")
    env = os.getenv("ENV", "local")

    app = FastAPI(
        title=app_name,
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # routers
    app.include_router(health_router)

    @app.get("/")
    def root():
        return {"app": app_name, "env": env}

    return app

app = create_app()

# 라우터 include 추가
from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.blog import router as blog_router
from app.api.auth import router as auth_router
from app.api.admin import router as admin_router
from app.api.llm import router as llm_router

app = FastAPI()

app.include_router(health_router)
app.include_router(blog_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(llm_router)

# --- SPA Static serving (React/Vite build) ---
BASE_DIR = Path(__file__).resolve().parent.parent  # backend/app -> backend
STATIC_DIR = BASE_DIR / "static"

# Vite 빌드 산출물: static/assets/*
ASSETS_DIR = STATIC_DIR / "assets"

if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

# favicon 등 루트 정적 파일 대응 (있으면)
# 예: /favicon.ico, /robots.txt 등
@app.get("/{path:path}")
def spa_fallback(path: str, request: Request):
    # ✅ API는 여기서 처리하면 안 됨
    if path.startswith("api"):
        return FileResponse(str(STATIC_DIR / "index.html"))  # (실수 방지용) 실제론 여기 도달 안 하는 게 정상

    # 실제 파일 요청이면 그 파일 반환 (favicon, manifest 등)
    file_path = STATIC_DIR / path
    if file_path.is_file():
        return FileResponse(str(file_path))

    # 그 외( /, /blog, /blog/slug 등)는 모두 index.html 반환
    index = STATIC_DIR / "index.html"
    return FileResponse(str(index))

@app.on_event("startup")
def on_startup():
    # 🚀 배포 환경에서 최초 1회 테이블 생성
    Base.metadata.create_all(bind=engine)