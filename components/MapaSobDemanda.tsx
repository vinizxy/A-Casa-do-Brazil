"use client";

import Image from "next/image";
import { useState } from "react";
import { LogoSimbolo } from "./brand/Logo";
import { foto, type FotoKey } from "@/content/fotos";

type Props = {
  src: string;
  titulo: string;
  rotulo: string;
  endereco: string;
  /** Fotografia da casa exibida (tingida de verde) enquanto o mapa não é aberto. */
  capa: FotoKey;
};

// O mapa só é carregado quando a pessoa pede: nada do Google entra na página
// antes disso. Enquanto isso, uma fotografia da casa tingida no verde da
// seção, com o símbolo, o endereço e o botão.
export default function MapaSobDemanda({ src, titulo, rotulo, endereco, capa }: Props) {
  const [carregar, setCarregar] = useState(false);
  const f = foto(capa);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color-mix(in_oklab,var(--verde-profundo)_80%,black)] sm:aspect-[16/9] lg:aspect-[21/8]">
      {carregar ? (
        <iframe
          title={titulo}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image src={f.src} alt="" fill sizes="(min-width: 1440px) 90rem, 100vw" quality={70} className="object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[color-mix(in_oklab,var(--verde-profundo)_78%,transparent)]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <LogoSimbolo className="h-16 w-auto text-nevoa" title="" />
            <p className="max-w-[28ch] text-[0.9375rem] text-nevoa">{endereco}</p>
            <button
              type="button"
              onClick={() => setCarregar(true)}
              className="botao bg-[var(--verde-profundo)] text-nevoa"
            >
              {rotulo}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
