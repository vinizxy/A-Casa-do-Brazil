import FotoBotao from "./FotoBotao";
import GaleriaCapitulos from "./GaleriaCapitulos";
import GaleriaProvider from "./GaleriaProvider";
import {
  fotosDaGaleria,
  fotosDoCapitulo,
  galeria,
  proporcao,
  type GaleriaCelula,
  type GaleriaLinha,
} from "@/content/galeria";
import { cssVars } from "@/lib/css";

const pct = (n: number) => `${Math.max(1, Math.round(n * 100))}vw`;

// sizes de cada célula: no desktop a fração da linha; no celular, a primeira
// célula de uma linha com três ou mais abre em largura total.
function sizesDaCelula(linha: GaleriaLinha, i: number): string {
  const ars = linha.celulas.map(proporcao);
  const soma = ars.reduce((a, b) => a + b, 0);
  const abre = linha.celulas.length >= 3;
  const somaCelular = abre ? soma - ars[0] : soma;
  const celular = abre && i === 0 ? 1 : ars[i] / somaCelular;
  return `(min-width: 640px) ${pct((ars[i] / soma) * 0.94)}, ${pct(celular)}`;
}

function Celula({ celula, sizes }: { celula: GaleriaCelula; sizes: string }) {
  const ar = proporcao(celula);
  if (typeof celula === "string") {
    return (
      <div className="galeria-celula" style={cssVars({ "--ar": ar })}>
        <FotoBotao id={celula} sizes={sizes} />
      </div>
    );
  }
  return (
    <div className="galeria-celula galeria-pilha" style={cssVars({ "--ar": ar })}>
      {celula.map((k) => (
        <div key={k} className="min-h-0 flex-1">
          <FotoBotao id={k} sizes={sizes} quality={70} />
        </div>
      ))}
    </div>
  );
}

function Linha({ linha }: { linha: GaleriaLinha }) {
  const [primeira] = linha.celulas;
  if (linha.sangria && typeof primeira === "string") {
    return (
      <div className="galeria-sangria" style={cssVars({ "--ar": proporcao(primeira) })}>
        <FotoBotao id={primeira} sizes="100vw" quality={85} />
      </div>
    );
  }
  const soma = linha.celulas.reduce((acc, c) => acc + proporcao(c), 0);
  return (
    <div className="container-editorial">
      <div
        className="galeria-linha-interna"
        data-abre={linha.celulas.length >= 3 ? "" : undefined}
        style={cssVars({ "--soma": soma, "--n": linha.celulas.length })}
      >
        {linha.celulas.map((c, i) => (
          <Celula key={typeof c === "string" ? c : c.join("+")} celula={c} sizes={sizesDaCelula(linha, i)} />
        ))}
      </div>
    </div>
  );
}

// Galeria editorial: título, um índice de capítulos (com a contagem de cada
// um) que gruda sob a navbar e três capítulos em linhas justificadas. As
// fotos não têm entrada animada — numa galeria elas são o conteúdo e devem
// estar lá quando a rolagem chega; o único movimento é a resposta ao hover.
// Todas abrem o lightbox (mouse, toque, teclado) e carregam sob demanda.
export default function Galeria() {
  const itens = fotosDaGaleria();
  const capitulos = galeria.map((c) => ({ id: c.id, titulo: c.titulo, total: fotosDoCapitulo(c).length }));

  return (
    <GaleriaProvider itens={itens}>
      <section id="galeria" aria-labelledby="galeria-titulo" className="scroll-mt-[var(--nav-h)] bg-nevoa">
        <div className="container-editorial pb-8 pt-20 sm:pt-28 lg:pb-12 lg:pt-36">
          <h2 id="galeria-titulo" className="display display-xl">
            Galeria
          </h2>
        </div>

        <GaleriaCapitulos capitulos={capitulos} />

        {/* Capítulos: muito respiro acima do divisor e pouco abaixo, para o
            título pertencer às fotos que vêm depois dele. O primeiro já está
            separado pela borda do índice: respiro curto e sem segunda linha. */}
        <div className="pb-28 lg:pb-44">
          {galeria.map((capitulo, i) => (
            <div key={capitulo.id} className={i === 0 ? "pt-10 lg:pt-14" : "pt-24 lg:pt-40"}>
              {/* A âncora fica no divisor (não no respiro acima dele): o índice
                  leva direto ao título, logo abaixo da faixa fixa. */}
              <header id={capitulo.id} className="container-editorial mb-7 scroll-mt-16 lg:mb-10">
                <div
                  className={`flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-6 ${
                    i === 0 ? "" : "hairline border-t pt-5 lg:pt-6"
                  }`}
                >
                  <h3 className="display text-[1.875rem] lg:text-[2.5rem]">{capitulo.titulo}</h3>
                  <p className="text-[0.9375rem] text-tinta-suave">{capitulo.deck}</p>
                </div>
              </header>
              <div className="galeria-capitulo">
                {capitulo.linhas.map((linha, j) => (
                  <Linha key={`${capitulo.id}-${j}`} linha={linha} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </GaleriaProvider>
  );
}
