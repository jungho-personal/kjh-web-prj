import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listPosts } from "@/api/client";
import type { PostBase } from "@/api/types";

type Category = "blog" | "portfolio" | "dev_log";

type Props = {
  title: string;
  description?: string;
  category: Category;
  basePath: "/blog" | "/portfolio" | "/dev-log";

  // ✅ 추가 옵션
  sort?: "created_desc" | "created_asc";
  dateFormat?: (iso: string) => string;
};

export default function PostListPage({
  title,
  description,
  category,
  basePath,
  sort = "created_desc",
  dateFormat,
}: Props) {
  const [items, setItems] = useState<PostBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await listPosts({ category, limit: 50 });
        setItems(res.items);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [category]);

  const emptyText = useMemo(() => {
    if (category === "blog") return "아직 블로그 글이 없어요.";
    if (category === "dev_log") return "아직 Dev Log가 없어요.";
    return "아직 포트폴리오 항목이 없어요.";
  }, [category]);

  const sorted = useMemo(() => {
    const arr = [...items];
    arr.sort((a, b) => {
      const ta = new Date(a.created_at).getTime();
      const tb = new Date(b.created_at).getTime();
      return sort === "created_desc" ? tb - ta : ta - tb;
    });
    return arr;
  }, [items, sort]);

  const renderDate = (iso: string) =>
    dateFormat ? dateFormat(iso) : new Date(iso).toLocaleDateString();

  if (loading) return <div>Loading...</div>;
  if (err) return <div className="text-destructive">Error: {err}</div>;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((p) => (
            <Link
              key={p.id}
              to={`${basePath}/${p.slug}`}
              className="block rounded-2xl border p-5 transition hover:bg-accent/30"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-semibold leading-snug">{p.title}</h2>
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {renderDate(p.created_at)}
                </time>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>

              {p.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
