import Image from "next/image";
import { LogoEmpilhado } from "./brand/Logo";
import Seta from "./Seta";
import { foto } from "@/content/fotos";
import { hero } from "@/content/site";
import { cssVars } from "@/lib/css";

// A porta: metade verde-profundo com a assinatura oficial, metade fotografia
// da entrada em altura total. No celular a foto vem primeiro e o texto abaixo,
// sem overlay. A foto é a única imagem prioritária da página.
export default function Hero() {
  const f = foto(hero.foto);

  return (
    <section
      id="topo"
      aria-labelledby="hero-titulo"
      className="tema-escuro relative bg-profundo text-nevoa lg:grid lg:min-h-svh lg:grid-cols-[minmax(0,46fr)_minmax(0,54fr)]"
    >
      <div className="hero-foto relative h-[62svh] min-h-[26rem] lg:order-last lg:h-auto lg:min-h-svh">
        <Image
          src={f.src}
          alt={f.alt}
          fill
          priority
          fetchPriority="high"
          quality={78}
          sizes="(min-width: 1024px) 54vw, 100vw"
          className="object-cover object-[50%_42%]"
        />
      </div>

      <div className="hero-texto flex flex-col justify-end px-[var(--gutter)] pb-12 pt-10 lg:justify-center lg:pb-16 lg:pt-[calc(var(--nav-h)+2rem)]">
        <p style={cssVars({ "--i": 0 })} className="text-[0.9375rem] text-nevoa-suave">
          {hero.eyebrow}
        </p>
        <h1 id="hero-titulo" style={cssVars({ "--i": 1 })} className="mt-7 lg:mt-9">
          <LogoEmpilhado
            className="h-auto w-[min(100%,19rem)] sm:w-[min(100%,22rem)] lg:w-[min(100%,27rem)] xl:w-[min(100%,30rem)]"
            title={`${hero.titulo} — cozinha brasileira`}
          />
        </h1>
        <p
          style={cssVars({ "--i": 2 })}
          className="display display-sm mt-9 max-w-[24ch] text-nevoa/90 lg:mt-12"
        >
          {hero.statement}
        </p>
        <p style={cssVars({ "--i": 3 })} className="mt-10 lg:mt-14">
          <a
            href={hero.cta.href}
            className="group inline-flex min-h-11 items-center gap-3 text-[0.9375rem] text-nevoa"
          >
            <span className="link-editorial">{hero.cta.label}</span>
            <Seta
              direcao="baixo"
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5"
            />
          </a>
        </p>
      </div>
    </section>
  );
}
