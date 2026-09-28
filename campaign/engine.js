function campaignArtPath(id, name) {
 const base=`assets/campaign/ch${id}/`, available=globalThis.detectiveArtPaths||[];
 const exact=base+name+'.webp';
 if(available.includes(exact))return exact;
 if(name.startsWith('person-'))return base+name+'.svg';
 if(name==='ending')return available.includes(base+'case-7.webp')?base+'case-7.webp':base+'cover.webp';
 const n=Number(name.match(/^case-(\d+)$/)?.[1]);
 const fallbacks=n<=4?['case-1','case-5']:n===6?['case-5','case-1']:['case-7','case-5','case-1'];
 for(const candidate of fallbacks)if(available.includes(base+candidate+'.webp'))return base+candidate+'.webp';
 return base+'cover.webp';
}
/* Shared mechanics for the eleven standalone investigations. */
const campaignChapters = campaignStories.map(story => {
  const gridCases = [cases[0], cases[1], cases[4]].map((base, index) => {
    const puzzleData = clone(base.puzzleData);
    const mapping = Object.fromEntries(base.participants.map((id, i) => [id, 'p' + ((i + story.id + index) % story.names.length)]));
    puzzleData.participants = puzzleData.participants.map(id => mapping[id]);
    puzzleData.clues = puzzleData.clues.map(clue => ({...clue, rule: {type: clue.rule.type, args: clue.rule.args.map(arg => mapping[arg] || arg)}}));
    const grid = {id:`chapter-${story.id}-grid-${index}`, mechanic:'grid',puzzleData, solution:Object.fromEntries(Object.entries(base.solution).map(([id,cell]) => [mapping[id],cell]))};
    const template = getBoardTemplate(grid);
    grid.roomNames = Object.fromEntries([...new Set(template.rooms)].map((id,i) => [id,story.rooms[i] || 'Переход']));
    grid.puzzleData.clues.forEach(clue => {
      const [who,other] = clue.rule.args;
      const name = story.names[Number(who.slice(1))];
      const otherName = story.names[Number(String(other).slice(1))];
      const object = template.objects.find(o => o.id === other)?.label || other;
      clue.text = ({room:()=>`${name}: помещение «${grid.roomNames[other]}».`,not_room:()=>`${name} не находится в помещении «${grid.roomNames[other]}».`,adj_obj:()=>`${name} стоит рядом с предметом «${object}» по стороне клетки в той же комнате.`,not_adj_obj:()=>`${name} не стоит рядом с предметом «${object}».`,on_obj:()=>`${name} занимает клетку предмета «${object}».`,above:()=>`${name} севернее, чем ${otherName}.`,left:()=>`${name} западнее, чем ${otherName}.`,same_room:()=>`${name} и ${otherName} находятся в одной комнате.`})[clue.rule.type]();
    });
    return grid;
  });
  const prefix=`ch${story.id}-`;
  const titles=['Места свидетелей','Независимые часы','Проверка показаний','Момент передачи','Путь между постами','Два экземпляра','Из рук в руки','Контрольный снимок','Связь и выгода','Реконструкция'];
  const types=['grid','timeline','testimony','grid','route','compare','custody','grid','links','final'];
  const entries = titles.map((title,i) => ({id:prefix+(i+1),number:i+1,title,mechanic:types[i],image:campaignArtPath(story.id,'case-'+(i+1)),evidenceId:prefix+'e'+(i+1),requires:i===9?[2,3,5,6,7,9].map(n=>prefix+'e'+n):i>0?[prefix+'e'+i]:[]}));
  [0,3,7].forEach((index,i)=>entries[index].grid=gridCases[i]);
  const gridInstructions='Разместите по одному человеку в каждой строке и каждом столбце. Предметы занимают клетки; сидеть можно только там, где это разрешено подписью. Показания относятся к одному снимку времени.';
  entries.forEach((entry,i) => {
    entry.goal=({grid:gridInstructions,timeline:'Расставьте независимые записи от ранней к поздней.',testimony:'Проверьте оба показания по независимым материалам.',route:'Постройте физически возможный маршрут с учётом закрытых узлов, следов и времени. Нажмите уже выбранный узел, чтобы сократить путь.',compare:'Сопоставьте исходный документ и проверяемый экземпляр. Отметьте все изменённые поля.',custody:'Восстановите последовательность владения предметом по распискам.',links:'Соедините документы по совпадающим реквизитам от операции до получателя выгоды.',final:'Соберите обвинение: выберите версию и отдельно укажите материал, подтверждающий каждую часть.'})[entry.mechanic];
    entry.source=entry.grid ? entry.grid.puzzleData.clues.map(c=>c.text).join('\n') : ({timeline:story.chronology.map(e=>e.join(' — ')).join('\n'),testimony:story.witness.join('\n'),route:story.route.reason+'\n'+story.route.edges.map(e=>`${e[0]} ↔ ${e[1]}: ${e[2]} мин.`).join('\n'),compare:story.document.labels.map((label,j)=>`${label}: исходный «${story.document.a[j]}»; проверяемый «${story.document.b[j]}».`).join('\n'),custody:story.custody.map(e=>e.join(' — ')).join('\n'),links:story.linkSources.join('\n')+'\n'+story.physical,final:'Используйте сохранённые материалы дел 2, 3, 5, 6, 7 и 9. Новых свидетельств в этом деле нет.'})[entry.mechanic];
    entry.result=({grid:'Позиции свидетелей установлены. Этот снимок относится только к указанному этапу, а не ко всему вечеру.',timeline:`Опорная отметка события: ${story.crimeTime}. Она подтверждается независимой записью.`,testimony:'Первое показание опровергнуто независимым источником, второе подтверждено.',route:'Маршрут соответствует времени, следу обязательного промежуточного узла и ограничениям доступа.',compare:'Установлены расхождения: '+story.document.changed.map(j=>story.document.labels[j]).join(', ')+'.',custody:'Цепочка передачи восстановлена по отметкам и распискам.',links:'Связь документов и вещественные следы проверены. Сопоставьте их с временем, маршрутом и показаниями.',final:story.ending+' '+story.redHerring})[entry.mechanic];
    entry.hints=[entry.grid ? 'Начните с помещений, затем используйте соседство с предметами и исключение занятых строк и столбцов.' : entry.goal,
      entry.grid ? entry.grid.puzzleData.clues.map(c=>c.text).join(' ') : ({timeline:'Проверьте каждую временную отметку: '+story.chronology.map(e=>e[0]).join(' → '),testimony:'Сопоставьте буквальное отрицание в первом показании с прибором или документом. Второе подтверждено независимым источником.',route:`Обязательный узел: ${story.route.via}. Не проходите через ${story.route.blocked.join(', ')}. Сложите времена каждого ребра.`,compare:'Изменились: '+story.document.changed.map(j=>story.document.labels[j]).join(', '),custody:'Порядок задают отметки '+story.custody.map(e=>e[0]).join(' → '),links:story.link.join(' → '),final:'Личность и выгода подтверждаются делом 9; способ — сопоставлением расхождений в деле 6; время — делом 2; предмет — цепочкой дела 7. Прочтите также опровергнутое показание.'})[entry.mechanic]];
  });
  return {...story,cases:entries,cover:`assets/campaign/ch${story.id}/cover.webp`,map:`assets/campaign/ch${story.id}/map.svg`,endingImage:campaignArtPath(story.id,'ending')};
});
const campaignStorageKey='detective-campaign-v1';
function readCampaign() {try {const p=JSON.parse(localStorage.getItem(campaignStorageKey));if(p?.version===1)return {version:1,chapters:{},lastChapter:1,...p};}catch{} return {version:1,chapters:{},lastChapter:1};}
let campaignProgress=readCampaign();
let campaignView={chapter:2,caseIndex:0,tab:'cases',selected:null,notice:'',screen:'archive',readOnly:false};
function campaignSave(){globalThis.GamePlatform?.changed();try{localStorage.setItem(campaignStorageKey,JSON.stringify(campaignProgress))}catch{}}
function chapterProgress(id){return campaignProgress.chapters[id] ||= {completed:[],states:{},evidence:[],caseIndex:0,stage:'archive'};}
function campaignUnlocked(id){return id===2 ? state.progress.completedCases.length===12 : chapterProgress(id-1).completed.length===10;}
function campaignCaseState(entry){return chapterProgress(campaignView.chapter).states[entry.id] ||= {placements:{},order:[],answers:{},path:[],fields:[],refs:{},hints:0,errors:0,elapsed:0};}
const campaignName=(story,id)=>story.names[Number(id.slice(1))];
function campaignCard(ch){const p=chapterProgress(ch.id),unlocked=campaignUnlocked(ch.id);return `<button class="chapter-folder ${unlocked?'current':'locked'}" data-action="campaign-open" data-chapter="${ch.id}" ${unlocked?'':'disabled'}><span class="folder-cover"><img src="${ch.cover}" alt="${htmlEscape(ch.title)}" loading="lazy"></span><span class="folder-copy"><span class="eyebrow">ГЛАВА ${ch.id} · ${ch.type}</span><h2>${htmlEscape(ch.title)}</h2><p>${htmlEscape(ch.intro)}</p><small>${unlocked?`${p.completed.length} / 10 дел`:'Завершите предыдущую главу'}</small></span></button>`;}
function campaignCurrent(){return campaignChapters.find(ch=>ch.id===campaignView.chapter);}
function campaignOpen(id,resume=false){if(!campaignUnlocked(id))return;campaignView.chapter=id;const p=chapterProgress(id);campaignView.readOnly=chapterCompleted(id);campaignView.caseIndex=p.caseIndex;campaignView.screen=campaignView.readOnly?'archive':resume?p.stage:'archive';campaignView.tab=campaignView.readOnly?'materials':'cases';campaignView.notice='';if(!campaignView.readOnly){campaignProgress.lastChapter=id;campaignSave()}state.screen='campaign';render();}
function campaignStart(index){if(campaignView.readOnly)return;const ch=campaignCurrent(),p=chapterProgress(ch.id);if(index>p.completed.length)return;campaignView.caseIndex=index;campaignView.screen='case';campaignView.selected=null;campaignView.notice='';p.caseIndex=index;p.stage='case';const entry=ch.cases[index];if(index<9&&!p.evidence.includes(entry.evidenceId))p.evidence.push(entry.evidenceId);campaignCaseState(entry);campaignSave();render();}
function campaignMap(ch){const p=chapterProgress(ch.id);return `<div class="surface-card campaign-map"><img src="${ch.map}" alt="Карта: ${htmlEscape(ch.place)}"><p>${p.completed.length>=5?'Маршрут проверен и внесён в архив.':'Связи карты доступны для проверки маршрута.'}</p><ul>${ch.route.edges.map(e=>`<li>${htmlEscape(e[0])} ↔ ${htmlEscape(e[1])} — ${e[2]} мин.</li>`).join('')}</ul>${p.completed.length>=5?`<p>Проверенный путь: ${htmlEscape((p.states[ch.cases[4].id]?.path || []).join(' → '))}</p>`:''}</div>`;}
function campaignMaterials(ch){const p=chapterProgress(ch.id);return ch.cases.filter(e=>p.evidence.includes(e.evidenceId)).map(e=>`<details class="surface-card campaign-record" open><summary>Дело ${e.number}: ${htmlEscape(e.title)}</summary><img class="record-image" src="assets/campaign/ch${ch.id}/record-${e.number}.svg" alt="Материал дела ${e.number}" loading="lazy"><p class="preserve-lines">${htmlEscape(e.source)}</p>${p.completed.includes(e.id)?`<p class="established-fact">${htmlEscape(e.result)}</p>`:''}</details>`).join('') || '<p>Откройте первое дело, чтобы получить материалы.</p>';}
function campaignArchive(ch){const p=chapterProgress(ch.id);let body='';if(campaignView.tab==='cases')body=`<div class="campaign-case-list">${ch.cases.map((entry,i)=>`<button class="surface-card" data-action="campaign-case" data-index="${i}" ${i>p.completed.length?'disabled':''}><img src="${entry.image}" alt="${htmlEscape(entry.title)}" loading="lazy"><span>Дело ${i+1} · ${htmlEscape(entry.title)}</span><small>${p.completed.includes(entry.id)?'Раскрыто':i<=p.completed.length?'Доступно':'После предыдущего дела'}</small></button>`).join('')}</div>`;
 if(campaignView.tab==='materials')body=campaignMaterials(ch);
 if(campaignView.tab==='map')body=campaignMap(ch);
 if(campaignView.tab==='timeline')body=p.completed.includes(ch.cases[1].id)?`<ol>${ch.chronology.map(e=>`<li><b>${e[0]}</b> ${htmlEscape(e[1])}<p>${htmlEscape(e[2])}</p></li>`).join('')}</ol>`:'Хронология появится после дела 2.';
 if(campaignView.tab==='dossier')body=`<div class="campaign-dossiers">${ch.names.map((name,i)=>`<article class="surface-card"><img src="${campaignArtPath(ch.id,'person-'+i)}" alt="${name}"><h3>${name}</h3><p>${ch.roles[i]}</p><p>Интерес: ${htmlEscape(ch.profiles[i].interest)}</p><blockquote>${htmlEscape(ch.profiles[i].statement)}</blockquote>${p.completed.length>=9?`<p>Выяснено: ${htmlEscape(ch.profiles[i].secret)}</p>`:""}<p>${p.completed.length>=9&&i===ch.culprit?'В материалах дела 9 установлена связь с документами. Проверьте всю совокупность доказательств.':'Сопоставьте позиции на планах с независимыми источниками.'}</p></article>`).join('')}</div>`;
 return `<nav class="campaign-tabs">${[['cases','Дела'],['materials','Материалы'],['map','Карта'],['timeline','Хронология'],['dossier','Досье']].map(([id,label])=>`<button data-action="campaign-tab" data-tab="${id}" class="secondary-button ${campaignView.tab===id?'selected':''}">${label}</button>`).join('')}</nav>${body}`;}
