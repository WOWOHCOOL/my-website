
import os

target_dir = r'C:\Users\wowoh\wowohcool.com\src\fr\produits\batterie-externe\batterie-chauffante'
os.makedirs(target_dir, exist_ok=True)

filepath = os.path.join(target_dir, 'index.njk')

with open(r'C:\Users\wowoh\wowohcool.com\src\products\power-bank\heating-battery\index.njk', 'r', encoding='utf-8') as f:
    en = f.read()

print(f'English file has {len(en)} characters, {len(en.splitlines())} lines')
