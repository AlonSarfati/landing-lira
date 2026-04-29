export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#063443]/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <span className="text-sm font-semibold tracking-[0.28em] text-white">
            LIRA
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a className="text-sm text-slate-300 hover:text-white" href="/">
            Product
          </a>
          <a className="text-sm text-slate-300 hover:text-white" href="/about">
            About
          </a>
          <a className="text-sm text-slate-300 hover:text-white" href="/contact">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a className="text-sm text-slate-300 hover:text-white md:hidden" href="/about">
            About
          </a>
          <a className="text-sm text-slate-300 hover:text-white md:hidden" href="/contact">
            Contact
          </a>
          <a
            href="/contact"
            className="border border-[#62c7b2]/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#62c7b2]"
          >
            Pilot
          </a>
        </div>
      </div>
    </header>
  );
}
