export function buildDevLogTemplate(dateStr: string) {
  return `# 🛠️ Dev Log – ${dateStr}

## 📌 작업 요약
- (오늘 무엇을 했는지 한 줄 요약)
- (배포 / 기능 / 설정 등 핵심 키워드 위주)

---

## 🧩 작업 내용

### 1. 작업 제목 1
- 무엇을 했는지 1줄
- 왜 이 작업을 했는지 or 어떤 문제를 해결했는지 1줄

### 2. 작업 제목 2
- 작업 내용 요약
- 결과 또는 확인 사항

### 3. 작업 제목 3 (필요 시)
- …
- …

---

## ⚠️ 이슈 & 해결
- 없음

---

## ✅ 현재 상태
- 로컬 실행 여부: OK / NG
- Docker 상태: OK / NG
- 배포 상태: OK / NG
- 외부 접근(URL): OK / NG

---

## 🔜 다음 작업 (Next Step)
- [ ] 다음에 할 작업 1
- [ ] 다음에 할 작업 2
- [ ] 다음에 할 작업 3

---

## 🏷️ Tags
\`#FastAPI\` \`#Docker\` \`#Railway\` \`#DevLog\` \`#PersonalProject\`

## 📂 Category
- Development Log
`;
}
