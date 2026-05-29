---
name: deploy-site
description: Build and deploy wowohcool.com to Cloudflare (Eleventy + Tailwind + esbuild)
disable-model-invocation: true
---

# Deploy Site

One-command build and deploy for wowohcool.com.

## Steps

1. Run full build pipeline:
   ```bash
   cd C:\Users\wowoh\wowohcool.com
   npm run build
   ```
   This runs: `eleventy → tailwind (minify) → esbuild (EN/DE/ES)`

2. Verify build output exists:
   ```bash
   ls _site/index.html
   ```

3. Deploy to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy _site
   ```

4. Report deployment URL and status.

## Pre-deploy Checklist
- All three language JS bundles built (main.js, de/js/de-main.js, es/js/es-main.js)
- CSS minified (css/styles.css)
- No build errors in Eleventy output
