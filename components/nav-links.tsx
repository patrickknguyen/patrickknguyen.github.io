import { ExternalLink } from "@/components/external-link";
import { links } from "@/lib/links";

const linkClass = "whitespace-nowrap [text-box:cap_alphabetic] hover:underline underline-offset-4";

export function NavLinks() {
  return (
    <>
      {links.map((link) =>
        link.external ? (
          <ExternalLink key={link.label} href={link.href} className={linkClass}>
            {link.label}
          </ExternalLink>
        ) : (
          <a key={link.label} href={link.href} className={linkClass}>
            {link.label}
          </a>
        ),
      )}
    </>
  );
}
