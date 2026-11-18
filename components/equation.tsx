import katex from "katex";
import "katex/dist/katex.min.css";

// Rendered on the server, so the page ships no math script
export function Equation({ tex, caption }: { tex: string; caption: string }) {
  const html = katex.renderToString(tex, { displayMode: true, throwOnError: false });
  return (
    <figure className="mt-8">
      <div
        className="overflow-x-auto pl-8 text-[0.9rem] [&_.katex-display]:m-0 [&_.katex-display>.katex]:text-left"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <figcaption className="mt-4 text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
