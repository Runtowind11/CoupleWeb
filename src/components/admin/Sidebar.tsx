"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Images, LogOut, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(admin)/actions";

const navItems = [
  { href: "/dashboard", label: "控制台", icon: LayoutDashboard },
  { href: "/dashboard/blog", label: "博客", icon: Newspaper },
  { href: "/dashboard/gallery", label: "相册", icon: Images },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-zinc-950 text-white">
      <div className="flex h-16 items-center px-6">
        <span className="text-lg font-semibold tracking-tight">管理员</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-sm font-normal",
                  isActive
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "text-zinc-400 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-800 px-3 py-4 space-y-1">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sm font-normal text-zinc-400 hover:text-white"
          >
            <House className="h-4 w-4" />
            回到主页
          </Button>
        </Link>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-sm font-normal text-zinc-400 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </form>
      </div>
    </aside>
  );
}
