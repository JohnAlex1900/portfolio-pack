import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import GitHubStats from "./components/GitHubStats";

const THEME_KEY = "portfolio-theme";

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem(THEME_KEY) === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header dark={dark} onToggleTheme={() => setDark((prev) => !prev)} />
      <main className="mx-auto w-[92%] max-w-6xl">
        <Hero />
        <Skills />
        <Projects />
        <GitHubStats />
        <Testimonials />
        <Contact />
      </main>
      <footer className="px-4 py-8 text-center text-sm text-slate-500">Built for speed, clarity, and strong first impressions.</footer>
    </div>
  );
}

