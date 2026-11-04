"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[80svh] items-center justify-center px-6 text-center">
      <div aria-hidden className="absolute inset-0 grid-bg" />
      <div className="relative">
        <p className="eyebrow">Unexpected error</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">Something broke in the lattice.</h1>
        <p className="mx-auto mt-3 max-w-md text-mist">Please try again. If the problem continues, refresh the page.</p>
        <button onClick={reset} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink">
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
      </div>
    </section>
  );
}
