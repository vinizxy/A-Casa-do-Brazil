"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LogoHorizontal, LogoSimbolo } from "./brand/Logo";
import { navegacao, restaurante } from "@/content/site";

type NavProps = {
  /** "sobre-foto": começa transparente sobre o hero; "solido": sempre com material. */
  modo?: "sobre-foto" | "solido";
};

export default function Nav({ modo = "sobre-foto" }: NavProps) {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [atual, setAtual] = useState<string | null>(null);
  const botaoRef = useRef<HTMLButtonElement | null>(null);
  const painelRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Seção atual: no cardápio, o próprio link; na home, a última seção do menu
  // cujo topo já passou do meio da tela (as seções entre elas herdam a anterior).
  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      if (window.location.pathname.startsWith("/cardapio")) {
        setAtual("/cardapio/");
        return;
      }
      let achado: string | null = null;
      for (const item of navegacao) {
        const id = item.href.split("#")[1];
        const el = id ? document.getElementById(id) : null;
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) achado = item.href;
      }
      setAtual(achado);
    };
    const onScroll = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  const fechar = useCallback(() => {
    setAberto(false);
    botaoRef.current?.focus();
  }, []);

  // Menu aberto: trava o scroll, fecha com Esc e mantém o foco dentro do painel.
  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    const painel = painelRef.current;
    const focaveis = () =>
      Array.from(
        painel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    focaveis()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
        return;
      }
      if (e.key !== "Tab") return;
      const itens = focaveis();
      if (itens.length === 0) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [aberto, fechar]);

  const comMaterial = modo === "solido" || rolou || aberto;

  return (
    <header className="tema-escuro fixed inset-x-0 top-0 z-50">
      <div
        className={`navbar-material transition-[background-color,box-shadow] duration-300 ${
          comMaterial
            ? "bg-[var(--material-escuro)] shadow-[inset_0_-1px_0_var(--hairline-escuro)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container-editorial flex h-[var(--nav-h)] items-center justify-between pt-[env(safe-area-inset-top)]">
          <a
            href="/"
            className="flex items-center gap-3 text-nevoa"
            aria-label="Casa Brazil — início"
            onClick={() => setAberto(false)}
          >
            <LogoSimbolo className="h-8 w-auto" title="" />
            <LogoHorizontal className="hidden h-[1.15rem] w-auto sm:block" title="" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={atual === item.href ? "location" : undefined}
                    className={`link-editorial text-[0.9375rem] hover:text-nevoa ${
                      atual === item.href ? "link-editorial-ativo text-nevoa" : "text-nevoa/90"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls={menuId}
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.9375rem] text-nevoa lg:hidden"
          >
            <span>{aberto ? "Fechar" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  aberto ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  aberto ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile: painel em tela cheia sobre material verde, links grandes. */}
      <div
        id={menuId}
        ref={painelRef}
        hidden={!aberto}
        className="fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 flex flex-col justify-between overflow-y-auto overscroll-contain bg-profundo pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <nav aria-label="Menu" className="container-editorial pt-6">
          <ul className="flex flex-col">
            {navegacao.map((item) => (
              <li key={item.href} className="hairline border-b">
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  aria-current={atual === item.href ? "location" : undefined}
                  className={`display display-sm flex min-h-14 items-center py-3 ${
                    atual === item.href ? "display-italic text-nevoa" : "text-nevoa/85"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-editorial pb-8 pt-10 text-[0.9375rem] text-nevoa-suave">
          <p>
            {restaurante.endereco.rua}, {restaurante.endereco.bairro}
          </p>
          <p className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
            <a href={restaurante.telefone.href} className="link-editorial">
              {restaurante.telefone.exibicao}
            </a>
            <a href={restaurante.instagram.href} target="_blank" rel="noopener noreferrer" className="link-editorial">
              {restaurante.instagram.handle}
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
