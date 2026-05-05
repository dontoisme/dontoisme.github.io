# dontoisme.github.io — Claude Context

Jekyll blog (Minima theme) for Don Hogan. Deployed via GitHub Pages on push to main.

## Blog Publishing Workflow

This repo has an AI-assisted blog publishing pipeline. Key paths:

- `_posts/` — Published posts (Jekyll standard)
- `_drafts/` — AI-generated drafts awaiting review
- `_data/projects.yml` — Project metadata registry (24 active projects)
- `_voice-guide.md` — Writing voice/style reference for AI-generated content

## Slash Commands

| Command | Purpose |
|---------|---------|
| `/blog-draft` | Generate a draft for a specific project |
| `/blog-review` | Present pending drafts for approval |
| `/blog-publish` | Commit + push approved posts |
| `/blog-status` | Dashboard: epic progress, drafts, recommendations |
| `/blog-weekly` | Full weekly orchestration (scan → draft → review → publish) |

The `/blog-scan` command lives at `~/Projects/.claude/commands/blog-scan.md` (cross-project scope).

## Post Conventions

- Frontmatter: layout, title, date, categories, description
- Categories: `[projects, {name}]` for intros, `[build-log, {name}]` for updates, `[technical, {topic}]` for deep-dives
- Voice: first-person, technical, specific, build-in-public. See `_voice-guide.md`.
- Length: 800-1200 words
- No hype language, no listicles, no passive voice

## Project Source

All project repos live at `~/Projects/`. The blog reads from them but does not write to them.

## Beads

Blog publishing tasks tracked via `bd`. Prefix: `blog-`. Epic covers documenting all 24 active projects.

## Tech

- Jekyll + Minima theme
- jekyll-seo-tag plugin
- GitHub Pages deployment (push to main)
- No Gemfile committed — uses GitHub Pages default gems


<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:ca08a54f -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd dolt push
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
