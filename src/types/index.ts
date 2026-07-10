export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  date: string;
  category?: string;
}
