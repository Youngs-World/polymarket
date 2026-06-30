"use client";

import { useEffect } from "react";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { spring, springConfig } from "@/lib/motion";

/**
 * The headline YES probability. The number glides to its target on a spring
 * (snaps instantly for reduced-motion users) and the direction chip flashes
 * green/red on each move. tabular-nums keeps the digits from shifting width.
 */
export function OddsTicker({
  prob,
  dir,
  size = 56,
}: {
  prob: number;
  dir: 1 | -1 | 0;
  size?: number;
}) {
  const reduce = useReducedMotion();
  const mv = useSpring(prob, springConfig.soft);

  useEffect(() => {
    if (reduce) mv.jump(prob);
    else mv.set(prob);
  }, [prob, reduce, mv]);

  const pct = useTransform(mv, (v) => `${Math.round(v * 100)}`);
  const color =
    dir === 1 ? "var(--yes)" : dir === -1 ? "var(--no)" : "var(--text-dim)";
  const glyph = dir === 1 ? "▲" : dir === -1 ? "▼" : "•";

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
      <div
        className="tnum"
        style={{
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}
      >
        <motion.span>{pct}</motion.span>
        <span style={{ fontSize: size * 0.45, color: "var(--text-muted)", fontWeight: 600 }}>%</span>
      </div>
      <motion.span
        key={dir}
        initial={reduce ? false : { opacity: 0.4, y: dir === 1 ? 4 : -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.snappy}
        className="tnum"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontSize: 13,
          fontWeight: 600,
          color,
          background: dir === 1 ? "var(--yes-soft)" : dir === -1 ? "var(--no-soft)" : "transparent",
          padding: "4px 9px",
          borderRadius: "var(--r-pill)",
        }}
      >
        <span style={{ fontSize: 10 }}>{glyph}</span>
        chance
      </motion.span>
    </div>
  );
}
