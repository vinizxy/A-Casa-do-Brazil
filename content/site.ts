// ---------------------------------------------------------------------------
// CONTEÚDO OFICIAL DA CASA BRAZIL
//
// Fonte de verdade: apresentação institucional "CASA BRAZIL - COZINHA
// BRASILEIRA -2.pdf", cardápio oficial (content/cardapio.ts), logo oficial e
// perfil oficial no Instagram (@acasabrazil) para horários.
// Nada aqui é inventado: se um dado não está no material oficial, não existe
// neste arquivo.
// ---------------------------------------------------------------------------

export const restaurante = {
  nome: "Casa Brazil",
  assinatura: "Cozinha brasileira",
  eyebrow: "Gastronomia brasileira contemporânea",
  descricao:
    "Uma experiência brasileira onde gastronomia, cenografia e arquitetura se encontram. Casa Brazil — gastronomia brasileira contemporânea no Parque Continental, São Paulo.",
  url: "https://acasabrazil.com.br",
  locale: "pt_BR",
  endereco: {
    rua: "Rua Eva Terpins, 8",
    bairro: "Parque Continental",
    cidade: "São Paulo",
    uf: "SP",
    cep: "05327-030",
    // Rota (Google Maps Directions) e embed sob demanda — sem SDK.
    rotaHref:
      "https://www.google.com/maps/dir/?api=1&destination=Rua+Eva+Terpins,+8+-+Parque+Continental,+S%C3%A3o+Paulo+-+SP,+05327-030",
    mapaEmbed:
      "https://www.google.com/maps?q=Rua+Eva+Terpins,+8,+Parque+Continental,+S%C3%A3o+Paulo+-+SP,+05327-030&z=16&output=embed",
  },
  telefone: { exibicao: "(11) 94107-4859", href: "tel:+5511941074859" },
  whatsapp: { href: "https://wa.me/5511941074859", label: "WhatsApp" },
  email: "contatoacasabrazil@gmail.com",
  instagram: { handle: "@acasabrazil", href: "https://instagram.com/acasabrazil" },
  // Horários conforme o perfil oficial no Instagram (bio). Confirmar com o cliente.
  horarios: [
    { dias: "Segunda", horas: "Fechado" },
    { dias: "Terça a sexta", horas: "12h às 15h e 18h às 22h" },
    { dias: "Sábado", horas: "12h às 22h" },
    { dias: "Domingo", horas: "12h às 20h" },
  ],
} as const;

