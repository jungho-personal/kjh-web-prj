import { Content } from "@/components/layout/Content";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";

import { portfolioList } from "@/content/portfolio";

export default function Portfolio() {
  return (
    <Content variant="wide">
      <div className="mb-8 space-y-6">
        <PageHeader
          title="Portfolio"
          description="Selected projects & case studies"
        />

        {portfolioList.length === 0 ? (
          <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
            아직 포트폴리오 항목이 없습니다.
          </div>
        ) : (
          <div className="divide-y border-y">
            {portfolioList.map((project) => (
              <Link
                key={project.slug}
                to={`/portfolio/${project.slug}`}
                className="block py-6 transition hover:bg-accent/20"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left */}
                  <div className="min-w-0 space-y-2">
                    <h2 className="text-lg font-semibold leading-snug">
                      {project.title}
                    </h2>

                    {project.subtitle ? (
                      <p className="text-sm text-muted-foreground">
                        {project.subtitle}
                      </p>
                    ) : null}

                    {project.techStack?.length ? (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-muted-foreground"
                          >
                            #{tech}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {/* Right */}
                  {project.period ? (
                    <div className="shrink-0 text-xs text-muted-foreground whitespace-nowrap pt-1">
                      {project.period}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Content>
  );
}
