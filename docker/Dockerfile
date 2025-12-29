FROM python:3.11-slim

# Python 로그가 바로 찍히도록
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# 의존성 먼저 복사/설치 (캐시 효율)
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# 소스 복사
COPY backend /app/backend

# Railway/컨테이너는 보통 PORT 환경변수로 포트를 내려줌
# uvicorn은 --port에 이를 넣어야 함
EXPOSE 8000

CMD ["sh", "-c", "cd /app/backend && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]