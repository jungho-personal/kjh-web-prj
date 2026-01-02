// frontend/src/api/admin.ts
export type PostCategory = "blog" | "dev_log" | "portfolio";

export type AdminPostCreate = {
  title: string;
  summary: string;
  slug: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
  content_md: string;
};

export type PostDetail = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: PostCategory;
  tags: string[];
  published: boolean;
  content_md: string;
  toc?: any[];
  created_at: string;
  updated_at: string;
};

function buildBasicAuthHeader(username: string, password: string) {
  // Basic base64("user:pass")
  const token = btoa(`${username}:${password}`);
  return `Basic ${token}`;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  const contentType = res.headers.get("content-type") ?? "";
  const data = text && contentType.includes("application/json") ? JSON.parse(text) : text;

  if (!res.ok) {
    const msg =
      typeof data === "object" && data && "detail" in data
        ? // FastAPI 기본: {"detail": "..."}
          (data as any).detail
        : `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}

/**
 * ✅ 같은 도메인/서버에서 운영하는 구조라 baseURL 필요 없음.
 * - dev: Vite proxy로 /api -> http://localhost:8000/api
 * - prod: FastAPI가 /api + static 서빙
 */
const API_PREFIX = "/api";

/** POST /api/admin/posts (BasicAuth) */
export async function createAdminPostWithBasicAuth(
  body: AdminPostCreate,
  adminUser: string,
  adminPass: string
): Promise<PostDetail> {
  const res = await fetch(`${API_PREFIX}/admin/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: buildBasicAuthHeader(adminUser, adminPass),
    },
    body: JSON.stringify(body),
  });

  return handleResponse<PostDetail>(res);
}

/** PATCH /api/admin/posts/{post_id} (BasicAuth) - 나중에 수정모드 붙일 때 사용 */
export async function updateAdminPostWithBasicAuth(
  postId: string | number,
  body: Partial<AdminPostCreate>,
  adminUser: string,
  adminPass: string
): Promise<PostDetail> {
  const res = await fetch(`${API_PREFIX}/admin/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: buildBasicAuthHeader(adminUser, adminPass),
    },
    body: JSON.stringify(body),
  });

  return handleResponse<PostDetail>(res);
}
