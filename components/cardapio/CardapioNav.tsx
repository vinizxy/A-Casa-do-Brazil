"use client";

import { useEffect, useRef, useState } from "react";

type Props = { categorias: { id: string; nome: string }[] };

// Navegação por categoria, fixa abaixo da navbar: rolagem horizontal nativa,
// item ativo segue a seção visível e é trazido para a vista.
export default function CardapioNav({ categorias }: Props) {
  const [ativa, setAtiva] = useState(categorias[0]?.id ?? "");
  const listaRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const secoes = categorias
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (secoes.length === 0 || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visiveis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis[0]) setAtiva(visiveis[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    secoes.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categorias]);

  useEffect(() => {
    const lista = listaRef.current;
    const el = lista?.querySelector<HTMLElement>(`[data-id="${ativa}"]`);
    if (!lista || !el) return;
    lista.scrollTo({ left: el.offsetLeft - 24, behavior: "smooth" });
  }, [ativa]);

  return (
    <nav
      aria-label="Categorias do cardápio"
      className="hairline sticky top-[var(--nav-h)] z-40 border-b bg-[color-mix(in_oklab,var(--nevoa)_90%,transparent)] backdrop-blur-md"
    >
      <ul
        ref={listaRef}
        className="sem-scrollbar mx-auto flex max-w-[var(--container)] gap-7 overflow-x-auto px-[var(--gutter)]"
      >
        {categorias.map((c) => {
          const ehAtiva = c.id === ativa;
          return (
            <li key={c.id} data-id={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={ehAtiva ? "true" : undefined}
                className={`relative inline-flex min-h-12 items-center whitespace-nowrap text-[0.9375rem] transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-tinta after:transition-opacity after:duration-200 ${
                  ehAtiva ? "text-tinta after:opacity-100" : "text-tinta-suave after:opacity-0 hover:text-tinta"
                }`}
              >
                {c.nome}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
