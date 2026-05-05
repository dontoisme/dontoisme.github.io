---
description: Present pending drafts for approval — approve, edit, reject, or defer each
allowed-tools: Bash, Read, Edit, Write
---

# Blog Review — Draft Approval Workflow

Present all pending drafts in `_drafts/` for Don's editorial review.

## Instructions

### 1. List Pending Drafts

```bash
ls ~/Documents/GitHub/dontoisme.github.io/_drafts/*.md 2>/dev/null
```

If no drafts exist, say: "No pending drafts. Run `/blog-draft {project}` to generate one."

### 2. For Each Draft, Present

Read each draft file and show:
- **Title** (from frontmatter)
- **Categories** (from frontmatter)
- **Hook** (first 2 paragraphs after frontmatter)
- **Word count**
- **File name**

### 3. Ask for Decision

For each draft, ask Don to choose:
- **Approve** — Move to `_posts/` with today's date prefix
- **Edit** — Don provides feedback, revise the draft
- **Reject** — Delete the draft file
- **Defer** — Leave in `_drafts/` for next week

### 4. Process Approvals

For each approved draft:

1. Read the full draft content
2. Update the `date` in frontmatter to today's date and time
3. Write the file to `_posts/{YYYY-MM-DD}-{slug}.md`
4. Delete the original from `_drafts/`
5. Report: "Approved: {title} → _posts/{filename}"

### 5. Summary

After processing all drafts, show:
- How many approved, edited, rejected, deferred
- List of files now in `_posts/` ready to publish
- Suggest: "Run `/blog-publish` to commit and deploy approved posts."
