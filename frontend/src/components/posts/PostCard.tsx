import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export type PostCardItem = {
  id: string | number;
  title: string;
  slug: string;
  summary?: string;
  category: "blog" | "dev_log";
};

export function PostCard({ post }: { post: PostCardItem }) {
  const link =
    post.category === "blog"
      ? `/blog/${post.slug}`
      : `/dev-log/${post.slug}`;

  return (
    <Link to={link}>
      <Card className="rounded-2xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md h-full">
        <CardContent className="p-5 space-y-2">
          <div className="font-medium">{post.title}</div>
          {post.summary && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.summary}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
