"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

// Runs internal navigations inside document.startViewTransition so the whole viewport animates.
// React's <ViewTransition> can't do this: it skips the root snapshot the animation needs.
export function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finish = useRef<(() => void) | null>(null);

  // Resolving tells the browser the new page is ready for its snapshot
  useEffect(() => {
    finish.current?.();
    finish.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (!("startViewTransition" in document) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      event.stopPropagation();
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            finish.current = resolve;
            // Unfreezes the page if the route never renders
            setTimeout(resolve, 3000);
            router.push(url.pathname + url.search + url.hash);
          }),
      );
    };
    // Capture runs before Next's <Link> handler
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
