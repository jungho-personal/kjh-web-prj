import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()  # ✅ .env 로드

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing. Check backend/.env or environment variables.")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

with engine.connect() as conn:
    print(conn.execute(text("select 1")).fetchall())
    print(conn.execute(text("select extname from pg_extension")).fetchall())
