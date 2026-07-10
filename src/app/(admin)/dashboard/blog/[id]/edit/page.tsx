import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import { createClient } from "@/lib/supabase/server";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">编辑文章</h1>
      <Card>
        <CardHeader>
          <CardTitle>文章详情</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updatePost.bind(null, id)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">标题</label>
              <Input id="title" name="title" defaultValue={post.title} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">Slug</label>
              <Input id="slug" name="slug" defaultValue={post.slug} required />
            </div>
            <div className="space-y-2">
              <label htmlFor="excerpt" className="text-sm font-medium">摘要</label>
              <Textarea id="excerpt" name="excerpt" defaultValue={post.excerpt ?? ""} rows={3} />
            </div>
            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">正文</label>
              <MarkdownEditor name="content" defaultValue={post.content ?? ""} />
            </div>
            <Button type="submit" className="bg-rose-500 text-white hover:bg-rose-600">
              保存修改
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
