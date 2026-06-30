// Motion tokens — shared spring/transition definitions so timing feels
// consistent across every component (the same way color lives in CSS vars).
import type { SpringOptions, Transition } from "framer-motion";

export const spring = {
  // Glides a value to its target; used for odds, bars, counters.
  soft: { type: "spring", stiffness: 90, damping: 18, mass: 1 } as Transition,
  // Snappier — for hover/press microinteractions on controls.
  snappy: { type: "spring", stiffness: 420, damping: 26 } as Transition,
  // Heavier settle — for card entrances.
  settle: { type: "spring", stiffness: 120, damping: 20 } as Transition,
};

// The same "soft" feel, typed for useSpring() (which takes SpringOptions, no `type`).
export const springConfig: { soft: SpringOptions } = {
  soft: { stiffness: 90, damping: 18, mass: 1 },
};

export const ease = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

// Stagger container/child for the market grid entrance.
export const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const gridItem = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring.settle },
};
