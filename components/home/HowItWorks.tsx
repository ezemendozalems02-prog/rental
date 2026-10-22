import Link from "next/link";
import { Info } from "lucide-react";
import { ArrowIcon } from "../icons";
import { Reveal, RevealTitle } from "../Reveal";
import { Steps } from "../Steps";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="grain relative overflow-hidden bg-ink py-24 text-white lg:py-36">
      <div aria-hidden className="absolute -top-40 -right-40 size-[520px] rounded-full bg-gt-blue/25 blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-white/60">Cómo funciona</p>
            <RevealTitle lines={["Cuatro pasos.", "Un mismo camino."]} accent={1} className="display mt-6 text-[clamp(2.8rem,7vw,6rem)]" />
          </div>
          <Reveal delay={0.15}>
            <Link href="/como-funciona" className="btn btn-ghost-light">
              Ver el recorrido completo <ArrowIcon />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 sm:mt-16 lg:mt-24">
          <Steps />
        </div>

        <Reveal className="mt-16 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mt-24">
          <p className="flex gap-3 text-[14px] leading-relaxed text-white/65">
            <Info className="mt-0.5 size-5 shrink-0 text-gt-orange" />
            Completar el formulario no garantiza la aprobación ni la disponibilidad inmediata de un vehículo.
          </p>
          <Link href="/postularme" className="btn btn-primary shrink-0">
            Empezar mi postulación <ArrowIcon />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
