import type { LeadStatus } from "@/lib/demo-store";

export const statusStyle: Record<LeadStatus, string> = {
  Nuevo: "bg-gt-orange/15 text-[#b8540f]",
  "Pendiente de contacto": "bg-amber-100 text-amber-800",
  "En evaluación": "bg-gt-blue/10 text-gt-blue",
  "Documentación pendiente": "bg-violet-100 text-violet-700",
  Aprobado: "bg-emerald-100 text-emerald-700",
  "Sin disponibilidad": "bg-slate-200 text-slate-700",
  "No aprobado": "bg-red-100 text-red-700",
  Cerrado: "bg-ink/10 text-ink/60",
};

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });

export const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("es-AR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
