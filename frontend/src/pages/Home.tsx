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