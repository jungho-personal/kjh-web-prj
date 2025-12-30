import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPost } from "../api/client";
import type { PostDetail } from "../api/types";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (!slug) throw new Error("Missing slug");
        const res = await getPost(slug);
        setPost(res);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;
  if (err) return <div style={{ padding: 24 }}>Error: {err}</div>;
  if (!post) return <div style={{ padding: 24 }}>Not found</div>;

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/blog" style={{ textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 8 }}>{post.title}</h1>
      <div style={{ opacity: 0.75, marginBottom: 16 }}>
        {new Date(post.created_at).toLocaleString()}
      </div>

      <div style={{ marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap" }}>
        {post.tags?.map((t) => (
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

      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 12,
          padding: 18,
          lineHeight: 1.7,
        }}
      >
        <ReactMarkdown>{post.content_md}</ReactMarkdown>
      </div>
    </div>
  );
}
