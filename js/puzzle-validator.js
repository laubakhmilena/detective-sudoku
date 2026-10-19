(() => {
  const DS=globalThis.DS;
  DS.validatePuzzle=p=>{
    const errors=[], e=DS.engine, ids=new Set(p.suspects.map(s=>s.id)), rooms=new Set(p.rooms.map(r=>r.id)), objects=new Set(p.objects.map(o=>o.id));
    if(p.suspects.length!==p.size||ids.size!==p.size)errors.push('Suspect count');
    const cells=p.rooms.flatMap(r=>r.cells);
    if(cells.length!==p.size*p.size||new Set(cells).size!==cells.length||cells.some(c=>c<0||c>=p.size*p.size))errors.push('Room coverage');
    if(!ids.has(p.victimId)||!ids.has(p.killerId)||p.victimId===p.killerId)errors.push('Victim/killer');
    if(new Set(p.objects.map(o=>o.row*p.size+o.col)).size!==p.objects.length)errors.push('Object collision');
    for(const o of p.objects){
      if(!Number.isInteger(o.row)||!Number.isInteger(o.col)||o.row<0||o.col<0||o.row>=p.size||o.col>=p.size)errors.push('Object bounds: '+o.id);
      if(e.seatTypes.includes(o.type)&&o.occupiable!==true)errors.push('Seat must be authored occupiable: '+o.id);
    }
    function check(r){
      if(!e.types.includes(r.type))errors.push('Rule type');
      if(r.type==='GENERAL_RULE'){r.rules.forEach(check);return;}
      if(!ids.has(r.subject)||r.target&&!ids.has(r.target)||r.room&&!rooms.has(r.room)||r.object&&!objects.has(r.object))errors.push('Rule reference');
      if(['ROW','COLUMN'].includes(r.type)&&(!Number.isInteger(r.value)||r.value<0||r.value>=p.size))errors.push('Rule bounds');
      if(r.type==='ON_OBJECT'&&!e.canOccupyObject(p.objects.find(o=>o.id===r.object)))errors.push('ON_OBJECT targets blocked furniture: '+r.object);
    }
    e.rules(p).forEach(check);
    if(p.suspects.some(s=>!s.rules.length)||p.hints.length<3)errors.push('Missing clues/hints');
    if(!e.valid(p,p.solution)||e.killer(p,p.solution)!==p.killerId)errors.push('Invalid recorded solution');
    const result=e.solve(p);
    if(result.count!==1||result.truncated)errors.push('Non-unique solution');
    return {id:p.id,size:p.size,difficulty:p.difficulty,solutions:result.count,nodes:result.nodes,errors,pass:!errors.length};
  };
})();
