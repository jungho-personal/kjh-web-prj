import os
import time
import jwt
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

load_dotenv()

router = APIRouter(tags=["auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(req: LoginRequest):
    admin_user = os.getenv("ADMIN_USERNAME", "")
    admin_pass = os.getenv("ADMIN_PASSWORD", "")
    jwt_secret = os.getenv("JWT_SECRET", "")
    jwt_alg = os.getenv("JWT_ALG", "HS256")

    if not jwt_secret:
        raise HTTPException(status_code=500, detail="JWT_SECRET not configured")

    if req.username != admin_user or req.password != admin_pass:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    now = int(time.time())
    exp = now + 3600
    token = jwt.encode(
        {"sub": req.username, "role": "admin", "iat": now, "exp": exp},
        jwt_secret,
        algorithm=jwt_alg,
    )
    print("ENV ADMIN_USERNAME:", os.getenv("ADMIN_USERNAME"))
    return {"access_token": token, "token_type": "bearer", "expires_in": 3600}
