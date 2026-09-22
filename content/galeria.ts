// ---------------------------------------------------------------------------
// GALERIA EDITORIAL
//
// A galeria é uma sequência de blocos com escalas diferentes, organizada em
// capítulos que se sucedem pelo scroll (sem tabs). Cada bloco escolhe a
// composição; as fotos vêm do registro em ./fotos.ts.
//
//   full  — uma foto de borda a borda (full bleed)
//   pair  — duas fotos lado a lado, a segunda levemente deslocada
//   solo  — uma foto pequena e isolada, com silêncio ao redor
//   tall  — uma foto vertical grande, com o microtítulo do capítulo ao lado
//   trio  — uma foto grande + duas pequenas empilhadas
// ---------------------------------------------------------------------------

import type { FotoKey } from "./fotos";

export type GaleriaBloco =
  | { tipo: "full"; foto: FotoKey; legenda?: string }
  | { tipo: "pair"; fotos: [FotoKey, FotoKey] }
  | { tipo: "solo"; foto: FotoKey; lado: "esquerda" | "direita" }
  | { tipo: "tall"; foto: FotoKey; lado: "esquerda" | "direita" }
  | { tipo: "trio"; grande: FotoKey; pequenas: [FotoKey, FotoKey] };

export type GaleriaCapitulo = {
  id: string;
  titulo: string;
  deck: string;
  blocos: GaleriaBloco[];
};

export const galeria: GaleriaCapitulo[] = [
  {
    id: "a-casa",
    titulo: "A casa",
    deck: "Arquitetura, cenografia e natureza.",
    blocos: [
      { tipo: "full", foto: "casa/pratos-sofa" },
      { tipo: "pair", fotos: ["casa/entrada-interna", "casa/escada"] },
      { tipo: "solo", foto: "casa/luminarias", lado: "direita" },
      { tipo: "tall", foto: "casa/bar", lado: "esquerda" },
      { tipo: "trio", grande: "casa/mesa-posta-logo", pequenas: ["casa/cadeiras", "casa/janela-trelica"] },
      { tipo: "full", foto: "casa/rede-cactos" },
      { tipo: "pair", fotos: ["casa/mezanino", "casa/flores-mesas"] },
      { tipo: "full", foto: "casa/pratos-parede" },
      { tipo: "solo", foto: "casa/portao-2", lado: "esquerda" },
    ],
  },
  {
    id: "a-mesa",
    titulo: "À mesa",
    deck: "Pratos, drinks e sobremesas.",
    blocos: [
      { tipo: "full", foto: "mesa/composicao-1" },
      { tipo: "trio", grande: "pratos/tilapia-assada", pequenas: ["pratos/pastel", "pratos/queijo-coalho"] },
      { tipo: "pair", fotos: ["pratos/salada-quiche", "pratos/stinco"] },
      { tipo: "solo", foto: "pratos/batata-frita", lado: "direita" },
      { tipo: "pair", fotos: ["mesa/drink-aperol", "pratos/bolo-chocolate"] },
      { tipo: "tall", foto: "mesa/mesa-posta", lado: "direita" },
      { tipo: "trio", grande: "pratos/picanha", pequenas: ["pratos/peixe-empanado", "pratos/bolinho-arroz"] },
      { tipo: "pair", fotos: ["pratos/berinjela", "pratos/mini-chef"] },
      { tipo: "trio", grande: "mesa/composicao-2", pequenas: ["pratos/baiao", "pratos/medalhao"] },
      { tipo: "pair", fotos: ["pratos/cocada-coco", "pratos/sobremesa-coco"] },
      { tipo: "solo", foto: "pratos/sobremesa-caramelo", lado: "esquerda" },
      { tipo: "trio", grande: "pratos/prato-carnes", pequenas: ["pratos/prato-glaceado", "pratos/prato-ovos"] },
      { tipo: "full", foto: "detalhes/mesa-alto" },
    ],
  },
  {
    id: "detalhes",
    titulo: "Detalhes",
    deck: "Matéria e memória.",
    blocos: [
      { tipo: "tall", foto: "detalhes/trelica", lado: "esquerda" },
      { tipo: "trio", grande: "casa/vitrine", pequenas: ["detalhes/potes", "detalhes/cortina"] },
      { tipo: "pair", fotos: ["detalhes/macrame-cactos", "detalhes/flores-secas"] },
      { tipo: "solo", foto: "detalhes/cacto-neon", lado: "esquerda" },
      { tipo: "pair", fotos: ["detalhes/cactos-espelho", "detalhes/arte-parede"] },
      { tipo: "pair", fotos: ["detalhes/estante-livros", "detalhes/secas"] },
      { tipo: "full", foto: "detalhes/bar-secas" },
    ],
  },
];

/** Fotos de um bloco, na ordem em que aparecem nele. */
function fotosDoBloco(bloco: GaleriaBloco): FotoKey[] {
  if (bloco.tipo === "pair") return [...bloco.fotos];
  if (bloco.tipo === "trio") return [bloco.grande, ...bloco.pequenas];
  return [bloco.foto];
}

/** Todas as fotos da galeria, na ordem em que aparecem (usado pelo lightbox). */
export function fotosDaGaleria(): FotoKey[] {
  return galeria.flatMap((capitulo) => capitulo.blocos.flatMap(fotosDoBloco));
}

/**
 * Título do capítulo de cada foto, no mesmo índice de fotosDaGaleria() — as
 * duas listas percorrem a mesma estrutura, então não saem de sincronia.
 */
export function capitulosDasFotos(): string[] {
  return galeria.flatMap((capitulo) =>
    capitulo.blocos.flatMap((bloco) => fotosDoBloco(bloco).map(() => capitulo.titulo)),
  );
}
