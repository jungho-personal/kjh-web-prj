import os
from pathlib import Path
from dotenv import load_dotenv

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from app.db.session import engine
from app.models.base import Base

from app.api.health import router as health_router
from app.api.blog import router as blog_router
from app.api.auth import router as auth_router
from app.api.admin import router as admin_router
from app.api.llm import router as llm_router

load_dotenv()

@app.on_event("startup")
def on_startup():
    if os.getenv("DB_AUTO_CREATE", "true").lower() == "true":
        Base.metadata.create_all(bind=engine)

def create_app() -> FastAPI:
    app_name = os.getenv("APP_NAME", "kjh-web-prj")
    env = os.getenv("ENV", "local")

    app = FastAPI(
        title=app_name,
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ✅ API prefix 통일 (프론트 proxy "/api"와 일치)
    app.include_router(health_router, prefix="/api")
    app.include_router(blog_router, prefix="/api")
    app.include_router(auth_router, prefix="/api")
    app.include_router(admin_router, prefix="/api")
    app.include_router(llm_router, prefix="/api")

    @app.get("/api")
    def api_root():
        return {"app": app_name, "env": env}

    # --- SPA Static serving (React/Vite build) ---
    BASE_DIR = Path(__file__).resolve().parent.parent  # backend/app -> backend
    STATIC_DIR = BASE_DIR / "static"
    ASSETS_DIR = STATIC_DIR / "assets"
    ASSET_PDF = Path(__file__).resolve().parent / "assets" / "resume.pdf"  # backend/app/assets/resume.pdf

    @app.get("/resume.pdf")
    def serve_resume_pdf_inline():
        # ✅ inline: iframe/브라우저 보기용 (filename 빼는 게 포인트)
        return FileResponse(
            path=str(ASSET_PDF),
            media_type="application/pdf",
        )
    
    @app.get("/resume-download.pdf")
    def serve_resume_pdf_download():
        # ✅ attachment: 다운로드용
        return FileResponse(
            path=str(ASSET_PDF),
            media_type="application/pdf",
            filename="resume.pdf",
        )

    if ASSETS_DIR.exists():
        app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

    # favicon/robots 등 정적 파일 직접 반환 + SPA fallback
    @app.get("/{path:path}")
    def spa_fallback(path: str, request: Request):
        # ✅ API는 절대 SPA fallback으로 보내면 안 됨 (404로 떨어져야 정상)
        if path.startswith("api"):
            return JSONResponse({"detail": "Not Found"}, status_code=404)

        file_path = STATIC_DIR / path
        if file_path.is_file():
            return FileResponse(str(file_path))

        index = STATIC_DIR / "index.html"
        return FileResponse(str(index))

    @app.on_event("startup")
    def on_startup():
        Base.metadata.create_all(bind=engine)

    return app

app = create_app()
