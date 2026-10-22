"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Search } from "lucide-react";
import { leadStatuses, team, updateLead, useLeads, type Lead, type LeadStatus } from "@/lib/demo-store";
import { formatPhone } from "@/lib/application";
import { WhatsAppIcon } from "../icons";
import { fmtDate, statusStyle } from "./status";

type SortKey = "createdAt" | "name" | "city" | "status";

export function LeadsTable() {
  const leads = useLeads();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [owner, setOwner] = useState("");
  const [exp, setExp] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "createdAt", dir: -1 });

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    const val = (l: Lead, k: SortKey) =>
      k === "createdAt" ? l.createdAt : k === "name" ? `${l.data.lastName} ${l.data.firstName}` : k === "city" ? l.data.city : leadStatuses.indexOf(l.status);
    return leads
      .filter((l) => !status || l.status === status)
      .filter((l) => !owner || l.owner === owner)
      .filter((l) => !exp || l.data.appExperience === exp)
      .filter(
        (l) =>
          !term ||
          [l.data.firstName, l.data.lastName, l.data.email, l.data.city, l.phone].some((v) => v.toLowerCase().includes(term)),
      )
      .sort((a, b) => {
        const x = val(a, sort.key);
        const y = val(b, sort.key);
        return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
      });
  }, [leads, q, status, owner, exp, sort]);

  const th = (key: SortKey, label: string) => (
    <th scope="col" className="px-4 py-3 font-semibold" aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      <button
        className="inline-flex items-center gap-1 hover:text-ink"
        onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : 1 }))}
      >
        {label}
        {sort.key === key && (sort.dir === 1 ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />)}
      </button>
    </th>
  );

  const exportCsv = () => {
    const header = ["Fecha", "Nombre", "Apellido", "Email", "WhatsApp", "Localidad", "Provincia", "Experiencia", "Estado", "Responsable", "Próxima acción"];
    const lines = rows.map((l) =>
      [fmtDate(l.createdAt), l.data.firstName, l.data.lastName, l.data.email, l.phone, l.data.city, l.data.province, l.data.appExperience, l.status, l.owner, l.nextAction]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob(["﻿" + [header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `postulaciones-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const select = "min-h-11 rounded-xl border border-line bg-white px-3 py-2.5 text-base outline-none focus:border-gt-blue sm:text-[13.5px]";

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-gt-blue uppercase">Gestión de leads</p>
          <h1 className="display mt-1 text-[38px] text-ink sm:text-[48px]">Postulaciones</h1>
        </div>
        <button onClick={exportCsv} className="btn btn-ghost-dark min-h-11 bg-white">
          <Download className="size-4" /> Exportar CSV
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-white p-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-graphite/40" />
          <label htmlFor="lead-search" className="sr-only">
            Buscar
          </label>
          <input id="lead-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar postulante…" className="w-full min-h-11 rounded-xl border border-line py-2.5 pr-3 pl-10 text-base outline-none sm:text-[14px] focus:border-gt-blue" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex">
          <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value as LeadStatus | "")} className={select}>
            <option value="">Todos los estados</option>
            {leadStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select aria-label="Filtrar por responsable" value={owner} onChange={(e) => setOwner(e.target.value)} className={select}>
            <option value="">Todos los responsables</option>
            {team.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select aria-label="Filtrar por experiencia" value={exp} onChange={(e) => setExp(e.target.value)} className={select}>
            <option value="">Toda experiencia</option>
            <option>Sí, actualmente</option>
            <option>Sí, antes</option>
            <option>No, sería mi primera vez</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-graphite/50">
        {rows.length} {rows.length === 1 ? "resultado" : "resultados"}
      </p>

      <ul className="mt-3 space-y-3 md:hidden">
        {rows.map((l) => (
          <li key={l.id} className="rounded-2xl border border-line bg-white p-4">
            <Link href={`/admin/postulaciones/${l.id}`} className="block">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">
                    {l.data.firstName} {l.data.lastName}
                  </p>
                  <p className="mt-0.5 text-[12.5px] text-graphite/55">
                    {l.data.city} · {fmtDate(l.createdAt)}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${statusStyle[l.status]}`}>{l.status}</span>
              </div>
              <p className="mt-3 text-[13px] text-graphite/70">{l.data.appExperience}</p>
              {l.nextAction && <p className="mt-1 text-[13px] text-graphite/55">Próx.: {l.nextAction}</p>}
            </Link>
            <div className="mt-3 flex gap-2 border-t border-line pt-3">
              <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noopener noreferrer" className="btn min-h-11 shrink-0 bg-[#1fae55] px-4 text-[11px] text-white">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
              <select
                aria-label={`Estado de ${l.data.firstName} ${l.data.lastName}`}
                value={l.status}
                onChange={(e) => updateLead(l.id, { status: e.target.value as LeadStatus }, `Cambió el estado a "${e.target.value}"`)}
                className="min-h-11 flex-1 rounded-full border border-line bg-white px-3 text-base outline-none"
              >
                {leadStatuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </li>
        ))}
        {rows.length === 0 && <p className="p-10 text-center text-graphite/50">No hay postulaciones con esos filtros.</p>}
      </ul>

      <div className="mt-3 hidden overflow-x-auto rounded-2xl border border-line bg-white md:block">
        <table className="w-full min-w-[1080px] text-left text-[13.5px]">
          <thead className="border-b border-line bg-mist/60 text-[11.5px] tracking-[0.06em] text-graphite/55 uppercase">
            <tr>
              {th("name", "Nombre")}
              {th("createdAt", "Ingreso")}
              <th scope="col" className="px-4 py-3 font-semibold">Contacto</th>
              {th("city", "Localidad")}
              <th scope="col" className="px-4 py-3 font-semibold">Experiencia</th>
              {th("status", "Estado")}
              <th scope="col" className="px-4 py-3 font-semibold">Responsable</th>
              <th scope="col" className="px-4 py-3 font-semibold">Próxima acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((l) => (
              <tr key={l.id} className="cursor-pointer transition-colors hover:bg-mist/70" onClick={() => router.push(`/admin/postulaciones/${l.id}`)}>
                <td className="px-4 py-3.5">
                  <Link href={`/admin/postulaciones/${l.id}`} onClick={(e) => e.stopPropagation()} className="font-semibold text-ink hover:text-gt-blue">
                    {l.data.firstName} {l.data.lastName}
                  </Link>
                  {l.notes.length > 0 && <p className="text-[11.5px] text-graphite/45">{l.notes.length} nota(s)</p>}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap text-graphite/70">{fmtDate(l.createdAt)}</td>
                <td className="px-4 py-3.5">
                  <a href={`https://wa.me/${l.phone}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 whitespace-nowrap text-graphite hover:text-[#1fae55]">
                    <WhatsAppIcon className="size-3.5" /> {formatPhone(l.phone)}
                  </a>
                  <p className="max-w-[200px] truncate text-[12px] text-graphite/45">{l.data.email}</p>
                </td>
                <td className="px-4 py-3.5 text-graphite/80">{l.data.city}</td>
                <td className="px-4 py-3.5 text-graphite/70">{l.data.appExperience}</td>
                <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                  <select
                    aria-label={`Estado de ${l.data.firstName} ${l.data.lastName}`}
                    value={l.status}
                    onChange={(e) => updateLead(l.id, { status: e.target.value as LeadStatus }, `Cambió el estado a "${e.target.value}"`)}
                    className={`cursor-pointer appearance-none rounded-full border-0 px-3 py-1.5 text-[12px] font-semibold outline-none ${statusStyle[l.status]}`}
                  >
                    {leadStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3.5 text-graphite/70">{l.owner}</td>
                <td className="max-w-[200px] truncate px-4 py-3.5 text-graphite/70">{l.nextAction || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-10 text-center text-graphite/50">No hay postulaciones con esos filtros.</p>}
      </div>
    </div>
  );
}
