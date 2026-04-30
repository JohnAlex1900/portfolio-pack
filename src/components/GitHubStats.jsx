import { useEffect, useMemo, useState } from "react";
import { config } from "../config";
import { useInViewAnimation } from "../hooks/useInViewAnimation";

function LanguageChart({ repos }) {
  const languageData = useMemo(() => {
    const totals = repos.reduce((acc, repo) => {
      const language = repo.language || "Other";
      acc[language] = (acc[language] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(totals);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);
    const palette = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

    return entries.map(([name, count], index) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
      color: palette[index % palette.length],
    }));
  }, [repos]);

  if (!repos.length) return null;

  return (
    <div className="mt-4">
      <h4 className="mb-2 text-sm font-semibold">Top Languages</h4>
      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        {languageData.map((item) => (
          <span
            key={item.name}
            className="inline-block h-full"
            style={{ width: `${item.percent}%`, backgroundColor: item.color }}
            title={`${item.name}: ${item.percent}%`}
          />
        ))}
      </div>
      <ul className="mt-3 grid gap-2 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        {languageData.map((item) => (
          <li key={item.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>
              {item.name} ({item.percent}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GitHubStats() {
  const { ref, visible } = useInViewAnimation();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const username = config.githubUsername?.trim();
    const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();
    if (!username) {
      setError("Please set a GitHub username in src/config.js.");
      return;
    }

    const headers = token
      ? {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        }
      : {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };

    async function fetchData() {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { headers }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=updated`, { headers }),
        ]);

        if (!userRes.ok || !repoRes.ok) {
          const isRateLimited =
            userRes.status === 403 ||
            repoRes.status === 403 ||
            userRes.headers.get("x-ratelimit-remaining") === "0" ||
            repoRes.headers.get("x-ratelimit-remaining") === "0";

          if (isRateLimited) {
            throw new Error(
              "GitHub API rate limit reached. Add VITE_GITHUB_TOKEN in a .env file (see README) or use a backend proxy."
            );
          }

          throw new Error("GitHub API request failed. Check username or network and try again.");
        }

        const user = await userRes.json();
        const repositoryData = await repoRes.json();
        setProfile(user);
        setRepos(Array.isArray(repositoryData) ? repositoryData : []);
      } catch (err) {
        setError(err.message || "Unable to fetch GitHub data.");
      }
    }

    fetchData();
  }, []);

  return (
    <section ref={ref} className={`section-enter py-8 ${visible ? "section-visible" : ""}`} aria-labelledby="github-title">
      <h2 id="github-title" className="section-title">
        GitHub Highlights
      </h2>
      <div className="glass-card p-5">
        {error && <p className="text-sm text-red-500">{error}</p>}
        {!error && !profile && <p className="text-sm text-slate-600 dark:text-slate-300">Loading GitHub data...</p>}
        {profile && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold">{profile.name || profile.login}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{profile.bio || "No bio set on GitHub yet."}</p>
              </div>
              <a href={profile.html_url} className="text-sm font-semibold text-primary hover:underline" target="_blank" rel="noreferrer">
                Visit Profile
              </a>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-700/70">
                <p className="text-xs text-slate-500">Followers</p>
                <p className="text-xl font-bold">{profile.followers}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-700/70">
                <p className="text-xs text-slate-500">Public Repos</p>
                <p className="text-xl font-bold">{profile.public_repos}</p>
              </div>
              <div className="rounded-xl border border-slate-200/70 p-3 dark:border-slate-700/70">
                <p className="text-xs text-slate-500">Following</p>
                <p className="text-xl font-bold">{profile.following}</p>
              </div>
            </div>

            <LanguageChart repos={repos} />

            <div className="mt-5">
              <h4 className="mb-2 text-sm font-semibold">Latest Repositories</h4>
              <div className="grid gap-3 md:grid-cols-2">
                {repos.map((repo) => (
                  <article key={repo.id} className="rounded-xl border border-slate-200/70 p-3 text-sm dark:border-slate-700/70">
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                      {repo.name}
                    </a>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{repo.description || "No description provided."}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      ★ {repo.stargazers_count} | Forks: {repo.forks_count} | {repo.language || "Unknown"}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

