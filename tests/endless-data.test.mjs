import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
for(const file of ['js/puzzle-engine.js','data/puzzles.js','data/translations.js','js/localization.js','js/endless-generator.js','js/save-system.js'])vm.runInThisContext(fs.readFileSync(file,'utf8'),{filename:file});
const D=DS,report={tested:0,unique:0,maxGenerationMs:0,plans:new Set(),cases:[]};
for(let seed=1;seed<=300;seed++){
 const tier=1+seed%3,start=performance.now(),p=D.generateEndless(seed,13+seed,tier),ms=performance.now()-start;
 const result=D.engine.solve(p);assert.equal(result.count,1);assert.equal(result.truncated,false);assert.ok(D.engine.valid(p,p.solution));assert.equal(D.engine.killer(p,p.solution),p.killerId);
 assert.equal(new Set(p.rooms.flatMap(r=>r.cells)).size,p.size*p.size);assert.equal(new Set(p.suspects.map(s=>s.name.ru)).size,p.size);
 for(const s of p.suspects){assert.ok(s.rules.length);assert.ok(s.clueText.ru.length&&s.clueText.en.length);assert.ok(!/undefined|NaN/.test(s.clueText.ru+s.clueText.en));}
 assert.ok(p.hints.every(h=>h.ru.length&&h.en.length));
 report.plans.add(JSON.stringify([p.size,p.rooms.map(r=>r.cells),p.objects.map(o=>[o.type,o.row,o.col])]));report.tested++;report.unique++;report.maxGenerationMs=Math.max(report.maxGenerationMs,ms);
 if(seed<=3){assert.deepEqual(D.generateEndless(seed,13+seed,tier),p);report.cases.push({id:p.id,size:p.size,rules:D.engine.rules(p).length});}
}
assert.ok(report.plans.size>250,'Different plans, not a catalog of identical reskins');
const puzzle=D.generateEndless(44,13,2),attempt=D.save.freshAttempt();attempt.placements={...puzzle.solution};attempt.timer=54321;attempt.mistakes=3;attempt.hintsUsed=2;attempt.hintIndex=2;attempt.notes={0:1};
const raw={saveVersion:3,solvedPuzzleIds:D.puzzles.map(p=>p.id),currentMode:'endless',currentPuzzleId:puzzle.id,endless:{version:1,seed:44,number:13,tier:2,solved:0,recent:[],attempt},attempts:{bookshop:{...D.save.freshAttempt(),timer:1111}},settings:{sound:false,volume:.25,language:'ru'}};
D.endless={current:puzzle};D.progress=D.save.normalize(raw);assert.equal(D.progress.currentMode,'endless');assert.deepEqual(D.progress.endless.attempt,attempt);assert.equal(D.progress.attempts.bookshop.timer,1111);assert.equal(D.progress.settings.volume,.25);
D.platform={save(){},flush(){}};D.save.complete(puzzle,D.progress.endless.attempt);D.save.complete(puzzle,D.progress.endless.attempt);assert.equal(D.progress.totalSolved,12);assert.equal(D.progress.endless.solved,1);
const replay=D.save.freshAttempt();replay.placements={...puzzle.solution};D.progress.endless.attempt=replay;D.save.complete(puzzle,replay);assert.equal(D.progress.endless.solved,1,'Replaying the same generated case is not a new solve');
assert.equal(D.save.normalize({...raw,solvedPuzzleIds:[]}).endless,null,'Endless remains locked');
assert.equal(D.save.normalize({...raw,endless:{...raw.endless,seed:-1}}).endless,null,'Invalid seed discarded');
report.distinctPlans=report.plans.size;delete report.plans;report.persistence=report.noDuplicateRewards=report.lock='PASS';report.result='PASS';fs.writeFileSync('reports/endless-data.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
