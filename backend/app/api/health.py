from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.get("/healthz")
def health_checkz():
    return {"status": "ok"}
