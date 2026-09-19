import type { MetadataRoute } from "next";
import { restaurante } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: `${restaurante.url}/`, lastModified: agora, changeFrequency: "monthly", priority: 1 },
    { url: `${restaurante.url}/cardapio/`, lastModified: agora, changeFrequency: "weekly", priority: 0.8 },
  ];
}
