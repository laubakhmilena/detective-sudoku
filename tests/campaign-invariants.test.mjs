import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const ctx=vm.createContext({console});for(const file of ['game.js','campaign/stories.js','campaign/engine.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const api=ctx.__campaignTestApi;
let checked=0,alternatives=0;
for(const ch of api.chapters){vm.runInContext(`campaignView.chapter=${ch.id};chapterProgress(${ch.id}).evidence=${JSON.stringify(ch.cases.slice(0,9).map(e=>e.evidenceId))}`,ctx);
for(const entry of ch.cases){
 const saved={placements:{},order:[],answers:{},path:[],fields:[],refs:{}};
 if(entry.grid)saved.placements=JSON.parse(JSON.stringify(entry.grid.solution));
 else if(['timeline','custody','links'].includes(entry.mechanic))saved.order=['0','1','2','3'];
 else if(entry.mechanic==='testimony')saved.answers={0:'Опровергнуто',1:'Подтверждено'};
 else if(entry.mechanic==='compare')saved.fields=Array.from(ch.document.changed);
 else if(entry.mechanic==='route'){const paths=vm.runInContext(`campaignRoutes(campaignChapters.find(c=>c.id===${ch.id}))`,ctx);for(const route of paths){saved.path=route.split(' → ');assert.equal(api.valid(ch,entry,saved),true);alternatives++}}
 else {const parts=vm.runInContext(`campaignParts(campaignChapters.find(c=>c.id===${ch.id}))`,ctx);for(const part of parts){saved.answers[part.id]=part.answer;saved.refs[part.id]=String(part.ref)}saved.refs.method='9';saved.refs.object='9';assert.equal(api.valid(ch,entry,saved),true,'alternative evidence');}
 assert.equal(api.valid(ch,entry,JSON.parse(JSON.stringify(saved))),true,`${ch.id}/${entry.number} serialized solution`);
 const wrong=JSON.parse(JSON.stringify(saved));
 if(entry.grid){const keys=Object.keys(wrong.placements);[wrong.placements[keys[0]],wrong.placements[keys[1]]]=[wrong.placements[keys[1]],wrong.placements[keys[0]]];}
 else if(wrong.order.length)[wrong.order[0],wrong.order[1]]=[wrong.order[1],wrong.order[0]];
 else if(entry.mechanic==='compare')wrong.fields=ch.document.labels.map((_,i)=>i).filter(i=>!saved.fields.includes(i));
 else if(entry.mechanic==='route')wrong.path=[ch.route.start,ch.route.end];
 else if(entry.mechanic==='testimony')wrong.answers[0]='Подтверждено';
 else wrong.refs.who='2';
 assert.equal(api.valid(ch,entry,wrong),false,`${ch.id}/${entry.number} rejects wrong nonempty`);checked++;
}
vm.runInContext(`campaignView.caseIndex=9;campaignView.screen='result';handleCampaignAction({dataset:{action:'campaign-next'}});handleCampaignAction({dataset:{action:'campaign-next'}});`,ctx);
assert.equal(vm.runInContext(`chapterProgress(${ch.id}).completed.length`,ctx),1,'duplicate final award');
}
console.log(`${checked} mechanisms: correct, nonempty wrong, serialized states PASS; ${alternatives} valid routes; alternative final evidence and duplicate completion PASS`);
