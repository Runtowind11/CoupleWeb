import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&q=80", alt: "Couple walking" },
  { id: 2, src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&q=80", alt: "Couple silhouette" },
  { id: 3, src: "https://images.unsplash.com/photo-1518199267971-48cc2b8c0f6c?w=300&q=80", alt: "Romantic couple" },
  { id: 4, src: "https://images.unsplash.com/photo-1530109242549-1e42b3e5f6b8?w=300&q=80", alt: "Wedding rings" },
];

export default function GalleryManagePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="destructive" size="icon-xs">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
