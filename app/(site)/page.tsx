import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { FleetPreview } from "@/components/home/FleetPreview";
import { Hero } from "@/components/home/Hero";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Marquee } from "@/components/home/Marquee";
import { Requirements } from "@/components/home/Requirements";
import { Support } from "@/components/home/Support";
import { ValueProps } from "@/components/home/ValueProps";
import { WorkMode } from "@/components/home/WorkMode";

export const metadata: Metadata = {
  title: { absolute: "GT Rental — Alquiler de autos para trabajar con aplicaciones de movilidad" },
  description:
    "¿Querés trabajar con aplicaciones de movilidad? Postulate en GT Rental para acceder a un vehículo destinado al trabajo. Te acompañamos en todo el proceso.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <ValueProps />
      <HowItWorks />
      <FleetPreview />
      <WorkMode />
      <Requirements />
      <Support />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
