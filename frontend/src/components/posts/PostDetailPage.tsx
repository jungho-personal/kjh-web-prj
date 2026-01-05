import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/api/client";
import type { PostDetail } from "@/api/types";
import { Button } from "@/components/ui/button";
import { adminMe } from "@/api/admin";
import { Content } from "@/components/layout/Content";

type Category = "blog" | "portfolio" | "dev_log";

type Props = {
  backTo: string;
  backLabel: string;
  expectedCategory?: Category;
};

function categoryToSection(category: Category) {
  if (category === "blog") return "blog";
  if (category === "dev_log") return "dev-log";
  if (category === "portfolio") return "portfolio";
  return null;
}

export default function PostDetailPage({ backTo, backLabel, expectedCategory }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // ✅ 쿠키 기반 admin 상태
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 한 번만 admin 여부 체크 (쿠키 기반)
    (async () => {
      try {
        await adminMe(); // 200이면 admin
        setIsAdmin(true);
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (!slug) throw new Error("Missing slug");

        const res = await getPost(slug);

        // URL 의도와 카테고리가 다르면 차단
        if (expectedCategory && res.category !== expectedCategory) {
          setPost(null);
          return;
        }

        setPost(res);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, expectedCategory]);

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-destructive">Error: {err}</div>;
  if (!post) return <div>Not found</div>;

  return (
    <Content variant="reading">
      <article className="space-y-6">
        <Link to={backTo} className="text-sm text-muted-foreground hover:underline">
          ← {backLabel}
        </Link>
  
        <header className="space-y-3">
          {/* 제목 + Edit 버튼 */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
  
            {isAdmin && slug && expectedCategory && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const section = categoryToSection(expectedCategory);
                  if (!section) return;
                  navigate(`/__admin__/editor/${section}/${slug}`);
                }}
              >
                Edit
              </Button>
            )}
          </div>
  
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <time>{new Date(post.created_at).toLocaleString()}</time>
            <span className="opacity-60">·</span>
            <span className="rounded-full border px-2 py-0.5 text-xs">{post.category}</span>
          </div>
  
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}
        </header>
  
        <section className="rounded-2xl border p-6 prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content_md}</ReactMarkdown>
        </section>
      </article>
    </Content>
  );
}
