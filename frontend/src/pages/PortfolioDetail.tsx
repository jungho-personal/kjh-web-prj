import { useParams } from "react-router-dom";
import { Content } from "@/components/layout/Content";
import { Card, CardContent } from "@/components/ui/card";
import { portfolioProjects } from "@/data/portfolio";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Content variant="reading">
        <p className="text-muted-foreground">Project not found.</p>
      </Content>
    );
  }

  return (
    <Content variant="reading" className="py-8 space-y-10">
      {/* Hero */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground">{project.subtitle}</p>
        <div className="text-sm text-muted-foreground">
          {project.period} · {project.role}
        </div>
      </section>

      {/* Meta */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="text-sm font-medium">Tech Stack</div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overview */}
      <Section title="Overview">{project.overview}</Section>

      {/* Problem */}
      <Section title="Problem">{project.problem}</Section>

      {/* Solution */}
      <Section title="Solution">{project.solution}</Section>

      {/* Results */}
      <Section title="Results">
        <ul className="list-disc space-y-1 pl-5">
          {project.results.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>
    </Content>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="text-muted-foreground text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}
