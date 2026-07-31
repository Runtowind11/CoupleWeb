import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { createClient } from "@/lib/supabase/server";
import Lightbox from "@/components/site/Lightbox";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="flex-1">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <time dateTime={post.created_at}>
            {new Date(post.created_at).toLocaleDateString("zh-CN")}
          </time>
        </div>
        {post.excerpt && (
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        )}
        <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              img(props) {
                const { src, alt } = props;
                return <Lightbox src={src as string} alt={alt || ""} />;
              },
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
