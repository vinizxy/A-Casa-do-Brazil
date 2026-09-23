// ---------------------------------------------------------------------------
// GALERIA EDITORIAL
//
// Três capítulos que se sucedem pelo scroll. Cada capítulo é uma sequência de
// linhas justificadas: as fotos de uma linha dividem a largura na proporção
// natural de cada uma, então todas ficam com a mesma altura, sem recorte e
// sem vazios. O ritmo vem da combinação — três verticais, uma horizontal com
// uma vertical, uma pilha de duas quadradas — e de uma sangria (foto de borda
// a borda) no meio de cada capítulo.
//
//   celula  — uma foto, ou uma pilha de duas fotos ([a, b]) na mesma coluna
//   sangria — a linha tem uma única foto, de borda a borda da tela
//
// No celular, linhas com três ou mais células abrem a primeira em largura
// total e justificam as demais abaixo.
//
// Curadoria: 40 fotos. Ficam de fora as que já aparecem em outras seções da
// home (queijo coalho, cactos no espelho, pratos-parede no mapa), as quase
// repetidas e as do mesmo prato de outro ângulo: prato-carnes (= picadinho da
// Gastronomia), sobremesa-coco (= cocada-coco), peixe-empanado (a versão da
// treliça entrou no lugar), composição 1 e mini-chef (mais um prato com fritas).
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
  linhas: readonly GaleriaLinha[];
};

// Os capítulos se separam por espaço e tipografia (fundo único). Nenhum
// capítulo começa nem termina em sangria: a foto de borda a borda fica no
// meio, e as bordas do capítulo são linhas comuns — a transição respira.
export const galeria: readonly GaleriaCapitulo[] = [
  {
    id: "galeria-casa",
    titulo: "A casa",
    deck: "Arquitetura, cenografia e natureza.",
    linhas: [
      { celulas: ["casa/entrada-interna", "casa/escada", "casa/mesa-posta-logo"] },
      { celulas: ["casa/pratos-sofa"], sangria: true },
      { celulas: ["casa/rede-cactos", "casa/bar", "casa/mezanino"] },
      { celulas: ["casa/janela-trelica", "casa/luminarias", "casa/flores-mesas"] },
    ],
  },
  {
    id: "galeria-mesa",
    titulo: "À mesa",
    deck: "Pratos, drinks e sobremesas.",
    // Abre com um prato só (a composição cheia vem depois), segue pelos
    // petiscos e principais e fecha nas sobremesas. Nenhum prato repete —
    // nem com a faixa da seção Gastronomia.
    linhas: [
      { celulas: ["pratos/tilapia-assada", "mesa/mesa-posta", "pratos/pastel"] },
      { celulas: ["mesa/composicao-2", ["pratos/bolinho-arroz", "pratos/batata-frita"], "mesa/drink-aperol"] },
      { celulas: ["pratos/peixe-empanado-trelica", ["pratos/baiao", "pratos/picanha"], "pratos/salada-quiche"] },
      { celulas: ["detalhes/mesa-alto"], sangria: true },
      { celulas: ["pratos/stinco", "pratos/berinjela", "pratos/medalhao"] },
      { celulas: ["pratos/prato-glaceado", "pratos/prato-ovos"] },
      { celulas: ["pratos/sobremesa-banana", ["pratos/bolo-chocolate", "pratos/cocada-coco"], "pratos/sobremesa-caramelo"] },
    ],
  },
  {
    id: "galeria-detalhes",
    titulo: "Detalhes",
    deck: "Matéria e memória.",
    linhas: [
      { celulas: ["detalhes/trelica", "casa/vitrine"] },
      { celulas: ["detalhes/macrame-cactos", "detalhes/flores-secas", "detalhes/arte-parede"] },
      { celulas: ["detalhes/bar-secas"], sangria: true },
      { celulas: ["detalhes/cacto-neon", "detalhes/estante-livros", "detalhes/cortina"] },
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
