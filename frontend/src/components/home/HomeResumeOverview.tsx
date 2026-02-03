import { Link } from "react-router-dom";

type LineItem = {
  period: string;
  title: string;
  slug?: string; // 프로젝트면 /portfolio/:slug 연결
  meta?: string; // 예: Site > Volvo / Renault
};

const resume = {
  nameKr: "김 정 호",
  profile: [
    { key: "Birth", value: "1998.05.22" },
    { key: "Experience", value: "3년" },
    {
      key: "Education",
      value:
        "북경과학기술대학교 국제경제무역학과 졸업\n(北京科技大学 — 国际经济与贸易)",
    },
    { key: "Contact", value: "010-6515-2292\njungho2292@gmail.com" },
  ],
  careerAndActive: [
    { period: "2022.11 ~ 재직 중", title: "Gruve" },
    { period: "2022.09 ~ 2022.10", title: "서울 시민 데이터 활용한 도시문제 해결 경진대회 (4등)" },
    { period: "2022.07 ~ 2022.09", title: "LG Aimers : AI 전문가과정" },
    { period: "2021.11 ~ 2022.05", title: "빅데이터 플랫폼 구축과 빅데이터 분석 (국비지원교육)" },
    { period: "2021.06", title: "대학교 졸업" },
    { period: "2020.06 ~ 2020.08", title: "Two hands games - intern" },
    { period: "2019.06 ~ 2019.08", title: "iSoftStone - intern" },
  ] as LineItem[],
  projects: [
    {
      period: "2026.01 ~",
      title: "Salesforce (SaaS)",
      slug: "salesforce-crm",
    },
    {
      period: "2023.08 ~ 2025.12",
      title: "CRM DW 운영 & 유지보수",
      meta: "Site > VCK",
      slug: "volvo-crm-dw-ops",
    },
    {
      period: "2025.02 ~ 2025.08",
      title: "CRM DW 구축 & 운영",
      meta: "Site > RK",
      slug: "renault-crm-dw-build-ops",
    },
    {
      period: "2024.02 ~ 2024.10",
      title: "CRM DW 연계 문자발송시스템\n및 개인정보동의 대시보드 개발",
      meta: "Site > VCK",
      slug: "volvo-crm-dw-msg-consent-dashboard",
    },
    {
      period: "2023.05 ~ 2023.08",
      title: "Insider(SaaS) Sales",
      slug: "insider-saas",
    },
    {
      period: "2022.11 ~ 2023.05",
      title: "TreasureData (SaaS) 운영",
      meta: "Site > L사",
      slug: "lg-td-cdp-ops",
    },
  ] as LineItem[],
};

export default function HomeResumeOverview() {
  return (
    <section className="space-y-6">
      <h2 className="flex items-center gap-3 text-2xl font-bold">
        <span className="h-7 w-1 rounded-full bg-primary" />
        Resume Overview
      </h2>

      {/* 시안형: 3컬럼 표 느낌 */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr_1.2fr] items-start">
        {/* LEFT: Name + Profile */}
        <div className="space-y-4">
          <div className="text-xl font-semibold">{resume.nameKr}</div>

          <div className="space-y-3">
            {resume.profile.map((row) => (
              <div key={row.key} className="grid grid-cols-[90px_1fr] gap-4 text-sm">
                <div className="text-muted-foreground">{row.key}</div>
                <div className="whitespace-pre-line">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: CAREER & ACTIVE */}
        <div className="space-y-3">
          <div className="text-sm font-semibold tracking-wide text-muted-foreground">
            CAREER &amp; ACTIVE
          </div>

          <div className="space-y-3">
            {resume.careerAndActive.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="grid grid-cols-[120px_1fr] gap-4 text-sm"
              >
                <div className="text-muted-foreground">{item.period}</div>
                <div className="leading-relaxed">{item.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PROJECT */}
        <div className="space-y-3">
          <div className="text-sm font-semibold tracking-wide text-muted-foreground">
            PROJECT
          </div>

          <div className="space-y-3">
            {resume.projects.map((item) => {
              const content = (
                <div className="space-y-1">
                  <div className="leading-relaxed whitespace-pre-line">{item.title}</div>
                  {item.meta ? (
                    <div className="text-xs text-muted-foreground">{item.meta}</div>
                  ) : null}
                </div>
              );

              return (
                <div
                  key={`${item.period}-${item.title}`}
                  className="grid grid-cols-[120px_1fr] gap-4 text-sm"
                >
                  <div className="text-muted-foreground">{item.period}</div>

                  {item.slug ? (
                    <Link
                      to={`/portfolio/${item.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
