/* ============================================================
   Learning Bubble — Guides index
   Renders the article list and its branch filter, and emits an
   ItemList so Google can see the whole set from one page.
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const grid = $('#blogGrid');
    const filterBar = $('#blogFilter');
    if (!grid || typeof articlesData === 'undefined') return;

    const FILTERS = [
        { id: 'all', label: 'All guides' },
        { id: 'kids', label: 'For Kids' },
        { id: 'academics', label: 'Academics' }
    ];

    let active = new URLSearchParams(location.search).get('branch') || 'all';
    if (!FILTERS.some(f => f.id === active)) active = 'all';

    const fmtDate = iso => {
        const d = new Date(iso + 'T00:00:00');
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    function paintFilter() {
        filterBar.innerHTML = FILTERS.map(f => {
            const n = f.id === 'all'
                ? articlesData.length
                : articlesData.filter(a => a.branch === f.id).length;
            return `<button type="button" class="chip-btn${active === f.id ? ' is-on' : ''}" data-f="${f.id}">
                ${f.label} <span style="opacity:.65">(${n})</span>
            </button>`;
        }).join('');
    }

    function paintGrid() {
        const list = active === 'all'
            ? articlesData
            : articlesData.filter(a => a.branch === active);

        grid.innerHTML = list.map((a, i) => `
      <article class="res-card reveal" data-delay="${i % 4 + 1}" data-tint="${a.branch}">
        <span class="feature-ico"><i class="fas ${a.icon}"></i></span>
        <div class="row" style="gap:.5rem">
          <span class="chip">${a.category}</span>
          <span class="chip"><i class="fas fa-clock"></i>${a.readMins} min read</span>
        </div>
        <h3><a href="blog-${a.slug}.html">${a.title}</a></h3>
        <p>${a.excerpt}</p>
        <a class="course-more" href="blog-${a.slug}.html">Read the guide <i class="fas fa-arrow-right"></i></a>
      </article>`).join('');

        requestAnimationFrame(() => $$('.reveal', grid).forEach(el => el.classList.add('is-in')));
    }

    filterBar.addEventListener('click', e => {
        const b = e.target.closest('[data-f]');
        if (!b) return;
        active = b.dataset.f;
        paintFilter();
        paintGrid();
        const p = new URLSearchParams();
        if (active !== 'all') p.set('branch', active);
        history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : ''));
    });

    paintFilter();
    paintGrid();

    /* structured data for the article set */
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.LB_jsonLd) return;
        const SITE = 'https://learningbubble.org/';
        window.LB_jsonLd({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Learning Bubble guides',
            numberOfItems: articlesData.length,
            itemListElement: articlesData.map((a, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: SITE + 'blog-' + a.slug + '.html',
                name: a.title
            }))
        });
    }, { once: true });
})();
