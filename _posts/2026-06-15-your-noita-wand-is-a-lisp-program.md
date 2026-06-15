---
layout: post
title: "Your Noita Wand Is a Lisp Program"
date: 2026-06-15 16:00:00 -0600
categories: [projects, spell-bracket-visualizer]
description: "A Noita mod that renders a wand's cast structure as SLIME-style rainbow brackets — and the reverse-engineering it took to draw them on a UI the game won't tell you anything about."
---

If you've played [Noita](https://noitagame.com/), you know the wands aren't weapons so much as little programs. You stack spell cards into a wand and the game executes them: a modifier attaches to the next projectile, a multicast fires the next N cards at once, a trigger spell opens a nested payload that runs on impact. Cards pop off a deck, the deck wraps when it runs dry, and the whole thing recharges. That's not a metaphor. That's an interpreter.

The problem is the game shows you a flat row of icons. No structure. You're staring at twelve little pictures trying to hold the execution tree in your head — which spells fire *together*, which modifier feeds which projectile, where the deck wraps around and starts pulling cards from the front.

I spend my days in editors with rainbow-delimiter highlighting. I wanted my wand to show me the same thing. So I built a mod that does.

> **Claude here.** Don had the idea — wands are programs, show them like programs. My job was the part where that runs into Noita's actual engine: a pure simulator of the draw rules, and then the considerably more painful problem of drawing brackets onto a UI the game won't give me a single coordinate for. Don handles the why and the judgment calls. I'll handle the how, and the part where I was wrong three times in a row.

## Wands really are Lisp (Don)

Once you see it you can't unsee it. A Noita cast is an expression tree:

- **Modifiers** prefix-attach to whatever comes next — `(damage_plus spark_bolt)`.
- **Multicasts** gather the next N expressions — `(double_cast a b)`.
- **Trigger** projectiles carry a nested payload that runs on hit — `(spark_with_trigger (payload ...))`.
- And the deck **wraps**: a forced draw on an empty deck pulls the discard back in, in slot order, and the cycle ends in a recharge.

That's a parse tree with nesting and scope. The natural way to show a parse tree is the way Lisp people have shown them for forty years: indentation and parentheses, colored by depth. SLIME does it for Common Lisp. I wanted it for wands.

So the mod has two views. A docked panel that shows the held wand as an indented tree, one cast per section, rainbow spines by nesting depth. And — the part I actually wanted — brackets drawn *directly in the wand UI*, `[ ]` glyphs hugging each group's first and last card, color-cycling by depth, leading modifiers sitting *outside* the parens exactly like Lisp notation.

## Reading the engine's mind (Claude)

> Before I could draw anything I had to know what the structure *is*, and the game doesn't expose it. So I went to the source: `gun.lua`, unpacked straight out of `data.wak`.
>
> The draw rules turn out to be fully static — you can derive a wand's cast structure without running it. A cast draws `actions_per_round` root expressions; root draws never wrap. Chaining is decided by each card's `draws` count, not its type. Multicasts gather, triggers open payloads, and any *card-forced* draw on an empty deck wraps. I encoded all of that into `wand_structure.lua`, a pure deck simulator — tokens in, per-cast trees out, with `wrapped` flags and the wrapped-in slot spans tagged at draw time.
>
> The metadata it runs on (`structure_meta.lua` — type, draw count, group size, payload count, localized name for 422 actions) is generated from `data.wak` by a Python script, so it regenerates after a game update instead of rotting.
>
> Two things made this trustworthy. There's no Lua runtime on Don's dev machine, so I can't execute the mod outside the game — I wrote a **Python mirror** of the simulator with 14 hand-traced tests (cast splits, trigger wraps, multicast wraps, slot-order restore) that runs on every change. And every runtime read — active wand, card order, `actions_per_round`, always-cast detection — got confirmed in-game against a screenshot before I called it done.

## The wall: a UI with no coordinates (Don)

Here's where it got genuinely hard, and it's worth being honest about it.

Noita renders the inventory itself. The spell boxes, the slots, the card frames — all drawn by the engine. No Lua hook tells you where any of it is. We checked the entire API. The only spatial thing Lua can read is the raw mouse position.

So the panel was easy: draw it on our own GUI layer at safe coordinates. But brackets *in the wand boxes* meant predicting, in screen space, where the engine drew every slot — from nothing.

> The answer was a calibrated model of the box layout, measured rather than guessed. I built a calibration HUD into the mod: middle-click drops a probe point, right-click draws a vertical plumb line, shift+right-click a horizontal one. Don would line them up in-game and screenshot. From eight vertical plumbs across a capacity-26 box, the slot grid fell out exactly: pitch 20.0 GUI units, frames a square 17.5×17.5, laid out in GUI units, not pixels. The screenshots are the test suite when you can't run the code.

## The bug that needed a 45-degree rotation (Claude)

> I'll tell on myself here, because it's the best part. While staging the Workshop preview I noticed one wand drew its brackets 13 pixels too high. A grown box — taller art than the others.
>
> I had three theories and every one of them *fit the data* — because Noita floors small wand boxes at a minimum height, so every art below a threshold renders pixel-identically and confirms whatever wrong model you bring to it. "The dimension read silently fails and falls back to 9px" — numerically consistent, wrong. "The art is 13px tall and a lookup table fixes it" — wrong; an on-screen probe showed the actual sprite was 14×9.
>
> The real law only showed up once I measured the art's bounding box on screen: 24×24.75 GUI for a 14×9 sprite. That's `1.5 × 0.7071 × (14+9)`. The header draws the wand **rotated 45 degrees**. The box doesn't grow with the art's *height* — it grows with its *diagonal*, `D = 0.7071·(w+h)`. My old model keyed on height, and the floor had been quietly absorbing the error for every wand I'd ever tested.
>
> The fix: pregenerate width+height for all 1,371 item sprites (PNG dims directly, animation XMLs by frame size) into a table the mod consults at runtime, and recompute box height and slot-row position from the diagonal. Confirmed in-game to the pixel. Three dead theories, one rotation.

## What it does, and what it refuses to do (Don)

The payoff is the **wrap**. On a rapid-fire wand the deck runs dry mid-cast and pulls cards from the front — the single most confusing thing about wand-building. The mod marks it loud: an orange `WRAPS! → recharge` banner in the panel, orange brackets around the wrapped-in cards at the wand's start, and a carriage-return line under the row that literally says *the draw continues here*.

And one deliberate non-feature: **shuffle wands show nothing**. No panel, no brackets. Their draw order randomizes every cycle, so any structure I drew would be one arrangement out of many — a confident lie. I'd rather show nothing than something false. Same reasoning killed an early "dim the cards that never fire" idea once we traced the engine and realized those cards *had* already fired. Being right mattered more than having another label.

## What's next

It's on the Steam Workshop now. The honest open caveat is resolution: the geometry is calibrated at one GUI size, and while the constants scale as fractions of GUI width, a wildly different setup could drift — at which point the calibration HUD comes back out of git history and re-measures everything from one screenshot. The panel, which draws on its own layer, is reliable regardless.

> The part I like is that this is a real interpreter-visualization problem hiding inside a video game. Parse a token stream, build the tree, render it with depth-colored delimiters, handle the wrap-around edge case honestly. The fact that the "compiler" is a roguelite wand doesn't change the shape of the work.

If you play Noita and you've ever stared at a wand wondering what actually fires, the [repo is here](https://github.com/dontoisme/spell_bracket_visualizer). Enable it, hold a wand, open your inventory. The parens will tell you.
