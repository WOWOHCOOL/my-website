const fs = require('fs');

// 1. power-bank.html: fix query-input
let pb = fs.readFileSync('power-bank.html', 'utf8');
pb = pb.replace(
  /"query-input": "required name=search_term_string"/,
  `"query-input": {\n        "@type": "PropertyValueSpecification",\n        "valueRequired": true,\n        "valueName": "search_term_string"\n      }`
);
fs.writeFileSync('power-bank.html', pb);
console.log('power-bank.html: query-input fixed');

// 2. gan-charger.html: add @id to Product
let gan = fs.readFileSync('gan-charger.html', 'utf8');
gan = gan.replace(
  '"@type": "Product",',
  '"@type": "Product",\n  "@id": "https://www.wowohcool.com/products/gan-charger.html",'
);
fs.writeFileSync('gan-charger.html', gan);
console.log('gan-charger.html: @id added');

// 3. car-charger.html: add @id to Product
let car = fs.readFileSync('car-charger.html', 'utf8');
car = car.replace(
  '"@type": "Product",',
  '"@type": "Product",\n  "@id": "https://www.wowohcool.com/products/car-charger.html",'
);
fs.writeFileSync('car-charger.html', car);
console.log('car-charger.html: @id added');

// Final verification
['wireless-charger.html', 'power-bank.html', 'gan-charger.html', 'car-charger.html'].forEach(f => {
  const h = fs.readFileSync(f, 'utf8');
  const m = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  let allClean = true;
  m.forEach((s, i) => {
    try {
      const p = JSON.parse(s.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '').trim());
      if (p['@type'] === 'Product') {
        if (!p['@id']) { console.log(f + ' Block ' + (i+1) + ': missing @id'); allClean = false; }
        if (!p.aggregateRating?.bestRating) { console.log(f + ' Block ' + (i+1) + ': missing bestRating'); allClean = false; }
        if (typeof p.manufacturer === 'string') { console.log(f + ' Block ' + (i+1) + ': manufacturer is string'); allClean = false; }
      }
      if (p['@type'] === 'WebSite') {
        const qi = p.potentialAction?.['query-input'];
        if (typeof qi === 'string') { console.log(f + ' Block ' + (i+1) + ': query-input is string'); allClean = false; }
      }
    } catch(e) {
      console.log(f + ' Block ' + (i+1) + ': PARSE ERROR');
      allClean = false;
    }
  });
  if (allClean) console.log(f + ': ✅ ALL PASS');
});
