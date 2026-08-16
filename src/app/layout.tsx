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
  title: "NexEndura — Engineering Human Potential",
  description: "Premium, performance-driven sports e-commerce platform.",
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
