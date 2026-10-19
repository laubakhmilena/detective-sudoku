(() => {
 const D=globalThis.DS;D.uiState={screen:'home',modal:null,filter:-1,status:'all',sort:'number',selected:null,notes:false,tutorialStep:0,demoSelected:false,demoCell:null};let last=performance.now(),lastPersist=last,finishedCount=0;
 D.currentPuzzle=()=>D.progress?.currentMode==='endless'?D.endless.current:D.puzzles.find(p=>p.id===D.progress?.currentPuzzleId);
 D.attempt=()=>D.progress?D.progress.currentMode==='endless'?D.progress.endless?.attempt:(D.progress.currentMode==='replay'?D.progress.replays:D.progress.attempts)[D.progress.currentPuzzleId]:null;
 D.resizeBoard=()=>{const area=document.querySelector('.board-area'),board=document.querySelector('.board');if(!area||!board)return;const r=area.getBoundingClientRect(),caption=area.querySelector('.board-caption').getBoundingClientRect();const size=Math.floor(Math.min(r.width-8,r.height-caption.height-12));board.style.width=Math.max(100,size)+'px';board.style.height=Math.max(100,size)+'px';board.style.setProperty('--cell',size/D.currentPuzzle().size+'px');};
 const render=()=>{document.title=D.t('title');D.ui.render();}, message=text=>{D.uiState.modal='message';D.uiState.message=text;render();};
 function open(id,replay=false){if(!D.puzzles.some(p=>p.id===id))return;D.persist();D.progress.currentPuzzleId=id;D.progress.currentMode=replay?'replay':'main';const collection=replay?D.progress.replays:D.progress.attempts;if(replay||!collection[id]||collection[id].completed)collection[id]=D.save.freshAttempt();D.uiState.screen='game';D.uiState.selected=D.currentPuzzle().suspects[0].id;D.uiState.notes=false;D.uiState.modal=!collection[id].introSeen?'intro':collection[id].stage==='deduce'?'killer':null;D.persist();last=performance.now();render();}
 function snapshot(){const a=D.attempt();a.history.push({placements:{...a.placements},notes:{...a.notes}});if(a.history.length>100)a.history.shift();}
 async function act(action,node){const u=D.uiState,p=D.currentPuzzle(),a=D.attempt();
  if(action==='home'){D.persist();u.screen='home';u.modal=null;return render();}
  if(action==='catalog'||action==='back'){D.persist();u.screen=action==='back'&&u.screen==='catalog'?'home':'catalog';u.modal=null;return render();}
  if(action==='open')return open(node.dataset.id,D.progress.solvedPuzzleIds.includes(node.dataset.id));
  if(action==='continue'){u.screen='game';u.selected=D.currentPuzzle().suspects[0].id;u.modal=!a.introSeen?'intro':a.stage==='deduce'?'killer':a.stage==='result'?'result':null;last=performance.now();return render();}
  if(action==='filter'){u.filter=Number(node.dataset.value);return render();}if(action==='status'){u.status=node.dataset.value;return render();}
  if(action==='endless'){if(!D.endless.unlocked())return message(D.t('endlessLocked'));u.modal='endless';return render();}
  if(action==='start-endless'||action==='next-endless'){
   if(!D.endless.unlocked()||u.modal==='generating')return;
   const previous=D.progress.endless;
   if(action==='start-endless'&&previous&&!previous.attempt.completed){D.progress.currentMode='endless';D.progress.currentPuzzleId=D.endless.current.id;u.screen='game';u.modal=previous.attempt.introSeen?null:'intro';u.selected=D.endless.current.suspects[0].id;u.notes=false;D.persist();return render();}
   const tier=action==='next-endless'?previous.tier:Number(document.querySelector('#endless-tier')?.value||2),seed=D.endless.seed(),number=previous?previous.number+1:13;
   u.modal='generating';render();
   try{const puzzle=await D.endless.prepare(seed,number,tier);D.persist();D.progress.endless={version:1,seed,number,tier,solved:previous?.solved||0,recent:previous?.recent||[],attempt:D.save.freshAttempt()};D.progress.currentMode='endless';D.progress.currentPuzzleId=puzzle.id;u.screen='game';u.selected=puzzle.suspects[0].id;u.notes=false;u.modal='intro';D.persist();last=performance.now();render();}catch{message(D.t('generationFailed'));}return;
  }
  if(action==='start'){a.introSeen=true;u.modal=null;D.persist();return render();}
  if(action==='settings'){u.modal='settings';return render();}if(action==='login'){await D.platform.authorize();return render();}
  if(action==='test-sound'){D.platform.tone('check',true);return;}
  if(action==='dismiss'){if(['result','finished','generating'].includes(u.modal))return;if(u.modal==='intro'){a.introSeen=true;D.persist();}u.modal=null;if(a?.stage==='deduce')a.stage='placing';return render();}
  if(action==='how'){u.modal='tutorial';u.tutorialStep=0;u.demoSelected=false;u.demoCell=null;return render();}
  if(action==='demo-person'){u.demoSelected=true;return render();}if(action==='demo-cell'){if(u.demoSelected)u.demoCell=Number(node.dataset.cell);return render();}
  if(action==='tutorial-next'){if(u.tutorialStep<5){u.tutorialStep++;return render();}action='tutorial-skip';}
  if(action==='tutorial-skip'){D.progress.tutorialCompleted=true;u.modal=null;D.persist();return render();}
  if(!p||!a)return;
  if(action==='case-info'){u.modal='case-info';return render();}
  if(action==='return-game'){u.modal=null;if(a.stage==='deduce')a.stage='placing';return render();}
  if(action==='all-clues'){u.modal='all-clues';return render();}
  if(action==='objects'){u.modal='objects';return render();}
  if(action==='object'){u.objectId=node.dataset.id;u.modal='object';return render();}
  if(action==='person'){u.selected=node.dataset.id;u.notes=false;return render();}if(action==='notes'){u.notes=!u.notes;return render();}
  if(action==='cell'){const cell=Number(node.dataset.cell);if(u.notes){snapshot();a.notes[cell]=((a.notes[cell]||0)+1)%3;if(!a.notes[cell])delete a.notes[cell];}else{const existing=Object.keys(a.placements).find(id=>a.placements[id]===cell);if(existing){u.selected=existing;return render();}if(!u.selected)return;const issue=D.engine.placementIssue(p,a.placements,u.selected,cell);if(issue){
 if(issue.type==='object')return message(D.t('blockedObject').replace('{object}',D.text(issue.object?.name||D.t('objectFallback'))));
 const person=p.suspects.find(s=>s.id===issue.person);
 return message(D.t(issue.type==='row'?'blockedRow':issue.type==='column'?'blockedColumn':'blockedCell').replace('{person}',D.text(person.name)));
 }snapshot();a.placements[u.selected]=cell;D.platform.tone();}D.persist();return render();}
  if(action==='remove'){snapshot();delete a.placements[u.selected];D.persist();return render();}
  if(action==='undo'){const previous=a.history.pop();if(previous){a.placements=previous.placements;a.notes=previous.notes;D.persist();}return render();}
  if(action==='hint'){if(a.hintIndex<3){a.hintIndex++;a.hintsUsed++;D.persist();}u.modal='hint';return render();}
  if(action==='reward'){u.modal=null;D.platform.pause('reward-request',true);render();const granted=await D.platform.ad(true);D.platform.pause('reward-request',false);if(granted){a.hintIndex=4;a.hintsUsed++;D.persist();u.modal='hint';render();}else message(D.t('adFailed'));return;}
  if(action==='check'){if(Object.keys(a.placements).length<p.size)return;if(!D.engine.valid(p,a.placements)){a.mistakes++;D.persist();return message(D.t('wrong'));}a.stage='deduce';u.modal='killer';D.persist();return render();}
  if(action==='accuse'){if(node.dataset.id!==D.engine.killer(p,a.placements)){a.mistakes++;D.persist();return message(D.t('wrongKiller'));}const first=!D.progress.solvedPuzzleIds.includes(p.id);D.save.complete(p,a);if(first)finishedCount++;u.modal='result';return render();}
  if(action==='replay'){if(p.generated){D.progress.endless.attempt=D.save.freshAttempt();u.screen='game';u.modal='intro';u.selected=p.suspects[0].id;u.notes=false;D.persist();return render();}return open(p.id,true);}
  if(action==='next-puzzle'){const index=D.puzzles.indexOf(p);if(index===D.puzzles.length-1){u.modal='finished';return render();}u.modal=null;u.screen='catalog';render();if(finishedCount&&finishedCount%3===0){finishedCount=0;await D.platform.ad();}return open(D.puzzles[index+1].id);}
 }
 document.addEventListener('click',event=>{const node=event.target.closest('[data-action]');if(!node||node.disabled||D.platform.paused())return;if(node.dataset.action==='dismiss'&&event.target.closest('[data-modal]')&&!event.target.closest('.modal-close'))return;act(node.dataset.action,node);});
 document.addEventListener('keydown',event=>{const modal=document.querySelector('[data-modal]');if(!modal)return;if(event.key==='Escape'){event.preventDefault();act('dismiss');}if(event.key==='Tab'){const controls=[...modal.querySelectorAll('button:not(:disabled),input,select,summary')].filter(node=>node.getClientRects().length);const first=controls[0],last=controls.at(-1);if(!modal.contains(document.activeElement)||event.shiftKey&&document.activeElement===first){event.preventDefault();(event.shiftKey?last:first)?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}});
 document.addEventListener('change',event=>{if(event.target.id==='sort'){D.uiState.sort=event.target.value;render();}if(event.target.id==='language'){D.lang=event.target.value;D.progress.settings.language=D.lang;document.documentElement.lang=D.lang;D.persist();render();}if(event.target.id==='sound'){D.progress.settings.sound=event.target.checked;if(!event.target.checked)D.platform.mute();D.persist();render();}if(event.target.id==='volume'){D.progress.settings.volume=Number(event.target.value)/100;if(!D.progress.settings.volume)D.platform.mute();D.persist();}});
 addEventListener('resize',()=>requestAnimationFrame(D.resizeBoard));
 setInterval(()=>{const now=performance.now(),delta=Math.min(1000,now-last);last=now;if(D.uiState.screen==='game'&&!D.uiState.modal&&!D.platform.paused()&&D.attempt()?.stage==='placing'){D.attempt().timer+=delta;const label=document.querySelector('#timer');if(label)label.textContent=D.formatTime(D.attempt().timer);if(now-lastPersist>5000){D.persist();lastPersist=now;}}},200);
 (async()=>{await D.platform.init();await D.save.load();D.lang=D.progress.settings.language||(['ru','en'].includes(D.sdkLanguage)?D.sdkLanguage:!D.sdkLanguage&&navigator.language.startsWith('ru')?'ru':'en');document.documentElement.lang=D.lang;render();requestAnimationFrame(()=>D.platform.ready());})();
})();
