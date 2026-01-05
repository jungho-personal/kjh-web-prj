import { Content } from "@/components/layout/Content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Resume() {
  const viewUrl = "/resume.pdf";
  const downloadUrl = "/resume-download.pdf";

  return (
    <Content variant="wide">
      {/* Header */}
      <PageHeader
          title="Resume"
          description="PDF 기반 이력서 뷰어"
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <Card className="rounded-2xl shadow-sm hover:translate-y-0 hover:shadow-sm">
            <CardContent className="p-5 space-y-4">
              <div>
                <div className="text-lg font-semibold">JungHo Kim</div>
                <div className="text-sm text-muted-foreground">
                  Dev · Data · AI
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <ul className="list-disc pl-5">
                  <li>DW / Backend / AI</li>
                  <li>FastAPI · React · PostgreSQL</li>
                  <li>Personal Project & Blog</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2">
                <a href={viewUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" className="w-full">
                    Open in new tab
                  </Button>
                </a>
                <a href={downloadUrl} download="JungHoKim_Resume.pdf">
                  <Button className="w-full">Download PDF</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right PDF viewer */}
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-0">
            {/* flex 기반으로 높이 안정화 */}
            <div className="h-[calc(100vh-56px)]">
              <iframe
                title="Resume PDF"
                src={`${viewUrl}#view=FitH`}
                className="h-full w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Content>
  );
}
