import type { PortfolioDetail, PortfolioListItem } from "./types";

export const portfolioDetails: PortfolioDetail[] = [
  // Volvo CRM_DW 운영 & 유지보수
  {
    slug: "volvo-crm-dw-ops",
    title: "Volvo Car Korea – CRM DW 운영 & 유지보수",
    tab: "DW",
    period: "2023.08 ~ 2025.12",
    roles: ["DW Engineer"],
    subtitle: "CRM DW 운영 안정화 및 데이터 품질 관리",
    summary:
      "Volvo Car Korea의 CRM 데이터를 기반으로 마케팅·영업 분석을 지원하는 DW 시스템을 운영하며, 배치 안정성·데이터 정합성·장애 대응을 중심으로 실무 전반을 담당했습니다.",
    techStack: [
      "Oracle",
      "SQL Server",
      "Python",
      "Stored Procedure",
      "Windows Server",
      "ETL",
    ],
    heroImage: "volvo-crm-dw-ops__dw__hero.png",

    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "2023.08 ~ 2025.12" },
          { label: "고객사", value: "Volvo Car Korea" },
          { label: "프로젝트 성격", value: "CRM Data Warehouse 운영 및 유지보수" },
          { label: "팀 구성", value: "2명 (특급 1 / 중급 1)" },
          { label: "내 역할", value: "중급 DW 엔지니어, 운영 실무 전담" }
        ],
        extraTitle: "담당 범위",
        extraItems: [
          "일 배치 모니터링 및 장애 대응",
          "데이터 추출 요청 처리 (내부/외부 협력업체)",
          "Windows Server 정기 업데이트 및 운영 관리",
          "고객 요구사항 기반 DW 운영 지원"
        ]
      },

      {
        type: "text",
        title: "Context",
        body: [
          "본 프로젝트는 Volvo Car Korea의 CRM 데이터를 기반으로 마케팅·영업 성과 분석을 지원하는 운영 중심의 DW 시스템입니다.",
          "DW는 단순 적재를 넘어 실제 비즈니스 의사결정에 직접 활용되는 데이터 플랫폼으로 운영되었습니다."
        ],
        bulletsTitle: "주요 활용",
        bullets: [
          "캠페인 성과 분석",
          "판매 및 마케팅 전략 수립",
          "외부 협력업체 리포트 제공"
        ],
        tail: [
          "따라서 배치 안정성, 데이터 정확성, 응답 속도가 무엇보다 중요했습니다."
        ]
      },

      {
        type: "bullets",
        title: "Scale & Usage",
        items: [
          "Staging / ODS / Dimension / Fact / Mart 구조의 DW 운영",
          "190개 이상의 테이블, 1억 건 이상 데이터 관리",
          "대규모 대시보드 3종 및 다수의 리포트 운영",
          "2024~2025년 기준 약 14,400건의 리포트 추출 및 제공",
        ],
      },

      {
        type: "bullets",
        title: "My Role",
        items: [
          "매일 ETL 배치 모니터링 및 장애 대응",
          "데이터 추출 요청 처리 (고객사 및 외부 협력업체)",
          "Windows Server 정기 업데이트 및 운영 환경 관리",
          "DW 운영 전반에 대한 고객 요구사항 대응",
        ],
      },

      {
        type: "challenges",
        title: "Challenges & Solutions",
        items: [
          {
            issue: "ETL 배치 실패로 인한 업무 영향 가능성",
            cause:
              "다수의 원천 시스템에서 데이터를 수집하는 구조로, 사전 공유 없는 변경 발생",
            fix:
              "ETL 종료 메일 기반 모니터링 프로세스를 통해 고객사 출근 전 장애를 선제적으로 처리",
            result:
              "업무 시간 내 장애 발생 최소화 및 DW 운영 안정성 유지",
          },
          {
            issue: "원천 시스템 데이터 포맷(JSON) 변경으로 ETL 에러 발생",
            cause:
              "원천 데이터 구조 변경 사항이 사전에 공유되지 않음",
            fix:
              "로그 분석을 통해 원인 파악 후 JSON parsing 로직 수정 및 재적재 수행",
            result:
              "ETL 정상화 및 유사 장애 재발 방지",
          },
          {
            issue: "불명확하거나 잘못된 데이터 추출 요청",
            fix:
              "요청자의 의사결정 목적을 파악한 뒤 필요한 데이터 조건을 재정의하여 추출",
            result:
              "단순 데이터 제공을 넘어 신뢰도 높은 분석 데이터 제공",
          },
        ],
      },

      {
        type: "stack",
        title: "Tech Stack",
        items: [
          "Oracle",
          "SQL Server",
          "Python",
          "Stored Procedure",
          "Windows Server",
          "ETL Pipeline",
        ],
      },

      {
        type: "media",
        title: "ETL Batch Job Overview",
        items: [
          {
            kind: "arch",
            filename: "volvo-crm-dw-ops__dw__arch.png",
            caption: "ETL Batch Job 구성 및 테이블 구조",
          },
          {
            kind: "shot",
            filename: "volvo-crm-dw-ops__dw__arch_cat.png",
            caption: "우리집 야옹이 귀엽죠",
          },
        ],
      },

      {
        type: "bullets",
        title: "Impact",
        items: [
          "CRM DW 운영 안정성 유지 및 장애 선제 대응",
          "데이터 요청자의 의도를 반영한 분석 데이터 제공",
          "운영 프로젝트에서도 데이터 이해도를 기반으로 한 엔지니어 역할 수행",
        ],
      },

      {
        type: "bullets",
        title: "What I’d Improve",
        items: [
          "배치 실패 원인을 사전에 감지할 수 있는 모니터링 고도화",
          "원천 시스템 변경 사항을 자동 감지할 수 있는 구조 개선",
        ],
      },
    ],
  },
  
  // Renault 구축 & 운영 Project
	// slug: renault-crm-dw-build-ops
	// hero: renault-crm-dw-build-ops__dw__hero.png
	// shot1: renault-crm-dw-build-ops__dw__shot1.png
	// shot2: renault-crm-dw-build-ops__dw__shot2.png
  {
    slug: "renault-crm-dw-build-ops",
    title: "Renault – CRM DW 구축 & 운영 & 유지보수",
    tab: "DW",
    period: "YYYY.MM ~ YYYY.MM",
    roles: ["DW Engineer"],
    subtitle: "CRM DW 구축 및 운영 안정화",
    summary:
      "Renault CRM 데이터를 기반으로 DW 구축부터 운영/유지보수까지 수행하며, ETL 파이프라인 설계·배치 운영·데이터 품질 관리·요구사항 대응을 담당했습니다.",
    techStack: [
      // TODO: 실제 사용 스택으로 수정
      "Oracle",
      "SQL Server",
      "Python",
      "Stored Procedure",
      "Windows Server",
      "ETL",
    ],
    heroImage: "renault-crm-dw-build-ops__dw__hero.png",
  
    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "YYYY.MM ~ YYYY.MM" },
          { label: "고객사", value: "Renault (Korea)" },
          { label: "프로젝트 성격", value: "CRM DW 구축 + 운영/유지보수" },
          { label: "팀 구성", value: "(예: N명 / 내 포지션)" },
          { label: "내 역할", value: "(예: DW 엔지니어, 구축/운영 실무)" },
        ],
        extraTitle: "담당 범위",
        extraItems: [
          "DW/ETL 파이프라인 설계 및 구현",
          "정기 배치 운영 및 장애 대응",
          "데이터 모델(ODS/DIM/FACT/MART) 운영 및 품질 관리",
          "현업/협력업체 데이터 추출 요청 및 리포트 지원",
        ],
      },
  
      {
        type: "text",
        title: "Context",
        body: [
          "본 프로젝트는 Renault CRM 데이터를 기반으로 분석/리포팅을 위한 DW를 구축하고, 운영 단계까지 안정적으로 이관하는 것을 목표로 진행되었습니다.",
          "구축 단계에서는 데이터 구조/업무 규칙 정리 및 적재/가공 파이프라인을 설계했고, 운영 단계에서는 배치 안정성·정합성·요청 대응을 지속적으로 수행했습니다.",
        ],
        bulletsTitle: "핵심 목표",
        bullets: [
          "CRM 원천 데이터의 표준화 및 DW 모델 정립",
          "정기 배치 안정화 및 운영 자동화 기반 마련",
          "분석/리포트 사용자를 위한 데이터 제공 속도·정확성 확보",
        ],
        tail: ["구축과 운영을 모두 경험하며 ‘설계 → 운영’까지 이어지는 실무 역량을 강화한 프로젝트였습니다."],
      },
  
      {
        type: "bullets",
        title: "Scale & Usage",
        items: [
          "(예: 테이블/배치 규모, 데이터 건수, 주요 도메인 수 등)",
          "(예: 대시보드/리포트 제공 범위, 사용자/요청 빈도)",
        ],
      },
  
      {
        type: "bullets",
        title: "My Role",
        items: [
          "요구사항 기반 데이터 모델/가공 로직 설계 및 구현",
          "배치 운영 모니터링 및 장애 원인 분석/조치",
          "정합성 이슈 분석(원천/가공 로직/조건 누락 등) 및 재발 방지",
          "데이터 추출 요청 대응(목적 파악 → 조건 재정의 → 결과 제공)",
        ],
      },
  
      {
        type: "challenges",
        title: "Challenges & Solutions",
        items: [
          {
            issue: "(예: 구축 단계에서 요구사항/데이터 정의가 자주 바뀜)",
            cause: "(예: 현업 정의 미비, 원천 데이터 규칙 불명확 등)",
            fix: "(예: 정의서/쿼리 샘플/검증 룰로 기준 정립)",
            result: "(예: 변경 대응 리드타임 감소, 커뮤니케이션 비용 감소)",
          },
          {
            issue: "(예: 배치 장애/지연 발생)",
            cause: "(예: 원천 적재 지연, 쿼리 비효율, 인덱스/통계 문제 등)",
            fix: "(예: 로직 개선, 튜닝, 운영 기준 정리)",
            result: "(예: 안정성 개선, 재발 방지)",
          },
          {
            issue: "(예: 정합성 이슈/누락 데이터)",
            cause: "(예: 조인 키/필터 조건 누락, 원천 데이터 품질 문제 등)",
            fix: "(예: 검증 쿼리/체크포인트 추가, 룰 보강)",
            result: "(예: 신뢰도 향상, 재요청 감소)",
          },
        ],
      },
  
      {
        type: "stack",
        title: "Tech Stack",
        items: [
          "Oracle",
          "SQL Server",
          "Python",
          "Stored Procedure",
          "Windows Server",
          "ETL Pipeline",
        ],
      },
  
      {
        type: "media",
        title: "Artifacts",
        items: [
          {
            kind: "shot",
            filename: "renault-crm-dw-build-ops__dw__shot1.png",
            caption: "Data Flow / Architecture (TBD)",
          },
          {
            kind: "shot",
            filename: "renault-crm-dw-build-ops__dw__shot2.png",
            caption: "ETL / Batch Monitoring (TBD)",
          },
        ],
      },
  
      {
        type: "bullets",
        title: "Impact",
        items: [
          "(예: 구축 완료 후 운영 안정화/업무 영향 최소화)",
          "(예: 데이터 제공 속도/정확성 개선)",
          "(예: 운영 프로세스 표준화/자동화 기반 마련)",
        ],
      },
  
      {
        type: "bullets",
        title: "What I’d Improve",
        items: [
          "데이터 검증 룰을 더 체계화해 품질 체크 자동화를 강화",
          "원천 변경 감지/알림 체계를 더 촘촘히 구성",
        ],
      },
    ],
  },
];

/** Portfolio List 용 메타 */
export const portfolioList: PortfolioListItem[] = portfolioDetails.map(
  ({
    slug,
    title,
    tab,
    subtitle,
    summary,
    period,
    roles,
    heroImage,
    techStack,
  }) => ({
    slug,
    title,
    tab,
    subtitle,
    summary,
    period,
    roles,
    heroImage,
    techStack,
  })
);

export function getPortfolioDetail(slug: string) {
  return portfolioDetails.find((p) => p.slug === slug);
}
