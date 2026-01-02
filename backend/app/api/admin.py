from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.dependencies import require_admin
from app.db.session import get_db
from app.schemas.post import PostCreateRequest, PostUpdateRequest, PostDetail
from app.services.blog_service import create_post, update_post, get_post_by_slug_and_category

router = APIRouter(prefix="/admin", tags=["admin"])


def _to_detail(p) -> dict:
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

    return _to_detail(p)


@router.patch("/posts/{post_id}", response_model=PostDetail)
def api_update_post(
    post_id: int,
    req: PostUpdateRequest,
    _admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    updates = req.model_dump(exclude_unset=True, exclude_none=True)
    try:
        p = update_post(db, post_id, updates)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Slug already exists")

    if not p:
        raise HTTPException(status_code=404, detail="Post not found")

    return _to_detail(p)


# ✅ Edit 초기 로드용: slug + category로 단건 조회
@router.get("/posts/by-slug", response_model=PostDetail)
def api_get_post_by_slug(
    slug: str = Query(...),
    category: str = Query(...),
    _admin=Depends(require_admin),
    db: Session = Depends(get_db),
):
    p = get_post_by_slug_and_category(db, slug=slug, category=category)
    if not p:
        raise HTTPException(status_code=404, detail="Post not found")
    return _to_detail(p)