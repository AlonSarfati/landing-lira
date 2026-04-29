export function About() {
  return (
    <main className="min-h-screen bg-[#063443] text-white">
      <section className="relative flex min-h-[72vh] items-center overflow-hidden border-b border-white/10 px-6 py-28 sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(207,228,230,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(207,228,230,0.045)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(98,199,178,0.14),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
            About Lira
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-7xl">
            Salary decisions shouldn’t be a black box.
          </h1>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#052f3d] px-6 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
            Mission
          </p>
          <p className="max-w-3xl text-3xl font-semibold leading-tight text-white">
            We’re building the layer that gives companies clarity and control
            over how salary decisions are made.
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#063443] px-6 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
            Origin
          </p>
          <p className="max-w-3xl text-2xl font-semibold leading-tight text-[#d8f0f2]">
            Lira started from working inside complex payroll environments, where
            understanding salary behavior required navigating rules,
            dependencies, and systems that were never built for visibility.
          </p>
        </div>
      </section>

      <section className="bg-[#052f3d] px-6 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8dd5df]">
            Why now
          </p>
          <p className="max-w-3xl text-2xl font-semibold leading-tight text-white">
            As salary structures become more flexible and negotiation-driven,
            the gap between decision and understanding continues to grow.
          </p>
        </div>
      </section>
    </main>
  );
}
