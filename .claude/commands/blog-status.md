---
description: Dashboard showing blog epic progress, pending drafts, and recommendations
allowed-tools: Bash, Read
---

# Blog Status — Publishing Dashboard

Show the current state of the blog publishing workflow.

## Instructions

### 1. Epic Progress

```bash
cd ~/Documents/GitHub/dontoisme.github.io && bd list --labels ai-blog
```

Count and report:
- Total tasks
- Open (not started)
- In progress
- Closed (published)
- Percentage complete

### 2. Published Posts

```bash
ls ~/Documents/GitHub/dontoisme.github.io/_posts/
```

List all published posts with titles and dates.

### 3. Pending Drafts

```bash
ls ~/Documents/GitHub/dontoisme.github.io/_drafts/*.md 2>/dev/null
```

List any drafts awaiting review.

### 4. Project Coverage

Read `~/Documents/GitHub/dontoisme.github.io/_data/projects.yml` and report:
- Projects with posts (have `last_post` date)
- Projects without posts (need coverage)
- Group by tier

### 5. Recommendations

Based on the above, suggest:
- Which Tier 1 projects need posts most urgently
- Which projects were recently active (check git logs for past 7 days)
- Any pre-planned ideas from `~/Projects/Brain/Projects/blog-ideas.md` that match uncovered projects

### 6. Format

Output as a clean dashboard:

```
## Blog Publishing Dashboard

### Epic: AI Blog — Document All Active Projects
Progress: ██████░░░░ 6/24 (25%)

### Published Posts (6)
- 2025-12-27: Darwin: Your AI's Eyes on the Build
- 2025-12-27: Prompt to Install: The New Developer Tool UX
...

### Pending Drafts (2)
- building-a-payment-layer-for-ai-agents.md
...

### Uncovered Projects
Tier 1: agent-commerce, cleanspace-dfw
Tier 2: squabble-web, alucard, hogan-os, zeroed, co-op-claude, Brain
Tier 3: [8 projects]

### Recommendations
- agent-commerce had 5 commits this week — good build-log candidate
- Blog idea match: "CLI payment confirmation for AI agents" from blog-ideas.md
```
