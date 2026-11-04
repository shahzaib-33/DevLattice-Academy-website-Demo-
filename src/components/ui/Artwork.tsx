import { useId } from "react";
import type { Course } from "@/data/courses";
import { cn } from "@/lib/cn";

const W = 480;
const H = 300;

/** Original generative cover art, so no stock or copyrighted imagery is needed. */
export function CourseArt({ hue, pattern, label, className }: { hue: number; pattern: Course["pattern"]; label?: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  const c1 = `hsl(${hue} 92% 68%)`;
  const c2 = `hsl(${(hue + 50) % 360} 90% 62%)`;

  const content = (() => {
    switch (pattern) {
      case "lattice": {
        const els: React.ReactNode[] = [];
        for (let r = 0; r < 7; r++)
          for (let c = 0; c < 11; c++) {
            const x = c * 48 + (r % 2 ? 24 : 0);
            const y = r * 44 + 20;
            const d = Math.hypot(x - 300, y - 150);
            const o = Math.max(0.08, 1 - d / 320);
            els.push(<circle key={`${r}-${c}`} cx={x} cy={y} r={d < 90 ? 3.2 : 2} fill={c1} opacity={o} />);
            if (c < 10) els.push(<line key={`h${r}-${c}`} x1={x} y1={y} x2={x + 48} y2={y} stroke={c1} strokeOpacity={o * 0.35} />);
            if (r < 6) els.push(<line key={`v${r}-${c}`} x1={x} y1={y} x2={x + (r % 2 ? 24 : -24) + 24} y2={y + 44} stroke={c2} strokeOpacity={o * 0.3} />);
          }
        return els;
      }
      case "orbit":
        return (
          <g transform={`translate(${W * 0.62} ${H * 0.52})`}>
            {[40, 75, 112, 150, 190].map((r, i) => (
              <ellipse key={r} rx={r * 1.25} ry={r * 0.55} fill="none" stroke={i % 2 ? c2 : c1} strokeOpacity={0.55 - i * 0.08} transform={`rotate(${-18 + i * 6})`} />
            ))}
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={Math.cos(i * 1.9) * (50 + i * 36)} cy={Math.sin(i * 1.9) * (22 + i * 16)} r={4 - i * 0.4} fill="#fff" />
            ))}
            <circle r="22" fill={`url(#core-${id})`} />
          </g>
        );
      case "wave":
        return Array.from({ length: 14 }).map((_, i) => {
          const amp = 18 + i * 3;
          const yb = 60 + i * 15;
          let d = `M -10 ${yb}`;
          for (let x = -10; x <= W + 10; x += 20) d += ` L ${x} ${yb + Math.sin(x / 55 + i * 0.45) * amp * Math.sin(i / 4 + 0.6)}`;
          return <path key={i} d={d} fill="none" stroke={i % 3 ? c1 : c2} strokeOpacity={0.15 + (i / 14) * 0.55} strokeWidth={1.2} />;
        });
      case "grid": {
        const lines: React.ReactNode[] = [];
        const hy = 120;
        for (let i = -12; i <= 12; i++) lines.push(<line key={`v${i}`} x1={W / 2 + i * 8} y1={hy} x2={W / 2 + i * 70} y2={H} stroke={c1} strokeOpacity={0.4} />);
        for (let j = 0; j < 9; j++) {
          const y = hy + Math.pow(j / 8, 2) * (H - hy);
          lines.push(<line key={`h${j}`} x1={0} y1={y} x2={W} y2={y} stroke={c2} strokeOpacity={0.15 + j * 0.05} />);
        }
        const bars = [38, 62, 46, 84, 70, 98];
        bars.forEach((b, i) => lines.push(<rect key={`b${i}`} x={120 + i * 42} y={hy - b} width={22} height={b} rx={4} fill={i === 5 ? c2 : c1} opacity={0.35 + i * 0.1} />));
        return lines;
      }
      case "prism":
        return (
          <g>
            {Array.from({ length: 9 }).map((_, i) => (
              <polygon
                key={i}
                points={`${300 - i * 6},${40 + i * 4} ${420 - i * 3},${250 - i * 6} ${180 + i * 4},${250 - i * 4}`}
                fill="none"
                stroke={i % 2 ? c2 : c1}
                strokeOpacity={0.15 + i * 0.08}
                transform={`rotate(${i * 4} 300 170)`}
              />
            ))}
            <polygon points="300,90 360,210 240,210" fill={`url(#core-${id})`} opacity="0.9" />
          </g>
        );
    }
  })();

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("block h-full w-full", className)} preserveAspectRatio="xMidYMid slice" role="img" aria-label={label ?? "Course artwork"}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 55% 14%)`} />
          <stop offset="1" stopColor="#05060d" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="0.68" cy="0.45" r="0.6">
          <stop offset="0" stopColor={c1} stopOpacity="0.55" />
          <stop offset="1" stopColor={c1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`core-${id}`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.4" stopColor={c1} />
          <stop offset="1" stopColor={c2} stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#bg-${id})`} />
      <rect width={W} height={H} fill={`url(#glow-${id})`} />
      {content}
    </svg>
  );
}

/** Abstract portrait used until official team photography is supplied. */
export function PortraitPlaceholder({ hue, initials, className }: { hue: number; initials: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 300 360" className={cn("block h-full w-full", className)} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id={`pb-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 50% 20%)`} />
          <stop offset="1" stopColor="#070914" />
        </linearGradient>
        <linearGradient id={`pf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={`hsl(${hue} 90% 72%)`} stopOpacity="0.9" />
          <stop offset="1" stopColor={`hsl(${(hue + 60) % 360} 90% 60%)`} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="300" height="360" fill={`url(#pb-${id})`} />
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="360" stroke="#fff" strokeOpacity="0.04" />
      ))}
      <circle cx="150" cy="140" r="58" fill={`url(#pf-${id})`} opacity="0.85" />
      <path d="M40 360 C 50 260, 110 230, 150 230 C 190 230, 250 260, 260 360 Z" fill={`url(#pf-${id})`} opacity="0.55" />
      <text x="150" y="152" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="30" fill="#0b0d1c" fontWeight="700" letterSpacing="2">
        {initials}
      </text>
    </svg>
  );
}
