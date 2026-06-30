"use client";

import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { usd, type Market } from "@/lib/markets";
import { OddsTicker } from "./OddsTicker";
import { ProbabilityBar } from "./ProbabilityBar";
import { Sparkline } from "./Sparkline";
import { BuyButtons } from "./BuyButtons";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: "var(--text-muted)",
        background: "var(--surface-2)",
        border: "1px solid var(--border)",
        padding: "4px 10px",
        borderRadius: "var(--r-pill)",
      }}
    >
      {children}
    </span>
  );
}

const lineColor = (m: Market) =>
  m.dir === -1 ? "var(--no)" : m.prob >= 0.5 ? "var(--yes)" : "var(--accent)";

export function MarketCard({ market, featured = false }: { market: Market; featured?: boolean }) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 18, scale: 0.985 },
        show: { opacity: 1, y: 0, scale: 1, transition: spring.settle },
      }}
      whileHover={{ y: -4 }}
      transition={spring.snappy}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--r-lg)",
        padding: featured ? 24 : 18,
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: featured ? 18 : 13,
        height: "100%",
      }}
    >
      {/* meta row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <Chip>{market.category}</Chip>
        <span className="tnum" style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 500 }}>
          {usd(market.volume)} Vol
        </span>
      </div>

      {/* question */}
      <h3
        style={{
          margin: 0,
          fontSize: featured ? 22 : 15.5,
          fontWeight: 650,
          lineHeight: 1.28,
          letterSpacing: "-0.01em",
          color: "var(--text)",
          ...(featured
            ? {}
            : {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
                minHeight: 40,
              }),
        }}
      >
        {market.question}
      </h3>

      {featured ? (
        <>
          <OddsTicker prob={market.prob} dir={market.dir} size={56} />
          <Sparkline data={market.history} color={lineColor(market)} height={72} />
          <ProbabilityBar prob={market.prob} />
          <BuyButtons prob={market.prob} />
        </>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <OddsTicker prob={market.prob} dir={market.dir} size={30} />
            <div style={{ flex: 1, maxWidth: 150 }}>
              <Sparkline data={market.history} color={lineColor(market)} height={36} />
            </div>
          </div>
          <ProbabilityBar prob={market.prob} compact />
        </>
      )}
    </motion.article>
  );
}
