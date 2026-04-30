# Pro Engineer React Portfolio

React 18 + Vite + Tailwind CSS starter for junior fullstack developers.

## 1) Edit in 5 Minutes

- Set your GitHub username in `src/config.js`.
- Edit your bio and contact links in `src/components/Hero.jsx` and `src/components/Contact.jsx`.
- Edit project cards in `src/data/projects.json`.

## 2) Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## 3) Deploy

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Or drag your `dist/` output to Netlify Drop after `npm run build`.

## Screenshots

Save screenshots in this folder:

- `screenshot-light.png`
- `screenshot-dark.png`

## Customization

- Primary color:
  - `tailwind.config.js` -> `colors.primary`
  - `src/index.css` -> `--primary-color`
- Theme persistence uses localStorage key: `portfolio-theme`.

## Dynamic GitHub Data

The app fetches:

- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos?per_page=5&sort=updated`

Shows top 5 updated repos + language distribution chart.

### Recommended: Authenticated API Requests (avoids rate limits)

#### Step 1: Create a GitHub token (fine-grained)

In your GitHub account:

1. Go to **Settings**.
2. Open **Developer settings** (left sidebar, near the bottom).
3. Click **Personal access tokens**.
4. Click **Fine-grained tokens**.
5. Click **Generate new token**.
6. Set token permissions:
   - Repository access: public repositories is enough for portfolio data.
   - Permissions: read-only is enough.
7. Generate token and copy it immediately.

Direct URL: `https://github.com/settings/tokens?type=beta`

#### Step 2: Add the token to local env

Create `pro-engineer-react/.env` (or copy from `.env.example`):

```bash
VITE_GITHUB_TOKEN=ghp_your_token_here
```

Then restart the dev server:

```bash
npm run dev
```

Notes:
- Use a fine-grained token with read-only public access.
- Keep `.env` private and never upload it.
- Frontend env tokens can still be visible in built client bundles; for production, prefer a serverless proxy.

## Deploy Step-by-Step (GitHub + Vercel)

### A) Push project to GitHub from terminal

From the `pro-engineer-react` folder:

```bash
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

If your main kit is already in one Git repo, just commit and push normally from the root.

### B) Deploy on Vercel

1. Go to [Vercel](https://vercel.com/) and import your GitHub repo.
2. Framework preset should auto-detect as **Vite**.
3. Set root directory to `pro-engineer-react` (if deploying monorepo root).
4. Add environment variable in Vercel project settings:
   - Key: `VITE_GITHUB_TOKEN`
   - Value: your GitHub fine-grained token
5. Click Deploy.

Every push to `main` will redeploy automatically.

## Troubleshooting

- **GitHub API rate limit**: set `VITE_GITHUB_TOKEN` in `.env`, restart dev server, or use a serverless proxy.
- **CORS issues**: GitHub API usually allows browser access, but org/network policies may block it.
- **No data shown**: verify username in `src/config.js`.
- **Tailwind not applied**: ensure `src/index.css` includes all `@tailwind` directives.
- **Vercel shows no GitHub data**: confirm `VITE_GITHUB_TOKEN` is added in Vercel env vars and redeploy.

