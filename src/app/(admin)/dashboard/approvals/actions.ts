"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function approve(id: number) {
  const supabase = await createClient();
  await supabase.from("pending_approvals").update({ status: "approved" }).eq("id", id);
  revalidatePath("/dashboard/approvals");
}

export async function deny(id: number) {
  const supabase = await createClient();
  await supabase.from("pending_approvals").update({ status: "denied" }).eq("id", id);
  revalidatePath("/dashboard/approvals");
}
