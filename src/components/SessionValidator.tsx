"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { hasAdminSession } from "@/lib/admin-session";

export default function SessionValidator() {
  const router = useRouter();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    if (hasAdminSession()) return;

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        supabase.auth.signOut().then(() => {
          router.replace("/login?message=unauthorized");
        });
      }
    });
  }, [router]);

  return null;
}
