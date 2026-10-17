"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hasAdminSession } from "@/lib/admin-session";

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    if (!hasAdminSession()) {
      const supabase = createClient();
      supabase.auth.signOut().finally(() => {
        router.replace("/login?message=unauthorized");
      });
    }
  }, [router]);

  return <>{children}</>;
}