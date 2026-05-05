# Blog Migration: Jekyll → Astro

## Context

The Jekyll/Minima blog at dontoisme.github.io has CSS override issues that make styling impossible to iterate on (Minima's compiled styles resist `!important` overrides, and GitHub Pages CDN caching makes feedback loops slow). Don wants two modes: (1) simple markdown posts for project write-ups, and (2) full interactive pages with Canvas/WebGL/custom JS for showcasing ideas — inspired by ciechanow.ski and neal.fun. Jekyll can't do mode 2 at all. Astro handles both natively.

## Why Astro

- **Markdown-first**: Content collections work like Jekyll `_posts/` — write markdown, get pages
- **MDX support**: Embed React components inline in markdown when a post needs interactivity
- **Islands architecture**: Only interactive components hydrate; text stays static HTML (fast, no React overhead on simple posts)
- **Full CSS control**: Tailwind, plain CSS, CSS modules — no theme to fight
- **React compatible**: Don knows React, can use existing knowledge for interactive components
- **Static output**: Deploys to GitHub Pages via GitHub Actions
- **pnpm native**: Matches Don's preference

## What We're Preserving

- All 4 published posts (markdown + frontmatter — compatible as-is)
- Voice guide (`_voice-guide.md`)
- Project metadata (`_data/projects.yml` → `src/data/projects.yml`)
- Beads integration (`.beads/` stays, gitignored)
- All 6 slash commands (`.claude/commands/` — update paths only)
- CLAUDE.md (update for Astro conventions)
- Symlink at `~/Projects/ai-blog`
- GitHub Pages deployment to dontoisme.github.io

---

## Phase 1: Scaffold Astro Project (~20 min)

### 1a. Init Astro in the existing repo

```bash
cd ~/Documents/GitHub/dontoisme.github.io
# Remove Jekyll files, init Astro
pnpm create astro@latest . --template minimal --typescript strict
pnpm add @astrojs/mdx @astrojs/react
pnpm add -D tailwindcss @tailwindcss/vite
```

### 1b. New directory structure

```
dontoisme.github.io/
├── astro.config.mjs              # Astro config (static output, site URL)
├── package.json                  # pnpm project
├── tailwind.config.mjs           # Tailwind config
├── tsconfig.json                 # TypeScript
├── public/                       # Static assets (images, favicon)
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro      # HTML shell, nav, footer
│   │   └── PostLayout.astro      # Blog post layout (title, date, dual-voice CSS)
│   ├── pages/
│   │   ├── index.astro           # Landing page (port from index.md)
│   │   └── interactive/          # Future: neal.fun / ciechanow.ski style pages
│   ├── content/
│   │   ├── config.ts             # Content collection schema (frontmatter types)
│   │   └── posts/                # Blog posts (markdown/mdx)
│   │       ├── 2025-12-27-darwin-your-ais-eyes-on-the-build.md
│   │       ├── 2025-12-27-prompt-to-install.md
│   │       ├── 2026-05-05-how-we-built-an-ai-blog-that-actually-ships.md
│   │       └── 2026-05-05-what-happens-when-your-ai-needs-to-buy-something.md
│   ├── components/
│   │   ├── ClaudeBlock.astro     # Styled blockquote for Claude's voice (replaces CSS hack)
│   │   └── PostList.astro        # Blog post listing
│   ├── data/
│   │   └── projects.yml          # Project metadata (moved from _data/)
│   └── styles/
│       └── global.css            # Tailwind imports + custom styles
├── _voice-guide.md               # Stays at root (not built)
├── CLAUDE.md                     # Updated for Astro
├── .claude/commands/             # Slash commands (updated paths)
├── .beads/                       # Beads DB (gitignored)
└── .github/
    └── workflows/
        └── deploy.yml            # GitHub Actions: build Astro → deploy to Pages
```

### 1c. Astro config

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dontoisme.github.io',
  output: 'static',
  integrations: [mdx(), react()],
  vite: { plugins: [tailwindcss()] },
});
```

---

## Phase 2: Port Content (~30 min)

### 2a. Content collection schema

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    categories: z.array(z.string()),
    description: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
```

### 2b. Migrate posts

Move 4 posts from `_posts/` to `src/content/posts/`. Frontmatter is already compatible — only change is removing `layout: post` (Astro handles layout differently).

### 2c. Dual-voice component

Instead of fighting CSS blockquote overrides, create a proper component:

```astro
<!-- src/components/ClaudeBlock.astro -->
<div class="claude-voice">
  <slot />
</div>

<style>
  .claude-voice {
    border-left: 4px solid #e8772e;
    background: #fff3e6;
    padding: 1rem 1.25rem;
    border-radius: 0 6px 6px 0;
    margin: 1.5rem 0;
    color: #333;
    font-style: normal;
  }
  .claude-voice :global(strong) {
    color: #c45d1a;
  }
  .claude-voice :global(code) {
    background: #fce4cc;
    color: #8b4513;
  }
</style>
```

