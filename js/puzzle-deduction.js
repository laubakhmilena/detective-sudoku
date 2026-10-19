/* Human-style elimination only: unary clues, pairwise clue support, and row /
   column exclusion. Never reads solution or calls the search solver. */
(() => {
 const D=globalThis.DS;
 D.analyzeDeduction=p=>{
  const e=D.engine,ids=p.suspects.map(s=>s.id),flat=list=>list.flatMap(r=>r.type==='GENERAL_RULE'?flat(r.rules):[r]);
  const rules=flat(e.rules(p)),domains=Object.fromEntries(ids.map(id=>[id,Array.from({length:p.size*p.size},(_,c)=>c).filter(c=>e.canOccupy(p,c))]));
  const steps=[],placedAt={},initial={},dependent=new Set();let iterations=0;
  const trim=(id,keep,reason)=>{const before=domains[id],after=before.filter(keep);if(after.length===before.length)return false;domains[id]=after;steps.push({iteration:iterations,person:id,from:before.length,to:after.length,reason});return true;};
  for(const id of ids){for(const [i,r]of rules.entries())if(r.subject===id&&!r.target&&!['ALONE','WITH_EXACTLY_ONE'].includes(r.type))trim(id,c=>e.evaluate(p,r,{[id]:c},true),'clue '+(i+1));initial[id]=domains[id].length;if(domains[id].length===1)placedAt[id]=0;}
  let changed=true;
  while(changed&&iterations<100){changed=false;iterations++;
   const snapshot=Object.fromEntries(ids.map(id=>[id,[...domains[id]]]));
   for(const id of ids)for(const other of ids){if(id===other)continue;
    const pair=rules.map((r,i)=>({r,i})).filter(({r})=>r.target&&(r.subject===id&&r.target===other||r.subject===other&&r.target===id));
    for(const {r,i}of pair){const reduced=trim(id,c=>snapshot[other].some(d=>e.evaluate(p,r,{[id]:c,[other]:d},true)),'clue '+(i+1)+' with '+other);if(reduced){changed=true;dependent.add(id);}}
    const reduced=trim(id,c=>snapshot[other].some(d=>Math.floor(c/p.size)!==Math.floor(d/p.size)&&c%p.size!==d%p.size),'row/column exclusion with '+other);if(reduced){changed=true;dependent.add(id);}
   }
   for(const id of ids)if(domains[id].length===1&&placedAt[id]===undefined)placedAt[id]=iterations;
  }
  const solved=ids.every(id=>domains[id].length===1),placements=solved?Object.fromEntries(ids.map(id=>[id,domains[id][0]])):null;
  return {id:p.id,solved,requiresGuessing:!solved,valid:solved&&e.valid(p,placements),directPlacements:Object.values(initial).filter(n=>n===1).length,deductionSteps:steps.length,iterations,dependentPlacements:dependent.size,placedAt,initialCandidates:initial,remainingCandidates:domains,steps,placements};
 };
})();
