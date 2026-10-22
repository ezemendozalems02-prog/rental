"use client";

/**
 * Almacenamiento de DEMOSTRACIÓN en el navegador (localStorage).
 * Reemplaza a la base de datos para mostrar el recorrido completo:
 * postulación → panel administrativo → gestión de flota.
 * En producción, estas funciones se reemplazan por llamadas a la API / Supabase.
 */
import { useSyncExternalStore } from "react";
import type { ApplicationData } from "./application";
import { defaultFleet, type Vehicle } from "./fleet";

export const leadStatuses = [
  "Nuevo",
  "Pendiente de contacto",
  "En evaluación",
  "Documentación pendiente",
  "Aprobado",
  "Sin disponibilidad",
  "No aprobado",
  "Cerrado",
] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const team = ["Sin asignar", "Equipo comercial", "Coordinación", "Administración"];

export type LeadEvent = { at: string; by: string; text: string };
export type Lead = {
  id: string;
  createdAt: string;
  data: Omit<ApplicationData, "company" | "acceptPrivacy">;
  phone: string;
  status: LeadStatus;
  owner: string;
  nextAction: string;
  lastContactAt: string | null;
  notes: LeadEvent[];
  history: LeadEvent[];
  demoSeed?: boolean;
};

const LEADS_KEY = "gt-demo-leads-v1";
const FLEET_KEY = "gt-demo-fleet-v1";

/* ───────── utilidades de store ───────── */
function createStore<T>(key: string, seed: () => T) {
  let cache: T | null = null;
  const listeners = new Set<() => void>();
  const serverValue = seed();

  const read = (): T => {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : seed();
    } catch {
      cache = seed();
    }
    return cache;
  };
  const write = (next: T) => {
    cache = next;
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* cuota excedida o almacenamiento bloqueado: se mantiene en memoria */
    }
    listeners.forEach((l) => l());
  };
  const subscribe = (l: () => void) => {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        cache = null;
        l();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };
  const useValue = () => useSyncExternalStore(subscribe, read, () => serverValue);
  const reset = () => write(seed());
  return { read, write, useValue, reset };
}

/* ───────── leads de ejemplo ───────── */
function seedLeads(): Lead[] {
  const people: [string, string, string, string, LeadStatus, string, string][] = [
    ["Martín", "Gómez", "CABA", "Ciudad Autónoma de Buenos Aires", "Nuevo", "Sí, actualmente", "Buscando empezar"],
    ["Lucía", "Fernández", "Lanús", "Buenos Aires", "Pendiente de contacto", "No, sería mi primera vez", "Buscando empezar"],
    ["Diego", "Sosa", "Quilmes", "Buenos Aires", "En evaluación", "Sí, antes", "Busco cambiar de vehículo"],
    ["Carla", "Benítez", "CABA", "Ciudad Autónoma de Buenos Aires", "Documentación pendiente", "Sí, actualmente", "Ya trabajo con auto propio"],
    ["Javier", "Romero", "Avellaneda", "Buenos Aires", "Aprobado", "Sí, actualmente", "Busco cambiar de vehículo"],
    ["Sofía", "Acosta", "Morón", "Buenos Aires", "Nuevo", "No, sería mi primera vez", "Buscando empezar"],
    ["Nicolás", "Herrera", "La Matanza", "Buenos Aires", "Sin disponibilidad", "Sí, antes", "Buscando empezar"],
    ["Valentina", "Medina", "CABA", "Ciudad Autónoma de Buenos Aires", "En evaluación", "Sí, actualmente", "Ya trabajo con auto propio"],
    ["Pablo", "Ruiz", "Lomas de Zamora", "Buenos Aires", "No aprobado", "No, sería mi primera vez", "Buscando empezar"],
    ["Agustina", "Torres", "Tigre", "Buenos Aires", "Pendiente de contacto", "Sí, antes", "Busco cambiar de vehículo"],
    ["Federico", "Castro", "CABA", "Ciudad Autónoma de Buenos Aires", "Cerrado", "Sí, actualmente", "Ya trabajo con auto propio"],
    ["Camila", "Ortiz", "San Isidro", "Buenos Aires", "Nuevo", "Sí, actualmente", "Buscando empezar"],
    ["Ezequiel", "Vera", "Quilmes", "Buenos Aires", "En evaluación", "No, sería mi primera vez", "Buscando empezar"],
    ["Rocío", "Molina", "Lanús", "Buenos Aires", "Aprobado", "Sí, antes", "Busco cambiar de vehículo"],
  ];
  const now = Date.now();
  return people.map(([firstName, lastName, city, province, status, appExperience, situation], i) => {
    const created = new Date(now - (i * 3.7 + (i % 3)) * 86400000 - i * 3600000).toISOString();
    const phone = `54911${String(40000000 + i * 1234567).slice(0, 8)}`;
    return {
      id: `demo-${i + 1}`,
      createdAt: created,
      data: {
        firstName,
        lastName,
        email: `${firstName}.${lastName}@ejemplo.com`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""),
        whatsapp: phone,
        birthDate: `${1985 + (i % 14)}-0${(i % 9) + 1}-1${i % 9}`,
        city,
        province,
        workZone: i % 2 ? "Zona sur" : "Capital y alrededores",
        hasLicense: "Sí, vigente",
        licenseYears: ["1 a 3 años", "3 a 5 años", "Más de 5 años"][i % 3],
        appExperience,
        apps: [["Uber"], ["DiDi"], ["Uber", "DiDi"], ["Cabify"], ["Todavía no sé"]][i % 5],
        availability: ["Inmediata", "En las próximas 2 semanas", "En un mes o más"][i % 3],
        situation,
      },
      phone,
      status,
      owner: status === "Nuevo" ? "Sin asignar" : team[(i % 3) + 1],
      nextAction: status === "Nuevo" ? "Primer contacto por WhatsApp" : status === "Documentación pendiente" ? "Recibir antecedentes penales" : "",
      lastContactAt: status === "Nuevo" ? null : new Date(new Date(created).getTime() + 86400000).toISOString(),
      notes: [],
      history: [{ at: created, by: "Sistema", text: "Postulación recibida desde la web" }],
      demoSeed: true,
    };
  });
}

