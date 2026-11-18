import Link from "next/link";
import { NavLinks } from "@/components/nav-links";

export function SiteHeader() {
  return (
    <header className="relative z-20 px-8 pt-8 desktop:px-page desktop:pt-page">
      <div className="flex flex-col gap-2 desktop:grid desktop:min-h-6 desktop:grid-cols-12 desktop:gap-x-gutter">
        <Link href="/" className="site-name hover:underline underline-offset-4 desktop:col-span-4">
          patrick k. nguyen
        </Link>
        <nav aria-label="Links" className="flex flex-wrap gap-x-8 gap-y-2 desktop:gap-x-gutter desktop:col-span-4 desktop:col-start-8 desktop:grid desktop:grid-cols-subgrid">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}