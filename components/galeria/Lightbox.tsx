"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { foto } from "@/content/fotos";
import type { GaleriaItem } from "@/content/galeria";
import { cssVars } from "@/lib/css";
import Seta from "../Seta";

type Props = {
  itens: GaleriaItem[];
  indice: number | null;
  onMudar: (i: number) => void;
  onFechar: () => void;
};

const botaoClaro = "inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] text-nevoa";

// Lightbox com <dialog> nativo: foco preso, Escape e backdrop vêm do
// navegador; setas do teclado, swipe e botões vêm daqui. A foto entra com um
// deslize curto no sentido da navegação, as vizinhas já ficam carregadas e,
// em telas maiores, uma faixa de miniaturas mostra o capítulo inteiro.
export default function Lightbox({ itens, indice, onMudar, onFechar }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const faixaRef = useRef<HTMLUListElement | null>(null);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const [sentido, setSentido] = useState(0);
  const aberto = indice !== null;
  const total = itens.length;

  const ir = useCallback(
    (i: number, dir: number) => {
      setSentido(dir);
      onMudar((i + total) % total);
    },
    [onMudar, total],
  );
  const anterior = useCallback(() => {
    if (indice !== null) ir(indice - 1, -1);
  }, [indice, ir]);
  const proxima = useCallback(() => {
    if (indice !== null) ir(indice + 1, 1);
  }, [indice, ir]);
  // Ao fechar, zera o sentido: a próxima abertura entra sem deslize lateral.
  const fechar = useCallback(() => {
    setSentido(0);
    onFechar();
  }, [onFechar]);

  // Abre/fecha o <dialog> conforme o estado.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (aberto && !el.open) {
      el.showModal();
      // O navegador foca o primeiro botão (Fechar) e o anel de foco aparece
      // mesmo com mouse; o foco vai para o próprio diálogo e o Tab segue dali.
      el.focus();
    }
    if (!aberto && el.open) el.close();
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
      if (e.key === "Escape") {
        e.preventDefault();
        fechar();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aberto, anterior, proxima, fechar]);

  // Mantém a miniatura atual visível na faixa.
  useEffect(() => {
    faixaRef.current
      ?.querySelector<HTMLElement>('[aria-current="true"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [indice]);

  if (indice === null) {
    return <dialog ref={ref} className="lightbox" onClose={fechar} />;
  }

  const item = itens[indice];
  const atual = foto(item.key);
  const vizinhas = [itens[(indice + 1) % total], itens[(indice - 1 + total) % total]].map((v) => foto(v.key));
  const doCapitulo = itens.map((it, i) => ({ ...it, i })).filter((it) => it.capitulo === item.capitulo);

  return (
    <dialog
      ref={ref}
      className="lightbox outline-none"
      tabIndex={-1}
      aria-label={`Galeria — ${item.capitulo}, imagem ${item.posicao} de ${item.total}`}
      onClose={fechar}
      onCancel={(e) => {
        e.preventDefault();
        fechar();
      }}
    >
      <div
        className="flex h-full w-full flex-col"
        onPointerDown={(e) => {
          if (e.pointerType === "touch") toque.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          if (!toque.current) return;
          const dx = e.clientX - toque.current.x;
          const dy = e.clientY - toque.current.y;
          toque.current = null;
          if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) proxima();
            else anterior();
          }
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p aria-live="polite" className="flex items-baseline gap-3">
            <span className="display text-[1.25rem] text-nevoa">{item.capitulo}</span>
            <span className="text-[0.875rem] tabular-nums text-nevoa-suave">
              {item.posicao} de {item.total}
            </span>
          </p>
          <button type="button" onClick={fechar} className={`-mr-2 ${botaoClaro}`}>
            Fechar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Palco: clique fora da foto fecha; as setas laterais aparecem a partir do tablet. */}
        <div
          className="relative min-h-0 flex-1 px-2 sm:px-20"
          onClick={(e) => {
            if (e.target === e.currentTarget) fechar();
          }}
        >
          <div
            key={item.key}
            className="lb-foto relative h-full w-full"
            style={cssVars({ "--dx": `${sentido * 24}px` })}
          >
            <Image src={atual.src} alt={atual.alt} fill sizes="100vw" quality={85} className="object-contain" priority />
          </div>
          {/* Vizinhas carregadas com antecedência (invisíveis), para a troca não piscar. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
            {vizinhas.map((v) => (
              <Image key={v.key} src={v.src} alt="" fill sizes="100vw" quality={85} loading="eager" />
            ))}
          </div>

          <button
            type="button"
            onClick={anterior}
            aria-label="Imagem anterior"
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-nevoa/80 transition-colors hover:text-nevoa sm:flex"
          >
            <Seta direcao="esquerda" className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={proxima}
            aria-label="Próxima imagem"
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-nevoa/80 transition-colors hover:text-nevoa sm:flex"
          >
            <Seta className="h-6 w-6" />
          </button>
        </div>

        {/* Tablet e desktop: miniaturas do capítulo atual. */}
        <ul
          ref={faixaRef}
          className="sem-scrollbar mx-auto hidden max-w-full gap-2 overflow-x-auto px-6 pb-5 pt-4 sm:flex"
          aria-label={`Fotos de ${item.capitulo}`}
        >
          {doCapitulo.map((it) => {
            const f = foto(it.key);
            const ehAtual = it.i === indice;
            return (
              <li key={it.key} className="shrink-0">
                <button
                  type="button"
                  onClick={() => ir(it.i, it.i > indice ? 1 : -1)}
                  aria-current={ehAtual ? "true" : undefined}
                  aria-label={`Ver imagem ${it.posicao} de ${it.total}`}
                  className={`relative block h-14 overflow-hidden transition-opacity duration-300 ${
                    ehAtual ? "opacity-100 outline outline-1 outline-offset-2 outline-nevoa" : "opacity-45 hover:opacity-80"
                  }`}
                  style={{ aspectRatio: `${f.width / f.height}` }}
                >
                  <Image src={f.src} alt="" fill sizes="96px" quality={70} className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Celular: anterior e próxima na base, ao alcance do polegar. */}
        <div className="flex items-center justify-between px-4 pb-4 sm:hidden">
          <button type="button" onClick={anterior} className={botaoClaro} aria-label="Imagem anterior">
            <Seta direcao="esquerda" className="h-4 w-4" />
            <span aria-hidden="true">Anterior</span>
          </button>
          <button type="button" onClick={proxima} className={botaoClaro} aria-label="Próxima imagem">
            <span aria-hidden="true">Próxima</span>
            <Seta className="h-4 w-4" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
