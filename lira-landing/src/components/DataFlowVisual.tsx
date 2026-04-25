import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Workflow } from "lucide-react";
import { flowChecks, flowOutputs, flowSources, productMetrics } from "../data/liraData";

function ProductPanel() {
  return (
    <div className="border border-white/10 bg-slate-950 p-4 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="text-sm font-semibold text-white">Lira Compensation Simulator</div>
        <div className="border border-white/10 px-3 py-1 text-xs text-slate-300">
          Keren Active
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {productMetrics.map((metric) => (
          <div key={metric.label} className="border border-white/10 bg-white/[0.04] p-3">
            <div className="text-[11px] text-slate-400">{metric.label}</div>
            <div className="mt-2 text-lg font-semibold text-white">{metric.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr_0.9fr]">
        <div className="border border-white/10 p-3">
          <div className="mb-3 text-xs font-semibold text-slate-300">Monthly payroll trend</div>
          <div className="relative h-24 overflow-hidden bg-slate-900">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:42px_24px]" />
            <svg className="relative h-full w-full" viewBox="0 0 300 96" aria-hidden="true">
              <motion.polyline
                points="0,58 42,57 84,57 126,56 168,56 210,55 252,55 300,54"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </svg>
          </div>
        </div>
        <div className="border border-white/10 p-3">
          <div className="mb-3 text-xs font-semibold text-slate-300">Composition</div>
          <div className="mx-auto h-24 w-24 rounded-full border-[18px] border-blue-400 border-r-emerald-400 border-t-slate-700" />
        </div>
      </div>
    </div>
  );
}

export function DataFlowVisual() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-[0.78fr_1.1fr_0.78fr] lg:items-center">
        <div className="border border-white/10 bg-white/[0.04] p-4">
          <Database className="mb-4 text-blue-200" size={22} />
          <div className="space-y-2">
            {flowSources.map((source) => (
              <div key={source} className="border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                {source}
              </div>
            ))}
          </div>
        </div>
        <div className="relative border border-blue-300/20 bg-blue-400/[0.08] p-5">
          <motion.div
            className="absolute left-0 top-1/2 hidden h-px w-full bg-blue-300/40 lg:block"
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <div className="relative">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Workflow size={18} />
              Lira intelligence engine
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {flowChecks.map((check) => (
                <div key={check} className="flex items-center gap-2 border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-200">
                  <CheckCircle2 size={14} className="text-emerald-300" />
                  {check}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-white/10 bg-white/[0.04] p-4">
          <ArrowRight className="mb-4 text-blue-200" size={22} />
          <div className="space-y-2">
            {flowOutputs.map((output) => (
              <div key={output} className="border border-white/10 bg-slate-950 px-3 py-2 text-sm text-slate-200">
                {output}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductPanel />
    </div>
  );
}
