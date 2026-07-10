import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { uploadPhoto, deletePhoto } from "./actions";

export default async function GalleryManagePage() {
  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("id, src, alt")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">相册管理</h1>

      <form
        action={uploadPhoto}
        className="flex items-end gap-4 rounded-xl border p-4"
      >
        <div className="flex-1 space-y-2">
          <label htmlFor="alt" className="text-sm font-medium">
            描述
          </label>
          <Input id="alt" name="alt" placeholder="图片描述" />
        </div>
        <div className="flex-1 space-y-2">
          <label htmlFor="file" className="text-sm font-medium">
            文件
          </label>
          <Input id="file" name="file" type="file" accept="image/*" required />
        </div>
        <Button type="submit" className="shrink-0">
          <Upload className="h-4 w-4" />
          上传
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.id} className="group aspect-square overflow-hidden rounded-xl">
              <div className="relative h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="wrap-break-word text-xs leading-relaxed text-white">
                    {photo.alt}
                  </p>
                </div>
                <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <form action={deletePhoto}>
                    <input type="hidden" name="id" value={photo.id} />
                    <input type="hidden" name="src" value={photo.src} />
                    <Button variant="destructive" size="icon-xs" type="submit">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            暂无照片
          </p>
        )}
      </div>
    </div>
  );
}
