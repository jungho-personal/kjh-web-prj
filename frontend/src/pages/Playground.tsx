import { Content } from "@/components/layout/Content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";

export default function Playground() {
  return (
    <Content variant="wide">
      <PageHeader
        title="Playground"
        description="LLM 서비스 UI를 붙일 예정입니다."
      />

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-6 space-y-3">
          <div className="text-sm text-muted-foreground">
            여기는 더미 페이지입니다. 이후 Prompt / Model / Response UI를 구성할 예정.
          </div>
          <Button variant="secondary" disabled>
            Coming soon
          </Button>
        </CardContent>
      </Card>
    </Content>
  );
}
