export async function onRequest(context) {
    const { request } = context;

    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    // Simplest possible test — just try to fetch Web3Forms
    const formData = new URLSearchParams();
    formData.append('name', 'Test');
    formData.append('email', 'test@wowohcool.com');
    formData.append('message', 'Test submission');
    formData.append('access_key', '7f077cf3-642b-4aba-9be2-cb99c0c65b19');

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
    });

    const text = await response.text();
    return new Response(text, {
        status: response.status,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}
