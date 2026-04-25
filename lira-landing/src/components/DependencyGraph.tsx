import { motion } from "framer-motion";

const nodes = [
  { label: "Base", x: "8%", y: "64%" },
  { label: "Bonus", x: "42%", y: "22%" },
  { label: "Pension", x: "68%", y: "58%" },
  { label: "Cost", x: "88%", y: "18%" },
];

export function DependencyGraph() {
  return (
    <div className="relative h-28 w-full border border-white/10 bg-white/[0.035] md:w-96">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 112" aria-hidden="true">
        <motion.path
          d="M42 76 C105 20 145 22 172 32 S245 72 282 66"
          fill="none"
          stroke="rgba(96,165,250,0.55)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M172 32 C228 12 285 8 318 24"
          fill="none"
          stroke="rgba(129,140,248,0.7)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          animate={{ strokeDashoffset: [0, -28] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 border border-blue-300/30 bg-slate-950 px-3 py-1 text-xs font-semibold text-blue-100"
          style={{ left: node.x, top: node.y }}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}
