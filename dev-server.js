const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.xml': 'application/xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
};

function serve(res, filePath) {
    const ext = path.extname(filePath);
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
}

http.createServer((req, res) => {
    let url = req.url.split('?')[0].split('#')[0];

    // Decode URL-encoded characters (e.g. %C3%A4 → ä)
    url = decodeURIComponent(url);

    // Directory traversal protection
    url = path.normalize(url).replace(/^(\.\.[/\\])+/, '');
    let filePath = path.join(ROOT, url);

    try {
        if (fs.statSync(filePath).isFile())
            return serve(res, filePath);
    } catch { /* not found */ }

    // Try with .html extension
    let htmlPath = filePath + '.html';
    try {
        if (fs.statSync(htmlPath).isFile())
            return serve(res, htmlPath);
    } catch { /* not found */ }

    // Try index.html in directory
    let indexPath = path.join(filePath, 'index.html');
    try {
        if (fs.statSync(indexPath).isFile())
            return serve(res, indexPath);
    } catch { /* not found */ }

    // 404 fallback
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('404 Not Found');
}).listen(PORT, () => {
    console.log(`Dev server: http://localhost:${PORT}`);
});
