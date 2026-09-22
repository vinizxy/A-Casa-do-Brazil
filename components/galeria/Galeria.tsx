import Entra from "../Entra";
import FotoBotao from "./FotoBotao";
import GaleriaProvider from "./GaleriaProvider";
import { foto } from "@/content/fotos";
import { capitulosDasFotos, fotosDaGaleria, galeria, type GaleriaBloco } from "@/content/galeria";

const fundos = ["bg-nevoa", "bg-creme", "bg-nevoa"] as const;

function Bloco({ bloco }: { bloco: GaleriaBloco }) {
  switch (bloco.tipo) {
    case "full": {
      const f = foto(bloco.foto);
      const quadrada = Math.abs(f.width / f.height - 1) < 0.05;
      return (
        <Entra as="figure" className="w-full">
          <FotoBotao
            id={bloco.foto}
            sizes="100vw"
            quality={85}
            recorte={quadrada ? "aspect-[4/5] sm:aspect-[4/3] lg:aspect-[16/9]" : undefined}
          />
        </Entra>
      );
    }
    case "pair":
      return (
        <div className="container-editorial">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
            <Entra as="figure">
              <FotoBotao id={bloco.fotos[0]} sizes="(min-width: 1024px) 40vw, 50vw" />
            </Entra>
            <Entra as="figure" className="mt-10 sm:mt-16 lg:mt-24">
              <FotoBotao id={bloco.fotos[1]} sizes="(min-width: 1024px) 40vw, 50vw" />
            </Entra>
          </div>
        </div>
      );
    case "solo":
      return (
        <div className="container-editorial py-6 lg:py-16">
          <Entra
            as="figure"
            className={`w-[78%] sm:w-[52%] lg:w-[34%] ${bloco.lado === "direita" ? "ml-auto" : ""}`}
          >
            <FotoBotao id={bloco.foto} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 52vw, 78vw" quality={70} />
          </Entra>
        </div>
      );
    case "tall":
      // Vertical grande, encostada numa das margens: o silêncio ao lado é o
      // próprio bloco. (A frase do capítulo agora abre o capítulo.)
      return (
        <div className="container-editorial">
          <Entra as="figure" className={`w-full lg:w-[58%] ${bloco.lado === "direita" ? "lg:ml-auto" : ""}`}>
            <FotoBotao id={bloco.foto} sizes="(min-width: 1024px) 58vw, 100vw" />
          </Entra>
        </div>
      );
    case "trio":
      return (
        <div className="container-editorial">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-8">
            <Entra as="figure" className="col-span-2 lg:col-span-7">
              <FotoBotao id={bloco.grande} sizes="(min-width: 1024px) 50vw, 100vw" quality={85} />
            </Entra>
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:gap-6 lg:col-span-4 lg:col-start-9 lg:grid-cols-1 lg:gap-8 lg:self-end">
              {bloco.pequenas.map((p) => (
                <Entra as="figure" key={p}>
                  <FotoBotao id={p} sizes="(min-width: 1024px) 22vw, 50vw" quality={70} />
                </Entra>
              ))}
            </div>
          </div>
        </div>
      );
  }
}

// Galeria editorial: capítulos que se sucedem pelo scroll, cada um aberto pelo
// título e pela sua frase, seguidos de blocos em escalas diferentes. Todas as
// imagens abrem o lightbox (mouse, toque, teclado) e carregam sob demanda.
export default function Galeria() {
  const fotos = fotosDaGaleria();
  const capitulos = capitulosDasFotos();

  return (
    <GaleriaProvider fotos={fotos} capitulos={capitulos}>
      <section id="galeria" aria-labelledby="galeria-titulo" className="scroll-mt-[var(--nav-h)]">
        <h2 id="galeria-titulo" className="sr-only">
          Galeria
        </h2>
        {galeria.map((capitulo, i) => (
          // O prefixo evita colidir com as âncoras das seções da página
          // (o capítulo "a-casa" x a seção #a-casa de Quem somos).
          <div
            key={capitulo.id}
            id={`galeria-${capitulo.id}`}
            className={`${fundos[i % fundos.length]} scroll-mt-[var(--nav-h)] pb-24 pt-16 lg:pb-40 lg:pt-24`}
          >
            {/* Abertura do capítulo: título na escala das outras seções da página,
                com a frase do capítulo ao lado — é aqui que o deck pertence. */}
            <div className="container-editorial mb-14 lg:mb-24">
              <div className="hairline grid grid-cols-1 gap-y-4 border-t pt-6 lg:grid-cols-12 lg:gap-x-12 lg:pt-8">
                <h3 className="display display-lg text-tinta lg:col-span-6">{capitulo.titulo}</h3>
                <p className="display display-sm display-italic max-w-[22ch] text-tinta-suave lg:col-span-5 lg:col-start-8 lg:self-end lg:pb-2">
                  {capitulo.deck}
                </p>
              </div>
            </div>
            <div className="space-y-14 lg:space-y-24">
              {capitulo.blocos.map((bloco, j) => (
                <Bloco key={`${capitulo.id}-${j}`} bloco={bloco} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </GaleriaProvider>
  );
}
