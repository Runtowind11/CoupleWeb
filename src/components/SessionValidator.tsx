"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SessionValidator() {
  const router = useRouter();
  const checked = useRef(false);

  useEffect(() => {
    if (checked.current) return;
    checked.current = true;

    const flag = sessionStorage.getItem("admin_session");
    if (flag) return;

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
