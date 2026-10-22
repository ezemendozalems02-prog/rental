import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // En modo demo no se indexa el sitio.
    rules: site.demo ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: ["/admin"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
