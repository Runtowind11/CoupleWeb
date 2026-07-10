"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { titleToSlug } from "@/lib/slug";
import { createPost } from "../actions";

export default function AutoSlugForm() {
  const [title, setTitle] = useState("");
  const slug = titleToSlug(title) || "untitled";

  return (
    <form action={createPost} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">标题</label>
        <Input
          id="title"
          name="title"
          placeholder="文章标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <input type="hidden" name="slug" value={slug} />
      {slug !== "untitled" && (
        <p className="text-xs text-muted-foreground">
          Slug: {slug}
        </p>
      )}
      <div className="space-y-2">
        <label htmlFor="excerpt" className="text-sm font-medium">摘要</label>
        <Textarea id="excerpt" name="excerpt" placeholder="简短的文章摘要..." rows={3} />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">正文</label>
        <MarkdownEditor name="content" placeholder="文章内容（支持 Markdown）..." />
      </div>
      <Button type="submit" className="bg-rose-500 text-white hover:bg-rose-600">
        发布文章
      </Button>
    </form>
  );
}
