import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type AnimatedPyramidProps = {
  variant: "hero" | "model" | "interactive" | "optimizer";
  mode?: Mode;
  delta?: number;
  pulseKey?: number;
  feature?: Feature;
};

type Mode = "base" | "bonus" | "overtime";
export type Feature = "blindness" | "model" | "impact" | "optimizer" | "control";

type Layer = {
  id: string;
  label: string;
  dependsOn: string[];
  tooltip: string;
  fill: string;
};

const layers: Layer[] = [
  {
    id: "tax",
    label: "Tax",
    dependsOn: ["base", "bonus", "overtime", "pension"],
    tooltip: "Depends on base + taxable components",
    fill: "#b7e3f4",
  },
  {
    id: "employer",
    label: "Employer cost",
    dependsOn: ["base", "bonus", "overtime", "pension"],
    tooltip: "Depends on salary + employer obligations",
    fill: "#73c9c0",
  },
  {
    id: "pension",
    label: "Pension",
    dependsOn: ["base"],
    tooltip: "Depends on base salary",
    fill: "#4fb8c8",
  },
  {
    id: "overtime",
    label: "Overtime",
    dependsOn: ["base"],
    tooltip: "Depends on base hourly rate",
    fill: "#299db2",
  },
  {
    id: "bonus",
    label: "Bonus",
    dependsOn: ["base", "seniority"],
    tooltip: "Depends on base + seniority",
    fill: "#157d91",
  },
  {
    id: "seniority",
    label: "Seniority",
    dependsOn: ["base"],
    tooltip: "Depends on base salary",
    fill: "#0f6578",
  },
  {
    id: "base",
    label: "Base salary",
    dependsOn: [],
    tooltip: "Primary input",
    fill: "#073d4c",
  },
];

const modes: Array<{ id: Mode; label: string; delta: number }> = [
  { id: "base", label: "Base", delta: 5 },
  { id: "bonus", label: "Bonus", delta: 6 },
  { id: "overtime", label: "Overtime", delta: 9 },
];

const svg = {
  width: 640,
  center: 320,
  topY: 24,
  layerHeight: 52,
  topWidth: 172,
  widthStep: 58,
};

function affectedBy(mode: Mode) {
  const affected = new Set<string>([mode]);

  let changed = true;
  while (changed) {
    changed = false;
    layers.forEach((layer) => {
      if (!affected.has(layer.id) && layer.dependsOn.some((dependency) => affected.has(dependency))) {
        affected.add(layer.id);
        changed = true;
      }
    });
  }

  return affected;
}

function bandPath(index: number) {
  const topWidth = svg.topWidth + index * svg.widthStep;
  const bottomWidth = svg.topWidth + (index + 1) * svg.widthStep;
  const y1 = svg.topY + index * svg.layerHeight;
  const y2 = y1 + svg.layerHeight;

  return {
    points: [
      [svg.center - topWidth / 2, y1],
      [svg.center + topWidth / 2, y1],
      [svg.center + bottomWidth / 2, y2],
      [svg.center - bottomWidth / 2, y2],
    ]
      .map((point) => point.join(","))
      .join(" "),
    labelX: svg.center,
    labelY: y1 + svg.layerHeight / 2 + 5,
    deltaX: svg.center + bottomWidth / 2 - 66,
    deltaY: y1 + svg.layerHeight / 2 + 5,
  };
}

