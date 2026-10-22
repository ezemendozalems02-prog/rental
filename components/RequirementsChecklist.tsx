"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { requirements } from "@/lib/requirements";
import { waLink } from "@/lib/whatsapp";
import { ArrowIcon, WhatsAppIcon } from "./icons";

/** Autoevaluación del lado del cliente. No implica aprobación. */
export function RequirementsChecklist() {
  const [checked, setChecked] = useState<boolean[]>(requirements.map(() => false));
  const count = checked.filter(Boolean).length;
  const done = count === requirements.length;

  return (
    <div className="rounded-[32px] border border-line bg-white p-6 shadow-[0_40px_80px_-50px_rgba(21,56,121,0.35)] sm:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-gt-blue uppercase">Autochequeo</p>
          <h2 className="display mt-2 text-[34px] text-ink sm:text-[40px]">¿Tenés todo?</h2>
        </div>
        <p className="display text-[44px] leading-none text-ink" aria-live="polite">
          {count}
          <span className="text-ink/25">/{requirements.length}</span>
        </p>
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-mist" role="progressbar" aria-valuemin={0} aria-valuemax={requirements.length} aria-valuenow={count} aria-label="Requisitos marcados">
        <motion.div className="h-full rounded-full bg-gt-orange" animate={{ width: `${(count / requirements.length) * 100}%` }} transition={{ type: "spring", stiffness: 140, damping: 22 }} />
      </div>

      <ul className="mt-8 space-y-3">
        {requirements.map((r, i) => (
          <li key={r.title}>
            <label
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
                checked[i] ? "border-gt-blue bg-gt-blue/[0.04]" : "border-line hover:border-ink/25"
              }`}
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={checked[i]}
                onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              />
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-lg border-2 transition-all peer-focus-visible:ring-4 peer-focus-visible:ring-gt-orange/40 ${
                  checked[i] ? "border-gt-blue bg-gt-blue text-white" : "border-ink/20"
                }`}
              >
                {checked[i] && <Check className="size-4" strokeWidth={3} />}
              </span>
              <span>
                <span className="block text-[16px] font-semibold text-ink">{r.title}</span>
                <span className="block text-[14px] text-graphite/60">{r.text}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        <motion.div
          key={done ? "done" : "pending"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={`mt-8 rounded-2xl p-5 text-[15px] leading-relaxed ${done ? "bg-ink text-white" : "bg-mist text-graphite/75"}`}
        >
          {done ? (
            <>
              <p className="font-semibold">¡Bien! Podés iniciar tu postulación.</p>
              <p className="mt-1 text-white/60">Este chequeo es orientativo y no implica aprobación. El equipo revisa cada solicitud.</p>
              <Link href="/postularme" className="btn btn-primary mt-5">
                Iniciar postulación <ArrowIcon />
              </Link>
            </>
          ) : (
            <>
              <p>Marcá los requisitos que ya cumplís. Si te falta alguno o tenés dudas, consultanos y te orientamos.</p>
              <a href={waLink("requisitos")} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-gt-blue hover:underline">
                <WhatsAppIcon className="size-4" /> Consultar por WhatsApp
              </a>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
