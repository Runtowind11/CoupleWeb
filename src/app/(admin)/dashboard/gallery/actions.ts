"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function uploadPhoto(formData: FormData) {
  const supabase = await createClient();

  const file = formData.get("file") as File;
  const alt = formData.get("alt") as string;

  if (!file || file.size === 0) {
    throw new Error("请选择文件");
  }

  const ext = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from("photos")
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase.from("photos").insert({
    src: publicUrlData.publicUrl,
    alt: alt || file.name,
  });

  if (dbError) {
    throw new Error(dbError.message);
  }

  revalidatePath("/dashboard/gallery");
}

export async function deletePhoto(formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const src = formData.get("src") as string;

  const fileName = src.split("/").pop();

  if (fileName) {
    await supabase.storage.from("photos").remove([fileName]);
  }

  const { error } = await supabase.from("photos").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/gallery");
}
