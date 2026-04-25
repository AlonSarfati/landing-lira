type AuditRow = {
  item: string;
  expected: string;
  actual: string;
  difference: string;
  risk: string;
};

type AuditComparisonProps = {
  rows: AuditRow[];
};

export function AuditComparison({ rows }: AuditComparisonProps) {
  return (
    <div className="overflow-hidden border border-white/10 bg-white/[0.04]">
      <div className="hidden grid-cols-[1.35fr_0.7fr_0.7fr_0.7fr_0.5fr] border-b border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 md:grid">
        <div>Rule</div>
        <div>Expected</div>
        <div>Actual</div>
        <div>Difference</div>
        <div>Risk</div>
      </div>
      {rows.map((row) => (
        <div
          key={row.item}
          className="grid gap-3 border-b border-white/10 px-5 py-4 text-sm last:border-b-0 md:grid-cols-[1.35fr_0.7fr_0.7fr_0.7fr_0.5fr] md:items-center"
        >
          <div className="font-semibold text-white">{row.item}</div>
          <div>
            <span className="md:hidden text-xs uppercase text-slate-500">Expected </span>
            <span className="text-slate-200">{row.expected}</span>
          </div>
          <div>
            <span className="md:hidden text-xs uppercase text-slate-500">Actual </span>
            <span className="text-slate-200">{row.actual}</span>
          </div>
          <div className={row.difference.startsWith("-") ? "text-red-200" : "text-blue-200"}>
            <span className="md:hidden text-xs uppercase text-slate-500">Difference </span>
            {row.difference}
          </div>
          <div>
            <span className={`inline-flex border px-2 py-1 text-xs font-semibold ${row.risk === "High" ? "border-red-300/30 bg-red-500/10 text-red-200" : "border-amber-300/30 bg-amber-500/10 text-amber-200"}`}>
              {row.risk}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
