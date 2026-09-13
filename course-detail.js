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
            <a class="btn btn-primary" href="courses.html?branch=kids">Kids courses</a>
            <a class="btn btn-outline" href="courses.html?branch=academics">Academics programmes</a>
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

    const isKids = branch === 'kids';
    const kidsSuffix = / kids$/i.test(course.name) ? '' : ' for Kids';
    document.title = isKids
        ? `${course.name}${kidsSuffix} — Online Learning for Kids | Learning Bubble`
        : `${course.name} — Academic Learning Online | Learning Bubble Academics`;

    const descText = (course.tagline ? course.tagline + ' ' : '') + (course.about || '');
    const descContent = descText.slice(0, 155);
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', descContent);

    /* ---------- SEO: keywords, canonical, Open Graph, structured data ---------- */
    const setMeta = (selector, attr, value, createTag) => {
        let el = $(selector);
        if (!el && createTag) { el = document.createElement('meta'); document.head.appendChild(el); createTag(el); }
        if (el) el.setAttribute(attr === 'content' ? 'content' : attr, value);
        return el;
    };

    const kwParts = [course.name, course.category, isKids ? 'online learning for kids' : 'academic learning',
        isKids ? 'elearning for kids' : 'academics', isKids ? course.name + ' for kids' : course.name,
        `${course.name} in Pakistan`,
        isKids ? 'online learning for kids in Pakistan' : 'academic learning in Pakistan',
        isKids ? 'elearning for kids in Pakistan' : `${course.name} Pakistan`,
        'Learning Bubble'];
    setMeta('meta[name="keywords"]', 'content', kwParts.join(', '), el => el.setAttribute('name', 'keywords'));

    const canonicalHref = `https://learningbubble.org/course-detail.html?id=${course.id}`;
    let canon = $('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.setAttribute('rel', 'canonical'); document.head.appendChild(canon); }
    canon.setAttribute('href', canonicalHref);

    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', document.title);
    else { const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); m.setAttribute('content', document.title); document.head.appendChild(m); }

    const ogDesc = $('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descContent);
    else { const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); m.setAttribute('content', descContent); document.head.appendChild(m); }

    const ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url'); ogUrl.setAttribute('content', canonicalHref);
    document.head.appendChild(ogUrl);

    if (course.image) {
        const ogImg = document.createElement('meta');
        ogImg.setAttribute('property', 'og:image');
        ogImg.setAttribute('content', `https://learningbubble.org/${course.image}`);
        document.head.appendChild(ogImg);
    }

    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.name,
        description: descText.slice(0, 300) || course.name,
        url: canonicalHref,
        provider: {
            '@type': 'EducationalOrganization',
            name: 'Learning Bubble',
            sameAs: 'https://learningbubble.org/',
            areaServed: { '@type': 'Country', name: 'Pakistan' }
        },
        image: course.image ? `https://learningbubble.org/${course.image}` : undefined,
        educationalLevel: course.level || undefined,
        audience: course.ages ? { '@type': 'Audience', audienceType: `Ages ${course.ages}` } : undefined,
        hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: course.duration || undefined,
            location: { '@type': 'VirtualLocation', url: canonicalHref }
        }
    });
    document.head.appendChild(ld);

    $$('[data-branch-home]').forEach(a => { a.href = meta.home; });
    $$('[data-branch-courses]').forEach(a => { a.href = `courses.html?branch=${branch}`; });
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

    /* ---------- render ---------- */
    host.innerHTML = `
    <section class="detail-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <i class="fas fa-chevron-right"></i>
          <a href="${meta.home}">${meta.short}</a>
          <i class="fas fa-chevron-right"></i>
          <a href="courses.html?branch=${branch}&cat=${encodeURIComponent(course.category)}">${course.category}</a>
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

          <h2>How it runs</h2>
          <p>${course.format || 'Live online sessions'} — taught live, never pre-recorded, with sessions recorded
          afterwards so students can revisit anything they missed. Timings are arranged around school and time zones,
          and we reschedule when exams or travel get in the way.</p>
          <p>You will need a laptop or tablet with a working camera and a reasonably stable connection. If a course
          requires any materials at home, we send the list before the first session.</p>
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
              <a class="btn btn-primary btn-block" href="enrollment.html?id=${course.id}">
                <i class="fas fa-plus"></i> Add to enquiry
              </a>
              <a class="btn btn-wa btn-block" id="detailWa" href="#" target="_blank" rel="noopener">
                <i class="fab fa-whatsapp"></i> Ask on WhatsApp
              </a>
            </div>

            <p class="sticky-note">Fees vary by format and schedule, so we quote them personally rather than
            publishing a number that would not apply to you.</p>
          </div>
        </aside>
      </div>
    </div>

    <section class="section section--soft" id="related"></section>`;

    /* ---------- WhatsApp CTA ---------- */
    const wa = $('#detailWa');
    if (wa) wa.href = `https://wa.me/${(window.LB_CFG || {}).whatsapp || '923212481610'}?text=${encodeURIComponent(waMessage)}`;

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
          <a class="btn btn-outline" href="courses.html?branch=${branch}">All ${meta.short.toLowerCase()} courses</a>
        </div>
        <div class="course-grid">
          ${related.map((c, i) => window.LB_courseCard(c, i)).join('')}
        </div>
      </div>`;
        requestAnimationFrame(() => $$('#related .reveal').forEach(el => el.classList.add('is-in')));
    }
})();
