/* Live GitHub activity for the landing build-log panel.
   No dependencies. Fails quietly to a static link if the API is unreachable. */
(function () {
  var USER = 'dontoisme';
  var feed = document.querySelector('[data-activity-feed]');
  if (!feed) return;
  var statEl = document.querySelector('[data-activity-stat]');

  function rel(iso) {
    var s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 90) return 'now';
    var m = s / 60; if (m < 60) return Math.round(m) + 'm';
    var h = m / 60; if (h < 24) return Math.round(h) + 'h';
    var d = h / 24; if (d < 7) return Math.round(d) + 'd';
    var w = d / 7; if (w < 5) return Math.round(w) + 'w';
    return Math.round(d / 30) + 'mo';
  }
  function esc(t) { var e = document.createElement('span'); e.textContent = (t == null ? '' : t); return e.innerHTML; }
  function firstLine(t) { return (t || '').split('\n')[0]; }
  function shortRepo(full) { return full.split('/').slice(-1)[0]; }

  function describe(ev) {
    var p = ev.payload || {};
    switch (ev.type) {
      case 'PushEvent':
        var c = (p.commits && p.commits.length) || 0;
        var msg = c ? firstLine(p.commits[p.commits.length - 1].message) : '';
        return { verb: 'push', extra: c > 1 ? c + ' commits' : '', detail: msg };
      case 'PullRequestEvent':
        return { verb: 'PR ' + (p.action || ''), extra: '', detail: p.pull_request && p.pull_request.title };
      case 'CreateEvent':
        return { verb: 'create', extra: '', detail: (p.ref_type || '') + (p.ref ? ' ' + p.ref : '') };
      case 'ReleaseEvent':
        return { verb: 'release', extra: '', detail: p.release && p.release.tag_name };
      case 'IssuesEvent':
        return { verb: 'issue ' + (p.action || ''), extra: '', detail: p.issue && p.issue.title };
      default:
        return null;
    }
  }

  function row(ev, d) {
    var li = document.createElement('li');
    li.className = 'buildlog-row';
    li.innerHTML =
      '<span class="bl-time">' + esc(rel(ev.created_at)) + '</span>' +
      '<span class="bl-verb">' + esc(d.verb) + '</span>' +
      '<a class="bl-repo" href="https://github.com/' + esc(ev.repo.name) + '">' + esc(shortRepo(ev.repo.name)) + '</a>' +
      (d.extra ? '<span class="bl-extra">' + esc(d.extra) + '</span>' : '') +
      (d.detail ? '<span class="bl-detail">' + esc(d.detail) + '</span>' : '');
    return li;
  }

  function markActive(events) {
    var active = {};
    events.slice(0, 30).forEach(function (e) { active[shortRepo(e.repo.name).toLowerCase()] = true; });
    document.querySelectorAll('[data-repo]').forEach(function (card) {
      if (active[card.getAttribute('data-repo')]) {
        card.classList.add('is-active');
        var b = card.querySelector('[data-active-badge]');
        if (b) b.hidden = false;
      }
    });
  }

  function setStat(events) {
    if (!statEl) return;
    var weekAgo = Date.now() - 7 * 864e5, commits = 0, repos = {};
    events.forEach(function (e) {
      if (new Date(e.created_at).getTime() < weekAgo) return;
      repos[e.repo.name] = true;
      if (e.type === 'PushEvent') commits += (e.payload.commits && e.payload.commits.length) || 1;
    });
    var n = Object.keys(repos).length;
    if (n) statEl.textContent = commits + ' commit' + (commits !== 1 ? 's' : '') + ' · ' + n + ' repo' + (n !== 1 ? 's' : '') + ' · last 7 days';
  }

  function fallback() {
    feed.innerHTML = '<li class="buildlog-row buildlog-fallback"><span class="bl-detail">Live feed unavailable — ' +
      '<a href="https://github.com/' + USER + '?tab=overview">see activity on GitHub ↗</a></span></li>';
  }

  fetch('https://api.github.com/users/' + USER + '/events/public?per_page=60')
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (events) {
      var rows = [];
      for (var i = 0; i < events.length && rows.length < 8; i++) {
        var d = describe(events[i]);
        if (d) rows.push(row(events[i], d));
      }
      if (!rows.length) { fallback(); return; }
      feed.innerHTML = '';
      rows.forEach(function (li) { feed.appendChild(li); });
      setStat(events);
      markActive(events);
    })
    .catch(fallback);
})();
