"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring } from "@/lib/motion";

/** YES/NO split bar. The YES fill springs to its new width on each tick. */
export function ProbabilityBar({ prob, compact = false }: { prob: number; compact?: boolean }) {
  const reduce = useReducedMotion();
  const yes = Math.round(prob * 100);
  const transition = reduce ? { duration: 0 } : spring.soft;

  return (
    <div>
      {!compact && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12.5,
            fontWeight: 600,
            marginBottom: 9,
          }}
        >
          <span style={{ color: "var(--yes)" }}>Yes · {yes}%</span>
          <span style={{ color: "var(--no)" }}>No · {100 - yes}%</span>
        </div>
      )}
      <div
        style={{
          position: "relative",
          height: compact ? 6 : 10,
          borderRadius: "var(--r-pill)",
          background: "var(--no-soft)",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${yes}%` }}
          transition={transition}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "var(--r-pill)",
            background: "linear-gradient(90deg, var(--yes), var(--yes-strong))",
          }}
        />
      </div>
    </div>
  );
}
