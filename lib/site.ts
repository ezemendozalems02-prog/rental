/**
 * Configuración central del sitio.
 * Todo dato marcado como `null` está PENDIENTE DE CONFIRMACIÓN por GT Rental
 * y no se muestra públicamente hasta completarse.
 */
export const site = {
  name: "GT Rental",
  tagline: "Movilidad, gestión y oportunidades.",
  description:
    "GT Rental administra y gestiona vehículos destinados al trabajo y acompaña a quienes quieren trabajar con aplicaciones de movilidad durante el proceso de incorporación.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  instagram: {
    handle: "@gt.rentalauto",
    url: "https://www.instagram.com/gt.rentalauto/",
  },
  /** Solo dígitos con código de país. Pendiente de confirmación. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
  /** Pendiente de confirmación. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  address: null as string | null,
  hours: null as string | null,
  legal: null as { razonSocial: string; cuit: string } | null,
  /** Indica que el sitio corre con datos de demostración. */
  demo: true,
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/requisitos", label: "Requisitos" },
  { href: "/flota", label: "Nuestra flota" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/contacto", label: "Contacto" },
];

/** Datos que GT Rental debe confirmar antes de publicar. */
export const pendingData = [
  "Correo comercial",
  "Número oficial de WhatsApp",
  "Dirección y zonas de operación",
  "Modelos reales de la flota",
  "Fotografías oficiales",
  "Tarifas y periodicidad de pago",
  "Condiciones del alquiler",
  "Aplicaciones autorizadas",
  "Coberturas y mantenimiento incluidos",
  "Requisitos definitivos",
  "Horarios de atención",
  "Información legal y fiscal",
  "Política de privacidad aprobada",
];
