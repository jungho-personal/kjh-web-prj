import PostListPage from "@/components/posts/PostListPage";
import { formatKoreanDate } from "@/utils/date";

export default function DevLog() {
  return (
    <PostListPage
      title="Dev Log"
      description="작업 로그를 날짜 단위로 남깁니다."
      category="dev_log"
      basePath="/dev-log"
      sort="created_desc"
      dateFormat={formatKoreanDate}
    />
  );
}
