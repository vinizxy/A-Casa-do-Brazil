// ---------------------------------------------------------------------------
// CARDÁPIO OFICIAL — transcrito de "CARDAPIO - CASA BRAZIL - ALTERAÇÃO .docx-2.pdf"
//
// Fonte de verdade para categorias, nomes, descrições e preços. Nada foi
// acrescentado. Preços em reais (número); a formatação fica na UI.
// O cardápio é só texto: as fotografias dos pratos ficam na home e na galeria.
// ---------------------------------------------------------------------------

export type ItemCardapio = {
  nome: string;
  descricao?: string;
  /** Preço único. Use `precos` quando houver variações. */
  preco?: number;
  precos?: { rotulo: string; preco: number }[];
  /** Observação impressa abaixo do item (ex.: "Consulte os sabores do dia"). */
  nota?: string;
};

export type CategoriaCardapio = {
  id: string;
  nome: string;
  intro?: string;
  itens: ItemCardapio[];
};

export const cardapioMeta = {
  titulo: "Cardápio",
  subtitulo: "Gastronomia brasileira contemporânea",
  nota: "Preços em reais. Cardápio sujeito a alterações.",
} as const;

export const cardapio: CategoriaCardapio[] = [
  {
    id: "entradas-e-petiscos",
    nome: "Entradas e petiscos",
    itens: [
      {
        nome: "Ceviche brasileiro | Peixe do dia",
        descricao:
          "Peixe branco fresco curado no limão, com cebola, coentro e pimenta suave. Vinagrete cítrico de inspiração brasileira com toque tropical. Servido com chips de batata.",
        preco: 45,
      },
      {
        nome: "Bolinho de arroz com carne seca",
        descricao:
          "Bolinho dourado por fora e macio por dentro, com arroz temperado e carne seca desfiada. Acompanha maionese da casa.",
        preco: 38,
      },
      {
        nome: "Camarão crocante",
        descricao: "Camarões empanados e fritos, servidos com maionese de coentro.",
        preco: 48,
      },
      {
        nome: "Coxinha de frango caipira",
        descricao: "Clássica coxinha crocante, recheada com frango caipira bem temperado.",
        preco: 32,
      },
      {
        nome: "Batata frita da casa",
        descricao: "Batatas douradas e macias, servidas com molhos artesanais.",
        preco: 30,
      },
      {
        nome: "Dadinho de tapioca",
        descricao: "Cubos dourados de tapioca e queijo, servidos com geleia de abacaxi.",
        preco: 35,
      },
      {
        nome: "Queijo coalho grelhado | Melaço & ervas",
        descricao: "Queijo coalho grelhado, servido com melaço de cana e ervas frescas.",
        preco: 38,
      },
      {
        nome: "Pastel Brazil | Dois sabores",
        descricao: "Pastéis de costela e queijo meia cura, dourados e crocantes.",
        preco: 36,
      },
      {
        nome: "Tartar de carne | Estilo Casa Brazil",
        descricao:
          "Carne bovina picada na ponta da faca, temperada com ervas, azeite e limão. Servido com chips de batata.",
        preco: 55,
      },
      {
        nome: "Filé de peixe empanado",
        descricao: "Iscas de peixe fresco empanadas e crocantes, servidas com molho da casa.",
        preco: 52,
      },
    ],
  },
  {
    id: "saladas",
    nome: "Saladas Casa Brazil",
    itens: [
      {
        nome: "Salada Casa Brazil",
        descricao:
          "Mix de folhas frescas com iscas de frango douradas e suculentas, finalizado com queijo meia cura e farofa de castanha tostada. Acompanha molho da casa, cremoso e equilibrado.",
        precos: [
          { rotulo: "Com frango", preco: 48 },
          { rotulo: "Sem frango, sob solicitação", preco: 42 },
        ],
      },
      {
        nome: "Salada & quiche da casa",
        descricao:
          "Mix de folhas verdes, tomates frescos temperados com o tradicional tempero da Casa Brazil e quiche artesanal.",
        preco: 58,
        nota: "Consulte os sabores disponíveis no dia.",
      },
    ],
  },
  {
    id: "pratos-principais",
    nome: "Pratos principais",
    itens: [
      {
        nome: "Picadinho de filé da casa",
        descricao:
          "Cubos de filé macios e suculentos, acompanhados de arroz biro-biro, batata ao murro, couve salteada e banana frita.",
        preco: 82,
      },
      {
        nome: "Barriga de porco",
        descricao:
          "Barriga de porco macia e suculenta, envolta em barbecue de goiabada levemente agridoce. Acompanha canjiquinha cremosa e rúcula no azeite.",
        preco: 72,
      },
      {
        nome: "Baião de dois Casa Brazil",
        descricao:
          "Arroz com feijão-fradinho, carne seca, calabresa e bacon, finalizado com queijo coalho e ovo grelhado.",
        preco: 68,
      },
      {
        nome: "Bife ancho grelhado",
        descricao:
          "Bife de ancho grelhado no ponto ideal, servido com arroz cremoso, batatas rústicas e finalizado com crispy de couve.",
        preco: 78,
      },
      {
        nome: "Medalhão de filé mignon",
        descricao:
          "Medalhões de filé mignon grelhados, servidos com risoto cremoso de queijo meia cura e parmesão, finalizados com delicado molho ao vinho tinto.",
        preco: 88,
      },
      {
        nome: "Stinco de frango caipira",
        descricao:
          "Coxa e sobrecoxa de frango desossadas, marinadas e grelhadas, macias e suculentas. Servidas com purê de batata-doce e legumes salteados na manteiga.",
        preco: 65,
      },
      {
        nome: "Filé de tilápia crocante",
        descricao: "Filé de tilápia empanado e dourado, servido com arroz de brócolis e legumes salteados.",
        preco: 80,
      },
      {
        nome: "Picanha da casa",
        descricao: "Picanha grelhada no ponto, acompanhada de arroz biro-biro e batatas fritas crocantes.",
        preco: 94,
      },
      {
        nome: "Hambúrguer BRL",
        descricao:
          "Hambúrguer bovino suculento, queijo coalho empanado e dourado, bacon crocante e maionese da casa. Acompanha batata frita.",
        preco: 58,
      },
      {
        nome: "Mini Chef da Casa — Frango empanado",
        descricao:
          "Tirinhas de frango empanadas e crocantes, acompanhadas de arroz branco, batata frita e feijão, com molho especial à parte.",
        preco: 45,
      },
    ],
  },
  {
    id: "vegetariano",
    nome: "Vegetariano",
    itens: [
      {
        nome: "Berinjela à parmegiana",
        descricao:
          "Berinjela empanada e frita, coberta com molho artesanal de tomate e finalizada com queijo parmesão gratinado.",
        preco: 58,
      },
    ],
  },
  {
    id: "vegano",
    nome: "Vegano",
    itens: [
      {
        nome: "Moqueca de banana-da-terra",
        descricao:
          "Banana-da-terra grelhada, cozida em molho de tomate, leite de coco, pimentões e dendê, finalizada com coentro fresco, acompanhada de arroz branco e farofa crocante.",
        preco: 65,
      },
    ],
  },
  {
    id: "acrescimos",
    nome: "Acréscimos",
    itens: [
      { nome: "Arroz branco", preco: 10 },
      { nome: "Arroz brócolis", preco: 12 },
      { nome: "Arroz biro-biro", preco: 14 },
      { nome: "Feijão", preco: 10 },
    ],
  },
  {
    id: "pratos-para-duas-pessoas",
    nome: "Pratos para duas pessoas",
    intro: "Porções ideais para compartilhar e viver a experiência Casa Brazil.",
    itens: [
      {
        nome: "Moqueca da casa | Peixe ou camarão",
        descricao:
          "Moqueca preparada com leite de coco, azeite de dendê e pimentões. Servida com arroz branco, farofa de banana-da-terra e pirão.",
        precos: [
          { rotulo: "Peixe do dia", preco: 185 },
          { rotulo: "Camarão", preco: 255 },
        ],
      },
      {
        nome: "Costela suína",
        descricao:
          "Costela suína assada lentamente, macia e suculenta, finalizada com molho de goiabada levemente agridoce. Servida com batata frita da casa, mandioca na manteiga e vinagrete de abacaxi.",
        preco: 195,
      },
      {
        nome: "Tilápia assada da casa",
        descricao:
          "Tilápia inteira assada, servida com legumes salteados, arroz branco e farofa crocante de banana-da-terra.",
        preco: 220,
      },
    ],
  },
  {
    id: "sobremesas",
    nome: "Sobremesas",
    itens: [
      {
        nome: "Pudim de milho | Calda de rapadura",
        descricao: "Pudim de milho cremoso e macio, servido com calda de rapadura artesanal.",
        preco: 28,
      },
      {
        nome: "Bolo de chocolate",
        descricao:
          "Bolo de chocolate intenso, macio e úmido, com recheio e ganache de chocolate meio amargo.",
        preco: 28,
      },
      {
        nome: "Cocada cremosa de doce de leite | Sorvete de tapioca",
        descricao: "Cocada cremosa com doce de leite, servida com sorvete artesanal de tapioca.",
        preco: 34,
      },
      {
        nome: "Banoffe Brazil",
        descricao:
          "Base crocante, doce de leite, banana caramelizada e sorvete de creme, com toque de canela.",
        preco: 34,
      },
      {
        nome: "Doce Brasil — Maracujá & chocolate",
        descricao:
          "Creme aerado de maracujá sobre base de bolacha champagne, finalizado com calda de maracujá, chocolate meio amargo artesanal e crocante de amendoim e castanha-do-Pará.",
        preco: 35,
      },
      {
        nome: "Açaí Casa Brazil",
        descricao: "Açaí cremoso, servido com granola crocante.",
        preco: 35,
        nota: "Acréscimo de banana: R$ 6.",
      },
    ],
  },
  {
    id: "sabado-feijoada",
    nome: "Sábado — Buffet de feijoada completa",
    itens: [
      {
        nome: "Buffet de feijoada completa",
        descricao:
          "Feijoada preparada lentamente com cortes nobres de carne, feijão preto e temperos clássicos. Servida com arroz, couve refogada, farofa e laranja.",
        preco: 79.9,
      },
    ],
  },
  {
    id: "drinks",
    nome: "Drinks Casa Brazil",
    itens: [
      {
        nome: "Caipirinhas",
        descricao:
          "Clássico brasileiro preparado com cachaça, saquê ou vodka, açúcar e gelo. Refrescante, equilibrada e cheia de brasilidade.",
        preco: 38,
        nota: "Consultar frutas.",
      },
      {
        nome: "Aperol",
        descricao:
          "Aperol, espumante brut e água com gás, finalizado com laranja. Refrescante, levemente amargo e perfeito para abrir o apetite.",
        preco: 40,
      },
      {
        nome: "Gin tônica",
        descricao:
          "Gin premium combinado com água tônica bem gelada e gelo cristalino, finalizado com rodelas de laranja ou limão. Refrescante, aromático e elegante, com final seco e levemente cítrico.",
        preco: 36,
      },
      {
        nome: "Mate da casa",
        descricao:
          "Infusão de mate preparada na casa e delicadamente reduzida, equilibrada com limão fresco e mel, servida com gelo e finalizada com rodelas de limão.",
        preco: 22,
      },
      {
        nome: "Jarra Clericot",
        descricao:
          "Vinho branco leve e refrescante, combinado com frutas frescas da estação cortadas em cubos levemente maceradas para liberar aromas e sabor. Finalizado com toque cítrico e gelo, resulta em uma bebida aromática, fresca e vibrante, perfeita para compartilhar à mesa.",
        preco: 120,
      },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    itens: [
      { nome: "Coca-Cola", preco: 10 },
      { nome: "Guaraná", preco: 10 },
      { nome: "Água tônica", preco: 10 },
      { nome: "Água mineral", preco: 10 },
      { nome: "Água com gás", preco: 10 },
      { nome: "Suco de laranja 300 ml", preco: 16 },
      { nome: "Long Heineken", preco: 18 },
      { nome: "Long Stella", preco: 18 },
      { nome: "Chopp Brahma", preco: 16 },
      {
        nome: "Café",
        descricao: "Café encorpado e aromático, servido quente, com sabor marcante e final equilibrado.",
        preco: 10,
      },
    ],
  },
];

export function formatarPreco(valor: number): string {
  const inteiro = Number.isInteger(valor);
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
