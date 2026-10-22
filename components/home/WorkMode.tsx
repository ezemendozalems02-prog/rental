"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowIcon } from "../icons";
import { Reveal, RevealTitle } from "../Reveal";

const points = [
  ["Cómo se solicita", "Completás la postulación online. Te pedimos datos básicos para conocerte."],
  ["Qué documentación", "Licencia, antecedentes penales y comprobante de domicilio, según los requisitos informados."],
  ["Cómo se evalúa", "El equipo revisa cada postulación de forma individual y te comunica el resultado."],
  ["Condiciones del alquiler", "Te las informamos con claridad, por escrito, antes de cualquier entrega."],
  ["Disponibilidad", "Se consulta según el momento. Si no hay vehículos, tu solicitud queda registrada."],
];

export function WorkMode() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div ref={ref} className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-ink lg:sticky lg:top-28">
            <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
              <Image src="/img/volante.jpg" alt="Conductor con las manos en el volante durante un recorrido" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between text-white">
              <p className="display text-[26px] leading-[0.95]">
                Vos ponés <br />
                las ganas<span className="text-gt-orange">.</span>
              </p>
              <span aria-hidden className="road-dash h-[2px] w-24 text-gt-orange" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:py-6">
          <p className="eyebrow text-gt-blue">Modalidad de trabajo</p>
          <RevealTitle
            lines={["Vos ponés las ganas.", "Conocé cómo", "podemos ayudarte."]}
            accent={0}
            className="display mt-6 text-[clamp(2.5rem,5.4vw,4.6rem)] text-ink"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite/75">
              Si querés trabajar con aplicaciones de movilidad y no tenés vehículo —o querés cambiar el tuyo— podés postularte para acceder
              a uno de los vehículos que administra GT Rental. Así funciona:
            </p>
          </Reveal>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {points.map(([title, text], i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[44px_1fr] gap-4 py-5"
              >
                <span className="font-mono text-[12px] text-gt-orange">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-graphite/65">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <Reveal className="mt-8">
            <p className="text-[13px] leading-relaxed text-graphite/55">
              Los ingresos dependen de cada conductor, de las aplicaciones y de factores externos. GT Rental no garantiza ingresos ni
              rentabilidad.
            </p>
            <Link href="/requisitos" className="btn btn-blue mt-8">
              Conocer los requisitos <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
