import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionValidator from "@/components/SessionValidator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Our Story",
  description: "A love story website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SessionValidator />
        {children}
      </body>
    </html>
  );
}
