/* ============================================================
   Vercel Edge Function — POST /api/send-email
   ------------------------------------------------------------
   Mirrors functions/api/send-email.js (Cloudflare Pages), so the
   same front-end fetch('/api/send-email') works on either host.

   Required environment variable:
     RESEND_API_KEY   — from https://resend.com

   Optional:
     MAIL_FROM        — default "Learning Bubble <info@learningbubble.org>"
     MAIL_TO          — default "learningbubblepk@gmail.com"
   ============================================================ */

export const config = { runtime: 'edge' };

const json = (body, status) =>
    new Response(JSON.stringify(body), {
        status: status || 200,
        headers: { 'Content-Type': 'application/json' }
    });

export default async function handler(request) {
    if (request.method !== 'POST') {
        return json({ error: 'Method not allowed' }, 405);
    }

    try {
        const { subject, replyTo, html } = await request.json();

        if (!subject || !html) {
            return json({ error: 'subject and html are required' }, 400);
        }

        const API_KEY = process.env.RESEND_API_KEY;
        if (!API_KEY) {
            return json({ error: 'Missing RESEND_API_KEY environment variable' }, 500);
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                from: process.env.MAIL_FROM || 'Learning Bubble <info@learningbubble.org>',
                to: process.env.MAIL_TO || 'learningbubblepk@gmail.com',
                reply_to: replyTo,
                subject,
                html
            })
        });

        const result = await res.json();
        if (!res.ok) return json({ error: result }, res.status);

        return json({ success: true, data: result });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
