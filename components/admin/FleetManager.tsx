"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, ImagePlus, Pencil, Plus, Star, Trash2, X } from "lucide-react";
import { saveVehicle, useFleet } from "@/lib/demo-store";
import { availabilityLabel, slugify, vehicleTitle, type Availability, type Vehicle } from "@/lib/fleet";

const blank: Vehicle = {
  slug: "",
  name: "",
  category: "Sedán",
  brand: null,
  model: null,
  year: null,
  transmission: null,
  fuel: null,
  usage: "Destinado al trabajo",
  equipment: [],
  rate: null,
  availability: "consultar",
  active: false,
  featured: false,
  images: [],
  demo: false,
};

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-gt-blue" : "bg-ink/15"}`}
    >
      <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : ""}`} />
    </button>
  );
}

/** Redimensiona la imagen en el navegador para no exceder el almacenamiento de la demo. */
function resizeImage(file: File, max = 1400): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.78));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export function FleetManager() {
  const fleet = useFleet();
  const [editing, setEditing] = useState<{ v: Vehicle; original?: string } | null>(null);

  const patch = (v: Vehicle, p: Partial<Vehicle>) => saveVehicle({ ...v, ...p }, v.slug);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-gt-blue uppercase">Gestión de flota</p>
          <h1 className="display mt-1 text-[38px] text-ink sm:text-[48px]">Flota</h1>
        </div>
        <button onClick={() => setEditing({ v: { ...blank } })} className="btn btn-primary min-h-11">
          <Plus className="size-4" /> Nuevo vehículo
        </button>
      </div>
      <p className="mt-3 max-w-2xl text-[13.5px] text-graphite/55">
        Los cambios se reflejan al instante en la web (inicio, catálogo y fichas). Solo los vehículos activos son públicos. Los vehículos marcados como
        &quot;demo&quot; nunca muestran disponibilidad como real.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {fleet.map((v) => (
          <article key={v.slug} className={`overflow-hidden rounded-2xl border bg-white transition-opacity ${v.active ? "border-line" : "border-dashed border-ink/20 opacity-70"}`}>
            <div className="relative aspect-[16/9] bg-mist">
              {v.images[0] && <Image src={v.images[0]} alt="" fill sizes="400px" unoptimized={v.images[0].startsWith("data:")} className="object-cover" />}
              <div className="absolute top-3 left-3 flex gap-1.5">
                {v.demo && <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-ink uppercase">Demo</span>}
                {!v.active && <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[10.5px] font-bold tracking-wider text-white uppercase">Inactivo</span>}
              </div>
              <button
                onClick={() => patch(v, { featured: !v.featured })}
                aria-label={v.featured ? "Quitar de destacados" : "Destacar en el inicio"}
                aria-pressed={v.featured}
                className={`absolute top-3 right-3 grid size-9 place-items-center rounded-full backdrop-blur transition-colors ${v.featured ? "bg-gt-orange text-ink" : "bg-white/80 text-ink/50 hover:text-ink"}`}
              >
                <Star className="size-4" fill={v.featured ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-gt-blue uppercase">{v.category}</p>
                  <h2 className="mt-0.5 text-[17px] font-semibold text-ink">{vehicleTitle(v)}</h2>
                </div>
                <div className="flex gap-1">
                  {v.active && (
                    <Link href={`/flota/${v.slug}`} target="_blank" aria-label="Ver en la web" className="grid size-9 place-items-center rounded-lg text-graphite/50 hover:bg-mist hover:text-ink">
                      <ExternalLink className="size-4" />
                    </Link>
                  )}
                  <button onClick={() => setEditing({ v: { ...v }, original: v.slug })} aria-label={`Editar ${vehicleTitle(v)}`} className="grid size-9 place-items-center rounded-lg text-graphite/50 hover:bg-mist hover:text-ink">
                    <Pencil className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-3 border-t border-line pt-4 text-[13.5px]">
                <div className="flex items-center justify-between">
                  <span className="text-graphite/70">Publicado</span>
                  <Toggle on={v.active} onChange={(on) => patch(v, { active: on })} label="Publicado" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor={`av-${v.slug}`} className="text-graphite/70">
                    Disponibilidad
                  </label>
                  <select id={`av-${v.slug}`} value={v.availability} onChange={(e) => patch(v, { availability: e.target.value as Availability })} className="rounded-lg border border-line px-2 py-1.5 text-[13px] outline-none focus:border-gt-blue">
                    {Object.entries(availabilityLabel).map(([k, l]) => (
                      <option key={k} value={k}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>{editing && <VehicleForm key={editing.original ?? "new"} initial={editing.v} original={editing.original} onClose={() => setEditing(null)} taken={fleet.map((f) => f.slug)} />}</AnimatePresence>
    </div>
  );
}

function VehicleForm({ initial, original, onClose, taken }: { initial: Vehicle; original?: string; onClose: () => void; taken: string[] }) {
  const [v, setV] = useState<Vehicle>(initial);
  const [equip, setEquip] = useState(initial.equipment.join("\n"));
  const [error, setError] = useState("");
  const set = <K extends keyof Vehicle>(k: K, val: Vehicle[K]) => setV((x) => ({ ...x, [k]: val }));

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const urls = await Promise.all(Array.from(files).slice(0, 6).map((f) => resizeImage(f)));
    set("images", [...v.images, ...urls]);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.name.trim()) return setError("El nombre es obligatorio.");
    const slug = original ?? slugify(v.name);
    if (!original && taken.includes(slug)) return setError("Ya existe un vehículo con ese nombre.");
    saveVehicle({ ...v, slug, equipment: equip.split("\n").map((s) => s.trim()).filter(Boolean) }, original);
    onClose();
  };

  const input = "field py-2.5 text-base sm:text-[14px]";
  const lbl = "mb-1.5 block text-[12.5px] font-semibold text-graphite/70";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.button aria-label="Cerrar" className="absolute inset-0 bg-ink/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.form
        onSubmit={save}
        role="dialog"
        aria-modal="true"
        aria-label={original ? "Editar vehículo" : "Nuevo vehículo"}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="display text-[30px] text-ink">{original ? "Editar ficha" : "Nuevo vehículo"}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid size-9 place-items-center rounded-lg hover:bg-mist">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div>
            <label htmlFor="v-name" className={lbl}>
              Nombre comercial *
            </label>
            <input id="v-name" value={v.name} onChange={(e) => set("name", e.target.value)} className={input} placeholder="Ej: Sedán Ejecutivo" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="v-brand" className={lbl}>Marca</label>
              <input id="v-brand" value={v.brand ?? ""} onChange={(e) => set("brand", e.target.value || null)} className={input} />
            </div>
            <div>
              <label htmlFor="v-model" className={lbl}>Modelo</label>
              <input id="v-model" value={v.model ?? ""} onChange={(e) => set("model", e.target.value || null)} className={input} />
            </div>
            <div>
              <label htmlFor="v-cat" className={lbl}>Categoría</label>
              <select id="v-cat" value={v.category} onChange={(e) => set("category", e.target.value as Vehicle["category"])} className={input}>
                {["Sedán", "Hatchback", "SUV", "Utilitario"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="v-year" className={lbl}>Año</label>
              <input id="v-year" type="number" min={1990} max={2100} value={v.year ?? ""} onChange={(e) => set("year", e.target.value ? Number(e.target.value) : null)} className={input} />
            </div>
            <div>
              <label htmlFor="v-tr" className={lbl}>Transmisión</label>
              <select id="v-tr" value={v.transmission ?? ""} onChange={(e) => set("transmission", (e.target.value || null) as Vehicle["transmission"])} className={input}>
                <option value="">A confirmar</option>
                <option>Manual</option>
                <option>Automática</option>
              </select>
            </div>
            <div>
              <label htmlFor="v-fuel" className={lbl}>Combustible</label>
              <input id="v-fuel" value={v.fuel ?? ""} onChange={(e) => set("fuel", e.target.value || null)} className={input} placeholder="Nafta, GNC…" />
            </div>
          </div>

          <div>
            <p className={lbl}>Tarifa confirmada</p>
            <div className="grid grid-cols-[1fr_140px] gap-3">
              <input
                aria-label="Monto en pesos"
                type="number"
                min={0}
                value={v.rate?.amount ?? ""}
                onChange={(e) => set("rate", e.target.value ? { amount: Number(e.target.value), period: v.rate?.period ?? "semana" } : null)}
                className={input}
                placeholder="Vacío = A consultar"
              />
              <select aria-label="Periodicidad" value={v.rate?.period ?? "semana"} disabled={!v.rate} onChange={(e) => v.rate && set("rate", { ...v.rate, period: e.target.value as "semana" })} className={input}>
                <option value="día">por día</option>
                <option value="semana">por semana</option>
                <option value="mes">por mes</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="v-eq" className={lbl}>Equipamiento (uno por línea)</label>
            <textarea id="v-eq" rows={4} value={equip} onChange={(e) => setEquip(e.target.value)} className={`${input} resize-none`} />
          </div>

          <div>
            <p className={lbl}>Fotografías</p>
            <div className="grid grid-cols-3 gap-3">
              {v.images.map((src, i) => (
                <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                  <Image src={src} alt="" fill sizes="160px" unoptimized={src.startsWith("data:")} className="object-cover" />
                  <button type="button" onClick={() => set("images", v.images.filter((_, j) => j !== i))} aria-label={`Quitar foto ${i + 1}`} className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-white/90 text-red-600 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100">
                    <Trash2 className="size-3.5" />
                  </button>
                  {i === 0 && <span className="absolute bottom-1.5 left-1.5 rounded bg-ink/80 px-1.5 py-0.5 text-[10px] text-white">Portada</span>}
                </div>
              ))}
              <label className="grid aspect-[4/3] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-ink/15 text-graphite/50 transition-colors hover:border-gt-blue hover:text-gt-blue has-[:focus-visible]:border-gt-orange">
                <span className="flex flex-col items-center gap-1 text-[12px]">
                  <ImagePlus className="size-5" /> Cargar
                </span>
                <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
              </label>
            </div>
          </div>

          <div className="space-y-3 rounded-xl bg-mist p-4 text-[14px]">
            {(
              [
                ["active", "Publicado en la web"],
                ["featured", "Destacado en el inicio"],
                ["demo", "Contenido de demostración"],
              ] as const
            ).map(([k, l]) => (
              <div key={k} className="flex items-center justify-between">
                <span>{l}</span>
                <Toggle on={v[k]} onChange={(on) => set(k, on)} label={l} />
              </div>
            ))}
          </div>
          {error && <p role="alert" className="text-[13px] text-red-600">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
          <button type="button" onClick={onClose} className="btn btn-ghost-dark min-h-11">
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary min-h-11">
            Guardar
          </button>
        </div>
      </motion.form>
    </div>
  );
}
