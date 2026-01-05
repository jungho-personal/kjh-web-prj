export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  techStack: string[];
  overview: string;
  problem: string;
  solution: string;
  results: string[];
  images?: string[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "personal-blog",
    title: "Personal Blog & Portfolio",
    subtitle: "FastAPI + React 통합 개인 서비스",
    period: "2025.12 – Present",
    role: "Full Stack Developer",
    techStack: ["FastAPI", "React", "PostgreSQL", "Docker", "Railway"],
    overview:
      "개인 블로그, Dev Log, 포트폴리오, LLM Playground를 하나의 서비스로 통합한 웹 애플리케이션.",
    problem:
      "개인 프로젝트들을 흩어진 문서/레포가 아닌 하나의 운영 가능한 서비스로 관리하고 싶었다.",
    solution:
      "FastAPI와 React를 통합 배포하고, 글/작품/실험 영역을 명확히 분리한 구조로 설계했다.",
    results: [
      "Blog / Dev Log / Resume / Playground 통합",
      "Admin 글쓰기 및 운영 환경 배포 완료",
      "실제 운영 가능한 개인 서비스 구축",
    ],
  },

  // ✅ 추가 프로젝트
  {
    slug: "llm-playground",
    title: "LLM Playground",
    subtitle: "Prompt · Model · Response 실험 환경",
    period: "2026.01 – Present",
    role: "Backend / AI Engineer",
    techStack: ["FastAPI", "OpenAI API", "PgVector", "React"],
    overview:
      "LLM을 활용한 다양한 실험을 빠르게 검증하기 위한 Playground 형태의 서비스.",
    problem:
      "프롬프트, 모델, 파라미터를 바꿔가며 실험할 때마다 코드 수정이 필요했다.",
    solution:
      "웹 UI에서 프롬프트/모델/옵션을 제어하고 결과를 즉시 확인할 수 있는 Playground를 구축했다.",
    results: [
      "Prompt 실험 속도 대폭 향상",
      "RAG / Vector DB 실험 환경 확보",
      "사내/개인 AI 실험용 베이스 플랫폼 완성",
    ],
  },
];