export const navegacao = [
  { label: "A Casa", href: "/#a-casa" },
  { label: "Gastronomia", href: "/#gastronomia" },
  { label: "Nosso Espaço", href: "/#nosso-espaco" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Localização", href: "/#localizacao" },
  { label: "Cardápio", href: "/cardapio/" },
] as const;

export const hero = {
  eyebrow: restaurante.eyebrow,
  titulo: "Casa Brazil",
  statement: "Uma experiência brasileira onde gastronomia, cenografia e arquitetura se encontram.",
  cta: { label: "Descubra a casa", href: "#a-casa" },
  foto: "hero/portao",
} as const;

export const quemSomos = {
  kicker: "Quem somos",
  titulo: "Uma casa brasileira, feita de sabores, memórias e experiências.",
  paragrafos: [
    "A Casa Brazil nasceu do desejo de transformar a riqueza da cultura brasileira em uma experiência que pudesse ser vivida à mesa.",
    "Somos uma casa de gastronomia brasileira contemporânea, que valoriza os sabores, ingredientes, histórias e tradições que formam a identidade do nosso país. Nossa cozinha parte de receitas e referências afetivas para criar pratos que preservam sua essência, mas ganham um olhar contemporâneo.",
    "A experiência, porém, não termina no prato. Na Casa Brazil, gastronomia, cenografia e arquitetura caminham juntas. O ambiente, os materiais, as cores, os objetos, a música, a apresentação dos pratos e a forma de receber fazem parte de uma mesma narrativa.",
    "Cada detalhe é pensado para despertar sensações e aproximar o público de um Brasil plural — um Brasil de diferentes regiões, culturas, ingredientes e formas de celebrar. Mais do que servir uma refeição, queremos criar uma experiência que permaneça na memória.",
  ],
  fechamento: "O Brasil que a gente sente, cozinha e compartilha.",
  valoresTitulo: "Valores",
  valores: [
    { nome: "Brasilidade", texto: "Nossa identidade nasce dos ingredientes, territórios, histórias e culturas que formam o Brasil." },
    { nome: "Criatividade", texto: "Tradição não significa repetição. Reinterpretamos referências brasileiras através de um olhar contemporâneo." },
    { nome: "Acolhimento", texto: "Receber bem é parte essencial da cultura brasileira e daquilo que queremos transmitir." },
  ],
  foto: "casa/mesa-logo",
  fotoDetalhe: "casa/salao-mesa",
} as const;

export const gastronomia = {
  kicker: "A gastronomia",
  titulo: "Cozinha brasileira contemporânea.",
  paragrafos: [
    "A Casa Brazil celebra a diversidade da cozinha brasileira a partir de uma leitura contemporânea de sabores, ingredientes e receitas que fazem parte da nossa memória.",
    "Dos clássicos afetivos aos sabores regionais, nossos pratos valorizam a identidade de cada ingrediente, combinando tradição, técnica e apresentação contemporânea.",
    "A proposta é trazer para a mesa um Brasil plural, saboroso e reconhecível, sem perder a essência de sua origem.",
  ],
  conceitos: ["Sabor", "Memória", "Território", "Identidade"],
  missao: "Colocar o Brasil à mesa.",
  fotoPrincipal: "pratos/moqueca-banana",
  fotoSecundaria: "mesa/composicao-1",
  // Nomes exatamente como no cardápio oficial; só pratos com foto confirmada.
  pratos: [
    { foto: "pratos/ceviche", nome: "Ceviche brasileiro" },
    { foto: "pratos/camarao-crocante", nome: "Camarão crocante" },
    { foto: "pratos/picadinho", nome: "Picadinho de filé da casa" },
    { foto: "pratos/barriga-de-porco", nome: "Barriga de porco" },
    { foto: "pratos/tilapia-crocante", nome: "Filé de tilápia crocante" },
    { foto: "pratos/queijo-coalho", nome: "Queijo coalho grelhado" },
  ],
  cta: { label: "Ver o cardápio completo", href: "/cardapio/" },
} as const;

export const muitosBrasis = {
  titulo: "Um País, Muitos Brasis.",
  introducao: "Nossa cozinha olha para o Brasil como território de possibilidades.",
  regioes: [
    { nome: "Norte", palavras: "Ingredientes, floresta, rios, intensidade." },
    { nome: "Nordeste", palavras: "Ancestralidade, cores, frutos do mar, cultura." },
    { nome: "Centro-Oeste", palavras: "Território, fogo, carnes, ingredientes brasileiros." },
    { nome: "Sudeste", palavras: "Memória, cozinha afetiva, tradição." },
    { nome: "Sul", palavras: "Fogo, campo, imigração, encontros culturais." },
  ],
  visao: "Revelar os muitos Brasis que existem em um só país.",
  // Uso atmosférico — nenhuma foto representa uma região específica.
  foto: "casa/cactos-papel",
} as const;

export const nossoEspaco = {
  kicker: "Nosso espaço",
  abertura: "Uma casa que conta histórias.",
  fotoAbertura: "casa/salao",
  titulo: "Elementos que transformam o ambiente em experiência.",
  fechamento:
    "Cada detalhe foi pensado para que o público não apenas entre na Casa Brazil — mas entre em um Brasil.",
  temas: [
    {
      nome: "Matéria",
      texto: "Madeira, pedra, fibras, cerâmica.",
      fotos: ["detalhes/palha", "detalhes/pratos-barro", "detalhes/cadeira-luz"],
    },
    {
      nome: "Memória",
      texto: "Objetos e referências que aproximam o público do Brasil.",
      fotos: ["detalhes/estante-maquina", "detalhes/livros-tacas", "detalhes/estante-objetos"],
    },
  ],
} as const;

export const diego = {
  kicker: "Quem está por trás",
  nome: "Diego Silva",
  papel: "Cenógrafo, empresário e criador da Casa Brazil",
  paragrafos: [
    "Com trajetória construída há mais de 18 anos no universo da cenografia, Diego Silva desenvolveu projetos para diferentes formatos de eventos, experiências e ambientes.",
    "Essa experiência em cenografia é parte essencial da identidade da Casa Brazil: um restaurante pensado não apenas para servir, mas para criar atmosferas, provocar sensações e transformar a experiência gastronômica em memória.",
  ],
  citacao: "Há mais de 18 anos, transformando espaços em experiências e cenários em histórias.",
  trajetoria: "Uma trajetória construída através da criação de cenários, ambientes e experiências para eventos e projetos especiais.",
  foto: "diego/retrato",
  cenografias: ["diego/cenografia-1", "diego/cenografia-2", "diego/cenografia-3"],
} as const;

export const localizacao = {
  kicker: "Localização",
  frase: "Uma casa brasileira criada para receber, alimentar e contar histórias.",
  titulo: "Onde estamos",
  cta: { label: "Como chegar", href: restaurante.endereco.rotaHref },
  mapa: { abrir: "Ver o mapa", titulo: "Mapa — Casa Brazil, Rua Eva Terpins, 8, Parque Continental" },
} as const;

export const rodape = {
  copyright: `© ${new Date().getFullYear()} Casa Brazil. Todos os direitos reservados.`,
} as const;
