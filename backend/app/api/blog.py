from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.db.session import get_db
from app.schemas.post import PostListResponse, PostDetail
from app.services.blog_service import list_posts, get_post_by_slug

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=PostListResponse)
def api_list_posts(
    category: Optional[str] = Query(default=None),
    limit: int = Query(default=10, ge=1, le=50),
    cursor: Optional[str] = Query(default=None),
    db: Session = Depends(get_db),
):
    items, next_cursor = list_posts(db, category, limit, cursor)

    resp_items = []
    for p in items:
        resp_items.append(
            {
                "id": str(p.id),
                "slug": p.slug,
                "title": p.title,
                "summary": p.summary,
                "category": p.category,
                "tags": p.tags,
                "published": p.published,
                "created_at": p.created_at,
                "updated_at": p.updated_at,
            }
        )

    return {"items": resp_items, "next_cursor": next_cursor}


@router.get("/{slug}", response_model=PostDetail)
def api_get_post(slug: str, db: Session = Depends(get_db)):
    p = get_post_by_slug(db, slug)
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
        "toc": [],  # MVP: toc는 나중에 붙이자
        "created_at": p.created_at,
        "updated_at": p.updated_at,
    }
