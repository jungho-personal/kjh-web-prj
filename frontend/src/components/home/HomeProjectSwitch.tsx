import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import dwIcon from "@/assets/hero/dw.png";
import saasIcon from "@/assets/hero/saas.png";
import aiIcon from "@/assets/hero/ai.png";

type Category = "dw" | "saas" | "ai";

type ProjectLink = { label: string; slug: string };

type CategoryContent = {
  title: string;
  descLines: string[];
  links: ProjectLink[];
  tools: string[]; // ✅ Use Tools
};

export default function HomeProjectSwitch() {
  const [category, setCategory] = useState<Category>("dw");

  const data: Record<Category, CategoryContent> = useMemo(
    () => ({
      dw: {
        title: "DW Project",
        descLines: [
          "CRM DW 구축 및 운영 프로젝트 수행",
          "Oracle / MSSQL 기반 데이터 파이프라인 설계",
          "DW 운영 자동화 및 성능 개선 경험",
        ],
        links: [
          { label: "* V사 프로젝트", slug: "v-company-dw" },
          { label: "* R사 프로젝트", slug: "r-company-dw" },
        ],
        tools: ["Oracle", "SQL Server", "Python", "Informatica"],
      },
      saas: {
        title: "SaaS Project",
        descLines: [
          "Salesforce 기반 CRM 운영 및 데이터 연계",
          "SaaS 서비스 데이터 구조 분석 및 활용",
          "운영 환경에서 데이터 정합성 관리",
        ],
        links: [
          { label: "* Salesforce CRM 프로젝트", slug: "salesforce-crm" },
          { label: "* SaaS 운영 프로젝트", slug: "saas-ops" },
        ],
        tools: ["Salesforce", "Tableau", "Treasure Data", "Python"],
      },
      ai: {
        title: "AI PoC",
        descLines: [
          "LLM 기반 데이터 질의 자동화 실험",
          "자연어 → SQL 변환 PoC",
          "개인 학습 및 실험 목적의 AI 프로젝트 정리",
        ],
        links: [
          { label: "* LLM 데이터 분석 PoC", slug: "llm-dw-poc" },
          { label: "* AI Agent 실험 프로젝트", slug: "ai-agent-lab" },
        ],
        tools: ["Python", "FastAPI", "PostgreSQL", "pgvector", "streamlit"],
      },
    }),
    []
  );

  const current = data[category];

  return (
    <section className="justify-self-start">
      {/* ✅ 시안처럼: 테두리 없는 소프트 카드 */}
      <div className="rounded-2xl bg-muted p-6 w-full lg:max-w-[720px] lg:min-w-[720px]">
        {/* ✅ 상단 아이콘 탭 (아이콘 크게) */}
        <div className="flex items-center gap-3">
          <ImageTab
            active={category === "dw"}
            onClick={() => setCategory("dw")}
            imgSrc={dwIcon}
            alt="DW"
          />
          <ImageTab
            active={category === "saas"}
            onClick={() => setCategory("saas")}
            imgSrc={saasIcon}
            alt="SaaS"
          />
          <ImageTab
            active={category === "ai"}
            onClick={() => setCategory("ai")}
            imgSrc={aiIcon}
            alt="AI PoC"
          />
        </div>

        {/* ✅ 2컬럼: Left(DW Project) / Right(Use Tools) */}
		<div className="mt-4 max-h-[220px] overflow-auto pr-2">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start">
            {/* Left */}
            <div className="space-y-4">
              <div className="text-lg font-semibold">{current.title}</div>
  
              <div className="space-y-1 text-sm text-muted-foreground leading-relaxed">
                {current.descLines.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
  
              <div className="pt-1 space-y-1">
                {current.links.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/portfolio/${p.slug}`}
                    className="block text-sm text-foreground hover:underline underline-offset-4"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
  
            {/* Right: Use Tools */}
            <div className="space-y-3">
              <div className="text-lg font-semibold">Use Tools</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {current.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>
		</div>
      </div>
    </section>
  );
}

/** ✅ 아이콘 크기 키움 (여기만 조절하면 됨) */
function ImageTab({
  active,
  onClick,
  imgSrc,
  alt,
}: {
  active: boolean;
  onClick: () => void;
  imgSrc: string;
  alt: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={alt}
      className={[
        // ✅ 버튼 자체 크기/패딩 업
        "rounded-xl px-4 py-3 transition",
        active ? "bg-background shadow-sm" : "bg-transparent hover:bg-background/60",
      ].join(" ")}
    >
      {/* ✅ 아이콘 크기 업: 7 -> 9 정도 */}
      <img src={imgSrc} alt={alt} className="h-9 w-9 object-contain" />
    </button>
  );
}
