"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFleet } from "@/lib/demo-store";
import { ArrowIcon } from "../icons";
import { Reveal, RevealTitle } from "../Reveal";
import { VehicleCard } from "../VehicleCard";

export function FleetPreview() {
  const fleet = useFleet();
  const featured = fleet.filter((v) => v.active && v.featured);
  const list = featured.length ? featured : fleet.filter((v) => v.active).slice(0, 3);
  const isDemo = list.some((v) => v.demo);
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-mist py-16 sm:py-24 lg:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gt-blue">Nuestra flota</p>
            <RevealTitle lines={["Vehículos", "para trabajar."]} accent={1} className="display mt-6 text-[clamp(2.8rem,7vw,6rem)] text-ink" />
          </div>
          <Reveal delay={0.15} className="flex items-center gap-3">
            <button type="button" onClick={() => scroll(-1)} aria-label="Vehículos anteriores" className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Vehículos siguientes" className="grid size-12 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-white">
              <ChevronRight className="size-5" />
            </button>
            <Link href="/flota" className="btn btn-blue ml-2">
              Ver flota <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        {isDemo && (
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gt-orange/30 bg-gt-orange/10 px-4 py-1.5 text-[12.5px] text-graphite">
            <span className="size-1.5 rounded-full bg-gt-orange" />
            Contenido de demostración: modelos, fotos y disponibilidad reales a confirmar por GT Rental.
          </p>
        )}
      </div>

      <div
        ref={track}
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 sm:px-8 lg:mt-16 lg:px-[max(3rem,calc((100vw-1320px)/2+3rem))]"
        role="region"
        aria-label="Carrusel de vehículos"
        tabIndex={0}
      >
        {list.map((v, i) => (
          <Reveal key={v.slug} delay={i * 0.1} className="w-[86%] shrink-0 snap-start sm:w-[48%] lg:w-[31.5%]">
            <VehicleCard v={v} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
