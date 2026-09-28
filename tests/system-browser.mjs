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

 const report={};
 for(const [width,height]of [[1366,900],[360,800],[844,390]]){
  await page.setViewportSize({width,height});
  assert.equal(await page.locator('[data-action="home-play"]').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.screenshot({path:path.join(root,'screenshots/home-'+width+'x'+height+'.png'),fullPage:true});
 }
 await action('home-play');assert.equal(await page.locator('.chapter-folder').count(),12);
 await action('home');await action('settings');
 const audio=page.locator('[data-action="audio-toggle"]');await audio.uncheck();
 await action('close-settings');await page.reload();await page.waitForTimeout(300);
 await action('settings');assert.equal(await audio.isChecked(),false);await action('close-settings');
 await action('home-play');await action('open-chapter');await action('open-case','[data-case-id="case-01"]');await action('start-case');
 const entry=await page.evaluate(()=>__detectiveSudokuTestApi.cases[0]);
 const people=Object.keys(entry.solution),positions=Object.values(entry.solution);
 // A complete but wrong arrangement preserves row/column rules.
 for(let i=0;i<people.length;i++){await action('select-person','[data-person="'+people[i]+'"]');await action('cell','[data-cell="'+positions[(i+1)%positions.length]+'"]')}
 await action('verify');await action('hint');
 await action('back-cases');await action('back-menu');await action('home');
 const snapshot=await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')));
 assert.equal(snapshot.errors['case-01'],1);assert.equal(snapshot.hintsUsed['case-01'],1);
 await action('home-play');await action('home');
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1'))),snapshot);
 await action('settings');page.once('dialog',dialog=>dialog.dismiss());await action('reset-progress');await action('close-settings');
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1'))),snapshot);
 await action('home-resume');
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')).activePlayTime['case-01']);
 await action('back-cases');await page.waitForTimeout(2200);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')).activePlayTime['case-01']),before);
 await action('back-menu');await action('home');await page.reload();await page.waitForTimeout(2200);await action('home-resume');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('detective-sudoku-progress-v1')).activePlayTime['case-01']),before);
 await page.locator('.shared-map summary').click();await page.waitForTimeout(1300);assert.equal(await page.locator('.shared-map').getAttribute('open'),'');
 for(const [width,height]of [[1366,900],[360,800],[844,390]]){
  await page.setViewportSize({width,height});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'chapter1 grid overflow '+width);
  await page.screenshot({path:path.join(root,'screenshots/grid-'+width+'x'+height+'.png'),fullPage:true});
 }
 const assets=await page.evaluate(()=>{
  const api=__detectiveSudokuTestApi, paths=new Set([api.chapter.cover,api.chapter.map]);
  api.cases.forEach(c=>{if(c.image)paths.add(c.image)});Object.values(api.characters).forEach(c=>{if(c.avatar)paths.add(c.avatar)});
  Object.values(api.boardTemplates).forEach(t=>t.objects.forEach(o=>{if(o.path)paths.add(o.path)}));
  __campaignTestApi.chapters.forEach(ch=>{[ch.cover,ch.map,ch.endingImage].forEach(p=>paths.add(p));ch.cases.forEach(e=>{paths.add(e.image);if(e.number<10)paths.add('assets/campaign/ch'+ch.id+'/record-'+e.number+'.svg')});ch.names.forEach((_,i)=>paths.add('assets/campaign/ch'+ch.id+'/person-'+i+'.svg'))});
  return [...paths];
 });
 const imageErrors=await page.evaluate(async assets=>{
   const results=await Promise.all(assets.map(src=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(img.naturalWidth?null:src);img.onerror=()=>resolve(src);img.src=src})));return results.filter(Boolean);
 },assets);
 assert.deepEqual(imageErrors,[]);
 report.start='PASS';report.saves='PASS';report.timer='PASS';report.resetConfirmation='PASS';report.audioPreference='PASS';report.activeImages=assets.length;report.brokenImages=imageErrors;report.errors=errors;report.viewports=[[1366,900],[360,800],[844,390]];
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(root,'docs/system-validation.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report));
} catch(error) { const pages=browser?.contexts()[0]?.pages();if(pages?.length) {await pages[0].screenshot({path:path.join(root,'screenshots/system-failure.png'),fullPage:true});console.log(await pages[0].locator('body').innerText())} throw error; } finally {await browser?.close();server.close()}
