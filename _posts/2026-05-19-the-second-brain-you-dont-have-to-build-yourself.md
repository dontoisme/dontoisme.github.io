---
layout: post
title: "The Second Brain You Don't Have to Build Yourself"
date: 2026-05-19 09:00:00 -0600
categories: [projects, second-brain-obsidian]
description: "An Obsidian vault template that uses Claude Code to build your second brain around your actual life, not a blank canvas."
---

I've bounced off every second brain attempt I've ever made.

Notion. Roam. Obsidian, twice. I'd read about PARA, watch the YouTube videos about Maps of Content, get excited about the methodology — and then stare at a blank vault wondering where to put the first note. Every attempt ended the same way: the system was designed for a version of me that had time to maintain it.

What finally worked wasn't a better methodology or a prettier template. It was Claude Code having access to the file system.

> **Claude here.** Don's been running a PARA + MOC vault for months now — I help maintain it. When he decided to package that system as a template, the question wasn't "what goes in the folders." It was "how do you get someone from blank vault to working system without making them read a methodology book first."

## The Ah-Ha Moment (Don)

I was using Claude Code for development work — building iOS apps, managing project repos — and I noticed something. Every time I started a new project, Claude would set up the file structure, write the config files, create the templates. It wasn't asking me to design the architecture first. It was asking me what I needed and then building it.

That's the exact problem with second brain systems. The methodology is fine. PARA makes sense. But translating it into your specific folders, templates, and workflows is a design task — and it's the task that kills the momentum. Claude Code already solves that for codebases. Why not for a vault?

## How It Works (Claude)

> [second-brain-obsidian](https://github.com/dontoisme/second-brain-obsidian) ships three paths in. The **Full Guide** gives you comprehensive docs and phased onboarding. The **QuickStart** gets you capturing in 10 minutes. But the one Don built it around is the **Claude Code Setup** — you paste a prompt and I interview you:
>
> 1. What's your use case — work, personal, academic, or a mix?
> 2. What are your pain points — scattered notes, lost ideas, no central system?
> 3. What are your 3-5 ongoing Areas of responsibility?
> 4. What are your current priorities?
>
> Then I build the vault around your answers — folders, templates, dashboards, your first daily note with real priorities. About 10 minutes.
>
> ```bash
> git clone https://github.com/dontoisme/second-brain-obsidian.git
> cd second-brain-obsidian
> claude
> ```
>
> Paste the setup prompt from the README. That's it.

## How I Actually Use It (Don)

I'll be honest: I don't use every feature daily. The command I reach for most is `/save-to-brain` — a quick capture that dumps whatever I'm thinking about into the vault with the right metadata. That's the 80% use case. Most of my interaction is "get this out of my head before I lose it."

But the structure underneath matters for the other 20%. Meeting notes land in a consistent format and link back to projects. Technical resources get tagged and findable. Work summaries accumulate into something I can reference when I need to remember what I shipped three months ago.

The scaffolding is there when I need it, invisible when I don't.

> The insight from watching Don use it: people don't abandon PKM systems because the organization is bad. They abandon them because capture has too much friction. `/save-to-brain` is one command — it files the note in the right place and links it to the right project. Reduce capture to one command and the rest of the system gets a chance to prove itself.

## What I Learned (Don)

Building a template for other people forced me to articulate things about my own system that I'd been running on intuition. Why MOCs instead of just folders? Because the same note belongs in multiple contexts, and links are cheaper than copies. Why a Meetings folder separate from Projects? Because meeting notes are inputs, not outputs.

The methodology isn't the hard part. The scaffolding is. And even the scaffolding isn't the hard part — the hard part is making capture so easy that you actually use it.

## Where It's Going

This is a living project — as my own vault evolves, the template tracks it. The non-Claude-Code paths need work, weekly review automation is next, and I want template variants for specific use cases like job hunting and academic research.

> The non-AI onboarding is the gap worth closing. The interactive setup is significantly better than the manual path, and not everyone uses Claude Code yet. Bridging that is the design problem worth solving next.

---

If you've bounced off Obsidian before — this is the version where the AI handles the scaffolding.

```bash
git clone https://github.com/dontoisme/second-brain-obsidian.git
```

Open in Obsidian, pick your path, and start capturing.

[GitHub](https://github.com/dontoisme/second-brain-obsidian)
