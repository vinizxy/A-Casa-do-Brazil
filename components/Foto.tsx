import Image from "next/image";
import { foto, type FotoKey } from "@/content/fotos";

type FotoProps = {
  id: FotoKey;
  /** Atributo sizes do srcset — obrigatório para não baixar imagem maior que o necessário. */
  sizes: string;
  className?: string;
  /** Prioridade de carregamento (só o hero). */
  priority?: boolean;
  quality?: 70 | 78 | 85;
  /**
   * Quando definido, a foto preenche o container com object-fit: cover e o
   * container reserva o espaço com aspect-ratio. Use para recortes editoriais.
   */
  aspecto?: string;
  posicao?: string;
  /** Sobrescreve o alt do registro (raro). */
  alt?: string;
};

// Fotografia oficial via next/image: width/height reservam espaço (CLS ≈ 0),
// srcset/sizes + AVIF/WebP + lazy loading vêm do next/image.
export default function Foto({
  id,
  sizes,
  className = "",
  priority = false,
  quality = 78,
  aspecto,
  posicao,
  alt,
}: FotoProps) {
  const f = foto(id);

  if (aspecto) {
    return (
      <div className={`foto relative overflow-hidden ${className}`} style={{ aspectRatio: aspecto }}>
        <Image
          src={f.src}
          alt={alt ?? f.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className="object-cover"
          style={posicao ? { objectPosition: posicao } : undefined}
        />
      </div>
    );
  }

  return (
    <Image
      src={f.src}
      alt={alt ?? f.alt}
      width={f.width}
      height={f.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={`foto h-auto w-full ${className}`}
    />
  );
}
