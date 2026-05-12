/**
 * Cloudflare Pages Function — Form Submission Proxy
 *
 * Proxies form submissions to Web3Forms so the access_key
 * stays server-side and is not exposed in HTML source.
 */
export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const formData = await request.formData();

        // Extract redirect URL before modifying the form data
        let redirectUrl = '/';
        const redirectField = formData.get('redirect');
        if (redirectField) {
            redirectUrl = redirectField;
        }

        // Build new form data without the redirect field, adding access_key
        const payload = new FormData();
        for (const [key, value] of formData.entries()) {
            if (key !== 'redirect') {
                payload.append(key, value);
            }
        }
        payload.append('access_key', '7f077cf3-642b-4aba-9be2-cb99c0c65b19');

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: payload
        });

        const result = await response.json();

        if (result.success) {
            return Response.redirect(redirectUrl, 302);
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(err.message, { status: 500 });
    }
}
