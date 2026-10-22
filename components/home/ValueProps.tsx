import { Compass, KeyRound, Route } from "lucide-react";
import { Reveal, RevealTitle } from "../Reveal";

const items = [
  {
    n: "01",
    icon: KeyRound,
    title: "Una oportunidad para empezar",
    text: "Completás una solicitud simple y empezás el proceso de evaluación para acceder a un vehículo destinado al trabajo.",
  },
  {
    n: "02",
    icon: Compass,
    title: "Acompañamiento durante el proceso",
    text: "Te orientamos y te contamos con claridad qué pasos tenés que seguir para avanzar, sin vueltas.",
  },
  {
    n: "03",
    icon: Route,
    title: "Una modalidad pensada para trabajar",
    text: "Vehículos destinados al trabajo, sujetos a las condiciones y la disponibilidad que confirma GT Rental en cada caso.",
  },
];

export function ValueProps() {
  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow text-gt-blue">Nuestra propuesta</p>
            <RevealTitle
              lines={["No se trata solo de un auto.", "Se trata de lo que", "podés hacer con él."]}
              accent={2}
              className="display mt-6 text-[clamp(2.6rem,6.4vw,5.6rem)] text-ink"
            />
          </div>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="text-[17px] leading-relaxed text-graphite/75">
              En GT Rental administramos y gestionamos vehículos destinados al trabajo, y acompañamos a cada conductor desde la primera
              consulta.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-24">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={i * 0.12}>
              <article className="group relative h-full overflow-hidden rounded-[28px] border border-line bg-mist p-6 transition-[background-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:bg-ink hover:shadow-[0_30px_60px_-30px_rgba(10,13,20,0.6)] lg:p-10">
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white text-gt-blue transition-colors duration-500 group-hover:bg-gt-orange group-hover:text-ink">
                    <it.icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className="display text-[64px] leading-none text-ink/[0.07] transition-colors duration-500 group-hover:text-white/10">{it.n}</span>
                </div>
                <h3 className="display mt-10 text-[30px] sm:mt-16 sm:text-[34px] text-ink transition-colors duration-500 group-hover:text-white">{it.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-graphite/70 transition-colors duration-500 group-hover:text-white/65">{it.text}</p>
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gt-orange transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
