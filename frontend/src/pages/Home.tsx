import { useEffect, useState } from "react";
import { Content } from "@/components/layout/Content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/posts/PostCard";
import type { PostCardItem } from "@/components/posts/PostCard";
import { Link } from "react-router-dom";
import {
  Database,
  Server,
  Brain,
  BarChart3,
  Cloud,
  Code,
} from "lucide-react";

/* =========================
   Page
========================= */
export default function Home() {
  const [latestBlogPosts, setLatestBlogPosts] = useState<PostCardItem[]>([]);
  const [latestDevLogs, setLatestDevLogs] = useState<PostCardItem[]>([]);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingDevLog, setLoadingDevLog] = useState(true);

  /* =========================
     Latest Blog
  ========================= */
  useEffect(() => {
    fetch("/api/posts?category=blog&limit=3")
      .then((res) => res.json())
      .then((data) => {
        setLatestBlogPosts(
          (data.items ?? data).map((p: any) => ({
            ...p,
            category: "blog",
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoadingBlog(false));
  }, []);

  /* =========================
     Latest Dev Log
  ========================= */
  useEffect(() => {
    fetch("/api/posts?category=dev_log&limit=3")
      .then((res) => res.json())
      .then((data) => {
        setLatestDevLogs(
          (data.items ?? data).map((p: any) => ({
            ...p,
            category: "dev_log",
          }))
        );
      })
      .catch(console.error)
      .finally(() => setLoadingDevLog(false));
  }, []);

  return (
    <Content variant="wide" className="py-10 space-y-14">
      {/* =========================
          1) HERO
      ========================= */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight">
            Hi, I’m JungHo Kim 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            DW / Backend / AI 엔지니어로서
            <br />
            <strong className="text-foreground">
              실제로 운영되는 서비스를 설계하고 구현
            </strong>
            합니다.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl">
            데이터 파이프라인, CRM/DW, FastAPI 기반 백엔드,
            그리고 LLM을 활용한 실무형 서비스에 관심이 많습니다.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/portfolio">
              <Button>View Portfolio</Button>
            </Link>
            <Link to="/resume">
              <Button variant="secondary">View Resume</Button>
            </Link>
          </div>
        </div>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 space-y-3">
            <div className="text-sm text-muted-foreground">
              Currently focusing on
            </div>
            <ul className="space-y-2 text-sm">
              <li>• FastAPI + React 통합 서비스</li>
              <li>• PostgreSQL / DW / ETL</li>
              <li>• LLM 기반 내부 도구 & Playground</li>
            </ul>
          </CardContent>
        </Card>
      </section>
      <hr className="border-muted" />

      {/* =========================
          2) WHAT I DO
      ========================= */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">What I Do</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkillCard
            icon={<Database />}
            title="Data Warehouse / ETL"
            desc="Oracle, MSSQL 기반 DW 설계 및 배치/증분 로딩 파이프라인 구축"
          />
          <SkillCard
            icon={<Server />}
            title="Backend Development"
            desc="FastAPI, REST API 설계, 인증/권한, 운영 환경 배포"
          />
          <SkillCard
            icon={<Brain />}
            title="LLM / AI"
            desc="GPT, RAG, Vector DB 기반 실무형 AI 기능 구현"
          />
          <SkillCard
            icon={<BarChart3 />}
            title="Analytics"
            desc="CRM 데이터 분석, 대시보드, 비즈니스 지표 설계"
          />
          <SkillCard
            icon={<Cloud />}
            title="DevOps / Cloud"
            desc="Docker, Railway 기반 통합 배포 및 운영"
          />
          <SkillCard
            icon={<Code />}
            title="Frontend"
            desc="React + Tailwind + shadcn/ui 기반 SPA"
          />
        </div>
      </section>

      {/* =========================
          3) FEATURED PROJECTS
      ========================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Projects</h2>
          <Link to="/portfolio">
            <Button variant="ghost" size="sm">
              View all →
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/portfolio/personal-blog">
            <ProjectCard
              title="Personal Blog & Portfolio"
              desc="FastAPI + React 기반 개인 서비스"
            />
          </Link>
          <Link to="/portfolio/llm-playground">
            <ProjectCard
              title="LLM Playground"
              desc="Prompt / Model 테스트용 Playground"
            />
          </Link>
          <ProjectCard
            title="CRM Data Analysis"
            desc="DW 기반 고객 분석 및 지표 설계"
          />
        </div>
      </section>

      {/* =========================
          4) LATEST BLOG
      ========================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Latest Blog</h2>
            <span className="text-xs text-muted-foreground">· updates</span>
          </div>
          <Link to="/blog">
            <Button variant="ghost" size="sm">
              Go to Blog →
            </Button>
          </Link>
        </div>

        {loadingBlog ? (
          <LoadingGrid />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestBlogPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* =========================
          5) LATEST DEV LOG
      ========================= */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Latest Dev Log</h2>
            <span className="text-xs text-muted-foreground">· work log</span>
          </div>
          <Link to="/dev-log">
            <Button variant="ghost" size="sm">
              Go to Dev Log →
            </Button>
          </Link>
        </div>

        {loadingDevLog ? (
          <LoadingGrid />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latestDevLogs.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </Content>
  );
}

/* =========================
   Sub Components
========================= */

function SkillCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icon}</div>
          <div className="text-sm font-semibold leading-snug">{title}</div>
        </div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

function ProjectCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5 space-y-2">
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-5 text-sm text-muted-foreground">
            Loading...
          </CardContent>
        </Card>
      ))}
    </div>
  );
}