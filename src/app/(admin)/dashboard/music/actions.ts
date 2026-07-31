"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const AUDIO_EXTENSIONS = ["mp3", "wav", "m4a", "ogg", "flac", "aac", "webm"];

export type UploadSongState = { error: string } | null;

export async function uploadSong(
  _prev: UploadSongState,
  formData: FormData,
): Promise<UploadSongState> {
  try {
    const supabase = await createClient();

    const file = formData.get("file") as File;
    const title = (formData.get("title") as string) ?? "";
    const artist = (formData.get("artist") as string) ?? "";

    if (!file || file.size === 0) {
      return { error: "请选择音频文件" };
    }

    const ext = (file.name.split(".").pop() ?? "").toLowerCase();
    if (!file.type.startsWith("audio/") && !AUDIO_EXTENSIONS.includes(ext)) {
      return { error: "仅支持音频文件" };
    }

    const fileName = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("music")
      .upload(fileName, file);
    if (uploadError) {
      return { error: `上传文件失败：${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage.from("music").getPublicUrl(fileName);

    const { data: active } = await supabase
      .from("songs")
      .select("id")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();

    const { error: dbError } = await supabase.from("songs").insert({
      title: title || file.name,
      artist,
      src: urlData.publicUrl,
      is_active: !active,
    });
    if (dbError) {
      return { error: `保存记录失败：${dbError.message}` };
    }

    revalidatePath("/dashboard/music");
    return null;
  } catch (e) {
    return { error: e instanceof Error ? e.message : "上传失败，请稍后重试" };
  }
}

export async function setActiveSong(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  if (!id) return;

  await supabase.from("songs").update({ is_active: false }).eq("is_active", true);

  const { error } = await supabase.from("songs").update({ is_active: true }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/music");
}

export async function deleteSong(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const src = formData.get("src") as string;

  const fileName = src.split("/").pop();
  if (fileName) {
    await supabase.storage.from("music").remove([fileName]);
  }

  const { error } = await supabase.from("songs").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/music");
}
