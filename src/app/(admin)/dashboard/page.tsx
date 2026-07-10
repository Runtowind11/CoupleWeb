import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Images, CalendarDays, Plus, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RunningDays from "@/components/admin/RunningDays";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: postCount }, { count: photoCount }] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("photos").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "文章总数", value: postCount ?? 0, icon: FileText },
    { label: "照片总数", value: photoCount ?? 0, icon: Images },
    { label: "运行天数", value: null, icon: CalendarDays, custom: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">控制台</h1>
        <p className="mt-1 text-muted-foreground">欢迎回来，管理员</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {stat.custom ? (
                  <RunningDays />
                ) : (
                  <span className="text-3xl font-bold">{stat.value}</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard/blog/new">
          <Button className="bg-rose-500 text-white hover:bg-rose-600">
            <Plus className="h-4 w-4" />
            写新文章
          </Button>
        </Link>
        <Link href="/dashboard/gallery">
          <Button variant="outline">
            <Upload className="h-4 w-4" />
            上传照片
          </Button>
        </Link>
      </div>
    </div>
  );
}
