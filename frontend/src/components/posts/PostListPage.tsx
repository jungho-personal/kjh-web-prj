import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listPosts } from "@/api/client";
import type { PostBase } from "@/api/types";
import { Content } from "@/components/layout/Content";
import { PageHeader } from "@/components/layout/PageHeader";

type Category = "blog" | "portfolio" | "dev_log";

type Props = {
  title: string;
  description?: string;
  category: Category;
  basePath: "/blog" | "/portfolio" | "/dev-log";

  sort?: "created_desc" | "created_asc";
  dateFormat?: (iso: string) => string;
};

const PAGE_SIZE = 5;

function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <div className="rounded-2xl bg-background/80 border px-6 py-4 backdrop-blur">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

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
   const { slug } = useParams<{ slug: string }>();
  // ✅ slug 바뀔 때(= 다른 글로 이동) 자연스럽게 상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [slug]);

  // cursor pagination
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await listPosts({ category, limit: PAGE_SIZE });
        if (!alive) return;

        setItems(res.items);
        setCursor(res.next_cursor ?? null);
        setHasMore(!!res.next_cursor);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "Failed to load");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
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

  const loadMore = async () => {
    if (!cursor || loading) return;

    try {
      setLoading(true);

      const res = await listPosts({
        category,
        limit: PAGE_SIZE,
        cursor,
      });

      setItems((prev) => [...prev, ...res.items]);
      setCursor(res.next_cursor ?? null);
      setHasMore(!!res.next_cursor);
    } catch (e: any) {
      // “더보기” 실패는 페이지 전체를 깨지 않도록 토스트/로그 정도로만 처리
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (err) return <div className="text-destructive">Error: {err}</div>;

  return (
    <Content variant="wide">
      <LoadingOverlay show={loading && items.length === 0} />

      <div className="mb-8 space-y-6">
        <PageHeader title={title} description={description} />

        {!loading && sorted.length === 0 ? (
          <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
            {emptyText}
          </div>
        ) : null}

        {sorted.length > 0 ? (
          <div className="space-y-6">
            <div className="divide-y border-y">
              {sorted.map((p) => (
                <Link
                  key={p.id}
                  to={`${basePath}/${p.slug}`}
                  className="block py-5 transition hover:bg-accent/20"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 space-y-2">
                      <h2 className="text-lg font-semibold leading-snug">
                        {p.title}
                      </h2>

                      {p.summary ? (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {p.summary}
                        </p>
                      ) : null}

                      {p.tags?.length ? (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {p.tags.map((t) => (
                            <span key={t} className="text-xs text-muted-foreground">
                              #{t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <time className="shrink-0 text-xs text-muted-foreground whitespace-nowrap pt-1">
                      {renderDate(p.created_at)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>

            {hasMore ? (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={loadMore}
                  className="rounded-md border px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "더보기"}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Content>
  );
}
