import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "@/api/client";
import type { PostDetail } from "@/api/types";

type Category = "blog" | "portfolio" | "dev_log";

type Props = {
  backTo: string;
  backLabel: string;
  expectedCategory?: Category; // ✅ 추가: URL 카테고리 검증용
};

export default function PostDetailPage({ backTo, backLabel, expectedCategory }: Props) {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        if (!slug) throw new Error("Missing slug");

        const res = await getPost(slug);

        // ✅ 카테고리 검증: URL 의도와 다른 글이면 404처럼 처리
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
    <article className="max-w-3xl space-y-6">
      <Link to={backTo} className="text-sm text-muted-foreground hover:underline">
        ← {backLabel}
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <time>{new Date(post.created_at).toLocaleString()}</time>
          <span className="opacity-60">·</span>
          <span className="rounded-full border px-2 py-0.5 text-xs">
            {post.category}
          </span>
        </div>

        {post.tags?.length ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
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
  );
}
