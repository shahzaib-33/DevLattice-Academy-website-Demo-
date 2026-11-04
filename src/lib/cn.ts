export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Builds a deterministic gradient from a hue, used by generated artwork. */
export function hueGradient(hue: number, angle = 135) {
  return `linear-gradient(${angle}deg, hsl(${hue} 90% 66%) 0%, hsl(${(hue + 40) % 360} 85% 55%) 50%, hsl(${(hue + 300) % 360} 80% 30%) 100%)`;
}
