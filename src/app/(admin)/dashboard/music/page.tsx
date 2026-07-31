import { createClient } from "@/lib/supabase/server";
import { deleteSong, setActiveSong, uploadSong } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Play, Trash2, Upload } from "lucide-react";

export default async function MusicPage() {
  const supabase = await createClient();

  const { data: songs } = await supabase
    .from("songs")
    .select("id, title, artist, src, is_active")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">音乐管理</h1>
        <p className="mt-1 text-muted-foreground">上传歌曲并设置主页播放器播放的音乐</p>
      </div>

      <form action={uploadSong} className="flex flex-wrap items-end gap-4 rounded-xl border p-4">
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
        <Button type="submit" className="shrink-0">
          <Upload className="h-4 w-4" /> 上传
        </Button>
      </form>

      <div className="space-y-3">
        {songs && songs.length > 0 ? (
          songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <Music className="h-5 w-5 shrink-0 text-rose-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{song.title}</p>
                {song.artist && (
                  <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
                )}
              </div>
              {song.is_active ? (
                <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs text-rose-500">
                  当前播放
                </span>
              ) : (
                <form action={setActiveSong}>
                  <input type="hidden" name="id" value={song.id} />
                  <Button type="submit" variant="outline" size="xs">
                    <Play className="h-4 w-4" /> 设为当前播放
                  </Button>
                </form>
              )}
              <form action={deleteSong}>
                <input type="hidden" name="id" value={song.id} />
                <input type="hidden" name="src" value={song.src} />
                <Button variant="destructive" size="icon-xs" type="submit" aria-label="删除">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </div>
          ))
        ) : (
          <p className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
            还没有歌曲，上传第一首后它会自动成为主页播放器的当前播放曲目
          </p>
        )}
      </div>
    </div>
  );
}
