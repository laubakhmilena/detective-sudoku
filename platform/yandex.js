(() => {
 const DS=globalThis.DS;let sdk=null,player=null,storage=null,wanted=false,ready=false,dirty=null,busy=false,lastSave=0,soundContext=null;
 const pauses=new Set(),audio=new Set(),status={sdk:'local',cloud:'local'};
 const timeout=p=>new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('SDK timeout')),7000);Promise.resolve(p).then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});});
 function sync(){const active=ready&&wanted&&!pauses.size;if(active===DS.platform.playing)return;DS.platform.playing=active;try{sdk?.features?.GameplayAPI?.[active?'start':'stop']();}catch{}}
 function mute(){for(const entry of audio){try{entry.osc.stop();entry.osc.disconnect();entry.gain.disconnect();}catch{}audio.delete(entry);}soundContext?.suspend().catch(()=>{});}
 function pause(reason,value){if(value){pauses.add(reason);mute();}else pauses.delete(reason);sync();}
 function tone(kind='place'){if(pauses.size||!DS.progress?.settings.sound||DS.progress.settings.volume===0)return;try{const ctx=soundContext&&soundContext.state!=='closed'?soundContext:(soundContext=new (window.AudioContext||window.webkitAudioContext)());ctx.resume().catch(()=>{});const osc=ctx.createOscillator(),gain=ctx.createGain(),entry={osc,gain};audio.add(entry);osc.type='sine';osc.frequency.value=kind==='check'?620:430;gain.gain.setValueAtTime(.055*(DS.progress.settings.volume??.6),ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.12);osc.connect(gain).connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.13);osc.onended=()=>{audio.delete(entry);osc.disconnect();gain.disconnect();};}catch{}}
 async function init(){
  try{storage=localStorage;}catch{}
  if(['localhost','127.0.0.1'].includes(location.hostname)&&!new URLSearchParams(location.search).has('yandex')||location.protocol==='file:')return;
  try{
   await timeout(new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/sdk.js';script.onload=resolve;script.onerror=reject;document.head.append(script);}));
   sdk=await timeout(YaGames.init());status.sdk='initialized';DS.sdkLanguage=sdk.environment?.i18n?.lang;
   try{storage=await timeout(sdk.getStorage());}catch{}
   sdk.on('game_api_pause',()=>pause('sdk',true));sdk.on('game_api_resume',()=>pause('sdk',false));
   try{player=await timeout(sdk.getPlayer());status.cloud='available';}catch{status.cloud='offline';}
  }catch{status.sdk='unavailable';}
 }
 async function load(){let local;try{local=JSON.parse(storage?.getItem(DS.saveKey));}catch{}
  if(!local)try{local=JSON.parse(storage?.getItem(DS.previousSaveKey));}catch{}
  if(player)try{const remote=(await timeout(player.getData(['independentSudoku']))).independentSudoku;if(remote?.saveVersion===DS.SAVE_VERSION){
   if(local?.saveVersion!==DS.SAVE_VERSION)local=remote;
   else{const latest=Number(remote.updatedAt)>Number(local.updatedAt)?remote:local,older=latest===remote?local:remote;
    const best=(key,mode)=>{const values={};for(const source of [local,remote])for(const [id,value] of Object.entries(source[key]||{}))if(typeof value==='number'&&Number.isFinite(value)&&value>=0)values[id]=values[id]===undefined?value:Math[mode](values[id],value);return values;};
    local={...latest,solvedPuzzleIds:[...new Set([...(local.solvedPuzzleIds||[]),...(remote.solvedPuzzleIds||[])])],bestTimes:best('bestTimes','min'),bestStars:best('bestStars','max'),bestHints:best('bestHints','min'),attempts:{...older.attempts,...latest.attempts},replays:{...older.replays,...latest.replays},endless:latest.endless||older.endless||null};
   }
   storage?.setItem(DS.saveKey,JSON.stringify(local));
  }else if(!local&&remote)local=remote;}catch{status.cloud='offline';}return local;
 }
 function save(data){try{storage?.setItem(DS.saveKey,JSON.stringify(data));}catch{}dirty=JSON.parse(JSON.stringify(data));}
 async function flush(){if(!player||!dirty||busy||Date.now()-lastSave<10000)return;busy=true;const sent=dirty;lastSave=Date.now();try{await player.setData({independentSudoku:sent},true);if(dirty===sent)dirty=null;status.cloud='saved';}catch{status.cloud='offline';}finally{busy=false;}}
 async function ad(rewarded=false){if(!sdk?.adv)return false;pause('ad',true);let reward=false;try{return await new Promise(resolve=>{const done=()=>{pause('ad',false);resolve(reward);};const callbacks={onOpen:()=>pause('ad',true),onClose:done,onError:done,onOffline:done,onRewarded:()=>{reward=true;}};if(rewarded)sdk.adv.showRewardedVideo({callbacks});else sdk.adv.showFullscreenAdv({callbacks});});}catch{pause('ad',false);return false;}}
 DS.platform={init,load,save,flush,status,tone,mute,playing:false,pause,paused:()=>pauses.size>0,gameplay(value){wanted=value;sync();},ready(){if(ready)return;ready=true;try{sdk?.features?.LoadingAPI?.ready();}catch{}sync();},ad,hasAds:()=>Boolean(sdk?.adv),async authorize(){if(!sdk)return false;pause('auth',true);try{await sdk.auth.openAuthDialog();player=await sdk.getPlayer();status.cloud='available';DS.progress=DS.save.normalize(await load());DS.persist();lastSave=0;await flush();return true;}catch{return false;}finally{pause('auth',false);}}};
 document.addEventListener('visibilitychange',()=>{pause('hidden',document.hidden);if(document.hidden){DS.persist?.();flush();}});
 addEventListener('blur',()=>pause('blur',true));addEventListener('focus',()=>pause('blur',false));addEventListener('pagehide',()=>{pause('hidden',true);DS.persist?.();flush();});addEventListener('pageshow',()=>pause('hidden',document.hidden));
 document.addEventListener('contextmenu',event=>{if(event.target.closest('#game-root'))event.preventDefault();});
 setInterval(flush,10000);
})();
