export default function HomeHero() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold leading-tight">Hi, I’m JungHo Kim 👋</h1>

      <p className="text-lg text-muted-foreground">
        DW / Backend / AI 엔지니어로서
        <br />
        <strong className="text-foreground">실제로 운영되는 서비스를 설계하고 구현</strong>
        합니다.
      </p>

      <div className="space-y-1 text-sm text-muted-foreground leading-relaxed">
        <p>
          데이터 웨어하우스와 CRM 환경에서 ETL, 데이터 마트, 대시보드를 설계해온 데이터
          엔지니어입니다.
        </p>
        <p>
          Oracle, MSSQL, Salesforce를 기반으로 안정적인 데이터 파이프라인을 구축해왔습니다.
        </p>
        <p>
          최근에는 LLM과 AI Agent를 활용해 자연어 기반 분석·자동화 POC를 주도하고 있습니다.
        </p>
        <p>
          단순한 기술 적용을 넘어, 실제 업무 생산성을 높이는 구조를 만드는 것에 집중합니다.
        </p>
      </div>
    </section>
  );
}
