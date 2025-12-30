from app.db.session import engine
from app.models.base import Base

# 중요: 모델을 import 해야 Base가 테이블을 알게 됨
from app.models.post import Post  # noqa: F401


def init_db():
    Base.metadata.create_all(bind=engine)
