import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, ShieldCheck } from "lucide-react";
import Header from "./components/Header";
import { AnimatedPyramid } from "./components/AnimatedPyramid";
import type { Feature } from "./components/AnimatedPyramid";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import logo from "./assets/lira-logo-glow.png";

type Mode = "base" | "bonus" | "overtime";
type StepId = "problem" | "model" | "impact" | "optimizer" | "control";
type PyramidVariant = "model" | "interactive" | "optimizer";
type PyramidState = {
  variant: PyramidVariant;
  mode?: Mode;
  delta?: number;
  feature: Feature;
};

type Strategy = {
  name: string;
  mode: Mode;
  cost: string;
  risk: "Low" | "Medium" | "High";
  employees: number;
  recommended?: boolean;
  delta: number;
};

const blindnessBullets = [
  "Components depend on each other",
  "Small rule changes create large impact",
  "Finance lacks visibility before execution",
];

const strategies: Strategy[] = [
  {
    name: "Flat raise",
    mode: "base",
    cost: "+9%",
    risk: "High",
    employees: 184,
    delta: 9,
  },
  {
    name: "Targeted raise",
    mode: "bonus",
    cost: "+4%",
    risk: "Low",
    employees: 37,
    recommended: true,
    delta: 4,
  },
  {
    name: "Budget-constrained",
    mode: "bonus",
    cost: "+2%",
    risk: "Medium",
    employees: 52,
    delta: 2,
  },
  {
    name: "Compliance fix",
    mode: "overtime",
    cost: "+3%",
    risk: "Low",
    employees: 21,
    delta: 3,
  },
];

const controls = [
  { text: "Validate rules", icon: Check },
  { text: "Prevent errors", icon: Eye },
  { text: "Align payroll with decisions", icon: ShieldCheck },
];

function stepToPyramid(step: StepId, selectedStrategy: Strategy): PyramidState {
  if (step === "problem") {
    return {
      variant: "model" as PyramidVariant,
      mode: "base" as Mode,
      delta: 0,
      feature: "blindness",
    };
  }

  if (step === "impact") {
    return { variant: "interactive" as PyramidVariant, feature: "impact" };
  }

  if (step === "optimizer") {
    return {
      variant: "optimizer" as PyramidVariant,
      mode: selectedStrategy.mode,
      delta: selectedStrategy.delta,
      feature: "optimizer",
    };
  }

  return {
    variant: "model" as PyramidVariant,
    mode: "base" as Mode,
    delta: step === "control" ? 2 : 3,
    feature: step === "control" ? "control" : "model",
  };
}

