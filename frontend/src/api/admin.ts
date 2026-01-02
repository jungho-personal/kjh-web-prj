export type PostCategory = "blog" | "dev_log" | "portfolio";

export type AdminPostDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
  content_md: string;
  toc: any[];
  created_at: string;
  updated_at: string;
};

export type AdminPostCreatePayload = {
  slug: string;
  title: string;
  summary: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
  content_md: string;
};

export type AdminPostUpdatePayload = Partial<{
  title: string;
  summary: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
  content_md: string;
  slug: string; // 기본은 edit에서 잠그는 걸 추천
}>;

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }
  return res.json();
}

export function createAdminPost(payload: AdminPostCreatePayload) {
  return request<AdminPostDetail>("/api/admin/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function getAdminPostBySlug(params: { category: PostCategory; slug: string }) {
  const qs = `category=${encodeURIComponent(params.category)}&slug=${encodeURIComponent(params.slug)}`;
  return request<AdminPostDetail>(`/api/admin/posts/by-slug?${qs}`, { method: "GET" });
}

export function updateAdminPost(postId: string, payload: AdminPostUpdatePayload) {
  return request<AdminPostDetail>(`/api/admin/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function adminLogout() {
  return request<{ ok: boolean }>("/api/auth/admin/logout", { method: "POST" });
}

export async function adminMe() {
  return request<{ ok: boolean }>("/api/auth/admin/me", { method: "GET" });
}
