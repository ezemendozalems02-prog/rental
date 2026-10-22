"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowIcon } from "../icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Si el preloader se está mostrando, la entrada del hero empieza cuando termina.
  const [base, setBase] = useState<number | null>(null);
  useEffect(() => {
    const pre = document.documentElement.dataset.preloaded || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setBase(pre ? 0.05 : 1.05);
  }, []);
  const ready = base !== null;
  const d = (n: number) => (base ?? 0) + n;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay: d(delay), ease },
  });

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white lg:min-h-[100vh]">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={ready ? { scale: 1 } : undefined}
          transition={{ duration: 2.2, delay: d(0), ease }}
        >
          <Image
            src="/img/hero.jpg"
            alt="Sedán oscuro en movimiento sobre una avenida"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_60%]"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />

      {/* Líneas gráficas: carretera y coordenadas */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[22%] right-0 h-px w-[45%] origin-right bg-gradient-to-l from-gt-blue to-transparent"
          initial={{ scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : undefined}
          transition={{ duration: 1.6, delay: d(0.5), ease }}
        />
        <div className="road-dash-v absolute top-0 right-[12%] hidden h-full w-[2px] text-white/[0.08] lg:block" />
        <motion.p
          className="absolute top-[24%] right-[13.5%] hidden font-mono text-[10px] tracking-[0.25em] text-white/45 lg:block"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: d(1.1) }}
        >
          34°36′S · 58°22′O
        </motion.p>
      </div>

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative pt-32 pb-14 sm:pb-20 lg:pb-24">
        <motion.p {...enter(0)} className="eyebrow text-white/80">
          Alquiler de vehículos para trabajar
        </motion.p>

        <h1 className="display mt-6 text-[clamp(3.6rem,13vw,11rem)]">
          <span className="sr-only">Tu próximo paso. Al volante.</span>
          {["Tu próximo paso.", "Al volante."].map((line, i) => (
            <span key={line} aria-hidden className="block overflow-hidden pb-[0.04em]">
              <motion.span
                className="block"
                initial={{ y: "140%" }}
                animate={ready ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, delay: d(0.1 + i * 0.12), ease }}
              >
                {i === 1 ? (
                  <>
                    Al volante<span className="text-gt-orange">.</span>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p {...enter(0.35)} className="max-w-xl text-[17px] leading-relaxed text-white/75 sm:text-lg lg:col-span-6">
            ¿Querés trabajar con aplicaciones de movilidad? En GT Rental te acompañamos para que puedas acceder a un vehículo y avanzar en
            el proceso de incorporación.
          </motion.p>
          <motion.div {...enter(0.45)} className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <Link href="/postularme" className="btn btn-primary">
              Quiero ser conductor <ArrowIcon />
            </Link>
            <Link href="/como-funciona" className="btn btn-ghost-light">
              Conocé cómo funciona
            </Link>
          </motion.div>
        </div>

        <motion.div
          {...enter(0.7)}
          className="mt-14 hidden items-center gap-4 border-t border-white/10 pt-6 text-[11px] font-medium tracking-[0.2em] text-white/50 uppercase sm:flex"
        >
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/30">
            <span className="mt-1.5 h-2 w-[2px] animate-bounce rounded-full bg-gt-orange" />
          </span>
          Deslizá para descubrir
          <span className="ml-auto hidden gap-8 md:flex">
            <span>Movilidad</span>
            <span className="text-gt-orange">·</span>
            <span>Oportunidades</span>
            <span className="text-gt-orange">·</span>
            <span>Confianza</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