function MobilePyramidStrip({
  tall,
  tightTop,
  short,
  children,
}: {
  tall?: boolean;
  /** Less margin above strip (e.g. optimizer: sit closer to intro copy) */
  tightTop?: boolean;
  /** Shorter strip so pyramid + controls fit one viewport */
  short?: boolean;
  children: ReactNode;
}) {
  const top = tightTop ? "mt-4" : "mt-10";
  let height: string;
  if (short) {
    height = "min-h-[200px] max-h-[min(260px,36svh)]";
  } else if (tall) {
    height = "min-h-[280px] max-h-[min(360px,50svh)]";
  } else {
    height = "min-h-[260px] max-h-[min(320px,46svh)]";
  }
  return (
    <div
      className={`${top} w-full shrink-0 overflow-visible rounded-sm border border-white/10 bg-[#063443]/92 p-3 shadow-[0_14px_44px_rgba(0,0,0,0.2)] lg:hidden ${height} flex flex-col`}
    >
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

export default function App() {
  const [activeStep, setActiveStep] = useState<StepId>("problem");
  const [selectedStrategy, setSelectedStrategy] = useState(strategies[1]);
  const [pulseKey, setPulseKey] = useState(1);
  const sectionRefs = useRef<Record<StepId, HTMLElement | null>>({
    problem: null,
    model: null,
    impact: null,
    optimizer: null,
    control: null,
  });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let observer: IntersectionObserver | null = null;

    const attach = () => {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

          const id = visible?.target.getAttribute("data-step") as StepId | null;
          if (id) {
            setActiveStep((current) => {
              if (current !== id) {
                setPulseKey((value) => value + 1);
              }
              return id;
            });
          }
        },
        {
          rootMargin: "-25% 0px -35% 0px",
          threshold: [0.25, 0.45, 0.65],
        },
      );

      Object.values(sectionRefs.current).forEach((node) => {
        if (node) observer!.observe(node);
      });
    };

    const detach = () => {
      observer?.disconnect();
      observer = null;
    };

    const sync = () => {
      detach();
      if (mq.matches) attach();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      detach();
    };
  }, []);

  const setStepRef = (id: StepId) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  };

  const chooseStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setActiveStep("optimizer");
    setPulseKey((value) => value + 1);
  };

  const pyramid = stepToPyramid(activeStep, selectedStrategy);
  const isAboutPage = window.location.pathname === "/about";
  const isContactPage = window.location.pathname === "/contact";

  if (isAboutPage) {
    return (
      <>
        <Header />
        <About />
      </>
    );
  }

  if (isContactPage) {
    return (
      <>
        <Header />
        <Contact />
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#063443] text-white">
      <Header />

      <section id="top" className="relative min-h-screen overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(207,228,230,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(207,228,230,0.055)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(98,199,178,0.18),transparent_34%),linear-gradient(180deg,rgba(6,52,67,0.08),#063443_92%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-28 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-5xl text-center"
          >
            <div className="mx-auto mb-10 w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-[#bfe8f7]/20 blur-3xl" />
                <img
                  src={logo}
                  alt="Lira"
                  className="relative h-28 w-auto object-contain drop-shadow-[0_0_36px_rgba(191,232,247,0.34)] sm:h-36"
                />
              </div>
            </div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
              Salary Intelligence Layer
            </p>
            <h1 className="text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Understand.
              <br />
              Simulate.
              <br />
              Control.
            </h1>
            <p className="mx-auto mt-7 max-w-xl text-xl leading-8 text-slate-300">
              Salary intelligence before payroll execution.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#problem"
                className="inline-flex items-center justify-center bg-[#62c7b2] px-6 py-3 text-sm font-semibold text-[#073642] shadow-[0_0_36px_rgba(98,199,178,0.28)] transition hover:bg-[#7cd6c3]"
              >
                See the system
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center border border-white/15 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-[#62c7b2]/70 hover:bg-white/5"
              >
                Request a pilot
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#052f3d] px-6 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <section
              id="problem"
              data-step="problem"
              ref={setStepRef("problem")}
              onMouseEnter={() => setActiveStep("problem")}
              className="flex min-h-[76vh] flex-col justify-center py-24"
            >
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
                Blindness
              </p>
              <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Payroll is executed. Not understood.
              </h2>
              <div className="mt-12 grid gap-4">
                {blindnessBullets.map((bullet) => (
                  <div key={bullet} className="border-l border-[#62c7b2] pl-5 text-lg text-[#d8f0f2]">
                    {bullet}
                  </div>
                ))}
              </div>
              <MobilePyramidStrip>
                <AnimatedPyramid
                  compact
                  variant="model"
                  mode="base"
                  delta={0}
                  feature="blindness"
                  pulseKey={0}
                />
              </MobilePyramidStrip>
            </section>

            <section
              id="model"
              data-step="model"
              ref={setStepRef("model")}
              onMouseEnter={() => setActiveStep("model")}
              className="flex min-h-[76vh] flex-col justify-center py-24"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
                Model
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Make compensation visible.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[#d8f0f2]">
                Salary logic becomes a structured system you can see.
              </p>
              <MobilePyramidStrip>
                <AnimatedPyramid compact variant="model" mode="base" delta={3} feature="model" pulseKey={0} />
              </MobilePyramidStrip>
            </section>

            <section
              id="impact"
              data-step="impact"
              ref={setStepRef("impact")}
              onMouseEnter={() => setActiveStep("impact")}
              className="flex min-h-[76vh] flex-col justify-center py-24"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
                Impact
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Change one component.
                <br />
                Everything moves.
              </h2>
              <MobilePyramidStrip tall>
                <AnimatedPyramid compact variant="interactive" feature="impact" pulseKey={0} />
              </MobilePyramidStrip>
            </section>

            <section
              id="optimizer"
              data-step="optimizer"
              ref={setStepRef("optimizer")}
              onMouseEnter={() => setActiveStep("optimizer")}
              className="flex min-h-[92vh] flex-col justify-center py-24"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
                Optimizer
              </p>
              <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Don't guess. Choose the best strategy.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#d8f0f2]">
                Compare strategies and see their impact before committing.
              </p>
              <div className="max-lg:flex max-lg:flex-col max-lg:gap-2">
                <MobilePyramidStrip tightTop short>
                  <AnimatedPyramid
                    compact
                    variant="optimizer"
                    mode={selectedStrategy.mode}
                    delta={selectedStrategy.delta}
                    feature="optimizer"
                    pulseKey={pulseKey}
                  />
                </MobilePyramidStrip>
                <div className="mt-3 grid grid-cols-2 gap-2 max-lg:mt-0 lg:mt-10 lg:gap-3">
                  {strategies.map((strategy) => {
                    const selected = selectedStrategy.name === strategy.name;
                    return (
                      <button
                        key={strategy.name}
                        type="button"
                        onClick={() => chooseStrategy(strategy)}
                        className={`relative touch-manipulation border text-left transition max-lg:min-h-[44px] max-lg:rounded-sm max-lg:p-2 max-lg:pt-2.5 lg:p-4 ${
                          selected
                            ? "border-[#62c7b2] bg-[#62c7b2]/12 shadow-[0_0_34px_rgba(98,199,178,0.14)]"
                            : "border-white/10 bg-[#063443] hover:border-[#62c7b2]/50"
                        }`}
                      >
                        {strategy.recommended && (
                          <span className="mb-1 inline-flex bg-[#62c7b2] px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-[#073642] max-lg:mb-1 lg:mb-4 lg:px-2 lg:py-1 lg:text-xs">
                            Recommended
                          </span>
                        )}
                        <div className="text-sm font-semibold leading-snug text-white max-lg:text-xs lg:text-lg">
                          {strategy.name}
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-1 text-[10px] max-lg:mt-1.5 max-lg:leading-tight lg:mt-5 lg:gap-2 lg:text-sm">
                          <div>
                            <div className="text-[#8dd5df]">Cost</div>
                            <div className="mt-0.5 font-semibold text-white">{strategy.cost}</div>
                          </div>
                          <div>
                            <div className="text-[#8dd5df]">Risk</div>
                            <div className="mt-0.5 font-semibold text-white">{strategy.risk}</div>
                          </div>
                          <div>
                            <div className="text-[#8dd5df]">People</div>
                            <div className="mt-0.5 font-semibold text-white">{strategy.employees}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section
              id="control"
              data-step="control"
              ref={setStepRef("control")}
              onMouseEnter={() => setActiveStep("control")}
              className="flex min-h-[76vh] flex-col justify-center py-24"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
                Control
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Control execution before it happens.
              </h2>
              <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10">
                {controls.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-4 bg-[#073d4c] p-5 text-lg font-semibold text-white">
                      <Icon className="text-[#62c7b2]" size={22} />
                      {item.text}
                    </div>
                  );
                })}
              </div>
              <MobilePyramidStrip>
                <AnimatedPyramid compact variant="model" mode="base" delta={2} feature="control" pulseKey={0} />
              </MobilePyramidStrip>
            </section>
          </div>

          <aside className="pointer-events-auto hidden w-full self-start py-10 lg:flex lg:min-h-[calc(100vh-4rem)] lg:items-center lg:sticky lg:top-16 lg:py-0">
            <div className="w-full border border-white/10 bg-[#063443]/72 p-4 shadow-[0_26px_80px_rgba(0,0,0,0.22)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8dd5df]">
                <span>Shared model</span>
                <span>{activeStep}</span>
              </div>
              <div className="min-h-[520px]">
                <AnimatedPyramid
                  variant={pyramid.variant}
                  mode={pyramid.mode}
                  delta={pyramid.delta}
                  pulseKey={pulseKey}
                  feature={pyramid.feature}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="contact" className="bg-[#052f3d] px-6 py-28 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Decide before payroll becomes reality.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Lira gives finance the salary intelligence layer above execution.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/contact" className="bg-[#62c7b2] px-6 py-3 text-sm font-semibold text-[#073642]">
              Request a pilot
            </a>
            <a href="/contact" className="border border-white/15 px-6 py-3 text-sm font-semibold text-white">
              Contact us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
