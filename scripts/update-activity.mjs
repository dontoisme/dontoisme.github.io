#!/usr/bin/env node
/* Generates assets/data/activity.json from local git clones so private-repo
   activity shows on the landing page without exposing commit messages.

   Scans ~/Projects and ~/Documents/GitHub for git repos, counts Don's commits
   per repo per day over the last 21 days, and records only: repo name, date,
   commit count, and timestamp of the day's last commit. No messages, no paths.

   Run from the blog repo root (or anywhere — paths are absolute):
     node scripts/update-activity.mjs
*/
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCAN_DIRS = [join(homedir(), 'Projects'), join(homedir(), 'Documents', 'GitHub')];
const DAYS = 21;
// The blog's own pushes are already in the public GitHub events feed.
const EXCLUDE = new Set(['dontoisme.github.io']);
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'data', 'activity.json');

function git(repo, args) {
  return execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

function authorFor(repo, fallback) {
  try { return git(repo, ['config', 'user.email']) || fallback; } catch { return fallback; }
}

let globalEmail = '';
try { globalEmail = execFileSync('git', ['config', '--global', 'user.email'], { encoding: 'utf8' }).trim(); } catch {}

const repos = [];
for (const dir of SCAN_DIRS) {
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir)) {
    if (EXCLUDE.has(name)) continue;
    const path = join(dir, name);
    try {
      if (!statSync(join(path, '.git')).isDirectory()) continue;
    } catch { continue; }

    const author = authorFor(path, globalEmail);
    let log = '';
    try {
      log = git(path, ['log', '--all', `--since=${DAYS} days ago`, `--author=${author}`, '--format=%cI']);
    } catch { continue; }
    if (!log) continue;

    const days = {};
    for (const iso of log.split('\n')) {
      const d = iso.slice(0, 10);
      if (!days[d]) days[d] = { n: 0, last: iso };
      days[d].n++;
      if (iso > days[d].last) days[d].last = iso;
    }
    const dayList = Object.entries(days)
      .map(([d, v]) => ({ d, n: v.n, last: v.last }))
      .sort((a, b) => (a.d < b.d ? 1 : -1));
    repos.push({
      name,
      total: dayList.reduce((s, x) => s + x.n, 0),
      last: dayList[0].last,
      days: dayList,
    });
  }
}

repos.sort((a, b) => (a.last < b.last ? 1 : -1));
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), windowDays: DAYS, repos }, null, 1) + '\n');
console.log(`Wrote ${OUT}: ${repos.length} repos, ${repos.reduce((s, r) => s + r.total, 0)} commits in last ${DAYS} days`);
