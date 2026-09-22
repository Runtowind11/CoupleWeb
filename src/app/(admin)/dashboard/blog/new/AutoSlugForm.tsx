"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { titleToSlug } from "@/lib/slug";
import { createPost } from "../actions";

export default function AutoSlugForm() {
  const [title, setTitle] = useState("");
  const [state, formAction, pending] = useActionState(createPost, {
    success: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const slug = titleToSlug(title) || "untitled";

  useEffect(() => {
    if (state.success !== undefined && state.success !== false) {
      setDialogOpen(true);
    } else if (state.error) {
      setDialogOpen(true);
    }
  }, [state]);

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (state.success) {
      router.push("/dashboard/blog");
      router.refresh();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleDialogClose();
    }
  };

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            标题
          </label>
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
          <p className="text-xs text-muted-foreground">Slug: {slug}</p>
        )}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            摘要
          </label>
          <Textarea
            id="excerpt"
            name="excerpt"
            placeholder="简短的文章摘要..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            正文
          </label>
          <MarkdownEditor
            name="content"
            placeholder="文章内容（支持 Markdown）..."
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="bg-rose-500 text-white hover:bg-rose-600"
        >
          {pending ? "提交中..." : "发布文章"}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.success ? "提交成功" : "提交失败"}</DialogTitle>
            <DialogDescription>
              {state.success
                ? "文章已成功发布，点击关闭后将跳转到文章列表。"
                : `发布失败：${state.error || "未知错误"}，请稍后重试。`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDialogClose}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
