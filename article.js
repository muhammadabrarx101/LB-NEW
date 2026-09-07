/* ============================================================
   Learning Bubble — article page runtime
   Renders the "related courses" rail from the ids in the
   [data-related] attribute the generator writes.
   ============================================================ */
(function () {
    'use strict';

    const host = document.getElementById('articleRelated');
    if (!host || typeof LB === 'undefined') return;

    const ids = (host.dataset.related || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);

    const courses = ids.map(id => LB.course(id)).filter(Boolean);
    if (!courses.length) { host.remove(); return; }

    const branch = courses[0].branch;
    const meta = LB.branches[branch];

    host.innerHTML = `
    <div class="container">
      <div class="head-row">
        <div class="section-head">
          <span class="eyebrow"><i class="fas fa-graduation-cap"></i> Mentioned in this guide</span>
          <h2>Courses that go with this</h2>
        </div>
        <a class="btn btn-outline" href="courses?branch=${branch}">All ${meta.short.toLowerCase()} courses</a>
      </div>
      <div class="course-grid">
        ${courses.map((c, i) => window.LB_courseCard(c, i)).join('')}
      </div>
    </div>`;

    requestAnimationFrame(() =>
        Array.from(host.querySelectorAll('.reveal')).forEach(el => el.classList.add('is-in')));
})();
