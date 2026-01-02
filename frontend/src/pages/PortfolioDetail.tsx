import PostDetailPage from "@/components/posts/PostDetailPage";

export default function PortfolioDetail() {
  return (
    <PostDetailPage
      backTo="/portfolio"
      backLabel="Back to Portfolio"
      expectedCategory="portfolio"
    />
  );
}
