import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
let pw;try{pw=require('playwright');}catch{pw=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
const report={levels:[],viewports:[],errors:[]};
fs.mkdirSync('screenshots/case-brief',{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1024,height:768},locale:'ru-RU'});
 page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('build/independent/index.html')).href);
 await page.locator('[data-action="catalog"]').click();
 const ids=await page.evaluate(()=>DS.puzzles.map(p=>p.id));
 for(const id of ids){
  await page.locator(`[data-action="open"][data-id="${id}"]`).click();
  const info=await page.evaluate(()=>{const p=DS.currentPuzzle();return {victim:DS.text(p.suspects.find(s=>s.id===p.victimId).name),intro:DS.text(p.intro),placements:p.solution};});
  assert.equal(await page.locator('.case-victim strong').innerText(),info.victim);
  assert.ok((await page.locator('.modal').innerText()).includes(info.intro));
  assert.match(await page.locator('.case-premise').innerText(),/По условию/);
  await page.locator('[data-action="start"]').click();
  // Exercise the explanation against a valid arrangement using the authored test fixture.
  await page.evaluate(placements=>{DS.attempt().placements={...placements};DS.ui.render();},info.placements);
  const before=await page.evaluate(()=>JSON.stringify({...DS.attempt(),timer:0}));
  await page.locator('[data-action="case-info"]').click();
  assert.equal(await page.locator('.case-victim strong').innerText(),info.victim);
  await page.locator('[data-action="return-game"]').click();
  assert.equal(await page.evaluate(()=>JSON.stringify({...DS.attempt(),timer:0})),before);
  await page.locator('[data-action="check"]').click();
  assert.equal(await page.locator('.case-victim strong').innerText(),info.victim);
  assert.equal(await page.locator(`[data-action="accuse"]`).count(),Object.keys(info.placements).length-1);
  await page.locator('[data-action="return-game"]').click();
  assert.equal(await page.locator('.overlay').count(),0);
  assert.deepEqual(await page.evaluate(()=>DS.attempt().placements),info.placements);
  if(id==='bookshop')for(const [width,height] of [[375,667],[667,375],[1024,768],[1920,1080]]){
   await page.setViewportSize({width,height});
   const board=await page.locator('.board').boundingBox();
   const header=await page.locator('.topbar').boundingBox();
   assert.ok(board.y>=header.y+header.height-1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:`screenshots/case-brief/plan-${width}x${height}.png`});
   await page.locator('[data-action="case-info"]').click();
   await page.screenshot({path:`screenshots/case-brief/brief-${width}x${height}.png`});
   await page.locator('[data-action="return-game"]').click();
   const after=await page.locator('.board').boundingBox();assert.deepEqual(after,board);
   await page.locator('[data-action="check"]').click();
   await page.screenshot({path:`screenshots/case-brief/choice-${width}x${height}.png`});
   await page.locator('[data-action="return-game"]').click();
   report.viewports.push({width,height,result:'PASS'});
  }
  report.levels.push({id,result:'PASS'});
  await page.locator('[data-action="back"]').click();
 }
 const fresh=await browser.newPage({locale:'ru-RU'});
 await fresh.goto(pathToFileURL(path.resolve('build/independent/index.html')).href);
 await fresh.locator('[data-action="catalog"]').click();
 await fresh.locator('[data-action="open"][data-id="bookshop"]').click();
 await fresh.reload();await fresh.locator('[data-action="continue"]').click();
 assert.equal(await fresh.locator('[data-action="start"]').count(),1);
 assert.equal(await fresh.locator('.case-victim strong').innerText(),'Виктор');
 await fresh.locator('[data-action="start"]').click();
 await fresh.reload();await fresh.locator('[data-action="continue"]').click();
 assert.equal(await fresh.locator('.overlay').count(),0);
 report.unreadBriefAfterReload='PASS';await fresh.close();
 assert.deepEqual(report.errors,[]);
 report.result='PASS';fs.writeFileSync('reports/case-brief-browser.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
