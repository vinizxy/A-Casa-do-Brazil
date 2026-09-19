import Entra from "./Entra";
import Foto from "./Foto";
import Seta from "./Seta";
import { gastronomia } from "@/content/site";

// Gastronomia: texto oficial, a moqueca de banana-da-terra em escala grande,
// os quatro conceitos como deck tipográfico e uma faixa editorial com pratos
// do cardápio oficial (só nome). Fundo creme — a mesa.
export default function Gastronomia() {
  return (
    <section
      id="gastronomia"
      aria-labelledby="gastronomia-titulo"
      className="scroll-mt-[var(--nav-h)] bg-creme pb-24 pt-20 sm:pt-28 lg:pb-32 lg:pt-48"
    >
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="text-[0.9375rem] text-tinta-suave">{gastronomia.kicker}</p>
            <h2 id="gastronomia-titulo" className="display display-lg mt-5 max-w-[14ch]">
              {gastronomia.titulo}
            </h2>
          </div>
          <div className="prose-editorial lg:col-span-6 lg:col-start-1">
            {gastronomia.paragrafos.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 items-end gap-y-10 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          <Entra as="figure" className="lg:col-span-7">
            <Foto id={gastronomia.fotoPrincipal} sizes="(min-width: 1024px) 50vw, 100vw" quality={85} />
          </Entra>
          <div className="lg:col-span-4 lg:col-start-9 lg:pb-6">
            <ul className="display display-lg display-italic leading-[1.05] text-tinta">
              {gastronomia.conceitos.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-[28ch] text-[0.9375rem] text-tinta-suave">{gastronomia.missao}</p>
          </div>
        </div>
      </div>

      {/* Faixa de pratos: rolagem horizontal nativa no celular; no desktop, seis colunas com desníveis. */}
      <div className="mt-20 lg:mt-28">
        <ul className="sem-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scroll-padding-inline:var(--gutter)] lg:mx-auto lg:grid lg:max-w-[var(--container)] lg:grid-cols-6 lg:gap-6 lg:overflow-visible">
          {gastronomia.pratos.map((prato, i) => (
            <Entra
              as="li"
              key={prato.foto}
              className={`w-[68vw] shrink-0 snap-start xs:w-[58vw] sm:w-[42vw] lg:w-auto ${i % 2 === 1 ? "lg:pt-12" : ""}`}
            >
              <Foto id={prato.foto} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 42vw, 68vw" />
              <p className="display mt-3 text-[1.0625rem] leading-snug">{prato.nome}</p>
            </Entra>
          ))}
        </ul>
        <div className="container-editorial mt-12">
          <a href={gastronomia.cta.href} className="group inline-flex min-h-11 items-center gap-3 text-[0.9375rem]">
            <span className="link-editorial">{gastronomia.cta.label}</span>
            <Seta className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
