"use client";

import { useEffect, useState } from "react";

type Props = {
  capitulos: { id: string; titulo: string; total: number }[];
};

// Índice dos capítulos que gruda sob a navbar enquanto a galeria está na tela.
// Marca o capítulo atual; o fundo é o mesmo da galeria, para parecer parte da
// página e não uma faixa por cima dela.
export default function GaleriaCapitulos({ capitulos }: Props) {
  const [ativo, setAtivo] = useState(capitulos[0]?.id);

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      // Linha de referência: logo abaixo da navbar + este índice.
      const limite = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) * 16 + 64;
      let atual = capitulos[0]?.id;
      for (const c of capitulos) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= limite) atual = c.id;
      }
      setAtivo(atual);
    };
    const onScroll = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [capitulos]);

  return (
    <nav
      aria-label="Capítulos da galeria"
      className="hairline sticky top-[var(--nav-h)] z-30 border-b bg-nevoa"
    >
      <ul className="container-editorial flex h-12 items-center gap-7 sm:gap-10">
        {capitulos.map((c) => {
          const atual = c.id === ativo;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={atual ? "location" : undefined}
                className={`inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] transition-colors duration-300 ${
                  atual ? "text-tinta" : "text-tinta-suave hover:text-tinta"
                }`}
              >
                <span className={`link-editorial ${atual ? "link-editorial-ativo" : ""}`}>{c.titulo}</span>
                <span className="text-[0.75rem] tabular-nums text-tinta-suave">{c.total}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
