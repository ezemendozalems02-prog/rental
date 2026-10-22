"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useFleet } from "@/lib/demo-store";
import { VehicleCard } from "./VehicleCard";

const all = "Todos";

function Chips({ label, values, value, onChange }: { label: string; values: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="scrollbar-none -mx-4 flex min-w-0 items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden className="mr-1 shrink-0 text-[11px] font-semibold tracking-[0.16em] text-graphite/50 uppercase">{label}</span>
      {values.map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
            value === v ? "border-ink bg-ink text-white" : "border-line bg-white text-graphite hover:border-ink/30"
          }`}
        >
          {v}
        </button>
      ))}
    </fieldset>
  );
}

export function FleetCatalog() {
  const fleet = useFleet();
  const active = fleet.filter((v) => v.active);
  const [category, setCategory] = useState(all);
  const [transmission, setTransmission] = useState(all);

  const categories = useMemo(() => [all, ...Array.from(new Set(active.map((v) => v.category)))], [active]);
  const transmissions = useMemo(() => [all, ...Array.from(new Set(active.map((v) => v.transmission).filter(Boolean) as string[]))], [active]);

  const list = active.filter((v) => (category === all || v.category === category) && (transmission === all || v.transmission === transmission));

  return (
    <div>
      <div className="flex flex-col gap-3 overflow-hidden rounded-3xl bg-white p-4 sm:gap-4 sm:p-5 lg:flex-row lg:items-center lg:gap-10">
        <Chips label="Tipo" values={categories} value={category} onChange={setCategory} />
        <Chips label="Caja" values={transmissions} value={transmission} onChange={setTransmission} />
        <p className="text-[13px] text-graphite/50 lg:ml-auto" aria-live="polite">
          {list.length} {list.length === 1 ? "vehículo" : "vehículos"}
        </p>
      </div>

      {active.some((v) => v.demo) && (
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gt-orange/30 bg-gt-orange/10 px-4 py-1.5 text-[12.5px] text-graphite">
          <span className="size-1.5 rounded-full bg-gt-orange" />
          Contenido de demostración. Los modelos, fotos, tarifas y disponibilidad reales los confirma GT Rental.
        </p>
      )}

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((v, i) => (
            <motion.div
              key={v.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <VehicleCard v={v} index={i} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="mt-10 text-center text-graphite/60">No hay vehículos con esos filtros.</p>}
    </div>
  );
}
