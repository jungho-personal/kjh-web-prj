import PostDetailPage from "@/components/posts/PostDetailPage";

export default function BlogDetail() {
  return (
    <PostDetailPage
      backTo="/blog"
      backLabel="Back to Blog"
      expectedCategory="blog"
    />
  );
}
