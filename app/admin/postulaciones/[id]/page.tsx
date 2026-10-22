import { LeadDetail } from "@/components/admin/LeadDetail";

export const metadata = { title: "Ficha de postulación" };

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LeadDetail id={id} />;
}
