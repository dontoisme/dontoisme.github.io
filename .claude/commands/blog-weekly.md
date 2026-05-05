---
description: "Weekly blog workflow: scan projects → generate drafts → review → publish"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Agent
---

# Blog Weekly — Full Publishing Workflow

The main weekly command. Scans all projects for activity, generates drafts for the most interesting ones, presents them for review, and publishes approved posts.

## Arguments

`$ARGUMENTS` — optional: comma-separated project names to write about (skips the scan step), or number of days to look back (default: 7)

## Workflow

### Step 1: Scan for Activity

If `$ARGUMENTS` is a number or empty, scan all active projects for git activity.

Run `git log --oneline --since="{DAYS} days ago"` for each of these project directories under `~/Projects/`:

**Tier 1:** squabble-react-native, agent-commerce, cleanspace-dfw
**Tier 2:** squabble-web, Squabble, alucard, hogan-os, zeroed, co-op-claude, darwin, Brain
**Tier 3:** TodoBien, job-journal, carsandbids-analyzer, nil-valuation, GQL, jj-interview-coach-skill, awesome-powered-by-claude-code, "Gmail Quick Filter", PythonWeb, second-brain-obsidian, homebrew-darwin, Bonterra-Exercise, DinoCodex

If `$ARGUMENTS` is a comma-separated list of project names, skip the scan and use those projects directly.

Present a table of active projects and recommend 1-3 to write about. Prioritize:
- Tier 1 projects over lower tiers
- Projects without existing blog posts (check `_data/projects.yml` `last_post` field)
- Projects with matching ideas in `~/Projects/Brain/Projects/blog-ideas.md`
- Most active projects (most commits)

**Ask Don:** "Which projects should I draft posts for?" Wait for confirmation before proceeding.

### Step 2: Generate Drafts

For each approved project, gather context and write a draft. Follow the full process described in `/blog-draft`:

1. Read project's CLAUDE.md, README.md, STATUS.md, package.json
2. Read the recent git log (20 commits)
3. Read the voice guide at `~/Documents/GitHub/dontoisme.github.io/_voice-guide.md`
4. Read a reference post for voice calibration: `~/Documents/GitHub/dontoisme.github.io/_posts/2025-12-27-darwin-your-ais-eyes-on-the-build.md`
5. Check for pre-planned ideas in `~/Projects/Brain/Projects/blog-ideas.md`
6. Choose post type: intro, build-log, or technical deep-dive
7. Write draft to `~/Documents/GitHub/dontoisme.github.io/_drafts/{slug}.md`

**Voice rules** (critical — from the voice guide):
- First-person, builder's perspective
- Open with the problem, not the solution
- Technical specificity: real file names, line counts, commands
- No hype language, no "Let's dive in", no passive voice
- Conversational asides, light self-deprecation
- 800-1200 words
- Short paragraphs (1-3 sentences), heavy section headers

### Step 3: Review

For each draft, present:
- Title + first 2 paragraphs
- Word count
- Suggested categories

Ask Don for each: **Approve**, **Edit** (with feedback), **Reject**, or **Defer**.

For edits: revise based on feedback and present again.

### Step 4: Publish

For approved posts:
1. Update the `date` in frontmatter to the current timestamp
2. Move from `_drafts/{slug}.md` to `_posts/{YYYY-MM-DD}-{slug}.md`
3. Delete the draft file
4. Update `_data/projects.yml` — set `last_post` to today for each project
5. Stage and commit:
   ```bash
   cd ~/Documents/GitHub/dontoisme.github.io
   git add _posts/ _data/projects.yml
   git commit -m "Publish: {titles}"
   ```
6. Ask Don: "Push to deploy? Posts will be live at dontoisme.github.io in ~1 minute."
7. On confirmation: `git push origin main`
8. Close corresponding beads tasks:
   ```bash
   cd ~/Documents/GitHub/dontoisme.github.io && bd close {task-id} --comment "Published: {title}"
   ```

### Step 5: Wrap Up

Report:
- Posts published with URLs
- Remaining beads epic progress
- Suggestion for next week

If any drafts were deferred, note them: "You have {N} drafts waiting in _drafts/ for next time."
