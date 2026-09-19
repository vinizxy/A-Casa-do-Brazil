import Image from "next/image";
import { foto } from "@/content/fotos";
import { muitosBrasis } from "@/content/site";

// Um País, Muitos Brasis: capítulo tipográfico em verde-profundo. Abre com uma
// fotografia atmosférica que se dissolve na cor da seção (nenhuma foto
// representa uma região) e lista as cinco regiões sem caixas.
export default function MuitosBrasis() {
  const f = foto(muitosBrasis.foto);

  return (
    <section
      id="muitos-brasis"
      aria-labelledby="brasis-titulo"
      className="tema-escuro relative bg-profundo pb-24 text-nevoa lg:pb-32"
    >
      <div className="relative h-[58svh] min-h-[22rem] lg:h-[74svh]">
        <Image
          src={f.src}
          alt={f.alt}
          fill
          quality={70}
          sizes="100vw"
          className="foto object-cover object-[50%_38%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--verde-profundo)_35%,transparent)_0%,color-mix(in_oklab,var(--verde-profundo)_10%,transparent)_40%,var(--verde-profundo)_100%)]"
          aria-hidden="true"
        />
        <div className="container-editorial absolute inset-x-0 bottom-0">
          <h2 id="brasis-titulo" className="display display-xl max-w-[12ch] -mb-[0.18em]">
            {muitosBrasis.titulo}
          </h2>
        </div>
      </div>

      <div className="container-editorial mt-14 lg:mt-20">
        <p className="display display-sm max-w-[30ch] text-nevoa/90">{muitosBrasis.introducao}</p>

        <ul className="mt-14 lg:mt-20">
          {muitosBrasis.regioes.map((regiao) => (
            <li
              key={regiao.nome}
              className="hairline grid grid-cols-1 gap-y-2 border-t py-7 sm:grid-cols-12 sm:items-baseline sm:gap-x-8 lg:py-9"
            >
              <h3 className="display display-md sm:col-span-5 lg:col-span-4">{regiao.nome}</h3>
              <p className="max-w-[40ch] text-[1.125rem] text-nevoa-suave sm:col-span-7 lg:col-span-6 lg:text-[1.3125rem]">
                {regiao.palavras}
              </p>
            </li>
          ))}
        </ul>

        <p className="display display-md display-italic hairline mt-0 max-w-[22ch] border-t pt-12 lg:ml-[calc(100%/12*4+2rem)] lg:pt-16">
          {muitosBrasis.visao}
        </p>
      </div>
    </section>
  );
}
