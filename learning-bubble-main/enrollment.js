/* ============================================================
   LEARNING BUBBLE — Enquiry / enrolment
   ------------------------------------------------------------
   Multi-course enquiry list + form. No pricing anywhere:
   fees are quoted personally over WhatsApp afterwards.
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const form = $('#enquiryForm');
    if (!form) return;

    const CART_KEY = 'lb-enquiry-cart';
    const WA = (window.LB_CFG || {}).whatsapp || '923212481610';

    const els = {
        items: $('#cartItems'),
        count: $('#cartCount'),
        addMore: $('#addMore'),
        modal: $('#pickModal'),
        pickGrid: $('#pickGrid'),
        pickSearch: $('#pickSearch'),
        pickCat: $('#pickCat'),
        success: $('#successModal'),
        successBody: $('#successBody')
    };

    /* small square thumbnail, with a gradient stand-in when a course
       has no artwork of its own */
    function thumb(c, size) {
        if (c.image) {
            return `<img src="${c.image}" alt="" loading="lazy" width="${size}" height="${size}"
                         style="width:${size}px;height:${size}px;object-fit:cover;flex-shrink:0"
                         onerror="this.src='assets/images/logo.png';this.style.objectFit='contain'">`;
        }
        return `<span style="width:${size}px;height:${size}px;flex-shrink:0;display:grid;place-items:center;
                     border-radius:var(--r-xs);background:var(--grad);color:#fff;font-size:${Math.round(size / 2.6)}px">
                  <i class="fas ${c.icon || 'fa-book'}" aria-hidden="true"></i>
                </span>`;
    }

    /* ---------- cart state ---------- */
    let cart = [];
    let pickBranch = (window.LB_branch ? window.LB_branch.remembered() : 'kids');

    function loadCart() {
        try {
            const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            cart = raw.map(id => LB.course(id)).filter(Boolean);
        } catch (e) { cart = []; }
    }

    function saveCart() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart.map(c => c.id))); } catch (e) { /* noop */ }
    }

    function addCourse(id, quiet) {
        const c = LB.course(id);
        if (!c) return;
        if (cart.some(x => x.id === c.id)) {
            if (!quiet) window.LB_toast(`${c.name} is already on your list.`, 'info');
            return;
        }
        cart.push(c);
        saveCart();
        renderCart();
        renderPicker();
        if (!quiet) window.LB_toast(`Added “${c.name}” to your enquiry.`, 'success');
    }

    function removeCourse(id) {
        cart = cart.filter(c => c.id !== Number(id));
        saveCart();
        renderCart();
        renderPicker();
    }

    /* ---------- cart UI ---------- */
    function renderCart() {
        els.count.textContent = cart.length;

        if (!cart.length) {
            els.items.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-inbox"></i>
          <p>Your enquiry list is empty.</p>
          <p style="margin-top:.35rem">Add a course to get started.</p>
        </div>`;
            return;
        }

        els.items.innerHTML = cart.map(c => `
      <div class="cart-item">
        ${thumb(c, 46)}
        <div class="cart-item-body">
          <strong>${c.name}</strong>
          <span>${c.category}${c.ages ? ' · ' + c.ages : ''}</span>
        </div>
        <button type="button" class="cart-remove" data-remove="${c.id}"
                aria-label="Remove ${c.name}"><i class="fas fa-xmark"></i></button>
      </div>`).join('');
    }

    els.items.addEventListener('click', e => {
        const btn = e.target.closest('[data-remove]');
        if (btn) removeCourse(btn.dataset.remove);
    });

    /* ---------- course picker modal ---------- */
    function renderPickerCats() {
        els.pickCat.innerHTML = `<option value="all">All categories</option>` +
            LB.categoriesFor(pickBranch).map(c => `<option value="${c.name}">${c.short}</option>`).join('');
    }

    function renderPicker() {
        if (!els.pickGrid) return;
        const q = (els.pickSearch.value || '').trim().toLowerCase();
        const cat = els.pickCat.value || 'all';

        const list = LB.byBranch(pickBranch).filter(c => {
            if (cat !== 'all' && c.category !== cat) return false;
            if (!q) return true;
            return (c.name + ' ' + c.category + ' ' + (c.tagline || '')).toLowerCase().includes(q);
        });

        if (!list.length) {
            els.pickGrid.innerHTML = `<p class="search-empty">No courses matched. Try a different search.</p>`;
            return;
        }

        els.pickGrid.innerHTML = list.map(c => {
            const inCart = cart.some(x => x.id === c.id);
            return `
        <button type="button" class="pick${inCart ? ' is-in' : ''}" data-add="${c.id}" ${inCart ? 'disabled' : ''}>
          ${thumb(c, 44)}
          <span class="pick-body">
            <strong>${c.name}</strong>
            <span>${c.category}${c.ages ? ' · ' + c.ages : ''}</span>
          </span>
          <span class="pick-add"><i class="fas ${inCart ? 'fa-check' : 'fa-plus'}"></i></span>
        </button>`;
        }).join('');
    }

    function openModal(m) { m.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeModal(m) { m.classList.remove('is-open'); document.body.style.overflow = ''; }

    if (els.addMore) {
        els.addMore.addEventListener('click', () => { renderPicker(); openModal(els.modal); });
    }

    els.modal.addEventListener('click', e => {
        if (e.target === els.modal || e.target.closest('[data-close]')) { closeModal(els.modal); return; }
        const add = e.target.closest('[data-add]');
        if (add) addCourse(Number(add.dataset.add));
    });

    els.pickSearch.addEventListener('input', renderPicker);
    els.pickCat.addEventListener('change', renderPicker);

    $$('[data-pick-branch]').forEach(btn => {
        btn.addEventListener('click', () => {
            pickBranch = btn.dataset.pickBranch;
            $$('[data-pick-branch]').forEach(b => b.classList.toggle('is-on', b === btn));
            renderPickerCats();
            renderPicker();
        });
        btn.classList.toggle('is-on', btn.dataset.pickBranch === pickBranch);
    });

    document.addEventListener('keydown', e => {
        if (e.key !== 'Escape') return;
        if (els.modal.classList.contains('is-open')) closeModal(els.modal);
        if (els.success.classList.contains('is-open')) closeModal(els.success);
    });

    els.success.addEventListener('click', e => {
        if (e.target === els.success || e.target.closest('[data-close]')) closeModal(els.success);
    });

    /* ---------- validation ---------- */
    const RULES = {
        name: v => v.trim().length >= 2 || 'Please enter the student’s full name.',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
        phone: v => v.replace(/[^0-9]/g, '').length >= 10 || 'Please enter a valid WhatsApp number.',
        terms: v => v === 'on' || 'Please confirm before submitting.'
    };

    function setError(field, message) {
        const group = form.querySelector(`[data-field="${field}"]`);
        if (!group) return;
        group.classList.toggle('has-error', !!message);
        const span = $('.field-error', group);
        if (span && message) span.textContent = message;
    }

    function validate() {
        let ok = true;
        Object.keys(RULES).forEach(field => {
            const input = form.elements[field];
            if (!input) return;
            const value = input.type === 'checkbox' ? (input.checked ? 'on' : '') : input.value;
            const result = RULES[field](value);
            if (result === true) { setError(field, ''); }
            else { setError(field, result); ok = false; }
        });
        return ok;
    }

    form.addEventListener('input', e => {
        const field = e.target.name;
        if (RULES[field]) setError(field, '');
    });

    /* ---------- submit ---------- */
    function esc(s) {
        return String(s == null ? '' : s).replace(/[<>&"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[m]));
    }

    function normalisePhone(raw) {
        let p = String(raw || '').replace(/[^0-9]/g, '');
        if (p.startsWith('0092')) p = p.slice(2);
        else if (p.startsWith('92')) { /* already international */ }
        else if (p.startsWith('0') && p.length === 11) p = '92' + p.slice(1);
        return p;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!cart.length) {
            window.LB_toast('Add at least one course to your enquiry first.', 'error');
            if (els.addMore) els.addMore.focus();
            return;
        }
        if (!validate()) {
            window.LB_toast('Please check the highlighted fields.', 'error');
            const bad = $('.has-error input, .has-error select, .has-error textarea', form);
            if (bad) bad.focus();
            return;
        }

        const d = new FormData(form);
        const v = k => (d.get(k) || '').toString().trim();
        const name = v('name'), email = v('email'), phone = v('phone');
        const studentAge = v('studentAge'), parentName = v('parentName');
        const preferred = v('preferred'), message = v('message');

        const courseNames = cart.map(c => c.name);
        const branches = Array.from(new Set(cart.map(c => LB.branches[c.branch].name)));
        const waPhone = normalisePhone(phone) || WA;

        const waText = `Hi ${name}! 👋

Thanks for your enquiry with Learning Bubble.

You asked about:
${courseNames.map(n => '• ' + n).join('\n')}

Here are the available schedules and fee options:
`;

        const adminHtml = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#222;margin:0">
      <div style="background:linear-gradient(135deg,#1c2f72,#0ea5a4);color:#fff;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:20px">New Course Enquiry</h1>
        <p style="margin:6px 0 0;font-size:13px;opacity:.85">${esc(branches.join(' + '))}</p>
      </div>
      <div style="padding:24px">
        <h3 style="color:#1c2f72;font-size:15px;margin:0 0 10px">Student details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;width:170px"><strong>Name</strong></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:6px 0"><strong>Email</strong></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:6px 0"><strong>WhatsApp</strong></td><td>${esc(phone)}</td></tr>
          ${studentAge ? `<tr><td style="padding:6px 0"><strong>Age / grade</strong></td><td>${esc(studentAge)}</td></tr>` : ''}
          ${parentName ? `<tr><td style="padding:6px 0"><strong>Parent / guardian</strong></td><td>${esc(parentName)}</td></tr>` : ''}
          ${preferred ? `<tr><td style="padding:6px 0"><strong>Preferred timing</strong></td><td>${esc(preferred)}</td></tr>` : ''}
        </table>

        <h3 style="color:#1c2f72;font-size:15px;margin:24px 0 10px">Courses requested (${cart.length})</h3>
        <div style="background:#f6f7fb;border-radius:8px;padding:6px 14px">
          ${cart.map(c => `
            <div style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px">
              <strong>${esc(c.name)}</strong><br>
              <span style="color:#666;font-size:12px">${esc(c.category)} · ${esc(c.duration)}${c.ages ? ' · Ages ' + esc(c.ages) : ''} · ${esc(LB.branches[c.branch].name)}</span>
            </div>`).join('')}
        </div>

        ${message ? `<h3 style="color:#1c2f72;font-size:15px;margin:24px 0 10px">Message</h3>
        <div style="background:#f6f7fb;padding:14px;border-radius:8px;font-size:14px;line-height:1.6">
          ${esc(message).replace(/\n/g, '<br>')}
        </div>` : ''}

        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}"
           style="display:inline-block;margin-top:24px;background:#25d366;color:#fff;padding:14px 22px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px">
          Contact ${esc(name)} on WhatsApp
        </a>
        <p style="font-size:12px;color:#888;margin-top:14px">Opens a chat with the number above, pre-filled with the requested courses.</p>
      </div>
      <div style="background:#f3f4f6;padding:14px;text-align:center;font-size:12px;color:#6b7280">
        Sent from learningbubble.org
      </div>
    </body></html>`;

        const btn = $('button[type="submit"]', form);
        const label = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: `Enquiry: ${courseNames.slice(0, 2).join(', ')}${courseNames.length > 2 ? ` +${courseNames.length - 2} more` : ''} — ${name}`,
                replyTo: email,
                html: adminHtml
            })
        })
            .then(async res => {
                if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
                showSuccess(name, phone);
                cart = [];
                saveCart();
                renderCart();
                form.reset();
            })
            .catch(err => {
                console.error(err);
                window.LB_toast('We could not send that. Please message us on WhatsApp instead.', 'error');
            })
            .finally(() => { btn.disabled = false; btn.innerHTML = label; });
    });

    function showSuccess(name, phone) {
        els.successBody.innerHTML = `
      <div class="success-ico"><i class="fas fa-check"></i></div>
      <h2 style="font-size:1.5rem">Enquiry sent, ${esc(name.split(' ')[0])}</h2>
      <p style="margin-top:.75rem">We have your request and will message you on WhatsApp at
        <strong>${esc(phone)}</strong> with schedules and fees — usually within a few hours.</p>
      <div class="stack" style="margin-top:1.75rem">
        <a class="btn btn-wa btn-block" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi Learning Bubble! I just submitted an enquiry through the website.')}"
           target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Message us now</a>
        <a class="btn btn-outline btn-block" href="courses.html?branch=${pickBranch}">Keep browsing courses</a>
      </div>`;
        openModal(els.success);
    }

    /* ---------- boot ---------- */
    loadCart();

    const preset = new URLSearchParams(location.search).get('id');
    if (preset) {
        const c = LB.course(preset);
        if (c) {
            pickBranch = c.branch;
            document.documentElement.setAttribute('data-branch', c.branch);
            document.body.dataset.branch = c.branch;
            addCourse(Number(preset), true);
            history.replaceState(null, '', location.pathname);
        }
    }

    /* header switch only — the modal's tabs use data-pick-branch and manage themselves */
    $$('.site-header .branch-switch a').forEach(a => a.classList.toggle('is-on', a.dataset.branch === pickBranch));
    $$('[data-pick-branch]').forEach(b => b.classList.toggle('is-on', b.dataset.pickBranch === pickBranch));
    const sub = $('#brandSub');
    if (sub) sub.textContent = pickBranch === 'kids' ? 'for Kids' : 'Academics';

    renderCart();
    renderPickerCats();
    renderPicker();
})();
