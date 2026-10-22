import Link from "next/link";
import { faqs } from "@/lib/faq";
import { FAQAccordion } from "../FAQAccordion";
import { ArrowIcon } from "../icons";
import { Reveal, RevealTitle } from "../Reveal";

export function HomeFAQ() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-gt-blue">Preguntas frecuentes</p>
          <RevealTitle lines={["Lo que", "más nos", "preguntan."]} accent={2} className="display mt-6 text-[clamp(2.8rem,4.6vw,4.2rem)] text-ink" />
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-graphite/70">
              Respuestas claras. Y si tu caso es distinto, escribinos y lo vemos juntos.
            </p>
            <Link href="/preguntas-frecuentes" className="btn btn-ghost-dark mt-8">
              Centro de ayuda <ArrowIcon />
            </Link>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <FAQAccordion items={faqs.filter((f) => f.home)} />
        </Reveal>
      </div>
    </section>
  );
}
