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

// 播放器需要的数据：歌曲列表 + 当前是否已登录。
// 登录态必须由服务端判定（与 middleware 读同一份 cookie 会话）：
// 浏览器端 SDK 的 auth 事件在手机上可能先把本地会话丢掉，会让图标在刷新后消失。
async function getPlayerData(): Promise<{ songs: MusicSong[]; authed: boolean }> {
  try {
    const supabase = await createClient();
    const [{ data: songs }, { data: userData }] = await Promise.all([
      supabase
        .from("songs")
        .select("id, src, title, artist")
        .order("created_at", { ascending: true }),
      supabase.auth.getUser(),
    ]);
    return { songs: songs ?? [], authed: Boolean(userData?.user) };
  } catch {
    return { songs: [], authed: false };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { songs, authed } = await getPlayerData();

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
          <MusicPlayer songs={songs} authed={authed} />
        </ThemeProvider>
      </body>
    </html>
  );
}
