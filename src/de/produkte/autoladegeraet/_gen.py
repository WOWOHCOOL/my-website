import os, sys
target = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.njk")
# Read template from file
tpl = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_template.njk")
with open(tpl, "r", encoding="utf-8") as src:
    content = src.read()
with open(target, "w", encoding="utf-8", newline="
") as out:
    out.write(content)
print(f"Written {len(content.splitlines())} lines to {target}")
