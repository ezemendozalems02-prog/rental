"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Páginas que no empiezan con un hero oscuro usan el header sólido desde el inicio.
  const lightTop = ["/postularme", "/privacidad", "/terminos"].some((p) => pathname.startsWith(p));
  const solid = scrolled || open || lightTop;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        // Con el menú abierto no se usa backdrop-filter: crearía un contenedor para el panel fixed.
        open
          ? "border-b border-transparent bg-ink"
          : solid
            ? "border-b border-white/[0.06] bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink">
        Saltar al contenido
      </a>
      <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-[72px] lg:h-20"}`}>
        <Link href="/" className="relative z-10 text-[19px]" aria-label="GT Rental — Inicio">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group relative px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive(item.href) ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left bg-gt-orange transition-transform duration-500 ease-out-expo ${
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <Link href="/postularme" className="btn btn-primary hidden min-h-11 px-5 text-[12px] sm:inline-flex">
            Quiero ser conductor
            <ArrowIcon />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 xl:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-[5px] h-[2px] bg-current transition-all duration-300 ${open ? "w-0 opacity-0" : "w-3.5"}`} />
              <span className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-0 flex h-dvh flex-col bg-ink pt-24 xl:hidden"
          >
            <div aria-hidden className="road-dash pointer-events-none absolute top-[88px] right-0 left-0 h-[2px] text-white/10" />
            <nav aria-label="Menú móvil" className="container-x flex-1 overflow-y-auto">
              <ul className="space-y-1 pt-6">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="w-6 shrink-0 font-mono text-[11px] text-gt-orange">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`display text-[44px] sm:text-[56px] ${isActive(item.href) ? "text-white" : "text-white/55 group-hover:text-white"} transition-colors`}>
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="container-x space-y-4 border-t border-white/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <Link href="/postularme" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Quiero ser conductor <ArrowIcon />
              </Link>
              <div className="flex gap-3">
                <a href={waLink("general")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light flex-1">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light flex-1">
                  <InstagramIcon className="size-4" /> Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
