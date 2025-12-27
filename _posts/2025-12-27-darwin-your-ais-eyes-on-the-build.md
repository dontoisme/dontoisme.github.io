---
layout: post
title: "Darwin: Your AI's Eyes on the Build"
date: 2025-12-27 10:00:00 -0600
comments: true
categories: [ios, tools, ai]
---

I've been building iOS apps with Claude for a few months now, and there's one problem that kept biting me: I'd ask the AI to fix a bug or add a feature, and somewhere in the process it would quietly break something visual. A button would shift. A margin would disappear. The login screen would suddenly look... wrong.

The AI doesn't know it did this. It can't see the screen. And by the time I notice, I'm five commits deep wondering which change broke it.

So I built Darwin.

## The Problem with AI-Assisted iOS Development

Here's the thing about working with AI coding assistants: they're remarkably good at understanding code, but they're completely blind to what the app actually looks like. You can describe a UI bug in words, paste in SwiftUI code, even share screenshots—but the AI has no persistent memory of your app's visual state.

This creates a gap. The AI makes changes. The app compiles. Tests pass. But something's off, and you won't know until you run the simulator and actually look.

## What Darwin Does

Darwin sits in that gap. It's a visual regression testing tool designed specifically for iOS development with AI assistants.

The core idea is simple: **capture screenshots only when the code that affects them changes.**

Here's how it works:

1. You define a manifest that maps each screen to the source files that affect it
2. Darwin watches your git commits
3. When you commit changes to `ProfileView.swift`, Darwin automatically runs the capture for just the Profile screen
4. It saves the screenshot, organizes it by commit, and builds a timeline
5. You can compare any two captures with pixel-level diffs

The key insight is the Git-awareness. Darwin doesn't blindly capture every screen on every commit. It uses `git diff` to figure out which source files changed, matches them against your manifest, and only captures the affected screens. This makes it fast enough to run automatically via git hooks.

## The Timeline Viewer

The captures are only half the story. The other half is seeing them.

Darwin generates an interactive HTML viewer that shows your app's visual evolution over time. You can:

- Scrub through captures chronologically (single mode)
- Compare any two captures side-by-side with pixel diffs (compare mode)
- View your app's navigation flow as a graph that evolves over time (map mode)

That last one—map mode—was an accident. I originally built it to debug navigation issues, but it turned into my favorite way to understand how an app is growing. You can literally watch features emerge as you play through the timeline.

## Auto-Detection

One thing I learned quickly: maintaining a manifest is tedious. So Darwin now auto-detects new SwiftUI views.

Run `darwin detect` and it scans your project for SwiftUI structs conforming to `View`, checks which ones aren't in your manifest yet, and offers to add them. It even generates the XCUITest stubs you need to capture them.

It's not perfect—it can't read your mind about which screens are "real" screens vs. reusable components—but it catches about 80% of new screens automatically.

## Firebase Integration

This one surprised me. A lot of my screens require authentication, and they'd fail silently during automated capture because there's no logged-in user.

Darwin now detects Firebase projects and checks if your local emulators are running. Screens marked with `requires_firebase: true` in the manifest get special handling. It's a small thing, but it saved me hours of debugging "why is this screen always blank."

## AI-Native Design

Darwin was built to be used by AI, not just for AI.

There's an `--ai-interactive` flag that outputs structured JSON instead of human-friendly text. The init wizard can hand off incomplete setup to Claude or Cursor with explicit instructions. It generates CLAUDE.md and .cursorrules files with Darwin-specific conventions.

The goal is that you can tell Claude "set up Darwin for this project" and it actually can. No copy-pasting, no interpreting output meant for humans.

## ~8,500 Lines of Bash

Yes, it's all bash.

I know. I know. But bash is everywhere, it has no dependencies, and it pipes beautifully. The whole thing is 13 modular scripts that communicate through JSON. No build step, no node_modules, no Python environments. Just executable scripts and jq.

The viewer is a single 127KB HTML file with no external dependencies. You can email it to someone and they can open it in any browser.

## Getting Started

If you want to try it:

```bash
brew tap dontoisme/darwin
brew install darwin
```

Then in your iOS project:

```bash
darwin init
```

The wizard walks you through setup, detects your Xcode project, and gets you to your first capture in about two minutes.

## What's Next

Darwin is scratching my own itch, so the roadmap is basically "whatever problems I hit next." Currently:

- Simulator auto-detection (resolve "latest" to the newest iOS version)
- Manifest drift detection (alert when views exist but aren't in manifest)
- GitHub Actions integration for CI

I'm intentionally keeping it iOS-only. Web has plenty of visual regression tools. iOS has almost none that understand Git and work well with AI workflows.

## The Name

Darwin, because it watches your app evolve.

Also because I'm terrible at naming things and it was the first word that stuck.

---

If you're doing AI-assisted iOS development and want to see what your AI is doing to your UI, give Darwin a shot. It's free, it's open source, and it might save you from the "wait, when did the login button move?" moment.

[GitHub](https://github.com/dontoisme/darwin) | [Homebrew](https://github.com/dontoisme/homebrew-darwin)
