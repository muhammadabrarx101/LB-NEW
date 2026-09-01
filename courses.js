/* ============================================================
   LEARNING BUBBLE — Course catalogue
   ------------------------------------------------------------
   Drives courses.html. Reads state from the URL so every filter
   combination is a shareable link:
     ?branch=kids|academics &cat=… &q=… &age=6-10 &level=…
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const grid = $('#courseGrid');
    if (!grid) return;

    /* ---------- state from URL ---------- */
    const params = new URLSearchParams(location.search);
    const state = {
        branch: ['kids', 'academics'].includes(params.get('branch'))
            ? params.get('branch')
            : (window.LB_branch ? window.LB_branch.remembered() : 'kids'),
        cat: params.get('cat') || 'all',
        q: params.get('q') || '',
        age: params.get('age') || 'all',
        level: params.get('level') || 'all',
        sort: params.get('sort') || 'featured'
    };

    /* ---------- elements ---------- */
    const els = {
        search: $('#catalogSearch'),
        clear: $('#catalogClear'),
        chips: $('#catChips'),
        age: $('#ageFilter'),
        ageWrap: $('#ageWrap'),
        level: $('#levelFilter'),
        sort: $('#sortFilter'),
        count: $('#resultCount'),
        title: $('#catalogTitle'),
        intro: $('#catalogIntro'),
        eyebrow: $('#catalogEyebrow'),
        crumbBranch: $('#crumbBranch'),
        reset: $('#resetFilters')
    };

    const AGE_BUCKETS = [
        { id: 'all', label: 'Any age' },
        { id: '6-10', label: 'Ages 6–10', min: 6, max: 10 },
        { id: '11-14', label: 'Ages 11–14', min: 11, max: 14 },
        { id: '15-18', label: 'Ages 15–18', min: 15, max: 18 }
    ];

    /* ---------- helpers ---------- */
    function ageRange(text) {
        const s = String(text || '');
        if (!s || /all ages/i.test(s)) return [0, 99];
        const span = s.match(/(\d+)\s*[–\-—]\s*(\d+)/);
        if (span) return [+span[1], +span[2]];
        const open = s.match(/(\d+)\s*\+/);
        if (open) return [+open[1], 99];
        const one = s.match(/(\d+)/);
        if (one) return [+one[1], +one[1]];
        return [0, 99];
    }

    function matchesAge(course, bucketId) {
        if (bucketId === 'all') return true;
        const b = AGE_BUCKETS.find(x => x.id === bucketId);
        if (!b) return true;
        const [min, max] = ageRange(course.ages);
        return min <= b.max && max >= b.min;
    }

    function pool() {
        return LB.byBranch(state.branch);
    }

    function filtered() {
        const q = state.q.trim().toLowerCase();
        let list = pool().filter(c => {
            if (state.cat !== 'all' && c.category !== state.cat) return false;
            if (!matchesAge(c, state.age)) return false;
            if (state.level !== 'all' && c.level !== state.level) return false;
            if (q) {
                const hay = [c.name, c.category, c.tagline, c.about, c.ages, c.level, (c.subjects || []).join(' ')]
                    .join(' ').toLowerCase();
                if (!hay.includes(q)) return false;
            }
            return true;
        });

        if (state.sort === 'az') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
        if (state.sort === 'za') list = list.slice().sort((a, b) => b.name.localeCompare(a.name));
        return list;
    }

    /* ---------- URL sync ---------- */
    function syncUrl() {
        const p = new URLSearchParams();
        p.set('branch', state.branch);
        if (state.cat !== 'all') p.set('cat', state.cat);
        if (state.q.trim()) p.set('q', state.q.trim());
        if (state.age !== 'all') p.set('age', state.age);
        if (state.level !== 'all') p.set('level', state.level);
        if (state.sort !== 'featured') p.set('sort', state.sort);
        history.replaceState(null, '', location.pathname + '?' + p.toString());
    }

    /* ---------- chrome ---------- */
    function paintChrome() {
        const meta = LB.branches[state.branch];
        document.title = meta.short === 'For Kids'
            ? 'Online Courses for Kids, Ages 6–18 | Learning Bubble'
            : 'IGCSE, IELTS & SAT Exam Preparation | Learning Bubble';

        if (els.eyebrow) {
            els.eyebrow.innerHTML = `<i class="fas ${meta.icon}"></i> ${meta.name}`;
        }
        if (els.title) {
            els.title.textContent = state.branch === 'kids'
                ? 'Online courses for kids, ages 6–18'
                : 'Online exam preparation programmes';
        }
        if (els.intro) {
            els.intro.textContent = state.branch === 'kids'
                ? 'Creative online learning for kids — every course is project-first and non-examined. Filter by category or age, or search for something specific.'
                : 'IGCSE tuition, IELTS test preparation, SAT test preparation and English proficiency. Filter by track, or search for your subject.';
        }
        if (els.crumbBranch) {
            els.crumbBranch.textContent = meta.short;
            els.crumbBranch.setAttribute('href', meta.home);
        }

        const sub = $('#brandSub');
        if (sub) sub.textContent = state.branch === 'kids' ? 'for Kids' : 'Academics';

        /* branch links elsewhere on the page */
        $$('[data-branch-home]').forEach(a => { a.href = meta.home; });
        $$('.branch-switch a').forEach(a => a.classList.toggle('is-on', a.dataset.branch === state.branch));
    }

    function paintCategoryChips() {
        if (!els.chips) return;
        const cats = LB.categoriesFor(state.branch);
        els.chips.innerHTML =
            `<button type="button" class="chip-btn${state.cat === 'all' ? ' is-on' : ''}" data-cat="all">
         All <span style="opacity:.65">(${pool().length})</span>
       </button>` +
            cats.map(c => `
        <button type="button" class="chip-btn${state.cat === c.name ? ' is-on' : ''}" data-cat="${c.name}">
          ${c.short} <span style="opacity:.65">(${LB.countIn(c.name)})</span>
        </button>`).join('');
    }

    function paintAgeFilter() {
        if (!els.ageWrap) return;
        /* age buckets only make sense on the kids side */
        els.ageWrap.style.display = state.branch === 'kids' ? '' : 'none';
        if (state.branch !== 'kids') { state.age = 'all'; return; }
        if (els.age.options.length) return;
        els.age.innerHTML = AGE_BUCKETS.map(b =>
            `<option value="${b.id}"${state.age === b.id ? ' selected' : ''}>${b.label}</option>`).join('');
    }

    function paintLevelFilter() {
        if (!els.level) return;
        const levels = Array.from(new Set(pool().map(c => c.level).filter(Boolean)));
        els.level.innerHTML = `<option value="all">Any level</option>` +
            levels.map(l => `<option value="${l}"${state.level === l ? ' selected' : ''}>${l}</option>`).join('');
    }

    /* ---------- results ---------- */
    function paintResults() {
        const list = filtered();

        if (els.count) {
            const bits = [];
            if (state.cat !== 'all') bits.push(state.cat);
            if (state.age !== 'all') bits.push((AGE_BUCKETS.find(b => b.id === state.age) || {}).label);
            if (state.level !== 'all') bits.push(state.level);
            if (state.q.trim()) bits.push(`“${state.q.trim()}”`);
            els.count.innerHTML = `<strong>${list.length}</strong> ${list.length === 1 ? 'course' : 'courses'}` +
                (bits.length ? ` · ${bits.join(' · ')}` : '');
        }

        if (!list.length) {
            grid.className = '';
            grid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-magnifying-glass"></i>
          <h3>Nothing matched those filters</h3>
          <p>Try clearing a filter, or search for something broader.</p>
          <div class="row" style="justify-content:center;margin-top:1.5rem">
            <button class="btn btn-primary" id="emptyReset">Clear all filters</button>
            <a class="btn btn-outline" href="contact.html">Ask us what fits</a>
          </div>
        </div>`;
            const b = $('#emptyReset');
            if (b) b.addEventListener('click', resetAll);
            return;
        }

        grid.className = 'course-grid';
        grid.innerHTML = list.map((c, i) => window.LB_courseCard(c, i)).join('');

        /* reveal the freshly-built cards */
        requestAnimationFrame(() => $$('.reveal', grid).forEach(el => el.classList.add('is-in')));
    }

    function render() {
        paintChrome();
        paintCategoryChips();
        paintAgeFilter();
        paintLevelFilter();
        paintResults();
        syncUrl();
    }

    function resetAll() {
        state.cat = 'all';
        state.q = '';
        state.age = 'all';
        state.level = 'all';
        state.sort = 'featured';
        if (els.search) els.search.value = '';
        if (els.clear) els.clear.classList.remove('is-on');
        if (els.sort) els.sort.value = 'featured';
        render();
    }

    /* ---------- events ---------- */
    if (els.search) {
        els.search.value = state.q;
        if (state.q) els.clear.classList.add('is-on');
        let timer;
        els.search.addEventListener('input', () => {
            state.q = els.search.value;
            els.clear.classList.toggle('is-on', !!state.q);
            clearTimeout(timer);
            timer = setTimeout(() => { paintResults(); syncUrl(); }, 160);
        });
    }

    if (els.clear) {
        els.clear.addEventListener('click', () => {
            state.q = '';
            els.search.value = '';
            els.clear.classList.remove('is-on');
            els.search.focus();
            paintResults();
            syncUrl();
        });
    }

    if (els.chips) {
        els.chips.addEventListener('click', e => {
            const btn = e.target.closest('.chip-btn');
            if (!btn) return;
            state.cat = btn.dataset.cat;
            paintCategoryChips();
            paintResults();
            syncUrl();
        });
    }

    if (els.age) els.age.addEventListener('change', () => { state.age = els.age.value; paintResults(); syncUrl(); });
    if (els.level) els.level.addEventListener('change', () => { state.level = els.level.value; paintResults(); syncUrl(); });
    if (els.sort) {
        els.sort.value = state.sort;
        els.sort.addEventListener('change', () => { state.sort = els.sort.value; paintResults(); syncUrl(); });
    }
    if (els.reset) els.reset.addEventListener('click', resetAll);

    /* branch tabs inside the page */
    $$('[data-set-branch]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            const next = btn.dataset.setBranch;
            if (next === state.branch) return;
            state.branch = next;
            state.cat = 'all';
            state.age = 'all';
            state.level = 'all';
            document.documentElement.setAttribute('data-branch', next);
            document.body.dataset.branch = next;
            try { localStorage.setItem('lb-branch', next); } catch (err) { /* noop */ }
            $$('[data-set-branch]').forEach(b => b.classList.toggle('is-on', b.dataset.setBranch === next));
            render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        btn.classList.toggle('is-on', btn.dataset.setBranch === state.branch);
    });

    /* ---------- go ---------- */
    document.documentElement.setAttribute('data-branch', state.branch);
    document.body.dataset.branch = state.branch;
    render();
})();
