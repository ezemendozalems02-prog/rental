import Link from "next/link";
import { nav, site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="road-dash absolute top-0 right-0 left-0 h-[2px] text-white/10" />
      <div className="container-x pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="text-[22px]" aria-label="GT Rental — Inicio">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              Administramos y gestionamos vehículos destinados al trabajo, y acompañamos a quienes quieren trabajar con aplicaciones de
              movilidad durante el proceso.
            </p>
            <Link href="/postularme" className="btn btn-primary mt-8">
              Quiero ser conductor <ArrowIcon />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-10 lg:col-span-7">
            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Navegación</h2>
              <ul className="mt-4 text-[14px]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="block py-2.5 text-white/75 transition-colors hover:text-gt-orange">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/postularme" className="block py-2.5 text-white/75 transition-colors hover:text-gt-orange">
                    Postularme
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Contacto</h2>
              <ul className="mt-4 text-[14px]">
                <li>
                  <a href={waLink("general")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2.5 text-white/75 hover:text-gt-orange">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2.5 text-white/75 hover:text-gt-orange">
                    <InstagramIcon className="size-4" /> {site.instagram.handle}
                  </a>
                </li>
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="block py-2.5 text-white/75 hover:text-gt-orange">
                      {site.email}
                    </a>
                  </li>
                )}
                {site.hours && <li className="py-2.5 text-white/50">{site.hours}</li>}
              </ul>
            </div>
            <div>
              <h2 className="text-[11px] font-semibold tracking-[0.2em] text-white/40 uppercase">Legal</h2>
              <ul className="mt-4 text-[14px]">
                <li>
                  <Link href="/privacidad" className="block py-2.5 text-white/75 hover:text-gt-orange">Política de privacidad</Link>
                </li>
                <li>
                  <Link href="/terminos" className="block py-2.5 text-white/75 hover:text-gt-orange">Términos y condiciones</Link>
                </li>
                <li>
                  <Link href="/preguntas-frecuentes" className="block py-2.5 text-white/75 hover:text-gt-orange">Centro de ayuda</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="display pointer-events-none mt-20 text-[18vw] leading-[0.8] text-white/[0.04] select-none lg:text-[15vw]">
          GT Rental
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GT Rental.{" "}
            {site.legal ? `${site.legal.razonSocial} · CUIT ${site.legal.cuit}` : "Información legal pendiente de incorporación."}
          </p>
          {site.demo && <p className="text-white/30">Versión de demostración · contenido sujeto a confirmación</p>}
        </div>
      </div>
    </footer>
  );
}
