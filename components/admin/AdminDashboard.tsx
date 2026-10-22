"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, Inbox, PhoneCall, Search, XCircle } from "lucide-react";
import { useLeads } from "@/lib/demo-store";
import { fmtDate, statusStyle } from "./status";

export function AdminDashboard() {
  const leads = useLeads();
  const count = (s: string) => leads.filter((l) => l.status === s).length;

  const kpis = [
    { label: "Total de postulaciones", value: leads.length, icon: Inbox, accent: "bg-ink text-white" },
    { label: "Nuevas", value: count("Nuevo"), icon: Clock, accent: "bg-gt-orange text-ink" },
    { label: "Pendientes de contacto", value: count("Pendiente de contacto"), icon: PhoneCall, accent: "bg-amber-100 text-amber-800" },
    { label: "En evaluación", value: count("En evaluación") + count("Documentación pendiente"), icon: Search, accent: "bg-gt-blue/10 text-gt-blue" },
    { label: "Aprobadas", value: count("Aprobado"), icon: CheckCircle2, accent: "bg-emerald-100 text-emerald-700" },
    { label: "No aprobadas", value: count("No aprobado"), icon: XCircle, accent: "bg-red-100 text-red-700" },
  ];

  // Distribución por localidad
  const byCity = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      acc[l.data.city] = (acc[l.data.city] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);
  const maxCity = Math.max(1, ...byCity.map(([, n]) => n));

  // Evolución semanal (últimas 8 semanas)
  const week = 7 * 86400000;
  const now = Date.now();
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const end = now - (7 - i) * week;
    const start = end - week;
    const n = leads.filter((l) => {
      const t = new Date(l.createdAt).getTime();
      return t > start && t <= end;
    }).length;
    return { label: new Date(end).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" }), n };
  });
  const maxWeek = Math.max(1, ...weeks.map((w) => w.n));

  const recent = [...leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-gt-blue uppercase">Resumen</p>
          <h1 className="display mt-1 text-[38px] text-ink sm:text-[48px]">Dashboard</h1>
        </div>
        <Link href="/admin/postulaciones" className="btn btn-blue min-h-11">
          Ver postulaciones <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-line bg-white p-5">
            <span className={`grid size-9 place-items-center rounded-lg ${k.accent}`}>
              <k.icon className="size-4" strokeWidth={2} />
            </span>
            <p className="display mt-5 text-[44px] leading-none text-ink">{k.value}</p>
            <p className="mt-2 text-[12.5px] text-graphite/60">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-line bg-white p-6 lg:col-span-3">
          <h2 className="font-semibold text-ink">Postulaciones por semana</h2>
          <p className="text-[12.5px] text-graphite/50">Últimas 8 semanas</p>
          <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4" role="img" aria-label={`Postulaciones por semana: ${weeks.map((w) => `${w.label}: ${w.n}`).join(", ")}`}>
            {weeks.map((w, i) => (
              <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[12px] font-semibold text-ink opacity-0 transition-opacity group-hover:opacity-100">{w.n}</span>
                <div
                  className={`w-full rounded-t-lg transition-all duration-700 ${i === weeks.length - 1 ? "bg-gt-orange" : "bg-gt-blue/80 group-hover:bg-gt-blue"}`}
                  style={{ height: `${Math.max(4, (w.n / maxWeek) * 100)}%` }}
                />
                <span className="text-[10.5px] text-graphite/45">{w.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
          <h2 className="font-semibold text-ink">Distribución por localidad</h2>
          <p className="text-[12.5px] text-graphite/50">Top {byCity.length}</p>
          <ul className="mt-6 space-y-4">
            {byCity.map(([city, n]) => (
              <li key={city}>
                <div className="flex justify-between text-[13px]">
                  <span className="text-graphite">{city}</span>
                  <span className="font-semibold text-ink">{n}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mist">
                  <div className="h-full rounded-full bg-gt-blue" style={{ width: `${(n / maxCity) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="font-semibold text-ink">Últimas postulaciones</h2>
          <Link href="/admin/postulaciones" className="text-[13px] font-semibold text-gt-blue hover:underline">
            Ver todas
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {recent.map((l) => (
            <li key={l.id}>
              <Link href={`/admin/postulaciones/${l.id}`} className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-mist">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">
                  {l.data.firstName[0]}
                  {l.data.lastName[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-ink">
                    {l.data.firstName} {l.data.lastName}
                  </p>
                  <p className="truncate text-[12.5px] text-graphite/55">
                    {l.data.city} · {fmtDate(l.createdAt)}
                  </p>
                </div>
                <span className={`hidden rounded-full px-2.5 py-1 text-[11.5px] font-semibold sm:inline ${statusStyle[l.status]}`}>{l.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
