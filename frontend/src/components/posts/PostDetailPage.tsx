import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getPost, listPosts } from "@/api/client";
import { adminMe } from "@/api/admin";

import type { PostBase, PostDetail } from "@/api/types";
import { Content } from "@/components/layout/Content";
import { Button } from "@/components/ui/button";
// import { PaginationNumbers } from "@/components/common/PaginationNumbers";
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

//   const MORE_PAGE_SIZE = 5;
//   const [morePage, setMorePage] = useState(1);

  // ✅ 쿠키 기반 admin 상태
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ Prev / Next
  const [nav, setNav] = useState<{ prev?: PostBase; next?: PostBase }>({});
  const [navLoading, setNavLoading] = useState(false);

  const createdText = useMemo(() => {
    if (!post?.created_at) return "";
    return formatKoreanDate(post.created_at);
  }, [post?.created_at]);


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

  // post 로딩 완료 후 Prev/Next 계산
  useEffect(() => {
    (async () => {
      if (!post) return;

      try {
         setNavLoading(true);

        if (post.category === "portfolio") {
           setNav({});
          return;
        }

        const res = await listPosts({
          category: post.category,
          limit: 200, // Prev/Next 계산용으로 충분하게
        });

         // ✅ 최신순(desc) 정렬
         const sorted = [...res.items].sort(
           (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
         );
 
         const idx = sorted.findIndex((x) => x.slug === post.slug);
         if (idx < 0) {
           setNav({});
           return;
         }
 
         // sorted: [최신 .... 과거]
         //  "이전 글" = 더 과거(older) => idx + 1
         //  "다음 글" = 더 최신(newer) => idx - 1
         const prev = sorted[idx + 1];
         const next = sorted[idx - 1];
         setNav({ prev, next });
      } catch {
         setNav({});
      } finally {
         setNavLoading(false);
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
                <h2 className="text-base font-semibold">Previous / Next</h2>
                <Link
                  to={post.category === "blog" ? "/blog" : "/dev-log"}
                  className="text-sm text-muted-foreground hover:underline"
                >
                  View all →
                </Link>
              </div>

               {navLoading ? (
                 <div className="rounded-2xl border p-6 text-sm text-muted-foreground">
                   Loading...
                 </div>
               ) : (
                 (() => {
                   const basePath = post.category === "blog" ? "/blog" : "/dev-log";
                   const Card = ({
                     kind,
                     p,
                     alignRight,
                   }: {
                     kind: "prev" | "next";
                     p?: PostBase;
                     alignRight?: boolean;
                   }) => {
                     const label = kind === "prev" ? "← Previous" : "Next →";
                     if (!p) {
                       return (
                         <div className={`rounded-2xl border p-5 opacity-60 ${alignRight ? "text-right" : ""}`}>
                           <div className="text-xs text-muted-foreground">{label}</div>
                           <div className="text-sm text-muted-foreground mt-1">없음</div>
                         </div>
                       );
                     }
                     return (
                       <Link
                         to={`${basePath}/${p.slug}`}
                         className={`block rounded-2xl border p-5 transition hover:bg-accent/20 ${alignRight ? "text-right" : ""}`}
                       >
                         <div className="text-xs text-muted-foreground">{label}</div>
                         <div className="mt-2 text-base font-semibold leading-snug">{p.title}</div>
                         {p.summary ? (
                           <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                             {p.summary}
                           </div>
                         ) : null}
                         <time className="mt-2 block text-xs text-muted-foreground">
                           {formatKoreanDate(p.created_at)}
                         </time>
                       </Link>
                     );
                   };
 
                   return (
                     <div className="grid gap-3 sm:grid-cols-2">
                       <Card kind="prev" p={nav.prev} />
                       <Card kind="next" p={nav.next} alignRight />
                     </div>
                   );
                 })()
               )}
             </section>
           ) : null}
        </article>
      ) : null}
    </Content>
  );
}
