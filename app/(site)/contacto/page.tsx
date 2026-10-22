import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Comunicate con GT Rental por WhatsApp, Instagram o con el formulario de contacto.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  const channels = [
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Escribinos y te respondemos", href: waLink("general"), external: true },
    { icon: InstagramIcon, label: "Instagram", value: site.instagram.handle, href: site.instagram.url, external: true },
    ...(site.email ? [{ icon: Mail, label: "Correo", value: site.email, href: `mailto:${site.email}`, external: false }] : []),
    ...(site.address ? [{ icon: MapPin, label: "Dirección", value: site.address, href: undefined, external: false }] : []),
  ];

  return (
    <>
      <PageHero eyebrow="Contacto" lines={["Hablemos."]} intro="¿Tenés una duda antes de postularte? Escribinos por el canal que te quede más cómodo." image="/img/obelisco.jpg" />
      <section className="bg-mist py-12 sm:py-16 lg:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-4">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-white transition-colors group-hover:bg-gt-orange group-hover:text-ink">
                    <c.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[12px] font-semibold tracking-[0.14em] text-graphite/50 uppercase">{c.label}</span>
                    <span className="mt-0.5 block font-semibold text-ink">{c.value}</span>
                  </span>
                </>
              );
              return c.href ? (
                <a key={c.label} href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-2xl bg-white p-5 transition-shadow hover:shadow-[0_20px_40px_-25px_rgba(10,13,20,0.35)]">
                  {inner}
                </a>
              ) : (
                <div key={c.label} className="flex items-center gap-4 rounded-2xl bg-white p-5">
                  {inner}
                </div>
              );
            })}
            {(!site.email || !site.address || !site.hours) && (
              <p className="px-1 pt-2 text-[12.5px] leading-relaxed text-graphite/45">
                Correo, dirección y horarios de atención se publicarán cuando GT Rental los confirme.
              </p>
            )}
          </div>
          <div className="rounded-[28px] bg-white p-6 sm:p-10 lg:col-span-8">
            <h2 className="display text-[40px] text-ink sm:text-[48px]">Dejanos tu consulta</h2>
            <p className="mt-2 mb-8 text-graphite/60">Te respondemos por el medio que nos indiques.</p>
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
