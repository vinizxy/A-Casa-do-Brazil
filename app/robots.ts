import type { MetadataRoute } from "next";
import { restaurante } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${restaurante.url}/sitemap.xml`,
    host: restaurante.url,
  };
}