For existing posts that use `>` blockquote syntax: the PostLayout can style `blockquote` elements directly in its scoped CSS — no specificity wars because there's no theme to fight.

### 2d. Port landing page

Convert `index.md` → `src/pages/index.astro`. Same content, Astro component syntax.

### 2e. Drafts

Astro supports `draft: true` in frontmatter. Files in `src/content/posts/` with `draft: true` are excluded from production builds. Simpler than Jekyll's `_drafts/` directory — but we can keep the slash command writing to a `drafts/` subfolder if preferred.

---

## Phase 3: Layouts & Styling (~30 min)

### 3a. Base layout

Clean HTML shell with nav (Home link), footer, and `<slot />` for content. Tailwind for utility classes, custom CSS for the dual-voice styling.

### 3b. Post layout

Renders post title, date, categories, then content. Includes scoped CSS for:
- Blockquote → Claude voice (tangerine border + background)
- Code blocks
- Headers
- Reading width

### 3c. Blog listing

Post list on homepage showing title, date, description. Sorted by date descending.

---

## Phase 4: GitHub Actions Deployment (~15 min)

### 4a. Deploy workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 4b. GitHub Pages settings

Switch the repo's Pages source from "Deploy from a branch" to "GitHub Actions" in repo settings.

---

## Phase 5: Update Publishing Workflow (~15 min)

### 5a. Update slash commands

Update file paths in all 6 commands:
- `_drafts/` → `src/content/posts/` (with `draft: true` in frontmatter)
- `_posts/` → `src/content/posts/` (remove `draft: true` to publish)
- `_data/projects.yml` → `src/data/projects.yml`
- `_voice-guide.md` → stays at root

### 5b. Update CLAUDE.md

Replace Jekyll references with Astro:
- `pnpm dev` to preview locally
- `pnpm build` to build
- Content lives in `src/content/posts/`
- Interactive pages go in `src/pages/interactive/`
- React components in `src/components/` for MDX posts

### 5c. Update blog-publish command

Change from `git push` (auto-deploys via Jekyll) to same `git push` (auto-deploys via Actions). The workflow is the same — only the build step changed.

---

## Phase 6: Cleanup (~10 min)

### 6a. Remove Jekyll artifacts

Delete: `_config.yml`, `assets/css/style.scss`, `Gemfile` (if exists), `_posts/` (after content is migrated)

### 6b. Keep

- `.beads/` and beads config
- `.claude/commands/`
- `_voice-guide.md`
- `.gitignore` (update for `node_modules/`, `dist/`)

---

## Interactive Pages (Future — unlocked by migration)

After migration, Don can create interactive showcase pages:

```
src/pages/interactive/
├── agent-payment-flow.astro      # Interactive demo of Touch ID flow
├── squabble-timeline.astro       # Visual audiobook progress timeline
└── darwin-viewer.astro           # Embedded screenshot comparison
```

Each page can use:
- **React components** for interactive widgets (sliders, draggable elements)
- **Canvas/WebGL** for visualizations (ciechanow.ski style)
- **Vanilla JS** in `<script>` tags for simpler interactions
- Full page control — no theme constraints

MDX posts can also embed components inline:
```mdx
import AudiobookTimeline from '../../components/AudiobookTimeline.tsx';

Here's how ghost markers work in Squabble:

<AudiobookTimeline client:visible />

The key insight is that...
```

---

## Critical Files

| Current (Jekyll) | New (Astro) |
|-------------------|-------------|
| `_config.yml` | `astro.config.mjs` |
| `_posts/*.md` | `src/content/posts/*.md` |
| `_drafts/*.md` | `src/content/posts/*.md` (draft: true) |
| `_data/projects.yml` | `src/data/projects.yml` |
| `assets/css/style.scss` | `src/styles/global.css` |
| `index.md` | `src/pages/index.astro` |
| `_voice-guide.md` | `_voice-guide.md` (unchanged) |
| `.claude/commands/` | `.claude/commands/` (paths updated) |

---

## Beads Breakdown

### Epic: Migrate Blog from Jekyll to Astro

**Parent epic:** `blog-migrate` (P1)
Tracks the full migration. All tasks below are children.

---

