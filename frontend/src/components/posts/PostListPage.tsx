import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PaginationWindow } from "@/components/common/PaginationWindow";
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

const PAGE_SIZE = 5;     // ✅ 한 페이지당 글 5개
const PAGE_WINDOW = 5;   // ✅ 페이지 버튼 1~5 / 6~10 ... 윈도우 크기

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

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = Number(searchParams.get("page") ?? "1");
  const page = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? pageFromQuery : 1;

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // ✅ API에는 "page_size = 글 개수"로 전달해야 함
        const res = await listPosts({ category, page, page_size: PAGE_SIZE });
        if (!alive) return;

        setItems(res.items);
        setTotal(res.total ?? 0);
        setTotalPages(res.total_pages ?? 1);

        // ✅ page 이동 시 자연스럽게 상단으로 이동
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
  }, [category, page]);

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

  if (err) return <div className="text-destructive">Error: {err}</div>;

  return (
    <Content variant="wide" className="h-full flex flex-col overflow-hidden">
      <LoadingOverlay show={loading && items.length === 0} />

      {/* ✅ 본문 영역: 남는 공간을 차지 */}
      <div className="mb-0 space-y-6 overflow-hidden" style={{ height: "calc(100% - 104px)" }}>
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
                      <h2 className="text-lg font-semibold leading-snug">{p.title}</h2>

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
          </div>
        ) : null}
      </div>

      {/* ✅ pagination footer: 높이 고정 (본문 calc와 맞춰야 함) */}
      <div className="shrink-0 h-[104px] flex flex-col items-center justify-center">
        <PaginationWindow
          page={page}
          totalPages={totalPages}
          windowSize={PAGE_WINDOW}
          onChange={(p: number) => {
            // ✅ setSp가 아니라 setSearchParams 사용
            setSearchParams((prev) => {
              const sp = new URLSearchParams(prev);
              sp.set("page", String(p));
              return sp;
            });
          }}
        />
        <div className="pt-2 text-center text-xs text-muted-foreground">
          Total {total} • Page {page} / {totalPages}
        </div>
      </div>
    </Content>
  );
}
