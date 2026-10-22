"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CalendarCheck, Mail, MessageSquarePlus } from "lucide-react";
import { addNote, leadStatuses, team, updateLead, useLeads, type LeadStatus } from "@/lib/demo-store";
import { ageFrom, fieldLabels, formatPhone } from "@/lib/application";
import { WhatsAppIcon } from "../icons";
import { fmtDate, fmtDateTime, statusStyle } from "./status";

export function LeadDetail({ id }: { id: string }) {
  const leads = useLeads();
  const lead = leads.find((l) => l.id === id);
  const [note, setNote] = useState("");
  const [nextAction, setNextAction] = useState<string | null>(null);

  if (!lead)
    return (
      <div className="mx-auto max-w-3xl py-20 text-center">
        <p className="text-graphite/60">No encontramos esta postulación.</p>
        <Link href="/admin/postulaciones" className="btn btn-blue mt-6">
          Volver
        </Link>
      </div>
    );

  const d = lead.data;
  const age = ageFrom(d.birthDate);
  const profile: [string, string][] = [
    [fieldLabels.email, d.email],
    [fieldLabels.whatsapp, formatPhone(lead.phone)],
    [fieldLabels.birthDate, `${d.birthDate.split("-").reverse().join("/")}${age !== null ? ` (${age} años)` : ""}`],
    [fieldLabels.city, `${d.city}, ${d.province}`],
    [fieldLabels.workZone, d.workZone],
    [fieldLabels.hasLicense, d.hasLicense],
    [fieldLabels.licenseYears, d.licenseYears || "—"],
    [fieldLabels.appExperience, d.appExperience],
    [fieldLabels.apps, d.apps.join(", ")],
    [fieldLabels.availability, d.availability],
    [fieldLabels.situation, d.situation],
  ];
  const timeline = [...lead.history, ...lead.notes.map((n) => ({ ...n, text: `📝 ${n.text}`, note: true }))].sort((a, b) => +new Date(b.at) - +new Date(a.at));

  return (
    <div className="mx-auto max-w-6xl">
      <Link href="/admin/postulaciones" className="inline-flex items-center gap-2 text-[13px] text-graphite/60 hover:text-ink">
        <ArrowLeft className="size-4" /> Postulaciones
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-full bg-ink text-[17px] font-bold text-white">
            {d.firstName[0]}
            {d.lastName[0]}
          </span>
          <div>
            <h1 className="display text-[38px] leading-none text-ink">
              {d.firstName} {d.lastName}
            </h1>
            <p className="mt-1.5 text-[13px] text-graphite/55">
              Ingresó el {fmtDate(lead.createdAt)} · <span className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${statusStyle[lead.status]}`}>{lead.status}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/${lead.phone}?text=${encodeURIComponent(`Hola ${d.firstName}, te escribimos de GT Rental por tu postulación.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn min-h-11 bg-[#1fae55] text-white hover:bg-[#1a9a4b]"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <a href={`mailto:${d.email}`} className="btn btn-ghost-dark min-h-11">
            <Mail className="size-4" /> Correo
          </a>
          <button
            onClick={() => updateLead(lead.id, { lastContactAt: new Date().toISOString(), status: lead.status === "Nuevo" ? "Pendiente de contacto" : lead.status }, "Registró un contacto con el interesado")}
            className="btn btn-blue min-h-11"
          >
            <CalendarCheck className="size-4" /> Registrar contacto
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-semibold text-ink">Datos de la postulación</h2>
            <dl className="mt-4 grid gap-x-8 sm:grid-cols-2">
              {profile.map(([k, v]) => (
                <div key={k} className="border-b border-line py-3">
                  <dt className="text-[12px] text-graphite/50">{k}</dt>
                  <dd className="mt-0.5 text-[14.5px] font-medium break-words text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-semibold text-ink">Notas internas e historial</h2>
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!note.trim()) return;
                addNote(lead.id, note.trim());
                setNote("");
              }}
            >
              <label htmlFor="note" className="sr-only">
                Nueva nota
              </label>
              <textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Escribí una nota interna (no visible para el postulante)…" className="field resize-none text-base sm:text-[14px]" />
              <div className="mt-3 flex justify-end">
                <button type="submit" disabled={!note.trim()} className="btn btn-blue min-h-10 px-5 text-[12px]">
                  <MessageSquarePlus className="size-4" /> Agregar nota
                </button>
              </div>
            </form>
            <ol className="mt-6 space-y-0">
              {timeline.map((ev, i) => (
                <li key={i} className="relative flex gap-4 pb-5 last:pb-0">
                  {i < timeline.length - 1 && <span aria-hidden className="absolute top-3 left-[5px] h-full w-px bg-line" />}
                  <span className={`relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 ${"note" in ev ? "border-gt-orange bg-white" : "border-gt-blue bg-gt-blue"}`} />
                  <div>
                    <p className={`text-[14px] ${"note" in ev ? "rounded-xl bg-mist px-3 py-2 text-ink" : "text-graphite"}`}>{ev.text}</p>
                    <p className="mt-1 text-[11.5px] text-graphite/45">
                      {ev.by} · {fmtDateTime(ev.at)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-semibold text-ink">Gestión</h2>
            <label htmlFor="status" className="mt-5 mb-2 block text-[12.5px] font-semibold text-graphite/70">
              Estado
            </label>
            <select id="status" value={lead.status} onChange={(e) => updateLead(lead.id, { status: e.target.value as LeadStatus }, `Cambió el estado a "${e.target.value}"`)} className="field py-3 text-base sm:text-[14px]">
              {leadStatuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <label htmlFor="owner" className="mt-5 mb-2 block text-[12.5px] font-semibold text-graphite/70">
              Responsable comercial
            </label>
            <select id="owner" value={lead.owner} onChange={(e) => updateLead(lead.id, { owner: e.target.value }, `Asignó a "${e.target.value}"`)} className="field py-3 text-base sm:text-[14px]">
              {team.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <label htmlFor="next" className="mt-5 mb-2 block text-[12.5px] font-semibold text-graphite/70">
              Próxima acción
            </label>
            <div className="flex gap-2">
              <input id="next" value={nextAction ?? lead.nextAction} onChange={(e) => setNextAction(e.target.value)} placeholder="Ej: pedir comprobante de domicilio" className="field py-3 text-base sm:text-[14px]" />
              {nextAction !== null && nextAction !== lead.nextAction && (
                <button
                  className="btn btn-blue min-h-0 px-4 text-[11px]"
                  onClick={() => {
                    updateLead(lead.id, { nextAction }, `Actualizó la próxima acción: "${nextAction}"`);
                    setNextAction(null);
                  }}
                >
                  Guardar
                </button>
              )}
            </div>
            <div className="mt-6 rounded-xl bg-mist p-4 text-[13px]">
              <p className="text-graphite/55">Último contacto</p>
              <p className="mt-0.5 font-semibold text-ink">{lead.lastContactAt ? fmtDateTime(lead.lastContactAt) : "Sin contacto registrado"}</p>
            </div>
          </section>
          <p className="px-1 text-[12px] leading-relaxed text-graphite/45">
            Todas las acciones quedan registradas en el historial. En producción, el historial se guarda en la base de datos con el usuario que las realizó.
          </p>
        </aside>
      </div>
    </div>
  );
}
