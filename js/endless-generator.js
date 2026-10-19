/* Deterministic, versioned new cases. Only verified unique puzzles are returned. */
(() => {
 const D=globalThis.DS,bi=(ru,en)=>({ru,en});
 function generate(seed,number=13,tier=2){
  let state=seed>>>0;const random=()=>{state+=0x6D2B79F5;let t=state;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
  const pick=a=>a[Math.floor(random()*a.length)],shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const template=pick(D.puzzles),size=tier===1?5:tier===3?7:6;
  // Rectangular zones form a connected top-down plan, with no disconnected room fragments.
  let rectangles=[{x:0,y:0,w:size,h:size}];
  while(rectangles.length<Math.min(5,template.rooms.length)){
   const options=rectangles.filter(r=>r.w>=4||r.h>=4);if(!options.length)break;
   const r=pick(options),vertical=r.w>=4&&(r.h<4||random()<.5),length=vertical?r.w:r.h,cut=2+Math.floor(random()*(length-3));
   rectangles=rectangles.filter(x=>x!==r).concat(vertical?[{...r,w:cut},{...r,x:r.x+cut,w:r.w-cut}]:[{...r,h:cut},{...r,y:r.y+cut,h:r.h-cut}]);
  }
  const rooms=rectangles.map((r,i)=>({...structuredClone(template.rooms[i]),id:'r'+i,cells:Array.from({length:r.w*r.h},(_,c)=>(r.y+Math.floor(c/r.w))*size+r.x+c%r.w)}));
  let columns,solution,paired;
  for(let tries=0;tries<200;tries++){
   columns=shuffle(Array.from({length:size},(_,i)=>i));solution=Object.fromEntries(columns.map((col,row)=>['s'+row,row*size+col]));
   paired=rooms.filter(r=>Object.values(solution).filter(c=>r.cells.includes(c)).length===2);if(paired.length)break;
  }
  if(!paired?.length)throw Error('No victim pair');
  const victimRoom=pick(paired),pair=shuffle(Object.keys(solution).filter(id=>victimRoom.cells.includes(solution[id]))),victimId=pair[0],killerId=pair[1];
  const pool=shuffle(D.puzzles.flatMap(p=>p.suspects)),suspects=[],usedNames=new Set();
  for(const source of pool){if(usedNames.has(source.name.ru))continue;usedNames.add(source.name.ru);suspects.push({...structuredClone(source),id:'s'+suspects.length,rules:[]});if(suspects.length===size)break;}
  const p={id:'endless-'+number,number,size,difficulty:tier,location:structuredClone(template.location),title:bi(template.title.ru+' · №'+number,template.title.en+' · #'+number),intro:bi('Вечер закончился преступлением. Свидетели помнят отдельные места и взаимное положение участников. Восстановите сцену по их показаниям.','The evening ended in a crime. Witnesses remember landmarks and people’s relative positions. Reconstruct the scene using their statements.'),rooms,objects:[],suspects,victimId,killerId,solution,generalClues:[{type:'WITH_EXACTLY_ONE',subject:victimId}],art:structuredClone(template.art),generated:true,generatorVersion:1,seed:seed>>>0};
  const anchor=pick(suspects),seat=pick(template.objects.filter(o=>D.engine.canOccupyObject(o)))||{type:'chair',name:bi('кресло','armchair')},c=solution[anchor.id];
  p.objects.push({id:'seat',type:seat.type,name:structuredClone(seat.name),row:Math.floor(c/size),col:c%size,occupiable:true});
  const free=shuffle(Array.from({length:size*size},(_,i)=>i).filter(c=>!Object.values(solution).includes(c)));
  const furniture=shuffle(template.objects.filter(o=>!D.engine.canOccupyObject(o))).slice(0,4);
  furniture.forEach((o,i)=>p.objects.push({...structuredClone(o),id:'o'+i,row:Math.floor(free[i]/size),col:free[i]%size}));
  for(const s of suspects)s.rules.push({type:'IN_ROOM',subject:s.id,room:D.engine.roomAt(p,solution[s.id])});
  anchor.rules.push({type:'ON_OBJECT',subject:anchor.id,object:'seat'});
  // The complete row/column orders guarantee uniqueness. Remove redundant edges after solving.
  const rowOrder=[...suspects],colOrder=[...suspects].sort((a,b)=>solution[a.id]%size-solution[b.id]%size);
  for(const order of [rowOrder,colOrder])for(let i=0;i<size-1;i++){
   const reverse=random()<.5,a=reverse?order[i+1]:order[i],b=reverse?order[i]:order[i+1];
   a.rules.push({type:order===rowOrder?(reverse?'SOUTH_OF':'NORTH_OF'):(reverse?'EAST_OF':'WEST_OF'),subject:a.id,target:b.id});
  }
  // Real landmarks sometimes replace a directional edge.
  for(const s of suspects){const adjacent=p.objects.filter(o=>D.engine.evaluate(p,{type:'BESIDE_OBJECT',subject:s.id,object:o.id,sameRoom:true},solution));if(adjacent.length)s.rules.push({type:'BESIDE_OBJECT',subject:s.id,object:pick(adjacent).id,sameRoom:true});}
  const candidates=shuffle(suspects.flatMap(s=>s.rules.filter(r=>r.type!=='ON_OBJECT').map(r=>({s,r}))));
  for(const {s,r} of candidates){if(s.rules.length<=1)continue;const index=s.rules.indexOf(r);s.rules.splice(index,1);const result=D.engine.solve(p,2,45000);if(result.count!==1||result.truncated)s.rules.splice(index,0,r);}
  const checked=D.engine.solve(p,2,120000);if(checked.count!==1||checked.truncated||!D.engine.valid(p,solution)||D.engine.killer(p,solution)!==killerId)throw Error('Generated case failed verification');
  const text=(rule,lang)=>{const before=D.lang;D.lang=lang;const result=D.ruleText(p,rule);D.lang=before;return result;};
  for(const s of suspects)s.clueText=bi(s.rules.map(r=>text(r,'ru')).join(' '),s.rules.map(r=>text(r,'en')).join(' '));
  const anchorText=bi(text(anchor.rules.find(r=>r.type==='ON_OBJECT'),'ru'),text(anchor.rules.find(r=>r.type==='ON_OBJECT'),'en'));
  const relation=pick(suspects.flatMap(s=>s.rules).filter(r=>r.target));
  p.hints=[bi('Начните с сиденья: '+anchorText.ru+' Его строка и столбец будут заняты.','Start with the seat: '+anchorText.en+' Its row and column will be taken.'),bi('Сопоставьте это показание с границами зон: '+text(relation,'ru'),'Compare this clue with the zone boundaries: '+text(relation,'en')),bi('Проверьте каждую свободную строку и столбец. Исключайте места вне зоны участника. Жертва '+suspects.find(s=>s.id===victimId).name.ru+' должна находиться ровно с одним другим человеком.','Check each free row and column. Exclude squares outside each person’s zone. The victim, '+suspects.find(s=>s.id===victimId).name.en+', shares a zone with exactly one other person.')];
  return p;
 }
 D.generateEndless=generate;
})();
