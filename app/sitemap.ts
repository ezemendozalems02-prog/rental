import type { MetadataRoute } from "next";
import { defaultFleet } from "@/lib/fleet";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/como-funciona", "/requisitos", "/flota", "/postularme", "/preguntas-frecuentes", "/contacto", "/privacidad", "/terminos"];
  const now = new Date();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : p === "/postularme" ? 0.9 : 0.7 })),
    ...defaultFleet.filter((v) => v.active).map((v) => ({ url: `${site.url}/flota/${v.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
