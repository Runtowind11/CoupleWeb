"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteAllLogs() {
  const supabase = await createClient();
  await supabase.from("admin_login_logs").delete().neq("id", 0);
  revalidatePath("/dashboard/messages");
}
