import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("slug, title, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="flex-1">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">博客</h1>
        <div className="space-y-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.slug}
                className="liquid-glass group rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold group-hover:text-rose-500">
                    {post.title}
                  </h2>
                </Link>
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <time dateTime={post.created_at}>
                    {new Date(post.created_at).toLocaleString("zh-CN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </time>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-muted-foreground">暂无文章</p>
          )}
        </div>
      </section>
    </div>
  );
}
