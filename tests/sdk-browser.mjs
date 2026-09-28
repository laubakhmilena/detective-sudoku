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
const server=createServer((req,res)=>{const filename=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));try{res.setHeader('Content-Type',filename.endsWith('.js')?'text/javascript':filename.endsWith('.css')?'text/css':filename.endsWith('.svg')?'image/svg+xml':filename.endsWith('.html')?'text/html':'application/octet-stream');res.end(fs.readFileSync(filename))}catch{res.statusCode=404;res.end()}});
await new Promise(r=>server.listen(4176,'127.0.0.1',r));
let browser;
try {
 browser=await chromium.launch({channel:'chrome',headless:true});
 const context=await browser.newContext();
 await context.route('**/sdk.js',route=>route.fulfill({contentType:'text/javascript',body:`
 window.mock={events:[],handlers:{},writes:[]};
 window.YaGames={init:async()=>({environment:{i18n:{lang:'en'}},
 features:{LoadingAPI:{ready(){mock.events.push(['ready',!!document.querySelector('[data-action="home-play"]')])}},GameplayAPI:{start(){mock.events.push(['start'])},stop(){mock.events.push(['stop'])}}},
 on(name,fn){mock.handlers[name]=fn},getPlayer:async()=>({getData:async()=>({detectiveSave:{version:1,revision:1,data:{'detective-sudoku-audio-v1':'off'}}}),setData:async(data,flush)=>mock.writes.push({data,flush})})})};`}));
 const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4176/?yandex');
 await page.waitForSelector('[data-action="home-play"]');
 await page.waitForFunction(()=>mock.events.some(e=>e[0]==='ready'));
 assert.deepEqual(await page.evaluate(()=>mock.events.filter(e=>e[0]==='ready')),[['ready',true]]);
 assert.equal(await page.evaluate(()=>GamePlatform.status.language),'en');
 assert.equal(await page.evaluate(()=>localStorage.getItem('detective-sudoku-audio-v1')),'off');
 assert.equal(await page.evaluate(()=>document.documentElement.lang),'ru');
 const action=async(a)=>page.locator(`[data-action="${a}"]:visible`).first().click();
 await action('home-play');await action('open-chapter');await action('open-case');await action('start-case');
 assert.ok(await page.evaluate(()=>mock.events.some(e=>e[0]==='start')));
 const before=await page.evaluate(()=>state.elapsed);
 await page.evaluate(()=>mock.handlers.game_api_pause());await page.waitForTimeout(1200);
 assert.equal(await page.evaluate(()=>state.elapsed),before);
 assert.ok(await page.evaluate(()=>GamePlatform.paused()));
 await page.evaluate(()=>mock.handlers.game_api_resume());await page.waitForTimeout(1200);
 assert.ok(await page.evaluate(()=>state.elapsed)>before);
 assert.equal(await page.evaluate(()=>document.getElementById('game-root').dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,cancelable:true}))),false);
 await page.evaluate(()=>{saveActiveState();GamePlatform.flush()});await page.waitForTimeout(100);
 const saved=await page.evaluate(()=>mock.writes[0]);assert.equal(saved.flush,true);
 assert.ok(JSON.parse(saved.data.detectiveSave.data['detective-sudoku-progress-v1']).active);
 await page.evaluate(()=>{for(let i=0;i<30;i++){GamePlatform.changed();GamePlatform.flush()}});
 assert.equal(await page.evaluate(()=>mock.writes.length),1);
 await page.evaluate(()=>window.dispatchEvent(new Event('blur')));assert.equal(await page.evaluate(()=>GamePlatform.paused()),true);
 await page.evaluate(()=>window.dispatchEvent(new Event('focus')));assert.equal(await page.evaluate(()=>GamePlatform.paused()),false);
 assert.deepEqual(errors,[]);
 // A failed cloud read must never overwrite an unknown remote save.
 const failed=await context.newPage();await failed.route('**/sdk.js',route=>route.fulfill({contentType:'text/javascript',body:`window.writes=0;window.YaGames={init:async()=>({environment:{i18n:{lang:'ru'}},on(){},getPlayer:async()=>({getData:async()=>{throw Error('offline')},setData:async()=>writes++})})}`}));
 await failed.goto('http://127.0.0.1:4176/?yandex');await failed.waitForSelector('[data-action="home-play"]');
 await failed.evaluate(()=>{GamePlatform.changed();GamePlatform.flush()});assert.equal(await failed.evaluate(()=>writes),0);
 const unavailable=await context.newPage();await unavailable.route('**/sdk.js',route=>route.abort());
 await unavailable.goto('http://127.0.0.1:4176/?yandex');await unavailable.waitForSelector('[data-action="home-play"]');
 assert.equal(await unavailable.evaluate(()=>GamePlatform.status.sdk),'unavailable');
 console.log('PASS: SDK initialization, GRA once after menu, SDK language, cloud restoration/write/throttle/read failure protection, gameplay events, platform/focus pause, context menu, no JS errors. Mock SDK only.');
} finally {await browser?.close();await new Promise(r=>server.close(r));}
