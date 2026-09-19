import Entra from "../Entra";
import FotoBotao from "./FotoBotao";
import GaleriaProvider from "./GaleriaProvider";
import { foto } from "@/content/fotos";
import { fotosDaGaleria, galeria, type GaleriaBloco, type GaleriaCapitulo } from "@/content/galeria";

const fundos = ["bg-nevoa", "bg-creme", "bg-nevoa"] as const;

function Bloco({ bloco, capitulo }: { bloco: GaleriaBloco; capitulo: GaleriaCapitulo }) {
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
            className={`w-[66%] sm:w-[48%] lg:w-[34%] ${bloco.lado === "direita" ? "ml-auto" : ""}`}
          >
            <FotoBotao id={bloco.foto} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 66vw" quality={70} />
          </Entra>
        </div>
      );
    case "tall":
      return (
        <div className="container-editorial">
          <div className="grid grid-cols-1 items-end gap-y-6 lg:grid-cols-12 lg:gap-x-12">
            <Entra
              as="figure"
              className={`lg:col-span-6 ${bloco.lado === "direita" ? "lg:col-start-7 lg:row-start-1" : "lg:col-start-1"}`}
            >
              <FotoBotao id={bloco.foto} sizes="(min-width: 1024px) 44vw, 100vw" />
            </Entra>
            <p
              className={`display display-md display-italic max-w-[16ch] lg:col-span-4 lg:pb-4 ${
                bloco.lado === "direita" ? "lg:col-start-2 lg:row-start-1" : "lg:col-start-8"
              }`}
            >
              {capitulo.deck}
            </p>
          </div>
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

// Galeria editorial: capítulos que se sucedem pelo scroll, cada um com um
// microtítulo e blocos de escalas diferentes. Todas as imagens abrem o
// lightbox (mouse, toque, teclado) e carregam sob demanda.
export default function Galeria() {
  const fotos = fotosDaGaleria();

  return (
    <GaleriaProvider fotos={fotos}>
      <section id="galeria" aria-labelledby="galeria-titulo" className="scroll-mt-[var(--nav-h)]">
        <h2 id="galeria-titulo" className="sr-only">
          Galeria
        </h2>
        {galeria.map((capitulo, i) => (
          <div key={capitulo.id} id={capitulo.id} className={`${fundos[i % fundos.length]} pb-24 pt-16 lg:pb-40 lg:pt-24`}>
            <div className="container-editorial mb-10 lg:mb-16">
              <h3 className="hairline display border-t pt-4 text-[1.375rem] text-tinta">{capitulo.titulo}</h3>
            </div>
            <div className="space-y-14 lg:space-y-24">
              {capitulo.blocos.map((bloco, j) => (
                <Bloco key={`${capitulo.id}-${j}`} bloco={bloco} capitulo={capitulo} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </GaleriaProvider>
  );
}
