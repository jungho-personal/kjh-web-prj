// assets/portfolio/* 를 한 번에 맵으로 로딩
const modules = import.meta.glob("../assets/portfolio/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function resolvePortfolioAsset(filename?: string) {
  if (!filename) return undefined;

  // 키는 "../assets/portfolio/파일명" 형태
  const key = Object.keys(modules).find((k) => k.endsWith(`/assets/portfolio/${filename}`));
  return key ? modules[key] : undefined;
}
