# Writing Voice Guide — Don Hogan's Blog

Reference for AI-generated blog posts. Derived from published posts on dontoisme.github.io.

## Voice

- First-person, builder's perspective: "I built", "I learned", "I realized"
- Technical specificity over generality: name actual technologies, file names, line counts, commands
- Problem-first: open with the problem or the surprising thing, not the solution
- Conversational asides: "Yes, it's all bash. I know. I know."
- Light self-deprecation: "Also because I'm terrible at naming things"
- Opinionated with reasoning: "I'm intentionally keeping it iOS-only" — take positions, explain why
- Build-in-public transparency: share real numbers, real limitations, real trade-offs

## Structure

1. **Hook** (1-2 paragraphs): The problem or the surprising thing
2. **Context** (1-2 paragraphs): What I was building, why it matters
3. **How it works** (3-5 sections with headers): Technical specifics, code blocks, real examples
4. **What I learned** (1-2 paragraphs): Broader takeaway or reflection
5. **What's next** (short): Honest roadmap or open questions
6. **Closing**: Links to repo, install command, or next step — light, not pushy

## Formatting

- Short paragraphs: 1-3 sentences max
- Heavy use of section headers (##)
- Code blocks with actual commands, JSON, file paths — not pseudocode
- 800-1200 words total
- 2-3 lowercase categories per post: `[projects, agent-commerce]`, `[build-log, squabble]`, `[technical, firebase]`

## Anti-Patterns

- "In this post, we'll explore..."
- "Let's dive in"
- "Excited to share" / "game-changing" / "revolutionary"
- Listicles that enumerate without adding insight
- Passive voice
- Explaining things the reader already knows ("React is a JavaScript framework")
- Generic conclusions ("In conclusion, X is important")
- Corporate voice or third-person framing

## Dual-Voice Format (Don + Claude)

The blog's signature format. Don and Claude co-author the post, each with a distinct voice and role. The reader sees a real collaboration, not Claude ghostwriting for Don.

### Voice Roles

- **Don** — handles the why, the opinions, the frustrations, the judgment calls. First-person, builder's perspective. Sections are unquoted prose.
- **Claude** — handles the how, the technical details, the system-level observations. Sections use `>` blockquotes throughout. Claude speaks in first person about its own work ("I scan all 24 repos") but never pretends to be Don.

### Structure

1. **Hook** (Don, unlabeled) — 1-2 paragraphs. The problem or the surprising thing. No `(Don)` tag on the opening — it's obviously Don.
2. **Claude intro** — A single `>` blockquote starting with `> **Claude here.**` Establishes Claude's role in this specific post. 2-3 sentences max.
3. **Body sections** — Alternate between Don and Claude. Each `##` header is tagged: `## Section Title (Don)` or `## Section Title (Claude)`. Not every section needs a partner response, but the post should feel like a conversation.
4. **Mixed sections** — A Don-labeled section can end with a Claude blockquote response (and vice versa, though less common). This works well for sections where both perspectives add something.
5. **What's Next** — Usually Don, sometimes with a Claude blockquote adding its own take on what's next.
6. **Closing** — Don's voice, untagged. Optional short Claude sign-off in blockquote (one line, not forced).

### Formatting Rules

- Don's prose: normal markdown, no blockquote
- Claude's prose: always in `>` blockquotes
- Section headers: `## Title (Don)` or `## Title (Claude)` — the name goes in parentheses
- The hook and closing don't get `(Don)` tags — they're obviously Don's voice
- Code blocks, diagrams, and command examples can appear in either voice's sections
- Aim for roughly 60/40 Don/Claude split — Don drives the narrative

### When to Use Dual-Voice

- **Always** for project intros and build logs — these are collaborations by nature
- **Optional** for technical deep-dives — use it when Claude's implementation perspective adds something; skip it for posts that are purely Don's reflection
- **Never** force it — if a post reads better as single-voice Don, write it that way

### Reference Posts

For dual-voice calibration, read these:
- `_posts/2026-05-05-how-we-built-an-ai-blog-that-actually-ships.md` (the original dual-voice post)
- `_posts/2026-05-05-what-happens-when-your-ai-needs-to-buy-something.md` (more technical, tighter Claude sections)

## Post Types

### Project intro (first post about a project)
- What is it, why did I build it, how does it work, what's next
- Categories: `[projects, {project-name}]`

### Build log (update on active work)
- What changed this week, why it matters, what's next
- More casual, shorter — 600-800 words is fine
- Categories: `[build-log, {project-name}]`

### Technical deep-dive
- Specific technical decision or implementation
- More code, more detail, narrower scope
- Categories: `[technical, {topic}]`

## Frontmatter Template

```yaml
---
layout: post
title: "Title Here"
date: YYYY-MM-DD HH:MM:SS -0600
categories: [type, topic]
description: "One-line description for SEO and social cards"
---
```

## Reference Posts

For voice calibration, read these published posts:
- `_posts/2025-12-27-darwin-your-ais-eyes-on-the-build.md`
- `_posts/2025-12-27-prompt-to-install-the-new-developer-tool-ux.md`
