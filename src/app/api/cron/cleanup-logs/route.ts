import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { error } = await supabase
    .from("admin_login_logs")
    .delete()
    .lt("logged_in_at", today.toISOString());

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
