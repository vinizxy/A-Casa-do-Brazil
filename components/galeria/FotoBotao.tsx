"use client";

import Image from "next/image";
import { useRef } from "react";
import { foto, type FotoKey } from "@/content/fotos";
import { useGaleria } from "./GaleriaProvider";

type Props = {
  id: FotoKey;
  sizes: string;
  /** Classe do wrapper quando a foto deve preencher um recorte (object-fit: cover). */
  recorte?: string;
  className?: string;
  quality?: 70 | 78 | 85;
};

// Fotografia da galeria como botão que abre o lightbox. Com `recorte`, a
// imagem preenche o container (aspect-ratio definido pela classe); sem ele,
// usa a proporção natural com width/height reservados.
export default function FotoBotao({ id, sizes, recorte, className = "", quality = 78 }: Props) {
  const { abrir } = useGaleria();
  const ref = useRef<HTMLButtonElement | null>(null);
  const f = foto(id);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => abrir(id, ref.current)}
      aria-label={`Ampliar: ${f.alt}`}
      className={`foto grupo-foto relative block w-full cursor-zoom-in overflow-hidden text-left ${recorte ?? ""} ${className}`}
    >
      {recorte ? (
        <Image src={f.src} alt={f.alt} fill sizes={sizes} quality={quality} className="foto-zoom object-cover" />
      ) : (
        <Image
          src={f.src}
          alt={f.alt}
          width={f.width}
          height={f.height}
          sizes={sizes}
          quality={quality}
          className="foto-zoom block h-auto w-full"
        />
      )}
    </button>
  );
}
