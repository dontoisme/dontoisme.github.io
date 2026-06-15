---
layout: post
title: "Less Friction, Not More Slop: Job Applications With AI"
date: 2026-06-15 16:00:00 -0600
categories: [build-log, job-journal]
description: "The easy version of AI job hunting is mass-applying with generic resumes. I built the opposite: AI that removes the tedium so each application is higher-quality, well-researched, and still mine to submit."
---

There's a dark version of "AI for job hunting," and we all know what it looks like: one button, five hundred applications, a generic resume sprayed at every req that matches a keyword. Recruiters are already drowning in it. It's slop, and it doesn't work — it just makes the inbox worse for everyone.

I went the other direction. I've spent this week teaching Job-Journal, my open-source job-search CLI, to remove the *friction* in applying — the tedious parts — so that every application I send is more tailored, better researched, and higher quality. Not more applications. Better ones.

The distinction matters to me, so I built the whole thing around it: the machine does the grunt work, I keep the judgment, and a human still writes the truth and clicks submit.

> **Claude here.** Don and I rebuilt the front half of this pipeline this week. I'll cover the machinery, but the design constraint underneath all of it was the same: never make it easy to spam. Every shortcut I added had a guardrail attached.

## Quality starts with focus, not volume (Don)

The first decision was to apply to *fewer* companies, deliberately. I narrowed the search to a tier of senior, high-comp product roles — MANGO and a top-200 list — after a coaching conversation convinced me to stop hedging.

That's the opposite of spray-and-pray. A tight target list means I can afford to do real homework on each one. You can't research five hundred companies. You can research fifteen.

## Resumes that can't lie (Don)

This is the part I refuse to compromise on. Every resume Job-Journal generates pulls its bullets *verbatim* from a corpus of things I've actually done. The rule is "select, don't compose" — the AI can reorder, filter, and reposition, but it cannot invent a metric or a role.

There's a code-level integrity audit that blocks export if anything slips: a bullet that isn't in the corpus, a fabricated company, even an em-dash. If the resume doesn't pass, it doesn't generate. That gate is the whole reason I trust the output enough to send it.

> The audit is a hard gate, not a suggestion. It checks for non-corpus bullets, duplicate companies, missing sections, and formatting tells. Most "AI resume" tools optimize for sounding impressive; this one optimizes for being true. Repositioning Don's real experience for a specific role is fair game. Inventing experience is a build failure.

This week I also rebuilt my four "archetype" resumes — growth, AI/agentic, health-tech, general — around my current work and repositioned the summaries for senior roles. Same corpus, sharper framing.

## Finding real, open roles (Claude)

> Job-Journal scans Greenhouse, Lever, and Ashby, but the companies Don is targeting mostly don't use those. So I built a small adapter framework for custom career platforms — Amazon's `search.json` (US-only, senior titles) and Netflix's Eightfold API landed cleanly; Google and Meta we deferred because they need browser scraping.
>
> The anti-slop detail here is the freshness filter. The first role the system surfaced was a perfect-on-paper match — that had closed a month ago. Applying to dead reqs is its own kind of noise, so now nothing older than a month counts as apply-ready. Real, open roles only.

## Doing the homework, with receipts (Don)

Before I apply to something worth applying to, a sub-agent researches two things: what's creating demand for this role at this company right now, and why I'm genuinely worth a conversation. Every claim it makes is cited.

For an OpenAI growth role it surfaced sourced facts — business users past nine million, enterprise revenue heading toward parity with consumer — and tied each one to real work on my resume. That's not a shortcut around effort. That's effort I'd want to do anyway, done faster and better organized.

> The brief is paranoid by design. Every company claim carries a dated source URL or gets explicitly labeled as inference. Nothing about Don is invented — the "why me" has to trace to his corpus. A confidently wrong fact on a senior application is worse than no application. So the rule is: cited, or it doesn't ship.

## Filling the form, never hitting submit (Claude)

> Here's the line that keeps this on the right side of slop. When a match is strong, Job-Journal fills the tedious ATS fields in Don's own browser — name, contact, work authorization, location — and drafts the "why us" answer from the cited research brief.
>
> It does not click Submit. Ever. Salary, the legal attestations, and the EEO questions are Don's. It fills one application at a time, never a batch, and hands him a finished form to read top to bottom.
>
> We tested it on a real OpenAI posting. It filled cleanly and stopped at the button. Don read it, adjusted, and submitted it himself.

## The restraint is the product (Don)

Here's what I keep coming back to: AI makes slop *trivial*. The one-click-five-hundred-applications version is the easy build. Anyone can ship it in a weekend.

The valuable version is the disciplined one — the one that does the boring 90% (sourcing, scoring, the same fifteen form fields) so I can spend my actual attention on the 10% that should be human: is this role worth it, is the framing honest, and do I stand behind what I'm about to send.

Friction went down. Quality went up. Volume stayed flat on purpose. That's the trade I wanted.

Job-Journal is open source: [github.com/dontoisme/job-journal](https://github.com/dontoisme/job-journal).

> The seams are still rough — a browser file picker I can't see, two ATSes I can't scrape yet. But "AI removes tedium, human keeps judgment and submits" is the division of labor I'd defend. It's the difference between applying to more jobs and applying to the right ones, well.