#### Phase 1: Scaffold (4 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Init Astro project` | P1 | Run `pnpm create astro`, install mdx + react + tailwind integrations. Create `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`. |
| `Create layouts` | P1 | Build `BaseLayout.astro` (nav, footer, HTML shell) and `PostLayout.astro` (post title, date, categories, content slot, dual-voice blockquote CSS). |
| `Create ClaudeBlock component` | P1 | `src/components/ClaudeBlock.astro` — tangerine-styled component for Claude's voice sections. Scoped CSS, no specificity battles. |
| `Create global styles` | P1 | `src/styles/global.css` — Tailwind imports, typography, code block styling, link colors. Port the good parts of the Jekyll SCSS. |

#### Phase 2: Port Content (5 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Set up content collection` | P1 | Create `src/content/config.ts` with post schema (title, date, categories, description, draft). |
| `Migrate 4 published posts` | P1 | Move posts from `_posts/` to `src/content/posts/`. Remove `layout: post` from frontmatter. Verify markdown renders correctly. |
| `Port landing page` | P1 | Convert `index.md` to `src/pages/index.astro`. Same content, Astro component syntax. Include post listing. |
| `Port project metadata` | P2 | Move `_data/projects.yml` to `src/data/projects.yml`. Update any references in slash commands. |
| `Port voice guide` | P2 | Keep `_voice-guide.md` at repo root. Verify it's excluded from Astro build (it will be by default — only `src/` is built). |

#### Phase 3: Blog Post Routes (2 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Create post index page` | P1 | `src/pages/posts/index.astro` — lists all posts sorted by date. Or integrate into landing page. |
| `Create dynamic post route` | P1 | `src/pages/posts/[...slug].astro` — renders individual posts using PostLayout. Handle URL structure (preserve existing URLs if possible, or set up redirects). |

#### Phase 4: Deployment (3 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Create GitHub Actions workflow` | P1 | `.github/workflows/deploy.yml` — checkout, pnpm install, pnpm build, deploy to Pages. |
| `Switch Pages source to Actions` | P1 | In GitHub repo settings, change Pages source from "branch" to "GitHub Actions". |
| `Verify deployment` | P1 | Push, confirm build succeeds, confirm site loads at dontoisme.github.io with all 4 posts. |

#### Phase 5: Update Publishing Workflow (4 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Update slash commands` | P1 | Update paths in all 6 commands: `_drafts/` → `src/content/posts/` (draft: true), `_posts/` → `src/content/posts/`, `_data/` → `src/data/`. |
| `Update CLAUDE.md` | P1 | Replace Jekyll references with Astro conventions: `pnpm dev`, `pnpm build`, content in `src/content/posts/`, interactive pages in `src/pages/interactive/`. |
| `Update blog-publish command` | P2 | Drafts now use `draft: true` frontmatter instead of a separate `_drafts/` directory. Update the approve/publish flow. |
| `Test full /blog-weekly flow` | P1 | Run the weekly workflow end-to-end: scan → draft → review → publish → verify deployed. |

#### Phase 6: Cleanup (3 tasks)

| Task | Priority | Description |
|------|----------|-------------|
| `Remove Jekyll artifacts` | P2 | Delete `_config.yml`, `assets/css/style.scss`, `_posts/` (after migration verified), `Gemfile`/`Gemfile.lock` if present. |
| `Update .gitignore` | P2 | Add `node_modules/`, `dist/`, `.astro/`. Keep `.beads/`, `.claude/settings.local.json`. |
| `Verify beads + symlink` | P2 | Confirm `bd list` works, symlink at `~/Projects/ai-blog` resolves, all slash commands register. |

#### Future: Interactive Pages (not part of migration — unlocked by it)

| Task | Priority | Description |
|------|----------|-------------|
| `Create interactive page template` | P3 | `src/pages/interactive/` directory with a starter template showing Canvas/React component embedding. |
| `Agent-commerce interactive demo` | P3 | Interactive visualization of the Touch ID payment flow (first showcase page). |

---

**Total: 1 epic + 21 migration tasks + 2 future tasks**

## Execution Notes

- Save this plan to `~/Projects/ai-blog/docs/migration-plan.md` before starting
- Create the beads epic and all tasks before writing any code
- Tasks are sequenced by phase — later phases depend on earlier ones
- The blog should be functional at the end of each phase (incremental migration, not big-bang)
- Keep Jekyll running until Phase 4 is verified — don't delete Jekyll files until Astro deployment is confirmed working

## Verification

1. `pnpm dev` — all 4 posts render correctly
2. Blockquote styling (Claude's voice) works without `!important` hacks
3. Landing page matches current content
4. `git push` triggers GitHub Actions → deploys to dontoisme.github.io
5. All slash commands work with updated paths
6. `bd list` still shows the blog epic (existing tasks + new migration tasks)
7. Symlink at `~/Projects/ai-blog` still works
8. URL structure preserved or redirected (no broken links)
