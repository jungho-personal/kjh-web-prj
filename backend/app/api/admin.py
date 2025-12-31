from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import require_admin
from app.db.session import get_db
from app.schemas.post import PostCreateRequest, PostUpdateRequest, PostDetail
from app.services.blog_service import create_post, update_post

from sqlalchemy.exc import IntegrityError


router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/posts", response_model=PostDetail)
def api_create_post(
    req: PostCreateRequest,
    _admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    try:
        p = create_post(db, req.model_dump())
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Slug already exists")

    return {
        "id": str(p.id),
        "slug": p.slug,
        "title": p.title,
        "summary": p.summary,
        "category": p.category,
        "tags": p.tags,
        "published": p.published,
        "content_md": p.content_md,
        "toc": [],
        "created_at": p.created_at,
        "updated_at": p.updated_at,
    }


@router.patch("/posts/{post_id}", response_model=PostDetail)
def api_update_post(
    post_id: int,
    req: PostUpdateRequest,
    _admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    updates = req.model_dump(exclude_unset=True)
    try:
        p = update_post(db, post_id, updates)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Slug already exists")

    if not p:
        raise HTTPException(status_code=404, detail="Post not found")

    return {
        "id": str(p.id),
        "slug": p.slug,
        "title": p.title,
        "summary": p.summary,
        "category": p.category,
        "tags": p.tags,
        "published": p.published,
        "content_md": p.content_md,
        "toc": [],
        "created_at": p.created_at,
        "updated_at": p.updated_at,
    }