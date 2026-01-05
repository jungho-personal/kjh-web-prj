import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Content } from "@/components/layout/Content";

import {
  adminMe,
  createAdminPost,
  getAdminPostBySlug,
  updateAdminPost,
  type PostCategory,
} from "@/api/admin";

type Category = PostCategory;

function slugify(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sectionToCategory(section: string | undefined): Category | null {
  if (!section) return null;
  if (section === "blog") return "blog";
  if (section === "dev-log") return "dev_log";
  if (section === "portfolio") return "portfolio";
  return null;
}

function categoryToPath(category: Category) {
  if (category === "blog") return "blog";
  if (category === "dev_log") return "dev-log";
  return "portfolio";
}

const DEVLOG_TEMPLATE = `# 🛠️ Dev Log – YYYY.MM.DD

## 📌 작업 요약
- (오늘 무엇을 했는지 한 줄 요약)
- (배포 / 기능 / 설정 등 핵심 키워드 위주)

---

## 🧩 작업 내용

### 1. 작업 제목 1
- 무엇을 했는지 1줄
- 왜 이 작업을 했는지 or 어떤 문제를 해결했는지 1줄

### 2. 작업 제목 2
- 작업 내용 요약
- 결과 또는 확인 사항

### 3. 작업 제목 3 (필요 시)
- …
- …

---

## ⚠️ 이슈 & 해결
- **이슈**: (문제 상황 한 줄)
  - **원인**: (왜 발생했는지)
  - **해결**: (어떻게 해결했는지)

> 이슈 없으면  
> \`- 없음\`

---

## ✅ 현재 상태
- 로컬 실행 여부: OK / NG
- Docker 상태: OK / NG
- 배포 상태: OK / NG
- 외부 접근(URL): OK / NG

---

## 🔜 다음 작업 (Next Step)
- [ ] 다음에 할 작업 1
- [ ] 다음에 할 작업 2
- [ ] 다음에 할 작업 3

---

## 🏷️ Tags
\`#FastAPI\` \`#Docker\` \`#Railway\` \`#DevLog\` \`#PersonalProject\`

## 📂 Category
- Development Log
`;

export default function AdminEditor() {
  const navigate = useNavigate();
  const { section, slug: routeSlug } = useParams();

  const editingCategory = useMemo(() => sectionToCategory(section), [section]);
  const isEdit = Boolean(editingCategory && routeSlug);

  const [saving, setSaving] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<Category>("blog");
  const [tagsRaw, setTagsRaw] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState("");

  const tags = useMemo(() => {
    return tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [tagsRaw]);

  // ✅ 페이지 진입 시 admin 세션 체크 (쿠키 기반)
  useEffect(() => {
    (async () => {
      try {
        await adminMe();
      } catch {
        navigate("/admin/login", { replace: true });
      }
    })();
  }, [navigate]);

  // create에서만 dev-log 템플릿 자동 삽입
  useEffect(() => {
    if (isEdit) return;
    if (category !== "dev_log") return;
    if (content.trim().length > 0) return;
    setContent(DEVLOG_TEMPLATE);
  }, [isEdit, category]); // eslint-disable-line react-hooks/exhaustive-deps

  // create에서만 title 기반 slug 자동 생성
  useEffect(() => {
    if (isEdit) return;
    if (slugTouched) return;
    if (!title.trim()) return;
    setSlug(slugify(title));
  }, [isEdit, slugTouched, title]);

  // edit 모드: 기존 글 로드
  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      try {
        setSaving(true);

        const p = await getAdminPostBySlug({
          category: editingCategory!,
          slug: routeSlug!,
        });

        setEditingPostId(String(p.id));
        setTitle(p.title ?? "");
        setSummary(p.summary ?? "");
        setCategory(p.category ?? editingCategory!);
        setTagsRaw((p.tags ?? []).join(", "));
        setSlug(p.slug ?? "");
        setSlugTouched(true);
        setContent(p.content_md ?? "");
        setPublished(Boolean(p.published));
      } catch (e: any) {
        const msg = e?.message ?? "Load failed";
        if (String(msg).startsWith("401")) {
          navigate("/admin/login", { replace: true });
          return;
        }
        alert(msg);
      } finally {
        setSaving(false);
      }
    })();
  }, [isEdit, editingCategory, routeSlug, navigate]);

  const onChangeSlug = (v: string) => {
    setSlugTouched(true);
    setSlug(v);
  };

  const onSave = async () => {
    try {
      setSaving(true);

      if (isEdit) {
        if (!editingPostId) {
          alert("편집 대상 id를 못 가져왔어. (로드가 정상인지 확인)");
          return;
        }

        const res = await updateAdminPost(editingPostId, {
          title,
          summary,
          category,
          tags,
          published,
          content_md: content,
        });

        const path = categoryToPath(res.category);
        navigate(`/${path}/${res.slug}`);
        return;
      }

      const finalSlug = slug?.trim() ? slugify(slug) : slugify(title);

      const res = await createAdminPost({
        title,
        summary,
        slug: finalSlug,
        category,
        tags,
        published,
        content_md: content,
      });

      const path = categoryToPath(res.category);
      navigate(`/${path}/${res.slug}`);
    } catch (e: any) {
      const msg = e?.message ?? "Save failed";
      if (String(msg).startsWith("401")) {
        navigate("/admin/login", { replace: true });
        return;
      }
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Content variant="wide" className="py-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">{isEdit ? "Edit Post" : "New Post"}</h1>
          <p className="text-sm text-muted-foreground">
            {isEdit
              ? "기존 글을 수정합니다. created_at은 유지되고 updated_at만 갱신됩니다."
              : "새 글을 작성합니다."}
          </p>
        </div>
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
  
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
  
            <div className="space-y-2">
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2">
                {(["blog", "dev_log", "portfolio"] as Category[]).map((c) => (
                  <Button
                    key={c}
                    type="button"
                    variant={category === c ? "default" : "secondary"}
                    onClick={() => setCategory(c)}
                    disabled={saving}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
  
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
            </div>
  
            <div className="space-y-2">
              <Label>Summary</Label>
              <Input value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="요약" />
            </div>
  
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(e) => onChangeSlug(e.target.value)}
                placeholder="예: railway-first-post"
                disabled={isEdit}
              />
              {isEdit && (
                <p className="text-xs text-muted-foreground">Edit 모드에서는 slug 변경을 기본적으로 막습니다.</p>
              )}
            </div>
  
            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input
                value={tagsRaw}
                onChange={(e) => setTagsRaw(e.target.value)}
                placeholder="FastAPI, Railway, ..."
              />
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
  
            <div className="flex items-center justify-between rounded-xl border p-3">
              <div className="space-y-1">
                <div className="font-medium">Published</div>
                <div className="text-xs text-muted-foreground">공개 여부</div>
              </div>
              <Switch checked={published} onCheckedChange={setPublished} />
            </div>
  
            <div className="space-y-2">
              <Label>Content (Markdown)</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Markdown..."
                className="min-h-[280px]"
              />
            </div>
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
    </Content>
  );
}
