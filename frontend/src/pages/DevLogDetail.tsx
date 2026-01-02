import PostDetailPage from "@/components/posts/PostDetailPage";

export default function DevLogDetail() {
  return (
    <PostDetailPage
      backTo="/dev-log"
      backLabel="Back to Dev Log"
      expectedCategory="dev_log"
    />
  );
}
