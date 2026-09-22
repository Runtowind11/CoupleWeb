import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import EditPostForm from "./EditPostForm";

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
          <EditPostForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
}
