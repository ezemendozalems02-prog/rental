import Image from "next/image";
import { FileText, MessagesSquare, Signpost } from "lucide-react";
import { Reveal, RevealTitle } from "../Reveal";

const blocks = [
  {
    icon: Signpost,
    title: "Orientación inicial",
    text: "Desde tu primera consulta te contamos cómo funciona la propuesta y si es para vos.",
  },
  {
    icon: FileText,
    title: "Información clara sobre las condiciones",
    text: "Antes de avanzar, conocés las condiciones del alquiler. Sin letra chica ni sorpresas.",
  },
  {
    icon: MessagesSquare,
    title: "Comunicación durante el proceso",
    text: "Te avisamos en qué etapa está tu solicitud y qué necesitás para seguir.",
  },
];

export function Support() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[420px] lg:min-h-full">
          <Image src="/img/obelisco.jpg" alt="Vista aérea del Obelisco y la avenida 9 de Julio, Buenos Aires" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink" />
          <p className="absolute bottom-6 left-5 font-mono text-[10px] tracking-[0.25em] text-white/60 sm:left-8">BUENOS AIRES · AR</p>
        </div>
        <div className="px-5 py-20 sm:px-8 lg:px-16 lg:py-32 xl:px-24">
          <p className="eyebrow text-white/60">Una experiencia acompañada</p>
          <RevealTitle lines={["No tenés que", "resolver todo", "solo."]} accent={2} className="display mt-6 text-[clamp(2.8rem,6vw,5.2rem)]" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/65">
              Desde la consulta inicial hasta la evaluación de tu solicitud, el equipo de GT Rental te orienta para que sepas siempre en qué
              punto estás.
            </p>
          </Reveal>
          <div className="mt-12 space-y-4">
            {blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="group flex gap-5 rounded-2xl border border-white/10 p-6 transition-colors duration-500 hover:border-gt-orange/50 hover:bg-white/[0.03]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gt-blue text-white transition-colors duration-500 group-hover:bg-gt-orange group-hover:text-ink">
                    <b.icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold">{b.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{b.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
