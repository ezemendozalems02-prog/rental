import type { Metadata } from "next";
import { VehicleDetail } from "@/components/VehicleDetail";
import { defaultFleet, vehicleTitle } from "@/lib/fleet";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return defaultFleet.filter((v) => v.active).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = defaultFleet.find((x) => x.slug === slug);
  const title = v ? vehicleTitle(v) : "Vehículo";
  return {
    title: `${title} — Flota`,
    description: v
      ? `${title}: ${v.category.toLowerCase()} destinado al trabajo. Consultá condiciones y disponibilidad en GT Rental.`
      : "Ficha de vehículo de GT Rental.",
    alternates: { canonical: `/flota/${slug}` },
    openGraph: v ? { images: [{ url: v.images[0] }] } : undefined,
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  return <VehicleDetail slug={slug} />;
}
