/* ============================================================
   LEARNING BUBBLE — Core shell
   ------------------------------------------------------------
   Runs on every page. Handles:
     theme · branch memory · nav · search overlay · footer
     WhatsApp FAB · back-to-top · reveal-on-scroll · FAQ
     carousels · counters · contact form
   Requires courses-data.js to be loaded first.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- config ---------- */
    const CFG = {
        whatsapp: '923212481610',
        whatsappDisplay: '+92 321 2481610',
        email: 'info@learningbubble.org',
        facebook: 'https://www.facebook.com/share/1J5LhTqGc4/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/learningbubbleofficial?igsh=c210OHA3cjZnZ2Nh',
        instagramKids: 'https://www.instagram.com/learningbubblekids',
        instagramAcademics: 'https://www.instagram.com/learningbubbleacademics',
        themeKey: 'lb-theme',
        branchKey: 'lb-branch'
    };
    window.LB_CFG = CFG;

    const root = document.documentElement;
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* ============================================================
       BRANCH
       ============================================================ */
    function currentBranch() {
        return root.getAttribute('data-branch') || 'hub';
    }

    /* Which Instagram profile to show in the footer: kids-branch pages get
       the Kids account, academics-branch pages get the Academics account,
       everything else (home, demo, contact/enquiry, enrollment/checkout,
       courses hub, blog, about, resources) gets the main account. A page
       can force this regardless of its data-branch via data-ig-branch="hub"
       on <html> (used by demo.html, contact.html, enrollment.html so those
       stay on the main account even when their own branch is kids/academics). */
    function igLink() {
        const forced = root.getAttribute('data-ig-branch');
        const b = forced || currentBranch();
        if (b === 'kids') return CFG.instagramKids;
        if (b === 'academics') return CFG.instagramAcademics;
        return CFG.instagram;
    }

    function initBranch() {
        const pageBranch = document.body.dataset.branch;
        if (pageBranch) {
            root.setAttribute('data-branch', pageBranch);
            if (pageBranch !== 'hub') {
                try { localStorage.setItem(CFG.branchKey, pageBranch); } catch (e) { /* private mode */ }
            }
        } else if (!root.hasAttribute('data-branch')) {
            root.setAttribute('data-branch', 'hub');
        }
    }

    function rememberedBranch() {
        try { return localStorage.getItem(CFG.branchKey) || 'kids'; } catch (e) { return 'kids'; }
    }
    window.LB_branch = { current: currentBranch, remembered: rememberedBranch };

    /* ============================================================
       THEME
       ============================================================ */
    function initTheme() {
        const btn = $('#themeToggle');
        const isDark = () => root.classList.contains('dark-theme');

        const paint = () => {
            $$('#themeToggle').forEach(b => {
                b.innerHTML = isDark()
                    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
                    : '<i class="fas fa-moon" aria-hidden="true"></i>';
                b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
                b.setAttribute('title', isDark() ? 'Light mode' : 'Dark mode');
            });
        };

        if (!btn) return;
        paint();

        document.addEventListener('click', e => {
            const t = e.target.closest('#themeToggle');
            if (!t) return;
            root.classList.toggle('dark-theme');
            try { localStorage.setItem(CFG.themeKey, isDark() ? 'dark' : 'light'); } catch (err) { /* noop */ }
            paint();
        });
    }

    /* ============================================================
       HEADER
       ============================================================ */
    function initHeader() {
        const header = $('#siteHeader');
        const toggle = $('#navToggle');
        const links = $('#navLinks');

        if (header) {
            let ticking = false;
            const onScroll = () => {
                if (ticking) return;
                ticking = true;
                requestAnimationFrame(() => {
                    header.classList.toggle('is-stuck', window.scrollY > 8);
                    ticking = false;
                });
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
        }

        /* on small screens the header switch is hidden — move a copy
           into the drawer so both programmes stay one tap away */
        const hdrSwitch = document.querySelector('.site-header .branch-switch');
        if (links && hdrSwitch && !links.querySelector('.nav-branch')) {
            const clone = hdrSwitch.cloneNode(true);
            clone.classList.add('nav-branch');
            clone.removeAttribute('role');
            links.prepend(clone);
        }

        if (links && !links.querySelector('.nav-cta')) {
            /* the header "Enquire" button is hidden on narrow screens —
               give the drawer its own call to action instead */
            const cta = document.createElement('a');
            cta.className = 'nav-link nav-cta';
            cta.href = 'enrollment';
            cta.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Enquire now';
            links.appendChild(cta);
        }

        if (toggle && links) {
            toggle.addEventListener('click', () => {
                const open = links.classList.toggle('is-open');
                toggle.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
            });
            links.addEventListener('click', e => {
                if (e.target.closest('a')) {
                    links.classList.remove('is-open');
                    toggle.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        /* mark the active nav item */
        const file = (location.pathname.split('/').pop() || 'index').toLowerCase();
        $$('.nav-link').forEach(a => {
            const href = (a.getAttribute('href') || '').split('?')[0].toLowerCase();
            if (href && href === file) a.classList.add('is-active');
        });

        /* branch switch: point "Courses" style links at the right branch */
        $$('.branch-switch a').forEach(a => {
            if (a.dataset.branch === currentBranch()) a.classList.add('is-on');
        });
    }

    /* ============================================================
       FOOTER (injected — identical on every page)
       ============================================================ */
    function renderFooter() {
        const host = $('#siteFooter');
        if (!host) return;
        const b = currentBranch();
        const kidsCats = LB.categoriesFor('kids').slice(0, 5);
        const acadCats = LB.categoriesFor('academics').slice(0, 5);

        host.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index">
              <img class="brand-logo" src="assets/images/logo.png" alt="" width="40" height="40">
              <span class="brand-text"><strong>Learning Bubble</strong><em class="brand-sub">Kids &amp; Academics</em></span>
            </a>
            <p>Learning Bubble is an online learning and elearning platform for online learning for kids in Pakistan
            and academic learning in Pakistan. Our creative courses for kids cover AI for kids, coding for kids,
            history mystery for kids, poetry for kids and creative writing for kids, while our academic learning
            programmes cover IGCSE in Pakistan, IELTS in Pakistan (Academic &amp; General), SAT in Pakistan and
            English Language courses — plus practical skills like Professional Email Writing. Every session is live
            online, taught in small groups, for students in Pakistan and worldwide. Our approach blends personalized,
            project-based learning with STEM &amp; STEAM thinking, building the 21st-century skills, critical thinking
            and study skills that carry students through exams and beyond.</p>
            <div class="footer-social">
              <a href="${CFG.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="${igLink()}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              <a href="mailto:${CFG.email}" aria-label="Email"><i class="fas fa-envelope"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>For Kids</h4>
            <ul>
              <li><a href="kids">Kids home</a></li>
              ${kidsCats.map(c => `<li><a href="courses?branch=kids&amp;cat=${encodeURIComponent(c.name)}">${c.short}</a></li>`).join('')}
            </ul>
          </div>

          <div class="footer-col">
            <h4>Academics</h4>
            <ul>
              <li><a href="academics">Academics home</a></li>
              ${acadCats.map(c => `<li><a href="courses?branch=academics&amp;cat=${encodeURIComponent(c.name)}">${c.short}</a></li>`).join('')}
            </ul>
          </div>

          <div class="footer-col">
            <h4>Learning Bubble</h4>
            <ul>
              <li><a href="about">About us</a></li>
              <li><a href="resources">Resources</a></li>
              <li><a href="contact">Contact</a></li>
              <li><a href="enrollment">Enquire / Enrol</a></li>
              <li><a href="courses?branch=${b === 'hub' ? 'kids' : b}">All courses</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Get in touch</h4>
            <ul>
              <li><i class="fab fa-whatsapp"></i>${CFG.whatsappDisplay}</li>
              <li><i class="fas fa-envelope"></i><a href="mailto:${CFG.email}">${CFG.email}</a></li>
              <li><i class="fas fa-globe"></i>Online · worldwide</li>
              <li><i class="fas fa-clock"></i>Mon–Sat, 10am–8pm PKT</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom footer-bottom--links">
          <p style="width:100%;margin:0 0 .6rem"><strong>Popular:</strong>
            <a href="course-artificial-intelligence-for-kids">AI for Kids</a> ·
            <a href="course-fun-coding">Coding for Kids</a> ·
            <a href="course-history-mystery">History Mystery for Kids</a> ·
            <a href="course-poets-corner">Poetry for Kids</a> ·
            <a href="courses?branch=kids&amp;cat=Creative%20Writing%20%26%20Literature%20Development">Creative Writing for Kids</a> ·
            <a href="course-igcse-academics">IGCSE Academics</a> ·
            <a href="course-ielts-academic">IELTS Academics</a> ·
            <a href="course-ielts-general-training">IELTS General</a> ·
            <a href="course-sat-preparation">SAT Preparation</a> ·
            <a href="courses?branch=academics&amp;cat=English%20Language">English Language Courses</a> ·
            <a href="course-professional-email-writing">Professional Email Writing</a> ·
            <a href="kids">Online Learning for Kids in Pakistan</a> ·
            <a href="course-igcse-academics">IGCSE in Pakistan</a> ·
            <a href="course-ielts-academic">IELTS in Pakistan</a> ·
            <a href="course-sat-preparation">SAT in Pakistan</a> ·
            <a href="academics">Academic Learning in Pakistan</a> ·
            <a href="courses">Online Courses in Pakistan</a> ·
            <a href="demo">Book a Free Demo Class</a> ·
            <a href="contact">Online Tutor in Pakistan</a> ·
            <a href="index">Online Academy in Pakistan</a> ·
            <a href="course-learn-python">Python for Kids</a> ·
            <a href="courses?branch=academics&amp;cat=A-Level%20Academics">A-Level Academics</a> ·
            <a href="course-financial-literacy-ages-8-12">Financial Literacy for Kids</a>
          </p>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Learning Bubble. All rights reserved.</p>
          <nav>
            <a href="about">About</a>
            <a href="courses?branch=kids">Kids courses</a>
            <a href="courses?branch=academics">Academics</a>
            <a href="contact">Contact</a>
          </nav>
        </div>
      </div>`;
    }

    /* ============================================================
       WHATSAPP + BACK TO TOP
       ============================================================ */
    function waLink(msg) {
        const b = currentBranch();
        const fallback = b === 'academics'
            ? 'Hi Learning Bubble! I would like to know more about your Academics programmes (IGCSE / A-Levels / IELTS / SAT).'
            : b === 'kids'
                ? 'Hi Learning Bubble! I would like to know more about your courses for kids.'
                : 'Hi Learning Bubble! I would like to know more about your courses.';
        return `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg || fallback)}`;
    }
    window.LB_waLink = waLink;

    function renderFabs() {
        if ($('.floatbtn-stack')) return;
        const wrap = document.createElement('div');
        wrap.className = 'floatbtn-stack';
        wrap.innerHTML = `
      <a class="floatbtn floatbtn-wa" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
        <span class="floatbtn-label">Chat with us</span>
      </a>
      <button class="floatbtn floatbtn-top" id="backTop" aria-label="Back to top">
        <i class="fas fa-arrow-up" aria-hidden="true"></i>
      </button>`;
        document.body.appendChild(wrap);

        const top = $('#backTop');
        top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                top.classList.toggle('is-on', window.scrollY > 600);
                ticking = false;
            });
        }, { passive: true });
    }

    /* ============================================================
       SEARCH OVERLAY
       ============================================================ */
    function renderSearch() {
        if ($('#searchOverlay')) return;
        const start = currentBranch() === 'hub' ? 'all' : currentBranch();

        const el = document.createElement('div');
        el.className = 'search-overlay';
        el.id = 'searchOverlay';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-modal', 'true');
        el.setAttribute('aria-label', 'Search courses');
        el.innerHTML = `
      <div class="search-panel">
        <div class="search-field">
          <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
          <input type="search" id="searchInput" placeholder="Search courses, subjects, skills…" autocomplete="off" aria-label="Search courses">
          <span class="search-esc">ESC</span>
        </div>
        <div class="search-scope" id="searchScope">
          <button type="button" data-scope="all">Everything</button>
          <button type="button" data-scope="kids">For Kids</button>
          <button type="button" data-scope="academics">Academics</button>
        </div>
        <div class="search-results" id="searchResults"></div>
      </div>`;
        document.body.appendChild(el);

        const input = $('#searchInput', el);
        const results = $('#searchResults', el);
        const scopeBar = $('#searchScope', el);
        let scope = start;

        const paintScope = () => $$('button', scopeBar).forEach(b => b.classList.toggle('is-on', b.dataset.scope === scope));

        const suggestions = () => {
            const pool = LB.byBranch(scope === 'all' ? null : scope);
            return pool.slice(0, 6);
        };

        const render = list => {
            if (!list.length) {
                results.innerHTML = `<div class="search-empty">
          <p>No courses matched that.</p>
          <p style="margin-top:.4rem;font-size:.82rem">Try “coding”, “IELTS”, “writing” or “IGCSE”.</p>
        </div>`;
                return;
            }
            results.innerHTML = list.slice(0, 10).map(c => `
        <a class="search-item" href="${courseUrl(c)}">
          <span class="search-item-ico"><i class="fas ${c.icon || 'fa-book'}"></i></span>
          <span class="search-item-body">
            <strong>${c.name}</strong>
            <span>${c.category}${c.ages ? ' · Ages ' + c.ages : ''}</span>
          </span>
        </a>`).join('');
        };

        const run = () => {
            const q = input.value.trim();
            render(q ? LB.search(q, scope === 'all' ? null : scope) : suggestions());
        };

        let timer;
        input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 110); });
        scopeBar.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            scope = b.dataset.scope;
            paintScope();
            run();
        });

        input.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            const first = $('.search-item', results);
            if (first) { location.href = first.getAttribute('href'); return; }
            const branch = scope === 'all' ? rememberedBranch() : scope;
            location.href = `courses?branch=${branch}&q=${encodeURIComponent(input.value.trim())}`;
        });

        paintScope();
        run();
    }

    function openSearch() {
        const el = $('#searchOverlay');
        if (!el) return;
        el.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => $('#searchInput').focus(), 60);
    }

    function closeSearch() {
        const el = $('#searchOverlay');
        if (!el) return;
        el.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function initSearch() {
        renderSearch();
        document.addEventListener('click', e => {
            if (e.target.closest('[data-search-open]')) { e.preventDefault(); openSearch(); return; }
            const overlay = $('#searchOverlay');
            if (overlay && overlay.classList.contains('is-open') && e.target === overlay) closeSearch();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeSearch();
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
            if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
                e.preventDefault(); openSearch();
            }
        });
    }

    /* ============================================================
       REVEAL ON SCROLL
       ============================================================ */
    function initReveal() {
        const items = $$('.reveal');
        if (!items.length) return;
        if (!('IntersectionObserver' in window)) {
            items.forEach(i => i.classList.add('is-in'));
            return;
        }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                en.target.classList.add('is-in');
                obs.unobserve(en.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        items.forEach(i => io.observe(i));
    }

    /* ============================================================
       COUNTERS
       ============================================================ */
    function initCounters() {
        const nums = $$('[data-count]');
        if (!nums.length || !('IntersectionObserver' in window)) {
            nums.forEach(n => { n.textContent = n.dataset.count + (n.dataset.suffix || ''); });
            return;
        }
        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(en => {
                if (!en.isIntersecting) return;
                obs.unobserve(en.target);
                const el = en.target;
                const target = parseFloat(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const dur = 1400;
                const t0 = performance.now();
                const tick = now => {
                    const p = Math.min((now - t0) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    const val = target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased);
                    el.textContent = val + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.4 });
        nums.forEach(n => io.observe(n));
    }

    /* ============================================================
       FAQ
       ============================================================ */
    function initFaq() {
        $$('.faq').forEach(list => {
            list.addEventListener('click', e => {
                const q = e.target.closest('.faq-q');
                if (!q) return;
                const item = q.closest('.faq-item');
                const open = item.classList.contains('is-open');
                $$('.faq-item', list).forEach(i => {
                    i.classList.remove('is-open');
                    const b = $('.faq-q', i);
                    if (b) b.setAttribute('aria-expanded', 'false');
                });
                if (!open) {
                    item.classList.add('is-open');
                    q.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ============================================================
       CAROUSELS
       ============================================================ */
    function initCarousels() {
        $$('.carousel').forEach(car => {
            const track = $('.carousel-track', car);
            const prev = $('[data-car="prev"]', car);
            const next = $('[data-car="next"]', car);
            if (!track) return;

            const step = () => {
                const first = track.firstElementChild;
                if (!first) return 320;
                return first.getBoundingClientRect().width + 20;
            };

            const sync = () => {
                if (!prev || !next) return;
                prev.disabled = track.scrollLeft < 8;
                next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
            };

            if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
            if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
            track.addEventListener('scroll', sync, { passive: true });
            window.addEventListener('resize', sync, { passive: true });
            sync();
        });
    }

    /* ============================================================
       TOASTS
       ============================================================ */
    function toast(message, type) {
        let wrap = $('.toast-wrap');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.className = 'toast-wrap';
            wrap.setAttribute('role', 'status');
            wrap.setAttribute('aria-live', 'polite');
            document.body.appendChild(wrap);
        }
        const icon = type === 'error' ? 'fa-circle-exclamation'
            : type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
        const t = document.createElement('div');
        t.className = 'toast toast--' + (type || 'info');
        t.innerHTML = `<i class="fas ${icon}" aria-hidden="true"></i><span>${message}</span>`;
        wrap.appendChild(t);
        setTimeout(() => {
            t.classList.add('is-out');
            t.addEventListener('animationend', () => t.remove(), { once: true });
        }, 4200);
    }
    window.LB_toast = toast;

    /* ============================================================
       COURSE CARD MARKUP (shared)
       ============================================================ */
    /* Some courses have no bespoke artwork — fall back to a branded
       gradient panel carrying the course icon rather than a stock photo
       that would misrepresent the subject. */
    function media(c) {
        return c.image
            ? `<img src="${c.image}" alt="${c.name}" loading="lazy" width="400" height="250"
                    onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'media-art',innerHTML:'<i class=\\'fas ${c.icon || 'fa-book'}\\'></i>'}))">`
            : `<span class="media-art"><i class="fas ${c.icon || 'fa-book'}" aria-hidden="true"></i></span>`;
    }
    window.LB_media = media;

    /** Canonical link for a course: clean static-page slug when one exists,
        otherwise fall back to the branch catalogue (e.g. A-Level Academics). */
    function courseUrl(c) {
        return c && c.slug ? c.slug : `courses?branch=${(c && c.branch) || 'kids'}`;
    }
    window.LB_courseUrl = courseUrl;

    function courseCard(c, delay) {
        const d = delay ? ` data-delay="${delay % 4 + 1}"` : '';
        return `
      <article class="course-card reveal"${d}>
        <a class="course-media" href="${courseUrl(c)}" aria-label="${c.name}">
          ${media(c)}
          <span class="course-tag">${c.category}</span>
          <span class="course-level" title="${c.level || ''}"><i class="fas ${c.icon || 'fa-book'}"></i></span>
        </a>
        <div class="course-body">
          <h3><a href="${courseUrl(c)}">${c.name}</a></h3>
          <p class="course-tagline">${c.tagline || ''}</p>
          <div class="course-meta">
            ${c.ages ? `<span class="chip"><i class="fas fa-child-reaching"></i>${c.ages}</span>` : ''}
            <span class="chip"><i class="fas fa-clock"></i>${c.duration}</span>
          </div>
          <div class="course-foot">
            <a class="course-more" href="${courseUrl(c)}">View course <i class="fas fa-arrow-right"></i></a>
            <a class="course-enrol" href="enrollment?id=${c.id}" title="Add to enquiry" aria-label="Add ${c.name} to enquiry">
              <i class="fas fa-plus"></i>
            </a>
          </div>
        </div>
      </article>`;
    }
    window.LB_courseCard = courseCard;

    /* ============================================================
       HOMEPAGE DYNAMIC BLOCKS
       ============================================================ */
    function fillDynamic() {
        /* [data-courses="branch:limit"] → featured course rail */
        $$('[data-courses]').forEach(host => {
            const [branch, limit] = host.dataset.courses.split(':');
            const pool = LB.byBranch(branch === 'all' ? null : branch);
            const picked = (host.dataset.pick
                ? host.dataset.pick.split(',').map(id => LB.course(id.trim())).filter(Boolean)
                : pool
            ).slice(0, Number(limit) || 6);
            host.innerHTML = picked.map((c, i) => courseCard(c, i)).join('');
        });

        /* [data-categories="branch"] → category grid */
        $$('[data-categories]').forEach(host => {
            const branch = host.dataset.categories;
            host.innerHTML = LB.categoriesFor(branch === 'all' ? null : branch).map((cat, i) => `
        <a class="cat-card reveal" data-delay="${i % 4 + 1}" href="courses?branch=${cat.branch}&cat=${encodeURIComponent(cat.name)}">
          <div class="cat-media">
            ${cat.image
                    ? `<img src="${cat.image}" alt="" loading="lazy" width="400" height="225" onerror="this.style.display='none'">`
                    : `<span class="media-art"><i class="fas ${cat.icon}" aria-hidden="true"></i></span>`}
            <span class="cat-ico"><i class="fas ${cat.icon}"></i></span>
          </div>
          <div class="cat-body">
            <h3>${cat.name}</h3>
            <p>${cat.blurb}</p>
            <div class="cat-meta">
              <span>${LB.countIn(cat.name)} course${LB.countIn(cat.name) === 1 ? '' : 's'}</span>
              Browse <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </a>`).join('');
        });

        /* [data-course-count="branch"] → plain number */
        $$('[data-course-count]').forEach(el => {
            const b = el.dataset.courseCount;
            el.textContent = LB.byBranch(b === 'all' ? null : b).length;
        });
    }

    /* ============================================================
       CONTACT FORM → /api/send-email
       ============================================================ */
    function initContactForm() {
        const form = $('#contactForm');
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            const name = (data.get('name') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const phone = (data.get('phone') || '').toString().trim() || 'Not provided';
            const interest = (data.get('interest') || '').toString().trim();
            const subject = (data.get('subject') || '').toString().trim();
            const message = (data.get('message') || '').toString().trim();

            if (!name || !email || !subject || !message) {
                toast('Please fill in every required field.', 'error');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
                toast('That email address does not look right.', 'error');
                return;
            }

            const btn = $('button[type="submit"]', form);
            const label = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

            const esc = s => String(s).replace(/[<>&]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[m]));
            const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#222">
        <div style="background:linear-gradient(135deg,#1c2f72,#0ea5a4);color:#fff;padding:22px;text-align:center">
          <h1 style="margin:0;font-size:20px">New Contact Message</h1>
        </div>
        <div style="padding:22px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;width:150px"><strong>Name</strong></td><td>${esc(name)}</td></tr>
            <tr><td style="padding:6px 0"><strong>Email</strong></td><td>${esc(email)}</td></tr>
            <tr><td style="padding:6px 0"><strong>Phone / WhatsApp</strong></td><td>${esc(phone)}</td></tr>
            <tr><td style="padding:6px 0"><strong>Interested in</strong></td><td>${esc(interest || '—')}</td></tr>
            <tr><td style="padding:6px 0"><strong>Subject</strong></td><td>${esc(subject)}</td></tr>
          </table>
          <h3 style="margin:22px 0 8px;color:#1c2f72;font-size:15px">Message</h3>
          <div style="background:#f6f7fb;padding:14px;border-radius:8px;font-size:14px;line-height:1.6">
            ${esc(message).replace(/\n/g, '<br>')}
          </div>
          <a href="https://wa.me/${phone.replace(/[^0-9]/g, '') || CFG.whatsapp}"
             style="display:inline-block;margin-top:20px;background:#25d366;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold">
            Reply on WhatsApp
          </a>
        </div>
      </body></html>`;

            fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject: `Contact: ${subject}`, replyTo: email, html })
            })
                .then(async res => {
                    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
                    toast('Thank you! Your message is on its way — we usually reply within a day.', 'success');
                    form.reset();
                })
                .catch(err => {
                    console.error(err);
                    toast('Something went wrong. Please message us on WhatsApp instead.', 'error');
                })
                .finally(() => { btn.disabled = false; btn.innerHTML = label; });
        });
    }

    /* ============================================================
       DECORATIVE BUBBLES
       ============================================================ */
    function initBubbles() {
        $$('.bubbles').forEach(host => {
            if (host.childElementCount) return;
            const n = window.innerWidth < 700 ? 6 : 11;
            let html = '';
            for (let i = 0; i < n; i++) {
                const size = 14 + Math.random() * 62;
                html += `<i style="left:${Math.random() * 100}%;width:${size}px;height:${size}px;
                 animation-duration:${16 + Math.random() * 18}s;animation-delay:${-Math.random() * 22}s"></i>`;
            }
            host.innerHTML = html;
        });
    }

    /* ============================================================
       BOOT
       ============================================================ */
    function boot() {
        initBranch();
        initTheme();
        initHeader();
        renderFooter();
        renderFabs();
        initSearch();
        fillDynamic();
        initFaq();
        initCarousels();
        initCounters();
        initBubbles();
        initContactForm();
        initReveal();
        root.classList.remove('fouc-prevent');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
