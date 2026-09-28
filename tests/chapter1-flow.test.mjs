import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../game.js',import.meta.url),'utf8');
const storage = new Map();
let interval;
function load() {
 const context = vm.createContext({console, localStorage:{ getItem:k=>storage.get(k)||null, setItem:(k,v)=>storage.set(k,v)}, window:{setTimeout:()=>1,setInterval:fn=>{interval=fn},addEventListener:()=>{}}, document:{getElementById:()=>null,readyState:'loading',addEventListener:()=>{},hidden:false}});
 vm.runInContext(source,context); return context;
}
let ctx=load(); const run=code=>vm.runInContext(code,ctx);
for(let number=1;number<=12;number++) {
 run(`openCase(cases[${number-1}].id); startCurrentCase(); useHint(); useHint(); state.elapsed=17; saveActiveState();`);
 const render=run('renderCase(activeCase())'); assert.ok(render.includes('Карта особняка'));
 if(number!==1 && number!==2 && number!==5) {
  run('verifyCurrentCase()'); assert.equal(run('state.errors'),1);
  ctx=load(); run('resumeInvestigation(); startCurrentCase()'); assert.equal(run('state.errors'),1);
 }
 assert.equal(run('state.hints'),2); assert.equal(run('state.elapsed'),17);
 run(`{
 const entry=activeCase(), p=entry.puzzleData, id=entry.id;
 if(entry.mechanic==='grid') state.placements=clone(entry.solution);
 if(entry.mechanic==='timeline') state.progress.timelineState[id]={order:clone(p.solution)};
 if(entry.mechanic==='itemChain') state.progress.itemChainState[id]=clone(entry.solution);
 if(entry.mechanic==='route') state.progress.routeState[id]=p.mode==='discoverPassage'?{path:clone(entry.solution.path)}:{choices:clone(entry.solution.possible)};
 if(entry.mechanic==='documentCompare') state.progress.documentState[id]=p.mode==='fragment'?clone(entry.solution):{choices:clone(entry.solution),order:clone(entry.solution.order || [])};
 if(entry.mechanic==='finance') {state.progress.financeState[id]={order:clone(p.finance.solution)};state.placements=clone(entry.solution.grid)};
 if(entry.mechanic==='reconstruction') state.progress.reconstructionState[id]={choices:clone(entry.solution),evidence:clone(entry.solution.evidence),sequence:clone(entry.solution.sequence)};
 saveActiveState(); }`);
 ctx=load();run('resumeInvestigation(); startCurrentCase(); verifyCurrentCase()');
 assert.equal(run('state.screen'),'result',`case ${number}`);
 ctx=load();run('resumeInvestigation()');assert.equal(run('state.screen'),'result');
 run('completeCurrentCase(); completeCurrentCase()');assert.equal(run('state.progress.completedCases.length'),number);
 assert.equal(run('new Set(state.progress.completedCases).size'),number);
 console.log(`case ${number}: solve, hints, state reload, result reload, duplicate completion OK`);
}
assert.equal(run('state.screen'),'complete');
assert.ok(run('state.progress.unlockedEvidence.includes("source-3") && state.progress.unlockedEvidence.includes("source-11")'));
console.log('Full chapter passed');
