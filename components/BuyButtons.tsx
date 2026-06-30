"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";

/** Buy Yes / Buy No controls with spring hover-lift and press feedback. */
export function BuyButtons({ prob }: { prob: number }) {
  const yes = (prob * 100).toFixed(0);
  const no = ((1 - prob) * 100).toFixed(0);

  const base: React.CSSProperties = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "13px 16px",
    borderRadius: "var(--r-md)",
    fontSize: 14.5,
    fontWeight: 600,
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <motion.button
        whileHover={{ y: -2, boxShadow: "0 14px 30px -14px var(--yes)" }}
        whileTap={{ scale: 0.97 }}
        transition={spring.snappy}
        style={{
          ...base,
          color: "var(--yes)",
          background: "var(--yes-soft)",
          border: "1px solid color-mix(in srgb, var(--yes) 50%, transparent)",
        }}
      >
        <span>Buy Yes</span>
        <span className="tnum" style={{ opacity: 0.85 }}>{yes}¢</span>
      </motion.button>

      <motion.button
        whileHover={{ y: -2, boxShadow: "0 14px 30px -14px var(--no)" }}
        whileTap={{ scale: 0.97 }}
        transition={spring.snappy}
        style={{
          ...base,
          color: "var(--no)",
          background: "var(--no-soft)",
          border: "1px solid color-mix(in srgb, var(--no) 50%, transparent)",
        }}
      >
        <span>Buy No</span>
        <span className="tnum" style={{ opacity: 0.85 }}>{no}¢</span>
      </motion.button>
    </div>
  );
}
