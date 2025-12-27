---
layout: page
title: Ark B Writings
permalink: /ark-b-writings/
---

# Ark B Writings

My personal blog where I write about technology, product management, building things, and whatever catches my interest.

---

## Recent Posts

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%b %d, %Y" }}
{% endfor %}

---

## What's Coming

I maintain a [public roadmap](/ark-b-writings/roadmap) of posts I'm planning to write—generated from deep dives into my projects and notes. Think of it as a changelog for ideas.

---

## Categories

- **#build-in-public** — Squabble, Darwin, and other side projects
- **Product Management** — Growth, metrics, prioritization, case studies
- **Second Brain / AI** — Claude Code, PKM systems, ADHD productivity
- **Technical** — iOS, Firebase, Chrome extensions, CLI tools
- **Personal** — Career, life, music

---

[View All Posts](/archive/) | [Roadmap](/ark-b-writings/roadmap)
