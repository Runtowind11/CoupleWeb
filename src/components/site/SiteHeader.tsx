import Link from "next/link";
import { Heart } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/50 bg-white/40 shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.25)] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" id="site-logo" className="flex items-center gap-2">
          <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
          <span className="text-lg font-semibold">Our Story</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            关于
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            文章
          </Link>
          <Link
            href="/gallery"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            相册
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            管理
          </Link>
          <a
            href="https://node.taild96dec.ts.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            观影
          </a>
        </nav>
      </div>
    </header>
  );
}
