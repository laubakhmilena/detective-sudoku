(() => {
 const DS=globalThis.DS;
 // The geometry, person IDs and solutions remain v3-compatible.
 DS.SAVE_VERSION=3;DS.saveKey='detective-independent-v3';DS.previousSaveKey='detective-independent-v2';
 const record=value=>value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const nonnegative=value=>Number.isFinite(Number(value))?Math.max(0,Number(value)):0;
 const freshAttempt=()=>({placements:{},notes:{},timer:0,mistakes:0,hintsUsed:0,hintIndex:0,history:[],stage:'placing',completed:false,introSeen:false});
 function cleanPosition(p,raw){
  const placements={},rows=new Set(),cols=new Set();
  for(const [id,cell] of Object.entries(record(raw))){
   if(!p.suspects.some(s=>s.id===id)||!Number.isInteger(cell)||!DS.engine.canOccupy(p,cell))continue;
   const row=Math.floor(cell/p.size),col=cell%p.size;
   if(rows.has(row)||cols.has(col))continue;
   placements[id]=cell;rows.add(row);cols.add(col);
  }
  return placements;
 }
 function cleanNotes(p,raw){return Object.fromEntries(Object.entries(record(raw)).filter(([cell,value])=>Number.isInteger(Number(cell))&&Number(cell)>=0&&Number(cell)<p.size*p.size&&[1,2].includes(value)));}
 function cleanAttempt(p,value,completed=false){const a=record(value),placements=cleanPosition(p,a.placements);return {...freshAttempt(),placements,notes:cleanNotes(p,a.notes),timer:nonnegative(a.timer),mistakes:Math.floor(nonnegative(a.mistakes)),hintsUsed:Math.floor(nonnegative(a.hintsUsed)),hintIndex:Math.min(4,Math.floor(nonnegative(a.hintIndex))),introSeen:a.introSeen===true,completed,stage:completed?'result':a.stage==='deduce'&&DS.engine.valid(p,placements)?'deduce':'placing',history:(Array.isArray(a.history)?a.history:[]).slice(-100).filter(h=>h&&typeof h==='object').map(h=>({placements:cleanPosition(p,h.placements),notes:cleanNotes(p,h.notes)}))};}
 function normalize(raw){
  const source=raw?.saveVersion===DS.SAVE_VERSION?record(raw):{},ids=new Set(DS.puzzles.map(p=>p.id));
  const solvedPuzzleIds=[...new Set(Array.isArray(source.solvedPuzzleIds)?source.solvedPuzzleIds:[])].filter(id=>ids.has(id));
  const results=(field,max=Infinity)=>Object.fromEntries(Object.entries(record(source[field])).filter(([id,n])=>solvedPuzzleIds.includes(id)&&typeof n==='number'&&Number.isFinite(n)&&n>=0).map(([id,n])=>[id,Math.min(max,n)]));
  const save={saveVersion:DS.SAVE_VERSION,updatedAt:nonnegative(source.updatedAt),solvedPuzzleIds,unlockedPuzzleIds:[...ids],bestTimes:results('bestTimes'),bestStars:results('bestStars',3),bestHints:results('bestHints'),totalSolved:solvedPuzzleIds.length,currentPuzzleId:ids.has(source.currentPuzzleId)?source.currentPuzzleId:null,currentMode:source.currentMode==='replay'?'replay':'main',attempts:{},replays:{},settings:{sound:raw?.settings?.sound!==false,language:['ru','en'].includes(raw?.settings?.language)?raw.settings.language:null},tutorialCompleted:Boolean(source.tutorialCompleted)};
  for(const key of ['attempts','replays'])for(const [id,value] of Object.entries(record(source[key]))){
   const p=DS.puzzles.find(p=>p.id===id);if(!p)continue;
   const a=record(value),placements=cleanPosition(p,a.placements),completed=a.completed===true&&solvedPuzzleIds.includes(id);
   save[key][id]={...freshAttempt(),placements,notes:cleanNotes(p,a.notes),timer:nonnegative(a.timer),mistakes:Math.floor(nonnegative(a.mistakes)),hintsUsed:Math.floor(nonnegative(a.hintsUsed)),hintIndex:Math.min(4,Math.floor(nonnegative(a.hintIndex))),introSeen:a.introSeen===true,completed,stage:completed?'result':a.stage==='deduce'&&DS.engine.valid(p,placements)?'deduce':'placing',history:(Array.isArray(a.history)?a.history:[]).slice(-100).filter(h=>h&&typeof h==='object').map(h=>({placements:cleanPosition(p,h.placements),notes:cleanNotes(p,h.notes)}))};
  }
  save.settings.volume=Math.min(1,nonnegative(raw?.settings?.volume??.6));
  save.endless=null;
  const endless=record(source.endless);
  if(solvedPuzzleIds.length===DS.puzzles.length&&endless.version===1&&Number.isInteger(endless.seed)&&endless.seed>=0&&endless.seed<=4294967295&&Number.isSafeInteger(endless.number)&&endless.number>=13&&endless.number<=1000000000&&[1,2,3].includes(endless.tier)&&DS.generateEndless){
   const puzzle=DS.endless?.current?.seed===endless.seed&&DS.endless.current.number===endless.number?DS.endless.current:DS.generateEndless(endless.seed,endless.number,endless.tier);
   if(DS.endless)DS.endless.current=puzzle;
   save.endless={version:1,seed:endless.seed,number:endless.number,tier:endless.tier,solved:Math.floor(nonnegative(endless.solved)),attempt:cleanAttempt(puzzle,endless.attempt,endless.attempt?.completed===true&&DS.engine.valid(puzzle,endless.attempt.placements)),recent:(Array.isArray(endless.recent)?endless.recent:[]).slice(-10).filter(r=>Number.isSafeInteger(r.number)&&Number.isFinite(r.time)&&r.time>=0).map(r=>({number:r.number,time:r.time}))};
   if(source.currentMode==='endless'){save.currentMode='endless';save.currentPuzzleId=puzzle.id;}
  }
  if(save.currentPuzzleId&&save.currentMode!=='endless'){const collection=save.currentMode==='replay'?save.replays:save.attempts;if(!collection[save.currentPuzzleId])collection[save.currentPuzzleId]=freshAttempt();}
  return save;
 }
 DS.save={normalize,freshAttempt,async load(){const raw=await DS.platform.load();if(raw?.saveVersion===DS.SAVE_VERSION&&raw.endless?.version===1&&raw.solvedPuzzleIds?.length===DS.puzzles.length&&DS.endless&&Number.isInteger(raw.endless.seed)&&Number.isSafeInteger(raw.endless.number)&&[1,2,3].includes(raw.endless.tier))await DS.endless.prepare(raw.endless.seed,raw.endless.number,raw.endless.tier);DS.progress=normalize(raw);},persist(){const p=DS.progress;p.totalSolved=p.solvedPuzzleIds.length;p.updatedAt=Date.now();DS.platform.save(p);},complete(p,a){const stars=a.hintsUsed===0&&a.mistakes<=1?3:a.hintsUsed<=2&&a.mistakes<=3?2:1;if(p.generated){const e=DS.progress.endless;if(!a.completed&&!e.recent.some(r=>r.number===p.number)){e.solved++;e.recent.push({number:p.number,time:a.timer});e.recent=e.recent.slice(-10);}a.completed=true;a.stage='result';DS.save.persist();DS.platform.flush();return stars;}if(!DS.progress.solvedPuzzleIds.includes(p.id))DS.progress.solvedPuzzleIds.push(p.id);DS.progress.bestTimes[p.id]=Math.min(DS.progress.bestTimes[p.id]??Infinity,a.timer);DS.progress.bestStars[p.id]=Math.max(DS.progress.bestStars[p.id]||0,stars);DS.progress.bestHints[p.id]=Math.min(DS.progress.bestHints[p.id]??Infinity,a.hintsUsed);a.completed=true;a.stage='result';DS.save.persist();DS.platform.flush();return stars;}};
 DS.persist=()=>DS.progress&&DS.save.persist();
})();
