export type Category = "blog" | "dev_log" | "portfolio";

export type TocItem = {
  text: string;
  anchor: string;
  level: number;
};

export type PostBase = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: Category;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type PostDetail = PostBase & {
  content_md: string;
  toc: TocItem[];
};

export type PostListResponse = {
  items: PostBase[];
  next_cursor?: string | null;
};

export type ChatRequest = {
  session_id: string;
  message: string;
  mode?: "site_assistant" | "general";
  context?: Record<string, any>;
};

export type ChatResponse = {
  session_id: string;
  answer: string;
  sources: Array<{ type: "post"; id: string; title: string; score: number }>;
  usage?: { model: string; input_tokens: number; output_tokens: number };
};
