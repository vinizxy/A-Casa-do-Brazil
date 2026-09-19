"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { FotoKey } from "@/content/fotos";
import Lightbox from "./Lightbox";

type GaleriaContexto = {
  abrir: (key: FotoKey, origem: HTMLElement | null) => void;
};

const Contexto = createContext<GaleriaContexto | null>(null);

export function useGaleria() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useGaleria precisa estar dentro de <GaleriaProvider>");
  return ctx;
}

type Props = { fotos: FotoKey[]; children: ReactNode };

// Guarda a ordem das fotos da galeria e controla o lightbox. O elemento que
// abriu recebe o foco de volta ao fechar.
export default function GaleriaProvider({ fotos, children }: Props) {
  const [indice, setIndice] = useState<number | null>(null);
  const [origem, setOrigem] = useState<HTMLElement | null>(null);

  const abrir = useCallback(
    (key: FotoKey, el: HTMLElement | null) => {
      const i = fotos.indexOf(key);
      if (i === -1) return;
      setOrigem(el);
      setIndice(i);
    },
    [fotos],
  );

  const fechar = useCallback(() => {
    setIndice(null);
    origem?.focus();
  }, [origem]);

  const valor = useMemo(() => ({ abrir }), [abrir]);

  return (
    <Contexto.Provider value={valor}>
      {children}
      <Lightbox fotos={fotos} indice={indice} onMudar={setIndice} onFechar={fechar} />
    </Contexto.Provider>
  );
}
