"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Media = HTMLImageElement | HTMLVideoElement;
type Item = { kind: "image" | "video"; src: string; alt: string; poster?: string };

// The page image and the enlarged image share this name while they swap, so the browser
// morphs one into the other
const NAME = "lightbox-media";

function toItem(el: Media): Item {
  if (el instanceof HTMLVideoElement) {
    return { kind: "video", src: el.currentSrc || el.src, alt: el.getAttribute("aria-label") ?? "", poster: el.poster };
  }
  return { kind: "image", src: el.currentSrc || el.src, alt: el.alt };
}

function transition(update: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("startViewTransition" in document)) {
    update();
    return null;
  }
  // Keeps the page transition styles in globals.css from applying
  const root = document.documentElement;
  root.dataset.lightbox = "";
  const running = document.startViewTransition(update);
  running.finished.finally(() => delete root.dataset.lightbox);
  return running;
}

export function Lightbox({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const elementsRef = useRef<Media[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  function open(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement || target instanceof HTMLVideoElement)) return;
    const media = Array.from(containerRef.current?.querySelectorAll<Media>("img, video") ?? []);
    elementsRef.current = media;
    target.style.viewTransitionName = NAME;
    transition(() => {
      target.style.viewTransitionName = "";
      flushSync(() => {
        setItems(media.map(toItem));
        setIndex(media.indexOf(target));
      });
      dialogRef.current?.showModal();
    });
  }

  function close() {
    const source = index === null ? null : elementsRef.current[index];
    const running = transition(() => {
      flushSync(() => setIndex(null));
      dialogRef.current?.close();
      if (source) source.style.viewTransitionName = NAME;
    });
    const clear = () => {
      if (source) source.style.viewTransitionName = "";
    };
    if (running) running.finished.finally(clear);
    else clear();
  }

  function go(next: number) {
    if (next < 0 || next >= items.length) return;
    setIndex(next);
  }

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  });

  const item = index === null ? null : items[index];
  const mediaClass = "max-h-[90vh] max-w-full cursor-default bg-background object-contain desktop:max-w-[80%]";
  const arrowClass = "absolute top-1/2 -translate-y-1/2 cursor-pointer p-2 text-6xl leading-none text-white hover:opacity-60";

  return (
    <>
      <div ref={containerRef} onClick={open} className="[&_img]:cursor-zoom-in [&_video]:cursor-zoom-in">
        {children}
      </div>
      <dialog
        ref={dialogRef}
        aria-label="Enlarged image"
        onCancel={(event) => {
          // Escape would otherwise close instantly, skipping the animation
          event.preventDefault();
          close();
        }}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none cursor-zoom-out items-center justify-center bg-black/25 p-4 backdrop-blur-sm backdrop:bg-transparent open:flex desktop:p-16"
      >
        {item?.kind === "video" && (
          <video
            src={item.src}
            poster={item.poster}
            aria-label={item.alt}
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{ viewTransitionName: NAME }}
            className={mediaClass}
          />
        )}
        {item?.kind === "image" && (
          // Reuses the copy the page already loaded instead of fetching another size
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.src} alt={item.alt} style={{ viewTransitionName: NAME }} className={mediaClass} />
        )}
        {index !== null && index > 0 && (
          <button type="button" aria-label="Previous image" onClick={() => go(index - 1)} className={`${arrowClass} left-8`}>
            ‹
          </button>
        )}
        {index !== null && index < items.length - 1 && (
          <button type="button" aria-label="Next image" onClick={() => go(index + 1)} className={`${arrowClass} right-8`}>
            ›
          </button>
        )}
      </dialog>
    </>
  );
}
