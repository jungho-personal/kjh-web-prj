// import type { Divide } from "lucide-react";
import type { PortfolioDetail, PortfolioListItem } from "./types";

export const portfolioDetails: PortfolioDetail[] = [
  // Volvo CRM_DW 운영 & 유지보수
  {
    slug: "volvo-crm-dw-ops",
    title: "VCK – CRM DW 운영 & 유지보수",
    tab: "DW",
    period: "2023.08 ~ 2025.12",
    roles: ["DW Engineer"],
    subtitle: "CRM DW 운영 안정화 및 데이터 품질 관리",
    summary:
      "VCK의 CRM 데이터를 기반으로 마케팅·영업 분석을 지원하는 DW 시스템을 운영하며, 배치 안정성·데이터 정합성·장애 대응을 중심으로 실무 전반을 담당했습니다.",
    techStack: [
    //   "Oracle",
      "SQL Server",
      "Python",
      "Stored Procedure",
      "Windows Server",
    //   "ETL",
    ],
    heroImage: "volvo-crm-dw-ops__dw__hero.png",

    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "2023.08 ~ 2025.12" },
          { label: "고객사", value: "VCK" },
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
          "본 프로젝트는 VCK의 CRM 데이터를 기반으로 마케팅·영업 성과 분석을 지원하는 운영 중심의 DW 시스템입니다.",
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
            // filename: "volvo-crm-dw-ops__dw__arch.png",
            caption: "DW 통합 고객 DB 구성도",
          },
          {
            kind: "shot",
            // filename: "volvo-crm-dw-ops__dw__arch_mainpage.png",
            caption: "VCK CRM-DW 대시보드",
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
  {
    slug: "renault-crm-dw-build-ops",
    title: "RK – CRM DW 구축 & 운영 & 유지보수",
    tab: "DW",
    period: "2025.02 ~ 2025.12",
    roles: ["DW Engineer"],
    subtitle: "CRM 관점 DW 구축 및 데이터 품질 표준화·운영 안정화",
    summary:
      "고객 통합·고객 성향·캠페인/채널·평가·세그먼트 등 마케팅 활용을 위한 CRM DW 구축을 수행했습니다.\n데이터 품질/정합성 문제를 해결하기 위해 CRM_ID 기준의 표준 모델을 수립하고, ETL 파이프라인 구현과 운영 안정화까지 전반을 담당했습니다.",
    techStack: ["Oracle"
				, "Stored Procedure"
				, "Informatica"
    ],
    heroImage: "renault-crm-dw-build-ops__dw__hero.png",

    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "2025.02 ~ 2025.12 (개발종료: 08월, 운영종료: 12월)"},
          { label: "고객사", value: "RK" },
          {
            label: "프로젝트 성격",
            value: "CRM DW 구축 + 운영/유지보수",
          },
          {
            label: "팀 구성",
            value: "총 12명 (컨설팅 3 / DW 구축 4 / Front 5)",
          },
          {
            label: "내 역할",
            value:
              "DW 구축 파트(분석·설계·개발·커뮤니케이션·운영 전반 담당)",
          },
        ],
        extraTitle: "담당 범위",
        extraItems: [
          "요구사항 파악을 위한 AS-IS 데이터 분석 및 질문 리스트 기반 정의",
          "CRM 관점 데이터 표준화(고객/차량/개인정보동의) 및 모델 설계",
          "ETL 파이프라인 설계·구현(Informatica + SP) 및 적재/재적재 운영",
          "현업/협력사 요청 대응(목적 파악 → 조건 재정의 → 결과 제공)",
        ],
      },

      {
        type: "text",
        title: "Context",
        body: [
          "고객사는 고객 통합, 고객 성향, 캠페인/채널 정보, 고객 평가, 세그먼트 등 마케팅 측면의 활용성과 인사이트 고도화를 목표로 CRM 데이터베이스 구축을 추진했습니다.",
          "그러나 원천 데이터는 중복·비정합·동의 정보의 표준 부재 문제가 있었고, 데이터 운영은 대행사에 위임되어 내부에서 데이터 구조/적재 규칙을 명확히 설명하기 어려운 상황이었습니다.",
        ],
        bulletsTitle: "핵심 목표",
        bullets: [
          "CRM 관점의 단일 고객 기준(통합 키) 수립 및 중복 제거",
          "차량-고객 관계 정합성 확보로 마케팅 활용성 강화",
          "개인정보/마케팅 동의 데이터 표준화 및 이력 관리 체계 구축",
          "구축 이후 운영까지 고려한 안정적인 적재/검증 프로세스 정립",
        ],
        tail: [
          "구축 단계에서 ‘정의(기준) → 구현(파이프라인) → 검증(품질) → 운영(요청 대응)’까지 end-to-end로 수행했습니다.",
        ],
      },

      {
        type: "bullets",
        title: "Scale & Usage",
        items: [
          "고객 단위 분석 및 개인화 마케팅을 위한 ‘단일 고객 기준’(CRM_ID) 중심 모델 운영",
          "차량 재원 정보, 수리 이력, 캠페인 참여 이력 등 고객 기준의 도메인 통합",
          "동의/수신/활용 등 민감 데이터를 최신 기준으로 표준화하고 스냅샷/이력 테이블로 관리",
          "통합 고객 데이터 활용하여 마케팅 대상 & 성과 보고서 데이터 추출",
        ],
      },

      {
        type: "bullets",
        title: "My Role",
        items: [
          "원천 테이블 기반 AS-IS 분석 → 질문 리스트 생성으로 요구사항 정의 리드",
          "Front 화면 Query 제작 → 고객그룹조회/회원정보조회/리드조회/차량판매조회 외 7건",
		  "데이터 추출 Query 제작 → 자동화 쿼리 5개 외 28건",
          "다중 이해관계자(고객사/대행사/컨설팅사) 커뮤니케이션 및 합의 도출",
        ],
      },

      {
        type: "challenges",
        title: "Challenges & Solutions",
        items: [
          {
            issue: "데이터 품질 저하로 인해 ‘고객 단위’ 분석 자체가 어려움",
            cause:
              "중복 고객(한 DI에 다수 고객 매핑), 차량-고객 관계 비정합(1:N 다수 존재), 동의 데이터의 표준 부재가 동시에 존재",
            fix:
              "유효하지 않은 고객을 제외하고 DI 기준으로 CRM_ID를 신규 채번하여 단일 고객 기준을 수립.\nCRM_ID 기반으로 실 소유 고객 판별 로직을 설계해 차량-고객 매핑을 정재.\n동의 항목은 최신일자 기준으로 표준화 적재하고 Snapshot/이력 테이블을 구성.",
            result:
              "DW 내 중복 고객 제거 및 CRM_ID 기준 개인화 마케팅 기반 확보.\n차량 중심 CRM 마케팅도 가능해졌고, 동의 정보는 이력 관리로 정확성과 운영 신뢰도가 향상됨",
          },
          {
            issue: "요구사항 정의 단계에서 커뮤니케이션 비용이 과도하게 큼",
            cause:
              "고객사는 데이터 구조/적재 규칙을 상세히 알지 못했고(대행 위임), 대행사는 대응이 보수적이며, 컨설팅사는 데이터 구조 이해가 낮아 실무 논의가 지연됨",
            fix:
              "고객사가 제공한 테이블만으로 AS-IS 구조를 먼저 분석하고, 질문 리스트로 요구사항을 구조화.\nAS-IS 분석 결과를 기반으로 고객사/대행사 부담을 줄이면서 TO-BE에 필요한 항목을 구체적으로 요청.\n컨설팅사에는 쉬운 용어/예시로 설명하여 이해를 맞춤",
            result:
              "요구사항 합의가 안정화되었고, DW 구축을 일정 내 성공적으로 완료하여 CRM 마케팅 운영으로 연결",
          },
          {
            issue: "업무 과부하(분석/설계와 병행한 다수의 데이터 추출 요청)",
            cause:
              "팀 내 역량 편차로 인해 일부 업무가 집중되었고, 분석이 완료되기 전에도 추출 요청이 지속적으로 발생",
            fix:
              "요청 목적을 먼저 확인한 뒤 필요한 조건을 재정의하고, 반복 요청은 패턴화하여 대응 효율을 높임 (Query 템플릿화).\n동시에 데이터 구조 이해도를 확장하며 검증 쿼리/추출 SQL 품질을 강화.",
            result:
              "운영 대응을 유지하면서도 구축을 마무리했으며, 대용량 데이터 분석 및 SQL 작성 역량이 크게 향상됨",
          },
        ],
      },

      {
        type: "stack",
        title: "Tech Stack",
        items: [
          "Oracle 19c",
          "Informatica",
          "Git",
          "VS Code",
          "DBeaver",
        ],
      },

      {
        type: "media",
        title: "Artifacts",
        items: [
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot1.png",
            caption: "CRM DW 구축 범위 및 데이터 흐름",
          },
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot2.png",
            caption: "CRM DW 구축 ERD",
          },
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot5.png",
            caption: "고객사 데이터 프로파일링(1)",
          },
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot6.png",
            caption: "고객사 데이터 프로파일링(2)",
          },
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot3.png",
            caption: "컨설팅사와 커뮤니케이션(1)",
          },
          {
            kind: "shot",
            // filename: "renault-crm-dw-build-ops__dw__shot4.png",
            caption: "컨설팅사와 커뮤니케이션(2)",
          },
        ],
      },

      {
        type: "bullets",
        title: "Impact",
        items: [
          "CRM_ID 기준으로 고객을 통합하여 시리얼 중심 마케팅에서 개인화 마케팅으로 전환 기반 마련",
          "중복/비정합/동의 표준화 이슈를 해결하여 데이터 신뢰도 및 마케팅 정확성 향상",
          "요구사항 정의~운영까지 end-to-end로 수행하며 프로젝트 성공적 마무리 및 운영 안정화",
        ],
      },

      {
        type: "bullets",
        title: "What I’d Improve",
        items: [
          "운영 중 작성했던 추출/검증 SQL을 리팩토링하여 성능·가독성을 더 개선하고 싶음",
          "품질 검증 룰을 더 체계화하여 자동화(체크리스트/스케줄 검증) 범위를 확장",
          "원천 변경(스키마/포맷) 감지 및 공유 프로세스를 더 촘촘히 구성",
        ],
      },
    ],
  },

    // Treasure Data CDP Platform 운영 & 유지보수 (LG전자 한국영업본부)
  // slug: lg-td-cdp-ops
  // hero: lg-td-cdp-ops__saas__hero.png
  // shot1: lg-td-cdp-ops__saas__shot1.png
  // shot2: lg-td-cdp-ops__saas__shot2.png
  {
    slug: "lg-td-cdp-ops",
    title: "Treasure Data CDP Platform – 운영 & 유지보수",
    tab: "SaaS",
    period: "2022.11 ~ 2023.05", // TODO: 기간 입력
    roles: ["CDP Operator", "Data Engineer"],
    subtitle: "고객 데이터 통합 기반 개인화 마케팅/인사이트 운영 지원",
    summary:
      "L사 마케팅 조직을 대상으로 Treasure Data CDP(Customer Data Platform)를 운영·유지보수했습니다.\n다양한 원천(오프라인/온라인/콜센터/렌탈 등)의 고객 데이터를 고객 중심으로 통합한 서비스에서 데이터 분석이 가능하도록 ETL 배치 점검, 대시보드/추출 요청 대응, 세그먼트 샘플 제작 등을 담당했습니다.",
    techStack: ["Treasure Data CDP"],
    heroImage: "lg-td-cdp-ops__saas__hero.png",

    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "2022.11 ~ 2023.05" },
          { label: "고객사", value: "L사" },
          { label: "사용 조직", value: "마케팅 팀 / Data Insight 팀" },
          { label: "프로젝트 성격", value: "Treasure Data CDP 운영 및 유지보수" },
          { label: "팀 구성", value: "3명 (팀장 1 / 팀원 2)" },
          {
            label: "내 역할",
            value:
              "운영 실무 담당 (배치 점검·대시보드 요청·데이터 추출·세그먼트 샘플 제작)",
          },
        ],
        extraTitle: "담당 범위",
        extraItems: [
          "원천 → CDP 적재 ETL 배치 모니터링 및 이슈 대응",
          "대시보드 제작/수정 요청 처리",
          "데이터 추출 요청 처리(마케팅/인사이트 분석 지원)",
          "마케터 요청 기반 세그먼트 샘플 제작 및 타겟 검증 지원",
        ],
      },

      {
        type: "text",
        title: "Context",
        body: [
          "본 프로젝트는 L사의 마케팅 및 데이터 인사이트 팀 업무를 지원하기 위해 Treasure Data CDP를 운영·유지보수하는 업무입니다.",
          "여러 원천(오프라인 매장, 온라인 웹/앱, 콜센터, 렌탈 서비스 등)에 흩어진 고객 데이터를 고객 중심으로 통합하여, 고객 행동 이력 기반의 분석과 개인화 마케팅 실행이 가능하도록 플랫폼을 안정적으로 운영하는 것이 핵심 목적이었습니다.",
        ],
        bulletsTitle: "주요 활용",
        bullets: [
          "한 명의 고객을 기준으로 온·오프라인 활동/구매/문의 이력을 통합 조회",
          "세분화된 타겟팅이 가능한 개인화 마케팅(조건 조합 기반 세그먼트)",
          "웹/앱 행동 데이터 트래킹으로 로그인 이전 행동까지 연결(가입/로그인 시점부터 과거 이력 매칭)",
        ],
        tail: [
          "SaaS 특성상 코드/인프라보다 ‘데이터 운영 품질’과 ‘요청 대응 정확도’가 성과를 좌우했기 때문에 운영 프로세스와 커뮤니케이션을 중심으로 실무를 수행했습니다.",
        ],
      },

      {
        type: "bullets",
        title: "Key Use Cases",
        items: [
          "통합 고객 데이터 기반 개인화 마케팅 세그먼트 구성 및 샘플 제공",
          "웹/앱 행동 데이터(로그인 이전 포함) 기반 유입/관심 고객군 분석 지원",
          "마케팅/인사이트 팀의 데이터 추출 및 대시보드 요청 처리로 의사결정 지원",
        ],
      },

      {
        type: "bullets",
        title: "My Role",
        items: [
          "원천 → CDP 적재 배치 흐름 점검(실행/누락/지연) 및 이슈 대응",
          "마케팅/인사이트 팀 요청 기반 대시보드 제작/수정 지원",
          "데이터 추출 요청 처리(요청 목적 파악 → 조건 정리 → 결과 제공)",
          "세그먼트 샘플 제작 및 캠페인 타겟 검증 지원",
          "프로젝트 종료(철수) 시 인수인계 커뮤니케이션 리딩 및 문서화",
        ],
      },

      {
        type: "challenges",
        title: "Challenges & Solutions",
        items: [
          {
            issue: "프로젝트 운영 리딩/책임 공백으로 인한 불안정한 운영 환경",
            cause:
              "운영 의사결정 및 대외 커뮤니케이션이 일관되게 관리되지 않아, 신규 인력(입사 초기) 중심으로 실무 부담이 커짐",
            fix:
              "내가 수행해온 운영 업무를 기준으로 프로세스를 정리하고, 이해관계자(LG/TD/당사) 간 인수인계 회의에서 운영 범위·핵심 포인트를 구조화해 리딩",
            result:
              "프로젝트 철수(종료)까지 운영 이슈 없이 마무리하고, 인수인계가 가능한 형태로 지식을 정리",
          },
          {
            issue: "Treasure Data CDP 상에서 신규 API 개발 요구 발생",
            cause:
              "플랫폼 내에서 동작하는 API 기능이 필요했으나 전담 개발/리뷰 리소스가 부족하여 단독 수행이 필요",
            fix:
              "TD 환경에 Python 파일 업로드가 가능한 점을 활용해, Python 기반 API 통신 프로세스를 설계·구현·테스트 후 배포",
            result:
              "요구 기능을 기간 내 제공하여 운영 공백을 최소화하고, 신규 기능을 안정적으로 적용",
          },
        ],
      },

      {
        type: "stack",
        title: "Tech Stack",
        items: ["Treasure Data CDP"],
      },

      {
        type: "media",
        title: "Artifacts",
        items: [
          {
            kind: "shot",
            // filename: "lg-td-cdp-ops__saas__shot2.png",
            caption: "세그먼트/대시보드 운영 사례(대시보드)",
          },
          {
            kind: "shot",
            // filename: "lg-td-cdp-ops__saas__shot3.png",
            caption: "세그먼트/대시보드 운영 사례(세그먼트)",
          },
          {
            kind: "shot",
            // filename: "lg-td-cdp-ops__saas__shot1.png",
            caption: "CDP 관리 테이블 중 일부 ERD",
          },
        ],
      },

      {
        type: "bullets",
        title: "Impact",
        items: [
          "고객 중심 데이터 통합 기반으로 개인화 마케팅 실행을 위한 운영 지원",
          "마케팅/인사이트 팀의 대시보드·추출 요청 대응으로 분석/의사결정 속도 유지",
          "프로젝트 종료 시점에도 운영 지식/범위를 정리해 안정적으로 인수인계",
        ],
      },

      {
        type: "bullets",
        title: "What I’d Improve",
        items: [
          "더 다양한 고객 Segment 를 제작할 기회가 있었으면 좋겠음",
          "웹/앱 고객 행동 분석을 더 체계화 하여 진행",
        ],
      },
    ],
  },

  // Volvo – CRM DW 연계 문자발송시스템 & 개인정보동의 대시보드 개발
  // slug: volvo-crm-dw-msg-consent-dashboard
  // hero: volvo-crm-dw-msg-consent-dashboard__dw__hero.png
  // arch: volvo-crm-dw-msg-consent-dashboard__dw__arch.png  (← 네가 준 그림 파일명으로 맞춰 저장 추천)
  // shot1: volvo-crm-dw-msg-consent-dashboard__dw__shot1.png
  // shot2: volvo-crm-dw-msg-consent-dashboard__dw__shot2.png
  {
    slug: "volvo-crm-dw-msg-consent-dashboard",
    title: "VCK – 문자발송시스템 & 개인정보동의 대시보드",
    tab: "DW",
    period: "2024.02 ~ 2024.10",
    roles: ["DW Engineer", "Backend Engineer"],
    subtitle: "딜러사 마케팅 메시징(발송/자동화) 기능 고도화 및 동의 대시보드 구축",
    summary:
      "VCK 딜러사 마케팅 사용자의 활용성 제고를 목표로, CRM DW 기반 문자 발송/자동화 기능과 개인정보동의 현황 대시보드를 개발했습니다.\n동의 표준화에 따른 Dashboard 조회용 Mart, 수신거부 고객 API 연동, 발송 내역 조회용 Data View 구축, 고객 활성화 로직 구현 및 PHP UI 버그 개선을 수행했습니다.",
    heroImage: "volvo-crm-dw-msg-consent-dashboard__dw__hero.png",

    sections: [
      {
        type: "snapshot",
        title: "Project Snapshot",
        items: [
          { label: "기간", value: "2024.02 ~ 2024.10 (초기: 2024.02 ~ 2024.05)" },
          { label: "고객사", value: "VCK" },
          {
            label: "프로젝트 성격",
            value: "CRM DW 연계 메시징 기능 개발 + 개인정보동의 대시보드/Mart 구축",
          },
          { label: "팀 구성", value: "2명 (특급 1 / 고급 1)" },
          {
            label: "내 역할",
            value:
              "Mart 설계/제작, 수신거부 API 연동, 발송내역 조회 View, 활성화 로직, PHP UI 버그 검수/수정",
          },
        ],
        extraTitle: "담당 범위",
        extraItems: [
          "개인정보동의 대시보드용 Data Mart 설계 및 제작",
          "메시지 발송 업체 수신거부 고객 조회 API 연동 개발",
          "협력업체 제작 PHP Front 버그 검수 및 직접 수정",
          "발송 내역 확인 페이지용 Data View 설계/제작",
          "고객 활성화 여부 비즈니스 로직 설계 및 구현",
        ],
      },

      {
        type: "text",
        title: "Context",
        body: [
          "딜러사 마케팅 사용자의 시스템 활용성을 높이기 위해, 대상 고객 설정 및 MMS 발송 관리(타겟 설정/발송), CRM 자동화 커뮤니케이션(터치포인트 기반 자동 발송), 비활성 고객 관리(발송 후 참여 여부 기반 분류) 기능을 고도화했습니다.",
          "또한 VCK의 개인정보 동의 표준화가 진행되면서 DB 구조 업데이트가 필요해졌고, 딜러 평가 대응 및 동의 현황 기반 마케팅 실행을 위해 동의 현황 대시보드를 구축했습니다.",
        ],
        bulletsTitle: "Architecture Flow",
        bullets: [
          "Data Source(Sales DMS / Service DMS / Consent DMS / Salesforce) → ETL → 통합 고객 DB(Staging → DW → CRM Data Mart)",
          "CRM Data Mart(동의/고객/활동 기반) → Marketing Analytics System(분석/활용)",
          "CRM Data Mart → MSG Agent(발송/자동화) → 문자 발송(Marketing SMS/Service, CRM Automation System)",
          "문자 발송 업체 수신거부 목록(API) → MSG Reject 적재/반영 → 발송 대상/정합성 제어",
        ],
        tail: [
          "즉, DW/Mart가 ‘분석’뿐 아니라 ‘메시징 실행(발송/자동화)’까지 연결되는 운영형 데이터 플랫폼으로 동작하도록 설계했습니다.",
        ],
      },

      {
        type: "bullets",
        title: "My Role",
        items: [
          "개인정보동의 표준화에 맞춰 Mart 구조 업데이트 및 대시보드 데이터셋 구축",
          "수신거부 고객을 딜러사 단위로 수집/반영하는 API 연동 개발",
          "문자 발송 후 내역 확인 페이지의 Data View 설계/제작",
          "고객 활성화 여부 판단 비즈니스 로직 구현(참여/반응 기반 분류)",
          "협력업체 제작 UI의 품질 개선(버그 검수/수정)로 운영 안정성 확보",
        ],
      },

      {
        type: "challenges",
        title: "Challenges & Solutions",
        items: [
          {
            issue: "개인정보 표준화 일정 지연으로 전체 프로젝트 일정 영향",
            cause:
              "개인정보 표준화 선행 작업이 약 3개월 지연되며 후속 개발/검증/배포 일정이 연쇄적으로 밀림",
            fix:
              "선행 작업 완료 전까지 가능한 범위의 준비(구조/검증 항목/반영 포인트)를 선제 정리하고, 표준화 반영 후 운영 배포 단계에서 추가 버그를 찾아 공유·반영되도록 지원",
            result:
              "외부 변수로 인한 지연 속에서도 실제 배포 이후 안정화에 기여했고, 운영 단계 품질 리스크를 감소",
          },
          {
            issue: "협력업체 제작 문자발송 UI 품질 문제(버그 다수)",
            cause:
              "협력업체 측 검수가 거의 이뤄지지 않아 기능/화면 버그가 누적(50건+)",
            fix:
              "체계적으로 버그 리포트를 작성해 협력 대응(47건 전달) + 긴급/단순 건은 직접 수정(11건)하여 운영 영향 최소화",
            result:
              "사용자 이탈/업무 중단 리스크를 줄이고, 실제 운영 가능한 수준으로 UI 안정화",
          },
          {
            issue: "딜러사별(7개) 영업번호 기반 수신거부 고객 수집 API 프로세스 복잡",
            cause:
              "딜러사마다 분리된 기준(영업번호)으로 수신거부 목록을 가져와야 했고, 주기 실행/장애 감지까지 고려 필요",
            fix:
              "딜러사/영업번호 기준 중첩 루프로 수집 프로세스를 설계하고, 주기 실행되도록 Windows Service로 구현.\n추가로 Healthcheck 로직을 구성해 실행 상태를 감시",
            result:
              "수신거부 반영 누락을 줄이고, 운영 환경에서 안정적으로 자동 수집/반영되도록 체계화",
          },
        ],
      },

      {
        type: "stack",
        title: "Tech Stack",
        items: [
          "AWS EC2",
          "Windows Server 2019",
          "MS SQL Server 2019",
          "PHP (IIS)",
          "SQL",
          "Python",
          "Microsoft JDK 17",
          "SureM Java Agent",
        ],
      },

      {
        type: "media",
        title: "Artifacts",
        items: [
          {
            kind: "shot",
            // filename: "volvo-crm-dw-msg-consent-dashboard__dw__shot1.png",
            caption: "개인정보동의 대시보드",
          },
          {
            kind: "shot",
            // filename: "volvo-crm-dw-msg-consent-dashboard__dw__shot2.png",
            caption: "문자 발송/내역 확인 화면",
          },
          {
            kind: "shot",
            // filename: "volvo-crm-dw-msg-consent-dashboard__dw__shot3.png",
            caption: "수신거부 API Process",
          },
          {
            kind: "shot",
            // filename: "volvo-crm-dw-msg-consent-dashboard__dw__shot4.png",
            caption: "Active/Inactive Process",
          },
        ],
      },

      {
        type: "bullets",
        title: "Impact",
        items: [
          "딜러사 마케팅 메시징(타겟 발송/자동화/비활성 관리) 기능의 실사용성 향상",
          "개인정보동의 표준화 반영 및 대시보드 제공으로 동의 기반 마케팅 운영 가능",
          "수신거부 자동 반영 및 UI 안정화로 운영 리스크(컴플레인/오발송 가능성) 완화",
          "서비스 오픈 이후 VCK 및 하위 딜러사에서 대량 메시징 운영 중(마케팅/고객 커뮤니케이션/VIP 타겟 등)",
        ],
      },

      {
        type: "bullets",
        title: "What I’d Improve",
        items: [
          "MMS 외 RCS 등 메시징 채널 확장 경험을 추가로 쌓아보고 싶음",
          "대시보드에 필터/세그먼트 조건을 추가해 동적으로 분석 가능한 형태로 고도화하고 싶음",
          "협력업체 산출물에 대한 QA 체크리스트/게이트를 더 일찍 적용해 초기 품질 리스크를 줄이고 싶음",
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
