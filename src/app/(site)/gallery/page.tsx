import Image from "next/image";

const photos = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80",
    alt: "Couple walking hand in hand",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&q=80",
    alt: "Couple silhouette at sunset",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518199267971-48cc2b8c0f6c?w=600&q=80",
    alt: "Romantic couple embrace",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1530109242549-1e42b3e5f6b8?w=600&q=80",
    alt: "Pair of wedding rings",
  },
];

export default function GalleryPage() {
  return (
    <div className="flex-1 bg-linear-to-b from-rose-50 to-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Gallery</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
