import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Trash2 } from "lucide-react";
import { deleteAllLogs } from "./actions";

const MAIN_ADMIN_EMAIL = "3275239616@qq.com";

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (user?.email !== MAIN_ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const { data: logs } = await supabase
    .from("admin_login_logs")
    .select("*")
    .order("logged_in_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">消息</h1>
        <p className="mt-1 text-muted-foreground">管理员登录记录</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {logs ? `共 ${logs.length} 条记录` : ""}
        </p>
        {logs && logs.length > 0 && (
          <form action={deleteAllLogs}>
            <Button type="submit" variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
              清空记录
            </Button>
          </form>
        )}
      </div>

      {!logs || logs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <MessageSquare className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">暂无登录记录</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardHeader className="py-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-rose-500" />
                  <div>
                    <CardTitle className="text-base">{log.email}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(log.logged_in_at).toLocaleString("zh-CN", {
                        timeZone: "Asia/Shanghai",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
