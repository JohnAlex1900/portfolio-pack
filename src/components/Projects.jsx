import projects from "../data/projects.json";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function Projects() {
  const { ref, visible } = useInViewAnimation();
  return (
    <section ref={ref} id="projects" className={`section-enter py-8 ${visible ? "section-visible" : ""}`}>
      <h2 className="section-title">Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.title} className="glass-card overflow-hidden p-4">
            <img
              src={project.imageUrl}
              alt={`${project.title} project preview`}
              className="aspect-video w-full rounded-xl object-cover"
              loading="lazy"
            />
            <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.desc}</p>
            <div className="mt-3 flex gap-4 text-sm font-semibold">
              <a href={project.liveUrl} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                Live
              </a>
              <a href={project.codeUrl} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

