"use client";

import { useState } from "react";
import { LogoSimbolo } from "./brand/Logo";

type Props = {
  src: string;
  titulo: string;
  rotulo: string;
  endereco: string;
};

// O mapa só é carregado quando a pessoa pede: nada do Google entra na página
// antes disso. Enquanto isso, um painel silencioso com o símbolo da casa.
export default function MapaSobDemanda({ src, titulo, rotulo, endereco }: Props) {
  const [carregar, setCarregar] = useState(false);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color-mix(in_oklab,var(--verde-profundo)_80%,black)] sm:aspect-[16/10] lg:aspect-[21/9]">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <LogoSimbolo className="h-16 w-auto text-salvia" title="" />
          <p className="max-w-[28ch] text-[0.9375rem] text-nevoa-suave">{endereco}</p>
          <button type="button" onClick={() => setCarregar(true)} className="botao text-nevoa">
            {rotulo}
          </button>
        </div>
      )}
    </div>
  );
}
