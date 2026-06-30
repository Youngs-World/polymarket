"use client";

import { useEffect, useState } from "react";
import { SEED_MARKETS, tick, type Market } from "./markets";

/**
 * Drives the "live" feel: after mount, every `intervalMs` it advances one
 * market at a time (round-robin) so updates feel organic rather than a
 * synchronized blink. Pausable, and inert until mounted so SSR/CSR agree.
 */
export function useLiveMarkets(intervalMs = 1900) {
  const [markets, setMarkets] = useState<Market[]>(SEED_MARKETS);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    let cursor = 0;
    const id = window.setInterval(() => {
      setMarkets((prev) => {
        const next = [...prev];
        const i = cursor % next.length;
        next[i] = tick(next[i]);
        cursor += 1;
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [live, intervalMs]);

  return { markets, live, setLive };
}
