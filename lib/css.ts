import type { CSSProperties } from "react";

// Custom properties (--x) em `style` sem brigar com o tipo CSSProperties.
export function cssVars(vars: Record<`--${string}`, string | number>): CSSProperties {
  return vars as CSSProperties;
}
