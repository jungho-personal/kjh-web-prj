import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

import { slugify } from "@/utils/slug";
import { createAdminPost } from "@/api/posts";

type PostCategory = "blog" | "dev_log";

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function AdminEditor() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState<PostCategory>("blog");
  const [tagsRaw, setTagsRaw] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("# 제목\n\n여기에 내용을 작성하세요.");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const tags = useMemo(() => parseTags(tagsRaw), [tagsRaw]);

  const onAutoSlug = () => setSlug(slugify(title));

  const onSave = async () => {
    try {
      setSaving(true);

      const res = await createAdminPost({
        title,
        summary,
        slug: slug || slugify(title),
        category,
        tags,
        published,
        content_md: content, // ✅ backend 필드명
      });

      navigate(`/${res.category}/${res.slug}`);
    } catch (e: any) {
      alert(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Editor</h1>
        <div className="flex items-center gap-3">
          <Label className="text-sm">Published</Label>
          <Switch checked={published} onCheckedChange={setPublished} />
          <Button onClick={onSave} disabled={saving}>
            {saving ? "저장 중..." : "저장"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>메타 정보</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목"
            />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <div className="flex gap-2">
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="예: railway-first-post"
              />
              <Button type="button" variant="secondary" onClick={onAutoSlug}>
                자동
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex gap-2">
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
            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Markdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[420px] font-mono text-sm"
            />
          </CardContent>
        </Card>

        <Card className="min-h-[520px]">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