const leadsStore = createStore<Lead[]>(LEADS_KEY, seedLeads);
const fleetStore = createStore<Vehicle[]>(FLEET_KEY, () => defaultFleet);

export const useLeads = leadsStore.useValue;
export const useFleet = fleetStore.useValue;

export function addLead(data: ApplicationData, phone: string): Lead {
  const { company: _hp, acceptPrivacy: _ap, ...clean } = data;
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    data: { ...clean, whatsapp: phone },
    phone,
    status: "Nuevo",
    owner: "Sin asignar",
    nextAction: "Primer contacto",
    lastContactAt: null,
    notes: [],
    history: [
      { at: now, by: "Sistema", text: "Postulación recibida desde la web" },
      { at: now, by: "Sistema", text: "Política de privacidad aceptada" },
    ],
  };
  leadsStore.write([lead, ...leadsStore.read()]);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>, event?: string, by = "Admin demo") {
  leadsStore.write(
    leadsStore.read().map((l) =>
      l.id === id
        ? { ...l, ...patch, history: event ? [...l.history, { at: new Date().toISOString(), by, text: event }] : l.history }
        : l,
    ),
  );
}

export function addNote(id: string, text: string, by = "Admin demo") {
  const lead = leadsStore.read().find((l) => l.id === id);
  if (!lead) return;
  const at = new Date().toISOString();
  updateLead(id, { notes: [...lead.notes, { at, by, text }] }, "Agregó una nota interna", by);
}

export function saveVehicle(v: Vehicle, originalSlug?: string) {
  const list = fleetStore.read();
  const exists = list.some((x) => x.slug === (originalSlug ?? v.slug));
  fleetStore.write(exists ? list.map((x) => (x.slug === (originalSlug ?? v.slug) ? v : x)) : [...list, v]);
}

export const resetDemo = () => {
  leadsStore.reset();
  fleetStore.reset();
};

/* ───────── sesión del panel (demo) ───────── */
const SESSION_KEY = "gt-demo-admin-session";
export const DEMO_CREDENTIALS = { email: "demo@ejemplo.com", password: "demo2026" };

export function login(email: string, password: string) {
  const ok = email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
  if (ok) sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email, role: "Administrador", at: Date.now() }));
  return ok;
}
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}
export function getSession(): { email: string; role: string } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
