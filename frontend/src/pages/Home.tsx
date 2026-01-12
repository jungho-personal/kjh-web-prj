import { Content } from "@/components/layout/Content";
import HomeHero from "@/components/home/HomeHero";
import HomeResumeOverview from "@/components/home/HomeResumeOverview";
import HomeProjectSwitch from "@/components/home/HomeProjectSwitch";

export default function Home() {
  return (
    <Content variant="wide" className="py-10 space-y-14">
      {/* ✅ 상단: Hero(왼쪽) + Projects(오른쪽) */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr] items-start">
        <HomeHero />
		  <div className="justify-self-start lg:-ml-20">
            <HomeProjectSwitch />
		  </div>
      </section>

      <hr className="border-t border-border/70" />

      {/* ✅ 아래: Resume Overview만 */}
      <HomeResumeOverview />
    </Content>
  );
}
