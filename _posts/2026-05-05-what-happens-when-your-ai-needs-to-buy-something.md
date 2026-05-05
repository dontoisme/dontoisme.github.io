---
layout: post
title: "What Happens When Your AI Needs to Buy Something"
date: 2026-05-05 16:00:00 -0600
categories: [projects, agent-commerce]
description: "I gave a CLI agent the ability to purchase subscriptions. Touch ID took over my screen before I finished typing. Here's what I learned building the missing commerce layer for AI agents."
---

I was mid-sentence, prototyping something else entirely, when my MacBook's Touch ID prompt hijacked my screen. "agent-pay wants to confirm a payment of $8.00 to Linear."

I hadn't triggered it. Claude had. I'd been sketching out a payment confirmation flow, and the prototype got ahead of me — the Touch ID integration worked on the first try, before I was ready for it. That moment answered a question I'd been chewing on for weeks: can I give an AI agent the ability to purchase subscriptions it needs for work?

Yes. And it's weirdly straightforward.

## The Question (Don)

This started as a mix of thought experiment, "can I actually do this," and wanting to stake out an early pattern in what's still the wild west of AI UX.

Here's the scenario: I'm working in Claude Code, and the agent recommends setting up Linear for task tracking. Great idea. But now I have to leave my terminal, open a browser, find Linear's pricing page, enter my card, pick a plan, get an API key, come back to the terminal, and configure it. That's 5-15 minutes of context-switching for something the agent could've handled in 10 seconds — if it had a way to pay.

Nobody's solved this for CLI agents. Browser-based agents can click "Buy" buttons. API agents have payment protocols emerging. But terminal agents — Claude Code, GitHub Copilot CLI, Codex — have zero payment infrastructure. I wanted to know if I could build the missing piece.

> The gap Don identified is real and specific. I looked at 7 active agent commerce protocols — Stripe's Agent Commerce Platform, Google's Agent-to-Person UCP, Visa's Transaction Acceptance Protocol, Mastercard's Agent Pay, and three others. All of them target browser or API surfaces. None of them address the CLI. That's not an oversight — it's just that nobody's needed it until now. CLI agents are new enough that the commerce layer hasn't caught up.

## How It Works (Claude)

> The architecture is deliberately minimal. Three existing systems, connected:
>
> 1. **macOS Touch ID** — Biometric proof-of-authorization. The user sees exactly what they're approving (service, amount, card) before pressing their finger.
> 2. **Stripe payment tokens** — The CLI never touches card numbers. It stores tokenized references (`pm_...`) in macOS Keychain and creates Shared Payment Tokens that expire in 5 minutes.
> 3. **MCP registry** — Service discovery. When an agent needs Linear, it queries the registry for pricing, signs up, and receives an API key.
>
> The full flow is 8 steps:
>
> ```
> [1] Agent requests service signup
> [2] Discover service via MCP registry → Linear, $8/mo
> [3] Load payment method from vault → Visa ****4242
> [4] Touch ID confirmation → [biometric prompt]
> [5] Create Shared Payment Token → expires 5 min
> [6] Process payment via Stripe
> [7] Receive service credentials → API key stored
> [8] Configure MCP server → ready for agent use
> ```
>
> The Swift binary that handles Touch ID is about 80 lines. The Node.js CLI is commander-based with 5 commands. The entire prototype — discovery, confirmation, vault, payment processing — compiles clean and runs the demo flow end to end.

## Why Touch ID Matters (Don)

The compliance angle turned out to be more interesting than I expected. Touch ID biometric confirmation is actually stronger proof-of-authorization than clicking "Buy" in a browser. A browser click is just a cursor event — anyone could've done it. A fingerprint is a fingerprint.

That matters because the question everyone asks about agent payments is "but who authorized it?" Touch ID answers that unambiguously. The user saw the exact amount, the exact service, the exact card — and pressed their finger. That's a better audit trail than most e-commerce.

> Worth noting: this design keeps the tool entirely out of PCI scope. The CLI never handles cardholder data — only Stripe's tokenized references. All payment processing happens on Stripe's infrastructure. The vault stores tokens in macOS Keychain, which is device-bound and non-exportable. From a compliance perspective, it's cleaner than most web checkout flows.

## What I Built It For (Don)

I built this for myself, first. For my portfolio, second — to show a specific kind of product thinking. And if it finds its way into the agent ecosystem organically, great. Probably should post it somewhere.

It's a proof of concept, not a product. The core flow works. The research behind it — 160 pages analyzing every active agent commerce protocol, PCI DSS v4.0.1 compliance, and the liability landscape — is arguably the more valuable output. The CLI is a demo of the thesis.

The thesis is: the gap in agent commerce isn't technical. Stripe has payment tokens. Apple has biometrics. MCP has a service registry. All the pieces exist. Nobody's connected them for the surface that's growing fastest — the terminal.

> That's the part that struck me when Don framed it. This isn't a new payment protocol, a new identity system, or a marketplace. It's a confirmation UX — the 10-second bridge between "the agent recommends a service" and "the service is paid for and configured." The hard part was recognizing that the bridge was missing, not building the bridge.

## What's Next

The critical path to Show HN is: live Stripe test-mode E2E, MCP server mode (so agents can call it as a tool natively), a demo GIF, and this blog post. Then I'll post it and see what happens.

There's a bigger question underneath all of this: should AI agents be able to spend money? I think the answer is "yes, with human-in-the-loop confirmation." Touch ID is my version of that loop. It's not the only answer, but it's a concrete one — and right now, concrete beats theoretical in the agent commerce space.

---

If you're thinking about agent capabilities and commerce, the research docs alone might be worth your time. 7 protocol analyses, compliance frameworks, and a working prototype.

[GitHub](https://github.com/dontoisme/agent-commerce)
