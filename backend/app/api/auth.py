import os
import time
import jwt
from fastapi import APIRouter, HTTPException

from app.schemas.auth import LoginRequest, LoginResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
JWT_ALG = os.getenv("JWT_ALG", "HS256")
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")  # 로컬용. 배포에서는 반드시 환경변수!


@router.post("/login", response_model=LoginResponse)
def login(req: LoginRequest):
    if req.username != ADMIN_USERNAME or req.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    now = int(time.time())
    exp = now + 3600
    token = jwt.encode({"sub": req.username, "role": "admin", "iat": now, "exp": exp}, JWT_SECRET, algorithm=JWT_ALG)

    return {"access_token": token, "token_type": "bearer", "expires_in": 3600}
