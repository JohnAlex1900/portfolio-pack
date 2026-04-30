import { config } from "../config";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function Hero() {
  const { ref, visible } = useInViewAnimation();
  return (
    <section
      ref={ref}
      id="hero"
      className={`section-enter grid gap-6 py-12 md:grid-cols-[1.2fr,1fr] md:py-16 ${visible ? "section-visible" : ""}`}
    >
      <div>
        <span className="mb-3 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {config.title}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">{config.name}</h1>
        <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">{config.bio}</p>
        <div className="mt-5 flex gap-3">
          <a
            href="#projects"
            className="rounded-xl bg-primary px-4 py-2 font-semibold text-white transition hover:scale-105"
          >
            View Projects
          </a>
          <a
            href={config.social.github}
            className="rounded-xl border border-slate-300 px-4 py-2 font-semibold transition hover:scale-105 dark:border-slate-600"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <article className="glass-card p-4">
        <img
          className="h-full w-full rounded-xl object-cover"
          src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80"
          alt="Developer coding at desk"
          loading="lazy"
        />
      </article>
    </section>
  );
}

