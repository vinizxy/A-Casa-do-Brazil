// ---------------------------------------------------------------------------
// GALERIA EDITORIAL
//
// Três capítulos que se sucedem pelo scroll. Cada capítulo é uma sequência de
// linhas justificadas: as fotos de uma linha dividem a largura na proporção
// natural de cada uma, então todas ficam com a mesma altura, sem recorte e
// sem vazios. O ritmo vem da combinação — três verticais, uma horizontal com
// uma vertical, uma pilha de duas quadradas — e de uma sangria (foto de borda
// a borda) por capítulo.
//
//   celula  — uma foto, ou uma pilha de duas fotos ([a, b]) na mesma coluna
//   sangria — a linha tem uma única foto, de borda a borda da tela
//
// No celular, linhas com três ou mais células abrem a primeira em largura
// total e justificam as demais abaixo.
//
// Curadoria: 33 fotos. Ficam de fora as que já aparecem em outras seções da
// home (composição 1, queijo coalho, cactos no espelho) e as quase repetidas.
// ---------------------------------------------------------------------------

import { foto, type FotoKey } from "./fotos";

export type GaleriaCelula = FotoKey | readonly [FotoKey, FotoKey];

export type GaleriaLinha = {
  celulas: readonly GaleriaCelula[];
  sangria?: boolean;
};

export type GaleriaCapitulo = {
  id: string;
  titulo: string;
  deck: string;
  /** Fundo do capítulo (a mesa fica no creme, como a seção de gastronomia). */
  fundo: "nevoa" | "creme";
  linhas: readonly GaleriaLinha[];
};

export const galeria: readonly GaleriaCapitulo[] = [
  {
    id: "galeria-casa",
    titulo: "A casa",
    deck: "Arquitetura, cenografia e natureza.",
    fundo: "nevoa",
    linhas: [
      { celulas: ["casa/pratos-sofa"], sangria: true },
      { celulas: ["casa/entrada-interna", "casa/escada", "casa/mesa-posta-logo"] },
      { celulas: ["casa/luminarias", "casa/bar"] },
      { celulas: ["casa/janela-trelica", "casa/mezanino", "casa/flores-mesas"] },
      { celulas: ["casa/rede-cactos"], sangria: true },
    ],
  },
  {
    id: "galeria-mesa",
    titulo: "À mesa",
    deck: "Pratos, drinks e sobremesas.",
    fundo: "creme",
    linhas: [
      { celulas: ["mesa/composicao-2", ["pratos/tilapia-assada", "pratos/pastel"], "mesa/mesa-posta"] },
      { celulas: ["pratos/picanha", "pratos/bolinho-arroz", "pratos/baiao"] },
      { celulas: ["detalhes/mesa-alto"], sangria: true },
      { celulas: ["mesa/drink-aperol", "pratos/medalhao", "pratos/prato-ovos"] },
      { celulas: ["pratos/bolo-chocolate", "pratos/cocada-coco", "pratos/sobremesa-caramelo"] },
    ],
  },
  {
    id: "galeria-detalhes",
    titulo: "Detalhes",
    deck: "Matéria e memória.",
    fundo: "nevoa",
    linhas: [
      { celulas: ["detalhes/trelica", "casa/vitrine"] },
      { celulas: ["detalhes/macrame-cactos", "detalhes/flores-secas", "detalhes/arte-parede"] },
      { celulas: ["detalhes/cacto-neon", "detalhes/estante-livros", "detalhes/cortina"] },
      { celulas: ["detalhes/bar-secas"], sangria: true },
    ],
  },
];

/** Proporção (largura/altura) de uma célula; a pilha soma as alturas. */
export function proporcao(celula: GaleriaCelula): number {
  if (typeof celula === "string") {
    const f = foto(celula);
    return f.width / f.height;
  }
  const [a, b] = celula.map((k) => foto(k));
  return 1 / (a.height / a.width + b.height / b.width);
}

/** Fotos de um capítulo, na ordem de leitura (linha, célula, pilha). */
export function fotosDoCapitulo(capitulo: GaleriaCapitulo): FotoKey[] {
  return capitulo.linhas.flatMap((linha) => linha.celulas.flatMap((c) => (typeof c === "string" ? [c] : [...c])));
}

export type GaleriaItem = { key: FotoKey; capitulo: string; posicao: number; total: number };

/** Todas as fotos da galeria em ordem, com o capítulo e a posição dentro dele (usado pelo lightbox). */
export function fotosDaGaleria(): GaleriaItem[] {
  return galeria.flatMap((capitulo) => {
    const keys = fotosDoCapitulo(capitulo);
    return keys.map((key, i) => ({ key, capitulo: capitulo.titulo, posicao: i + 1, total: keys.length }));
  });
}
