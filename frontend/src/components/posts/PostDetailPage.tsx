import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getPost, listPosts } from "@/api/client";
import { adminMe } from "@/api/admin";

import type { PostBase, PostDetail } from "@/api/types";
import { Content } from "@/components/layout/Content";
import { Button } from "@/components/ui/button";
import { PaginationNumbers } from "@/components/common/PaginationNumbers";
import { formatKoreanDate } from "@/utils/date";


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

export default function PostDetailPage({ backTo, backLabel, expectedCategory }: Props) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const MORE_PAGE_SIZE = 5;
  const [morePage, setMorePage] = useState(1);

  // ✅ 쿠키 기반 admin 상태
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ 하단 추천 목록
  const [more, setMore] = useState<PostBase[]>([]);
  const [moreLoading, setMoreLoading] = useState(false);

  const createdText = useMemo(() => {
    if (!post?.created_at) return "";
    return formatKoreanDate(post.created_at);
  }, [post?.created_at]);


  useEffect(() => {
    // post가 바뀔 때(새 slug로 이동) More 페이지는 1로 리셋
    setMorePage(1);
  }, [post?.slug]);

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

  // ✅ post 로딩 완료 후 "More posts" 가져오기
  // - 현재 글 기준 날짜 가까운 순 정렬
  // - 여기서 slice(0,5) 하면 totalPages가 1로 고정되므로 절대 자르지 않음
  useEffect(() => {
    (async () => {
      if (!post) return;

      try {
        setMoreLoading(true);

        if (post.category === "portfolio") {
          setMore([]);
          return;
        }

        const res = await listPosts({
          category: post.category,
          limit: 50, // ✅ 후보를 충분히 가져와야 페이지네이션이 살아남
        });

        const baseTime = new Date(post.created_at).getTime();

        const filteredSorted = res.items
          .filter((x) => x.slug !== post.slug)
          .sort((a, b) => {
            const da = Math.abs(new Date(a.created_at).getTime() - baseTime);
            const db = Math.abs(new Date(b.created_at).getTime() - baseTime);
            return da - db; // ✅ 가까운 날짜 우선
          });

        setMore(filteredSorted);
      } catch {
        setMore([]);
      } finally {
        setMoreLoading(false);
      }
    })();
  }, [post]);

  if (err) return <div className="text-destructive">Error: {err}</div>;
  if (!post && !loading) return <div>Not found</div>;

  return (
    <Content variant="reading">
      <LoadingOverlay show={loading} />

      {post ? (
        <article className="space-y-8">
          <Link to={backTo} className="text-sm text-muted-foreground hover:underline">
            ← {backLabel}
          </Link>

          <header className="space-y-4">
            {/* 제목 + Edit 버튼 */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-semibold tracking-tight leading-tight">
                {post.title}
              </h1>

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
              <time>{createdText}</time>
              <span className="opacity-60">·</span>
              <span className="rounded-full border px-2 py-0.5 text-xs">
                {post.category}
              </span>
            </div>

            {post.tags?.length ? (
              <div className="flex flex-wrap gap-2 pt-1">
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

          {/* ✅ 본문 여백 */}
          <section className="border-y-4 border-foreground/20 py-10 prose prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown>{post.content_md}</ReactMarkdown>
          </section>

          {/* ✅ 하단 글 목록 */}
          {post.category !== "portfolio" ? (
            <section className="pt-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">More posts</h2>
                <Link
                  to={post.category === "blog" ? "/blog" : "/dev-log"}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  View all →
                </Link>
              </div>

              {moreLoading ? (
                <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
                  Loading more posts...
                </div>
              ) : more.length ? (
                (() => {
                  const totalPages = Math.max(1, Math.ceil(more.length / MORE_PAGE_SIZE));
                  const currentPage = Math.min(Math.max(morePage, 1), totalPages);
                  const start = (currentPage - 1) * MORE_PAGE_SIZE;
                  const view = more.slice(start, start + MORE_PAGE_SIZE);

                  const basePath = post.category === "blog" ? "/blog" : "/dev-log";
                 
                  return (
                    <div className="space-y-3">
                      {/* ✅ list (테두리/라운드 제거, 구분선만) */}
                      <div className="divide-y">
                        {view.map((p) => (
                          <Link
                            key={p.slug}
                            to={`${basePath}/${p.slug}`}
                            className="block py-5 transition hover:bg-accent/20"
                          >
                            <div className="flex items-start justify-between gap-6">
                              <div className="min-w-0 space-y-2">
                                <p className="text-base font-semibold leading-snug">{p.title}</p>
                  
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
                                {formatKoreanDate(p.created_at)}
                              </time>
                            </div>
                          </Link>
                        ))}
                      </div>
                  
                      {/* ✅ 숫자 pagination (공용 컴포넌트) */}
                      <PaginationNumbers
                        page={currentPage}
                        totalPages={totalPages}
                        onChange={(p) => {
                          setMorePage(p);
                          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                        }}
                      />
                    </div>
                  );
                })()
              ) : (
                <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
                  더 보여줄 글이 없어요.
                </div>
              )}
            </section>
          ) : null}
        </article>
      ) : null}
    </Content>
  );
}
