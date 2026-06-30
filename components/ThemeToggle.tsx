"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { Moon, Sun } from "./icons";

type Theme = "dark" | "light";

/** Token-driven theme switch — flips [data-theme] on <html>, persisted. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof localStorage !== "undefined" && localStorage.getItem("mp-theme")) as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("mp-theme", next);
    } catch {
      /* private mode — ignore */
    }
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      style={{
        width: 60,
        height: 32,
        borderRadius: "var(--r-pill)",
        border: "1px solid var(--border-strong)",
        background: "var(--surface-2)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <motion.span
        animate={{ left: isDark ? 3 : 31 }}
        transition={spring.snappy}
        style={{
          position: "absolute",
          top: 3,
          width: 24,
          height: 24,
          borderRadius: "var(--r-pill)",
          background: "var(--surface)",
          boxShadow: "var(--shadow-soft)",
          display: "grid",
          placeItems: "center",
          color: isDark ? "var(--accent)" : "#e8a33d",
        }}
      >
        {isDark ? <Moon /> : <Sun />}
      </motion.span>
    </button>
  );
}
