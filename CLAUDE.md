# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Workflow Rules

- **Never push directly to `main`.** All changes must go through a pull request.
- Always create a feature branch for any change, commit to it, push the branch, and open a PR.
- `main` is only updated by merging a PR — never by direct push.

## Commands

```bash
pnpm dev          # start Vite dev server (requires Convex running first)
npx convex dev    # start Convex backend + generate _generated/ types (run before pnpm dev)
pnpm build        # production build (Vercel uses: npx convex deploy --cmd 'vite build')
pnpm typecheck    # TypeScript check (requires convex/_generated/ to exist)
```

**First-time setup:** `npx convex dev` must run at least once to generate `convex/_generated/` and populate `.env.local` with `VITE_CONVEX_URL`. The stubs in `convex/_generated/*.ts` are placeholders that get overwritten.

After linking Convex, run the seed mutation once from the Convex dashboard (`admin:seed`) to populate the initial 4 job listings.

## Architecture

**Stack:** React 18 + TypeScript + Vite 6 + Tailwind CSS v4 + React Router v7 + Convex (database + auth) + Vercel (hosting). Package manager: pnpm.

**Public site** (`src/pages/CareerPage.tsx`, `JobDetailPage.tsx`) reads live job data via `useQuery(api.jobs.list)` and `useQuery(api.jobs.getBySlug, { slug })`. Jobs use slug-based URLs (`/jobs/rd-engineer`).

**Admin portal** (`src/pages/admin/`) is a protected section at `/admin`. `AdminLayout.tsx` is the auth guard — it checks `useConvexAuth()` and redirects to `/admin/sign-in` when unauthenticated. Sign-in supports both `signIn` and `signUp` flows (first-time setup via sign-up).

**Convex backend split:**
- `convex/jobs.ts` — public read-only queries (only published jobs)
- `convex/admin.ts` — all write mutations + admin-only queries; every handler calls `getAuthUserId(ctx)` and throws if null

**Auth:** Convex Auth with `Password` provider (`convex/auth.ts`). Frontend uses `ConvexAuthProvider` (wraps `ConvexProvider`) in `src/main.tsx` and `useAuthActions()` from `@convex-dev/auth/react` for sign-in/sign-out.

**Styling:** Inline styles throughout (consistent with the original Figma Make export). Design tokens are CSS variables defined in `src/styles/brand.css` (`--primary: #44b0e2`, `--font-family-roboto`, `--font-family-comfortaa`, `--text-h1`…`--text-label`, `--radius-card`, `--radius-button`, etc.). Tailwind v4 is available but the existing components don't use utility classes.

**Assets:** SVG logo paths live in `src/assets/Landing/svg-kpsqtc8fir.ts` (used by `SiteHeader` and `SiteFooter`). Social icons are React components in `src/assets/IcFacebook/`, `IcInstagram/`, `IcYoutube/`.

## Convex schema

`jobs` table fields: `slug` (indexed), `title`, `department`, `location`, `type`, `deadline`, `overview`, `responsibilities: string[]`, `requirements: string[]`, `published: boolean`.

Admin job form (`AdminJobFormPage.tsx`) stores responsibilities and requirements as newline-separated textarea text, split into arrays on submit.
