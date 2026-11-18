import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";

type CaseStudyCardProps = {
  href: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  alt: string;
  outlined?: boolean;
};

export function CaseStudyCard({ href, title, description, meta, image, alt, outlined }: CaseStudyCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden transition duration-500 ease-out group-hover:scale-[1.015] group-hover:shadow-xl">
        <Image src={image} alt={alt} width={1600} height={900} className={cn("aspect-video w-full object-cover", outlined && "outlined")} />
      </div>
      <div className="max-w-176 pt-4">
        <p className="subhead underline-offset-4 group-hover:underline">{title}</p>
        <p className="mt-2 meta-label">{meta}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
}