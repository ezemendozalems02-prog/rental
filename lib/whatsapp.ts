import { site } from "./site";

export const waMessages = {
  general: "Hola, GT Rental. Quería hacer una consulta sobre cómo trabajar con un vehículo de ustedes.",
  flota: "Hola, GT Rental. Quería consultar por la disponibilidad de vehículos para trabajar con aplicaciones de movilidad.",
  requisitos: "Hola, GT Rental. Quería consultar sobre los requisitos para postularme como conductor.",
  postulacion: "Hola, GT Rental. Ya completé mi solicitud y quería consultar cuáles son los próximos pasos.",
  duda: "Hola, GT Rental. Tengo una duda antes de postularme como conductor.",
} as const;

export type WaContext = keyof typeof waMessages;

/**
 * Genera un enlace wa.me válido. Si el número oficial aún no está
 * configurado, abre WhatsApp con el mensaje listo para elegir el contacto.
 */
export function waLink(context: WaContext | string = "general") {
  const text = context in waMessages ? waMessages[context as WaContext] : context;
  const base = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function waContextForPath(pathname: string): WaContext {
  if (pathname.startsWith("/flota")) return "flota";
  if (pathname.startsWith("/requisitos")) return "requisitos";
  if (pathname.startsWith("/postularme")) return "postulacion";
  return "general";
}
