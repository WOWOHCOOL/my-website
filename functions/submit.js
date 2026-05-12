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

    const formData = await request.formData();
    const redirectUrl = formData.get('redirect') || '/';

    // Save the redirect and remove it from outgoing data —
    // Web3Forms returns a 302 if redirect is present, but we
    // need JSON so we can check success before redirecting ourselves.
    formData.delete('redirect');

    // Add access_key server-side only
    formData.append('access_key', '7f077cf3-642b-4aba-9be2-cb99c0c65b19');

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
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
