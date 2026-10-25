/* ============================================================
   LEARNING BUBBLE: Core shell
   ------------------------------------------------------------
   Runs on every page. Handles:
     analytics · theme · branch memory · nav · search overlay
     footer · WhatsApp FAB · back-to-top · reveal-on-scroll · FAQ
     carousels · counters · contact form · clean internal links
   Requires courses-data.js to be loaded first.
   ============================================================ */
(function () {
    'use strict';

    /* ---------- config ---------- */
    const CFG = {
        whatsapp: '923212481610',
        whatsappDisplay: '+92 321 2481610',
        email: 'info@learningbubble.org',
        workshopFormUrl: 'https://forms.gle/YtgVSWtMfaxssyTq9',
        courseFormUrl: 'https://forms.gle/7R9Hc1KjYtZ2Pp6J9',
        /* Google review link: Google Business Profile → "Ask for reviews" → copy the link
           (looks like https://g.page/r/XXXX/review). Leave empty to hide the button. */
        googleReviewUrl: 'https://g.page/r/CdxiPEN_lJfdEBM/review',
        facebook: 'https://www.facebook.com/share/1J5LhTqGc4/?mibextid=wwXIfr',
        instagramKids: 'https://www.instagram.com/learningbubblekids',
        instagramAcademics: 'https://www.instagram.com/learningbubbleacademics',
        /* Google Analytics 4: paste the Measurement ID from
           GA → Admin → Data streams → (your web stream), e.g. 'G-AB12CD34EF'.
           Leave empty to keep analytics switched off. */
        gaMeasurementId: '',
        themeKey: 'lb-theme',
        branchKey: 'lb-branch'
    };
    window.LB_CFG = CFG;

    const root = document.documentElement;
    const $ = (sel, ctx) => (ctx || document).querySelector(sel);
    const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

    /* ============================================================
       ANALYTICS (Google Analytics 4)
       Loaded from here so one ID switches it on for every page.
       ============================================================ */
    function initAnalytics() {
        const id = String(CFG.gaMeasurementId || '').trim();
        if (!/^G-[A-Z0-9]{4,}$/i.test(id) || window.__lbGa) return;
        window.__lbGa = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', id);
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
        document.head.appendChild(s);
    }
    initAnalytics();

    function track(name, params) {
        try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) { /* noop */ }
    }
    window.LB_track = track;

    /* Key clicks worth measuring: workshop registrations, WhatsApp and email. */
    function initTracking() {
        document.addEventListener('click', e => {
            const a = e.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href') || '';
            const where = pageName();
            if (a.dataset.register) {
                track('workshop_register_click', { workshop: a.dataset.register, page: where });
            }
            if (a.dataset.courseForm) {
                track('course_register_click', { course: a.dataset.courseForm, page: where });
            }
            if (/wa\.me\//.test(href)) {
                track('whatsapp_click', { page: where, link_text: (a.textContent || '').trim().slice(0, 60) });
            } else if (/^mailto:/i.test(href)) {
                track('email_click', { page: where });
            }
        }, true);
    }

    /* ============================================================
       CLEAN INTERNAL LINKS
       The host 308-redirects /index and /*.html to the clean URL.
       Links that point at a redirect are reported in Search
       Console as "Page with redirect", so rewrite any that slip
       through (static markup or script-rendered) to the final URL.
       ============================================================ */
    function cleanHref(href) {
        if (!href || /^(https?:|mailto:|tel:|#|javascript:|\/\/)/i.test(href)) return null;
        const m = href.match(/^(\.?\/)?([^?#]*)(\?[^#]*)?(#.*)?$/);
        if (!m) return null;
        const lead = m[1] === '/' ? '/' : '';
        let path = m[2] || '';
        const query = m[3] || '';
        const hash = m[4] || '';
        let changed = false;
        if (/^index(\.html?)?$/i.test(path)) { path = ''; changed = true; }
        else if (/\.html?$/i.test(path) && !/\//.test(path)) { path = path.replace(/\.html?$/i, ''); changed = true; }
        if (!changed) return null;
        if (!path) return '/' + query + hash;
        return lead + path + query + hash;
    }

    function cleanLinks(scope) {
        $$('a[href]', scope).forEach(a => {
            const next = cleanHref(a.getAttribute('href'));
            if (next !== null) a.setAttribute('href', next);
        });
    }

    function watchLinks() {
        cleanLinks();
        if (!('MutationObserver' in window)) return;
        let queued = false;
        new MutationObserver(() => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => { queued = false; cleanLinks(); carryBranch(); });
        }).observe(document.body, { childList: true, subtree: true });
    }

    /* courses-data.js still carries 'kids.html' / 'academics.html' as branch homes */
    function cleanBranchHomes() {
        if (typeof LB === 'undefined' || !LB.branches) return;
        Object.keys(LB.branches).forEach(k => {
            const b = LB.branches[k];
            if (b && typeof b.home === 'string') b.home = b.home.replace(/\.html?$/i, '');
        });
    }

    /* ============================================================
       BRANCH
       ============================================================ */
    function currentBranch() {
        return root.getAttribute('data-branch') || 'hub';
    }

    /* Which Instagram profile(s) to show in the footer: kids-branch pages get
       only the Kids account, academics-branch pages get only the Academics
       account. Everything else (home, demo, contact/enquiry,
       enrollment/checkout, courses hub, blog, about, resources) shows BOTH,
       since those pages represent the whole brand rather than one section.
       There is no general/official account any more. It was retired in
       favour of these two. A page can force the "show both" hub behaviour
       regardless of its own data-branch via data-ig-branch="hub" on <html>
       (used by demo.html, contact.html, enrollment.html so those show both
       accounts even when their own branch is kids/academics). */
    function igLinks() {
        const forced = root.getAttribute('data-ig-branch');
        const b = forced || currentBranch();
        if (b === 'kids') return [{ url: CFG.instagramKids, label: 'Instagram | Learning Bubble Kids' }];
        if (b === 'academics') return [{ url: CFG.instagramAcademics, label: 'Instagram | Learning Bubble Academics' }];
        return [
            { url: CFG.instagramKids, label: 'Instagram | Learning Bubble Kids' },
            { url: CFG.instagramAcademics, label: 'Instagram | Learning Bubble Academics' }
        ];
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

        /* on small screens the header switch is hidden: move a copy
           into the drawer so both programmes stay one tap away */
        const hdrSwitch = document.querySelector('.site-header .branch-switch');
        if (links && hdrSwitch && !links.querySelector('.nav-branch')) {
            const clone = hdrSwitch.cloneNode(true);
            clone.classList.add('nav-branch');
            clone.removeAttribute('role');
            links.prepend(clone);
        }

        if (links && !links.querySelector('.nav-cta')) {
            /* the header "Enquire" button is hidden on narrow screens:
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
       FOOTER (injected: identical on every page)
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
            <a class="brand" href="/">
              <img class="brand-logo" src="assets/images/logo.png" alt="" width="40" height="40">
              <span class="brand-text"><strong>Learning Bubble</strong><em class="brand-sub">Kids &amp; Academics</em></span>
            </a>
            <p>Learning Bubble is an online learning and elearning platform for online learning for kids in Pakistan
            and academic learning in Pakistan. Our creative courses for kids cover AI for kids, coding for kids,
            history mystery for kids, poetry for kids and creative writing for kids, while our academic learning
            programmes cover IGCSE in Pakistan, IELTS in Pakistan (Academic &amp; General), SAT in Pakistan and
            English Language courses, plus practical skills like Professional Email Writing. Every session is live
            online, taught in small groups, for students in Pakistan and worldwide. Our approach blends personalized,
            project-based learning with STEM &amp; STEAM thinking, building the 21st-century skills, critical thinking
            and study skills that carry students through exams and beyond.</p>
            <div class="footer-social">
              <a href="${CFG.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              ${igLinks().map(ig => `<a href="${ig.url}" target="_blank" rel="noopener" aria-label="${ig.label}" title="${ig.label}"><i class="fab fa-instagram"></i></a>`).join('')}
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
              ${b === 'academics' ? '' : '<li><a href="workshops">Free kids workshops</a></li>'}
              <li><a href="blog">Parent &amp; student guides</a></li>
              <li><a href="resources">Resources</a></li>
              <li><a href="contact">Contact</a></li>
              <li><a href="enrollment">Enquire / Enrol</a></li>
              <li><a href="${CFG.courseFormUrl}" target="_blank" rel="noopener" data-course-form="footer">Course registration form</a></li>
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
            <a href="/">Online Academy in Pakistan</a> ·
            <a href="course-learn-python">Python for Kids</a> ·
            <a href="course-a-level-academics">A-Level Academics</a> ·
            <a href="course-financial-literacy-ages-8-12">Financial Literacy for Kids</a> ·
            <a href="blog-free-online-workshops-for-kids-pakistan">Free Online Workshops for Kids</a> ·
            <a href="igcse-o-level-subjects">IGCSE &amp; O Level Tuition</a> ·
            <a href="ielts-sat-english-guides">IELTS, SAT &amp; English Guides</a> ·
            <a href="coding-and-ai-for-kids">Coding &amp; AI for Kids</a> ·
            <a href="free-activities-for-kids">Free Activities for Kids</a> ·
            <a href="free-demo-classes">Free Demo Classes</a> ·
            <a href="blog-affordable-online-courses-pakistan">Affordable Online Courses</a> ·
            <a href="online-classes-karachi">Online Classes in Karachi</a> ·
            <a href="online-classes-lahore">Online Classes in Lahore</a> ·
            <a href="online-classes-islamabad">Online Classes in Islamabad</a> ·
            <a href="online-classes-uae">Online Tutoring in Dubai &amp; UAE</a> ·
            <a href="online-classes-uk">Online Tutoring UK</a> ·
            <a href="online-classes-usa">Online Classes USA</a> ·
            <a href="online-classes-canada">Online Tutoring Canada</a> ·
            <a href="online-classes-australia">Online Tutoring Australia</a> ·
            <a href="online-classes-saudi-arabia">Online Tutoring Saudi Arabia</a> ·
            <a href="online-classes-qatar">Online Tutoring Qatar</a> ·
            <a href="online-classes-germany">Online Classes Germany</a> ·
            <a href="online-classes-china">Online Classes China</a> ·
            <a href="online-classes-japan">Online Classes Japan</a> ·
            <a href="online-classes-singapore">IGCSE Tuition Singapore</a> ·
            <a href="online-classes-malaysia">IGCSE Tuition Malaysia</a> ·
            <a href="online-classes-worldwide">Online Classes Worldwide</a> ·
            <a href="blog-advantages-and-disadvantages-of-online-learning">Advantages of Online Learning</a> ·
            <a href="a-level-subjects">A Level Tuition Online</a> ·
            <a href="a-level-physics-tuition-online">A Level Physics Tuition</a> ·
            <a href="a-level-maths-tuition-online">A Level Maths Tuition</a> ·
            <a href="blog-ielts-fee-in-pakistan">IELTS Fee in Pakistan</a> ·
            <a href="blog-ielts-vs-pte-vs-toefl">IELTS vs PTE vs TOEFL</a> ·
            <a href="blog-sat-in-pakistan-fees-registration">SAT in Pakistan</a> ·
            <a href="blog-ibcc-equivalence-o-level-a-level">IBCC Equivalence</a>
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
    /* Form delivery. The old /api/send-email endpoint never existed on
       Cloudflare Pages, so every form failed. Leads now go to the inbox in
       CFG.email through FormSubmit (no server needed). If that fails for any
       reason, the visitor is sent to WhatsApp with their details already
       typed in, so no enquiry is ever lost. */
    function sendLead(o) {
        const body = Object.assign({ _subject: o.subject || 'Website enquiry', _template: 'table', _captcha: 'false' }, o.fields || {});
        if (o.replyTo) body._replyto = o.replyTo;
        return fetch('https://formsubmit.co/ajax/' + CFG.email, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        }).then(res => res.json().catch(() => ({})).then(j => {
            if (!res.ok || String(j.success) !== 'true') throw new Error(j.message || 'Send failed');
            return j;
        }));
    }
    function leadText(title, fields) {
        return title + '\n\n' + Object.keys(fields)
            .filter(k => fields[k] && String(fields[k]).trim())
            .map(k => k + ': ' + fields[k]).join('\n');
    }
    function waFallback(text) {
        const url = waLink(text);
        toast('Opening WhatsApp so you can send your details to us directly.', 'info');
        setTimeout(() => {
            const w = window.open(url, '_blank');
            if (w) { try { w.opener = null; } catch (e) { } } else { location.href = url; }
        }, 600);
    }
    window.LB_sendLead = sendLead;
    window.LB_leadText = leadText;
    window.LB_waFallback = waFallback;

    /* On a Kids or Academics page, links to the demo, enquiry and contact
       pages carry ?branch= so those forms only show that programme. */
    function carryBranch() {
        const b = currentBranch();
        if (b !== 'kids' && b !== 'academics') return;
        const page = pageName();
        if (['demo', 'enrollment', 'contact'].includes(page)) return;
        $$('a[href]').forEach(a => {
            const h = a.getAttribute('href');
            const m = /^(demo|enrollment|contact)(\.html)?(\?[^#]*)?(#.*)?$/.exec(h || '');
            if (!m) return;
            const q = new URLSearchParams((m[3] || '').slice(1));
            if (q.has('branch') || q.has('course') || q.has('id')) return;
            q.set('branch', b);
            a.setAttribute('href', m[1] + '?' + q.toString() + (m[4] || ''));
        });
    }
    window.LB_carryBranch = carryBranch;

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
    /* Some courses have no bespoke artwork: fall back to a branded
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

    /* The "add to enquiry" link is nofollow: enrollment?id=N is a noindex
       form page, and one crawlable variant per course only adds noise to
       Search Console's "Excluded by noindex" list. */
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
            <a class="course-enrol" href="enrollment?id=${c.id}" rel="nofollow" title="Add to enquiry" aria-label="Add ${c.name} to enquiry">
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

        /* Coming from a Kids or Academics page: offer only that programme. */
        const lock = new URLSearchParams(location.search).get('branch');
        const interestSel = $('#cinterest', form);
        if (interestSel && (lock === 'kids' || lock === 'academics')) {
            const keep = lock === 'kids' ? 'Learning Bubble for Kids' : 'Learning Bubble Academics';
            Array.from(interestSel.options).forEach(o => { if (o.text !== keep) o.remove(); });
            interestSel.value = keep;
            root.setAttribute('data-branch', lock);
        }

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
            <tr><td style="padding:6px 0"><strong>Interested in</strong></td><td>${esc(interest || 'Not specified')}</td></tr>
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

            const fields = { 'Name': name, 'Email': email, 'Phone / WhatsApp': phone, 'Interested in': interest || 'Not sure yet', 'Subject': subject, 'Message': message, 'Page': location.href };
            sendLead({ subject: `Contact: ${subject}: ${name}`, replyTo: email, fields })
                .then(() => {
                    toast('Thank you! Your message is on its way. We usually reply within a day.', 'success');
                    track('generate_lead', { form: 'contact', subject: subject, interest: interest || 'not set' });
                    form.reset();
                })
                .catch(err => {
                    console.error(err);
                    waFallback(leadText('Hi Learning Bubble! I sent a message on your website:', fields));
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
       PAGE CONTEXT, WHATSAPP LINKS, ANNOUNCEMENT BAR, MOBILE CTA
       ============================================================ */
    function pageName() {
        const f = (location.pathname.split('/').pop() || 'index').toLowerCase();
        return f.replace(/\.html$/, '') || 'index';
    }

    /* Anchors marked data-demo-wa / data-wa get a real WhatsApp link.
       demo.js (loaded only on the demo page) overrides data-demo-wa with its
       own message; everywhere else: notably the six guide pages, whose CTA
       used to point at "#": this fills the link in. */
    function initWaLinks() {
        $$('a[data-demo-wa], a[data-wa]').forEach(a => {
            const href = a.getAttribute('href');
            if (href && href !== '#') return;
            const msg = a.dataset.wa || (pageName() === 'workshops'
                ? 'Hi Learning Bubble! Please let me know when your next free workshop opens.'
                : 'Hi Learning Bubble! I would like to book a free demo class.');
            a.href = waLink(msg);
        });
    }

    /* Free-workshops announcement bar. Sits just under the fixed header, scrolls
       away with the page, can be dismissed, and retires itself after the last
       workshop day. The October 2026 workshops have ended, so it is switched off. */
    const WORKSHOPS_END = Date.UTC(2026, 9, 25, 8, 0, 0);
    const ANN_KEY = 'lb-ann-workshops-2026-10';

    function initAnnounce() {
        const page = pageName();
        if (['workshops', 'enrollment', 'demo', 'contact', '404', 'course-detail'].includes(page)) return;
        if (Date.now() >= WORKSHOPS_END) return;
        if (currentBranch() === 'academics') return; /* kids workshops are not shown on Academics pages */
        try { if (localStorage.getItem(ANN_KEY) === '1') return; } catch (e) { }
        const header = $('#siteHeader');
        if (!header || $('.announce')) return;

        const bar = document.createElement('div');
        bar.className = 'announce';
        bar.setAttribute('role', 'region');
        bar.setAttribute('aria-label', 'Announcement');
        bar.innerHTML = `
      <a class="announce-link" href="workshops">
        <span class="announce-badge">Free</span>
        <span class="announce-text"><strong>Free kids workshops on Zoom</strong>
          <span class="announce-dates">· StoryCraft 24 Oct · AI Explorers 25 Oct</span></span>
        <span class="announce-go">Register <i class="fas fa-arrow-right" aria-hidden="true"></i></span>
      </a>
      <button type="button" class="announce-x" aria-label="Dismiss announcement"><i class="fas fa-xmark" aria-hidden="true"></i></button>`;
        header.after(bar);
        root.classList.add('has-announce');

        $('.announce-x', bar).addEventListener('click', () => {
            bar.remove();
            root.classList.remove('has-announce');
            try { localStorage.setItem(ANN_KEY, '1'); } catch (e) { }
        });
    }

    /* Sticky call-to-action for phones (CSS shows it at <=640px only). */
    function initMobileCta() {
        const page = pageName();
        if (['demo', 'enrollment', 'contact', '404', 'course-detail'].includes(page)) return;
        if ($('.mobile-cta')) return;
        const isWs = page === 'workshops' || page === 'blog-free-online-workshops-for-kids-pakistan' || page.indexOf('workshop-') === 0;
        const bar = document.createElement('div');
        bar.className = 'mobile-cta';
        bar.innerHTML = `
      <a class="btn btn-primary mobile-cta-main" href="demo">
        <i class="fas fa-video" aria-hidden="true"></i> Book a free demo
      </a>
      <a class="btn btn-wa mobile-cta-wa" href="${isWs ? waLink('Hi Learning Bubble! Please let me know when your next free workshop opens.') : waLink()}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <i class="fab fa-whatsapp" aria-hidden="true"></i>
      </a>`;
        document.body.appendChild(bar);
        root.classList.add('has-mcta');

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                bar.classList.toggle('is-on', window.scrollY > 400);
                ticking = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ============================================================
       REVIEWS
       Any element with data-reviews="all" | "kids" | "academics" |
       "<course slug>" becomes a reviews section: approved reviews
       from reviews-data.js, a "Write a review" form (sent to our
       inbox for checking, never published automatically) and, when
       CFG.googleReviewUrl is set, a "Review us on Google" button.
       ============================================================ */
    function initReviews() {
        const hosts = $$('[data-reviews]');
        if (!hosts.length) return;
        const escH = s => String(s == null ? '' : s).replace(/[<>&"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[m]));
        const stars = n => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
        const allCourses = (window.LB && LB.courses) || [];
        const courseBySlug = slug => allCourses.find(c => c.slug === slug) || null;

        hosts.forEach((host, hi) => {
            const scope = host.dataset.reviews || 'all';
            const course = courseBySlug(scope);
            const branch = course ? course.branch : (scope === 'kids' || scope === 'academics' ? scope : 'all');
            const pool = branch === 'all' ? allCourses : allCourses.filter(c => c.branch === branch);
            const opts = pool.map(c => `<option value="${escH(c.name)}"${course && c.slug === course.slug ? ' selected' : ''}>${escH(c.name)}</option>`).join('');
            const wsOpts = branch === 'academics' ? '' : '<option>Free workshop: StoryCraft</option><option>Free workshop: AI Explorers</option>';
            const id = 'rv' + hi;
            const gBtn = CFG.googleReviewUrl
                ? `<a class="btn btn-outline" href="${escH(CFG.googleReviewUrl)}" target="_blank" rel="noopener" data-rv-google><i class="fab fa-google" aria-hidden="true"></i> Review us on Google</a>` : '';
            host.innerHTML = `
            <div class="container">
                <div class="section-head section-head--center">
                    <span class="eyebrow"><i class="fas fa-star" aria-hidden="true"></i> Reviews</span>
                    <h2>${course ? 'Reviews of ' + escH(course.name) : 'Parent and student reviews'}</h2>
                    <p class="rv-summary">Took a course, a demo class or a free workshop with us? Your honest review helps other families choose.</p>
                </div>
                <div class="grid grid-3 rv-list" hidden></div>
                <div class="rv-actions">
                    <button type="button" class="btn btn-primary" data-rv-open aria-expanded="false" aria-controls="${id}Form"><i class="fas fa-pen" aria-hidden="true"></i> Write a review</button>
                    ${gBtn}
                </div>
                <form class="form-card rv-form" id="${id}Form" novalidate hidden>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="${id}Name">Your name <span class="req">*</span></label>
                            <input type="text" id="${id}Name" name="name" autocomplete="name" placeholder="e.g. Ayesha Khan" required maxlength="60">
                        </div>
                        <div class="form-group">
                            <label for="${id}Role">You are <span class="req">*</span></label>
                            <select id="${id}Role" name="role" required>
                                <option value="">Choose…</option><option>Parent</option><option>Student</option>
                            </select>
                        </div>
                        <div class="form-group full">
                            <label for="${id}Course">Course or workshop <span class="req">*</span></label>
                            <select id="${id}Course" name="course" required>
                                <option value="">Choose…</option>${opts}${wsOpts}<option>Free demo class</option><option>Other</option>
                            </select>
                        </div>
                        <div class="form-group full">
                            <span class="rv-label" id="${id}RateLbl">Your rating <span class="req">*</span></span>
                            <div class="rv-rate" role="radiogroup" aria-labelledby="${id}RateLbl">
                                ${[5, 4, 3, 2, 1].map(n => `<input type="radio" id="${id}R${n}" name="rating" value="${n}"><label for="${id}R${n}" title="${n} star${n > 1 ? 's' : ''}">★<span class="sr-only">${n} star${n > 1 ? 's' : ''}</span></label>`).join('')}
                            </div>
                        </div>
                        <div class="form-group full">
                            <label for="${id}Text">Your review <span class="req">*</span></label>
                            <textarea id="${id}Text" name="review" required minlength="20" maxlength="800" placeholder="What did you or your child enjoy? What changed?"></textarea>
                        </div>
                        <div class="form-group full">
                            <label for="${id}Email">Email (optional, never shown)</label>
                            <input type="email" id="${id}Email" name="email" autocomplete="email" placeholder="you@example.com">
                        </div>
                        <div class="form-group full rv-consent">
                            <label><input type="checkbox" name="consent" required> I agree that Learning Bubble may publish this review on its website with my first name and the course. <span class="req">*</span></label>
                        </div>
                        <input type="text" name="_honey" class="rv-hp" tabindex="-1" autocomplete="off" aria-hidden="true">
                    </div>
                    <p class="rv-note">Every review is read by our team before it appears here.</p>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane" aria-hidden="true"></i> Send review</button>
                </form>
            </div>`;

            const form = $('.rv-form', host);
            const openBtn = $('[data-rv-open]', host);
            openBtn.addEventListener('click', () => {
                const show = form.hidden;
                form.hidden = !show;
                openBtn.setAttribute('aria-expanded', String(show));
                if (show) $('input[name="name"]', form).focus();
                track('review_form_open', { scope: scope });
            });
            const g = $('[data-rv-google]', host);
            if (g) g.addEventListener('click', () => track('review_google_click', { scope: scope }));

            const F = n => form.elements.namedItem(n);
            form.addEventListener('submit', e => {
                e.preventDefault();
                if (F('_honey') && F('_honey').value) return;
                const rating = (form.querySelector('input[name="rating"]:checked') || {}).value;
                const text = F('review').value.trim();
                let msg = '';
                if (!F('name').value.trim()) msg = 'Please add your name.';
                else if (!F('role').value) msg = 'Please choose parent or student.';
                else if (!F('course').value) msg = 'Please choose the course or workshop.';
                else if (!rating) msg = 'Please choose a star rating.';
                else if (text.length < 20) msg = 'Please write at least a sentence or two (20 characters).';
                else if (!F('consent').checked) msg = 'Please tick the box so we can publish your review.';
                else if (F('email').value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(F('email').value)) msg = 'Please check your email address.';
                if (msg) { toast(msg, 'error'); return; }

                const fields = {
                    'Name': F('name').value.trim(), 'Role': F('role').value, 'Course': F('course').value,
                    'Rating': stars(Number(rating)) + ' (' + rating + '/5)', 'Review': text,
                    'Email': F('email').value.trim(), 'Permission to publish': 'Yes', 'Page': location.href
                };
                const btn = $('button[type="submit"]', form);
                btn.disabled = true;
                sendLead({ subject: 'New website review (' + rating + '/5): ' + F('course').value, replyTo: fields.Email || undefined, fields: fields })
                    .then(() => {
                        form.innerHTML = '<p class="rv-thanks"><i class="fas fa-circle-check" aria-hidden="true"></i> <strong>Thank you!</strong> We read every review and publish it here once it has been checked.</p>';
                        track('review_submit', { scope: scope, rating: Number(rating) });
                    })
                    .catch(() => { btn.disabled = false; waFallback(leadText('New review for Learning Bubble', fields)); });
            });
        });

        const paint = () => {
            const all = Array.isArray(window.LB_REVIEWS) ? window.LB_REVIEWS : [];
            hosts.forEach(host => {
                const scope = host.dataset.reviews || 'all';
                const course = courseBySlug(scope);
                let list;
                if (course) {
                    list = all.filter(r => r.course === course.slug);
                    if (list.length < 3) list = list.concat(all.filter(r => r.course !== course.slug && r.branch === course.branch));
                } else if (scope === 'kids' || scope === 'academics') {
                    list = all.filter(r => r.branch === scope);
                } else list = all.slice();
                list = list.slice(0, 6);
                const box = $('.rv-list', host);
                if (!box || !list.length) return;
                box.innerHTML = list.map(r => {
                    const c = courseBySlug(r.course);
                    const n = Math.max(1, Math.min(5, Number(r.rating) || 5));
                    const initials = String(r.name || '?').split(/\s+/).map(w => w[0] || '').join('').slice(0, 2).toUpperCase();
                    return `<div class="quote">
                        <div class="quote-stars" aria-label="${n} out of 5 stars">${stars(n)}</div>
                        <p>“${escH(r.text)}”</p>
                        <div class="quote-by">
                            <span class="quote-av">${escH(initials)}</span>
                            <div><strong>${escH(r.name)}</strong><span>${escH([r.role, c ? c.name : r.course].filter(Boolean).join(' · '))}</span></div>
                        </div>
                    </div>`;
                }).join('');
                box.hidden = false;
                const avg = list.reduce((a, r) => a + (Number(r.rating) || 0), 0) / list.length;
                const sum = $('.rv-summary', host);
                if (sum) sum.textContent = `${avg.toFixed(1)} out of 5 from ${list.length} review${list.length > 1 ? 's' : ''} by Learning Bubble families. Add yours below.`;
            });
        };
        if (Array.isArray(window.LB_REVIEWS)) { paint(); return; }
        const s = document.createElement('script');
        s.src = 'reviews-data.js';
        s.defer = true;
        s.onload = paint;
        document.head.appendChild(s);
    }

    /* ============================================================
       BOOT
       ============================================================ */
    function boot() {
        cleanBranchHomes();
        initBranch();
        initTheme();
        initHeader();
        renderFooter();
        renderFabs();
        initAnnounce();
        initMobileCta();
        initWaLinks();
        initSearch();
        fillDynamic();
        initFaq();
        initCarousels();
        initCounters();
        initBubbles();
        initContactForm();
        initReviews();
        initReveal();
        initTracking();
        carryBranch();
        setTimeout(carryBranch, 900);
        watchLinks();
        root.classList.remove('fouc-prevent');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
