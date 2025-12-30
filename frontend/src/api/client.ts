import type { PostListResponse, PostDetail } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? ""; // 로컬은 ""로 OK

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers as any),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return (await res.json()) as T;
}

export function listPosts(params?: { category?: string; limit?: number; cursor?: string }) {
  const q = new URLSearchParams();
  if (params?.category) q.set("category", params.category);
  if (params?.limit) q.set("limit", String(params.limit));
  if (params?.cursor) q.set("cursor", params.cursor);

  const qs = q.toString();
  return request<PostListResponse>(`/api/posts${qs ? `?${qs}` : ""}`);
}

export function getPost(slug: string) {
  return request<PostDetail>(`/api/posts/${encodeURIComponent(slug)}`);
}
