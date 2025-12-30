from __future__ import annotations

from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Boolean, DateTime, Text, Index
from sqlalchemy.dialects.postgresql import JSONB

from app.models.base import Base


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    slug: Mapped[str] = mapped_column(String(200), unique=True, index=True, nullable=False)

    title: Mapped[str] = mapped_column(String(300), nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=False)

    category: Mapped[str] = mapped_column(String(50), index=True, nullable=False)  # blog/dev_log/portfolio
    tags: Mapped[list[str]] = mapped_column(JSONB, nullable=False, default=list)

    published: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    content_md: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


Index("ix_posts_category_created", Post.category, Post.created_at)
