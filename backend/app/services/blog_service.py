from __future__ import annotations

import base64
import json
from datetime import datetime
from typing import Optional, Tuple, List

from sqlalchemy import select, desc
from sqlalchemy.orm import Session

from app.models.post import Post


def _encode_cursor(offset: int) -> str:
    raw = json.dumps({"offset": offset}).encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("utf-8")


def _decode_cursor(cursor: Optional[str]) -> int:
    if not cursor:
        return 0
    try:
        raw = base64.urlsafe_b64decode(cursor.encode("utf-8"))
        payload = json.loads(raw.decode("utf-8"))
        return int(payload.get("offset", 0))
    except Exception:
        return 0


def list_posts(
    db: Session,
    category: Optional[str],
    limit: int,
    cursor: Optional[str],
) -> Tuple[List[Post], Optional[str]]:
    offset = _decode_cursor(cursor)

    stmt = select(Post).where(Post.published.is_(True))
    if category:
        stmt = stmt.where(Post.category == category)

    stmt = stmt.order_by(desc(Post.created_at)).offset(offset).limit(limit + 1)
    rows = db.execute(stmt).scalars().all()

    has_next = len(rows) > limit
    items = rows[:limit]
    next_cursor = _encode_cursor(offset + limit) if has_next else None
    return items, next_cursor


def get_post_by_slug(db: Session, slug: str) -> Optional[Post]:
    stmt = select(Post).where(Post.slug == slug)
    return db.execute(stmt).scalars().first()


def create_post(db: Session, data: dict) -> Post:
    post = Post(
        slug=data["slug"],
        title=data["title"],
        summary=data["summary"],
        category=data["category"],
        tags=data.get("tags", []),
        published=data.get("published", True),
        content_md=data["content_md"],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def update_post(db: Session, post_id: int, updates: dict) -> Optional[Post]:
    post = db.get(Post, post_id)
    if not post:
        return None

    for k, v in updates.items():
        setattr(post, k, v)

    post.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(post)
    return post