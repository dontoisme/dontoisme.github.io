---
layout: post
title: "Prompt to Install: The New Developer Tool UX"
date: 2025-12-27 14:00:00 -0600
comments: true
categories: [ai, developer-tools, ux]
---

Here's the Quick Start section from Darwin's README:

```
Open your iOS project in Claude Code or Cursor, then paste:

Install Darwin (brew tap dontoisme/darwin && brew install darwin)
and set it up for visual regression testing. Run darwin init
--ai-interactive, present the options to me, complete the setup
including test navigation logic, then capture baseline screenshots.
```

That's it. That's the getting started guide.

Your AI assistant installs the tool, runs the setup wizard, writes your configuration files, generates test stubs, and captures your first screenshots. You just pick options when it asks.

I didn't plan this. I was building Darwin as a traditional CLI tool, writing docs for humans, and somewhere along the way I realized: the humans aren't reading the docs anymore. Their AI assistants are.

## The Old Way Is Dead

Traditional developer tool onboarding looks like this:

1. Read the README
2. Install the tool
3. Run the init command
4. Read the output, figure out what it means
5. Open the config file, understand the schema
6. Edit the config by hand
7. Run the next command
8. Hit an error, go back to docs
9. Repeat until working

This works. It's just slow, and it requires the developer to context-switch between reading docs, understanding concepts, and executing commands.

But watch what happens when I paste that prompt into Claude Code:

1. Claude reads the prompt
2. Runs `brew tap dontoisme/darwin && brew install darwin`
3. Runs `darwin init --ai-interactive`
4. Parses the structured JSON output
5. Presents me with the choices: "Which Xcode project?" "Which screens to include?"
6. I pick options
7. Claude writes the manifest, generates test stubs, adds navigation logic
8. Runs `darwin capture --baseline`
9. Done

The entire setup that used to take 20 minutes of reading and typing now takes 2 minutes of picking options.

## Designing for AI Consumption

The key insight was the `--ai-interactive` flag.

Most CLI tools output human-readable text. Colorful banners, ASCII art, helpful hints. Great for humans, terrible for AI parsing.

When you run `darwin init --ai-interactive`, the tool outputs structured JSON:

```json
{
  "type": "choice",
  "id": "project_selection",
  "prompt": "Which Xcode project should Darwin use?",
  "options": [
    {"value": "MyApp.xcodeproj", "label": "MyApp.xcodeproj"},
    {"value": "MyApp.xcworkspace", "label": "MyApp.xcworkspace (workspace)"}
  ]
}
```

The AI can parse this, present it to me in its native UI, collect my response, and pipe it back. No regex parsing of colored terminal output. No guessing what the tool is asking for.

This is the shift: **from human-readable output to machine-readable handoff protocols**.

## The Documentation Becomes Rules

Here's another thing that emerged: the traditional "docs" aren't the primary documentation anymore.

Darwin generates a `CLAUDE.md` file (and `.cursorrules` for Cursor users) that gets placed in your project. These files contain:

```markdown
## Darwin Visual Regression Testing

When asked to set up Darwin, run:
darwin init --ai-interactive

Present the options to me, then follow the
"AI ASSISTANT" handoff instructions...
```

This isn't documentation for humans. It's instructions for AI assistants that get loaded into their context automatically. The AI reads these rules, knows how to operate the tool, and can help users without them ever reading a README.

The README still exists. But it's becoming a secondary artifact—something for people who want to understand the tool deeply, not the primary onboarding path.

## Handoff Points

The other pattern that emerged: explicit handoff points.

Darwin's init wizard does everything it can automatically—detecting your Xcode project, scanning for SwiftUI views, generating test stubs. But some things require human judgment: which screens are "real" screens vs. components, what the navigation flow is, whether to include authenticated screens.

At these decision points, the wizard outputs:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 AI ASSISTANT: Complete the following tasks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Read Screenshots/manifest.json
2. Update flows_to connections based on NavigationLinks
3. Add navigation logic to generated test stubs
4. Run: darwin capture --baseline
```

The tool explicitly tells the AI what to do next. Not "refer to the docs"—specific, executable instructions.

## What This Means for Developer Tools

If you're building developer tools in 2025, I think you need to consider:

**1. Your real user might be an AI assistant**

The human is still the decision-maker. But the entity reading your docs, running your commands, and debugging your errors is increasingly an AI. Design for that.

**2. Structured output isn't optional**

JSON output modes, machine-readable errors, explicit state. The `--json` flag on every command isn't a nice-to-have anymore.

**3. AI rules files are the new docs**

`CLAUDE.md`, `.cursorrules`, whatever the next assistant uses—these are the files that actually get read. The README is for GitHub browsers.

**4. Explicit handoffs beat implicit flows**

Don't assume the user (or their AI) knows what to do next. Emit explicit instructions at every decision point.

## The Prompt to Install Pattern

I'm calling this "Prompt to Install" because that's literally what it is. The user's first interaction with your tool is a prompt they paste into their AI assistant.

The prompt contains everything: what to install, how to configure it, what the expected outcome is. The AI executes it. The human supervises.

This is a better experience for everyone:

- **For new users**: No learning curve. Paste and go.
- **For experienced users**: Skip the parts you know, let AI handle boilerplate.
- **For tool authors**: Your tool gets used correctly. No "I followed the docs but it didn't work."

The best install experience is no install experience. Just a prompt.

---

Darwin is open source: [github.com/dontoisme/darwin](https://github.com/dontoisme/darwin)

Try the Prompt to Install experience:
```
Install Darwin (brew tap dontoisme/darwin && brew install darwin)
and set it up for visual regression testing. Run darwin init
--ai-interactive, present the options to me, complete the setup
including test navigation logic, then capture baseline screenshots.
```
