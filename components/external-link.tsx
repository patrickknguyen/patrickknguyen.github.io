import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "cn";

// An icon rather than the ↗ character, which rises above Geist's capitals
export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={cn("hover:underline underline-offset-4", className)}>
      {children}
      <ArrowUpRight aria-hidden strokeWidth={1.5} className="inline-block size-[1em] align-baseline" />
    </a>
  );
}
