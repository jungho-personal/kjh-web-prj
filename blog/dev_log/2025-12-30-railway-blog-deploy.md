# 🛠️ Dev Log – 2025.12.30

## 📌 작업 요약
- Railway 배포 환경에 Blog 서비스 정식 배포
- PostgreSQL 연동 및 운영 DB 초기화
- React + FastAPI 단일 서버 SPA 구조 완성

---

## 🧩 작업 내용

### 1. PostgreSQL 초기 세팅 및 Railway 연동
- Railway 프로젝트에 PostgreSQL 서비스 추가 및 DATABASE_URL 연동
- 로컬 `.env`가 아닌 Railway Variables 기준으로 배포 환경 설정
- 배포 환경에서 DB 연결 실패 이슈를 로그 기반으로 추적하여 해결

### 2. 운영 DB 테이블 자동 생성 처리
- FastAPI startup 이벤트에서 `Base.metadata.create_all()` 실행
- 배포 환경에서 테이블이 없는 경우 자동 생성되도록 처리
- 별도 마이그레이션 도구(Alembic) 도입 전, 초기 안정화 전략으로 채택

### 3. Blog API 실데이터 CRUD 검증
- `/api/admin/posts`를 통해 운영 DB에 글 insert 테스트
- `/api/posts`, `/blog` 화면에서 실제 데이터 렌더링 확인
- Fake DB 완전 제거 후 실 DB 기반 서비스 전환 완료

### 4. React SPA 라우팅 & Static 서빙 이슈 해결
- `/blog`, `/blog/:slug` 정상 동작 확인
- `/` 진입 시 흰 화면 발생 이슈를 React Router 설정 문제로 특정
- FastAPI SPA fallback 라우트 구성 및 React Router route 위치 수정으로 해결

### 5. 단일 서버 구조 배포 완료
- React build 결과물을 FastAPI `static/`에서 직접 서빙
- 프론트/백엔드 분리 없이 단일 Railway Web Service로 운영
- 배포 URL 기준 `/`, `/blog`, `/api/*` 정상 동작 확인

---

## ⚠️ 이슈 & 해결

- **이슈**: Railway 배포 후 서비스 Crash 발생  
  - **원인**: DATABASE_URL 미설정 (Railway PostgreSQL 미생성 상태)
  - **해결**: Railway PostgreSQL 서비스 추가 후 Variables에 DB URL 연동

- **이슈**: `/` 경로 진입 시 흰 화면 출력  
  - **원인**: React Router에 `/` 라우트 미정의
  - **해결**: Home 라우트 추가 및 route 선언 위치 수정

- **이슈**: 배포 환경 DB에 테이블이 존재하지 않음  
  - **원인**: 운영 DB 초기화 미수행
  - **해결**: FastAPI startup 시 create_all() 실행하도록 처리

---

## ✅ 현재 상태
- 로컬 실행 여부: OK
- Docker 상태: OK
- 배포 상태: OK (Railway)
- 외부 접근(URL): OK
  - `/`
  - `/blog`
  - `/blog/{slug}`
  - `/api/posts`

---

## 🔜 다음 작업 (Next Step)
- [ ] Dev Log 전용 페이지(`/dev-log`) 분리
- [ ] Admin 글 작성 UI 추가 (Swagger 의존 제거)
- [ ] 시간 표시 KST 변환 처리 (프론트 레벨)
- [ ] Alembic 기반 DB 마이그레이션 도입 검토
- [ ] LLM 연동을 통한 Dev Log 초안 자동 생성 기능 추가

---

## 🏷️ Tags
`#FastAPI` `#React` `#Railway` `#PostgreSQL` `#SPA` `#DevLog` `#PersonalProject`

## 📂 Category
- Development Log
