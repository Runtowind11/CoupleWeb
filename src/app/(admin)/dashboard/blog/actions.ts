"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createPost(formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;

  let attempt = 0;
  while (true) {
    const currentSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
    const { error } = await supabase.from("posts").insert({
      title,
      slug: currentSlug,
      excerpt,
      content,
      published: true,
    });

    if (!error) break;

    if (error.code === "23505") {
      attempt++;
      continue;
    }

    throw new Error(error.message);
  }

  revalidatePath("/dashboard/blog");
  redirect("/dashboard/blog");
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;

  const { error } = await supabase
    .from("posts")
    .update({ title, slug, excerpt, content, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/blog");
  redirect("/dashboard/blog");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deletePost(id: string, _formData: FormData) {
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("content")
    .eq("id", id)
    .single();

  if (post?.content) {
    const imageUrls = [...post.content.matchAll(/!\[.*?\]\(([^)]+)\)/g)].map(
      (m) => m[1],
    );

    const fileNames = imageUrls
      .map((url) => url.split("/").pop())
      .filter(Boolean) as string[];

    if (fileNames.length > 0) {
      await supabase.storage.from("posts-images").remove(fileNames);
    }
  }

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/blog");
  revalidatePath("/dashboard");
}
