import type { Metadata } from "next";
import Link from "next/link";
import { Check, Info } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealTitle } from "@/components/Reveal";
import { Steps } from "@/components/Steps";
import { requirements } from "@/lib/requirements";

export const metadata: Metadata = {
  title: "Cómo funciona — De la consulta a la incorporación",
  description:
    "Conocé el recorrido completo para acceder a un vehículo de GT Rental: postulación, documentación, evaluación y coordinación de la entrega.",
  alternates: { canonical: "/como-funciona" },
};

const before = [
  "Tener a mano tus datos de contacto y tu WhatsApp.",
  "Saber en qué zona te gustaría trabajar.",
  "Contar con la documentación informada (te la pedimos más adelante).",
  "Tiempo para responder los mensajes del equipo.",
];

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Cómo funciona"
        lines={["Del primer mensaje", "al volante."]}
        accent={1}
        intro="Un proceso claro, en cuatro etapas. Sabés en todo momento en qué punto está tu solicitud y qué necesitás para avanzar."
      />

      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="container-x">
          <p className="eyebrow text-gt-blue">El recorrido</p>
          <RevealTitle lines={["Paso a paso."]} className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] text-ink" />
          <div className="mt-16">
            <Steps tone="light" detailed />
          </div>
          <Reveal className="mt-16 flex gap-3 rounded-2xl bg-mist p-6 text-[15px] leading-relaxed text-graphite/75">
            <Info className="mt-0.5 size-5 shrink-0 text-gt-orange" />
            Completar el formulario no garantiza la aprobación ni la disponibilidad inmediata de un vehículo. Los plazos dependen de cada
            caso y de la documentación presentada.
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-24 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gt-blue">Antes de empezar</p>
            <RevealTitle lines={["Qué conviene", "tener listo."]} accent={1} className="display mt-6 text-[clamp(2.6rem,5.5vw,4.6rem)] text-ink" />
            <ul className="mt-10 space-y-4">
              {before.map((b) => (
                <li key={b} className="flex gap-4 text-[16px] text-graphite/80">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-gt-blue text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="rounded-[28px] bg-ink p-8 text-white sm:p-10">
            <p className="eyebrow text-white/60">Requisitos previos</p>
            <ol className="mt-8 divide-y divide-white/10">
              {requirements.map((r, i) => (
                <li key={r.title} className="flex gap-5 py-5">
                  <span className="display text-[30px] leading-none text-gt-orange">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    <p className="mt-1 text-[14px] text-white/55">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[13px] text-white/45">Requisitos informados inicialmente, sujetos a confirmación del equipo.</p>
            <Link href="/requisitos" className="btn btn-primary mt-8">
              Ver requisitos completos <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection lines={["¿Arrancamos?", "Postulate hoy."]} />
    </>
  );
}
