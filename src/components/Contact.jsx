import { config } from "../config";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

export default function Contact() {
  const { ref, visible } = useInViewAnimation();

  function onSubmit(event) {
    event.preventDefault();
    window.alert("Replace this handler with Formspree, Netlify Forms, or your API endpoint.");
    event.currentTarget.reset();
  }

  return (
    <section ref={ref} id="contact" className={`section-enter py-8 ${visible ? "section-visible" : ""}`}>
      <h2 className="section-title">Contact</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <form onSubmit={onSubmit} className="glass-card grid gap-3 p-5" aria-label="Contact form">
          <input className="input" type="text" placeholder="Your Name" aria-label="Your Name" required />
          <input className="input" type="email" placeholder="Email Address" aria-label="Email Address" required />
          <textarea className="input" rows={4} placeholder="Your Message" aria-label="Your Message" required />
          <button className="rounded-xl bg-primary px-4 py-2 font-semibold text-white transition hover:scale-105" type="submit">
            Send Message
          </button>
        </form>
        <article className="glass-card p-5">
          <h3 className="text-lg font-semibold">Let&apos;s Build Something</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Open to junior fullstack opportunities, freelance work, and collaborations.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              GitHub:{" "}
              <a href={config.social.github} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                {config.social.github}
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a href={config.social.linkedin} className="text-primary hover:underline" target="_blank" rel="noreferrer">
                {config.social.linkedin}
              </a>
            </li>
            <li>
              Email:{" "}
              <a href={`mailto:${config.social.email}`} className="text-primary hover:underline">
                {config.social.email}
              </a>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

