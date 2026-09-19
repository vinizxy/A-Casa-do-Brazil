import type { NextConfig } from "next";

// Site 100% estático: `next build` gera a pasta `out/` com index.html,
// cardapio/index.html, os chunks e todas as imagens — pronta para qualquer
// hospedagem (Vercel por arrastar a pasta, Netlify, servidor comum).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Sem otimizador em runtime: as variantes WebP são pré-geradas
    // (scripts/prepare-images.py) e escolhidas pelo loader abaixo.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1600, 2200],
    imageSizes: [320, 480],
    qualities: [70, 78, 85],
  },
};

export default nextConfig;
