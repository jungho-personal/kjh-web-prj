import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
//       <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
//         Personal & Dev Blog
//       </h1>
//       <p style={{ opacity: 0.75, marginBottom: 18 }}>
//         Blog · Dev Log · Portfolio · Playground
//       </p>

//       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//         <Link to="/blog" style={btn}>Blog</Link>
//         {/* Dev log/portfolio/playground는 나중에 라우트 붙여도 됨 */}
//       </div>
//     </div>
//   );
// }
export default function Home() {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">About me</h1>
        <p className="mt-3 text-muted-foreground">
          PDF 1페이지 느낌으로, 우측에 소개/CTA 영역 채울 자리.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-5">
          <div className="font-medium">Move page</div>
          <p className="mt-2 text-sm text-muted-foreground">
            포트폴리오/블로그로 이동하는 CTA 영역
          </p>
        </div>
        <div className="rounded-2xl border p-5">
          <div className="font-medium">Highlights</div>
          <p className="mt-2 text-sm text-muted-foreground">
            최근 글/최근 프로젝트 요약 등을 넣을 수 있음
          </p>
        </div>
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
