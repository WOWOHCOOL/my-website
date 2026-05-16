with open(r'C:\Users\wowoh\wowohcool.com\blog.html', 'rb') as f:
    content = f.read()

replacements = [
    (b'href="blog.html"', b'href="/blog/"'),
    (b'src="image/', b'src="/image/'),
    (b'href="image/', b'href="/image/'),
    (b'href="css/', b'href="/css/'),
    (b'href="products/', b'href="/products/'),
    (b'href="about.html"', b'href="/about.html"'),
    (b'href="contact.html"', b'href="/contact.html"'),
    (b'href="service.html"', b'href="/service.html"'),
    (b'href="privacy-policy.html"', b'href="/privacy-policy.html"'),
    (b'href="terms-of-service.html"', b'href="/terms-of-service.html"'),
    (b'href="index.html"', b'href="/"'),
    (b'src="main.js"', b'src="/main.js"'),
    # blog article links: remove blog/ prefix since same directory
    (b'href="blog/', b'href="'),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f'  Replaced: {old.decode()} -> {new.decode()}')
    else:
        print(f'  NOT FOUND: {old.decode()}')

with open(r'C:\Users\wowoh\wowohcool.com\blog\index.html', 'wb') as f:
    f.write(content)

print(f'\nDone. {count} replacements. File size: {len(content)} bytes')
