type SetaProps = { direcao?: "baixo" | "direita" | "esquerda"; className?: string };

// Seta fina em SVG (decorativa; o texto ao lado dá o significado).
export default function Seta({ direcao = "direita", className = "h-4 w-4" }: SetaProps) {
  const rot = direcao === "baixo" ? "rotate(90 12 12)" : direcao === "esquerda" ? "rotate(180 12 12)" : undefined;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <g transform={rot}>
        <path d="M4 12h15m0 0l-6-6m6 6l-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
