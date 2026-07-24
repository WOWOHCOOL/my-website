import re, sys

path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
result = []
replaced = 0

for line in lines:
    new_line = line
    while '—' in new_line:
        idx = new_line.index('—')
        before = new_line[:idx].rstrip()
        after = new_line[idx+1:].lstrip()

        # H3/H4 heading: 'SPEC — Label' -> 'SPEC: Label'
        if '<h3' in before or '<h4' in before:
            repl = ': '
        # Attribution: '"> — Name' -> ', '
        elif before.rstrip().endswith('">') or before.rstrip().endswith("'\">"):
            repl = ', '
        # List items: '<li>—' -> '<li>'
        elif before.endswith('<li>'):
            repl = ''
        else:
            repl = ', '

        new_line = new_line[:idx] + repl + new_line[idx+1:]
        replaced += 1

    result.append(new_line)

content = '\n'.join(result)
# Fix artifacts
artifacts = content.count(' , ')
content = content.replace(' , ', ', ')
fixed = artifacts - content.count(' , ')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Em-dashes replaced: {replaced}')
print(f'Spacing artifacts fixed: {fixed}')
print(f'Remaining em-dashes: {content.count(chr(0x2014))}')
