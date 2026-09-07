/* ============================================================
   Learning Bubble — static course page runtime
   ------------------------------------------------------------
   The page already carries its own title, description, canonical,
   H1, about text, highlights and Course schema in the raw HTML —
   that is what gets indexed. This only appends the richer blocks
   (who it is for, outcomes, syllabus, FAQs, related courses),
   which are nice for readers but not needed for the first crawl.
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const id = document.body.dataset.courseId;
    if (!id || typeof LB === 'undefined') return;

    const course = LB.course(id);
    if (!course) return;

    const meta = LB.branches[course.branch];
    const noun = course.branch === 'academics' ? 'programme' : 'course';
    const extra = (typeof courseContent !== 'undefined' && courseContent[course.id]) || {};

    /* ---------- WhatsApp CTA ---------- */
    const wa = $('#detailWa');
    if (wa) {
        const msg = `Hi Learning Bubble! I'm interested in "${course.name}". Could you share the schedule and fee details?`;
        wa.href = `https://wa.me/${(window.LB_CFG || {}).whatsapp || '923212481610'}?text=${encodeURIComponent(msg)}`;
    }

    /* ---------- richer prose blocks ---------- */
    const host = $('#courseExtra');
    if (host) {
        let html = '';

        if (extra.whoFor) {
            html += `<h2>Who this ${noun} is for</h2><p>${extra.whoFor}</p>`;
        }

        if (extra.outcomes && extra.outcomes.length) {
            html += `<h2>What you will be able to do</h2><ul class="check-list">` +
                extra.outcomes.map(o => `<li><i class="fas fa-check"></i>${o}</li>`).join('') +
                `</ul>`;
        }

        if (extra.structure && extra.structure.length) {
            html += `<h2>How the ${noun} is structured</h2><ol class="syllabus">` +
                extra.structure.map(s => `<li><h3>${s.t}</h3><p>${s.d}</p></li>`).join('') +
                `</ol>`;
        }

        if (extra.faqs && extra.faqs.length) {
            html += `<h2>Frequently asked questions</h2><div class="faq faq--inline">` +
                extra.faqs.map(f => `
                  <div class="faq-item">
                    <button class="faq-q" aria-expanded="false">${f.q}<i class="fas fa-chevron-down"></i></button>
                    <div class="faq-a"><div><p>${f.a}</p></div></div>
                  </div>`).join('') +
                `</div>`;
        }

        host.innerHTML = html;
    }

    /* ---------- related courses ---------- */
    const related = LB.byBranch(course.branch)
        .filter(c => c.id !== course.id)
        .sort((a, b) => (b.category === course.category) - (a.category === course.category))
        .slice(0, 4);

    const rel = $('#related');
    if (rel && related.length && window.LB_courseCard) {
        rel.innerHTML = `
      <div class="container">
        <div class="head-row">
          <div class="section-head">
            <span class="eyebrow"><i class="fas fa-shuffle"></i> Keep looking</span>
            <h2>You might also like</h2>
          </div>
          <a class="btn btn-outline" href="courses?branch=${course.branch}">All ${meta.short.toLowerCase()} courses</a>
        </div>
        <div class="course-grid">${related.map((c, i) => window.LB_courseCard(c, i)).join('')}</div>
      </div>`;
        requestAnimationFrame(() => $$('.reveal', rel).forEach(el => el.classList.add('is-in')));
    } else if (rel) {
        rel.remove();
    }
})();
