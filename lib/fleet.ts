export type Availability = "disponible" | "consultar" | "sin-disponibilidad";

export type Vehicle = {
  slug: string;
  name: string;
  category: "Sedán" | "Hatchback" | "SUV" | "Utilitario";
  brand: string | null;
  model: string | null;
  year: number | null;
  transmission: "Manual" | "Automática" | null;
  fuel: string | null;
  usage: string;
  equipment: string[];
  /** Solo si la tarifa está confirmada por GT Rental. */
  rate: { amount: number; period: "semana" | "mes" | "día" } | null;
  availability: Availability;
  active: boolean;
  featured: boolean;
  images: string[];
  /** true = contenido provisional, no representa inventario real. */
  demo: boolean;
};

export const availabilityLabel: Record<Availability, string> = {
  disponible: "Disponible",
  consultar: "Consultar disponibilidad",
  "sin-disponibilidad": "Sin disponibilidad",
};

/**
 * FLOTA DE DEMOSTRACIÓN.
 * Reemplazar por los vehículos reales de GT Rental (o administrarlos desde /admin/flota).
 */
export const defaultFleet: Vehicle[] = [
  {
    slug: "sedan-ejecutivo",
    name: "Sedán Ejecutivo",
    category: "Sedán",
    brand: null,
    model: null,
    year: null,
    transmission: "Automática",
    fuel: "Nafta",
    usage: "Destinado al trabajo",
    equipment: ["Aire acondicionado", "Baúl amplio", "5 plazas", "Conectividad Bluetooth"],
    rate: null,
    availability: "consultar",
    active: true,
    featured: true,
    images: ["/img/sedan-gris.jpg", "/img/volante.jpg", "/img/ruta.jpg"],
    demo: true,
  },
  {
    slug: "hatchback-urbano",
    name: "Hatchback Urbano",
    category: "Hatchback",
    brand: null,
    model: null,
    year: null,
    transmission: "Manual",
    fuel: "Nafta",
    usage: "Destinado al trabajo",
    equipment: ["Aire acondicionado", "Dirección asistida", "5 plazas", "Ideal para ciudad"],
    rate: null,
    availability: "consultar",
    active: true,
    featured: true,
    images: ["/img/hatch-azul.jpg", "/img/ciudad.jpg", "/img/volante.jpg"],
    demo: true,
  },
  {
    slug: "sedan-compacto",
    name: "Sedán Compacto",
    category: "Sedán",
    brand: null,
    model: null,
    year: null,
    transmission: "Manual",
    fuel: "Nafta / GNC",
    usage: "Destinado al trabajo",
    equipment: ["Aire acondicionado", "Baúl amplio", "5 plazas", "Bajo consumo"],
    rate: null,
    availability: "consultar",
    active: true,
    featured: true,
    images: ["/img/sedan-negro.jpg", "/img/ruta.jpg", "/img/volante.jpg"],
    demo: true,
  },
  {
    slug: "hatchback-plus",
    name: "Hatchback Plus",
    category: "Hatchback",
    brand: null,
    model: null,
    year: null,
    transmission: "Automática",
    fuel: "Nafta",
    usage: "Destinado al trabajo",
    equipment: ["Aire acondicionado", "Pantalla multimedia", "5 plazas", "Cámara de retroceso"],
    rate: null,
    availability: "consultar",
    active: true,
    featured: false,
    images: ["/img/hatch-rojo.jpg", "/img/ciudad.jpg", "/img/volante.jpg"],
    demo: true,
  },
];

export function vehicleTitle(v: Vehicle) {
  if (v.brand && v.model) return `${v.brand} ${v.model}`;
  return v.name;
}

export function formatRate(v: Vehicle) {
  if (!v.rate) return null;
  const amount = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(v.rate.amount);
  return `${amount} / ${v.rate.period}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
