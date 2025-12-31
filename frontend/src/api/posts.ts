export type PostCreatePayload = {
  title: string;
  summary: string;
  slug: string;
  category: "blog" | "dev_log";
  tags: string[];
  published: boolean;
  content_md: string;
};

export async function createAdminPost(payload: PostCreatePayload) {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (!token) throw new Error("Not authenticated");

  const res = await fetch("/api/admin/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Save failed");
  }

  return res.json();
}
