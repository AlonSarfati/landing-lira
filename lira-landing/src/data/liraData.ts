import {
  BadgeCheck,
  BarChart3,
  Calculator,
  FileSearch,
  GitBranch,
  Landmark,
  LineChart,
  Network,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SalaryComponent = {
  id: string;
  label: string;
  value: number;
  after: number;
  width: string;
  tone: string;
  dependsOn: string[];
};

export type Capability = {
  title: string;
  body: string;
  icon: LucideIcon;
  bars: number[];
};

export const salaryComponents: SalaryComponent[] = [
  {
    id: "tax",
    label: "Tax effects",
    value: 3120,
    after: 3378,
    width: "42%",
    tone: "from-sky-200 to-blue-300",
    dependsOn: ["base", "overtime", "role", "seniority"],
  },
  {
    id: "employer",
    label: "Employer cost",
    value: 4180,
    after: 4634,
    width: "54%",
    tone: "from-blue-300 to-indigo-400",
    dependsOn: ["base", "pension", "overtime", "role"],
  },
  {
    id: "pension",
    label: "Pension",
    value: 1840,
    after: 1978,
    width: "64%",
    tone: "from-blue-400 to-cyan-400",
    dependsOn: ["base", "seniority"],
  },
  {
    id: "overtime",
    label: "Overtime",
    value: 1460,
    after: 1566,
    width: "74%",
    tone: "from-cyan-500 to-blue-500",
    dependsOn: ["base"],
  },
  {
    id: "role",
    label: "Role bonus",
    value: 2200,
    after: 2440,
    width: "84%",
    tone: "from-blue-600 to-indigo-600",
    dependsOn: ["base"],
  },
  {
    id: "seniority",
    label: "Seniority",
    value: 920,
    after: 1012,
    width: "92%",
    tone: "from-slate-500 to-blue-700",
    dependsOn: ["base"],
  },
  {
    id: "base",
    label: "Base salary",
    value: 16800,
    after: 18144,
    width: "100%",
    tone: "from-slate-700 to-blue-900",
    dependsOn: [],
  },
];

export const problemCards = [
  {
    title: "Execution without understanding",
    body: "Payroll runs on time, but finance cannot always explain why the final employer cost moved.",
    example: "Example: monthly payroll +₪42K with no approved policy change.",
    bars: ["24px", "38px", "50px", "36px"],
  },
  {
    title: "Dependent salary components",
    body: "A raise changes pension, employer cost, taxes, allowances, and budget forecasts in sequence.",
    example: "Base +8% becomes employer cost +10.7% for selected roles.",
    bars: ["16px", "28px", "44px", "58px"],
  },
  {
    title: "Small rule mistakes, large exposure",
    body: "Caps, eligibility rules, and local clauses create variance that compounds across employees.",
    example: "Section 14 mismatch: ₪19,600 annualized exposure.",
    bars: ["22px", "22px", "54px", "62px"],
  },
  {
    title: "What-if answers are slow",
    body: "Teams need scenario answers before board reviews, union talks, and payroll lock dates.",
    example: "Policy update impact: 11 affected components, 3 flags.",
    bars: ["48px", "30px", "42px", "60px"],
  },
];

export const capabilityCards: Capability[] = [
  {
    title: "Salary structure modeling",
    body: "Build explicit salary layers, bands, caps, and local clauses.",
    icon: Calculator,
    bars: [38, 58, 82],
  },
  {
    title: "Dependency graph",
    body: "Trace how one component changes everything downstream.",
    icon: GitBranch,
    bars: [72, 44, 64],
  },
  {
    title: "Payroll audit",
    body: "Compare expected values to actual payroll outputs.",
    icon: FileSearch,
    bars: [44, 84, 52],
  },
  {
    title: "Scenario simulation",
    body: "Run policy and compensation scenarios before execution.",
    icon: Network,
    bars: [62, 76, 48],
  },
  {
    title: "Optimization engine",
    body: "Compare strategies under retention, budget, and risk constraints.",
    icon: BadgeCheck,
    bars: [55, 88, 66],
  },
  {
    title: "Forecasting and budgeting",
    body: "Project payroll impact across months, teams, and roles.",
    icon: LineChart,
    bars: [36, 60, 91],
  },
  {
    title: "Rule governance",
    body: "Make compensation rules reviewable, versioned, and explainable.",
    icon: ShieldCheck,
    bars: [80, 50, 70],
  },
  {
    title: "Integration layer",
    body: "Prepare controlled integrations with payroll systems over time.",
    icon: Landmark,
    bars: [48, 74, 86],
  },
];

export const auditRows = [
  {
    item: "Section 14 pension mismatch",
    expected: "₪8,420",
    actual: "₪7,680",
    difference: "-₪740",
    risk: "High",
  },
  {
    item: "Missing overtime component",
    expected: "₪3,180",
    actual: "₪0",
    difference: "-₪3,180",
    risk: "High",
  },
  {
    item: "Incorrect role bonus",
    expected: "₪2,200",
    actual: "₪2,640",
    difference: "+₪440",
    risk: "Medium",
  },
  {
    item: "Employer cost variance",
    expected: "₪41,820",
    actual: "₪43,060",
    difference: "+₪1,240",
    risk: "Medium",
  },
];

export const strategies = [
  {
    name: "Across-the-board raise",
    budget: 88,
    retention: 46,
    risk: 42,
    note: "Simple to approve, expensive to sustain.",
  },
  {
    name: "Targeted retention raise",
    budget: 62,
    retention: 84,
    risk: 31,
    note: "Higher retention impact with controlled spend.",
  },
  {
    name: "Budget-constrained raise",
    budget: 44,
    retention: 58,
    risk: 38,
    note: "Keeps spend low while protecting priority teams.",
  },
  {
    name: "Compliance-first correction",
    budget: 51,
    retention: 35,
    risk: 12,
    note: "Prioritizes exposure reduction and rule cleanup.",
  },
];

export const roadmapStages = [
  "Simulator",
  "Audit layer",
  "Decision layer",
  "Integration layer",
  "Optional payroll execution",
];

export const productMetrics = [
  { label: "Total current payroll", value: "₪371,824" },
  { label: "Avg payroll per employee", value: "₪16,901" },
  { label: "Simulations run", value: "2" },
];

export const flowChecks = [
  "Ruleset validation",
  "Discrepancy detection",
  "Scenario comparison",
  "Budget exposure forecast",
];

export const flowSources = ["Payroll data", "Rules", "Policies"];
export const flowOutputs = ["Decisions", "Validation", "Optimization"];
export const analyticsIcon = BarChart3;