function campaignOrder(pool,saved){return `<p>Выберите карточку. Она добавится в конец цепочки. Нажатие карточки в цепочке убирает её и следующие звенья.</p><div class="campaign-options">${pool.filter(x=>!saved.order.includes(x.id)).map(x=>`<button class="secondary-button" data-action="campaign-order" data-id="${x.id}">${htmlEscape(x.text)}</button>`).join('')}</div><ol class="campaign-order">${saved.order.map(id=>`<li><button class="secondary-button" data-action="campaign-trim" data-id="${id}">${htmlEscape(pool.find(x=>x.id===id)?.text)}</button></li>`).join('')}</ol>`;}
function campaignPeople(ch,entry){const grid=entry.grid;return `<div class="campaign-people">${grid.puzzleData.participants.map(id=>`<button class="secondary-button ${campaignView.selected===id?'selected':''}" data-action="campaign-person" data-id="${id}"><img src="${campaignArtPath(ch.id,'person-'+Number(id.slice(1)))}" alt="">${campaignName(ch,id)}</button>`).join('')}</div>`;}
function campaignGrid(ch,entry,saved){const grid=entry.grid,template=getBoardTemplate(grid),size=grid.puzzleData.size;return `<div class="campaign-grid" style="--size:${size}">${template.rooms.map((room,i)=>{const cell=pointToCell(Math.floor(i/size),i%size),object=template.objects.find(o=>o.cell===cell),person=Object.keys(saved.placements).find(id=>saved.placements[id]===cell);return `<button data-action="campaign-cell" data-cell="${cell}" class="${object&&!object.canOccupy?'blocked':''}"><small>${cell} · ${htmlEscape(grid.roomNames[room])}</small>${person?`<img src="${campaignArtPath(ch.id,'person-'+Number(person.slice(1)))}" alt=""><b>${campaignName(ch,person)}</b>`:object?`${object.path?`<img src="${object.path}" alt="">`:''}<span>${htmlEscape(object.label)}${object.canOccupy?' · можно занять':''}</span>`:''}</button>`}).join('')}</div><ul class="campaign-clues">${grid.puzzleData.clues.map(c=>`<li>${htmlEscape(c.text)}</li>`).join('')}</ul>`;}
function campaignRoutes(ch) {
 const routes=[];
 function visit(path,time) { const last=path.at(-1);
  if(last===ch.route.end && path.includes(ch.route.via)) routes.push(path.join(' → '));
  for(const [a,b,t]of ch.route.edges) {const next=a===last?b:b===last?a:null;
   if(next && !path.includes(next) && !ch.route.blocked.includes(next) && time+t<=ch.route.limit) visit([...path,next],time+t);
  }
 }
 visit([ch.route.start],0);return routes;
}
function campaignParts(ch){return [
 {id:'who',label:'Кто совершил преступление',options:ch.names,answer:ch.names[ch.culprit],ref:9},
 {id:'motive',label:'Для чего',options:['Случайная ошибка без личной выгоды',ch.motive,'Исполнение законного поручения'],answer:ch.motive,ref:9},
 {id:'method',label:'Способ',options:[ch.method,'Ошибка независимого измерительного прибора','Действие постороннего без доступа'],answer:ch.method,ref:6,refs:[6,9]},
 {id:'time',label:'Опорное время',options:[ch.chronology[0][0],ch.crimeTime,ch.chronology[3][0]],answer:ch.crimeTime,ref:2},
 {id:'route',label:'Маршрут',options:[...campaignRoutes(ch),ch.route.start+' → '+ch.route.end,'Путь через закрытый узел'],answer:campaignRoutes(ch)[0],accepted:campaignRoutes(ch),ref:5},
 {id:'object',label:'Ключевой предмет',options:['Личный пропуск свидетеля',ch.object,'Случайная записка'],answer:ch.object,ref:7,refs:[7,9]}
];}
function campaignPuzzle(ch,entry,saved){const type=entry.mechanic;if(type==='grid')return campaignGrid(ch,entry,saved);
 if(['timeline','custody','links'].includes(type)){const list=type==='timeline'?ch.chronology.map(e=>e.join(' — ')):type==='custody'?ch.custody.map(e=>e.join(' — ')):ch.link;return campaignOrder(list.map((text,i)=>({id:String(i),text})).sort((a,b)=>((Number(a.id)*3+2)%5)-((Number(b.id)*3+2)%5)),saved);}
 if(type==='testimony')return [0,2].map((index,i)=>`<section class="surface-card campaign-record"><h3>${htmlEscape(ch.witness[index])}</h3><p>${htmlEscape(ch.witness[index+1])}</p>${['Подтверждено','Опровергнуто'].map(value=>`<button class="secondary-button ${saved.answers[i]===value?'selected':''}" data-action="campaign-answer" data-id="${i}" data-value="${value}">${value}</button>`).join('')}</section>`).join('');
 if(type==='route')return `${campaignMap(ch)}<p>${htmlEscape(ch.route.reason)}</p><p><b>Из ${ch.route.start} в ${ch.route.end}; через ${ch.route.via}; не больше ${ch.route.limit} мин.</b></p><div class="campaign-options">${ch.rooms.map(name=>`<button class="secondary-button ${saved.path.includes(name)?'selected':''}" data-action="campaign-node" data-id="${htmlEscape(name)}">${htmlEscape(name)}</button>`).join('')}</div><p class="route-path">${htmlEscape(saved.path.join(' → ') || 'Путь не выбран')}</p>`;
 if(type==='compare')return `<h3>${htmlEscape(ch.document.title)}</h3><div class="campaign-comparison"><div><b>Поле</b><b>Исходный</b><b>Проверяемый</b></div>${ch.document.labels.map((label,i)=>`<button data-action="campaign-field" data-index="${i}" class="${saved.fields.includes(i)?'selected':''}"><b>${label}</b><span>${htmlEscape(ch.document.a[i])}</span><span>${htmlEscape(ch.document.b[i])}</span></button>`).join('')}</div>`;
 return campaignParts(ch).map(part=>`<section class="surface-card campaign-record"><h3>${part.label}</h3><div class="campaign-options">${part.options.map(value=>`<button class="secondary-button ${saved.answers[part.id]===value?'selected':''}" data-action="campaign-answer" data-id="${part.id}" data-value="${htmlEscape(value)}">${htmlEscape(value)}</button>`).join('')}</div><label>Подтверждающий материал <select data-campaign-ref="${part.id}"><option value="">Выберите доказательство</option>${[2,3,5,6,7,9].map(n=>`<option value="${n}" ${saved.refs[part.id]===String(n)?'selected':''}>Дело ${n}: ${ch.cases[n-1].title}</option>`).join('')}</select></label></section>`).join('');
}
function campaignValid(ch,entry,saved){switch(entry.mechanic){case 'grid':{const g=entry.grid,p=g.puzzleData,values=Object.values(saved.placements);return values.length===p.size&&new Set(values.map(c=>c[0])).size===p.size&&new Set(values.map(c=>c.slice(1))).size===p.size&&p.participants.every(id=>saved.placements[id])&&values.every(cell=>isBoardCell(cell,p.size)&&!getBoardTemplate(g).objects.some(o=>o.cell===cell&&!o.canOccupy))&&p.clues.every(c=>evaluateRule(g,saved.placements,c.rule));}
 case 'timeline':case 'custody':case 'links':return compareArrays(saved.order,['0','1','2','3']);
 case 'testimony':return saved.answers[0]==='Опровергнуто'&&saved.answers[1]==='Подтверждено';
 case 'compare':return compareArrays([...saved.fields].sort(),[...ch.document.changed].sort());
 case 'route':{const p=saved.path;let time=0;if(p[0]!==ch.route.start||p.at(-1)!==ch.route.end||!p.includes(ch.route.via)||p.some(n=>ch.route.blocked.includes(n))||new Set(p).size!==p.length)return false;for(let i=1;i<p.length;i++){const edge=ch.route.edges.find(e=>(e[0]===p[i-1]&&e[1]===p[i])||(e[1]===p[i-1]&&e[0]===p[i]));if(!edge)return false;time+=edge[2]}return time<=ch.route.limit;}
 case 'final':return entry.requires.every(id=>chapterProgress(ch.id).evidence.includes(id))&&campaignParts(ch).every(p=>(p.accepted || [p.answer]).includes(saved.answers[p.id])&&(p.refs || [p.ref]).map(String).includes(saved.refs[p.id]));default:return false;}}
