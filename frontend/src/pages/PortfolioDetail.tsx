import { useMemo, useState } from "react";
import ImageModal from "@/components/common/ImageModal";
import { useParams, Link } from "react-router-dom";

import { Content } from "@/components/layout/Content";
import { getPortfolioDetail } from "@/content/portfolio";
import { resolvePortfolioAsset } from "@/lib/portfolioAssets";

export default function PortfolioDetail() {
  const sectionEmoji: Record<string, string> = {
    snapshot: "📌",
    text: "💬",
    bullets: "🧩",
    challenges: "🧯",
    stack: "🏷️",
    media: "🖼️",
  };

  const { slug } = useParams<{ slug: string }>();

  const data = useMemo(() => (slug ? getPortfolioDetail(slug) : undefined), [slug]);
  
  const [selected, setSelected] = useState<null | { src: string; alt?: string; caption?: string }>(null);

  if (!data) {
    return (
      <Content variant="wide" className="py-10 space-y-6">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
        <p className="text-muted-foreground">
          존재하지 않는 프로젝트입니다. slug를 확인해주세요.
        </p>
        <div>
          <Link to="/portfolio" className="underline">
            ← Back to Portfolio
          </Link>
        </div>
      </Content>
    );
  }

  const heroSrc = resolvePortfolioAsset(data.heroImage);

  return (
    <Content variant="wide" className="py-10 space-y-10">
      {/* Header */}
      <header className="space-y-3">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{data.tab}</span>
          {data.period ? <span className="mx-2">·</span> : null}
          {data.period ? <span>{data.period}</span> : null}
        </div>

        <h1 className="text-3xl font-bold leading-tight">{data.title}</h1>

        {data.summary ? <p className="text-muted-foreground">{data.summary}</p> : null}

        {data.roles?.length ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {data.roles.map((r) => (
              <span
                key={r}
                className="text-xs rounded-md border px-2 py-1 text-muted-foreground"
              >
                {r}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {/* Hero */}
      {heroSrc ? (
        <section className="space-y-2">
          <img
            src={heroSrc}
            alt={`${data.title} hero`}
            className="w-full rounded-xl border"
            loading="lazy"
          />
        </section>
      ) : null}

      {/* Sections */}
      <main className="space-y-10">
        {data.sections.map((sec, idx) => {
          return (
            <section key={`${sec.title}-${idx}`} className="space-y-3">
              {/* 섹션 상단 라인 */}
              <div className="border-t border-muted-foreground/20" />
              <h2 className="text-xl font-semibold"> {sectionEmoji[sec.type] ?? "•"} {sec.title} </h2>

              {sec.type === "snapshot" ? (
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="space-y-2">
                    {sec.items.map((it) => (
                      <div key={it.label} className="flex gap-2">
                        <span className="font-semibold">• {it.label}:</span>
                        <span className="text-muted-foreground">{it.value}</span>
                      </div>
                    ))}
                  </div>
              
                  {sec.extraTitle && sec.extraItems?.length ? (
                    <div className="pt-2">
                      <div className="font-semibold mb-2">{sec.extraTitle}</div>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {sec.extraItems.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {sec.type === "text" ? (
                <div className="space-y-3">
                  {sec.body.map((p, i) => (
                    <p key={i} className="leading-7 text-foreground/90">
                      {p}
                    </p>
                  ))}
              
                  {sec.bullets?.length ? (
                    <div className="pt-1">
                      {sec.bulletsTitle ? (
                        <div className="font-semibold mb-2">{sec.bulletsTitle}</div>
                      ) : null}
                      <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                        {sec.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
              
                  {sec.tail?.length ? (
                    <div className="space-y-2 pt-1">
                      {sec.tail.map((t, i) => (
                        <p key={i} className="leading-7 text-foreground/90">
                          {t}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {sec.type === "bullets" ? (
                <ul className="list-disc pl-5 space-y-2 text-foreground/90">
                  {sec.items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              ) : null}

              {sec.type === "stack" ? (
                <div className="flex flex-wrap gap-2">
                  {sec.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                    >
                      #{it}
                    </span>
                  ))}
                </div>
              ) : null}

              {sec.type === "challenges" ? (
                <div className="space-y-6">
                  {sec.items.map((it, i) => (
                    <div key={i} className="space-y-3">
                      <div className="font-semibold">Case {i + 1}</div>
              
                      <div className="pl-4 space-y-2 text-foreground/90">
                        <div>
                          <span className="font-semibold">• Issue</span>
                          <div className="text-muted-foreground">{it.issue}</div>
                        </div>
              
                        {it.cause ? (
                          <div>
                            <span className="font-semibold">• Cause</span>
                            <div className="text-muted-foreground">{it.cause}</div>
                          </div>
                        ) : null}
              
                        <div>
                          <span className="font-semibold">• Fix</span>
                          <div className="text-muted-foreground">{it.fix}</div>
                        </div>
              
                        {it.result ? (
                          <div>
                            <span className="font-semibold">• Result</span>
                            <div className="text-muted-foreground">{it.result}</div>
                          </div>
                        ) : null}
                      </div>
              
                      {/* 구분선 */}
					  {i !== sec.items.length -1 ? (
						<div className="w-1/2 border-t border-dashed border-muted-foreground/30 pt-4" />
					  ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {sec.type === "media" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {sec.items.map((m, i) => {
                    const src = resolvePortfolioAsset(m.filename);
                    if (!src) return null;
              
                    return (
                      <figure key={`${m.filename}-${i}`} className="space-y-2">
                        <button
                          type="button"
                          className="group w-full text-left"
                          onClick={() => setSelected({ src, alt: m.alt ?? m.filename, caption: m.caption })}
                        >
                          <img
                            src={src}
                            alt={m.alt ?? m.filename}
                            className="w-full max-h-[520px] object-contain cursor-zoom-in"
                            loading="lazy"
                            draggable={false}
                          />
                        </button>
                        {m.caption ? (
                          <figcaption className="text-xs text-muted-foreground text-center">
                            {m.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    );
                  })}
                </div>
              ) : null}

            </section>
          );
        })}
      </main>

      <footer className="pt-2">
        <Link to="/portfolio" className="underline">
          ← Back to Portfolio
        </Link>
      </footer>
	  <ImageModal
        open={!!selected}
        src={selected?.src ?? ""}
        alt={selected?.alt}
        caption={selected?.caption}
        onClose={() => setSelected(null)}
      />
    </Content>
  );
}
