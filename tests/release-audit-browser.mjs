import {createRequire} from 'node:module';import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url);let pw;try{pw=require('playwright');}catch{pw=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));}
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
const report={responsive:[],endless:{},audio:{},errors:[],source:'Packaged file:// build, automated Chrome',liveYandex:'NOT TESTED'};
const out=path.resolve('screenshots/release-audit');fs.mkdirSync(out,{recursive:true});
try{
 const context=await browser.newContext({locale:'ru-RU',hasTouch:true});
 await context.addInitScript(()=>{
  window.soundAudit={contexts:0,starts:0,suspends:0,gains:[]};const Native=window.AudioContext;
  window.AudioContext=class extends Native{constructor(...args){super(...args);soundAudit.contexts++;const create=this.createOscillator.bind(this);this.createOscillator=()=>{const oscillator=create(),start=oscillator.start.bind(oscillator);oscillator.start=(...a)=>{soundAudit.starts++;return start(...a);};return oscillator;};const gain=this.createGain.bind(this);this.createGain=()=>{const node=gain(),set=node.gain.setValueAtTime.bind(node.gain);node.gain.setValueAtTime=(v,t)=>{soundAudit.gains.push(v);return set(v,t);};return node;};}suspend(){soundAudit.suspends++;return super.suspend();}};
 });
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve('build/independent/index.html')).href);await page.locator('[data-action="catalog"]').click();
 const start=async()=>{if(await page.locator('[data-action="start"]').count())await page.locator('[data-action="start"]').click();};
 const measure=async()=>{await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));return page.evaluate(()=>{
  const b=e=>e.getBoundingClientRect(),board=b(document.querySelector('.board')),issues=[];
  if(document.documentElement.scrollHeight>innerHeight+1||document.documentElement.scrollWidth>innerWidth+1)issues.push('page overflow');
  for(const e of document.querySelectorAll('.board,.topbar,.timer,.participants,.active-clue,.actions,.actions button,.game-panel .person')){const r=b(e);if(r.x<-.5||r.y<-.5||r.right>innerWidth+.5||r.bottom>innerHeight+.5)issues.push('outside '+e.className);}
  for(const selector of ['.participants','.active-clue','.actions']){const r=b(document.querySelector(selector));if(Math.min(r.right,board.right)-Math.max(r.x,board.x)>1&&Math.min(r.bottom,board.bottom)-Math.max(r.y,board.y)>1)issues.push('overlap '+selector);}
  for(const e of document.querySelectorAll('.person-clue')){if(getComputedStyle(e).display==='none')continue;const r=b(e),parent=b(e.closest('.person'));if(r.bottom>parent.bottom+1||e.scrollWidth>e.clientWidth+1)issues.push('clue outside '+e.textContent);}
  for(const e of document.querySelectorAll('.marker small,.room-label')){const r=b(e);if(r.x<board.x-1||r.right>board.right+1||r.bottom>board.bottom+1)issues.push('label outside '+e.textContent);}
  const timer=b(document.querySelector('.timer')),settings=b(document.querySelector('.topbar>[data-action="settings"]'));if(timer.right>settings.x)issues.push('timer overlap');
  return {issues,board:Math.round(board.width),clueFont:getComputedStyle(document.querySelector('.person-clue')).display==='none'?getComputedStyle(document.querySelector('.clue-text')).fontSize:getComputedStyle(document.querySelector('.person-clue')).fontSize,timerFont:getComputedStyle(document.querySelector('.timer')).fontSize};
 });};
 const sizes=[[320,568],[360,640],[375,667],[412,924],[427,952],[568,320],[640,360],[667,375],[882,344],[924,412],[952,427],[768,1024],[1024,768],[1080,1920],[1366,768],[1920,1080],[2560,1440],[3840,2160]];
 for(const lang of ['ru','en']){
  await page.locator('[data-action="settings"]').click();await page.selectOption('#language',lang);await page.locator('.modal-close').click();
  for(const [width,height] of sizes){
   await page.setViewportSize({width,height});let failures=[],fonts=[];
   for(const id of ['bookshop','cafe','garden','antiques','hotel','station','gallery','theatre','yacht','museum','resort','laboratory']){
    await page.locator(`[data-action="open"][data-id="${id}"]`).click();await start();
    // UI regression fixtures place every marker, including edge/corner occupants.
    await page.evaluate(()=>{DS.attempt().placements={...DS.currentPuzzle().solution};DS.ui.render();});
    await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
    const m=await measure();failures.push(...m.issues.map(issue=>id+': '+issue));fonts.push(m);
    if(lang==='ru'&&['bookshop','laboratory'].includes(id)&&[[375,667],[667,375],[1080,1920],[1920,1080],[3840,2160]].some(([w,h])=>w===width&&h===height))await page.screenshot({path:path.join(out,`${id}-${width}x${height}.png`)});
    const before=await page.locator('.board').boundingBox();await page.locator('[data-action="hint"]').click();assert.deepEqual(await page.locator('.board').boundingBox(),before);await page.locator('.modal-close').click();assert.deepEqual(await page.locator('.board').boundingBox(),before);
    await page.locator('[data-action="back"]').click();
   }
   report.responsive.push({lang,width,height,result:failures.length?'FAIL':'PASS',failures,clueFont:fonts[0].clueFont,timerFont:fonts[0].timerFont,boardRange:[Math.min(...fonts.map(m=>m.board)),Math.max(...fonts.map(m=>m.board))]});
  }
 }
 // Locked mode is protected by the handler.
 await page.locator('[data-action="endless"]').click();assert.equal(await page.locator('[data-action="start-endless"]').count(),0);await page.locator('.modal-close').click();report.endless.lock='PASS';
 await page.evaluate(()=>{DS.progress.solvedPuzzleIds=DS.puzzles.map(p=>p.id);DS.persist();DS.ui.render();});
 await page.locator('[data-action="endless"]').click();await page.selectOption('#endless-tier','3');await page.locator('[data-action="start-endless"]').click();await page.locator('[data-action="start"]').waitFor();await start();
 const seed=await page.evaluate(()=>DS.progress.endless.seed),original=await page.evaluate(()=>JSON.stringify(DS.currentPuzzle()));
 await page.locator('[data-action="hint"]').click();await page.locator('.modal-close').click();
 await page.evaluate(()=>{DS.attempt().mistakes=2;DS.attempt().timer=12000;DS.attempt().placements={[DS.currentPuzzle().suspects[0].id]:DS.currentPuzzle().solution.s0};DS.persist();DS.ui.render();});
 await page.reload();await page.locator('[data-action="continue"]').click();assert.equal(await page.evaluate(()=>DS.progress.endless.seed),seed);assert.equal(await page.evaluate(()=>JSON.stringify(DS.currentPuzzle())),original);assert.equal(await page.evaluate(()=>DS.attempt().mistakes),2);assert.equal(await page.evaluate(()=>DS.attempt().hintsUsed),1);assert.ok(await page.evaluate(()=>DS.attempt().timer)>=12000);report.endless.reload='PASS';
 for(const [width,height] of [[375,667],[667,375],[412,924],[924,412],[1920,1080]]){await page.setViewportSize({width,height});const m=await measure();assert.deepEqual(m.issues,[],JSON.stringify({width,height,m}));await page.screenshot({path:path.join(out,`endless-${width}x${height}.png`)});}
 await page.evaluate(()=>{DS.attempt().placements={...DS.currentPuzzle().solution};DS.ui.render();});await page.locator('[data-action="check"]').click();const killer=await page.evaluate(()=>DS.currentPuzzle().killerId);await page.locator(`[data-action="accuse"][data-id="${killer}"]`).click();assert.equal(await page.evaluate(()=>DS.progress.totalSolved),12);assert.equal(await page.evaluate(()=>DS.progress.endless.solved),1);report.endless.complete='PASS';
 await page.locator('[data-action="next-endless"]').click();await page.locator('[data-action="start"]').waitFor();await start();assert.equal(await page.evaluate(()=>DS.currentPuzzle().number),14);assert.equal(await page.evaluate(()=>DS.attempt().mistakes),0);report.endless.next='PASS';
 const places=await page.evaluate(()=>JSON.stringify(DS.attempt().placements));for(const [width,height] of [[375,667],[667,375],[375,667],[412,924],[924,412],[412,924]]){await page.setViewportSize({width,height});assert.deepEqual((await measure()).issues,[]);assert.equal(await page.evaluate(()=>JSON.stringify(DS.attempt().placements)),places);}report.endless.rotation='PASS';
 await page.locator('[data-action="settings"]').click();await page.locator('#sound').check();await page.locator('#volume').fill('25');await page.locator('#volume').dispatchEvent('change');await page.locator('[data-action="test-sound"]').click();
 const sound=await page.evaluate(()=>soundAudit);assert.ok(sound.starts>0);assert.ok(Math.abs(sound.gains.at(-1)-.055*.25)<.00001);report.audio.effectAndVolume='PASS';
 await page.locator('#sound').uncheck();assert.equal(await page.locator('[data-action="test-sound"]').isDisabled(),true);const starts=await page.evaluate(()=>soundAudit.starts);await page.evaluate(()=>DS.platform.tone());assert.equal(await page.evaluate(()=>soundAudit.starts),starts);report.audio.mute='PASS';
 await page.locator('#sound').check();await page.locator('[data-action="test-sound"]').click();await page.evaluate(()=>dispatchEvent(new Event('blur')));assert.ok(await page.evaluate(()=>soundAudit.suspends)>0);await page.evaluate(()=>dispatchEvent(new Event('focus')));report.audio.focusPause='PASS';
 await page.locator('.modal-close').click();await page.reload();await page.locator('[data-action="settings"]').click();assert.equal(await page.locator('#volume').inputValue(),'25');report.audio.settingsReload='PASS';await page.screenshot({path:path.join(out,'settings.png')});
 assert.deepEqual(report.errors,[]);if(report.responsive.some(r=>r.result==='FAIL'))process.exitCode=1;
 console.log(JSON.stringify({checks:report.responsive.length,failures:report.responsive.filter(r=>r.result==='FAIL'),endless:report.endless,audio:report.audio,errors:report.errors},null,2));
}finally{fs.writeFileSync('reports/release-audit-browser.json',JSON.stringify(report,null,2));await browser.close();}