export function AnimatedPyramid({
  variant,
  mode: controlledMode,
  delta,
  pulseKey = 0,
  feature,
}: AnimatedPyramidProps) {
  const [salaryDelta, setSalaryDelta] = useState(4);
  const [mode, setMode] = useState<Mode>("base");
  const [hovered, setHovered] = useState<string | null>(null);
  const [ripple, setRipple] = useState(0);
  const isHero = variant === "hero";
  const isInteractive = variant === "interactive";
  const hasHeroControl = variant === "hero";
  const hasModeControl = variant === "interactive";
  const visualFeature = feature ?? (variant === "interactive" ? "impact" : variant);
  const activeMode = controlledMode ?? (isHero ? "base" : mode);
  const affected = useMemo(() => affectedBy(activeMode), [activeMode]);
  const hoveredLayer = layers.find((layer) => layer.id === hovered);
  const visibleDelta = isHero
    ? salaryDelta
    : delta ?? modes.find((item) => item.id === activeMode)?.delta ?? 5;
  const pulseToken = `${ripple}-${pulseKey}-${visibleDelta}-${activeMode}`;
  const shouldShowDelta = visualFeature !== "blindness" && (ripple > 0 || pulseKey > 0 || isInteractive);
  const featureLabel =
    visualFeature === "blindness"
      ? "Blind spots"
      : visualFeature === "model"
        ? "Visible structure"
        : visualFeature === "control"
          ? "Validated path"
          : visualFeature === "optimizer"
            ? "Selected strategy"
            : "Propagation";

  const triggerRipple = () => setRipple((value) => value + 1);

  return (
    <div className={isHero ? "mx-auto w-full max-w-2xl" : "mx-auto w-full max-w-[660px]"}>
      <div className="relative px-2 py-6 sm:px-6">
        <div className="mb-6 flex min-h-14 items-center justify-center">
          {hasHeroControl && (
          <label className="w-full max-w-md">
            <div className="mb-3 flex items-center justify-between text-sm text-[#c8eef1]">
              <span>Adjust base salary</span>
              <span className="font-semibold text-[#62c7b2]">
                {salaryDelta > 0 ? "+" : ""}
                {salaryDelta}%
              </span>
            </div>
            <input
              aria-label="Adjust base salary percentage"
              type="range"
              min="-6"
              max="10"
              value={salaryDelta}
              onChange={(event) => {
                setSalaryDelta(Number(event.target.value));
                triggerRipple();
              }}
              className="h-1 w-full cursor-pointer appearance-none bg-[#cfe4e6]/25 accent-[#62c7b2]"
            />
          </label>
          )}

          <motion.div
            className="grid grid-cols-3 border border-[#9bd9dd]/20 bg-[#073d4c]"
            animate={{ opacity: hasModeControl ? 1 : 0, y: hasModeControl ? 0 : 6 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            aria-hidden={!hasModeControl}
          >
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                tabIndex={hasModeControl ? 0 : -1}
                onClick={() => {
                  if (!hasModeControl) return;
                  setMode(item.id);
                  triggerRipple();
                }}
                className={`px-5 py-2 text-sm font-semibold transition ${
                  activeMode === item.id
                    ? "bg-[#62c7b2] text-[#073642]"
                    : "text-[#c8eef1] hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </div>

        <svg
          className="h-auto w-full overflow-visible drop-shadow-[0_28px_40px_rgba(0,0,0,0.22)]"
          viewBox="0 0 640 430"
          role="img"
          aria-label="Salary components pyramid"
        >
          <defs>
            <filter id="liraAffectedGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.38 0 0 0 0 0.78 0 0 0 0 0.70 0 0 0 0.55 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.line
            x1={svg.center}
            x2={svg.center}
            y1={svg.topY + svg.layerHeight * layers.length}
            y2={svg.topY}
            stroke="#9bd9dd"
            strokeWidth="1"
            strokeOpacity="0.45"
            key={`flow-${pulseToken}`}
            initial={{ pathLength: 0.1, opacity: 0.2 }}
            animate={{ pathLength: [0.1, 1, 0.1], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {layers.map((layer, index) => {
            const geometry = bandPath(index);
            const isAffected = affected.has(layer.id);
            const isDependency = hovered ? layer.id === hovered || hoveredLayer?.dependsOn.includes(layer.id) : false;
            const isBlindGap =
              visualFeature === "blindness" &&
              ["pension", "overtime", "bonus", "seniority"].includes(layer.id);
            const isControlCheck =
              visualFeature === "control" &&
              ["base", "bonus", "pension", "employer", "tax"].includes(layer.id);
            const isFaded = hovered ? !isDependency && !isAffected : isBlindGap;
            const bottomToTopDelay = (layers.length - 1 - index) * 0.09;
            const showLabel =
              variant !== "hero" ||
              layer.id === "base" ||
              layer.id === "employer" ||
              layer.id === "tax";

            return (
              <g key={layer.id}>
                <motion.polygon
                  points={geometry.points}
                  fill={layer.fill}
                  stroke="rgba(216,240,242,0.28)"
                  strokeWidth="1"
                  filter={isAffected && visualFeature !== "blindness" ? "url(#liraAffectedGlow)" : undefined}
                  onMouseEnter={() => setHovered(layer.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={triggerRipple}
                  className="cursor-pointer outline-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isFaded ? 0.24 : 1,
                    y: isAffected && visualFeature !== "blindness" ? [0, variant === "model" ? -3 : -6, 0] : 0,
                  }}
                  transition={{
                    opacity: { duration: 0.65, ease: "easeInOut" },
                    y: { duration: 0.56, delay: bottomToTopDelay, ease: "easeOut" },
                  }}
                />

                {showLabel && (
                  <>
                    <motion.text
                      x={geometry.labelX}
                      y={geometry.labelY}
                      textAnchor="middle"
                      className="pointer-events-none select-none fill-white text-[16px] font-semibold"
                      animate={{ opacity: isBlindGap ? 0 : 1, y: isBlindGap ? 3 : 0 }}
                      transition={{ duration: 0.48, ease: "easeInOut" }}
                    >
                      {layer.label}
                    </motion.text>
                    <motion.text
                      x={geometry.labelX}
                      y={geometry.labelY}
                      textAnchor="middle"
                      className="pointer-events-none select-none fill-white text-[18px] font-semibold"
                      animate={{ opacity: isBlindGap ? 1 : 0, y: isBlindGap ? 0 : -3 }}
                      transition={{ duration: 0.48, ease: "easeInOut" }}
                    >
                      ?
                    </motion.text>
                  </>
                )}

                <motion.circle
                  cx={geometry.labelX}
                  cy={geometry.labelY - 6}
                  r="17"
                  fill="none"
                  stroke="#8dd5df"
                  strokeOpacity="0.5"
                  strokeWidth="1"
                  initial={false}
                  animate={{
                    opacity: isBlindGap ? [0.25, 0.7, 0.25] : 0,
                    scale: isBlindGap ? [0.92, 1.06, 0.92] : 0.92,
                  }}
                  transition={{
                    opacity: { duration: 1.8, repeat: isBlindGap ? Infinity : 0, delay: index * 0.08 },
                    scale: { duration: 1.8, repeat: isBlindGap ? Infinity : 0, delay: index * 0.08 },
                  }}
                />

                <motion.g
                  initial={false}
                  animate={{ opacity: isControlCheck ? 1 : 0, scale: isControlCheck ? 1 : 0.82 }}
                  transition={{ duration: 0.45, delay: isControlCheck ? bottomToTopDelay : 0, ease: "easeOut" }}
                >
                  <circle cx={geometry.deltaX + 26} cy={geometry.deltaY - 4} r="11" fill="#62c7b2" />
                  <path
                    d={`M ${geometry.deltaX + 20} ${geometry.deltaY - 4} L ${geometry.deltaX + 24} ${geometry.deltaY} L ${geometry.deltaX + 32} ${geometry.deltaY - 8}`}
                    fill="none"
                    stroke="#073642"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.g>

                <AnimatePresence>
                  {isAffected && shouldShowDelta && variant !== "model" && (
                    <motion.text
                      key={`${layer.id}-${pulseToken}`}
                      x={geometry.deltaX}
                      y={geometry.deltaY}
                      textAnchor="middle"
                      className="pointer-events-none select-none fill-[#efffff] text-[13px] font-semibold"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.15, delay: bottomToTopDelay, ease: "easeOut" }}
                    >
                      {visibleDelta > 0 ? "+" : ""}
                      {visibleDelta}%
                    </motion.text>
                  )}
                </AnimatePresence>
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex h-6 items-center justify-center text-sm text-[#c8eef1]/80">
          <AnimatePresence mode="wait">
            <motion.span
              key={hoveredLayer?.id ?? activeMode}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {hoveredLayer ? hoveredLayer.tooltip : featureLabel}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
