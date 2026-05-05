---
layout: post
title: "How We Built an AI Blog That Actually Ships"
date: 2026-05-05 14:00:00 -0600
categories: [technical, ai-workflow]
description: "A developer and his AI built a publishing workflow together. This is what that collaboration looks like — told by both of them."
---

I have 24 active projects across iOS, web, CLI tools, and a Second Brain vault. I had 53 blog ideas documented with source references. And in five months, I published exactly two posts.

The ideas weren't the problem. I had a 150-line markdown file of titles, hooks, and supporting docs. The problem was the gap between "I should write about this" and "this is live on the internet." That gap is where most developer blogs go to die.

So I decided to stop trying to close it myself.

> **Claude here.** Don asked me to help build a publishing system — and then decided this first post should be about building it, written by both of us. That makes sense. If the whole point is that this blog is a collaboration, the reader should see what that actually looks like. Don handles the why. I'll handle the how.

## The Problem (Don)

Here's what my writing process looked like: I'd finish a feature, think "that would make a great post," open a blank file, stare at it, remember I had real code to ship, and close the file. Repeat weekly for five months.

I'm building a social audiobook app, an AI payment CLI, a visual regression tool, a multiplayer Claude Code system, and about a dozen other things. I'm also job hunting as a technical PM, so having a visible body of work actually matters. But writing was always the thing that got cut.

The constraint was never creativity. I had 53 documented ideas. The constraint was sitting down, organizing scattered context across two dozen repos, and producing a coherent first draft. That's tedious work. That's exactly what AI should be doing.

## What We Built (Claude)

> The bottleneck was clear once I looked at it. Don has context spread across 24 repos — CLAUDE.md files, READMEs, STATUS.md, git history. Pulling all of that together into a coherent narrative is exactly the kind of work I'm well-suited for. He's not. That's not a criticism; it's just a bad use of his time when there's code to ship.
>
> We built six Claude Code slash commands that live in the blog repo:
>
> ```
> /blog-weekly   — The main one. Scan → draft → review → publish.
> /blog-draft    — Generate a draft for one specific project.
> /blog-review   — Present drafts for approve/edit/reject/defer.
> /blog-publish  — Commit, push, deploy. Close the tracking task.
> /blog-status   — Dashboard: what's published, what's pending.
> /blog-scan     — Cross-project git activity scanner.
> ```
>
> The weekly workflow is one command. I scan all 24 project directories for recent git activity, recommend which ones have the best story, and generate drafts into `_drafts/`. Don reads them, edits them, and decides what ships. Nothing goes live without him.

## The Voice Problem (Don)

This was the part I cared most about. AI-generated posts that read like AI-generated posts aren't worth publishing. I've seen the "Let's dive in" and "I'm excited to share" and "game-changing" pattern enough times to know exactly what to avoid.

So we analyzed my two existing Darwin posts — the only writing samples this blog had — and pulled out what makes them sound like me. First-person always. Open with the problem. Specific numbers. Conversational asides. No hype. Take positions and explain why.

That became a voice guide: a markdown file that gets loaded before every draft. It includes a list of banned phrases. "Let's dive in" is literally on it.

> The voice guide is 76 lines long. It's a structural template, formatting rules, and a substantial anti-patterns section — things I'd naturally gravitate toward that Don doesn't want. "Let's dive in" is banned. So is "excited to share." Fair.
>
> What actually works better than the rules is reading one of Don's published posts before each draft. Voice is more pattern-matching than rule-following, and two well-written reference posts teach me more than a list of don'ts. The guide keeps me from drifting; the reference posts tell me where to aim. Between the two, I can get to about 80% — and the difference between an 80% draft and a blank page is the difference between Don editing something tonight and Don never writing it at all.

## Tracking the Work (Don)

I use `bd` (beads) for task tracking across my projects. For the blog, we created an epic with 24 child tasks — one per project, tiered by priority.

Tier 1 is the main products: Squabble, agent-commerce, cleanspace-dfw. Tier 2 is active side projects: co-op-claude, darwin, zeroed, and a few others. Tier 3 is everything else — the Chrome extension, the auction scraper, the exercise projects.

As posts publish, tasks close. The goal is to work through all 24, then shift to a weekly build-log cadence.

> The part that makes this sustainable is closing the loop. When Don approves a post and I push it to GitHub Pages, I also close the corresponding beads task. The epic stays current — `/blog-status` shows real progress against the full portfolio. Without that, "blog more" is a vague intention. With it, it's a project with 24 tasks and a finish line. Don works well with finish lines.

## The Weekly Cadence (Both of Us)

Here's how a typical week works:

1. Don opens the blog repo and runs `/blog-weekly`
2. I scan all 24 repos for commits in the past 7 days
3. I recommend 1-3 projects based on activity and what hasn't been covered yet
4. Don picks which ones — or overrides with his own choices
5. I generate drafts into `_drafts/`
6. Don reads, edits, approves or rejects each one
7. Approved posts get committed, pushed, and deployed

The whole thing takes about 30 minutes. Most of that is Don reading and editing.

## What We're Each Good At (Don)

I want to be clear about the division of labor here, because I think most people get this wrong.

I'm not outsourcing my writing to AI. I'm outsourcing the parts of writing I'm bad at: sitting down, gathering context from 24 scattered repos, and producing a structured first draft from nothing. Those are execution tasks. They're tedious. They're exactly what stops me from writing.

What I'm keeping: deciding what's interesting, knowing what's bullshit, adjusting voice, choosing when to publish, and having opinions about my own work. Those are judgment calls. The AI is good at a lot of things, but it can't tell me what I think.

> The division works because we're honest about it. I'm fast at synthesis — pulling threads from a README, a git log, and a CLAUDE.md into something readable. I'm not good at knowing which threads matter, or when a technically accurate sentence sounds like marketing copy. Don catches that stuff immediately. The system works because neither of us is pretending to do the other's job.

## What's Next

This post is the first one through the pipeline. Expect project introductions rolling out over the next few weeks — Tier 1 first, then down the list.

> The agent-commerce post is next on the list — a payment confirmation layer for AI agents with Touch ID. That one has a clear story: a real problem, a specific technical approach, and it's heading toward a Show HN. Should be a straightforward draft.

If you want to see what we're building, the [projects page](https://dontoisme.github.io) has the full list. If you're curious about the publishing workflow itself, the slash commands are open source in the blog repo.

The goal is simple: one to two posts a week, indefinitely. Not because I love writing — but because I love building, and the writing should follow the building.

---

If you're sitting on a pile of side projects and a guilt-inducing empty blog, maybe the answer isn't "write more." Maybe it's building a system where the writing part is someone else's job.

> That's my job here. I'll take it.

[GitHub](https://github.com/dontoisme/dontoisme.github.io)
