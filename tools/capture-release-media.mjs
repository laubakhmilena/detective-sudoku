import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),bundle=path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
let pw,sharp;try{pw=require('playwright');}catch{pw=require(path.join(bundle,'playwright'));}try{sharp=require('sharp');}catch{sharp=require(path.join(bundle,'sharp'));}
const output=path.resolve('Подготовка релиза/Материалы'),url=pathToFileURL(path.resolve('build/independent/index.html')).href;
fs.mkdirSync(output,{recursive:true});
const report={method:'Actual packaged game, browser UI clicks/taps, direct viewport capture; no gameplay image compositing or save injection',screenshots:[],videos:[],errors:[],physicalDevices:'NOT TESTED'};
const browser=await pw.chromium.launch({channel:'chrome',headless:true});
const modes=[{name:'Компьютер',folder:'Компьютер',width:1920,height:1080,scale:1,mobile:false},{name:'Телефон вертикально',folder:'Телефон вертикально',width:360,height:640,scale:3,mobile:true},{name:'Телефон горизонтально',folder:'Телефон горизонтально',width:640,height:360,scale:3,mobile:true}];
const sceneNames={bookshop:'Книжная лавка',museum:'Закрытая экспозиция',laboratory:'Опыт после полуночи'};
try{
 for(const mode of modes){
  const context=await browser.newContext({viewport:{width:mode.width,height:mode.height},deviceScaleFactor:mode.scale,hasTouch:mode.mobile,isMobile:mode.mobile,locale:'ru-RU'});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await page.locator('[data-action="catalog"]').click();
  for(const id of ['bookshop','museum','laboratory']){
   await page.locator(`[data-action="open"][data-id="${id}"]`).click();await page.locator('[data-action="start"]').click();
   const positions=await page.evaluate(()=>Object.entries(DS.currentPuzzle().solution).slice(0,3));
   for(const [person,cell] of positions){await page.locator(`[data-action="person"][data-id="${person}"]`).click();await page.locator(`[data-cell="${cell}"]`).click();}
   await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));await page.waitForTimeout(100);
   const file=path.join(output,'Скриншоты',mode.folder,`${sceneNames[id]}.png`);fs.mkdirSync(path.dirname(file),{recursive:true});
   // Export RGB PNG24 without changing the captured pixels or adding a frame.
   const png=await page.screenshot();await sharp(png).removeAlpha().png().toFile(file);const meta=await sharp(file).metadata();
   assert.equal(meta.channels,3);assert.ok(Math.max(meta.width,meta.height)>=1280&&Math.max(meta.width,meta.height)<=2560);assert.ok(meta.width*9===meta.height*16||meta.width*16===meta.height*9);
   report.screenshots.push({file:path.relative(output,file).replaceAll('\\','/'),width:meta.width,height:meta.height,format:'PNG24',sourceViewport:[mode.width,mode.height],deviceScaleFactor:mode.scale,result:'PASS'});
   await page.locator('[data-action="back"]').click();
  }
  await context.close();
 }
 for(const mode of modes){
  // Real mobile layout is rendered at CSS phone resolution. CDP captures its device pixels.
  const scale=mode.mobile?2:1,width=mode.mobile?mode.width*scale:1280,height=mode.mobile?mode.height*scale:720;
  const context=await browser.newContext({viewport:{width:mode.mobile?mode.width:1280,height:mode.mobile?mode.height:720},deviceScaleFactor:scale,hasTouch:mode.mobile,isMobile:mode.mobile,locale:'ru-RU'});
  const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto(url);await page.locator('[data-action="catalog"]').click();await page.locator('[data-action="open"][data-id="bookshop"]').click();await page.locator('[data-action="start"]').click();
  const recordPage=await browser.newPage({viewport:{width,height}});await recordPage.goto('about:blank');
  await recordPage.evaluate(({width,height})=>{
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;document.body.append(canvas);window.recCanvas=canvas;window.recCtx=canvas.getContext('2d');window.latestFrame=null;
   window.drawTimer=setInterval(()=>{if(latestFrame)recCtx.drawImage(latestFrame,0,0,width,height);},1000/30);
   window.chunks=[];window.recorder=new MediaRecorder(canvas.captureStream(30),{mimeType:'video/mp4;codecs=avc1.42001E',videoBitsPerSecond:5000000});recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
  },{width,height});
  const cdp=await context.newCDPSession(page);let pending=Promise.resolve(),frameCount=0;
  cdp.on('Page.screencastFrame',event=>{frameCount++;pending=pending.then(()=>recordPage.evaluate(data=>new Promise(resolve=>{const img=new Image();img.onload=()=>{window.latestFrame=img;recCtx.drawImage(img,0,0,recCanvas.width,recCanvas.height);resolve();};img.onerror=resolve;img.src='data:image/jpeg;base64,'+data;}),event.data)).catch(()=>{});cdp.send('Page.screencastFrameAck',{sessionId:event.sessionId}).catch(()=>{});});
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:95,maxWidth:width,maxHeight:height,everyNthFrame:1});
  await page.waitForTimeout(400);await pending;await recordPage.evaluate(()=>{window.recordStarted=performance.now();recorder.start(1000);});
  const positions=await page.evaluate(()=>Object.entries(DS.currentPuzzle().solution));
  await page.waitForTimeout(1800);
  for(const [person,cell] of positions.slice(0,2)){await page.locator(`[data-action="person"][data-id="${person}"]`).click();await page.waitForTimeout(800);await page.locator(`[data-cell="${cell}"]`).click();await page.waitForTimeout(1000);}
  await page.locator('[data-action="notes"]').click();await page.locator('[data-cell="2"]').click();await page.waitForTimeout(1300);await page.locator('[data-action="notes"]').click();
  await page.locator('[data-action="hint"]').click();await page.waitForTimeout(2400);await page.locator('.modal-close').click();
  for(const [person,cell] of positions.slice(2)){await page.locator(`[data-action="person"][data-id="${person}"]`).click();await page.waitForTimeout(700);await page.locator(`[data-cell="${cell}"]`).click();await page.waitForTimeout(800);}
  await page.waitForTimeout(1800);await page.locator('[data-action="check"]').click();await page.waitForTimeout(2000);
  await cdp.send('Page.stopScreencast');await pending;
  const video=await recordPage.evaluate(()=>new Promise(resolve=>{recorder.onstop=async()=>{clearInterval(drawTimer);const blob=new Blob(chunks,{type:'video/mp4'});const player=document.createElement('video');player.src=URL.createObjectURL(blob);player.preload='metadata';player.onloadedmetadata=async()=>{const duration=player.duration;const bytes=new Uint8Array(await blob.arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));resolve({data:btoa(binary),duration,wallSeconds:(performance.now()-recordStarted)/1000,width:player.videoWidth,height:player.videoHeight});};};recorder.stop();}));
  const bytes=Buffer.from(video.data,'base64'),file=path.join(output,'Видео',`${mode.folder}.mp4`);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,bytes);
  assert.ok(video.duration>0&&video.duration<=28,JSON.stringify({...video,data:undefined}));assert.ok(bytes.length<100*1024*1024);assert.equal(video.width,width);assert.equal(video.height,height);assert.ok(frameCount>8);
  report.videos.push({file:path.relative(output,file).replaceAll('\\','/'),width,height,codec:'H.264 / AVC',duration:Math.round(video.duration*100)/100,bytes:bytes.length,frameCount,format:'MP4',audio:'silent',result:'PASS'});
  // Reopen the delivered file to verify it decodes outside the recorder page.
  await recordPage.goto(pathToFileURL(file).href);await recordPage.waitForSelector('video');await recordPage.locator('video').evaluate(video=>new Promise(resolve=>{if(video.readyState>=2)return resolve();video.onloadeddata=resolve;}));
  assert.equal(await recordPage.locator('video').evaluate(video=>video.videoWidth),width);await recordPage.locator('video').evaluate(video=>{video.currentTime=5;});await recordPage.waitForTimeout(300);
  await recordPage.close();await context.close();console.log(mode.name,'video PASS',report.videos.at(-1).duration+'s');
 }
 assert.deepEqual(report.errors,[]);report.result='PASS';console.log('9 actual screenshots and 3 actual gameplay MP4 videos PASS');
}finally{fs.writeFileSync(path.join(output,'Проверка захвата.json'),JSON.stringify(report,null,2));await browser.close();}
