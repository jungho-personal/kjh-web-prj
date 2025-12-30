import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
        Personal & Dev Blog
      </h1>
      <p style={{ opacity: 0.75, marginBottom: 18 }}>
        Blog · Dev Log · Portfolio · Playground
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link to="/blog" style={btn}>Blog</Link>
        {/* Dev log/portfolio/playground는 나중에 라우트 붙여도 됨 */}
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.12)",
  textDecoration: "none",
  color: "inherit",
};
