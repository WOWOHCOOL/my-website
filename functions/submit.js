/**
 * Cloudflare Pages Function — Form Submission Proxy
 *
 * Proxies form submissions to Web3Forms so the access_key
 * stays server-side and is not exposed in HTML source.
 *
 * Both German and English site forms POST here. The function
 * forwards all fields, appends the API key, and passes the
 * redirect response back to the browser.
 */
export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const formData = await request.formData();
    formData.append('access_key', '7f077cf3-642b-4aba-9be2-cb99c0c65b19');

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        redirect: 'manual'
    });

    // Web3Forms responds with a 301/302 redirect to the thank-you page
    if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (location) {
            return Response.redirect(location, 302);
        }
    }

    // Fallback: return whatever Web3Forms returned
    const text = await response.text();
    return new Response(text, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
    });
}
