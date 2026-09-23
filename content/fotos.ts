// ---------------------------------------------------------------------------
// REGISTRO DE FOTOGRAFIAS
//
// Cada chave identifica uma foto; `src` é um caminho virtual que o loader
// (lib/image-loader.ts) converte nas variantes WebP em /public/images/w/.
// As dimensões vêm de fotos.generated.json (scripts/prepare-images.py) e
// reservam espaço na página (CLS ≈ 0).
// O alt descreve a imagem sem inventar nome de prato: só pratos confirmados
// no cardápio oficial são nomeados.
// ---------------------------------------------------------------------------

import dims from "./fotos.generated.json";

export type FotoKey = keyof typeof dims;

type Entrada = [largura: number, altura: number, variantes: number[]];

export type Foto = {
  key: FotoKey;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const alts: Record<FotoKey, string> = {
  "hero/portao":
    "Entrada da Casa Brazil: portão de ferro trabalhado aberto, placa com o logo, cactos e piso de pedra",
  "casa/salao":
    "Salão da Casa Brazil com escada em caracol de madeira, cactos altos, luminárias de fibra e mesa posta",
  "casa/mesa-logo": "Mesa posta diante do painel botânico com o logo da Casa Brazil e uma escada de madeira",
  "casa/cactos-papel": "Cactos altos diante de um espelho redondo, com sombras de folhagem na parede",
  "casa/entrada-interna": "Vista da entrada para o salão, com luminárias de fibra e mezanino de madeira ao fundo",
  "casa/salao-mesa": "Mesa de madeira com cadeiras de palhinha no salão, sob luminárias de fibra",
  "casa/mesa-posta-logo": "Mesa posta com taças e guardanapos diante do quadro com o logo da Casa Brazil",
  "casa/escada": "Escada em caracol de madeira junto a estantes de objetos e vasos de barro",
  "casa/bar": "Bar da Casa Brazil com balcão de aço, flores secas e taças suspensas",
  "casa/pratos-sofa": "Salão com pratos de cerâmica na parede, sofá verde, cactos e mesas de madeira",
  "casa/pratos-parede": "Pratos de barro na parede, cactos e sofá de veludo verde sob sombras de folhagem",
  "casa/flores-mesas": "Arranjo de flores secas suspenso sobre mesas com cadeiras de madeira",
  "casa/cadeiras": "Cadeiras de madeira e mesas do salão, com janela de treliça ao fundo",
  "casa/janela-trelica": "Janela com treliça de cobogó e mesas com cadeiras de madeira",
  "casa/luminarias": "Luminárias cilíndricas de fibra natural vistas de baixo, sob o teto de madeira",
  "casa/mezanino": "Mezanino de madeira com estantes, plantas e luminárias de fibra",
  "casa/rede-cactos": "Rede de macramê, cactos e vasos de barro sobre bancada branca",
  "casa/vitrine": "Vitrine com escultura de cavalo em fibra, luminárias esféricas e flores secas",
  "casa/portao-2": "Portão de ferro trabalhado da entrada, com placa da Casa Brazil e cactos",
  "detalhes/pratos-barro": "Pratos de cerâmica marrom pendurados na parede branca",
  "detalhes/palha": "Painel de chapéus de palha trançada na parede",
  "detalhes/mesa-alto": "Mesa posta vista de cima, com louças brancas, talheres e guardanapos sobre madeira",
  "detalhes/secas": "Folhagens secas em tons de areia junto a uma parede de madeira",
  "detalhes/estante-objetos": "Estante de madeira com louças, porta-retratos, plantas e lenha",
  "detalhes/estante-maquina": "Estante com máquina de costura antiga, quadros e plantas",
  "detalhes/livros-tacas": "Livros, taças e arranjo de flores secas sobre prateleira de madeira",
  "detalhes/estante-livros": "Estante com livros antigos, vasos de plantas e porta-retratos",
  "detalhes/trelica": "Treliça de ferro trabalhado com folhagem e luz natural ao fundo",
  "detalhes/macrame-cactos": "Cortina de macramê, cactos e vasos de barro",
  "detalhes/flores-secas": "Arranjo de flores secas em tons de areia sobre a escada de madeira",
  "detalhes/cactos-espelho": "Cactos altos junto a um espelho redondo, com sombras de folhas na parede",
  "detalhes/cadeira-luz": "Cadeira de madeira sob luz filtrada pela treliça, com sombras no piso",
  "detalhes/bar-secas": "Flores secas, luminária de vidro e garrafas sobre o balcão do bar",
  "detalhes/cacto-neon": "Cacto luminoso, bonecos articulados e garrafas verdes sobre o bar",
  "detalhes/arte-parede": "Arranjo de flores secas e madeira diante de uma parede de azulejos",
  "detalhes/cortina": "Cortina de contas de madeira com mesa e cadeiras ao fundo",
  "detalhes/potes": "Potes de vidro, plantas e garrafa sobre estante de madeira",
  "mesa/composicao-1": "Mesa de madeira com vários pratos da Casa Brazil servidos para compartilhar",
  "mesa/composicao-2": "Pratos da Casa Brazil dispostos sobre a mesa, com sombras de treliça",
  "mesa/mesa-posta": "Mesa posta com louças brancas e taças diante do quadro com o logo",
  "mesa/drink-aperol": "Drink cor de laranja servido em taça, sobre livros, com a treliça de ferro ao fundo",
  "pratos/ceviche": "Ceviche brasileiro com chips de batata",
  "pratos/camarao-crocante": "Camarão crocante com maionese de coentro",
  "pratos/picadinho": "Picadinho de filé da casa com arroz biro-biro, couve e banana frita",
  "pratos/barriga-de-porco": "Barriga de porco com canjiquinha cremosa e rúcula",
  "pratos/tilapia-crocante": "Filé de tilápia crocante com arroz de brócolis e legumes salteados",
  "pratos/moqueca-banana": "Moqueca de banana-da-terra com arroz branco e farofa crocante",
  "pratos/peixe-empanado": "Filé de peixe empanado em iscas, com limão e molho da casa",
  "pratos/pastel": "Pastel Brazil, dois sabores, servido com vinagrete",
  "pratos/bolinho-arroz": "Bolinhos de arroz com carne seca sobre prato ilustrado",
  "pratos/queijo-coalho": "Espetos de queijo coalho grelhado com melaço e ervas",
  "pratos/batata-frita": "Batata frita da casa servida em cesto com papel",
  "pratos/baiao": "Baião de dois Casa Brazil finalizado com ovo grelhado",
  "pratos/stinco": "Stinco de frango caipira com purê de batata-doce e legumes",
  "pratos/medalhao": "Medalhão de filé mignon com risoto cremoso",
  "pratos/picanha": "Picanha da casa com arroz biro-biro e batatas fritas",
  "pratos/tilapia-assada": "Tilápia assada da casa, inteira, sobre folha de bananeira, com arroz e farofa",
  "pratos/mini-chef": "Mini Chef da Casa: frango empanado com arroz, feijão e batata frita",
  "pratos/berinjela": "Berinjela à parmegiana com arroz e batata frita",
  "pratos/salada-quiche": "Salada e quiche da casa com folhas, tomates e ovos",
  "pratos/bolo-chocolate": "Bolo de chocolate com ganache e cereja",
  "pratos/cocada-coco": "Cocada cremosa servida no coco com sorvete e coco tostado",
  "pratos/sobremesa-coco": "Sobremesa servida em meio coco, com galhos secos e treliça ao fundo",
  "pratos/sobremesa-caramelo": "Sobremesa com calda de caramelo e creme em prato oval",
  "pratos/prato-carnes": "Prato com carnes, farofa e couve servido em louça artesanal",
  "pratos/prato-glaceado": "Carne glaceada com batatas rústicas e acompanhamento cremoso",
  "pratos/prato-ovos": "Prato com arroz e ovos, um cacto pequeno e sombras da treliça",
  "pratos/peixe-empanado-trelica": "Filé de peixe empanado em iscas, com limão e molho da casa, sob as sombras da treliça",
  "pratos/sobremesa-banana": "Sobremesa de banana com sorvete, pau de canela e farofa doce em prato oval",
  "diego/retrato": "Diego Silva, de camiseta preta, segurando um feixe de lápis coloridos com as duas mãos",
  "diego/cenografia-1": "Cenografia de evento assinada por Diego Silva, com plantas, luzes e mesas",
  "diego/cenografia-2": "Cenografia de evento com luminárias suspensas e flores secas",
  "diego/cenografia-3": "Cenografia de evento com arcos iluminados em tons quentes",
};

export function foto(key: FotoKey): Foto {
  const [width, height] = dims[key] as unknown as Entrada;
  return { key, src: `/images/${key}.jpg`, width, height, alt: alts[key] };
}

export const todasAsFotos = Object.keys(alts) as FotoKey[];
