import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);
let pw;try{pw=require('playwright');}catch{pw=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const root=path.resolve('.'),output=path.join(root,'screenshots/local-v3');fs.mkdirSync(output,{recursive:true});
const server=createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.html':'text/html'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});
await new Promise(r=>server.listen(4196,'127.0.0.1',r));
const report={responsive:[],errors:[],brokenAssets:[],externalRequests:[],localSave:'NOT TESTED',languages:{},fileBuild:'NOT TESTED'};
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
try{
 const context=await browser.newContext();
 await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith('http://127.0.0.1:4196/')||url.startsWith('file:'))return route.continue();report.externalRequests.push(url);return route.abort();});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)report.brokenAssets.push(r.url());});
 const click=action=>page.locator(`[data-action="${action}"]`).click();
 const start=async()=>{if(await page.locator('[data-action="start"]').count())await click('start');};
 const capture=async(label,shot)=>{
  await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));await page.waitForTimeout(40);
  const m=await page.evaluate(()=>{
   const box=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
   const selector=document.querySelector('.board')?'.board,.topbar,.timer,.participants,.active-clue,.actions,.actions button,.game-panel .person':'.home-content,.home-actions button,.topbar,.filters,.catalog-options';
   return {pageOverflow:document.documentElement.scrollHeight>innerHeight+1||document.documentElement.scrollWidth>innerWidth+1,
    outside:[...document.querySelectorAll(selector)].filter(e=>{const r=box(e);return r.x<-.5||r.y<-.5||r.right>innerWidth+.5||r.bottom>innerHeight+.5;}).map(e=>e.className),
    board:document.querySelector('.board')?box(document.querySelector('.board')):null,
    labels:[...document.querySelectorAll('.room-label,.marker small')].filter(e=>{const r=box(e),b=box(e.closest('.board'));return r.x<b.x||r.right>b.right||r.bottom>b.bottom;}).map(e=>e.textContent),
    clippedCards:[...document.querySelectorAll('.person-clue')].filter(e=>{const r=box(e),p=box(e.closest('.person'));return r.width>0&&(r.x<p.x||r.y<p.y||r.right>p.right+1||r.bottom>p.bottom+1||e.scrollWidth>e.clientWidth+1);}).map(e=>e.textContent),
    broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),
    badText:/\b(undefined|NaN)\b/.test(document.body.innerText),
    overlaps:document.querySelector('.board')?['.participants','.active-clue','.actions'].filter(sel=>{const a=box(document.querySelector('.board')),b=box(document.querySelector(sel));return Math.min(a.right,b.right)-Math.max(a.x,b.x)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>1;}):[]};
  });
  if(shot)await page.screenshot({path:path.join(output,shot+'.png')});
  const problems=[...(m.pageOverflow?['page overflow']:[]),...m.outside.map(x=>'outside '+x),...m.labels.map(x=>'label '+x),...m.broken,...m.clippedCards.map(x=>'clue outside card '+x),...(m.badText?['invalid text']:[]),...m.overlaps.map(x=>'overlap '+x)];
  return {screen:label,result:problems.length?'FAIL':'PASS',boardPixels:m.board?.width,problems};
 };
 await page.goto('http://127.0.0.1:4196');await page.waitForSelector('.home');
 for(const lang of ['ru','en']){
  await click('settings');await page.selectOption('#language',lang);await page.locator('.modal-close').click();
  for(const [width,height] of [[344,882],[375,667],[390,844],[427,952],[440,956],[667,375],[844,390],[882,344],[956,440],[768,1024],[960,1440],[1080,1920],[1024,768],[1280,800],[1366,768],[1600,900],[1920,1080]]){
   await page.setViewportSize({width,height});const screens=[];
   const prefix=`${lang}-${width}x${height}`;
   screens.push(await capture('Home',prefix+'-home'));
   await click('catalog');screens.push(await capture('Catalog',prefix+'-catalog'));
   for(const [id,size] of [['bookshop',5],['laboratory',8]]){
    await page.locator(`[data-action="open"][data-id="${id}"]`).click();await start();
    // Normal UI actions only: populate a few markers to assess occupied cells too.
    if(!await page.locator('.marker').count()){
     for(const [person,cell] of id==='bookshop'?[['s0',0],['s1',8]]:[['s0',6],['s1',10],['s6',48]]){
      await page.locator(`[data-action="person"][data-id="${person}"]`).click();await page.locator(`[data-action="cell"][data-cell="${cell}"]`).click();
     }
    }
    screens.push(await capture(size+'x'+size,prefix+'-'+size+'x'+size));
    const before=await page.locator('.board').boundingBox();await click('hint');assert.deepEqual(await page.locator('.board').boundingBox(),before);await page.locator('.modal-close').click();assert.deepEqual(await page.locator('.board').boundingBox(),before);
    await click('back');
   }
   report.responsive.push({language:lang,width,height,screens,result:screens.every(s=>s.result==='PASS')?'PASS':'FAIL'});
   await click('back');
  }
  report.languages[lang]=report.responsive.filter(r=>r.language===lang).every(r=>r.result==='PASS')?'PASS':'FAIL';
 }
 // Local persistence uses only normal gameplay, settings and reload.
 await click('continue');
 await click('notes');await page.locator('[data-action="cell"][data-cell="1"]').click();await click('notes');
 await click('settings');await page.locator('#sound').uncheck();await page.selectOption('#language','ru');await page.locator('.modal-close').click();
 await page.waitForTimeout(10100);await click('settings');await page.locator('#sound').check();await page.locator('#sound').uncheck();await page.locator('.modal-close').click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-independent-v3')));
 await page.evaluate(()=>dispatchEvent(new Event('blur')));await page.waitForTimeout(2100);
 const paused=await page.locator('#timer').innerText();await page.waitForTimeout(1100);assert.equal(await page.locator('#timer').innerText(),paused);
 await page.evaluate(()=>dispatchEvent(new Event('focus')));await page.reload();await click('continue');
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-independent-v3'))),id=before.currentPuzzleId;
 assert.deepEqual(after.attempts[id].placements,before.attempts[id].placements);assert.deepEqual(after.attempts[id].notes,before.attempts[id].notes);assert.equal(after.attempts[id].hintsUsed,before.attempts[id].hintsUsed);assert.deepEqual(after.settings,{sound:false,language:'ru',volume:.6});
 assert.ok(after.attempts[id].timer-before.attempts[id].timer<1500);report.localSave='PASS';report.timerOffline='PASS';
 // Resize without reload retains positions and selected-clue state.
 const markers=await page.locator('.marker small').allTextContents();
 for(const viewport of [{width:375,height:667},{width:667,height:375},{width:375,height:667},{width:768,height:1024},{width:1024,height:768}]){await page.setViewportSize(viewport);await page.waitForTimeout(40);assert.deepEqual(await page.locator('.marker small').allTextContents(),markers);}
 for(let width=660;width<=1100;width+=40){await page.setViewportSize({width,height:768});await page.waitForTimeout(20);const result=await capture('resize');assert.equal(result.result,'PASS',JSON.stringify(result));}
 report.rotation='PASS';report.continuousResize='PASS';
 const offline=await context.newPage();await offline.goto(pathToFileURL(path.join(root,'build/independent/index.html')).href);await offline.waitForSelector('[data-action="catalog"]');await offline.click('[data-action="catalog"]');assert.equal(await offline.locator('.puzzle-card').count(),12);await offline.click('[data-id="bookshop"]');await offline.click('[data-action="start"]');await offline.click('[data-cell="0"]');await offline.reload();await offline.click('[data-action="continue"]');assert.equal(await offline.locator('.marker').count(),1);report.fileBuild='PASS';await offline.close();
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.brokenAssets,[]);assert.deepEqual(report.externalRequests,[]);
 if(report.responsive.some(r=>r.result==='FAIL'))process.exitCode=1;
 console.log(JSON.stringify({sizes:report.responsive.length,failures:report.responsive.filter(r=>r.result==='FAIL'),save:report.localSave,offline:report.timerOffline,errors:report.errors,assets:report.brokenAssets,externalRequests:report.externalRequests},null,2));
}finally{fs.writeFileSync('reports/local-polish-browser.json',JSON.stringify(report,null,2));await browser.close();server.close();}
