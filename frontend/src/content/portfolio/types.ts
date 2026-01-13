export type PortfolioTab = "DW" | "SaaS" | "AI PoC";

export type PortfolioMediaKind = "hero" | "arch" | "shot" | "flow" | "result";

export type PortfolioMedia = {
  kind: PortfolioMediaKind;
  filename: string; // assets/portfolio 아래 파일명
  alt?: string;
  caption?: string;
  width?: "full" | "half";
};

export type PortfolioSection =
  | {
      type: "snapshot";
      title: string;
      items: { label: string; value: string }[];
      extraTitle?: string;      // 예: "담당 범위"
      extraItems?: string[];    // 담당 범위 불릿들
    }
  | {
      type: "text";
      title: string;
      body: string[];
      bulletsTitle?: string;    // 예: "주요 활용"
      bullets?: string[];       // text + bullets 혼합
      tail?: string[];          // bullets 이후 마무리 문장
    }
  | { type: "bullets"; title: string; items: string[] }
  | {
      type: "challenges";
      title: string;
      items: { issue: string; cause?: string; fix: string; result?: string }[];
    }
  | { type: "stack"; title: string; items: string[] }
  | { type: "media"; title: string; items: PortfolioMedia[] };


export type PortfolioDetail = {
  slug: string;
  title: string;
  tab: PortfolioTab;

  // ✅ 리스트/카드/스위치에서 쓰기 좋은 메타
  subtitle?: string;   // ex) "CRM DW 운영 안정화"
  techStack?: string[]; // 카드에 뱃지로 표시
  period?: string;
  roles?: string[];
  summary?: string;

  heroImage?: string;

  sections: PortfolioSection[];
};

export type PortfolioListItem = Pick<
  PortfolioDetail,
  "slug" | "title" | "tab" | "subtitle" | "techStack" | "period" | "roles" | "summary" | "heroImage"
>;