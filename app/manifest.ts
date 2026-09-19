import type { MetadataRoute } from "next";
import { restaurante } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${restaurante.nome} — ${restaurante.assinatura}`,
    short_name: restaurante.nome,
    description: restaurante.descricao,
    start_url: "/",
    display: "browser",
    background_color: "#EBEFE3",
    theme_color: "#454B30",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
