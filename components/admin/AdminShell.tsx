"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Car, ExternalLink, LayoutDashboard, LogOut, Menu, RotateCcw, Users, X } from "lucide-react";
import { getSession, logout, resetDemo, useLeads } from "@/lib/demo-store";
import { Logo } from "../Logo";
import { AdminLogin } from "./AdminLogin";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/postulaciones", label: "Postulaciones", icon: Users },
  { href: "/admin/flota", label: "Flota", icon: Car },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [session, setSession] = useState<{ email: string; role: string } | null | undefined>(undefined);
  const [nav, setNav] = useState(false);
  const leads = useLeads();
  const newCount = leads.filter((l) => l.status === "Nuevo").length;

  useEffect(() => setSession(getSession()), []);
  useEffect(() => setNav(false), [pathname]);

  if (session === undefined) return <div className="min-h-screen bg-mist" />;
  if (!session) return <AdminLogin onLogin={() => setSession(getSession())} />;

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  const sidebar = (
    <div className="flex h-full flex-col bg-ink p-5 text-white">
      <div className="flex items-center justify-between px-2 pt-1">
        <Link href="/admin" className="text-[17px]">
          <Logo />
        </Link>
        <button className="grid size-11 place-items-center rounded-lg hover:bg-white/10 lg:hidden" onClick={() => setNav(false)} aria-label="Cerrar menú">
          <X className="size-5" />
        </button>
      </div>
      <p className="mt-2 px-2 text-[11px] tracking-[0.18em] text-white/35 uppercase">Panel comercial</p>
      <nav className="mt-10 space-y-1" aria-label="Panel">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
              isActive(l.href) ? "bg-white text-ink" : "text-white/65 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            <l.icon className="size-[18px]" strokeWidth={1.8} />
            {l.label}
            {l.href === "/admin/postulaciones" && newCount > 0 && (
              <span className="ml-auto rounded-full bg-gt-orange px-2 py-0.5 text-[11px] font-bold text-ink">{newCount}</span>
            )}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-white/60 hover:bg-white/[0.06] hover:text-white">
          <ExternalLink className="size-4" /> Ver sitio
        </Link>
        <button
          onClick={() => {
            if (confirm("¿Restablecer los datos de demostración? Se perderán los cambios hechos en este navegador.")) resetDemo();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-white/60 hover:bg-white/[0.06] hover:text-white"
        >
          <RotateCcw className="size-4" /> Restablecer demo
        </button>
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-gt-blue text-[13px] font-bold">AD</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold">{session.email}</p>
            <p className="text-[11.5px] text-white/45">{session.role}</p>
          </div>
          <button
            onClick={() => {
              logout();
              setSession(null);
            }}
            aria-label="Cerrar sesión"
            className="grid size-10 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">{sidebar}</aside>
      {nav && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink/50" onClick={() => setNav(false)} aria-label="Cerrar menú" />
          <div className="relative h-full w-[280px]">{sidebar}</div>
        </div>
      )}
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur sm:px-8">
          <button className="grid size-10 place-items-center rounded-lg border border-line lg:hidden" onClick={() => setNav(true)} aria-label="Abrir menú">
            <Menu className="size-5" />
          </button>
          <span className="inline-flex items-center gap-2 rounded-full bg-gt-orange/10 px-3 py-1 text-[12px] font-semibold text-[#b8540f]">
            <span className="size-1.5 rounded-full bg-gt-orange" /> Modo demostración
          </span>
          <span className="hidden text-[12.5px] text-graphite/50 md:inline">Los datos se guardan solo en este navegador.</span>
        </header>
        <main className="px-4 py-6 sm:px-8 sm:py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
