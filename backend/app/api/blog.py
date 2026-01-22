from __future__ import annotations

from math import ceil
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from app.db.session import get_db
from app.schemas.post import PostListResponse, PostDetail
from app.services.blog_service import list_posts_page, get_post_by_slug

router = APIRouter(prefix="/posts", tags=["posts"])



@router.get("", response_model=PostListResponse)
def api_list_posts(
    category: Optional[str] = Query(default=None),
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=5, ge=1, le=50),
    db: Session = Depends(get_db),
):
    items, total = list_posts_page(db, category, page, page_size)
    total_pages = max(1, int(ceil(total / page_size))) if total > 0 else 1

    return {
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }

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
