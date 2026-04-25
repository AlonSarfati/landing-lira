import { motion } from "framer-motion";
import type { Capability } from "../data/liraData";

type CapabilityCardProps = {
  capability: Capability;
};

export function CapabilityCard({ capability }: CapabilityCardProps) {
  const Icon = capability.icon;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group border border-white/10 bg-white/[0.04] p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="border border-blue-300/20 bg-blue-400/10 p-2 text-blue-200">
          <Icon size={20} />
        </div>
        <div className="flex h-12 items-end gap-1.5">
          {capability.bars.map((height) => (
            <motion.span
              key={`${capability.title}-${height}`}
              initial={{ height: 12 }}
              whileInView={{ height }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-2 bg-blue-400/70"
            />
          ))}
        </div>
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">{capability.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{capability.body}</p>
      <div className="mt-5 h-px bg-gradient-to-r from-blue-400/70 via-blue-400/20 to-transparent" />
    </motion.article>
  );
}
