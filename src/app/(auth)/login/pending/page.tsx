"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldAlert } from "lucide-react";
import { checkApproval } from "../actions";

export default function PendingPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "approved" | "denied" | "expired">("pending");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("pending_email");
    if (!stored) {
      router.replace("/login");
      return;
    }
    setEmail(stored);
  }, [router]);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;
    let attempts = 0;

    async function poll() {
      const result = await checkApproval(email);
      if (cancelled) return;

      if (result === "approved") {
        setStatus("approved");
        sessionStorage.removeItem("pending_email");
        setTimeout(() => router.replace("/login?approved=true"), 1500);
      } else if (result === "denied") {
        setStatus("denied");
        sessionStorage.removeItem("pending_email");
      } else {
        attempts++;
        if (attempts >= 40) {
          setStatus("expired");
          sessionStorage.removeItem("pending_email");
          return;
        }
        setTimeout(poll, 3000);
      }
    }

    poll();
    return () => { cancelled = true; };
  }, [email, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-rose-100 to-purple-100 px-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="items-center">
          <ShieldAlert className="mb-2 h-10 w-10 text-amber-500" />
          <CardTitle className="text-xl">
            {status === "pending" && "等待管理员审核"}
            {status === "approved" && "审核已通过"}
            {status === "denied" && "审核未通过"}
            {status === "expired" && "审批已超时"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === "pending" && (
            <div className="space-y-3">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-rose-500" />
              <p className="text-sm text-muted-foreground">
                请等待管理员审批你的登录请求
              </p>
            </div>
          )}
          {status === "approved" && (
            <p className="text-sm text-green-600">正在跳转到登录页...</p>
          )}
          {status === "denied" && (
            <p className="text-sm text-destructive">管理员拒绝了你的登录请求</p>
          )}
          {status === "expired" && (
            <p className="text-sm text-muted-foreground">
              审批已超时，请重新登录
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
