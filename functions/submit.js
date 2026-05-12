/**
 * Cloudflare Pages Function — Form Submission Proxy
 *
 * Receives form POSTs from the site, forwards to Web3Forms API
 * with the access_key appended server-side, then redirects the
 * browser to the thank-you page on success.
 */
export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    const bodyText = await request.text();

    // Strip the redirect param so Web3Forms returns JSON, not a 302
    const params = new URLSearchParams(bodyText);
    const redirectUrl = params.get('redirect') || '/';
    params.delete('redirect');
    params.append('access_key', '7f077cf3-642b-4aba-9be2-cb99c0c65b19');

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });

    const result = await response.json();

    if (result.success) {
        return Response.redirect(redirectUrl, 302);
    }

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
