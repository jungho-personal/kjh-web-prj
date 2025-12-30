from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional
from pydantic import BaseModel, Field

Mode = Literal["site_assistant", "general"]


class ChatRequest(BaseModel):
    session_id: str
    message: str
    mode: Mode = "site_assistant"
    context: Dict[str, Any] = Field(default_factory=dict)


class SourceItem(BaseModel):
    type: Literal["post"]
    id: str
    title: str
    score: float


class Usage(BaseModel):
    model: str
    input_tokens: int
    output_tokens: int


class ChatResponse(BaseModel):
    session_id: str
    answer: str
    sources: List[SourceItem] = Field(default_factory=list)
    usage: Optional[Usage] = None
