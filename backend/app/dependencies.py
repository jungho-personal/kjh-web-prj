from __future__ import annotations

from fastapi import HTTPException, Request

from app.api.auth import verify_admin_cookie

COOKIE_NAME = "admin_session"


def require_admin(request: Request) -> dict:
    v = request.cookies.get(COOKIE_NAME)
    if not v or not verify_admin_cookie(v):
        raise HTTPException(status_code=401, detail="Admin only")
    return {"role": "admin"}
