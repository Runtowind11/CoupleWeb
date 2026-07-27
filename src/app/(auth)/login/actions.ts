"use server";

import { createClient } from "@/lib/supabase/server";

const MAIN_ADMIN_EMAIL = "3275239616@qq.com";

export async function login(
  _prevState: { error: string },
  formData: FormData,
) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { error: "邮箱或密码错误" };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .single();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "该账号无管理员权限" };
  }

  if (email !== MAIN_ADMIN_EMAIL) {
    await supabase.from("admin_login_logs").insert({
      email,
      logged_in_at: new Date().toISOString(),
    });
  }

  await supabase.auth.signOut({ scope: "others" });
  return { error: "", success: true };
}
