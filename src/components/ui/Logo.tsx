import { cn } from "@/lib/cn";

/** The DevLattice mark: nine nodes on a rotated lattice, joined by edges. */
export function LogoMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  const nodes = [
    [20, 4], [12, 12], [28, 12], [4, 20], [20, 20], [36, 20], [12, 28], [28, 28], [20, 36],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8],
  ];
  return (
    <svg viewBox="0 0 40 40" className={cn("shrink-0", className)} aria-hidden="true">
      <defs>
        <linearGradient id="dl-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#38d6ff" />
        </linearGradient>
      </defs>
      <g stroke="url(#dl-g)" strokeWidth="1.6" strokeLinecap="round">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
            className={animated ? "dl-edge" : undefined}
            style={animated ? { animationDelay: `${i * 60}ms` } : undefined}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 4 ? 3.2 : 2.2} fill={i === 4 ? "#fff" : "url(#dl-g)"} />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight">DevLattice</span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.32em] text-mist">Academy</span>
      </span>
    </span>
  );
}
