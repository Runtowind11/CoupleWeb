import Link from "next/link";
import { CalendarDays } from "lucide-react";

const posts = [
  {
    slug: "our-first-trip",
    title: "我们的第一次旅行",
    date: "2024-06-15",
    excerpt: "那是一个阳光明媚的早晨，我们踏上了第一次旅行的征程...",
  },
  {
    slug: "anniversary-celebration",
    title: "周年纪念日",
    date: "2024-01-15",
    excerpt: "时间过得真快，转眼间我们已经走过了这么多年...",
  },
  {
    slug: "daily-life-moments",
    title: "日常小确幸",
    date: "2023-10-20",
    excerpt: "生活中的每一个微小瞬间，因为有你而变得特别...",
  },
];

export default function BlogPage() {
  return (
    <div className="flex-1 bg-linear-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold group-hover:text-rose-500">
                  {post.title}
                </h2>
              </Link>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
