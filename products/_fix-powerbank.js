const fs = require('fs');
let html = fs.readFileSync('power-bank.html', 'utf8');

const startMarker = '  <!-- ItemList Schema -->';
const endMarker = '  <!-- WebSite Schema -->';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
  console.log('ERROR: markers not found');
  process.exit(1);
}

const newSection = `  <!-- ItemList Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "WOWOHCOOL Power Bank Collection",
    "description": "Complete range of power banks including semi-solid-state batteries, 2-in-1 hybrids, heating batteries, and high-power PD 3.1 models.",
    "url": "https://www.wowohcool.com/products/power-bank.html",
    "numberOfItems": 16,
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "url": "https://www.wowohcool.com/products/power-bank.html#wop09"},
      {"@type": "ListItem", "position": 2, "url": "https://www.wowohcool.com/products/power-bank.html#wop10"},
      {"@type": "ListItem", "position": 3, "url": "https://www.wowohcool.com/products/power-bank.html#wop26"},
      {"@type": "ListItem", "position": 4, "url": "https://www.wowohcool.com/products/power-bank.html#wop27"},
      {"@type": "ListItem", "position": 5, "url": "https://www.wowohcool.com/products/power-bank.html#wop55"},
      {"@type": "ListItem", "position": 6, "url": "https://www.wowohcool.com/products/power-bank.html#wop50"},
      {"@type": "ListItem", "position": 7, "url": "https://www.wowohcool.com/products/power-bank.html#wop49"},
      {"@type": "ListItem", "position": 8, "url": "https://www.wowohcool.com/products/power-bank.html#wop61"},
      {"@type": "ListItem", "position": 9, "url": "https://www.wowohcool.com/products/power-bank.html#wop53"},
      {"@type": "ListItem", "position": 10, "url": "https://www.wowohcool.com/products/power-bank.html#wop25"},
      {"@type": "ListItem", "position": 11, "url": "https://www.wowohcool.com/products/power-bank.html#wop15"},
      {"@type": "ListItem", "position": 12, "url": "https://www.wowohcool.com/products/power-bank.html#wop21"},
      {"@type": "ListItem", "position": 13, "url": "https://www.wowohcool.com/products/power-bank.html#wop22"},
      {"@type": "ListItem", "position": 14, "url": "https://www.wowohcool.com/products/power-bank.html#wop23"},
      {"@type": "ListItem", "position": 15, "url": "https://www.wowohcool.com/products/power-bank.html#wop69"},
      {"@type": "ListItem", "position": 16, "url": "https://www.wowohcool.com/products/power-bank.html#wop67"}
    ]
  }
  </script>

  <!-- Product Schema - Unified for all power bank products -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://www.wowohcool.com/products/power-bank.html",
    "name": "WOWOHCOOL Power Banks - Semi-Solid State, 2-in-1 Hybrids & High-Power PD 3.1 Stations",
    "description": "Professional power bank manufacturer in Shenzhen. Product line includes: semi-solid-state battery power banks with built-in cables (55W-65W), 2-in-1 hybrid chargers with AC plugs (45W-67W), high-power PD 3.1 power stations (67W-240W), TFT smart display power banks, heating clothing batteries for jackets/socks/gloves/scarves/pillows, and retractable cable power banks. CES 2026 award-winning semi-solid battery technology. OEM/ODM customization available. UN38.3, CE, FCC, RoHS certified.",
    "image": [
      "https://www.wowohcool.com/image/product/wop09-semi-solid-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop10-dual-cable-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop26-semi-solid-retractable.webp",
      "https://www.wowohcool.com/image/product/wop27-semi-solid-pro.webp",
      "https://www.wowohcool.com/image/product/wop55-heating-battery.webp",
      "https://www.wowohcool.com/image/product/wop50-heating-socks-battery.webp",
      "https://www.wowohcool.com/image/product/wop49-heating-scarf-battery.webp",
      "https://www.wowohcool.com/image/product/wop61-heating-gloves-battery.webp",
      "https://www.wowohcool.com/image/product/wop53-heating-pillow-battery.webp",
      "https://www.wowohcool.com/image/product/wop25-tft-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop15-tft-3in1-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop21-67w-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop22-130w-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop23-240w-power-bank.webp",
      "https://www.wowohcool.com/image/product/wop69-2in1-charger.webp",
      "https://www.wowohcool.com/image/product/wop67-2in1-cable-charger.webp"
    ],
    "brand": {"@type": "Brand", "name": "WOWOHCOOL"},
    "manufacturer": {"@type": "Organization", "name": "Dong Yi Technology Co., Ltd"},
    "sku": "WOWOHCOOL-POWER-BANK-SERIES",
    "mpn": "WOW-PB-SERIES",
    "category": "Electronics > Battery & Charging > Power Banks",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.7,
      "reviewCount": 495,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": 5,
      "highPrice": 45,
      "offerCount": 16,
      "availability": "https://schema.org/InStock",
      "url": "https://www.wowohcool.com/products/power-bank.html"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
        "author": {"@type": "Person", "name": "Marcus T."},
        "reviewBody": "We ordered 3,000 units of the WOP22 130W for our Amazon US store. The UN38.3 certification made customs clearance smooth. Minor QC issue with first batch - resolved within 24 hours. Second order was perfect.",
        "locationCreated": {"@type": "Place", "name": "Phoenix, Arizona, USA"},
        "datePublished": "2025-11-20"
      },
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
        "author": {"@type": "Person", "name": "Klaus B."},
        "reviewBody": "As an electronics importer, I have worked with many Chinese factories. WOWOHCOOL stands out for documentation quality. Every unit came with proper CE/FCC certificates. The semi-solid-state power banks are flying off shelves.",
        "locationCreated": {"@type": "Place", "name": "Munich, Germany"},
        "datePublished": "2025-10-05"
      },
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 4, "bestRating": 5},
        "author": {"@type": "Person", "name": "Sarah W."},
        "reviewBody": "We source branded power banks for corporate gifts. The 2-in-1 hybrid chargers (WOP67) were exactly what our tech company clients needed. Quality makes up for communication delays.",
        "locationCreated": {"@type": "Place", "name": "London, UK"},
        "datePublished": "2025-09-12"
      },
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
        "author": {"@type": "Person", "name": "Ricardo M."},
        "reviewBody": "Found them through the Alibaba verification. Factory is real - did a video call audit before ordering. Delivered 5,000 power banks to Brazil with complete documentation.",
        "locationCreated": {"@type": "Place", "name": "Sao Paulo, Brazil"},
        "datePublished": "2025-08-15"
      },
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
        "author": {"@type": "Person", "name": "Ahmed K."},
        "reviewBody": "We order branded power banks monthly for hotel amenity programs across the Middle East. The WOP25 with TFT display is popular with guests. Color matching was corrected promptly.",
        "locationCreated": {"@type": "Place", "name": "Dubai, UAE"},
        "datePublished": "2025-07-20"
      },
      {
        "@type": "Review",
        "reviewRating": {"@type": "Rating", "ratingValue": 5, "bestRating": 5},
        "author": {"@type": "Person", "name": "Jennifer L."},
        "reviewBody": "Ordered samples first to test quality. They were shipped fast and worked well. Placed bulk order for 2,000 units of the WOP23 240W. Production took 30 days, QC photos sent before shipping.",
        "locationCreated": {"@type": "Place", "name": "Toronto, Canada"},
        "datePublished": "2025-06-25"
      }
    ],
    "additionalProperty": [
      {"@type": "PropertyValue", "name": "Battery Technology", "value": "Semi-Solid State / Li-Po / Li-ion"},
      {"@type": "PropertyValue", "name": "Capacity Range", "value": "2000mAh - 27000mAh (99.9Wh)"},
      {"@type": "PropertyValue", "name": "Output Range", "value": "3.7V DC - 240W PD 3.1"},
      {"@type": "PropertyValue", "name": "Certifications", "value": "UN38.3, CE, FCC, RoHS, PSE"},
      {"@type": "PropertyValue", "name": "Feature Highlights", "value": "Built-in Cables, TFT Display, Retractable Cables, Heating Apparel Compatible"},
      {"@type": "PropertyValue", "name": "MOQ", "value": "500 units (ODM) / 2,000 units (OEM)"},
      {"@type": "PropertyValue", "name": "Customization", "value": "Logo, Packaging, Capacity, Color"}
    ]
  }
  </script>

  <!-- WebSite Schema -->`;

html = html.substring(0, startIdx) + newSection + html.substring(endIdx);

fs.writeFileSync('power-bank.html', html);
console.log('DONE: power-bank.html updated');

// Verify
const v = fs.readFileSync('power-bank.html', 'utf8');
const m = v.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
console.log('Schema blocks:', m.length);
m.forEach((s, i) => {
  try {
    const p = JSON.parse(s.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '').trim());
    console.log('  #' + (i+1) + ' ' + p['@type'] + (p['@type']==='Product' ? (' rating='+p.aggregateRating?.ratingValue + ' count='+p.aggregateRating?.reviewCount) : ''));
  } catch(e) {
    console.log('  #' + (i+1) + ' INVALID: ' + e.message);
  }
});
