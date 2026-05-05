---
description: Commit and push approved blog posts to deploy via GitHub Pages
allowed-tools: Bash, Read, Edit
---

# Blog Publish — Deploy Approved Posts

Commit approved posts from `_posts/` and push to deploy via GitHub Pages.

## Instructions

### 1. Check What's Ready

```bash
cd ~/Documents/GitHub/dontoisme.github.io && git status
```

Show Don what files are staged/unstaged. If no new posts in `_posts/`, say: "No new posts to publish. Run `/blog-review` first."

### 2. Confirm Before Publishing

List the new/modified files in `_posts/` and show their titles. Ask Don: "Publish these posts? This will push to GitHub Pages and they'll be live."

### 3. Publish

On confirmation:

```bash
cd ~/Documents/GitHub/dontoisme.github.io
git add _posts/ _data/projects.yml
git commit -m "Publish: {post titles, comma-separated}"
git push origin main
```

### 4. Update Tracking

For each published post:

1. Update `_data/projects.yml` — set `last_post` to today's date for the matching project
2. Close the corresponding beads task:
   ```bash
   cd ~/Documents/GitHub/dontoisme.github.io && bd close {task-id} --comment "Published: {title}"
   ```
   Match by project name from `bd list --labels ai-blog`.

### 5. Confirm Deployment

After pushing, say:
- "Published {N} posts. Site will update in ~1 minute at https://dontoisme.github.io"
- List published post URLs (based on Jekyll's /{categories}/{year}/{month}/{day}/{slug}.html pattern)
- Show remaining beads tasks: `bd list --labels ai-blog | head -10`
