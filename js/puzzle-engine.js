/* Pure spatial rules. Coordinates are zero-based; distance is Manhattan distance. */
(() => {
  const DS = globalThis.DS ||= {};
  const types = ['IN_ROOM','NOT_IN_ROOM','ROW','COLUMN','NORTH_OF','SOUTH_OF','EAST_OF','WEST_OF','SAME_ROOM','NOT_SAME_ROOM','ALONE','WITH_EXACTLY_ONE','BESIDE_OBJECT','NOT_BESIDE_OBJECT','ON_OBJECT','BETWEEN_ROWS','BETWEEN_COLUMNS','CORNER_OF_ROOM','NOT_CORNER','BESIDE_WALL','DISTANCE','GENERAL_RULE'];
  const rc = (p,c) => ({row:Math.floor(c/p.size),col:c%p.size});
  const roomCache=new WeakMap();
  const roomAt = (p,c) => {let map=roomCache.get(p);if(!map){map=new Map(p.rooms.flatMap(r=>r.cells.map(c=>[c,r.id])));roomCache.set(p,map);}return map.get(c);};
  const objectAt = (p,c) => p.objects.find(o=>o.row*p.size+o.col===c);
  const seatTypes = Object.freeze(['chair','stool','pouf','ottoman','bench','sofa','bed']);
  // Seating is usable by definition, including objects authored without the old flag.
  const canOccupyObject = o => Boolean(o && (seatTypes.includes(o.type)||o.occupiable===true));
  const canOccupy = (p,c) => Number.isInteger(c) && c>=0 && c<p.size*p.size && !p.objects.some(o=>o.row*p.size+o.col===c&&!canOccupyObject(o));
  function placementIssue(p,placements,subject,cell) {
    if(!canOccupy(p,cell))return {type:'object',object:objectAt(p,cell)};
    const at=rc(p,cell);
    for(const [id,other] of Object.entries(placements)){
      if(id===subject)continue;
      const pos=rc(p,other);
      if(other===cell)return {type:'cell',person:id};
      if(pos.row===at.row)return {type:'row',person:id};
      if(pos.col===at.col)return {type:'column',person:id};
    }
    return null;
  }
  function wall(p,c,side) {
    const {row,col}=rc(p,c), room=roomAt(p,c);
    const neighbors={north:row?c-p.size:null,south:row<p.size-1?c+p.size:null,west:col?c-1:null,east:col<p.size-1?c+1:null};
    return side ? neighbors[side]===null||roomAt(p,neighbors[side])!==room : Object.values(neighbors).some(n=>n===null||roomAt(p,n)!==room);
  }
  function corner(p,c) { return (wall(p,c,'north')||wall(p,c,'south'))&&(wall(p,c,'west')||wall(p,c,'east')); }
  function evaluate(p,r,placements,partial=false) {
    if(r.type==='GENERAL_RULE') return r.rules.every(rule=>evaluate(p,rule,placements,partial));
    const cell=placements[r.subject];
    if(cell===undefined) return partial;
    const a=rc(p,cell), room=roomAt(p,cell);
    const target = r.target ? placements[r.target] : r.object ? (()=>{const o=p.objects.find(o=>o.id===r.object);return o?o.row*p.size+o.col:undefined;})() : undefined;
    const b=target===undefined?null:rc(p,target);
    if(['NORTH_OF','SOUTH_OF','EAST_OF','WEST_OF','SAME_ROOM','NOT_SAME_ROOM','DISTANCE'].includes(r.type)&&!b) return partial;
    switch(r.type) {
      case 'IN_ROOM': return room===r.room;
      case 'NOT_IN_ROOM': return room!==r.room;
      case 'ROW': return a.row===r.value;
      case 'COLUMN': return a.col===r.value;
      case 'BETWEEN_ROWS': return a.row>=r.min&&a.row<=r.max;
      case 'BETWEEN_COLUMNS': return a.col>=r.min&&a.col<=r.max;
      case 'NORTH_OF': return a.row<b.row;
      case 'SOUTH_OF': return a.row>b.row;
      case 'EAST_OF': return a.col>b.col;
      case 'WEST_OF': return a.col<b.col;
      case 'SAME_ROOM': return room===roomAt(p,target);
      case 'NOT_SAME_ROOM': return room!==roomAt(p,target);
      case 'BESIDE_OBJECT': case 'NOT_BESIDE_OBJECT': {
        if(!b)return false;
        const beside=Math.abs(a.row-b.row)+Math.abs(a.col-b.col)===1&&(!r.sameRoom||room===roomAt(p,target));
        return r.type==='BESIDE_OBJECT'?beside:!beside;
      }
      case 'ON_OBJECT': return cell===target&&canOccupyObject(p.objects.find(o=>o.id===r.object));
      case 'ALONE': case 'WITH_EXACTLY_ONE': {
        const expected=r.type==='ALONE'?1:2;
        const count=Object.values(placements).filter(c=>roomAt(p,c)===room).length;
        return partial&&Object.keys(placements).length<p.suspects.length ? count<=expected : count===expected;
      }
      case 'CORNER_OF_ROOM': return (!r.room||room===r.room)&&corner(p,cell);
      case 'NOT_CORNER': return !corner(p,cell);
      case 'BESIDE_WALL': return wall(p,cell,r.side);
      case 'DISTANCE': return Math.abs(a.row-b.row)+Math.abs(a.col-b.col)===r.value;
      default: throw new Error('Unknown rule: '+r.type);
    }
  }
  const rules = p=>[...p.suspects.flatMap(s=>s.rules),...(p.generalClues||[])];
  function valid(p,placements,partial=false) {
    const cells=Object.values(placements);
    if(!partial&&cells.length!==p.suspects.length)return false;
    if(Object.keys(placements).some(id=>!p.suspects.some(s=>s.id===id)))return false;
    if(cells.some(c=>!canOccupy(p,c)))return false;
    if(new Set(cells.map(c=>rc(p,c).row)).size!==cells.length||new Set(cells.map(c=>rc(p,c).col)).size!==cells.length)return false;
    return rules(p).every(r=>evaluate(p,r,placements,partial));
  }
  function solve(p,limit=2,nodeLimit=2000000) {
    const flatten=list=>list.flatMap(r=>r.type==='GENERAL_RULE'?flatten(r.rules):[r]);
    const all=flatten(rules(p)), ids=p.suspects.map(s=>s.id), placements={}, answers=[];
    const local=Object.fromEntries(ids.map(id=>[id,all.filter(r=>r.subject===id||r.target===id||['ALONE','WITH_EXACTLY_ONE'].includes(r.type))]));
    const domains=Object.fromEntries(ids.map(id=>[id,Array.from({length:p.size*p.size},(_,c)=>c).filter(c=>canOccupy(p,c)&&all.every(r=>evaluate(p,r,{[id]:c},true)))]));
    let nodes=0,truncated=false;
    function search(){
      if(answers.length>=limit)return;
      if(++nodes>nodeLimit){truncated=true;return;}
      if(Object.keys(placements).length===ids.length){if(valid(p,placements))answers.push({...placements});return;}
      let pick, candidates;
      const placed=Object.values(placements),usedRows=new Set(placed.map(c=>Math.floor(c/p.size))),usedCols=new Set(placed.map(c=>c%p.size));
      for(const id of ids){
        if(placements[id]!==undefined)continue;
        const available=domains[id].filter(c=>{if(usedRows.has(Math.floor(c/p.size))||usedCols.has(c%p.size))return false;placements[id]=c;const ok=local[id].every(r=>evaluate(p,r,placements,true));delete placements[id];return ok;});
        if(!available.length)return;
        if(!candidates||available.length<candidates.length){pick=id;candidates=available;}
      }
      for(const c of candidates){placements[pick]=c;search();delete placements[pick];if(answers.length>=limit||truncated)return;}
    }
    search();return {solutions:answers,count:answers.length,nodes,truncated};
  }
  function killer(p,placements){ const room=roomAt(p,placements[p.victimId]); const companions=p.suspects.filter(s=>s.id!==p.victimId&&roomAt(p,placements[s.id])===room);return companions.length===1?companions[0].id:null; }
  DS.engine={types,rc,roomAt,objectAt,seatTypes,canOccupyObject,canOccupy,placementIssue,wall,corner,evaluate,rules,valid,solve,killer};
})();
