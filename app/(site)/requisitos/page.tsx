import type { Metadata } from "next";
import { FileWarning, ShieldCheck, UserCheck } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { PageHero } from "@/components/PageHero";
import { RequirementsChecklist } from "@/components/RequirementsChecklist";
import { Reveal, RevealTitle } from "@/components/Reveal";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Requisitos para trabajar con un auto alquilado",
  description:
    "Requisitos para postularte como conductor en GT Rental: licencia vigente, mayor de 21 años, antecedentes penales y comprobante de domicilio.",
  alternates: { canonical: "/requisitos" },
};

const notes = [
  {
    icon: UserCheck,
    title: "Condiciones de admisión",
    text: "Cada postulación se evalúa de forma individual. Los requisitos definitivos y cualquier condición adicional los confirma el equipo de GT Rental.",
  },
  {
    icon: ShieldCheck,
    title: "Entrega segura de documentación",
    text: "No te pedimos documentos en la web. Una vez revisados tus datos, te indicamos cómo y por qué canal entregarlos.",
  },
  {
    icon: FileWarning,
    title: "Requisitos de las aplicaciones",
    text: "Cada aplicación de movilidad tiene sus propios requisitos para registrarte como conductor, que son independientes de GT Rental.",
  },
];

export default function RequisitosPage() {
  return (
    <>
      <PageHero
        eyebrow="Requisitos"
        lines={["Lo que necesitás", "para empezar."]}
        accent={1}
        intro="Estos son los requisitos informados inicialmente por GT Rental. Hacé tu autochequeo y, si tenés dudas, consultanos."
        image="/img/volante.jpg"
      />

      <section className="bg-mist py-14 sm:py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gt-blue">Documentación necesaria</p>
            <RevealTitle lines={["Cuatro puntos.", "Nada más", "para arrancar."]} accent={2} className="display mt-6 text-[clamp(2.4rem,5vw,4.2rem)] text-ink" />
            <div className="mt-10 space-y-4">
              {notes.map((n, i) => (
                <Reveal key={n.title} delay={i * 0.08}>
                  <div className="flex gap-4 rounded-2xl bg-white p-5">
                    <n.icon className="mt-0.5 size-5 shrink-0 text-gt-blue" strokeWidth={1.7} />
                    <div>
                      <h3 className="font-semibold text-ink">{n.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-graphite/65">{n.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <RequirementsChecklist />
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-gt-blue">Dudas frecuentes</p>
            <RevealTitle lines={["Sobre los", "requisitos."]} accent={1} className="display mt-6 text-[clamp(2.4rem,5vw,4.2rem)] text-ink" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FAQAccordion items={faqs.filter((f) => f.category === "requisitos" || f.category === "documentacion")} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
