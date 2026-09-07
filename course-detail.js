/* ============================================================
   LEARNING BUBBLE — Course detail page
   Reads ?id=N and renders the course. No pricing is displayed.
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const host = $('#courseDetail');
    if (!host) return;

    const id = new URLSearchParams(location.search).get('id');
    const course = LB.course(id);

    /* ---------- not found ---------- */
    if (!course) {
        host.innerHTML = `
      <div class="container section">
        <div class="empty-state">
          <i class="fas fa-compass"></i>
          <h3>We could not find that course</h3>
          <p>It may have been renamed or retired. Browse the full catalogue instead.</p>
          <div class="row" style="justify-content:center;margin-top:1.5rem">
            <a class="btn btn-primary" href="courses?branch=kids">Kids courses</a>
            <a class="btn btn-outline" href="courses?branch=academics">Academics programmes</a>
          </div>
        </div>
      </div>`;
        return;
    }

    /* ---------- apply branch identity ---------- */
    const branch = course.branch;
    const meta = LB.branches[branch];
    document.documentElement.setAttribute('data-branch', branch);
    document.body.dataset.branch = branch;
    try { localStorage.setItem('lb-branch', branch); } catch (e) { /* noop */ }

    document.title = `${course.name} — ${meta.name}`;
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', (course.tagline || course.about || '').slice(0, 155));

    $$('[data-branch-home]').forEach(a => { a.href = meta.home; });
    $$('[data-branch-courses]').forEach(a => { a.href = `courses?branch=${branch}`; });
    $$('.branch-switch a').forEach(a => a.classList.toggle('is-on', a.dataset.branch === branch));
    const sub = $('#brandSub');
    if (sub) sub.textContent = branch === 'kids' ? 'for Kids' : 'Academics';

    /* ---------- helpers ---------- */
    const chip = (icon, text) => text
        ? `<span class="chip"><i class="fas ${icon}"></i>${text}</span>` : '';

    const paragraphs = txt => String(txt || '')
        .split(/\n\s*\n|\n(?=\*)/)
        .map(p => p.trim())
        .filter(Boolean)
        .map(p => p.startsWith('*')
            ? `<li>${p.replace(/^\*\s*/, '')}</li>`
            : `<p>${p}</p>`)
        .join('');

    const waMessage = `Hi Learning Bubble! I'm interested in "${course.name}". Could you share the schedule and fee details?`;

    /* extended content lives in course-content.js so the rest of the site
       does not have to download it */
    const extra = (typeof courseContent !== 'undefined' && courseContent[course.id]) || {};

    /* ---------- render ---------- */
    host.innerHTML = `
    <section class="detail-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="index">Home</a>
          <i class="fas fa-chevron-right"></i>
          <a href="${meta.home}">${meta.short}</a>
          <i class="fas fa-chevron-right"></i>
          <a href="courses?branch=${branch}&cat=${encodeURIComponent(course.category)}">${course.category}</a>
          <i class="fas fa-chevron-right"></i>
          <span>${course.name}</span>
        </nav>

        <div class="detail-grid">
          <div>
            <span class="eyebrow"><i class="fas ${course.icon || 'fa-book'}"></i> ${course.category}</span>
            <h1 class="detail-title">${course.name}</h1>
            <p class="detail-tagline">${course.tagline || ''}</p>
            <div class="detail-facts">
              ${chip('fa-child-reaching', course.ages)}
              ${chip('fa-clock', course.duration)}
              ${chip('fa-signal', course.level)}
              ${chip('fa-users', course.format)}
            </div>
          </div>
          <div class="detail-art">
            ${course.image
            ? `<img src="${course.image}" alt="${course.name}" width="560" height="420" fetchpriority="high">`
            : `<span class="media-art" style="aspect-ratio:4/3;border-radius:var(--r-lg);position:relative;overflow:hidden">
                 <i class="fas ${course.icon || 'fa-book'}" aria-hidden="true"></i>
               </span>`}
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <div class="detail-body">
        <div class="prose">
          <h2>About this ${branch === 'academics' ? 'programme' : 'course'}</h2>
          ${paragraphs(course.about) || '<p>Full details coming soon — message us and we will walk you through it.</p>'}

          ${course.highlights && course.highlights.length ? `
            <h2>What is included</h2>
            <ul class="check-list">
              ${course.highlights.map(h => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}
            </ul>` : ''}

          ${course.subjects && course.subjects.length ? `
            <h2>Subjects covered</h2>
            <div class="pill-list">
              ${course.subjects.map(s => `<span class="chip chip--accent">${s}</span>`).join('')}
            </div>` : ''}

          ${extra.whoFor ? `
            <h2>Who this ${branch === 'academics' ? 'programme' : 'course'} is for</h2>
            <p>${extra.whoFor}</p>` : ''}

          ${extra.outcomes && extra.outcomes.length ? `
            <h2>What you will be able to do</h2>
            <ul class="check-list">
              ${extra.outcomes.map(o => `<li><i class="fas fa-check"></i>${o}</li>`).join('')}
            </ul>` : ''}

          ${extra.structure && extra.structure.length ? `
            <h2>How the ${branch === 'academics' ? 'programme' : 'course'} is structured</h2>
            <ol class="syllabus">
              ${extra.structure.map(s => `
                <li>
                  <h3>${s.t}</h3>
                  <p>${s.d}</p>
                </li>`).join('')}
            </ol>` : ''}

          <h2>How it runs</h2>
          <p>${course.format || 'Live online sessions'} — taught live, never pre-recorded, with sessions recorded
          afterwards so students can revisit anything they missed. Timings are arranged around school and time zones,
          and we reschedule when exams or travel get in the way.</p>
          <p>Learning Bubble teaches online to students across Pakistan — Karachi, Lahore and Islamabad — as well as the
          Gulf, the UK and North America. You will need a laptop or tablet with a working camera and a reasonably
          stable connection. If a course requires any materials at home, we send the list before the first session.</p>

          ${extra.faqs && extra.faqs.length ? `
            <h2>Frequently asked questions</h2>
            <div class="faq faq--inline">
              ${extra.faqs.map(f => `
                <div class="faq-item">
                  <button class="faq-q" aria-expanded="false">${f.q}<i class="fas fa-chevron-down"></i></button>
                  <div class="faq-a"><div><p>${f.a}</p></div></div>
                </div>`).join('')}
            </div>` : ''}
        </div>

        <aside>
          <div class="sticky-card">
            <h3>Interested in this ${branch === 'academics' ? 'programme' : 'course'}?</h3>
            <p>Add it to your enquiry and we will come back with schedules, group options and exact fees.</p>

            <ul class="spec-list">
              ${course.ages ? `<li><span><i class="fas fa-child-reaching"></i> Ages</span><strong>${course.ages}</strong></li>` : ''}
              <li><span><i class="fas fa-clock"></i> Duration</span><strong>${course.duration}</strong></li>
              ${course.level ? `<li><span><i class="fas fa-signal"></i> Level</span><strong>${course.level}</strong></li>` : ''}
              <li><span><i class="fas fa-users"></i> Format</span><strong>${course.format || 'Live online'}</strong></li>
              <li><span><i class="fas fa-layer-group"></i> Category</span><strong>${course.category}</strong></li>
            </ul>

            <div class="stack">
              <a class="btn btn-primary btn-block" href="demo?course=${course.id}">
                <i class="fas fa-video"></i> Book a free demo class
              </a>
              <a class="btn btn-outline btn-block" href="enrollment?id=${course.id}">
                <i class="fas fa-plus"></i> Add to enquiry
              </a>
              <a class="btn btn-wa btn-block" id="detailWa" href="#" target="_blank" rel="noopener">
                <i class="fab fa-whatsapp"></i> Ask on WhatsApp
              </a>
            </div>

            <p class="sticky-note">The demo is free and runs 30 minutes. Fees vary by format and schedule, so we
            quote them personally rather than publishing a number that would not apply to you.</p>
          </div>
        </aside>
      </div>
    </div>

    <section class="section section--soft" id="related"></section>`;

    /* ---------- WhatsApp CTA ---------- */
    const wa = $('#detailWa');
    if (wa) wa.href = `https://wa.me/${(window.LB_CFG || {}).whatsapp || '923212481610'}?text=${encodeURIComponent(waMessage)}`;

    /* ---------- structured data ---------- */
    if (window.LB_jsonLd) {
        const SITE = 'https://learningbubble.org/';
        const url = SITE + 'course-detail?id=' + course.id;

        /* keep the canonical honest — every course shares one HTML file */
        let canon = document.querySelector('link[rel="canonical"]');
        if (!canon) {
            canon = document.createElement('link');
            canon.rel = 'canonical';
            document.head.appendChild(canon);
        }
        canon.href = url;

        const og = (prop, val) => {
            let m = document.querySelector(`meta[property="${prop}"]`);
            if (!m) {
                m = document.createElement('meta');
                m.setAttribute('property', prop);
                document.head.appendChild(m);
            }
            m.setAttribute('content', val);
        };
        og('og:title', `${course.name} — ${meta.name}`);
        og('og:description', course.tagline || (course.about || '').slice(0, 160));
        og('og:url', url);
        if (course.image) og('og:image', SITE + course.image);

        window.LB_jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.name,
            description: (course.about || course.tagline || '').slice(0, 500),
            url: url,
            inLanguage: 'en',
            educationalLevel: course.level || undefined,
            teaches: (course.subjects || course.highlights || []).join(', ') || undefined,
            typicalAgeRange: course.ages || undefined,
            provider: {
                '@type': 'EducationalOrganization',
                name: 'Learning Bubble',
                url: SITE,
                sameAs: SITE
            },
            hasCourseInstance: {
                '@type': 'CourseInstance',
                courseMode: 'online',
                courseWorkload: course.duration,
                location: { '@type': 'VirtualLocation', url: SITE },
                instructor: { '@type': 'Organization', name: 'Learning Bubble' }
            }
        });
    }

    /* ---------- related ---------- */
    const related = LB.byBranch(branch)
        .filter(c => c.id !== course.id)
        .sort((a, b) => (b.category === course.category) - (a.category === course.category))
        .slice(0, 4);

    if (related.length) {
        $('#related').innerHTML = `
      <div class="container">
        <div class="head-row">
          <div class="section-head">
            <span class="eyebrow"><i class="fas fa-shuffle"></i> Keep looking</span>
            <h2>You might also like</h2>
          </div>
          <a class="btn btn-outline" href="courses?branch=${branch}">All ${meta.short.toLowerCase()} courses</a>
        </div>
        <div class="course-grid">
          ${related.map((c, i) => window.LB_courseCard(c, i)).join('')}
        </div>
      </div>`;
        requestAnimationFrame(() => $$('#related .reveal').forEach(el => el.classList.add('is-in')));
    }
})();
