from fastapi import APIRouter
from app.schemas.llm import ChatRequest, ChatResponse, Usage

router = APIRouter(prefix="/api/llm", tags=["llm"])


@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    # 지금은 스텁. 다음 단계에서 app/core/llm_client.py + services/llm_service.py로 연결.
    answer = f"[mode={req.mode}] 너의 메시지: {req.message}\n\n(다음 단계에서 RAG/모델 연결 예정)"
    return {
        "session_id": req.session_id,
        "answer": answer,
        "sources": [],
        "usage": Usage(model="stub", input_tokens=0, output_tokens=0),
    }
