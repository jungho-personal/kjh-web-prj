import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import dwIcon from "@/assets/hero/dw.png";
import saasIcon from "@/assets/hero/saas.png";
import aiIcon from "@/assets/hero/ai.png";
import { portfolioList } from "@/content/portfolio";
import type { PortfolioTab } from "@/content/portfolio/types";

type Category = PortfolioTab; // "DW" | "SaaS" | "AI PoC"


// type ProjectLink = { label: string; slug: string };

// type CategoryContent = {
//   title: string;
//   descLines: string[];
//   links: ProjectLink[];
//   tools: string[]; // ✅ Use Tools
// };

export default function HomeProjectSwitch() {
  const [category, setCategory] = useState<Category>("DW");


  const data = useMemo(() => {
    const grouped = {
      DW: [] as typeof portfolioList,
      SaaS: [] as typeof portfolioList,
      "AI PoC": [] as typeof portfolioList,
    };
  
    portfolioList.forEach((p) => {
      grouped[p.tab].push(p);
    });
  
    return grouped;
  }, []);

  const currentProjects = data[category];

  const descLinesMap: Record<Category, string[]> = {
    DW: [
      "CRM DW 구축 및 운영 프로젝트 수행",
      "DW 운영 자동화 및 성능 개선 경험",
    //   "대규모 데이터 파이프라인 안정화",
    ],
    SaaS: [
      "SaaS 기반 CRM / 데이터 플랫폼 운영",
      "외부 서비스 데이터 구조 분석 및 연계",
      "운영 환경 데이터 정합성 관리",
    ],
    "AI PoC": [
      "LLM 기반 데이터/업무 자동화 PoC",
      "자연어 인터페이스 실험",
      "사내/개인 AI 실험 프로젝트",
    ],
  };
  
  const defaultToolsByTab: Record<Category, string[]> = {
    DW: ["Oracle", "SQL Server", "Python", "Informatica"],
    SaaS: ["Salesforce", "Treasure Data", "Tableau", "Python"],
    "AI PoC": ["Python", "FastAPI", "PostgreSQL", "pgvector"],
  };
  
  const toolsFromProjects = Array.from(
    new Set(currentProjects.flatMap((p) => p.techStack ?? []))
  );
  
  const tools = toolsFromProjects.length ? toolsFromProjects : defaultToolsByTab[category];

  return (
    <section className="justify-self-start">
      {/* ✅ 시안처럼: 테두리 없는 소프트 카드 */}
      <div className="rounded-2xl bg-muted p-6 w-full lg:max-w-[720px] lg:min-w-[720px]">
        {/* ✅ 상단 아이콘 탭 (아이콘 크게) */}
        <div className="flex items-center gap-3">
          <ImageTab
            active={category === "DW"}
            onClick={() => setCategory("DW")}
            imgSrc={dwIcon}
            alt="DW"
          />
          <ImageTab
            active={category === "SaaS"}
            onClick={() => setCategory("SaaS")}
            imgSrc={saasIcon}
            alt="SaaS"
          />
          <ImageTab
            active={category === "AI PoC"}
            onClick={() => setCategory("AI PoC")}
            imgSrc={aiIcon}
            alt="AI PoC"
          />
        </div>

        {/* ✅ 2컬럼: Left(DW Project) / Right(Use Tools) */}
		<div className="mt-4 max-h-[220px] overflow-auto pr-2">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start">
            {/* Left */}
            <div className="space-y-4">
              <div className="text-lg font-semibold">{category} Project</div>

              <div className="space-y-1 text-sm text-muted-foreground leading-relaxed">
                {descLinesMap[category].map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
  
              <div className="pt-1 space-y-1">
                {currentProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/portfolio/${p.slug}`}
                    className="block text-sm text-foreground hover:underline underline-offset-4"
                  >
                    * {p.title}
                  </Link>
                ))}
              </div>
            </div>
  
            {/* Right: Use Tools */}
            <div className="space-y-3">
              <div className="text-lg font-semibold">Use Tools</div>
            
              {tools.length ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-muted-foreground">TBD</div>
              )}
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
        // ✅ 버튼 자체 크기/패딩 업4
        "rounded-xl px-4 py-3 transition",
        active ? "bg-background shadow-sm" : "bg-transparent hover:bg-background/60",
      ].join(" ")}
    >
      {/* ✅ 아이콘 크기 업: 7 -> 9 정도 */}
      <img src={imgSrc} alt={alt} className="h-9 w-9 object-contain" />
    </button>
  );
}
