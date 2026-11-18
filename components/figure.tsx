import Image from "next/image";
import { ExternalLink } from "@/components/external-link";
import type { Figure, Media } from "@/lib/types";
import { cn } from "cn";

// Videos play like GIFs: muted, looping and without controls
export function MediaElement({ media, className }: { media: Media; className?: string }) {
  if (media.kind === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        width={media.width}
        height={media.height}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className={cn("w-full bg-border", className)}
      />
    );
  }
  return <Image src={media.src} alt={media.alt} width={media.width} height={media.height} className={cn("w-full", className)} />;
}

export function FigureBlock({ figure, centered = false, className }: { figure: Figure; centered?: boolean; className?: string }) {
  return (
    <figure className={className}>
      <MediaElement media={figure} />
      {figure.caption && (
        <figcaption className={cn("mt-4 text-muted-foreground", centered && "text-center")}>
          {figure.captionHref ? <ExternalLink href={figure.captionHref}>{figure.caption}</ExternalLink> : figure.caption}
        </figcaption>
      )}
    </figure>
  );
}
