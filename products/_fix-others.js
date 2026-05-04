const fs = require('fs');

function fixPage(filename) {
  let html = fs.readFileSync(filename, 'utf8');

  // 1. Fix aggregateRating: add bestRating/worstRating
  html = html.replace(
    /"aggregateRating":\s*\{[^}]*"ratingValue":\s*([\d.]+)[^}]*"reviewCount":\s*(\d+)[^}]*\}/g,
    (match, ratingValue, reviewCount) => {
      if (match.includes('bestRating')) return match; // already has it
      return `"aggregateRating": {"@type": "AggregateRating", "ratingValue": ${ratingValue}, "reviewCount": ${reviewCount}, "bestRating": 5, "worstRating": 1}`;
    }
  );

  // 2. Fix manufacturer: string → object
  html = html.replace(
    /"manufacturer":\s*"([^"]+)"/g,
    '"manufacturer": {"@type": "Organization", "name": "$1"}'
  );

  // 3. Fix query-input: old string format → new object format
  html = html.replace(
    /"query-input":\s*"required name=([^"]+)"/,
    (match, name) => {
      return `"query-input": {\n      "@type": "PropertyValueSpecification",\n      "valueRequired": true,\n      "valueName": "${name}"\n    }`;
    }
  );

  fs.writeFileSync(filename, html);
  console.log('DONE: ' + filename);
}

fixPage('gan-charger.html');
fixPage('car-charger.html');

// Verify both
['gan-charger.html', 'car-charger.html'].forEach(f => {
  console.log('\n=== ' + f + ' ===');
  const html = fs.readFileSync(f, 'utf8');
  const matches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  matches.forEach((m, i) => {
    try {
      const p = JSON.parse(m.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '').trim());
      const issues = [];
      if (p['@type'] === 'Product') {
        if (!p.aggregateRating?.bestRating) issues.push('missing bestRating');
        if (typeof p.manufacturer === 'string') issues.push('manufacturer is string');
        if (p.offers && p.offers['@type'] !== 'AggregateOffer') issues.push('wrong offers type');
      }
      if (p['@type'] === 'WebSite') {
        const qi = p.potentialAction?.['query-input'];
        if (typeof qi === 'string') issues.push('query-input is string');
      }
      console.log('  Block ' + (i+1) + ' @type=' + p['@type'] + (issues.length ? ' ⚠️ ' + issues.join(', ') : ' ✓'));
    } catch(e) {
      console.log('  Block ' + (i+1) + ' INVALID');
    }
  });
});
