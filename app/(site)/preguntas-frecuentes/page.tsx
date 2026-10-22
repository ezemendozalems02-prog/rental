import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FaqCenter } from "@/components/FaqCenter";
import { PageHero } from "@/components/PageHero";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — Centro de ayuda",
  description: "Requisitos, documentación, pagos, vehículos, aplicaciones y proceso de incorporación: resolvé tus dudas sobre GT Rental.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Centro de ayuda"
        lines={["Preguntas", "frecuentes."]}
        accent={1}
        intro="Respuestas transparentes. Cuando algo depende de cada caso, te lo decimos y te ofrecemos un canal para consultarlo."
        image="/img/ciudad.jpg"
      />
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="container-x">
          <FaqCenter />
        </div>
      </section>
      <CTASection lines={["¿No encontraste", "tu respuesta?"]} text="Escribinos por WhatsApp o dejanos tu postulación y el equipo te orienta." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
