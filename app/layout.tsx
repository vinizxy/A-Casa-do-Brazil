import type { Metadata, Viewport } from "next";
import { Fraunces, Jost } from "next/font/google";
import "./globals.css";
import { restaurante } from "@/content/site";

// Fraunces: display editorial com eixos ópticos; Jost: corpo, navegação e legendas.
// Ambas servidas pelo próprio site (next/font), sem requisições externas.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(restaurante.url),
  title: {
    default: `${restaurante.nome} — ${restaurante.eyebrow}`,
    template: `%s — ${restaurante.nome}`,
  },
  description: restaurante.descricao,
  openGraph: {
    title: `${restaurante.nome} — ${restaurante.eyebrow}`,
    description: restaurante.descricao,
    url: restaurante.url,
    siteName: restaurante.nome,
    locale: restaurante.locale,
    type: "website",
    images: [{ url: "/og/casa-brazil.jpg", width: 1200, height: 750, alt: restaurante.nome }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${restaurante.nome} — ${restaurante.eyebrow}`,
    description: restaurante.descricao,
    images: ["/og/casa-brazil.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#454B30",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurante.nome,
  description: restaurante.descricao,
  url: restaurante.url,
  telephone: "+5511941074859",
  email: restaurante.email,
  servesCuisine: "Brazilian",
  image: `${restaurante.url}/og/casa-brazil.jpg`,
  hasMenu: `${restaurante.url}/cardapio`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${restaurante.endereco.rua} — ${restaurante.endereco.bairro}`,
    addressLocality: restaurante.endereco.cidade,
    addressRegion: restaurante.endereco.uf,
    postalCode: restaurante.endereco.cep,
    addressCountry: "BR",
  },
  sameAs: [restaurante.instagram.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca html.js antes da primeira pintura: as entradas por opacidade só existem com JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-nevoa focus:px-4 focus:py-3 focus:text-tinta"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
