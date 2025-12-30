import { useEffect, useState } from "react";
import { listPosts } from "../api/client";
import type { PostBase } from "../api/types";

export default function Blog() {
  const [items, setItems] = useState<PostBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // 우선 blog 카테고리. dev_log는 다음에 /dev-log 페이지로 붙이자.
        const res = await listPosts({ category: "blog", limit: 20 });
        setItems(res.items);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (err) return <div style={{ padding: 24 }}>Error: {err}</div>;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Blog</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((p) => (
          <a
            key={p.id}
            href={`/blog/${p.slug}`}
            style={{
              display: "block",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 12,
              padding: 16,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {new Date(p.created_at).toLocaleDateString()}
              </div>
            </div>

            <div style={{ marginTop: 8, opacity: 0.85 }}>{p.summary}</div>

            <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {p.tags?.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: "4px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.12)",
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
