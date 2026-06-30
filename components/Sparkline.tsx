"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Lightweight SVG sparkline. The line draws itself in on mount (pathLength)
 * and the area fades up beneath it. The live "pulse" dot is an HTML overlay
 * positioned by percentage so it stays a perfect circle even though the SVG
 * is stretched to full width (vector-effect keeps the stroke crisp too).
 */
export function Sparkline({
  data,
  color,
  height = 64,
}: {
  data: number[];
  color: string;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  const w = 320;
  const pad = 5;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - 2 * pad);
    const y = pad + (1 - (v - min) / range) * (height - 2 * pad);
    return [x, y] as const;
  });

  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(2)} ${height} L${pts[0][0].toFixed(2)} ${height} Z`;
  const last = pts[pts.length - 1];
  const dotLeft = (last[0] / w) * 100;
  const dotTop = (last[1] / height) * 100;

  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <svg
        viewBox={`0 0 ${w} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        <defs>
          <linearGradient id={`fill-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <motion.path
          d={area}
          fill={`url(#fill-${gid})`}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: ease.out }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: ease.out }}
        />
      </svg>

      {/* live edge dot — HTML overlay, immune to the SVG's x-stretch */}
      <div
        style={{
          position: "absolute",
          left: `${dotLeft}%`,
          top: `${dotTop}%`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {!reduce && (
          <motion.span
            animate={{ scale: [1, 2.6, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: -4,
              width: 14,
              height: 14,
              borderRadius: "var(--r-pill)",
              background: color,
            }}
          />
        )}
        <span
          style={{
            display: "block",
            width: 7,
            height: 7,
            borderRadius: "var(--r-pill)",
            background: color,
            boxShadow: `0 0 0 3px var(--surface)`,
          }}
        />
      </div>
    </div>
  );
}
