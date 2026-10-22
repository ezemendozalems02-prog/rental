import Image from "next/image";
import Link from "next/link";
import { waLink } from "@/lib/whatsapp";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import { Reveal, RevealTitle } from "./Reveal";

export function CTASection({
  lines = ["El próximo paso", "lo das vos."],
  text = "Contanos un poco sobre vos y tu interés en trabajar con GT Rental. Nuestro equipo podrá revisar tu solicitud y orientarte sobre los próximos pasos.",
}: {
  lines?: string[];
  text?: string;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-gt-deep text-white">
      <Image src="/img/silueta.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-right opacity-60 mix-blend-luminosity" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-gt-deep via-gt-deep/90 to-gt-deep/20" />
      <div aria-hidden className="absolute top-0 left-0 h-full w-1.5 bg-gt-orange" />
      <div className="container-x py-16 sm:py-24 lg:py-36">
        <div className="max-w-3xl">
          <p className="eyebrow text-white/70">Postulación online · sin costo</p>
          <RevealTitle lines={lines} accent={1} className="display mt-6 text-[clamp(3.2rem,9vw,8rem)]" />
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-white/75">{text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/postularme" className="btn btn-primary">
                Quiero postularme <ArrowIcon />
              </Link>
              <a href={waLink("general")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                <WhatsAppIcon className="size-4" /> Consultar por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
