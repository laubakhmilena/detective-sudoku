import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
let pw;try{pw=require('playwright');}catch{pw=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
const report={seats:[],onObjectClues:[],conflicts:[],errors:[]};
const output=path.resolve('screenshots/seating');fs.mkdirSync(output,{recursive:true});
try{
 const page=await browser.newPage({viewport:{width:1024,height:768},locale:'ru-RU'});
 page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve(process.env.BUILT?'build/independent/index.html':'index.html')).href);
 await page.locator('[data-action="catalog"]').click();
 await page.locator('[data-action="open"][data-id="bookshop"]').click();await page.locator('[data-action="start"]').click();
 // Reproduce the reported rejection: Boris temporarily occupies Anna's row.
 await page.locator('[data-action="person"][data-id="s1"]').click();await page.locator('[data-cell="3"]').click();
 await page.locator('[data-action="person"][data-id="s0"]').click();await page.locator('[data-cell="0"]').click();
 const originalMessage=await page.locator('.modal').innerText();
 if(process.env.REPRO_ONLY){
  await page.screenshot({path:path.join(output,'before-conflict.png')});
  console.log(JSON.stringify({chairAllowed:await page.evaluate(()=>DS.engine.canOccupy(DS.currentPuzzle(),0)),reproducedMessage:originalMessage}));
 }else{
  assert.match(originalMessage,/Борис/);assert.match(originalMessage,/строк/);assert.match(originalMessage,/всего поля/);assert.doesNotMatch(originalMessage,/персонажа:|Здесь можно/);
  report.conflicts.push({type:'row',result:'PASS'});await page.screenshot({path:path.join(output,'after-conflict.png')});
  await page.locator('.modal-close').click();await page.locator('[data-action="undo"]').click();
  // Anna may occupy the chair, including when the click lands on the drawing.
  const clickFurniture=async(cell)=>{
   const tile=page.locator(`[data-cell="${cell}"]`),a=await tile.boundingBox(),b=await tile.locator('.object-hit').boundingBox();
   await tile.click({position:{x:b.x+b.width/2-a.x,y:b.y+b.height/2-a.y}});
  };
  await clickFurniture(0);assert.equal(await page.evaluate(()=>DS.attempt().placements.s0),0);
  await page.reload();await page.locator('[data-action="continue"]').click();assert.equal(await page.evaluate(()=>DS.attempt().placements.s0),0);report.annaReload='PASS';
  for(const [width,height] of [[375,667],[667,375],[1024,768],[1920,1080]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
   assert.equal(await page.locator('[data-cell="0"] .marker').count(),1);await page.screenshot({path:path.join(output,`anna-${width}x${height}.png`)});
  }
  await page.locator('[data-action="undo"]').click();
  // Column conflict has a distinct explanation, and does not delete either attempt.
  await page.locator('[data-action="person"][data-id="s1"]').click();await page.locator('[data-cell="5"]').click();
  await page.locator('[data-action="person"][data-id="s0"]').click();await clickFurniture(0);
  assert.match(await page.locator('.modal').innerText(),/Борис/);assert.match(await page.locator('.modal').innerText(),/столбц/);
  await page.locator('.modal-close').click();await page.locator('[data-action="undo"]').click();report.conflicts.push({type:'column',result:'PASS'});
  // Choosing a person explicitly leaves the notes tool.
  await page.locator('[data-action="notes"]').click();await page.locator('[data-action="person"][data-id="s0"]').click();await clickFurniture(0);
  assert.equal(await page.evaluate(()=>DS.attempt().placements.s0),0);assert.equal(await page.evaluate(()=>DS.uiState.notes),false);report.notesToPlacement='PASS';
  await page.locator('[data-action="undo"]').click();
  await page.locator('[data-cell="9"]').click();assert.match(await page.locator('.modal').innerText(),/кассовая стойка/);await page.locator('.modal-close').click();report.solidFurnitureBlocked='PASS';
  const levels=await page.evaluate(()=>DS.puzzles.map(p=>({id:p.id,objects:p.objects.filter(o=>DS.engine.canOccupyObject(o)),on:DS.engine.rules(p).filter(r=>r.type==='ON_OBJECT')})));
  for(const p of levels){
   await page.locator('[data-action="back"]').click();await page.locator(`[data-action="open"][data-id="${p.id}"]`).click();
   if(await page.locator('[data-action="start"]').count())await page.locator('[data-action="start"]').click();
   const size=await page.evaluate(()=>DS.currentPuzzle().size);
   for(const o of p.objects){
    const subject=p.on.find(r=>r.object===o.id)?.subject||'s0',cell=o.row*size+o.col;
    await page.locator(`[data-action="person"][data-id="${subject}"]`).click();await clickFurniture(cell);
    assert.equal(await page.locator('.modal').count(),0,`${p.id}/${o.id}: seat rejected`);
    assert.equal(await page.evaluate(id=>DS.attempt().placements[id],subject),cell);
    report.seats.push({level:p.id,object:o.id,result:'PASS'});
    if(p.on.some(r=>r.object===o.id)){
     assert.equal(await page.evaluate(id=>DS.engine.rules(DS.currentPuzzle()).filter(r=>r.type==='ON_OBJECT'&&r.object===id).every(r=>DS.engine.evaluate(DS.currentPuzzle(),r,DS.attempt().placements)),o.id),true);
     report.onObjectClues.push({level:p.id,object:o.id,result:'PASS'});
    }
    await page.locator('[data-action="undo"]').click();
   }
  }
  assert.deepEqual(report.errors,[]);report.result='PASS';
  fs.writeFileSync('reports/seating-browser.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }
}finally{await browser.close();}
