"use client";

import { useActionState } from "react";
import { uploadSong } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function UploadSongForm() {
  const [state, formAction, pending] = useActionState(uploadSong, null);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-4 rounded-xl border p-4">
      <div className="min-w-40 flex-1 space-y-2">
        <label htmlFor="title" className="text-sm font-medium">歌曲名</label>
        <Input id="title" name="title" placeholder="例如：我们的歌" />
      </div>
      <div className="min-w-32 flex-1 space-y-2">
        <label htmlFor="artist" className="text-sm font-medium">歌手（可选）</label>
        <Input id="artist" name="artist" placeholder="例如：张三" />
      </div>
      <div className="min-w-52 flex-1 space-y-2">
        <label htmlFor="file" className="text-sm font-medium">文件</label>
        <Input id="file" name="file" type="file" accept="audio/*" required />
      </div>
      <Button type="submit" className="shrink-0" disabled={pending}>
        <Upload className="h-4 w-4" /> 上传
      </Button>
      {state?.error && (
        <p className="w-full text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
