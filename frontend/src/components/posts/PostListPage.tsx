import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listPosts } from "@/api/client";
import type { PostBase } from "@/api/types";
import { Content } from "@/components/layout/Content";
import { PageHeader } from "@/components/layout/PageHeader";
import { PaginationNumbers } from "@/components/common/PaginationNumbers";


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

function getPageFromSearch(search: string) {
  const sp = new URLSearchParams(search);
  const p = Number(sp.get("page") ?? "1");
  return Number.isFinite(p) && p > 0 ? p : 1;
}

function setPageToSearch(search: string, page: number) {
  const sp = new URLSearchParams(search);
  sp.set("page", String(page));
  return `?${sp.toString()}`;
}

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
  const location = useLocation();
  const navigate = useNavigate();

  const page = useMemo(() => getPageFromSearch(location.search), [location.search]);

  const [items, setItems] = useState<PostBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // ✅ 일단은 전체를 가져오고(50), 프론트에서 페이지네이션
        // 나중에 서버 페이지네이션 지원하면 { page, page_size: PAGE_SIZE } 로 교체
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

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  }, [sorted.length]);

  const currentPage = useMemo(() => {
    // page가 범위 밖이면 clamp
    return Math.min(Math.max(page, 1), totalPages);
  }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, currentPage]);

  const renderDate = (iso: string) =>
    dateFormat ? dateFormat(iso) : new Date(iso).toLocaleDateString();

  const goPage = (p: number) => {
    navigate({ search: setPageToSearch(location.search, p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (err) return <div className="text-destructive">Error: {err}</div>;

  return (
    <Content variant="wide">
      <LoadingOverlay show={loading} />
  
      <div className="mb-8 space-y-6">
        <PageHeader title={title} description={description} />
  
        {!loading && sorted.length === 0 ? (
          <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
            {emptyText}
          </div>
        ) : null}
  
        {!loading && sorted.length > 0 ? (
          <div className="space-y-6">
            <div className="divide-y border-y">
              {paged.map((p) => (
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
  
            <PaginationNumbers page={currentPage} totalPages={totalPages} onChange={goPage} />
          </div>
        ) : null}
      </div>
    </Content>
  );
}
