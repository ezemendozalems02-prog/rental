import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FleetCatalog } from "@/components/FleetCatalog";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Nuestra flota — Autos para conductores de aplicaciones",
  description: "Conocé los vehículos destinados al trabajo que administra GT Rental y consultá su disponibilidad.",
  alternates: { canonical: "/flota" },
};

export default function FlotaPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestra flota"
        lines={["Elegí con qué", "vas a trabajar."]}
        accent={1}
        intro="Vehículos destinados al trabajo. Consultá condiciones y disponibilidad: te respondemos con información actualizada."
        image="/img/sedan-negro.jpg"
      />
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="container-x">
          <FleetCatalog />
        </div>
      </section>
      <CTASection lines={["¿Te interesa", "alguno?"]} text="Postulate y el equipo te informa qué vehículos están disponibles y bajo qué condiciones." />
    </>
  );
}
