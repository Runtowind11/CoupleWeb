import { createClient } from "@/lib/supabase/server";
import { deleteSong, setActiveSong } from "./actions";
import UploadSongForm from "./UploadSongForm";
import { Button } from "@/components/ui/button";
import { Music, Play, Trash2 } from "lucide-react";

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

      <UploadSongForm />

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
