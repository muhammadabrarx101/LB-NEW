export async function onRequestPost(context) {
    try {
        // Parse the incoming JSON payload from the frontend
        const data = await context.request.json();
        const { subject, replyTo, html } = data;

        // Retrieve the Resend API Key from Cloudflare Environment Variables
        const API_KEY = context.env.RESEND_API_KEY;

        if (!API_KEY) {
            return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY environment variable" }), { status: 500 });
        }

        // Call the Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                from: 'Learning Bubble <info@learningbubble.org>',
                to: 'learningbubblepk@gmail.com',
                reply_to: replyTo,
                subject: subject,
                html: html
            })
        });

        const result = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ error: result }), { status: response.status });
        }

        return new Response(JSON.stringify({ success: true, data: result }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
