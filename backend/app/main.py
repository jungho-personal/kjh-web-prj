import os
from fastapi import FastAPI
from dotenv import load_dotenv

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
