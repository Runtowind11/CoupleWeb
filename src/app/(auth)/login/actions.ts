"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function login(
  _prevState: { error: string },
  formData: FormData,
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: recentApproval } = await supabase
    .from("pending_approvals")
    .select("id")
    .eq("email", email)
    .eq("status", "approved")
    .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString())
    .maybeSingle();

  if (recentApproval) {
    await supabase.from("pending_approvals").delete().eq("id", recentApproval.id);
  }

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { error: "邮箱或密码错误" };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id, needs_approval")
    .eq("email", email)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "该账号无管理员权限" };
  }

  if (admin.needs_approval && !recentApproval) {
    await supabase.from("pending_approvals").insert({ email, status: "pending" });
    await supabase.auth.signOut();
    return { error: "", pending: true, email };
  }

  revalidatePath("/dashboard", "layout");
  return { error: "", success: true };
}

export async function checkApproval(email: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pending_approvals")
    .select("status")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data?.status ?? null;
}
