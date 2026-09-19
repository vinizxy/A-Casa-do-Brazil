"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { foto, type FotoKey } from "@/content/fotos";
import Seta from "../Seta";

type Props = {
  fotos: FotoKey[];
  indice: number | null;
  onMudar: (i: number) => void;
  onFechar: () => void;
};

// Lightbox com <dialog> nativo: foco preso, Escape e backdrop vêm do
// navegador; setas do teclado, swipe e botões vêm daqui. Em telas pequenas o
// botão de fechar fica no topo, sempre visível.
export default function Lightbox({ fotos, indice, onMudar, onFechar }: Props) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const toque = useRef<{ x: number; y: number } | null>(null);
  const aberto = indice !== null;
  const total = fotos.length;

  const anterior = useCallback(() => {
    if (indice === null) return;
    onMudar((indice - 1 + total) % total);
  }, [indice, onMudar, total]);

  const proxima = useCallback(() => {
    if (indice === null) return;
    onMudar((indice + 1) % total);
  }, [indice, onMudar, total]);

  // Abre/fecha o <dialog> conforme o estado.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (aberto && !el.open) el.showModal();
    if (!aberto && el.open) el.close();
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proxima();
      if (e.key === "Escape") {
        e.preventDefault();
        onFechar();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aberto, anterior, proxima, onFechar]);

  if (indice === null) {
    return <dialog ref={ref} className="lightbox" onClose={onFechar} />;
  }

  const atual = foto(fotos[indice]);

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`Galeria — imagem ${indice + 1} de ${total}`}
      onClose={onFechar}
      onCancel={(e) => {
        e.preventDefault();
        onFechar();
      }}
      onClick={(e) => {
        // Clique fora da imagem fecha.
        if (e.target === e.currentTarget) onFechar();
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
        <div className="flex items-center justify-between px-4 py-3 text-[0.9375rem] text-nevoa/80 sm:px-6">
          <p aria-live="polite">
            {indice + 1} / {total}
          </p>
          <button
            type="button"
            onClick={onFechar}
            className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-nevoa"
          >
            Fechar
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <figure className="flex min-h-0 flex-1 flex-col px-2 sm:px-16">
          <div className="relative min-h-0 w-full flex-1">
            <Image
              key={atual.key}
              src={atual.src}
              alt={atual.alt}
              fill
              sizes="100vw"
              quality={85}
              className="object-contain"
              priority
            />
          </div>
          <figcaption className="shrink-0 px-2 pb-1 pt-3 text-center text-[0.875rem] leading-snug text-nevoa/70 sm:px-0">
            {atual.alt}
          </figcaption>
        </figure>

        <div className="flex items-center justify-between px-4 pb-4 sm:px-6 sm:pb-6">
          <button
            type="button"
            onClick={anterior}
            className="inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] text-nevoa"
            aria-label="Imagem anterior"
          >
            <Seta direcao="esquerda" className="h-4 w-4" />
            <span aria-hidden="true">Anterior</span>
          </button>
          <button
            type="button"
            onClick={proxima}
            className="inline-flex min-h-11 items-center gap-2 px-2 text-[0.9375rem] text-nevoa"
            aria-label="Próxima imagem"
          >
            <span aria-hidden="true">Próxima</span>
            <Seta className="h-4 w-4" />
          </button>
        </div>
      </div>
    </dialog>
  );
}
