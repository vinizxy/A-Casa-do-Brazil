import Entra from "./Entra";
import Foto from "./Foto";
import { quemSomos } from "@/content/site";

// Quem somos: a frase oficial em escala grande, os parágrafos oficiais, o
// fechamento em itálico e — com respiro próprio — os três valores oficiais
// como lista tipográfica (palavra + sentido), o mesmo dispositivo das
// regiões em Muitos Brasis. A fotografia vertical atravessa a borda inferior
// e invade o capítulo seguinte (a transição História → Gastronomia).
export default function QuemSomos() {
  const [p1, p2, p3, p4] = quemSomos.paragrafos;

  return (
    <section
      id="a-casa"
      aria-labelledby="quem-somos-titulo"
      className="scroll-mt-[var(--nav-h)] bg-nevoa pt-20 sm:pt-28 lg:pt-36"
    >
      <div className="container-editorial">
        <p className="text-[0.9375rem] text-tinta-suave">{quemSomos.kicker}</p>
        <h2 id="quem-somos-titulo" className="display display-xl mt-5 max-w-[15ch]">
          {quemSomos.titulo}
        </h2>

        {/* Três linhas à esquerda; a foto ocupa as três à direita, alinhada ao fim,
            e desce 10rem além da grade (invade o creme da gastronomia). */}
        <div className="mt-14 grid grid-cols-1 gap-y-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          <div className="prose-editorial lg:col-span-6 lg:col-start-1">
            <p>{p1}</p>
            <p>{p2}</p>
          </div>

          <Entra
            as="figure"
            className="relative z-10 lg:col-span-6 lg:col-start-7 lg:row-span-3 lg:row-start-1 lg:-mb-40 lg:self-end"
          >
            <Foto id={quemSomos.foto} sizes="(min-width: 1024px) 44vw, 100vw" />
          </Entra>

          <div className="prose-editorial lg:col-span-6 lg:col-start-1">
            <p>{p3}</p>
            <p>{p4}</p>
            <p className="display display-md display-italic mt-12 max-w-[18ch] text-tinta lg:mt-14">
              {quemSomos.fechamento}
            </p>
          </div>

          {/* Valores: cada palavra em Fraunces com o seu sentido ao lado. */}
          <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:mt-14 lg:pb-12">
            <h3 className="text-[0.9375rem] text-tinta-suave">{quemSomos.valoresTitulo}</h3>
            <dl className="mt-4">
              {quemSomos.valores.map((valor) => (
                <div
                  key={valor.nome}
                  className="hairline grid grid-cols-1 gap-y-2 border-t py-7 sm:grid-cols-6 sm:items-baseline sm:gap-x-8 lg:py-8"
                >
                  <dt className="display display-md sm:col-span-3">{valor.nome}</dt>
                  <dd className="max-w-[34ch] text-[1rem] leading-relaxed text-tinta-suave sm:col-span-3">
                    {valor.texto}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
