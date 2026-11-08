# Beyond Learrning — Website

The public website for **Beyond Learrning**, a law-focused education and mentorship platform offering four course areas: CLAT UG, AILET & other law entrance examinations, CLAT PG and Judiciary.

> The brand is spelled **Beyond Learrning** (double "rr"). This is intentional and matches the client's official brand and domain. Do not "correct" it. The ordinary English word "learning" is unaffected.

This app lives at `apps/web` inside the Beyond Learrning pnpm + Turborepo monorepo. It is built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Development

Run commands from the monorepo root:

```bash
pnpm install
pnpm dev        # start the dev server at http://localhost:3000
```

## Checks and builds

```bash
pnpm lint       # ESLint
pnpm typecheck  # TypeScript (tsc --noEmit)
pnpm build      # production build
```

To run a command for this app only, use `pnpm --filter web <script>`.

## Structure

- `src/app` — routes, root layout and global styles (brand tokens live in `globals.css`)
- `src/config/site.ts` — central site identity (name, tagline, description)
- `public/images/brand/` — official logo (`logo.png` for header/footer, `logo-mark.png`, untouched `logo-original.png`); favicon/app icons are `src/app/icon.png`, `apple-icon.png`, `favicon.ico`
- `src/config/contact.ts` — office address, email and phone (with `mailto:` / `tel:` links)
- `src/content/brand.ts` — Team Lead–approved introduction, About and "What Makes Us Different" copy
- `src/config/social.ts` — central social links (Instagram, YouTube); a platform is only shown once its exact official URL is set
- `src/content/courses.ts` — the four course areas (CLAT UG, AILET, CLAT PG, Judiciary)
- `src/content/founder.ts` — Founder's Note and portrait slot (`public/images/founder/`)
- `src/content/mentorship.ts` — mentorship copy and the optional mentor profiles list
- `public` — static assets
