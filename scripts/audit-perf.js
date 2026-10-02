'use strict';
// Perf audit (lab): LCP / CLS / requests / transfer / render-blocking, mobile emulation.
// Usage: node scripts/audit-perf.js
const http=require('http'),fs=require('fs'),path=require('path');
let chromium; try { ({chromium}=require('playwright')); } catch { ({chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/wowoh/.agents/skills/claude-design-card/node_modules/playwright')); }
const SITE=path.join(__dirname,'..','_site'), EDGE='C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const MIME={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.txt':'text/plain','.ico':'image/x-icon','.xml':'application/xml'};
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const fp=path.join(SITE,p);if(!fp.startsWith(SITE)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory()){res.writeHead(404);res.end();return}const st=fs.statSync(fp);res.writeHead(200,{'content-type':MIME[path.extname(fp)]||'application/octet-stream','content-length':st.size});fs.createReadStream(fp).pipe(res)});s.listen(0,()=>r(s))})}
const PAGES=['/index.html','/products/gan-charger/index.html','/blog/gan-chargers-guide/index.html','/blog/index.html'];
(async()=>{const srv=await serve();const base='http://127.0.0.1:'+srv.address().port;const b=await chromium.launch({executablePath:EDGE,headless:true});
console.log('page | LCP(ms) | CLS | reqs | transfer(KB) | JS(KB) | CSS(KB) | blk(js/css)');
for(const url of PAGES){
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'});
  const pg=await ctx.newPage();
  const client=await ctx.newCDPSession(pg);
  await client.send('Emulation.setCPUThrottlingRate',{rate:4});
  const reqs=[]; pg.on('response',async r=>{try{const h=r.headers();const len=Number(h['content-length']||0);reqs.push({url:r.url(),len,ct:h['content-type']||'',type:r.request().resourceType()});}catch{}});
  await pg.addInitScript(()=>{window.__lcp=0;window.__cls=0;new PerformanceObserver(l=>{for(const e of l.getEntries())window.__lcp=Math.max(window.__lcp,e.startTime);}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries()){if(!e.hadRecentInput)window.__cls+=e.value;}}).observe({type:'layout-shift',buffered:true});});
  await pg.goto(base+url,{waitUntil:'load'});
  await pg.waitForTimeout(1200);
  const m=await pg.evaluate(()=>({lcp:Math.round(window.__lcp),cls:Number(window.__cls.toFixed(4))}));
  const transfer=reqs.reduce((a,r)=>a+r.len,0)/1024;
  const js=reqs.filter(r=>r.type==='script'||/javascript/.test(r.ct)).reduce((a,r)=>a+r.len,0)/1024;
  const css=reqs.filter(r=>r.type==='stylesheet'||/text\/css/.test(r.ct)).reduce((a,r)=>a+r.len,0)/1024;
  const blk=reqs.filter(r=>(r.type==='script'||r.type==='stylesheet')).length;
  console.log(url+' | '+m.lcp+' | '+m.cls+' | '+reqs.length+' | '+transfer.toFixed(0)+' | '+js.toFixed(0)+' | '+css.toFixed(0)+' | '+blk);
  const big=reqs.filter(r=>r.len>100*1024).sort((a,b)=>b.len-a.len).slice(0,3);
  for(const x of big) console.log('     big: '+(x.len/1024).toFixed(0)+'KB '+x.url.replace(base,'')); 
  await ctx.close();
}
await b.close();srv.close();})().catch(e=>{console.error(e);process.exit(1)});
