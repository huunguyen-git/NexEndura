import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nexendura.com'),
  title: {
    default: "NexEndura — Engineering Human Potential | Premium Sports Equipment",
    template: "%s | NexEndura",
  },
  description: "Next-generation sports equipment, performance matchwear, carbon footwear, and interactive custom team kit builder.",
  keywords: [
    "sports equipment",
    "performance gear",
    "custom kit builder",
    "football boots",
    "running shoes",
    "tennis",
    "basketball",
    "gym fitness",
  ],
  authors: [{ name: "NexEndura Labs" }],
  creator: "NexEndura",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexendura.com",
    siteName: "NexEndura",
    title: "NexEndura — Engineering Human Potential",
    description: "Next-generation sports equipment, performance matchwear, carbon footwear, and custom kit builder.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "NexEndura Sports Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexEndura — Engineering Human Potential",
    description: "Next-generation sports equipment, performance matchwear, and custom team kit builder.",
    images: ["https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"],
    creator: "@nexendura",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import TopBar from "@/components/layout/TopBar";
import MainNav from "@/components/layout/MainNav";
import Footer from "@/components/layout/Footer";
import SearchModal from "@/components/layout/SearchModal";

import { createClient } from '@/lib/supabase/server';

export default async function RootLayout({ children }: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-app text-foreground">
        <TopBar />
        <MainNav user={user} />
        <SearchModal />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
