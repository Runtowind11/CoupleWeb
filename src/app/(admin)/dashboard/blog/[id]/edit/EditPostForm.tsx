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
import { updatePost } from "../../actions";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
};

export default function EditPostForm({ post }: { post: Post }) {
  const [state, formAction, pending] = useActionState(
    updatePost.bind(null, post.id),
    { success: false },
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

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
          <Input id="title" name="title" defaultValue={post.title} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium">
            Slug
          </label>
          <Input id="slug" name="slug" defaultValue={post.slug} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium">
            摘要
          </label>
          <Textarea
            id="excerpt"
            name="excerpt"
            defaultValue={post.excerpt ?? ""}
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            正文
          </label>
          <MarkdownEditor name="content" defaultValue={post.content ?? ""} />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="bg-rose-500 text-white hover:bg-rose-600"
        >
          {pending ? "保存中..." : "保存修改"}
        </Button>
      </form>

      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.success ? "提交成功" : "提交失败"}</DialogTitle>
            <DialogDescription>
              {state.success
                ? "修改已保存，点击关闭后将跳转到文章列表。"
                : `保存失败：${state.error || "未知错误"}，请稍后重试。`}
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
