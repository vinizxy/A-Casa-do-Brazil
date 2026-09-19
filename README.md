# Casa Brazil — site

Site institucional da Casa Brazil (gastronomia brasileira contemporânea, Parque Continental, São Paulo).
Next.js 16 (App Router) + Tailwind CSS 4. Sem backend, sem CMS, sem dependências de animação.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera a pasta out/ (site estático completo) — pare o `npm run dev` antes
npm run lint
```

## Publicar

O build é **100% estático** (`output: "export"`): `out/` contém `index.html`,
`cardapio/index.html`, os scripts e todas as imagens. Serve em qualquer hospedagem:

- **Vercel (CLI)**: `npx vercel login` uma vez e depois, dentro de `out/`: `npx vercel --prod`
  (framework "Other", diretório "."). Ou importe o projeto-fonte pelo GitHub — a Vercel roda
  `next build` e publica `out/` sozinha.
- **Netlify Drop**: arraste a pasta `out/` em https://app.netlify.com/drop.
- **Servidor comum / cPanel**: envie o conteúdo de `out/` para a raiz pública.

Imagens: as variantes responsivas em WebP ficam em `public/images/w/` e são escolhidas
por `lib/image-loader.ts` (não há otimizador em runtime). Para regenerar: `python scripts/prepare-images.py`.

Não rode `next build` com o servidor de desenvolvimento aberto: os dois escrevem em `.next/`
e o otimizador de imagens do dev pode travar (página fica "carregando" sem responder).
Se acontecer, pare tudo, apague a pasta `.next` e suba o dev de novo.
Imagens já vêm prontas em WebP (`public/images/w/`), então o dev não precisa otimizar nada.

## Estrutura

```
app/
  layout.tsx          fontes (Fraunces + Jost via next/font), metadata, JSON-LD, skip link
  page.tsx            home: Hero → Quem somos → Gastronomia → Muitos Brasis → Nosso Espaço → Diego → Galeria → Localização
  cardapio/page.tsx   cardápio web editorial
  globals.css         design tokens (paleta oficial), tipografia, motion, lightbox
content/
  site.ts             todo o texto oficial (apresentação institucional) + contato/horários
  cardapio.ts         cardápio oficial transcrito do PDF
  fotos.ts            registro das fotografias (alt text) — dimensões em fotos.generated.json
  galeria.ts          composição editorial da galeria (capítulos e blocos)
components/
  brand/Logo.tsx      logo oficial em SVG (símbolo, empilhado, horizontal) — gerado do PDF
  Nav, Hero, QuemSomos, Gastronomia, MuitosBrasis, NossoEspaco, Diego, Localizacao, Footer
  galeria/            Galeria (composição), FotoBotao, Lightbox (<dialog> nativo), GaleriaProvider
  cardapio/CardapioNav
  Foto.tsx            next/image com dimensões reservadas (CLS ≈ 0)
lib/image-loader.ts   escolhe a variante WebP pré-gerada para cada largura do srcset
  Entra.tsx           entrada por opacidade ao rolar (desliga com prefers-reduced-motion)
  MapaSobDemanda.tsx  mapa carregado só após clique
scripts/
  prepare-images.py   gera public/images/** a partir dos originais (não altera os originais)
  logo-from-pdf.py    extrai o logo oficial do PDF como paths SVG
```

## Conteúdo é fonte de verdade

Tudo que aparece no site vem de `content/`. Nada é inventado: textos da apresentação
institucional, cardápio do PDF oficial, horários do perfil oficial no Instagram.
Para atualizar o cardápio, edite `content/cardapio.ts`.

## Fotografias

Os originais ficam em `jpg - alta/` (ensaio do espaço), na raiz do projeto
(fotos gastronômicas recebidas por WhatsApp e screenshots) e em `../CASA BRAZIL/extracted`.
Não são servidos nem versionados. `assets/fotos/` guarda a cópia web em JPEG (fonte de
trabalho) e `public/images/w/` as variantes WebP servidas. Tudo é gerado com:

```bash
python scripts/prepare-images.py
```

Para adicionar uma foto: inclua no `JOBS` do script, rode-o, e registre a chave e o alt em
`content/fotos.ts`. O `next/image` cuida de AVIF/WebP, `srcset`, `sizes` e lazy loading.
