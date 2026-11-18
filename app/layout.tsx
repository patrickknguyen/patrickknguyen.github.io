import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PageTransitions } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "patrick k. nguyen",
  description: "patrick k. nguyen's personal website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior keeps page-to-page navigation from smooth scrolling
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="flex min-h-full flex-col">
        <PageTransitions />
        {children}
      </body>
    </html>
  );
}
