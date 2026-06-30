// Market data + the live-tick simulation.
//
// Seed history is hard-coded (deterministic) so the static prerender and the
// first client render match exactly — no hydration mismatch. All randomness
// happens only after mount, inside useLiveMarkets (client-side).

export type Market = {
  id: string;
  question: string;
  category: string;
  /** YES probability, 0..1 */
  prob: number;
  /** recent YES-probability samples, oldest → newest */
  history: number[];
  /** 24h traded volume, USD */
  volume: number;
  /** last price move direction, for the flash/arrow */
  dir: 1 | -1 | 0;
};

export const SEED_MARKETS: Market[] = [
  {
    id: "fed",
    question: "Will the Fed cut rates at the September meeting?",
    category: "Economics",
    prob: 0.67,
    volume: 4_812_400,
    dir: 1,
    history: [0.52, 0.5, 0.55, 0.58, 0.56, 0.6, 0.63, 0.61, 0.64, 0.66, 0.65, 0.67],
  },
  {
    id: "btc",
    question: "Bitcoin above $150,000 before year end?",
    category: "Crypto",
    prob: 0.41,
    volume: 9_320_900,
    dir: -1,
    history: [0.48, 0.5, 0.47, 0.49, 0.46, 0.44, 0.45, 0.43, 0.42, 0.44, 0.42, 0.41],
  },
  {
    id: "agi",
    question: "Will a major lab declare AGI before 2030?",
    category: "Technology",
    prob: 0.29,
    volume: 2_140_300,
    dir: 1,
    history: [0.22, 0.23, 0.24, 0.23, 0.25, 0.26, 0.25, 0.27, 0.28, 0.27, 0.28, 0.29],
  },
  {
    id: "wc",
    question: "Will the host nation reach the World Cup semifinal?",
    category: "Sports",
    prob: 0.53,
    volume: 1_770_800,
    dir: 0,
    history: [0.5, 0.49, 0.51, 0.52, 0.5, 0.51, 0.53, 0.52, 0.54, 0.53, 0.52, 0.53],
  },
];

const MAX_HISTORY = 28;
const clamp = (n: number, lo = 0.04, hi = 0.96) => Math.min(hi, Math.max(lo, n));

/** Advance one market by a small, mean-reverting random step. Client-only. */
export function tick(m: Market): Market {
  // Gentle mean reversion toward 0.5 keeps the sim from drifting to an edge.
  const pull = (0.5 - m.prob) * 0.04;
  const noise = (Math.random() - 0.5) * 0.05;
  const next = clamp(m.prob + pull + noise);
  const delta = next - m.prob;
  const dir: Market["dir"] = Math.abs(delta) < 0.0015 ? 0 : delta > 0 ? 1 : -1;
  const history = [...m.history, next].slice(-MAX_HISTORY);
  return { ...m, prob: next, dir, history };
}

export const usd = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
      ? `$${(n / 1_000).toFixed(0)}K`
      : `$${n}`;
