import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);let pw;
try{pw=require('playwright');}catch{pw=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
const report={environment:'Chrome mobile emulation, touch input, packaged file:// build',physicalDevice:'NOT TESTED',errors:[],rotations:[]};
try{
 const context=await browser.newContext({viewport:{width:375,height:667},locale:'ru-RU',isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('build/independent/index.html')).href);
 const tap=action=>page.locator(`[data-action="${action}"]`).tap();
 await tap('catalog');await page.locator('[data-action="open"][data-id="bookshop"]').tap();await tap('start');
 await page.evaluate(()=>{window.renderTimes=[];const render=DS.ui.render.bind(DS.ui);DS.ui.render=()=>{const start=performance.now();render();renderTimes.push(performance.now()-start);};});
 await page.locator('[data-action="person"][data-id="s0"]').tap();await page.locator('[data-cell="0"]').tap();
 await page.locator('[data-action="person"][data-id="s1"]').tap();await page.locator('[data-cell="8"]').tap();
 assert.deepEqual(await page.evaluate(()=>DS.attempt().placements),{s0:0,s1:8});report.touchPlacement='PASS';
 await tap('notes');await page.locator('[data-cell="2"]').tap();await tap('notes');
 assert.equal(await page.evaluate(()=>DS.attempt().notes[2]),1);report.touchNotes='PASS';
 for(let i=0;i<3;i++){const before=await page.locator('.board').boundingBox();await tap('hint');assert.deepEqual(await page.locator('.board').boundingBox(),before);await page.locator('.modal-close').tap();assert.deepEqual(await page.locator('.board').boundingBox(),before);}report.hintStability='PASS';
 const state=await page.evaluate(()=>JSON.stringify({...DS.attempt(),timer:0}));
 for(const [width,height] of [[667,375],[375,667],[412,924],[924,412],[412,924]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  assert.equal(await page.evaluate(()=>JSON.stringify({...DS.attempt(),timer:0})),state);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight));
  assert.ok(await page.locator('[data-action="check"]').isVisible());
  report.rotations.push({width,height,result:'PASS'});
 }
 const snapshot=await page.evaluate(()=>{DS.persist();return JSON.parse(JSON.stringify(DS.attempt()));});
 await page.reload();await tap('continue');
 assert.deepEqual(await page.evaluate(()=>DS.attempt().placements),snapshot.placements);
 assert.equal(await page.evaluate(()=>DS.attempt().hintsUsed),snapshot.hintsUsed);
 assert.deepEqual(await page.evaluate(()=>DS.attempt().notes),snapshot.notes);
 assert.ok(await page.evaluate(()=>DS.attempt().timer)>=snapshot.timer);report.reload='PASS';
 await tap('back');
 // This measures game render work on the test computer, not frame rate on a physical phone.
 await page.evaluate(()=>{window.renderTimes=[];const render=DS.ui.render.bind(DS.ui);DS.ui.render=()=>{const start=performance.now();render();renderTimes.push(performance.now()-start);};});
 const ids=await page.evaluate(()=>DS.puzzles.map(p=>p.id));
 for(const id of ids){await page.locator(`[data-action="open"][data-id="${id}"]`).tap();if(await page.locator('[data-action="start"]').count())await tap('start');await tap('back');}
 const times=await page.evaluate(()=>renderTimes);
 report.renderWork={samples:times.length,maxMilliseconds:Math.round(Math.max(...times)*100)/100,meanMilliseconds:Math.round(times.reduce((a,b)=>a+b,0)/times.length*100)/100};
 assert.deepEqual(report.errors,[]);report.result='PASS';console.log(JSON.stringify(report,null,2));
}finally{fs.writeFileSync('reports/phone-release-browser.json',JSON.stringify(report,null,2));await browser.close();}
