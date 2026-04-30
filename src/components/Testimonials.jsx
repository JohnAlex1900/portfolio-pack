import { useInViewAnimation } from "../hooks/useInViewAnimation";

const testimonials = [
  {
    quote: "Reliable, curious, and quick to ship. Great execution for a junior engineer.",
    author: "Engineering Mentor",
  },
  {
    quote: "Great communication and pixel-precise frontend delivery.",
    author: "Startup Product Lead",
  },
  {
    quote: "Contributed meaningful features and improved performance from day one.",
    author: "Team Tech Lead",
  },
];

export default function Testimonials() {
  const { ref, visible } = useInViewAnimation();
  return (
    <section ref={ref} id="testimonials" className={`section-enter py-8 ${visible ? "section-visible" : ""}`}>
      <h2 className="section-title">Testimonials</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote key={item.author} className="glass-card p-5 text-sm">
            <p className="text-slate-700 dark:text-slate-200">"{item.quote}"</p>
            <footer className="mt-3 text-xs text-slate-500 dark:text-slate-400">- {item.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

