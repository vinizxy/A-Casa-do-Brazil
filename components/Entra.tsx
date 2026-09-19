"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type EntraProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "figure" | "li";
};

// Entrada suave só por opacidade quando o elemento chega à tela. Sem JS o
// conteúdo já nasce visível (classe .entra vira .visivel apenas no cliente e
// o CSS de reduced-motion força opacidade 1).
export default function Entra({ children, className = "", as = "div" }: EntraProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      // Sem IntersectionObserver: mostra direto (a classe cai via CSS no próximo frame).
      el.classList.add("visivel");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`entra ${visivel ? "visivel" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
