import dims from "@/content/fotos.generated.json";

type Entrada = [number, number, number[]];

// Loader do next/image para site estático: em vez de um servidor otimizar a
// imagem sob demanda, servimos as variantes WebP já geradas por
// scripts/prepare-images.py. Recebe a largura pedida pelo srcset e devolve a
// menor variante que a atende (ou a maior disponível).
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  const key = src.replace(/^\/images\//, "").replace(/\.jpg$/, "");
  const entrada = (dims as unknown as Record<string, Entrada>)[key];
  if (!entrada) return src;
  const larguras = entrada[2];
  const w = larguras.find((l) => l >= width) ?? larguras[larguras.length - 1];
  return `/images/w/${key}-${w}.webp`;
}
