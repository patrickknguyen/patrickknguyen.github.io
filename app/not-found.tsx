import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Page not found" };

// Next's default 404 injects global styles that turn the page black in dark mode
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="px-8 pt-12 pb-16 desktop:px-page desktop:pt-18">
        <div className="desktop:grid desktop:grid-cols-12 desktop:gap-x-gutter">
          <div className="desktop:col-span-3">
            <h1 className="display-title">Page not found</h1>
            <p className="mt-2 meta-label">404</p>
            <p className="mt-8">
              This page does not exist.{" "}
              <Link href="/" className="underline-offset-4 hover:underline">
                Back to the homepage
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
