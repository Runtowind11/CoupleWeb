"use client";

import { useActionState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, AlertCircle, ShieldAlert } from "lucide-react";
import { login } from "./actions";

function LoginForm() {
  const [state, formAction, pending] = useActionState(login, { error: "", success: false });
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUnauthorized = searchParams.get("message") === "unauthorized";
  const isApproved = searchParams.get("approved") === "true";

  useEffect(() => {
    if (state.success) {
      sessionStorage.setItem("admin_session", "true");
      router.push("/dashboard");
    }
  }, [state.success, router]);

  useEffect(() => {
    if (state.pending) {
      sessionStorage.setItem("pending_email", state.email);
      router.push("/login/pending");
    }
  }, [state.pending, state.email, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-rose-100 to-purple-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <Heart className="mb-2 h-8 w-8 fill-rose-500 text-rose-500" />
          <CardTitle className="text-xl">管理员登录</CardTitle>
        </CardHeader>
        <CardContent>
          {isUnauthorized && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              请管理员登录后进行访问
            </div>
          )}
          {isApproved && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              审核已通过，请重新登录
            </div>
          )}
          <form className="space-y-4" action={formAction}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">邮箱</label>
              <Input id="email" name="email" type="email" placeholder="请输入邮箱" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">密码</label>
              <Input id="password" name="password" type="password" placeholder="请输入密码" required />
            </div>
            {state.error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {state.error}
              </div>
            )}
            <Button type="submit" disabled={pending} className="w-full bg-rose-500 text-white hover:bg-rose-600">
              {pending ? "登录中..." : "登录"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
