"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";
import { requirements } from "@/lib/requirements";
import { ArrowIcon } from "../icons";
import { Reveal, RevealTitle } from "../Reveal";

export function Requirements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section className="relative overflow-hidden bg-gt-blue py-24 text-white lg:py-36">
      <div aria-hidden className="road-dash-v absolute top-0 left-[8%] hidden h-full w-[2px] text-white/10 lg:block" />
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-white/70">Requisitos</p>
          <RevealTitle lines={["Lo que", "necesitás para", "empezar."]} accent={2} className="display mt-6 text-[clamp(2.8rem,6.6vw,5.6rem)]" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/75">
              Estos son los requisitos informados inicialmente. El equipo confirma los requisitos definitivos, las condiciones de admisión y
              cualquier documentación adicional.
            </p>
            <div className="mt-8 rounded-2xl bg-white/10 p-5 text-[15px] leading-relaxed backdrop-blur">
              <strong className="font-semibold">¿Es tu primera vez trabajando con aplicaciones de movilidad?</strong> Podés enviarnos tu
              consulta y te orientamos sobre los próximos pasos.
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/postularme" className="btn btn-primary">
                Iniciar postulación <ArrowIcon />
              </Link>
              <Link href="/contacto?motivo=duda" className="btn btn-ghost-light">
                Tengo una duda
              </Link>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="lg:col-span-6 lg:col-start-7">
          <div className="mb-6 flex items-center justify-between text-[12px] font-semibold tracking-[0.16em] text-white/70 uppercase">
            <span>Checklist</span>
            <span>{inView ? "4" : "0"} / 4</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full origin-left rounded-full bg-gt-orange"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>
          <ol className="mt-8 space-y-3">
            {requirements.map((r, i) => (
              <motion.li
                key={r.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-5 rounded-2xl bg-white p-5 text-ink sm:p-6"
              >
                <span className="display w-10 text-[36px] leading-none text-gt-blue/25">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h3 className="text-[16px] font-semibold sm:text-[17px]">{r.title}</h3>
                  <p className="mt-0.5 text-[14px] text-graphite/60">{r.text}</p>
                </div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : undefined}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.6 + i * 0.25 }}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-gt-orange text-ink"
                >
                  <Check className="size-4" strokeWidth={3} />
                </motion.span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
