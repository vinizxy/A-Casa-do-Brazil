import type { Metadata } from "next";
import CardapioNav from "@/components/cardapio/CardapioNav";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Seta from "@/components/Seta";
import { cardapio, cardapioMeta, formatarPreco, type ItemCardapio } from "@/content/cardapio";
import { restaurante } from "@/content/site";

export const metadata: Metadata = {
  title: cardapioMeta.titulo,
  description: `Cardápio oficial da Casa Brazil — ${cardapioMeta.subtitulo.toLowerCase()}: entradas, saladas, pratos principais, pratos para duas pessoas, sobremesas, drinks e bebidas.`,
  alternates: { canonical: "/cardapio/" },
  openGraph: { title: `Cardápio — ${restaurante.nome}`, url: "/cardapio/" },
};

function Preco({ valor }: { valor: number }) {
  return <span className="display shrink-0 text-[1.125rem] tabular-nums text-tinta">{formatarPreco(valor)}</span>;
}

function Item({ item }: { item: ItemCardapio }) {
  return (
    <li className="hairline border-t py-5 first:border-t-0 first:pt-0 lg:py-6">
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="display text-[1.25rem] leading-snug lg:text-[1.375rem]">{item.nome}</h3>
        {item.preco !== undefined && <Preco valor={item.preco} />}
      </div>
      {item.descricao && (
        <p className="mt-2 max-w-[58ch] text-[0.9375rem] leading-relaxed text-tinta-suave">{item.descricao}</p>
      )}
      {item.precos && (
        <ul className="mt-3 max-w-[58ch] space-y-1">
          {item.precos.map((p) => (
            <li key={p.rotulo} className="flex items-baseline justify-between gap-6 text-[0.9375rem]">
              <span className="text-tinta-suave">{p.rotulo}</span>
              <Preco valor={p.preco} />
            </li>
          ))}
        </ul>
      )}
      {item.nota && <p className="mt-2 text-[0.875rem] italic text-tinta-suave">{item.nota}</p>}
    </li>
  );
}

// Cardápio web editorial: categorias claras, leitura rápida, preços alinhados.
// Conteúdo 100% do PDF oficial (content/cardapio.ts).
// Schema.org Menu: cada categoria vira uma MenuSection e cada item um MenuItem
// com oferta em BRL — o Google lê o cardápio direto da página.
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: `Cardápio — ${restaurante.nome}`,
  url: `${restaurante.url}/cardapio/`,
  inLanguage: "pt-BR",
  hasMenuSection: cardapio.map((categoria) => ({
    "@type": "MenuSection",
    name: categoria.nome,
    ...(categoria.intro ? { description: categoria.intro } : {}),
    hasMenuItem: categoria.itens.map((item) => ({
      "@type": "MenuItem",
      name: item.nome,
      ...(item.descricao ? { description: item.descricao } : {}),
      offers: (item.precos ?? [{ rotulo: "", preco: item.preco ?? 0 }]).map((p) => ({
        "@type": "Offer",
        price: p.preco.toFixed(2),
        priceCurrency: "BRL",
        ...(p.rotulo ? { name: p.rotulo } : {}),
      })),
    })),
  })),
};

export default function CardapioPage() {
  const categorias = cardapio.map((c) => ({ id: c.id, nome: c.nome }));

  return (
    <>
      <Nav modo="solido" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }} />
      <main id="conteudo" className="bg-nevoa">
        <header className="tema-escuro bg-profundo pb-14 pt-[calc(var(--nav-h)+3rem)] text-nevoa lg:pb-20 lg:pt-[calc(var(--nav-h)+5rem)]">
          <div className="container-editorial">
            <p className="text-[0.9375rem] text-nevoa-suave">{restaurante.nome}</p>
            <h1 className="display display-xl mt-3">{cardapioMeta.titulo}</h1>
            <p className="display display-sm mt-6 max-w-[26ch] text-nevoa/90">{cardapioMeta.subtitulo}</p>
          </div>
        </header>

        <CardapioNav categorias={categorias} />

        <div className="container-editorial">
          {cardapio.map((categoria, i) => (
            <section
              key={categoria.id}
              id={categoria.id}
              aria-labelledby={`${categoria.id}-titulo`}
              className={`scroll-mt-[calc(var(--nav-h)+3.5rem)] py-14 lg:py-20 ${i > 0 ? "hairline border-t" : ""}`}
            >
              <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12">
                {/* O nome da categoria acompanha a lista enquanto ela rola (desktop). */}
                <div className="lg:sticky lg:top-[calc(var(--nav-h)+4.5rem)] lg:col-span-4 lg:self-start">
                  <h2 id={`${categoria.id}-titulo`} className="display display-md max-w-[14ch]">
                    {categoria.nome}
                  </h2>
                  {categoria.intro && (
                    <p className="mt-3 max-w-[32ch] text-[0.9375rem] text-tinta-suave">{categoria.intro}</p>
                  )}
                </div>
                <ul className="lg:col-span-7 lg:col-start-6">
                  {categoria.itens.map((item) => (
                    <Item key={item.nome} item={item} />
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <div className="hairline flex flex-col gap-6 border-t py-12 sm:flex-row sm:items-center sm:justify-between lg:py-16">
            <p className="max-w-[48ch] text-[0.9375rem] text-tinta-suave">{cardapioMeta.nota}</p>
            <a href="/" className="group inline-flex min-h-11 items-center gap-3 text-[0.9375rem] text-tinta">
              <span className="link-editorial">Voltar ao início</span>
              <Seta className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
