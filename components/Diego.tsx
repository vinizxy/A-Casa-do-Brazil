import Entra from "./Entra";
import Foto from "./Foto";
import { diego } from "@/content/site";

// Diego Silva: matéria editorial. A fotografia oficial atravessa a borda
// entre o capítulo anterior (névoa) e este (verde-profundo); ao lado, o
// texto oficial da apresentação e as cenografias da trajetória.
export default function Diego() {
  return (
    <section
      id="diego-silva"
      aria-labelledby="diego-titulo"
      className="tema-escuro bg-profundo pb-24 text-nevoa lg:pb-32"
    >
      <div className="container-editorial grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
        <Entra as="figure" className="relative z-10 lg:col-span-5 lg:-ml-[var(--gutter)] lg:-mt-32">
          <Foto id={diego.foto} sizes="(min-width: 1024px) 40vw, 100vw" quality={85} />
        </Entra>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <p className="text-[0.9375rem] text-nevoa-suave">{diego.kicker}</p>
          <h2 id="diego-titulo" className="display display-xl mt-4">
            {diego.nome}
          </h2>
          <p className="mt-4 text-[1.0625rem] text-nevoa-suave">{diego.papel}</p>

          <div className="prose-editorial mt-10 text-nevoa/90">
            {diego.paragrafos.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>

          <blockquote className="hairline mt-12 border-l pl-6">
            <p className="display display-md display-italic max-w-[24ch]">“{diego.citacao}”</p>
          </blockquote>

          <div className="mt-16">
            <ul className="grid grid-cols-3 gap-3 sm:gap-4">
              {diego.cenografias.map((c) => (
                <Entra as="li" key={c}>
                  <Foto id={c} sizes="(min-width: 1024px) 14vw, 30vw" quality={70} />
                </Entra>
              ))}
            </ul>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-nevoa-suave">{diego.trajetoria}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
