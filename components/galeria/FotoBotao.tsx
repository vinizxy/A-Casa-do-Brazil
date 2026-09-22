"use client";

import Image from "next/image";
import { useRef } from "react";
import { foto, type FotoKey } from "@/content/fotos";
import { useGaleria } from "./GaleriaProvider";

type Props = {
  id: FotoKey;
  sizes: string;
  className?: string;
  quality?: 70 | 78 | 85;
};

// Fotografia da galeria como botão que abre o lightbox. Preenche a célula da
// linha (quem define o tamanho é o container, pela proporção da foto), então
// o object-fit: cover só recorta nas pilhas, e mesmo assim poucos pixels.
export default function FotoBotao({ id, sizes, className = "", quality = 78 }: Props) {
  const { abrir } = useGaleria();
  const ref = useRef<HTMLButtonElement | null>(null);
  const f = foto(id);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => abrir(id, ref.current)}
      aria-label={`Ampliar: ${f.alt}`}
      className={`foto galeria-foto relative block h-full w-full cursor-zoom-in overflow-hidden ${className}`}
    >
      <Image src={f.src} alt={f.alt} fill sizes={sizes} quality={quality} className="object-cover" />
    </button>
  );
}