function renderCampaign(){const ch=campaignCurrent(),p=chapterProgress(ch.id),entry=ch.cases[campaignView.caseIndex],saved=campaignCaseState(entry);let body;
 if(campaignView.screen==='archive')body=campaignArchive(ch);
 else if(campaignView.screen==='complete')body=`<section class="surface-card campaign-record"><img class="campaign-hero" src="${ch.endingImage}" alt="${htmlEscape(ch.title)}"><span class="eyebrow">ГЛАВА ${ch.id} РАСКРЫТА</span><h1>${ch.id===12?'Кампания завершена':ch.title}</h1><p>${htmlEscape(ch.ending)}</p><p>${htmlEscape(ch.redHerring)}</p>${ch.id<12?`<button class="primary-button" data-action="campaign-open" data-chapter="${ch.id+1}">Следующая глава</button>`:'<p>Все 12 расследований завершены. Архивы остаются доступны.</p>'}<button class="secondary-button" data-action="campaign-archive">Архив главы</button></section>`;
 else if(campaignView.screen==='result')body=`<section class="surface-card campaign-record"><h1>Дело ${entry.number} раскрыто</h1><p>${htmlEscape(entry.result)}</p><p>Время ${formatTime(saved.elapsed)} · Ошибки ${saved.errors} · Подсказки ${saved.hints}</p><button class="primary-button" data-action="campaign-next">${entry.number===10?'Завершить главу':'Следующее дело'}</button></section>`;
 else body=`<section class="campaign-case-header"><img src="${entry.image}" alt="${htmlEscape(entry.title)}"><div><span class="eyebrow">ДЕЛО ${entry.number} / 10 · <span id="campaign-timer">${formatTime(saved.elapsed)}</span> · Ошибки ${saved.errors}</span><h1>${htmlEscape(entry.title)}</h1><p>${htmlEscape(entry.goal)}</p></div></section><div class="campaign-workarea"><section class="campaign-puzzle puzzle-${entry.mechanic}">${campaignPuzzle(ch,entry,saved)}</section><aside class="campaign-notebook">${entry.mechanic==='grid'?campaignPeople(ch,entry):''}<details class="surface-card campaign-record" open><summary>Исходные материалы</summary><p class="preserve-lines">${htmlEscape(entry.source)}</p></details><details class="surface-card campaign-record"><summary>Постоянный архив доказательств</summary>${campaignMaterials(ch)}</details><details class="surface-card campaign-record"><summary>Карта и маршруты</summary>${campaignMap(ch)}</details>${saved.hints?`<section class="surface-card campaign-record"><h3>Открытые подсказки</h3>${entry.hints.slice(0,saved.hints).map(h=>`<p>${htmlEscape(h)}</p>`).join('')}</section>`:''}</aside></div><div class="mechanic-toolbar"><button class="secondary-button" data-action="campaign-hint">Подсказка</button><button class="primary-button" data-action="campaign-verify">Проверить решение</button></div>`;
 return `<div class="app-screen campaign-screen campaign-${campaignView.screen}"><header class="topbar"><button class="secondary-button" data-action="campaign-menu">В меню</button><strong>${htmlEscape(ch.title)}</strong><button class="secondary-button" data-action="campaign-archive">Архив</button></header><main class="page-container campaign-content">${campaignView.notice?`<p class="campaign-notice" role="status">${htmlEscape(campaignView.notice)}</p>`:''}${body}</main></div>`;
}
function handleCampaignAction(button){const action=button.dataset.action;
 if(action==='campaign-open')return openChapterFolder(Number(button.dataset.chapter));
 if(action==='campaign-menu'){campaignSave();state.screen='home';return render()}
 if(action==='campaign-resume')return campaignOpen(campaignProgress.lastChapter,true);
 if(campaignView.readOnly&&!['campaign-archive','campaign-tab'].includes(action))return;
 const ch=campaignCurrent(),p=chapterProgress(ch.id),entry=ch.cases[campaignView.caseIndex],saved=campaignCaseState(entry);
 if(action==='campaign-case')return campaignStart(Number(button.dataset.index));
 if(action==='campaign-archive'){campaignView.screen='archive';campaignView.tab=campaignView.readOnly?'materials':'cases'}
 if(action==='campaign-tab')campaignView.tab=button.dataset.tab;
 if(action==='campaign-person')campaignView.selected=button.dataset.id;
 if(action==='campaign-cell'){const cell=button.dataset.cell,object=getBoardTemplate(entry.grid).objects.find(o=>o.cell===cell);if(object&&!object.canOccupy)return;if(campaignView.selected){Object.keys(saved.placements).forEach(id=>{if(saved.placements[id]===cell)delete saved.placements[id]});saved.placements[campaignView.selected]=cell;campaignView.selected=null}else {const id=Object.keys(saved.placements).find(id=>saved.placements[id]===cell);if(id){delete saved.placements[id];campaignView.selected=id}}}
 if(action==='campaign-order'&&!saved.order.includes(button.dataset.id))saved.order.push(button.dataset.id);
 if(action==='campaign-trim')saved.order=saved.order.slice(0,saved.order.indexOf(button.dataset.id));
 if(action==='campaign-answer')saved.answers[button.dataset.id]=button.dataset.value;
 if(action==='campaign-node'){const name=button.dataset.id,index=saved.path.indexOf(name);if(index>=0)saved.path=saved.path.slice(0,index+1);else if(!saved.path.length&&name===ch.route.start||ch.route.edges.some(e=>(e[0]===saved.path.at(-1)&&e[1]===name)||(e[1]===saved.path.at(-1)&&e[0]===name)))saved.path.push(name)}
 if(action==='campaign-field'){const i=Number(button.dataset.index);saved.fields=saved.fields.includes(i)?saved.fields.filter(x=>x!==i):saved.fields.concat(i)}
 if(action==='campaign-hint')saved.hints=Math.min(2,saved.hints+1);
 if(action==='campaign-verify'){if(campaignValid(ch,entry,saved)){campaignView.screen='result';p.stage='result';campaignView.notice='';playSound()}else {saved.errors++;campaignView.notice='Версия пока не согласуется со всеми материалами. Проверьте условия и независимые источники.'}}
 if(action==='campaign-next'&&campaignView.screen==='result'){
   if(!p.completed.includes(entry.id))p.completed.push(entry.id);
   if(entry.number===10){campaignView.screen='complete';p.stage='complete'}else {campaignSave();return campaignStart(campaignView.caseIndex+1)}
 }
 campaignSave();render();
}
if(typeof document!=='undefined'){
 document.addEventListener('change',event=>{if(globalThis.GamePlatform?.paused())return;const id=event.target.dataset?.campaignRef;if(!id)return;const ch=campaignCurrent();campaignCaseState(ch.cases[campaignView.caseIndex]).refs[id]=event.target.value;campaignSave()});
 window.setInterval(()=>{if(state.screen==='campaign'&&campaignView.screen==='case'&&!document.hidden&&!state.settingsOpen&&!globalThis.GamePlatform?.paused()){const saved=campaignCaseState(campaignCurrent().cases[campaignView.caseIndex]);saved.elapsed++;campaignSave();const timer=document.getElementById('campaign-timer');if(timer)timer.textContent=formatTime(saved.elapsed)}},1000);
 window.addEventListener('pagehide',campaignSave);
}
globalThis.__campaignTestApi={chapters:campaignChapters,valid:campaignValid};
