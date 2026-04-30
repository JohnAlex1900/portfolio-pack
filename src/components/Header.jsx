export default function Header({ dark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/70 backdrop-blur dark:border-slate-700/50 dark:bg-slate-950/70">
      <div className="mx-auto flex min-h-16 w-[92%] max-w-6xl items-center justify-between">
        <a href="#hero" className="font-mono font-semibold">
          {"{portfolio.dev}"}
        </a>
        <nav className="hidden gap-5 text-sm text-slate-600 dark:text-slate-300 md:flex" aria-label="Section links">
          <a href="#skills" className="hover:text-primary transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#testimonials" className="hover:text-primary transition-colors">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-full border border-slate-300/70 px-3 py-1.5 text-sm hover:scale-105 dark:border-slate-600"
          aria-label="Toggle dark mode"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}

