import Image from "next/image";
import Link from "next/link";
import { Fuel, Settings2, Users } from "lucide-react";
import { availabilityLabel, formatRate, vehicleTitle, type Vehicle } from "@/lib/fleet";
import { ArrowIcon } from "./icons";

export function AvailabilityBadge({ v }: { v: Vehicle }) {
  // En modo demo nunca se muestra disponibilidad como real.
  if (v.demo)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-semibold tracking-[0.12em] text-ink uppercase backdrop-blur">
        <span className="size-1.5 rounded-full bg-gt-orange" /> Ejemplo · Demo
      </span>
    );
  const color = v.availability === "disponible" ? "bg-emerald-500" : v.availability === "consultar" ? "bg-gt-orange" : "bg-ink/30";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-semibold tracking-[0.12em] text-ink uppercase backdrop-blur">
      <span className={`size-1.5 rounded-full ${color}`} /> {availabilityLabel[v.availability]}
    </span>
  );
}

export function VehicleCard({ v, index = 0, priority = false }: { v: Vehicle; index?: number; priority?: boolean }) {
  const rate = formatRate(v);
  const img = v.images[0] ?? "/img/silueta.jpg";
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(21,56,121,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={img}
          alt={`${vehicleTitle(v)} — fotografía ${v.demo ? "ilustrativa" : "del vehículo"}`}
          fill
          priority={priority}
          unoptimized={img.startsWith("data:")}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <AvailabilityBadge v={v} />
        </div>
        <span aria-hidden className="display absolute right-5 bottom-3 text-[56px] leading-none text-white/80">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-gt-blue uppercase">
          {v.category}
          {v.year ? ` · ${v.year}` : ""}
        </p>
        <h3 className="display mt-2 text-[34px] text-ink">
          <Link href={`/flota/${v.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {vehicleTitle(v)}
          </Link>
        </h3>
        {v.demo && <p className="mt-1 text-[12.5px] text-graphite/50">Marca y modelo a confirmar</p>}

        <dl className="mt-6 flex flex-wrap gap-x-4 gap-y-2.5 border-y border-line py-4 text-[12.5px]">
          <div>
            <dt className="sr-only">Transmisión</dt>
            <dd className="flex items-center gap-1.5 whitespace-nowrap text-graphite/80">
              <Settings2 className="size-4 text-gt-blue" strokeWidth={1.7} /> {v.transmission ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Combustible</dt>
            <dd className="flex items-center gap-1.5 whitespace-nowrap text-graphite/80">
              <Fuel className="size-4 text-gt-blue" strokeWidth={1.7} /> {v.fuel ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="sr-only">Modalidad</dt>
            <dd className="flex items-center gap-1.5 whitespace-nowrap text-graphite/80">
              <Users className="size-4 text-gt-blue" strokeWidth={1.7} /> Trabajo
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-[11px] tracking-[0.14em] text-graphite/50 uppercase">Tarifa</p>
            <p className="text-[15px] font-semibold text-ink">{rate ?? "A consultar"}</p>
          </div>
          <span className="mt-5 flex items-center justify-between rounded-full bg-mist py-1.5 pr-1.5 pl-5 text-[12px] font-semibold tracking-[0.1em] text-ink uppercase transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
            Consultar disponibilidad
            <span className="grid size-9 place-items-center rounded-full bg-gt-orange text-ink transition-transform duration-500 group-hover:translate-x-0.5">
              <ArrowIcon className="size-3.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
