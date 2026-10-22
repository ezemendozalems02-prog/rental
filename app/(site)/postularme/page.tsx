import type { Metadata } from "next";
import Image from "next/image";
import { Clock, FileLock2, MessageCircleMore } from "lucide-react";
import { ApplicationStepper } from "@/components/ApplicationStepper";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Postulate como conductor",
  description: "Completá tu postulación en 3 pasos para acceder a un vehículo de GT Rental destinado al trabajo con aplicaciones de movilidad.",
  alternates: { canonical: "/postularme" },
};

const perks = [
  { icon: Clock, title: "3 pasos, pocos minutos", text: "Desde el celular, sin cargar documentos." },
  { icon: FileLock2, title: "Documentación segura", text: "Te indicamos cómo entregarla después de revisar tus datos." },
  { icon: MessageCircleMore, title: "Te respondemos", text: "El equipo revisa tu solicitud y te orienta sobre los próximos pasos." },
];

export default function PostularmePage() {
  return (
    <section className="bg-mist lg:grid lg:min-h-screen lg:grid-cols-[minmax(380px,0.85fr)_1.15fr]">
      {/* Panel lateral */}
      <aside className="grain relative isolate overflow-hidden bg-ink text-white">
        <Image src="/img/sedan-negro.jpg" alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="-z-20 object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="flex h-full flex-col px-5 pt-28 pb-8 sm:px-8 sm:pb-12 lg:sticky lg:top-0 lg:h-screen lg:px-14 lg:pt-36 lg:pb-14 xl:px-20">
          <p className="eyebrow text-white/70">Postulación online</p>
          <h1 className="display mt-6 text-[clamp(3rem,6vw,5.4rem)]">
            Tu próxima <br />
            oportunidad <br />
            <span className="text-gt-orange">empieza acá.</span>
          </h1>
          <ul className="mt-10 hidden space-y-5 sm:block lg:mt-auto">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 text-gt-orange">
                  <p.icon className="size-5" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-[14px] text-white/55">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href={waLink("duda")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-11 items-center gap-2 text-[14px] text-white/70 hover:text-white">
            <WhatsAppIcon className="size-4 text-[#25d366]" /> ¿Tenés dudas? Escribinos por WhatsApp
          </a>
        </div>
      </aside>

      {/* Formulario */}
      <div className="px-3 py-6 sm:px-8 sm:py-14 lg:px-14 lg:pt-36 lg:pb-20 xl:px-20">
        <div className="mx-auto max-w-2xl rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(10,13,20,0.35)] sm:p-10">
          <ApplicationStepper />
        </div>
      </div>
    </section>
  );
}
