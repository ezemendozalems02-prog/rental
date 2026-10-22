"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ClipboardList, FileCheck2, KeyRound, SearchCheck } from "lucide-react";

export const steps = [
  {
    icon: ClipboardList,
    title: "Completá tus datos",
    text: "Enviás tu solicitud inicial en pocos minutos, desde el celular.",
    detail: "Te pedimos solo datos básicos: contacto, localidad y tu perfil como conductor. No hace falta subir documentos.",
  },
  {
    icon: FileCheck2,
    title: "Presentá la documentación",
    text: "El equipo te informa qué documentos son necesarios y cómo entregarlos.",
    detail: "La entrega se hace por un canal seguro que te indica GT Rental, nunca a través de un formulario público.",
  },
  {
    icon: SearchCheck,
    title: "Evaluamos tu solicitud",
    text: "GT Rental revisa la información y te comunica los siguientes pasos.",
    detail: "Cada postulación se analiza de forma individual. Si falta algo, te lo avisamos.",
  },
  {
    icon: KeyRound,
    title: "Coordiná la incorporación",
    text: "Si la solicitud es aprobada y hay disponibilidad, coordinamos las condiciones y la entrega.",
    detail: "Antes de la entrega te informamos con claridad las condiciones del alquiler.",
  },
];

/** Línea de tiempo de 4 pasos con progreso animado al hacer scroll. */
export function Steps({ tone = "dark", detailed = false }: { tone?: "dark" | "light"; detailed?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const dark = tone === "dark";

  return (
    <ol ref={ref} className="relative grid gap-12 lg:grid-cols-4 lg:gap-6">
      {/* Línea conectora: vertical en móvil, horizontal en desktop */}
      <div aria-hidden className={`absolute top-0 bottom-0 left-[27px] w-[2px] lg:top-[27px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-[2px] lg:w-full ${dark ? "bg-white/10" : "bg-ink/10"}`}>
        <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gt-orange lg:hidden" />
        <motion.div style={{ scaleX: progress }} className="hidden h-full w-full origin-left bg-gt-orange lg:block" />
      </div>
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid grid-cols-[56px_1fr] gap-5 lg:block"
        >
          <span
            className={`relative z-10 grid size-14 place-items-center rounded-full border-2 ${
              dark ? "border-white/15 bg-ink text-white" : "border-ink/10 bg-white text-gt-blue"
            }`}
          >
            <s.icon className="size-5" strokeWidth={1.7} />
            <span className="absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full bg-gt-orange font-mono text-[10px] font-bold text-ink">
              {i + 1}
            </span>
          </span>
          <div className="lg:mt-8 lg:pr-6">
            <p className={`font-mono text-[11px] tracking-[0.2em] ${dark ? "text-white/40" : "text-ink/40"}`}>PASO {String(i + 1).padStart(2, "0")}</p>
            <h3 className={`display mt-2 text-[30px] ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-white/60" : "text-graphite/70"}`}>{s.text}</p>
            {detailed && <p className={`mt-3 text-[14px] leading-relaxed ${dark ? "text-white/45" : "text-graphite/55"}`}>{s.detail}</p>}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
