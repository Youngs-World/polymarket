"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLiveMarkets } from "@/lib/useLiveMarkets";
import { gridContainer } from "@/lib/motion";
import { Header } from "@/components/Header";
import { MarketCard } from "@/components/MarketCard";

export default function Page() {
  const { markets, live, setLive } = useLiveMarkets();
  const reduce = useReducedMotion();
  const [featured, ...rest] = markets;

  return (
    <main className="mp-page">
      <Header live={live} onToggleLive={() => setLive((v) => !v)} />

      <motion.div
        variants={gridContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <MarketCard market={featured} featured />

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12.5,
              fontWeight: 600,
              color: "var(--text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            More markets
            <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          <div className="mp-grid">
            {rest.map((m) => (
              <MarketCard key={m.id} market={m} />
            ))}
          </div>
        </div>
      </motion.div>

      <footer
        style={{
          marginTop: 34,
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 12.5,
          color: "var(--text-dim)",
        }}
      >
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {["React", "Next.js", "TypeScript", "Framer Motion"].map((t) => (
            <span
              key={t}
              style={{
                padding: "4px 10px",
                borderRadius: "var(--r-pill)",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <span>
          An interaction & motion study by{" "}
          <a
            href="https://github.com/Youngs-World"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--text-muted)", fontWeight: 600, borderBottom: "1px solid var(--border-strong)" }}
          >
            Clayton Young
          </a>
          . Data is simulated.
        </span>
      </footer>
    </main>
  );
}
