from __future__ import annotations

import os
import hmac
import hashlib
import base64
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Response, Request
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

ADMIN_USER = os.getenv("ADMIN_USERNAME", "")
ADMIN_PASS = os.getenv("ADMIN_PASSWORD", "")
ADMIN_SESSION_SECRET = os.getenv("ADMIN_SESSION_SECRET", "change-me")

COOKIE_NAME = "admin_session"
COOKIE_MAX_AGE = 60 * 60 * 12  # 12 hours


class AdminLoginRequest(BaseModel):
    username: str
    password: str


def _sign(value: str) -> str:
    sig = hmac.new(ADMIN_SESSION_SECRET.encode(), value.encode(), hashlib.sha256).digest()
    return base64.urlsafe_b64encode(sig).decode()


def _make_cookie_payload(username: str) -> str:
    exp = int((datetime.utcnow() + timedelta(seconds=COOKIE_MAX_AGE)).timestamp())
    raw = f"{username}|{exp}"
    sig = _sign(raw)
    return f"{raw}|{sig}"


def verify_admin_cookie(payload: str) -> bool:
    """
    dependencies.py에서도 쓰려고 공개 함수로 둠.
    payload format: username|exp_ts|sig(base64url(hmac))
    """
    try:
        username, exp_s, sig = payload.split("|")
        raw = f"{username}|{exp_s}"

        if not hmac.compare_digest(_sign(raw), sig):
            return False

        if int(exp_s) < int(datetime.utcnow().timestamp()):
            return False

        # username은 굳이 비교 안 해도 되지만,
        # 혹시 ADMIN_USERNAME이 바뀐 경우를 대비해서 체크하고 싶으면 아래 주석 해제
        # if username != ADMIN_USER:
        #     return False

        return True
    except Exception:
        return False


@router.post("/admin/login")
def admin_login(req: AdminLoginRequest, response: Response):
    if not ADMIN_USER or not ADMIN_PASS:
        # 운영/로컬 env 누락 방지
        raise HTTPException(status_code=500, detail="Admin credentials not configured")

    if req.username != ADMIN_USER or req.password != ADMIN_PASS:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    cookie_val = _make_cookie_payload(req.username)
    response.set_cookie(
        key=COOKIE_NAME,
        value=cookie_val,
        httponly=True,
        samesite="lax",
        secure=False,  # ✅ 운영 HTTPS면 True 권장 (Railway는 보통 HTTPS)
        max_age=COOKIE_MAX_AGE,
        path="/",
    )
    return {"ok": True}


@router.post("/admin/logout")
def admin_logout(response: Response):
    response.delete_cookie(key=COOKIE_NAME, path="/")
    return {"ok": True}


@router.get("/admin/me")
def admin_me(request: Request):
    v = request.cookies.get(COOKIE_NAME)
    if not v or not verify_admin_cookie(v):
        raise HTTPException(status_code=401, detail="Not logged in")
    return {"ok": True}
