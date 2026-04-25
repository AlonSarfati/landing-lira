import { motion } from "framer-motion";
import { strategies } from "../data/liraData";

export function OptimizationPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {strategies.map((strategy) => (
        <article
          key={strategy.name}
          className="border border-white/10 bg-white/[0.04] p-5"
        >
          <h3 className="min-h-12 text-base font-semibold text-white">
            {strategy.name}
          </h3>
          <p className="mt-2 min-h-12 text-sm leading-6 text-slate-300">
            {strategy.note}
          </p>
          <div className="mt-6 space-y-4">
            {[
              { label: "Budget use", value: strategy.budget, color: "bg-blue-400" },
              { label: "Retention impact", value: strategy.retention, color: "bg-emerald-300" },
              { label: "Residual risk", value: strategy.risk, color: "bg-amber-300" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-400">
                  <span>{metric.label}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="h-2 bg-slate-800">
                  <motion.div
                    className={`h-full ${metric.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${metric.value}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
