/**
 * Cloudflare Pages Function — Form Submission Proxy
 */
export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    // Read the raw POST body as text
    const bodyText = await request.text();

    // Forward to Web3Forms with access_key appended
    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyText + '&access_key=7f077cf3-642b-4aba-9be2-cb99c0c65b19',
        redirect: 'manual'
    });

    // Pass through redirect status and location
    if (response.status >= 301 && response.status <= 308) {
        const location = response.headers.get('location');
        if (location) {
            return new Response(null, {
                status: 302,
                headers: { 'location': location }
            });
        }
    }

    // Fallback: return whatever came back
    const text = await response.text();
    return new Response(text, {
        status: response.status,
        headers: { 'Content-Type': response.headers.get('content-type') || 'text/plain' }
    });
}
