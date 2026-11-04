import type { Project } from "@/data/content";
import { cn } from "@/lib/cn";

/**
 * Stylised interface mockups that act as project thumbnails until real
 * screenshots are supplied. Pure CSS, so they stay crisp and lightweight.
 */
export function ProjectMock({ project, className }: { project: Project; className?: string }) {
  const h = project.hue;
  const a = `hsl(${h} 90% 68%)`;
  const b = `hsl(${(h + 45) % 360} 90% 62%)`;
  const aA = (o: number) => `hsl(${h} 90% 68% / ${o})`;
  const bA = (o: number) => `hsl(${(h + 45) % 360} 90% 62% / ${o})`;
  const bar = "rounded-full bg-white/10";

  const body = (() => {
    switch (project.mock) {
      case "dashboard":
        return (
          <div className="grid h-full grid-cols-[22%_1fr] gap-2">
            <div className="space-y-1.5 rounded-md bg-white/[0.04] p-2">
              {[70, 55, 80, 45, 60].map((w, i) => <div key={i} className={cn(bar, "h-1.5")} style={{ width: `${w}%`, background: i === 1 ? a : undefined }} />)}
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-2">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-md bg-white/[0.05] p-2">
                    <div className={cn(bar, "mb-1.5 h-1 w-1/2")} />
                    <div className="h-2.5 w-3/4 rounded-sm" style={{ background: i === 0 ? a : "rgba(255,255,255,.2)" }} />
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-1.5 rounded-md bg-white/[0.04] p-2">
                {[40, 65, 50, 80, 58, 92, 70, 86, 62, 96].map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, background: `linear-gradient(${a}, ${bA(0.05)})` }} />
                ))}
              </div>
            </div>
          </div>
        );
      case "chat":
        return (
          <div className="flex h-full flex-col justify-end gap-2 px-[8%]">
            <div className="ml-auto h-4 w-1/2 rounded-xl rounded-br-sm bg-white/15" />
            <div className="h-10 w-3/4 rounded-xl rounded-bl-sm p-2" style={{ background: `linear-gradient(135deg, ${aA(0.28)}, ${bA(0.15)})` }}>
              <div className={cn(bar, "mb-1 h-1 w-4/5 bg-white/40")} />
              <div className={cn(bar, "h-1 w-3/5 bg-white/30")} />
            </div>
            <div className="ml-auto h-4 w-2/5 rounded-xl rounded-br-sm bg-white/15" />
            <div className="mt-1 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5">
              <div className={cn(bar, "h-1.5 flex-1")} />
              <div className="h-4 w-4 rounded-full" style={{ background: a }} />
            </div>
          </div>
        );
      case "commerce":
        return (
          <div className="grid h-full grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-1 rounded-md bg-white/[0.05] p-1.5">
                <div className="flex-1 rounded-sm" style={{ background: `linear-gradient(${120 + i * 30}deg, ${i % 2 ? aA(0.35) : bA(0.35)}, transparent)` }} />
                <div className={cn(bar, "h-1 w-3/4")} />
                <div className="h-1 w-1/3 rounded-full" style={{ background: a }} />
              </div>
            ))}
          </div>
        );
      case "mobile":
        return (
          <div className="flex h-full items-center justify-center gap-4">
            {[0, 1].map((p) => (
              <div key={p} className={cn("h-[92%] w-[28%] rounded-[14px] border border-white/15 bg-[#0a0c1c] p-1.5", p === 1 && "translate-y-3")}>
                <div className="mx-auto mb-1.5 h-1 w-1/3 rounded-full bg-white/20" />
                <div className="mb-1.5 aspect-square rounded-full border-[5px]" style={{ borderColor: `${a}`, borderRightColor: "rgba(255,255,255,.1)" }} />
                {[80, 60, 70].map((w, i) => <div key={i} className={cn(bar, "mb-1 h-1.5")} style={{ width: `${w}%` }} />)}
              </div>
            ))}
          </div>
        );
      case "landing":
        return (
          <div className="flex h-full flex-col items-start justify-center gap-2 px-[8%]">
            <div className="h-1.5 w-12 rounded-full" style={{ background: a }} />
            <div className="h-4 w-4/5 rounded-sm bg-white/80" />
            <div className="h-4 w-3/5 rounded-sm bg-white/50" />
            <div className="flex gap-1.5 pt-1">
              <div className="h-4 w-14 rounded-full" style={{ background: `linear-gradient(90deg, ${a}, ${b})` }} />
              <div className="h-4 w-12 rounded-full border border-white/20" />
            </div>
            <div className="mt-2 flex gap-1.5">
              {[a, b, "#fff", "#0b0d1c"].map((c, i) => <div key={i} className="h-5 w-5 rounded-full border border-white/20" style={{ background: c }} />)}
            </div>
          </div>
        );
      case "analytics":
        return (
          <div className="relative h-full rounded-md bg-white/[0.03] p-2">
            <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="h-full w-full">
              <path d="M0 80 C 20 70, 30 75, 50 60 S 80 40, 100 50 S 140 20, 160 28 S 190 10, 200 12" fill="none" stroke={a} strokeWidth="2" />
              <path d="M0 80 C 20 70, 30 75, 50 60 S 80 40, 100 50 S 140 20, 160 28 S 190 10, 200 12 L 200 100 L 0 100 Z" fill={a} opacity="0.12" />
              <path d="M100 50 S 140 35, 160 38 S 190 22, 200 26" fill="none" stroke={b} strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
          </div>
        );
    }
  })();

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 90% at 80% 0%, hsl(${h} 70% 22%), #070914 65%)` }}
      role="img"
      aria-label={`Interface preview for ${project.title.replace(/[[\]]/g, "")}`}
    >
      <div className="absolute inset-x-[8%] bottom-[-8%] top-[17%] flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b0e20]/90 shadow-2xl transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]">
        <div className="flex items-center gap-1 border-b border-white/5 px-2 py-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c, opacity: 0.8 }} />)}
          <span className="ml-2 h-1.5 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 p-2.5">{body}</div>
      </div>
    </div>
  );
}
