"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

type Pt = readonly [number, number];

/** Catmull-Rom → cubic bézier: a smooth curve through every point, no overshoot
 *  worth worrying about for 0–1 data. Much prettier than a jagged polyline. */
function smooth(pts: Pt[]): string {
  if (pts.length < 2) return pts.length ? `M${pts[0][0]} ${pts[0][1]}` : "";
  const d = [`M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`);
  }
  return d.join(" ");
}

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
  const pad = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts: Pt[] = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - 2 * pad);
    const y = pad + (1 - (v - min) / range) * (height - 2 * pad);
    return [x, y] as const;
  });

  const line = smooth(pts);
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
            <stop offset="0%" stopColor={color} stopOpacity={0.32} />
            <stop offset="70%" stopColor={color} stopOpacity={0.06} />
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
        {/* Plain solid stroke — always fully rendered. (A stroke-dash draw-in
            breaks on live `d` updates, so we reveal via the area fade instead.) */}
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth={2.25}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: `drop-shadow(0 0 5px ${color})`, opacity: 0.95 }}
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
            animate={{ scale: [1, 2.8, 1], opacity: [0.5, 0, 0.5] }}
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
            boxShadow: `0 0 0 3px var(--surface), 0 0 10px ${color}`,
          }}
        />
      </div>
    </div>
  );
}
