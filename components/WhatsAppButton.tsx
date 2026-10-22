"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { waContextForPath, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Botón flotante con mensaje según la página. En formularios se oculta en móvil para no tapar campos. */
export function WhatsAppButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onForm = pathname.startsWith("/postularme") || pathname.startsWith("/contacto");

  return (
    <a
      href={waLink(waContextForPath(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp (se abre en una pestaña nueva)"
      className={`group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 items-center gap-0 rounded-full bg-[#1fae55] p-3 text-white shadow-[0_12px_32px_-8px_rgba(10,13,20,0.45)] sm:p-3.5 transition-all duration-500 hover:gap-2.5 hover:pr-5 sm:right-6 sm:bottom-6 ${
        onForm ? "hidden md:flex" : "flex"
      } ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <WhatsAppIcon className="size-6" />
      <span className="max-w-0 overflow-hidden text-[13px] font-semibold whitespace-nowrap transition-[max-width] duration-500 group-hover:max-w-40">
        Consultanos
      </span>
    </a>
  );
}
