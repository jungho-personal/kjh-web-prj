import os
import base64
from fastapi import Depends, HTTPException, status, Header
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt

security = HTTPBearer(auto_error=False)

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")
JWT_ALG = os.getenv("JWT_ALG", "HS256")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")


def _check_basic_token(raw: str):
    """
    raw: base64("user:password")
    """
    try:
        decoded = base64.b64decode(raw).decode("utf-8")
        user, pwd = decoded.split(":", 1)
    except Exception:
        return False

    return user == ADMIN_USERNAME and pwd == ADMIN_PASSWORD


def require_admin(
    creds: HTTPAuthorizationCredentials | None = Depends(security),
    x_admin_token: str | None = Header(default=None, alias="X-Admin-Token"),
) -> dict:
    """
    Admin 인증 우선순위:
    1) JWT Bearer (기존 방식)
    2) X-Admin-Token (base64(user:pass))
    """

    # 1️⃣ JWT Bearer 인증 (기존 로직 유지)
    if creds is not None and creds.scheme.lower() == "bearer":
        try:
            payload = jwt.decode(creds.credentials, JWT_SECRET, algorithms=[JWT_ALG])
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid token")

        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin only")

        return payload

    # 2️⃣ X-Admin-Token 인증 (AdminEditor용)
    if x_admin_token:
        if _check_basic_token(x_admin_token):
            # AdminEditor에서는 payload까지 필요 없으므로 최소 정보 반환
            return {"role": "admin", "auth": "x-admin-token"}

        raise HTTPException(status_code=401, detail="Invalid admin token")

    # 3️⃣ 아무 인증도 없는 경우
    raise HTTPException(status_code=401, detail="Missing Authorization header")
