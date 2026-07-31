import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionValidator from "@/components/SessionValidator";
import AmbientBackground from "@/components/site/AmbientBackground";
import MusicPlayer from "@/components/site/MusicPlayer";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "A love story website",
};

async function getActiveSong() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("songs")
      .select("src, title, artist")
      .eq("is_active", true)
      .limit(1)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const activeSong = await getActiveSong();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SessionValidator />
        <AmbientBackground />
        {children}
        <MusicPlayer song={activeSong} />
      </body>
    </html>
  );
}
