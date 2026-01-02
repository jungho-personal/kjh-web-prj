// frontend/src/pages/AdminEditor.tsx
// 뭐노 이거 와이라노
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { slugify } from "@/utils/slug";
import { buildDevLogTemplate } from "@/constants/devlogTemplate";
import { formatKoreanDate } from "@/utils/date";

import {
  createAdminPostWithBasicAuth,
  type PostCategory,
} from "@/api/admin";

type Category = PostCategory;

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function categoryToPath(category: Category) {
  if (category === "dev_log") return "dev-log";
  return category; // blog | portfolio
}

export default function AdminEditor() {
  const navigate = useNavigate();

  // ✅ Admin BasicAuth 입력(세션 저장)
  const [adminUser, setAdminUser] = useState(
    sessionStorage.getItem("admin_user") || "admin"
  );
  const [adminPass, setAdminPass] = useState(
    sessionStorage.getItem("admin_pass") || ""
  );

  const onChangeAdminUser = (v: string) => {
    setAdminUser(v);
    sessionStorage.setItem("admin_user", v);
  };

  const onChangeAdminPass = (v: string) => {
    setAdminPass(v);
    sessionStorage.setItem("admin_pass", v);
  };

  // ✅ (향후 수정 모드 대비) 지금은 생성 전용
  const editingPostId: string | null = null;

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<Category>("blog");

  const [tagsRaw, setTagsRaw] = useState("");
  const tags = useMemo(() => parseTags(tagsRaw), [tagsRaw]);

  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  // ✅ 템플릿 자동 삽입을 위해 기본은 빈 값
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  const [saving, setSaving] = useState(false);

  // ✅ Title 변경 시 slugTouched 아니면 자동 slug 갱신
  const onChangeTitle = (next: string) => {
    setTitle(next);
    if (!slugTouched) setSlug(slugify(next));
  };

  // ✅ Slug 직접 변경 시 touched 처리 + 정규화
  const onChangeSlug = (next: string) => {
    setSlugTouched(true);
    setSlug(slugify(next));
  };

  // ✅ “자동” 버튼은 touched 처리 X
  const onAutoSlug = () => setSlug(slugify(title));

  // ✅ Dev Log: 카테고리 선택 시 템플릿/제목/slug 자동 세팅 (빈 값일 때만)
  useEffect(() => {
    if (category !== "dev_log") return;
    if (editingPostId) return;

    const dateStr = formatKoreanDate(new Date().toISOString());

    setTitle((prev) => {
      if (!prev || prev.startsWith("Dev Log –")) return `Dev Log – ${dateStr}`;
      return prev;
    });

    if (!slugTouched) {
      setSlug(slugify(`dev-log-${dateStr}`));
    }

    setContent((prev) => (prev?.trim() ? prev : buildDevLogTemplate(dateStr)));
  }, [category, editingPostId, slugTouched]);

  const onSave = async () => {
    try {
      setSaving(true);

      if (!adminUser?.trim() || !adminPass?.trim()) {
        alert("admin 계정 정보를 먼저 입력해줘 (username / password).");
        return;
      }

      const finalSlug = slug?.trim() ? slugify(slug) : slugify(title);

      const res = await createAdminPostWithBasicAuth(
        {
          title,
          summary,
          slug: finalSlug,
          category,
          tags,
          published,
          content_md: content,
        },
        adminUser,
        adminPass
      );

      const path = categoryToPath(res.category);
      navigate(`/${path}/${res.slug}`);
    } catch (e: any) {
      alert(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Admin Editor</h1>

        <div className="flex items-center gap-3">
          <Label className="text-sm">Published</Label>
          <Switch checked={published} onCheckedChange={setPublished} />

          <Button onClick={onSave} disabled={saving}>
            {saving ? "저장 중." : "저장"}
          </Button>
        </div>
      </div>

      {/* Admin Auth */}
      <Card>
        <CardHeader>
          <CardTitle>Admin 인증 (Basic Auth)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>ADMIN_USERNAME</Label>
            <Input
              value={adminUser}
              onChange={(e) => onChangeAdminUser(e.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="space-y-2">
            <Label>ADMIN_PASSWORD</Label>
            <Input
              value={adminPass}
              onChange={(e) => onChangeAdminPass(e.target.value)}
              placeholder="admin password"
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              저장 시에만 사용되고, 브라우저 sessionStorage에만 보관됨(창 닫으면 사라짐).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meta */}
      <Card>
        <CardHeader>
          <CardTitle>메타 정보</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => onChangeTitle(e.target.value)}
              placeholder="글 제목"
            />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <div className="flex gap-2">
              <Input
                value={slug}
                onChange={(e) => onChangeSlug(e.target.value)}
                placeholder="예: railway-first-post"
              />
              <Button type="button" variant="secondary" onClick={onAutoSlug}>
                자동
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              slug를 직접 수정하면 이후 Title 변경 시 자동 갱신이 멈춥니다.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={category === "blog" ? "default" : "secondary"}
                onClick={() => setCategory("blog")}
              >
                blog
              </Button>
              <Button
                type="button"
                variant={category === "dev_log" ? "default" : "secondary"}
                onClick={() => setCategory("dev_log")}
              >
                dev_log
              </Button>
              <Button
                type="button"
                variant={category === "portfolio" ? "default" : "secondary"}
                onClick={() => setCategory("portfolio")}
              >
                portfolio
              </Button>
            </div>

            {category === "dev_log" ? (
              <p className="text-xs text-muted-foreground">
                Dev Log 선택 시 템플릿/제목/slug가 자동 세팅됩니다(빈 값일 때만).
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Tags (comma separated)</Label>
            <Input
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="FastAPI, Railway, PostgreSQL"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Summary</Label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="한 줄 요약"
              className="min-h-20"
            />
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Markdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[420px] font-mono text-sm"
              placeholder="마크다운 내용을 입력하세요."
            />
          </CardContent>
        </Card>

        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
