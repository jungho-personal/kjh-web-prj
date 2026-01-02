import PostListPage from "@/components/posts/PostListPage";

export default function Blog() {
  return (
    <PostListPage
      title="Blog"
      description="개발 기록과 생각을 정리합니다."
      category="blog"
      basePath="/blog"
    />
  );
}
