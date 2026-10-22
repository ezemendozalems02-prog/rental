"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Info } from "lucide-react";
import { useFleet } from "@/lib/demo-store";
import { formatRate, vehicleTitle } from "@/lib/fleet";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import { AvailabilityBadge, VehicleCard } from "./VehicleCard";
import { waLink } from "@/lib/whatsapp";

export function VehicleDetail({ slug }: { slug: string }) {
  const fleet = useFleet();
  const v = fleet.find((x) => x.slug === slug && x.active);
  const [img, setImg] = useState(0);

  if (!v)
    return (
      <section className="bg-ink pt-40 pb-32 text-white">
        <div className="container-x">
          <h1 className="display text-[56px]">Vehículo no encontrado</h1>
          <p className="mt-4 text-white/60">Puede que ya no esté publicado.</p>
          <Link href="/flota" className="btn btn-primary mt-8">
            Ver flota
          </Link>
        </div>
      </section>
    );

  const title = vehicleTitle(v);
  const rate = formatRate(v);
  const images = v.images.length ? v.images : ["/img/silueta.jpg"];
  const specs: [string, string][] = [
    ["Categoría", v.category],
    ["Marca y modelo", v.brand && v.model ? `${v.brand} ${v.model}` : "A confirmar"],
    ["Año", v.year ? String(v.year) : "A confirmar"],
    ["Transmisión", v.transmission ?? "A confirmar"],
    ["Combustible", v.fuel ?? "A confirmar"],
    ["Modalidad de uso", v.usage],
  ];
  const others = fleet.filter((x) => x.active && x.slug !== v.slug).slice(0, 3);
  const message = `Hola, GT Rental. Quería consultar por la disponibilidad del vehículo "${title}" para trabajar con aplicaciones de movilidad.`;

  return (
    <>
      <section className="bg-ink pt-28 pb-16 text-white sm:pt-32 lg:pb-24">
        <div className="container-x">
          <Link href="/flota" className="-ml-2 inline-flex min-h-11 items-center gap-2 px-2 text-[13px] text-white/60 transition-colors hover:text-white">
            <ArrowLeft className="size-4" /> Volver a la flota
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-graphite">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div key={img} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <Image
                      src={images[img]}
                      alt={`${title} — imagen ${img + 1} de ${images.length}${v.demo ? " (ilustrativa)" : ""}`}
                      fill
                      priority
                      unoptimized={images[img].startsWith("data:")}
                      sizes="(min-width: 1024px) 66vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute top-5 left-5">
                  <AvailabilityBadge v={v} />
                </div>
              </div>
              {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                  {images.map((src, i) => (
                    <button
                      key={src + i}
                      type="button"
                      onClick={() => setImg(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                      aria-pressed={img === i}
                      className={`relative aspect-[4/3] overflow-hidden rounded-xl ring-2 transition-all ${img === i ? "ring-gt-orange" : "opacity-55 ring-transparent hover:opacity-100"}`}
                    >
                      <Image src={src} alt="" fill sizes="160px" unoptimized={src.startsWith("data:")} className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-gt-orange uppercase">{v.category}</p>
              <h1 className="display mt-3 text-[clamp(3rem,6vw,4.6rem)]">{title}</h1>
              {v.demo && <p className="mt-2 text-[14px] text-white/50">Ficha de ejemplo · marca y modelo a confirmar</p>}

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase">Tarifa</p>
                <p className="mt-1 text-[22px] font-semibold">{rate ?? "A consultar"}</p>
                {!rate && <p className="mt-1 text-[13px] text-white/50">Te la informamos junto con las condiciones vigentes.</p>}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <WhatsAppIcon className="size-4" /> Consultar disponibilidad
                </a>
                <Link href="/postularme" className="btn btn-ghost-light">
                  Quiero postularme <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display text-[44px] text-ink">Especificaciones</h2>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {specs.map(([k, val]) => (
                <div key={k} className="flex justify-between gap-6 py-4 text-[15px]">
                  <dt className="text-graphite/55">{k}</dt>
                  <dd className={`text-right font-semibold ${val === "A confirmar" ? "text-graphite/40" : "text-ink"}`}>{val}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="display text-[44px] text-ink">Equipamiento</h2>
            <ul className="mt-8 grid gap-3">
              {v.equipment.map((e) => (
                <li key={e} className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3.5 text-[15px] text-graphite">
                  <Check className="size-4 text-gt-blue" strokeWidth={2.6} /> {e}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3 rounded-2xl border border-line p-5 text-[14px] leading-relaxed text-graphite/70">
              <Info className="mt-0.5 size-5 shrink-0 text-gt-orange" />
              Condiciones aplicables: las condiciones del alquiler, coberturas y responsabilidades se informan por escrito antes de la entrega.
              Consultar no implica reserva.
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-mist py-14 sm:py-20 lg:py-28">
          <div className="container-x">
            <h2 className="display text-[44px] text-ink">Otros vehículos</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o, i) => (
                <VehicleCard key={o.slug} v={o} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
