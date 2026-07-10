import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: photos } = await supabase
    .from("photos")
    .select("src, alt")
    .order("created_at", { ascending: false });

  return (
    <div className="flex-1 bg-linear-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">相册</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos && photos.length > 0 ? (
            photos.map((photo, i) => (
              <div key={i} className="group aspect-square overflow-hidden rounded-xl">
                <a
                  href={photo.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-full"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {photo.alt && (
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="wrap-break-word text-xs leading-relaxed text-white">
                        {photo.alt}
                      </p>
                    </div>
                  )}
                </a>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              暂无照片
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
