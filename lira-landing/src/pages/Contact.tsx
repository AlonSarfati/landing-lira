import { CheckCircle2 } from "lucide-react";
import ContactForm from "../components/ContactForm";

const reasons = [
  "Pilot on real salary rules",
  "Payroll audit and discrepancy review",
  "Compensation strategy simulation",
  "Integration planning",
];

const expectations = [
  "Review your current salary decision workflow",
  "Identify one high-value simulation use case",
  "Define pilot scope and success criteria",
];

export function Contact() {
  return (
    <main className="min-h-screen bg-[#063443] text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-28 sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(207,228,230,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(207,228,230,0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(98,199,178,0.16),transparent_34%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
              Contact Lira
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              See what your payroll model really looks like.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#d8f0f2]">
              Tell us what you want to test. We’ll help define a focused pilot around your salary rules and decision workflow.
            </p>

            <div className="mt-12 border border-white/10 bg-[#052f3d] p-6">
              <h2 className="text-xl font-semibold text-white">Good reasons to talk</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-center gap-3 text-sm text-[#d8f0f2]">
                    <CheckCircle2 size={17} className="text-[#62c7b2]" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-[#052f3d] px-6 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            What happens next
          </h2>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {expectations.map((item) => (
              <div key={item} className="bg-[#063443] p-6">
                <p className="text-base font-semibold leading-7 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
