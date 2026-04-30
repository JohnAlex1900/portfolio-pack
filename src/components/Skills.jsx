import { config } from "../config";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

function SkillCard({ title, items }) {
  return (
    <article className="glass-card p-5">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Skills() {
  const { ref, visible } = useInViewAnimation();
  return (
    <section ref={ref} id="skills" className={`section-enter py-8 ${visible ? "section-visible" : ""}`}>
      <h2 className="section-title">Skills</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <SkillCard title="Frontend" items={config.skills.frontend} />
        <SkillCard title="Backend" items={config.skills.backend} />
        <SkillCard title="Tools" items={config.skills.tools} />
      </div>
    </section>
  );
}

