---
description: Generate a blog post draft for a specific project
allowed-tools: Bash, Read, Write, Glob, Grep, Agent
---

# Blog Draft Generator

Generate a blog post draft for a specific project, written in Don's voice.

## Arguments

`$ARGUMENTS` — required: project name (e.g., `agent-commerce`, `squabble-react-native`)

## Instructions

### 1. Gather Context

Read these files from the project directory (`~/Projects/{project}/`):
- `CLAUDE.md` (project context, architecture, conventions)
- `README.md` (public-facing description)
- `STATUS.md` (current state, if exists)
- `package.json` or `pyproject.toml` (tech stack)
- Recent git log: `git -C ~/Projects/{project} log --oneline -20`
- File change summary: `git -C ~/Projects/{project} diff --stat HEAD~10 2>/dev/null`

### 2. Check Existing Coverage

- Read `~/Documents/GitHub/dontoisme.github.io/_data/projects.yml` — check if this project has a `last_post` date
- List existing posts: `ls ~/Documents/GitHub/dontoisme.github.io/_posts/` — check for posts about this project
- Read `~/Projects/Brain/Projects/blog-ideas.md` — find pre-planned ideas matching this project

### 3. Interview Don

Before writing anything, conduct a short interactive interview (3-5 questions). The goal is to capture Don's actual perspective in his own words. These answers become the raw material for Don's sections in the dual-voice format (see "Dual-Voice Format" section in `_voice-guide.md`).

Ask about:
- **Why** he built this — the moment or frustration that sparked it
- **What surprised him** during the build — something he didn't expect
- **Who it's for** — and who it's NOT for
- **What he'd tell someone** considering the same problem
- **What's unfinished** — honest assessment of where it stands

Use Don's actual phrasing in the draft. Don's voice sections should feel like him talking, not Claude summarizing him.

### 4. Read the Voice Guide

Read `~/Documents/GitHub/dontoisme.github.io/_voice-guide.md` — follow it precisely.

Also read at least one reference post for voice calibration:
- `~/Documents/GitHub/dontoisme.github.io/_posts/2025-12-27-darwin-your-ais-eyes-on-the-build.md`

### 5. Choose the Post Type

- **First post about this project** → "Project intro" format: what is it, why I built it, how it works, what's next. Categories: `[projects, {name}]`
- **Project already has a post** → "Build log" format: what changed, why it matters, what's next. Categories: `[build-log, {name}]`
- **Pre-planned idea from blog-ideas.md** → Use that idea as the spine, pick appropriate categories
- **Technical deep-dive angle** → If the project has an interesting technical decision worth exploring. Categories: `[technical, {topic}]`

### 6. Write the Draft

Write the draft to: `~/Documents/GitHub/dontoisme.github.io/_drafts/{slug}.md`

Use kebab-case for the slug (e.g., `building-a-payment-layer-for-ai-agents.md`). Do NOT include a date prefix — Jekyll adds dates when drafts move to `_posts/`.

Use the **dual-voice format** defined in `_voice-guide.md` under "Dual-Voice Format (Don + Claude)":
1. **Hook** (Don, unlabeled): The problem or the surprising thing
2. **Claude intro** (`> **Claude here.**`): Establish Claude's role in this post
3. **Body sections** (alternating `(Don)` / `(Claude)` headers): Don handles why/opinions, Claude handles how/technical — Claude sections always in `>` blockquotes
4. **What I learned** (Don): Broader takeaway or reflection
5. **What's next** (Don, with optional Claude blockquote): Honest roadmap
6. **Closing** (Don, untagged): Links to repo, install command, or next step

Aim for ~60/40 Don/Claude split. Don drives the narrative. Claude adds technical depth and its own observations.

Frontmatter:
```yaml
---
layout: post
title: "Title Here"
date: {today's date} HH:MM:SS -0600
categories: [{type}, {topic}]
description: "One-line SEO/social description"
---
```

### 7. Present the Draft

After writing the file, show Don:
- The title
- The first paragraph (the hook)
- Word count
- File location

Ask: "Want me to revise anything, or is this ready for review?"

### Quality Checklist

Before presenting, verify:
- [ ] Opens with a problem or surprise, not "In this post..."
- [ ] Uses specific technical details (file names, numbers, commands)
- [ ] No hype language or marketing-speak
- [ ] First-person voice throughout
- [ ] 800-1200 words
- [ ] Has a closing CTA with repo link
- [ ] Frontmatter is complete and correct
- [ ] Dual-voice format: Claude intro blockquote present (`> **Claude here.**`)
- [ ] Dual-voice format: section headers tagged `(Don)` or `(Claude)`
- [ ] Dual-voice format: all Claude prose in `>` blockquotes
- [ ] Dual-voice format: ~60/40 Don/Claude split
