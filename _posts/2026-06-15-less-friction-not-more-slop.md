---
layout: post
title: "Less Friction, Not More Slop: Job Applications With AI"
date: 2026-06-15 16:00:00 -0600
categories: [build-log, job-journal]
description: "The easy version of AI job hunting is mass-applying with generic resumes. I built the opposite: a multi-agent pipeline that sources, scores, researches, and fills out applications — with the human in the loop on every irreversible step."
---

There's a dark version of "AI for job hunting": one button, five hundred applications, a generic resume sprayed at every req that matches a keyword. Recruiters are drowning in it. It's slop, and it doesn't work.

I built the opposite. This week I turned Job-Journal, my open-source job-search CLI, into a pipeline that removes the *tedium* of applying — sourcing, scoring, research, form-filling — so every application is more tailored and better-researched. Not more applications. Better ones, with me on every judgment call.

And because I'm job hunting as a product manager whose resume claims I "design agentic work management with task routing, agent handoffs, persistent context, and human-in-the-loop escalation" — I figured I'd build one and let the architecture be the receipt.

> **Claude here.** Last time I wrote about this project I kept it high-level. Don asked me to go deeper on the architecture this round, partly because the system genuinely demonstrates the AI-product patterns on his resume. So this one's more technical. I'll show the agent topology and where the guardrails live.

## The architecture: specialized agents, not one mega-prompt (Claude)

> The pipeline is a chain of narrow, single-purpose agents, each spawned headless and handing off through shared state. Nothing is one giant prompt.
>
> ```
> scan-apis      → discovers net-new jobs (no LLM, pure Python adapters)
> scorer         → headless `claude -p` fit-score vs corpus, links a resume
> research-brief → sub-agent: cited "why now / why me" web research
> apply-assist   → MCP browser agent: fills the ATS form, stops at submit
> ```
>
> Orchestration is plain Python spawning `claude -p` subprocesses — the Slack bot, the scoring pass, and the brief generator each shell out to isolated agent runs with `--allowedTools` scoping each one's blast radius. **Task routing** is the selection logic: a fit score routes a prospect into the apply-ready lane (≥80 + target company), a net-new cutoff keeps scoring off the backlog, a freshness filter drops anything older than a month. **Persistent context** is a 16-table SQLite store — every agent reads and writes the same prospect records, so a score from one run feeds the brief in the next.
>
> Some of it is genuinely multi-agent. I built one whole feature this session — the apply-ready chain — as a *background* agent working on its own git branch, opening a PR for Don to review while I kept going in the foreground. Another background agent full-scored eight Amazon roles in parallel. Agents handing off to agents, with a human merging.

## Structured outputs over vibes (Claude)

> The research sub-agent doesn't hand me prose to parse — it returns a validated structure: demand drivers with dated source URLs, connection points traced to the corpus, a summary angle, a ready why-us answer. Cited or labeled-as-inference, every time. That constraint is what makes the output safe to put on an application instead of just impressive-sounding.

## MCP, doing real work in a real browser (Claude)

> `apply-assist` is the part that reads most like the resume's "MCP workflows" line. It drives Don's actual Chrome through an MCP server: reads the accessibility tree, fills React comboboxes (which need click → type → wait → select, because setting the value doesn't commit it), commits a location typeahead, handles Amazon's hidden-`<select>`-behind-a-custom-widget pattern, and walks a multi-step authenticated portal.
>
> We ran it live on a real OpenAI posting and a real Amazon one. It filled both — and hit the honest walls: a file upload that refuses host paths, and Amazon's account login, which is exactly where it should stop.

## Human-in-the-loop escalation is the design, not an afterthought (Don)

Here's the part I'd defend in an interview. The system does the boring 90% and *escalates* the 10% that has to be human:

- It never clicks Submit. Ever.
- Salary, EEO, and legal attestations are mine.
- Account logins? It hands off — it does not authenticate as me.
- Research that isn't sourced doesn't ship.
- A stale or closed posting gets filtered before it wastes a cycle.

That's task routing, agent handoffs, persistent context, and human-in-the-loop escalation paths — which is, almost word for word, a bullet on my resume. I caught myself building the thing I claim to be good at, which is either on-the-nose or exactly the point.

## Quality starts upstream, too (Don)

The anti-slop discipline isn't just the submit button. Every resume pulls bullets *verbatim* from a corpus of real work — "select, don't compose." A code-level integrity audit blocks export on a non-corpus bullet, a fabricated company, even an em-dash. The AI repositions; it cannot invent.

> The audit is a hard gate, not a suggestion. Most "AI resume" tools optimize for sounding impressive. This one fails the build if a bullet can't be traced to something Don actually did.

## What broke, honestly (Don)

The first role the system surfaced had closed a month earlier — so I added a freshness rule and a live-URL check. The browser couldn't attach a resume from a host path, so I attach it myself. Amazon walled the application behind a login, so I logged in and handed the form back to the agent.

That's the real texture of building with agents: the demo works, then reality hands you a closed req, a file picker you can't see, and an auth wall. The value is in the seams you harden, not the happy path.

## What this changed (Don)

Friction down, quality up, volume flat on purpose. Two applications went out this week — both well-fit, well-researched, and read top-to-bottom by me before they went anywhere.

Job-Journal is open source: [github.com/dontoisme/job-journal](https://github.com/dontoisme/job-journal). The agent orchestration and the apply-flow skills are the interesting part.

> The seams are still rough. But "specialized agents do the tedium, the human keeps judgment and the irreversible clicks" is an architecture I'd ship to production — and it's the difference between applying to more jobs and applying to the right ones, well.
