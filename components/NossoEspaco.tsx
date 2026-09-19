import Image from "next/image";
import Entra from "./Entra";
import Foto from "./Foto";
import { foto } from "@/content/fotos";
import { nossoEspaco } from "@/content/site";

// Nosso espaço: abre com o salão em tela cheia e uma única frase oficial;
// depois, em névoa, os dois temas do material oficial (Matéria e Memória) em
// composições fotográficas espelhadas.
export default function NossoEspaco() {
  const abertura = foto(nossoEspaco.fotoAbertura);

  return (
    <section id="nosso-espaco" aria-labelledby="espaco-titulo" className="scroll-mt-[var(--nav-h)] bg-nevoa">
      <div className="tema-escuro relative h-[88svh] min-h-[30rem] text-nevoa">
        <Image
          src={abertura.src}
          alt={abertura.alt}
          fill
          quality={78}
          sizes="100vw"
          className="foto object-cover object-[55%_50%]"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--verde-profundo)_0%,transparent_28%,transparent_62%,color-mix(in_oklab,var(--verde-profundo)_78%,transparent)_100%)]"
          aria-hidden="true"
        />
        <div className="container-editorial absolute inset-x-0 bottom-0 pb-12 lg:pb-16">
          <p className="text-[0.9375rem] text-nevoa-suave">{nossoEspaco.kicker}</p>
          <h2 id="espaco-titulo" className="display display-xl mt-4 max-w-[12ch]">
            {nossoEspaco.abertura}
          </h2>
        </div>
      </div>

      <div className="container-editorial pb-20 pt-20 lg:pb-52 lg:pt-32">
        <p className="display display-lg max-w-[16ch]">{nossoEspaco.titulo}</p>

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-40">
          {nossoEspaco.temas.map((tema, i) => {
            const [grande, ...pequenas] = tema.fotos;
            const espelhado = i % 2 === 1;
            return (
              <div key={tema.nome} className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12">
                <Entra as="figure" className={espelhado ? "lg:col-span-7 lg:col-start-6 lg:row-start-1" : "lg:col-span-7"}>
                  <Foto id={grande} sizes="(min-width: 1024px) 50vw, 100vw" />
                </Entra>
                <div
                  className={`flex flex-col justify-end gap-8 ${
                    espelhado ? "lg:col-span-4 lg:col-start-1 lg:row-start-1" : "lg:col-span-4 lg:col-start-9"
                  }`}
                >
                  <div>
                    <h3 className="display display-md">{tema.nome}</h3>
                    <p className="mt-3 max-w-[30ch] text-[1.0625rem] text-tinta-suave">{tema.texto}</p>
                  </div>
                  <ul className="grid grid-cols-2 gap-4 lg:gap-5">
                    {pequenas.map((p) => (
                      <Entra as="li" key={p}>
                        <Foto id={p} sizes="(min-width: 1024px) 14vw, 45vw" />
                      </Entra>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="display display-md display-italic mx-auto mt-24 max-w-[30ch] text-center lg:mt-36">
          {nossoEspaco.fechamento}
        </p>
      </div>
    </section>
  );
}
