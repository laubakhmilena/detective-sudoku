import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
for(const file of ['js/puzzle-engine.js','data/puzzles.js','js/puzzle-validator.js','js/puzzle-deduction.js','data/translations.js','js/localization.js','js/save-system.js'])vm.runInThisContext(fs.readFileSync(file,'utf8'),{filename:file});
const D=globalThis.DS;
assert.equal(D.puzzles.length,12);
for(let tier=0;tier<5;tier++)assert.equal(D.puzzles.filter(p=>p.difficulty===tier).length,[3,2,3,2,2][tier]);
assert.equal(new Set(D.puzzles.map(p=>p.id)).size,12);
assert.ok(D.puzzles.every(p=>p.authored&&p.size>=5&&p.size<=8));
const results=D.puzzles.map(p=>D.validatePuzzle(p));
for(const p of D.puzzles){for(const lang of ['ru','en'])assert.equal(new Set(p.rooms.map(r=>r.name[lang])).size,p.rooms.length,'Unambiguous room names');for(const room of p.rooms){const todo=new Set(room.cells),seen=[room.cells[0]];todo.delete(seen[0]);for(let i=0;i<seen.length;i++){const c=seen[i],a=D.engine.rc(p,c);for(const n of [a.row?c-p.size:-1,a.row<p.size-1?c+p.size:-1,a.col?c-1:-1,a.col<p.size-1?c+1:-1])if(todo.delete(n))seen.push(n);}assert.equal(todo.size,0,'Connected room '+p.id+' '+room.id);}}
for(const r of results){console.log(`${r.id} ${r.size}x${r.size} ${r.difficulty} solutions=${r.solutions} ${r.pass?'PASS':'FAIL'} ${r.errors.join(',')}`);assert.equal(r.pass,true);}
const fixture={size:3,rooms:[{id:'a',cells:[0,1,3,4]},{id:'b',cells:[2,5,6,7,8]}],objects:[{id:'table',row:0,col:0,occupiable:false},{id:'chair',row:1,col:1,occupiable:true}],suspects:[{id:'a',rules:[]},{id:'b',rules:[]}],generalClues:[]};
assert.equal(D.engine.evaluate(fixture,{type:'BESIDE_OBJECT',subject:'a',object:'table'},{a:4}),false,'diagonal is not beside');
assert.equal(D.engine.evaluate(fixture,{type:'BESIDE_OBJECT',subject:'a',object:'table'},{a:1}),true);
assert.equal(D.engine.canOccupy(fixture,0),false);assert.equal(D.engine.canOccupy(fixture,4),true);
assert.equal(D.engine.evaluate(fixture,{type:'ON_OBJECT',subject:'a',object:'chair'},{a:4}),true);
// A seat must remain usable even when an author forgets the legacy boolean.
for(const type of D.engine.seatTypes){
 const seat={id:'seat',type,row:1,col:1,occupiable:false};
 const sitting={...fixture,objects:[seat]};
 assert.equal(D.engine.canOccupyObject(seat),true,type);
 assert.equal(D.engine.canOccupy(sitting,4),true,type);
 assert.equal(D.engine.evaluate(sitting,{type:'ON_OBJECT',subject:'a',object:'seat'},{a:4}),true,type);
 assert.equal(D.engine.placementIssue(sitting,{},'a',4),null,type);
}
const furnitureAudit=[];
for(const puzzle of D.puzzles){
 const on=D.engine.rules(puzzle).filter(r=>r.type==='ON_OBJECT');
 for(const o of puzzle.objects){
  const cell=o.row*puzzle.size+o.col;
  assert.equal(D.engine.canOccupy(puzzle,cell),D.engine.canOccupyObject(o));
  if(D.engine.seatTypes.includes(o.type))assert.equal(D.engine.canOccupy(puzzle,cell),true,puzzle.id+'/'+o.id);
 }
 for(const rule of on){
  const o=puzzle.objects.find(o=>o.id===rule.object),cell=o.row*puzzle.size+o.col;
  assert.equal(puzzle.solution[rule.subject],cell,puzzle.id+'/'+rule.subject+' must sit on the object');
  const rest={...puzzle.solution};delete rest[rule.subject];
  assert.equal(D.engine.placementIssue(puzzle,rest,rule.subject,cell),null,'Correct sitting position cannot be blocked');
 }
 for(const person of puzzle.suspects)if(/\b(?:sat|sitting)\b/.test(person.clueText.en)||/сидел[аи]?\s/.test(person.clueText.ru)){
  assert.ok(on.some(r=>r.subject===person.id),'A sitting clue must use ON_OBJECT: '+puzzle.id+'/'+person.id);
 }
 const placements={};
 for(const person of puzzle.suspects){
  assert.equal(D.engine.placementIssue(puzzle,placements,person.id,puzzle.solution[person.id]),null);
  placements[person.id]=puzzle.solution[person.id];
 }
 furnitureAudit.push({id:puzzle.id,seats:puzzle.objects.filter(o=>D.engine.canOccupyObject(o)).length,sittingClues:on.length,result:'PASS'});
}
assert.equal(D.engine.placementIssue(fixture,{b:3},'a',4).type,'row');
assert.equal(D.engine.placementIssue(fixture,{b:1},'a',4).type,'column');
assert.equal(D.engine.placementIssue(fixture,{b:4},'a',4).type,'cell');
assert.equal(D.engine.placementIssue(fixture,{},'a',0).type,'object');
fs.writeFileSync('reports/furniture-audit.json',JSON.stringify(furnitureAudit,null,2));
assert.equal(D.engine.valid(fixture,{a:1,b:2}),false,'same row');
assert.equal(D.engine.valid(fixture,{a:1,b:4}),false,'same column');
const generic={...fixture,rooms:[{id:'a',cells:[0,1,2,3,4,5,6,7,8]}]};
const positive=[{type:'IN_ROOM',room:'a'},{type:'NOT_IN_ROOM',room:'b'},{type:'ROW',value:1},{type:'COLUMN',value:1},{type:'NORTH_OF',target:'b'},{type:'WEST_OF',target:'b'},{type:'BETWEEN_ROWS',min:0,max:2},{type:'BETWEEN_COLUMNS',min:1,max:2},{type:'NOT_CORNER'},{type:'NOT_BESIDE_OBJECT',object:'table'},{type:'DISTANCE',target:'b',value:2},{type:'SAME_ROOM',target:'b'},{type:'WITH_EXACTLY_ONE'}];
for(const r of positive)assert.equal(D.engine.evaluate(generic,{subject:'a',...r},{a:4,b:8}),true,r.type);
for(const type of ['SOUTH_OF','EAST_OF'])assert.equal(D.engine.evaluate(generic,{type,subject:'b',target:'a'},{a:4,b:8}),true,type);
assert.equal(D.engine.evaluate(generic,{type:'BESIDE_WALL',subject:'a'},{a:1}),true);
assert.equal(D.engine.evaluate(generic,{type:'CORNER_OF_ROOM',subject:'a',room:'a'},{a:0}),true);
assert.equal(D.engine.evaluate(fixture,{type:'NOT_SAME_ROOM',subject:'a',target:'b'},{a:4,b:8}),true);
assert.equal(D.engine.evaluate(fixture,{type:'ALONE',subject:'a'},{a:4,b:8}),true);
assert.equal(D.engine.evaluate(generic,{type:'GENERAL_RULE',rules:[{type:'ROW',subject:'a',value:1}]},{a:4}),true);
const normalized=D.save.normalize({saveVersion:2,solvedPuzzleIds:['p01'],settings:{sound:false,language:'ru',volume:.6}});assert.equal(normalized.totalSolved,0);assert.equal(normalized.unlockedPuzzleIds.length,12);assert.deepEqual(normalized.settings,{sound:false,language:'ru',volume:.6});assert.equal(normalized.currentPuzzleId,null);
const p=D.puzzles[0],attempt=D.save.freshAttempt();attempt.mistakes=3;attempt.hintIndex=2;attempt.timer=123456;const save=D.save.normalize({saveVersion:3,currentPuzzleId:p.id,attempts:{[p.id]:attempt}});assert.equal(save.attempts[p.id].timer,123456);assert.equal(save.attempts[p.id].mistakes,3);
for(const puzzle of D.puzzles){assert.equal(new Set(puzzle.suspects.map(s=>s.avatar)).size,puzzle.size);for(const s of puzzle.suspects){assert.ok(fs.existsSync(s.avatar));for(const lang of ['ru','en']){D.lang=lang;for(const r of s.rules)assert.ok(D.ruleText(puzzle,r)?.length);}}for(const o of puzzle.objects)assert.ok(fs.existsSync(`assets/objects/${o.type}.svg`));}
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/puzzle-validation.json',JSON.stringify(results,null,2));
const analyses=[];
for(const puzzle of D.puzzles){
 const blind=structuredClone(puzzle);delete blind.solution;delete blind.killerId;
 const analysis=D.analyzeDeduction(blind);assert.ok(analysis.solved&&analysis.valid&&!analysis.requiresGuessing,puzzle.id+' needs guessing');assert.deepEqual(analysis.placements,puzzle.solution);
 analyses.push({...analysis,clues:D.engine.rules(puzzle).map(r=>r.text),humanFocusGroup:'NOT TESTED'});
 for(const lang of ['ru','en']){D.lang=lang;const texts=[puzzle.title[lang],...puzzle.rooms.map(r=>r.name[lang]),...puzzle.objects.map(o=>o.name[lang]),...puzzle.suspects.map(s=>s.clueText[lang]),...D.engine.rules(puzzle).map(r=>D.ruleText(puzzle,r)),...puzzle.hints.map(h=>h[lang])];assert.ok(texts.every(s=>typeof s==='string'&&s.length>0));assert.ok(texts.every(s=>!/(№\s*\d|\b(?:ROW|COLUMN|BETWEEN_ROWS|plant_\d)\b|строк[аи]\s+\d|столбец\s+\d|\s\d+$|возможных клеток)/.test(s)));}
}
assert.ok(new Set(D.puzzles.flatMap(p=>p.objects.map(o=>o.type))).size>=20);
assert.ok(new Set(D.puzzles.flatMap(p=>p.suspects.map(s=>s.avatar))).size>=30);
const avatars=D.puzzles.flatMap(p=>p.suspects.map(s=>s.avatar));
assert.equal(new Set(avatars).size,77,'Each named person has a distinct portrait');
assert.equal(new Set(avatars.map(file=>fs.readFileSync(file,'utf8'))).size,77,'Portraits differ beyond filenames');
for(const puzzle of D.puzzles){assert.ok(fs.existsSync('assets/objects/'+puzzle.art.icon+'.svg'));assert.equal(puzzle.hints.length,3);}
for(const puzzle of D.puzzles.slice(8))assert.ok(D.engine.rules(puzzle).length<=14,'Late levels should not be long direct checklists');
assert.equal(analyses.at(-1).directPlacements,0,'Expert finale requires deductions');
assert.ok(analyses.at(-1).iterations>analyses[0].iterations);
const damaged=D.save.normalize({saveVersion:3,currentPuzzleId:p.id,solvedPuzzleIds:[p.id,p.id,'removed'],bestTimes:{[p.id]:Infinity},attempts:{[p.id]:{placements:{s0:p.solution.s0,s1:p.solution.s0,s2:999,s3:'3'},timer:Infinity,mistakes:-2,history:[null,{placements:{bad:0},notes:{'999':1}}],notes:{'0':1,'999':2},stage:'deduce'}}});
assert.equal(damaged.totalSolved,1);assert.equal(damaged.attempts[p.id].timer,0);assert.equal(damaged.attempts[p.id].stage,'placing');assert.deepEqual(damaged.attempts[p.id].placements,{s0:p.solution.s0});assert.deepEqual(damaged.attempts[p.id].notes,{'0':1});assert.deepEqual(damaged.bestTimes,{});
fs.writeFileSync('reports/deduction-validation.json',JSON.stringify(analyses,null,2));
console.log('12 unique authored scenes; blind deduction, natural bilingual clues, objects, saves PASS');
