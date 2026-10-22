import Image from "next/image";
import { RevealTitle } from "./Reveal";

/** Encabezado de páginas internas. */
export function PageHero({
  eyebrow,
  lines,
  accent,
  intro,
  image = "/img/ruta.jpg",
  children,
}: {
  eyebrow: string;
  lines: string[];
  accent?: number;
  intro?: string;
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink pt-28 pb-12 text-white sm:pt-44 lg:pb-24">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-35" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="container-x">
        <p className="eyebrow text-white/70">{eyebrow}</p>
        <RevealTitle as="h1" lines={lines} accent={accent} animateOnMount className="display mt-6 text-[clamp(3rem,9vw,7.5rem)]" />
        {intro && <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-white/70 sm:text-lg">{intro}</p>}
        {children}
      </div>
      <div aria-hidden className="road-dash absolute right-0 bottom-0 left-0 h-[2px] text-gt-orange/60" />
    </section>
  );
}
