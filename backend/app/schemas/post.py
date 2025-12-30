from __future__ import annotations

from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, Field

Category = Literal["blog", "dev_log", "portfolio"]


class PostBase(BaseModel):
    id: str
    slug: str
    title: str
    summary: str
    category: Category
    tags: List[str] = Field(default_factory=list)
    published: bool
    created_at: datetime
    updated_at: datetime


class TocItem(BaseModel):
    text: str
    anchor: str
    level: int


class PostDetail(PostBase):
    content_md: str
    toc: List[TocItem] = Field(default_factory=list)


class PostListResponse(BaseModel):
    items: List[PostBase]
    next_cursor: Optional[str] = None


class PostCreateRequest(BaseModel):
    title: str
    slug: str
    summary: str
    category: Category
    tags: List[str] = Field(default_factory=list)
    content_md: str
    published: bool = True


class PostUpdateRequest(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    category: Optional[Category] = None
    tags: Optional[List[str]] = None
    content_md: Optional[str] = None
    published: Optional[bool] = None
