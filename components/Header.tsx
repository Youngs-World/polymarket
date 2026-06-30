"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ live, onToggleLive }: { live: boolean; onToggleLive: () => void }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 26,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        {/* logo mark */}
        <div
          style={{
            position: "relative",
            width: 40,
            height: 40,
            borderRadius: 11,
            background: "linear-gradient(150deg, var(--accent), color-mix(in srgb, var(--accent) 55%, var(--yes)))",
            display: "grid",
            placeItems: "center",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <motion.span
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 3, height: 16, borderRadius: 2, background: "#fff", marginRight: 8 }}
          />
          <motion.span
            animate={{ scaleY: [1, 0.45, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            style={{ position: "absolute", width: 3, height: 22, borderRadius: 2, background: "#fff" }}
          />
          <motion.span
            animate={{ scaleY: [0.6, 1, 0.6] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            style={{ width: 3, height: 16, borderRadius: 2, background: "#fff", marginLeft: 8 }}
          />
        </div>

        <div>
          <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Market&nbsp;Pulse
          </h1>
          <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "var(--text-muted)" }}>
            A prediction-market interface study
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onToggleLive}
          aria-pressed={live}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 12.5,
            fontWeight: 600,
            color: live ? "var(--yes)" : "var(--text-muted)",
            background: live ? "var(--yes-soft)" : "var(--surface-2)",
            border: `1px solid ${live ? "color-mix(in srgb, var(--yes) 40%, transparent)" : "var(--border)"}`,
            padding: "7px 13px",
            borderRadius: "var(--r-pill)",
          }}
        >
          <motion.span
            animate={live ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] } : { scale: 1, opacity: 0.6 }}
            transition={live ? { duration: 1.6, repeat: Infinity } : spring.snappy}
            style={{ width: 7, height: 7, borderRadius: "var(--r-pill)", background: "currentColor" }}
          />
          {live ? "Live" : "Paused"}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
