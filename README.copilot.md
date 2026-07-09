# Project: Our Story (Couple Website)
## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI Components: shadcn/ui (New York style, Rose primary)
- Animations: Framer Motion
- Database/Auth/Storage: Supabase (PostgreSQL)
- Deployment: Vercel

## Project Structure Rules
- `src/app/(site)/`: Public routes (Home, Blog, Gallery, About)
- `src/app/(admin)/`: Protected admin routes (Dashboard, Login, Editor)
- `src/components/site/`: Public UI components (Navbar, Hero, PhotoGrid)
- `src/components/admin/`: Admin-specific components
- `src/lib/`: Utilities (supabase client/server, utils)
- `src/content/posts/`: Local MDX blog posts (if not using DB for content)
- `src/types/`: TypeScript types (Post, Photo, etc.)

## Design System (Strictly Follow)
- Primary Color: Rose (#f43f5e) - Used for buttons, links, accents.
- Background: Warm White / Cream (zinc-50 or #fef3e2).
- Typography: 
  - Headings: Serif (Playfair Display or Cormorant Garamond) via `next/font`.
  - Body: Sans-serif (Inter or System UI).
- Border Radius: `rounded-xl` or `rounded-2xl` for cards.
- Shadows: Soft, diffuse shadows (e.g., `shadow-lg` with rose tint).

## Coding Conventions
- Use 'use client' directive only when Client Components are needed (Framer Motion, hooks).
- Prefer Server Components for data fetching (from Supabase).
- All components must be responsive (Mobile First).
- Use `lucide-react` for icons.
- Use `clsx` and `tailwind-merge` for conditional class names.

## Business Logic
- Relationship Start Date: 2024-08-15 (Update this!)
- Only authenticated users (us) can access `/admin/*`.
- Images uploaded via admin should be sent to Cloudinary (configured later), metadata stored in Supabase.