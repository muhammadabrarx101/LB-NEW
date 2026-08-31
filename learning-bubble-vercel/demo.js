/* ============================================================
   LEARNING BUBBLE — Free demo class booking
   ------------------------------------------------------------
   Picking a programme retints the page, swaps the liquid palette
   and repopulates the course list, so the form always reflects
   the brand the visitor is actually booking with.
   ============================================================ */
(function () {
    'use strict';

    const $ = (s, c) => (c || document).querySelector(s);
    const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

    const form = $('#demoForm');
    if (!form) return;

    const WA = (window.LB_CFG || {}).whatsapp || '923212481610';
    const head = $('#demoHead');
    const courseSel = $('#course');
    const successModal = $('#successModal');
    const successBody = $('#successBody');

    /* ---------- programme selection drives the whole page ---------- */
    function applyBranch(branch) {
        const b = (branch === 'kids' || branch === 'academics') ? branch : 'hub';

        document.documentElement.setAttribute('data-branch', b);
        document.body.dataset.branch = b;
        if (head) head.dataset.liquid = b === 'hub' ? 'blend' : b;

        const sub = $('#brandSub');
        if (sub) sub.textContent = b === 'kids' ? 'for Kids' : b === 'academics' ? 'Academics' : 'Free demo';

        $$('[data-demo-wa]').forEach(a => {
            if (window.LB_demoWaLink) a.href = window.LB_demoWaLink(b === 'hub' ? '' : b);
        });

        populateCourses(b);
    }

    function populateCourses(branch) {
        if (!courseSel) return;

        if (branch === 'hub') {
            courseSel.innerHTML = '<option value="">Pick a programme above first</option>';
            return;
        }

        const keep = courseSel.value;
        const cats = LB.categoriesFor(branch);
        const label = branch === 'kids' ? 'Not sure yet — help me choose' : 'Not sure yet — advise me';

        courseSel.innerHTML =
            `<option value="">${label}</option>` +
            cats.map(cat => {
                const list = LB.byBranch(branch).filter(c => c.category === cat.name);
                if (!list.length) return '';
                return `<optgroup label="${cat.name}">` +
                    list.map(c => `<option value="${c.name}">${c.name}</option>`).join('') +
                    '</optgroup>';
            }).join('');

        if (keep && $$('option', courseSel).some(o => o.value === keep)) courseSel.value = keep;
    }

    $$('input[name="branch"]').forEach(radio => {
        radio.addEventListener('change', () => {
            applyBranch(radio.value);
            setError('branch', '');
        });
    });

    /* ---------- prefill from the URL ---------- */
    const params = new URLSearchParams(location.search);
    const urlBranch = params.get('branch');
    const urlCourseId = params.get('course');

    let startBranch = (urlBranch === 'kids' || urlBranch === 'academics') ? urlBranch : null;

    if (urlCourseId) {
        const c = LB.course(urlCourseId);
        if (c) startBranch = c.branch;
    }

    if (startBranch) {
        const radio = $(`input[name="branch"][value="${startBranch}"]`);
        if (radio) radio.checked = true;
        applyBranch(startBranch);
        if (urlCourseId) {
            const c = LB.course(urlCourseId);
            if (c && courseSel) courseSel.value = c.name;
        }
    } else {
        applyBranch('hub');
    }

    /* ---------- time zone ---------- */
    const tzField = $('#timezone');
    if (tzField) {
        try {
            tzField.value = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        } catch (e) { /* leave blank */ }
        if (!tzField.value) tzField.placeholder = 'e.g. Asia/Karachi';
    }

    /* ---------- validation ---------- */
    const RULES = {
        branch: () => !!$('input[name="branch"]:checked') || 'Please choose a programme.',
        name: v => v.trim().length >= 2 || 'Please enter the student’s name.',
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
            let value = '';
            if (field === 'branch') value = '';
            else if (input && input.type === 'checkbox') value = input.checked ? 'on' : '';
            else if (input) value = input.value;

            const result = RULES[field](value);
            if (result === true) setError(field, '');
            else { setError(field, result); ok = false; }
        });
        return ok;
    }

    form.addEventListener('input', e => {
        if (RULES[e.target.name]) setError(e.target.name, '');
    });

    /* ---------- submit ---------- */
    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/[<>&"]/g, m => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[m]));
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

        if (!validate()) {
            window.LB_toast('Please check the highlighted fields.', 'error');
            const bad = $('.has-error input, .has-error select', form) || $('.has-error', form);
            if (bad && bad.focus) bad.focus();
            if (bad && bad.scrollIntoView) bad.scrollIntoView({ block: 'center', behavior: 'smooth' });
            return;
        }

        const d = new FormData(form);
        const v = k => (d.get(k) || '').toString().trim();
        const many = k => d.getAll(k).map(String).filter(Boolean);

        const branch = v('branch');
        const branchName = LB.branches[branch] ? LB.branches[branch].name : 'Learning Bubble';
        const name = v('name'), email = v('email'), phone = v('phone');
        const age = v('age'), parentName = v('parentName'), course = v('course');
        const timezone = v('timezone'), message = v('message');
        const days = many('days'), times = many('times');

        const waPhone = normalisePhone(phone) || WA;
        const waText = `Hi ${name}! 👋

Thanks for requesting a free demo class with Learning Bubble${course ? ` for ${course}` : ''}.

Here are the slots we can offer:
`;

        const row = (k, val) => val
            ? `<tr><td style="padding:6px 0;width:170px"><strong>${k}</strong></td><td>${esc(val)}</td></tr>` : '';

        const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#222;margin:0">
      <div style="background:linear-gradient(135deg,#1c2f72,#0ea5a4);color:#fff;padding:24px;text-align:center">
        <h1 style="margin:0;font-size:20px">Free Demo Class Request</h1>
        <p style="margin:6px 0 0;font-size:13px;opacity:.85">${esc(branchName)}</p>
      </div>
      <div style="padding:24px">
        <h3 style="color:#1c2f72;font-size:15px;margin:0 0 10px">Student</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row('Name', name)}
          ${row('Email', email)}
          ${row('WhatsApp', phone)}
          ${row('Age / grade', age)}
          ${row('Parent / guardian', parentName)}
        </table>

        <h3 style="color:#1c2f72;font-size:15px;margin:24px 0 10px">Demo</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${row('Programme', branchName)}
          ${row('Course / subject', course || 'Not decided yet')}
          ${row('Preferred days', days.join(', '))}
          ${row('Preferred times', times.join(', '))}
          ${row('Time zone', timezone)}
        </table>

        ${message ? `<h3 style="color:#1c2f72;font-size:15px;margin:24px 0 10px">Notes</h3>
        <div style="background:#f6f7fb;padding:14px;border-radius:8px;font-size:14px;line-height:1.6">
          ${esc(message).replace(/\n/g, '<br>')}
        </div>` : ''}

        <a href="https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}"
           style="display:inline-block;margin-top:24px;background:#25d366;color:#fff;padding:14px 22px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px">
          Send ${esc(name)} demo slots on WhatsApp
        </a>
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
                subject: `Demo request: ${course || branchName} — ${name}`,
                replyTo: email,
                html
            })
        })
            .then(async res => {
                if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
                showSuccess(name, phone);
                form.reset();
                applyBranch('hub');
            })
            .catch(err => {
                console.error(err);
                window.LB_toast('We could not send that. Please book on WhatsApp instead.', 'error');
            })
            .finally(() => { btn.disabled = false; btn.innerHTML = label; });
    });

    function showSuccess(name, phone) {
        successBody.innerHTML = `
      <div class="success-ico"><i class="fas fa-video"></i></div>
      <h2 style="font-size:1.5rem">Demo requested, ${esc(name.split(' ')[0])}</h2>
      <p style="margin-top:.75rem">We will message you on WhatsApp at <strong>${esc(phone)}</strong>
        with two or three slots that fit your timings — usually within a few hours.</p>
      <div class="stack" style="margin-top:1.75rem">
        <a class="btn btn-wa btn-block" target="_blank" rel="noopener"
           href="https://wa.me/${WA}?text=${encodeURIComponent('Hi Learning Bubble! I just requested a free demo class through the website.')}">
          <i class="fab fa-whatsapp"></i> Message us now
        </a>
        <a class="btn btn-outline btn-block" href="index.html">Back to the homepage</a>
      </div>`;
        successModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeSuccess() {
        successModal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    successModal.addEventListener('click', e => {
        if (e.target === successModal || e.target.closest('[data-close]')) closeSuccess();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && successModal.classList.contains('is-open')) closeSuccess();
    });
})();
