/** Modelo y validación de la postulación de conductores. */

export type ApplicationData = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  birthDate: string;
  city: string;
  province: string;
  workZone: string;
  hasLicense: string;
  licenseYears: string;
  appExperience: string;
  apps: string[];
  availability: string;
  situation: string;
  acceptPrivacy: boolean;
  /** Honeypot antispam: debe quedar vacío. */
  company: string;
};

export const emptyApplication: ApplicationData = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  birthDate: "",
  city: "",
  province: "",
  workZone: "",
  hasLicense: "",
  licenseYears: "",
  appExperience: "",
  apps: [],
  availability: "",
  situation: "",
  acceptPrivacy: false,
  company: "",
};

export const provinces = [
  "Ciudad Autónoma de Buenos Aires", "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
  "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
  "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
];

export const options = {
  hasLicense: ["Sí, vigente", "Está en trámite / por renovar", "No tengo"],
  licenseYears: ["Menos de 1 año", "1 a 3 años", "3 a 5 años", "Más de 5 años"],
  appExperience: ["Sí, actualmente", "Sí, antes", "No, sería mi primera vez"],
  apps: ["Uber", "DiDi", "Cabify", "Otra", "Todavía no sé"],
  availability: ["Inmediata", "En las próximas 2 semanas", "En un mes o más", "Solo quiero informarme"],
  situation: ["Buscando empezar", "Ya trabajo con auto propio", "Busco cambiar de vehículo"],
};

export const fieldLabels: Record<keyof Omit<ApplicationData, "company" | "acceptPrivacy">, string> = {
  firstName: "Nombre",
  lastName: "Apellido",
  email: "Correo electrónico",
  whatsapp: "WhatsApp",
  birthDate: "Fecha de nacimiento",
  city: "Localidad",
  province: "Provincia",
  workZone: "Zona donde te gustaría trabajar",
  hasLicense: "Licencia de conducir vigente",
  licenseYears: "Antigüedad de la licencia",
  appExperience: "Experiencia con aplicaciones",
  apps: "Aplicaciones",
  availability: "Disponibilidad para comenzar",
  situation: "Situación actual",
};

export type Errors = Partial<Record<keyof ApplicationData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Normaliza un número argentino al formato internacional de WhatsApp (549 + área + número). */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("549")) d = d.slice(3);
  else if (d.startsWith("54")) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  // Quita el "15" local después del código de área (2 a 4 dígitos)
  if (d.length === 12) {
    for (const len of [2, 3, 4]) {
      if (d.slice(len, len + 2) === "15") {
        d = d.slice(0, len) + d.slice(len + 2);
        break;
      }
    }
  }
  if (d.length !== 10) return null;
  return `549${d}`;
}

export function formatPhone(normalized: string) {
  const d = normalized.replace(/^549/, "");
  const area = d.startsWith("11") ? 2 : 3;
  return `+54 9 ${d.slice(0, area)} ${d.slice(area, d.length - 4)}-${d.slice(-4)}`;
}

export function ageFrom(date: string) {
  const b = new Date(date + "T00:00:00");
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age;
}

export function validateStep(step: number, d: ApplicationData): Errors {
  const e: Errors = {};
  const req = (k: keyof ApplicationData, msg = "Completá este campo.") => {
    const v = d[k];
    if (Array.isArray(v) ? v.length === 0 : !String(v).trim()) e[k] = msg;
  };
  if (step === 0) {
    req("firstName", "Ingresá tu nombre.");
    req("lastName", "Ingresá tu apellido.");
    req("email", "Ingresá tu correo electrónico.");
    if (d.email && !EMAIL_RE.test(d.email.trim())) e.email = "Revisá el formato del correo (ej: nombre@correo.com).";
    req("whatsapp", "Ingresá tu número de WhatsApp.");
    if (d.whatsapp && !normalizePhone(d.whatsapp))
      e.whatsapp = "Ingresá el número con código de área, sin 0 ni 15 (ej: 11 2345-6789).";
    req("birthDate", "Ingresá tu fecha de nacimiento.");
    if (d.birthDate) {
      const age = ageFrom(d.birthDate);
      if (age === null || age > 100 || age < 0) e.birthDate = "Revisá la fecha ingresada.";
      else if (age < 21) e.birthDate = "Según los requisitos informados, tenés que ser mayor de 21 años.";
    }
    req("city", "Ingresá tu localidad.");
    req("province", "Elegí tu provincia.");
    req("workZone", "Contanos en qué zona te gustaría trabajar.");
  }
  if (step === 1) {
    req("hasLicense", "Elegí una opción.");
    if (d.hasLicense !== "No tengo") req("licenseYears", "Elegí una opción.");
    req("appExperience", "Elegí una opción.");
    req("apps", "Elegí al menos una opción.");
    req("availability", "Elegí una opción.");
    req("situation", "Elegí una opción.");
  }
  if (step === 2) {
    if (!d.acceptPrivacy) e.acceptPrivacy = "Necesitamos tu aceptación para poder procesar la solicitud.";
  }
  return e;
}
