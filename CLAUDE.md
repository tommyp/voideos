# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `pnpm dev` — start Next.js dev server on :3000
- `pnpm build` — production build
- `pnpm start` — run built app
- `pnpm lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + ts)

No test framework configured. Package manager is pnpm (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`).

## Stack

- Next.js **16.2.6** (App Router) — see AGENTS.md warning: APIs differ from older Next; consult `node_modules/next/dist/docs/` before assuming behavior.
- React 19.2, TypeScript strict, Tailwind v4 (PostCSS plugin `@tailwindcss/postcss`, no `tailwind.config`), Zod v4.
- TS path alias: `@/*` → repo root.

## Architecture

Single-page video carousel:

- `app/page.tsx` renders `VideoPlayer` (currently passes a hardcoded `url` prop that the component ignores — VideoPlayer drives its own list).
- `app/components/VideoPlayer.tsx` is a client component (`"use client"`) wrapping `react-player`. Holds `playing` + `currentVideo` state; `onEnded` calls `getNextVideo` to advance.
- `app/data/videos.ts` loads `videos.json`, validates with a Zod `Videos` schema at module load, exports `listVideos`, `getNextVideo(currentUrl)` (wraps modulo), and the inferred `Video` type. Add videos by editing `videos.json` — runtime parse will throw on bad shape.

Layout (`app/layout.tsx`) wires Geist/Geist Mono via `next/font/google` and sets `html`/`body` to flex-column full-height so pages can flex-grow.
