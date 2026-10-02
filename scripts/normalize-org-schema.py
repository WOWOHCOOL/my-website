#!/usr/bin/env python3
# Organization single-source (language-aware): ensure every parseable Organization JSON-LD
# node carries the canonical field set. url/publishingPrinciples are LOCALIZED per language.
# ADD-only for facts; localizes url/publishingPrinciples.
# Skips/handles templated blocks via balanced node extraction.
import io, os, re, sys, json, glob, copy
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FACTS = {
 "@id":"https://www.wowohcool.com/#organization",
 "name":"WOWOHCOOL",
 "legalName":"Dong Yi Technology Co., Ltd",
 "foundingDate":"2013",
 "vatID":"91441900MA558A2N27",
 "logo":{"@type":"ImageObject","url":"https://www.wowohcool.com/image/wowohcool-logo-optimized.webp","width":263,"height":70},
 "areaServed":["US","DE","AT","CH","UK","FR","ES","PL","EU","JP","KR","AU","MX","CO","AR","CL","PE","RU","KZ","BY","EAEU"],
 "address":{"@type":"PostalAddress","streetAddress":"925, Yichuang International Center, Longhua District","addressLocality":"Shenzhen","addressRegion":"Guangdong","postalCode":"518111","addressCountry":"CN"},
 "sameAs":["https://www.linkedin.com/company/wowohcool","https://www.facebook.com/wowohcoolelectronic","https://www.youtube.com/@WOWOHCOOL","https://x.com/wowohcool"],
 "knowsAbout":["OEM/ODM Power Bank Manufacturing","Qi2 Wireless Charging Standard","GaN Power Architecture","Automotive Fast Charging Systems","Custom Power Adapter Production","Consumer Electronics Sourcing","UL & CE Safety Compliance"],
 "contactPoint":{"@type":"ContactPoint","contactType":"OEM/ODM Sales","telephone":"+86-18620789739","email":"info@wowohcool.com","availableLanguage":["English","German","Spanish","French","Russian","Polish"]},
}
EN_ABOUT = "https://www.wowohcool.com/about/"
LANG_URL = {
 "en":EN_ABOUT, "de":"https://www.wowohcool.com/de/ueber-uns/", "es":"https://www.wowohcool.com/es/sobre-nosotros/",
 "fr":"https://www.wowohcool.com/fr/a-propos/", "pl":"https://www.wowohcool.com/pl/o-nas/", "ru":"https://www.wowohcool.com/ru/o-kompanii/",
}
def lang_of(rel):
    q=rel.replace("\\","/")
    for l in ("de","es","fr","pl","ru"):
        if ("/"+l+"/") in q: return l
    return "en"
def patch_node(o, url):
    n=0
    for k,v in FACTS.items():
        if k not in o: o[k]=copy.deepcopy(v); n+=1
    o["url"]=url; o["publishingPrinciples"]=url
    return n
def walk_patch(x, url):
    n=0; changed=False
    if isinstance(x,dict):
        if x.get('@type')=='Organization':
            before_url=x.get('url'); before_pp=x.get('publishingPrinciples')
            n+=patch_node(x,url)
            if before_url!=url or before_pp!=url: changed=True
        for v in x.values():
            a,b=walk_patch(v,url); n+=a; changed=changed or b
    elif isinstance(x,list):
        for v in x:
            a,b=walk_patch(v,url); n+=a; changed=changed or b
    return n, changed
def _node_span(block):
    m=re.search(r'"@type"\s*:\s*"Organization"', block)
    if not m: return None
    depth=0; i=m.start()
    while i>=0:
        ch=block[i]
        if ch=='}': depth+=1
        elif ch=='{':
            if depth==0: break
            depth-=1
        i-=1
    return (i, None) if i>=0 else None
def _end_brace(block, start):
    depth=0; q=None; i=start
    while i<len(block):
        ch=block[i]
        if q:
            if ch=='\\': i+=2; continue
            if ch==q: q=None
        else:
            if ch in '"\'': q=ch
            elif ch=='{': depth+=1
            elif ch=='}':
                depth-=1
                if depth==0: return i+1
        i+=1
    return None
def fix(text, rel):
    url=LANG_URL[lang_of(rel)]; n=0
    def repl(m):
        nonlocal n
        b=m.group(1)
        if '"Organization"' not in b: return m.group(0)
        if '{{' in b or '{%' in b:
            sp=_node_span(b); 
            if not sp: return m.group(0)
            end=_end_brace(b, sp[0])
            if not end: return m.group(0)
            frag=b[sp[0]:end]
            try: node=json.loads(frag)
            except: return m.group(0)
            c=patch_node(node,url)
            if c==0 and node.get('url')==url: return m.group(0)
            n+=1
            return m.group(0)[:m.start(1)-m.start(0)] + b[:sp[0]] + json.dumps(node,ensure_ascii=False,indent=2) + b[end:] + m.group(0)[m.end(1)-m.start(0):]
        try: d=json.loads(b)
        except: return m.group(0)
        c, changed = walk_patch(d,url)
        if c==0 and not changed: return m.group(0)
        n+=max(c,1)
        return '<script type="application/ld+json">\n' + json.dumps(d,ensure_ascii=False,indent=2) + '\n</script>'
    return re.sub(r'<script type="application/ld\+json">([\s\S]*?)</script>', repl, text), n
def main():
    args=sys.argv[1:]; apply="--apply" in args
    only=args[args.index("--only")+1] if "--only" in args else None
    files=[os.path.join(ROOT,only)] if only else glob.glob(os.path.join(ROOT,"src","**","*.njk"),recursive=True)
    tf=tc=0
    for f in files:
        if "_includes" in f or not os.path.exists(f): continue
        t=io.open(f,encoding="utf-8").read(); nt,c=fix(t,os.path.relpath(f,ROOT))
        if c:
            tf+=1; tc+=c
            print(("APPLY " if apply else "DRY   ")+os.path.relpath(f,ROOT))
            if apply: io.open(f,"w",encoding="utf-8",newline="\n").write(nt)
    print("\n%d file(s) %s"%(tf,"updated" if apply else "(dry-run)"))
main()
