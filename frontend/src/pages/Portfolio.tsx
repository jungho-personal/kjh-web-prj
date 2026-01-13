import { Content } from "@/components/layout/Content";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";

import { portfolioList } from "@/content/portfolio";

export default function Portfolio() {
  return (
    <Content variant="wide">
      <PageHeader title="Portfolio" description="Selected projects & case studies" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolioList.map((project) => (
          <Link key={project.slug} to={`/portfolio/${project.slug}`} className="group">
            <Card className="h-full rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div>
                  <h2 className="font-semibold group-hover:underline">
                    {project.title}
                  </h2>

                  {project.subtitle ? (
                    <p className="text-sm text-muted-foreground">
                      {project.subtitle}
                    </p>
                  ) : null}
                </div>

                {!!project.techStack?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                {project.period ? (
                  <div className="text-xs text-muted-foreground pt-2">
                    {project.period}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Content>
  );
}
