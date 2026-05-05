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

### 3. Read the Voice Guide

Read `~/Documents/GitHub/dontoisme.github.io/_voice-guide.md` — follow it precisely.

Also read at least one reference post for voice calibration:
- `~/Documents/GitHub/dontoisme.github.io/_posts/2025-12-27-darwin-your-ais-eyes-on-the-build.md`

### 4. Choose the Post Type

- **First post about this project** → "Project intro" format: what is it, why I built it, how it works, what's next. Categories: `[projects, {name}]`
- **Project already has a post** → "Build log" format: what changed, why it matters, what's next. Categories: `[build-log, {name}]`
- **Pre-planned idea from blog-ideas.md** → Use that idea as the spine, pick appropriate categories
- **Technical deep-dive angle** → If the project has an interesting technical decision worth exploring. Categories: `[technical, {topic}]`

### 5. Write the Draft

Write the draft to: `~/Documents/GitHub/dontoisme.github.io/_drafts/{slug}.md`

Use kebab-case for the slug (e.g., `building-a-payment-layer-for-ai-agents.md`). Do NOT include a date prefix — Jekyll adds dates when drafts move to `_posts/`.

Follow this structure from the voice guide:
1. **Hook** (1-2 paragraphs): The problem or the surprising thing
2. **Context** (1-2 paragraphs): What I was building, why it matters
3. **How it works** (3-5 sections with headers): Technical specifics, real code/commands
4. **What I learned** (1-2 paragraphs): Broader takeaway
5. **What's next** (short): Honest roadmap or open questions
6. **Closing**: Links to repo, install command, or next step

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

### 6. Present the Draft

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
