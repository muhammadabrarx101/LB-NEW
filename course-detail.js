/* ============================================================
   LEARNING BUBBLE — Legacy course-detail redirect
   ------------------------------------------------------------
   This URL only exists for old links / bookmarks (?id=N). It is
   marked noindex and forwards straight to the real static course
   page (its own title, meta, canonical and Course schema live
   there — that is the page Google should index). No content is
   rendered or duplicated here.
   ============================================================ */
(function () {
    'use strict';

    const id = new URLSearchParams(location.search).get('id');
    const course = (typeof LB !== 'undefined') ? LB.course(id) : null;

    const target = (course && course.slug)
        ? '/' + course.slug
        : (course ? `/courses?branch=${course.branch}` : '/courses?branch=kids');

    location.replace(target);

    const host = document.getElementById('courseDetail');
    if (host) {
        host.innerHTML = `
      <div class="container section">
        <div class="empty-state">
          <i class="fas fa-compass"></i>
          <h3>Taking you to the course page…</h3>
          <p>If you are not redirected automatically, continue below.</p>
          <div class="row" style="justify-content:center;margin-top:1.5rem">
            <a class="btn btn-primary" href="${target}">Continue</a>
          </div>
        </div>
      </div>`;
    }
})();
