import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionValidator from "@/components/SessionValidator";
import AmbientBackground from "@/components/site/AmbientBackground";
import MusicPlayer, { type MusicSong } from "@/components/site/MusicPlayer";
import SkyToneSync from "@/components/site/SkyToneSync";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "A love story website",
};

async function getSongs(): Promise<MusicSong[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("songs")
      .select("id, src, title, artist")
      .order("created_at", { ascending: true });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const songs = await getSongs();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionValidator />
          <AmbientBackground />
          <SkyToneSync />
          {children}
          <MusicPlayer songs={songs} />
        </ThemeProvider>
      </body>
    </html>
  );
}
