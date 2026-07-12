import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ShieldAlert } from "lucide-react";
import { approve, deny } from "./actions";

export default async function ApprovalsPage() {
  const supabase = await createClient();

  const { data: pendingList } = await supabase
    .from("pending_approvals")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">审核管理</h1>
        <p className="mt-1 text-muted-foreground">管理待审批的登录请求</p>
      </div>

      {!pendingList || pendingList.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <ShieldAlert className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">暂无待审批的登录请求</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingList.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">{item.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  请求时间：{new Date(item.created_at).toLocaleString("zh-CN")}
                </p>
                <div className="flex gap-3">
                  <form action={approve.bind(null, item.id)}>
                    <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                      <Check className="h-4 w-4" />
                      通过
                    </Button>
                  </form>
                  <form action={deny.bind(null, item.id)}>
                    <Button type="submit" variant="destructive">
                      <X className="h-4 w-4" />
                      拒绝
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
