import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "./actions";

export default async function BlogManagePage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">博客管理</h1>
        <Link href="/dashboard/blog/new">
          <Button>
            <Plus className="h-4 w-4" />
            写新文章
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>标题</TableHead>
            <TableHead className="w-32">日期</TableHead>
            <TableHead className="w-24 text-right">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="text-muted-foreground">
                  {post.id.slice(0, 8)}
                </TableCell>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString("zh-CN")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Link href={`/dashboard/blog/${post.id}/edit`}>
                      <Button variant="ghost" size="icon-sm">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>
                    <form action={deletePost.bind(null, post.id)}>
                      <Button type="submit" variant="ghost" size="icon-sm">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                暂无文章
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
