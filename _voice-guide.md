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
