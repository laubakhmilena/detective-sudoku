import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
let playwright;
try { playwright=require('playwright'); } catch { playwright=require(process.env.PLAYWRIGHT_PATH || path.join(process.env.USERPROFILE || process.env.HOME,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
const {chromium}=playwright;
const root=path.resolve(import.meta.dirname,'..');
fs.mkdirSync(path.join(root,'docs'),{recursive:true});
const server=createServer((req,res)=>{const filename=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));try{res.setHeader('Content-Type',filename.endsWith('.js')?'text/javascript':filename.endsWith('.css')?'text/css':filename.endsWith('.svg')?'image/svg+xml':filename.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(filename))}catch{res.statusCode=404;res.end()}});
await new Promise(r=>server.listen(4175,'127.0.0.1',r));
let browser;
try {
 browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1366,height:900}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4175');await page.waitForTimeout(350);
 const click=async(selector)=>{await page.locator(selector + ":visible").first().click()};
 const action=async(a,attrs='')=>click(`[data-action="${a}"]${attrs}`);
 await action('home-play');
 assert.equal(await page.locator('.chapter-folder').count(),12);
 await action('open-chapter');
 const resume=async()=>{await action('home-resume');if(await page.locator('[data-action="start-case"]:visible').count())await action('start-case')};
 for(let n=1;n<=12;n++) {
  await action('open-case',`[data-case-id="case-${String(n).padStart(2,'0')}"]`);
  await action('start-case');
  const entry=await page.evaluate(n=>window.__detectiveSudokuTestApi.cases[n-1],n);
  const p=entry.puzzleData;
  await action('hint');
  if(n>=3 && n!==5){await action('verify');await page.reload();await page.waitForTimeout(350);await resume();assert.equal(await page.evaluate(id=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')).errors[id],entry.id),1)}
  if([3,4,6,8,9,10,11].includes(n)) {
    await action('open-evidence',`[data-evidence-id="source-${n}"]`);
    assert.equal(await page.locator('.evidence-modal').count(),1);
    await action('close-evidence');
  }
  const place=async(select,place,items,idAttr)=>{for(let i=0;i<items.length;i++){await action(select,`[${idAttr}="${items[i]}"]`);await action(place,`[data-slot="${i}"]`)}};
  if(entry.mechanic==='timeline')await place('select-timeline-event','place-timeline-slot',p.solution,'data-event-id');
  if(entry.mechanic==='itemChain') {await place('select-chain-item','place-chain-slot',p.solution,'data-item-id');for(const t of p.testimonies)await action('mark-testimony',`[data-testimony-id="${t.id}"][data-status="${t.expected}"]`)}
  if(entry.mechanic==='route') {
   if(p.mode==='discoverPassage')for(const id of entry.solution.path)await action('route-add-node',`[data-location-id="${id}"]`);
   else for(const [id,possible] of Object.entries(entry.solution.possible)){await action('toggle-route-option',`[data-option-id="${id}"]`);if(!possible)await action('toggle-route-option',`[data-option-id="${id}"]`)}
  }
  if(entry.mechanic==='documentCompare') {
   if(p.mode==='fragment'){await action('select-doc-candidate',`[data-candidate-id="${entry.solution.candidate}"]`);for(const field of entry.solution.fields)await action('toggle-doc-field',`[data-candidate-id="${entry.solution.candidate}"][data-field-index="${field}"]`)}
   else {for(const row of (p.fields || p.prompts))await action('select-doc-field',`[data-field-id="${row.id}"][data-value="${row.answer}"]`);if(p.mode==='custody')for(const step of entry.solution.order)await action('custody-step',`[data-step="${step}"]`)}
  }
  if(entry.mechanic==='finance')await place('select-finance-item','place-finance-slot',p.finance.solution,'data-item-id');
  if(['grid','finance'].includes(entry.mechanic))for(const [person,cell] of Object.entries(entry.solution.grid || entry.solution)){await action('select-person',`[data-person="${person}"]`);await action('cell',`[data-cell="${cell}"]`)}
  if(entry.mechanic==='reconstruction') {
   for(const [id,part]of Object.entries(p.parts))await action('reconstruction-select',`[data-part="${id}"][data-value="${part.answer}"]`);
   for(const id of entry.solution.evidence)await action('toggle-reconstruction-evidence',`[data-evidence-id="${id}"]`);
   await place('select-reconstruction-step','place-reconstruction-step',entry.solution.sequence,'data-step-id');
  }
  // Persist the completed puzzle, then verify it after a real page reload.
  await page.reload();await page.waitForTimeout(350);await resume();
  await action('verify');assert.equal(await page.locator('[data-action="continue-after-result"]').count(),1,`case ${n} completion`);
  await page.reload();await page.waitForTimeout(350);await resume();await action('continue-after-result');
  const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')));
  assert.equal(progress.completedCases.length,n);
  console.log(`browser case ${n}: UI solution + reload passed`);
 }

 await page.screenshot({path:path.join(root,'screenshots/chapter1-complete.png'),fullPage:true});
 const report={firstChapter:'PASS',chapters:[],viewports:[[1366,900],[360,800],[844,390]],errors};
 for(let chapter=2;chapter<=12;chapter++) {
  await action('campaign-open', '[data-chapter="'+chapter+'"]');
  await action('campaign-case','[data-index="0"]');
  const ch=await page.evaluate(id=>window.__campaignTestApi.chapters.find(c=>c.id===id),chapter);
  for(let i=0;i<10;i++){
   const entry=ch.cases[i];
   const [width,height]=report.viewports[(chapter+i)%3];await page.setViewportSize({width,height});
   await action('campaign-hint');await action('campaign-verify');
   const before=await page.evaluate(({chapter,id})=>JSON.parse(localStorage.getItem('detective-campaign-v1')).chapters[chapter].states[id],{chapter,id:entry.id});
   assert.equal(before.errors,1);assert.equal(before.hints,1);
   await page.reload();await page.waitForTimeout(300);await resume();
   if(entry.grid){for(const [person,cell]of Object.entries(entry.grid.solution)){await action('campaign-person','[data-id="'+person+'"]');await action('campaign-cell','[data-cell="'+cell+'"]')}}
   else if(['timeline','custody','links'].includes(entry.mechanic)){for(const id of ['0','1','2','3'])await action('campaign-order','[data-id="'+id+'"]')}
   else if(entry.mechanic==='testimony'){await action('campaign-answer','[data-id="0"][data-value="Опровергнуто"]');await action('campaign-answer','[data-id="1"][data-value="Подтверждено"]')}
   else if(entry.mechanic==='compare'){for(const index of ch.document.changed)await action('campaign-field','[data-index="'+index+'"]')}
   else if(entry.mechanic==='route'){
    const routes=[];
    function visit(path,total){const last=path.at(-1);if(last===ch.route.end&&path.includes(ch.route.via)&&total<=ch.route.limit)routes.push(path);for(const [a,b,t]of ch.route.edges){const next=a===last?b:b===last?a:null;if(next&&!path.includes(next)&&!ch.route.blocked.includes(next)&&total+t<=ch.route.limit)visit([...path,next],total+t)}}
    visit([ch.route.start],0);assert.ok(routes.length);for(const node of routes[0])await action('campaign-node','[data-id="'+node+'"]');
   } else {
    const parts=await page.evaluate(id=>campaignParts(__campaignTestApi.chapters.find(c=>c.id===id)),chapter);
    for(const part of parts){await action('campaign-answer','[data-id="'+part.id+'"][data-value="'+part.answer+'"]');await page.locator('[data-campaign-ref="'+part.id+'"]').selectOption(String(part.ref))}
   }
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+chapter+'/'+(i+1)+' '+width);
   await page.reload();await page.waitForTimeout(300);await resume();await action('campaign-verify');
   assert.equal(await page.locator('[data-action="campaign-next"]').count(),1,'solve '+chapter+'/'+(i+1));
   await page.reload();await page.waitForTimeout(300);await resume();await action('campaign-next');
   const completed=await page.evaluate(id=>JSON.parse(localStorage.getItem('detective-campaign-v1')).chapters[id].completed,chapter);
   assert.equal(completed.length,i+1);
  }
  report.chapters.push({chapter,cases:10,status:'PASS'});
  console.log('Chapter '+chapter+': 10/10 UI solves, errors, hints and reloads PASS');
  fs.writeFileSync(path.join(root,'docs/browser-validation.json'),JSON.stringify(report,null,2));
 }
 assert.equal(await page.getByRole('heading',{name:'Кампания завершена'}).count(),1);
 await page.screenshot({path:path.join(root,'screenshots/campaign-complete.png'),fullPage:true});
 await action('campaign-menu');await action('home-play');assert.equal(await page.locator('.chapter-folder:not([disabled])').count(),12);
 assert.deepEqual(errors,[]);report.campaign='PASS';fs.writeFileSync(path.join(root,'docs/browser-validation.json'),JSON.stringify(report,null,2));
 console.log('All 122 cases solved through UI; campaign completion PASS');
} finally {await browser?.close();server.close()}
