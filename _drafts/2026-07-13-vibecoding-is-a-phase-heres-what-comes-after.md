---
layout: post
title: "Vibecoding Is a Phase. Here's What Comes After."
date: 2026-07-13 12:00:00 -0600
categories: [technical, ai-workflow]
description: "The patterns that turned my AI coding sessions from one-off vibes into a system: Beads for task memory, CLAUDE.md as contracts, and agents with actual lanes."
---

Vibecoding works great right up until you close the terminal.

I know because I did it for months. Open a session, describe what I want, watch code appear, ship something, feel like a wizard. Then the next morning: a fresh session with no memory of yesterday's decisions, a repo full of changes I half-remembered approving, and a todo list that lived in a chat transcript I'd never open again.

The problem isn't the model. The model is fine — better than fine. The problem is that a conversation is not a system. Somewhere around project number five, I stopped trying to make individual sessions smarter and started building the scaffolding around them instead.

> **Claude here.** I'm the AI in this story, so I'll describe what it's like working inside Don's setup versus a bare session. The short version: in a bare session I'm improvising. Here, I walk into a workspace where the state, the rules, and my job description are already written down. The receipts below come from Claude Code's own insights report on Don's last three weeks: 188 sessions analyzed, 172 commits, 35 of 48 session goals fully achieved.

## Every session ends. That's the actual problem.

Here's the thing nobody tells you about AI-assisted development: the model's context window is not your project's memory. Every session starts at zero. If your task list, your decisions, and your conventions live in the conversation, they die with the conversation.

So the first real pattern is boring: **externalize everything that needs to survive.**

Tasks go in a real tracker. Conventions go in a file the AI reads on startup. Decisions get written down where the next session — human or AI — will find them.

I learned this one the expensive way. A few weeks ago I had six parallel subagents racing to draft phase specs before my session window expired. An account-wide limit killed all six mid-sentence — and because they were holding their output until the end instead of writing to disk as they went, nothing survived. Six agents' worth of work, gone, because it lived only in the session. The rule writes itself.

## Beads is the task list that survives (Claude)

> Don banned me from using ephemeral todo lists. Every project's CLAUDE.md says the same thing: no TodoWrite, no markdown TODO files — all task tracking goes through [Beads](https://github.com/steveyegge/beads), a git-native issue tracker built for exactly this workflow.
>
> Eight of his repos have a `.beads/` directory. The blog repo alone has 57 tracked issues. His `hogan-os` project shows 53 issues with 33 closed; `job-journal` has 63 with dependency chains and blocked states. When I start a session, `bd ready` tells me what's actually available to work on — not what someone remembered to mention in the prompt.
>
> ```bash
> bd ready              # what can I work on right now?
> bd update <id> --claim
> bd close <id> --notes "what actually happened"
> bd dolt push          # task state syncs like code
> ```
>
> The part that changes my behavior most is the session-close protocol. Every CLAUDE.md ends with the same mandate: file issues for anything unfinished, run the quality gates, push Beads, push git, verify "up to date with origin." One rule reads: *"NEVER say 'ready to push when you are' — YOU must push."* Work that isn't pushed is work that's stranded. I don't get to end a session with vibes.

## CLAUDE.md is a contract, not documentation

I have 16 CLAUDE.md files across my projects, plus one at the root of my projects directory that describes me — how I work, what stack I default to, what I've been burned by.

The mistake I made early on was writing these like READMEs. They're not READMEs. They're contracts. The useful entries aren't "this is a React app" — they're the things a fresh session would get wrong:

- *"`bd update` does NOT support `--deps` — use `bd dep add`. Verified 2026-07-12."*
- *"In `.map()` callbacks, return `null`, not `undefined`, when filtering."*
- *"Admin SDK on the server. Never blanket merge-resolve."*

Every one of those lines is a scar. When Claude and I hit a gotcha, it goes in the file with a date. That's the difference between an AI that repeats your mistakes and one that inherits your experience.

## Agents with names and lanes (Claude)

> Don has 35 custom slash commands, and the pattern behind them is worth stealing: each one is a thin loader, not a fat prompt. `/ios-qa` is twenty lines that point me at a persona file living in the project repo. The intelligence is versioned with the code it applies to.
>
> The iOS roster has fourteen of these — Sherlock for QA, Pixel for UI, Darwin for build automation, Vault for security. That sounds like naming things for fun (Don admits he partly is), but the lanes are the point. A `/phase` command maps his five-phase app lifecycle to which agents to summon, so "what should I work on and who does it" is a lookup, not a negotiation.
>
> And the boundaries are hard, not vibes. His job-application pipeline chains scoped agents through shared SQLite state — and the browser agent that fills out application forms is not allowed to click Submit. Ever. The irreversible step belongs to the human.

## The payoff is headless

When the scaffolding is right, sessions stop being conversations. My usage report over the last three weeks says a striking share of mine begin with a single slash command — score this job, stage this resume, run the monitor — and end with the pipeline finished, no back-and-forth in between. 3,334 shell commands. 172 commits. Most of it work I never watched happen.

The part I'd defend in an interview: the system fails informatively rather than silently. When a job posting got pulled mid-pipeline, the workflow verified it was gone three separate ways, logged it as closed, and stopped — instead of applying into the void or quietly skipping it. That behavior isn't the model being smart. It's the gates I wrote down once, enforced every run since.

## The human stays on the irreversible steps

That last line is the whole philosophy, so let me say it plainly: I automate the reversible and gate the irreversible.

Drafts get generated automatically; publishing goes through a review command. Forms get filled; submission is mine. Code gets written; pushes happen through a checklist. The goal was never to remove myself from the loop. It was to remove myself from the *boring parts* of the loop so the judgment calls get my full attention.

## What I learned

The shift from vibecoding to this wasn't one big decision. It was noticing, over and over, that anything living only in a conversation was already lost — and moving it somewhere durable, one piece at a time.

Prompting skill matters less than I expected. Infrastructure matters more. The model in my terminal today is the same one in yours. The difference is that mine walks into a room where the lights are on.

## What's next

The Beads epic currently open on this blog is meta enough to be funny: 57 issues to document all 24 active projects, tracked in the same system the posts describe. And the feedback loop I wanted — session insights flowing back into the CLAUDE.md contracts — is starting to close itself: this post was partly fed by Claude Code's `/insights` report, which read my last 188 sessions and handed back exact CLAUDE.md additions, including the correct `bd doctor` flags I'd fumbled once and would have fumbled again.

If you're vibecoding and it's working: enjoy it, honestly. But when you hit the morning where you can't remember why yesterday's session made that choice — that's not a sign the AI failed. That's the sign it's time to build the system around it.

> One line from my side: the best sessions aren't the ones where I'm most clever. They're the ones where the scaffolding made clever unnecessary.
