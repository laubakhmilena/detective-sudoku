/* Yandex-hosted builds load the official SDK from the platform origin. */
(() => {
  const keys = ['detective-sudoku-progress-v1', 'detective-campaign-v1', 'detective-sudoku-audio-v1'];
  const metaKey = 'detective-cloud-revision-v1';
  let sdk, player, initialized = false, ready = false, playing = false, wanted = false;
  let revision = Number(read(metaKey)) || 0, dirty = false, busy = false, lastWrite = 0;
  const reasons = new Set(), sounds = new Set();
  const status = { sdk: 'local', cloud: 'local', language: 'ru' };
  function read(k) { try { return localStorage.getItem(k); } catch { return null; } }
  function write(k,v) { try { localStorage.setItem(k,v); } catch {} }
  function sync() {
    const next = ready && wanted && !reasons.size;
    if (next === playing) return;
    playing = next;
    try { sdk?.features?.GameplayAPI?.[next ? 'start' : 'stop'](); } catch {}
  }
  function pause(reason, value) {
    if (value) reasons.add(reason); else reasons.delete(reason);
    if (reasons.size) for (const audio of sounds) { audio.close().catch(()=>{}); sounds.delete(audio); }
    sync();
  }
  function changed() {
    if (!initialized) return;
    revision = Math.max(Date.now(),revision+1); write(metaKey,String(revision)); dirty = true;
  }
  async function flush() {
    if (!player || !dirty || busy || Date.now()-lastWrite < 10000) return;
    const sent = revision;
    const data = Object.fromEntries(keys.map(k=>[k,read(k)]));
    busy = true; lastWrite = Date.now();
    try { await player.setData({detectiveSave:{version:1,revision:sent,data}},true); if(revision===sent)dirty=false; status.cloud='saved'; }
    catch { status.cloud='offline'; } finally { busy=false; }
  }
  const limit = promise => Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('SDK timeout')),8000))]);
  async function init() {
    const local = location.protocol === 'file:' || ['localhost','127.0.0.1'].includes(location.hostname);
    if (local && !new URLSearchParams(location.search).has('yandex')) { initialized=true; return; }
    status.sdk='loading';
    try {
      await limit(new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='/sdk.js';script.onload=resolve;script.onerror=reject;document.head.append(script);}));
      sdk=await limit(YaGames.init()); status.sdk='initialized';
      status.language=sdk.environment.i18n.lang;
      // Russian is the only advertised content language; unsupported SDK languages fall back to Russian.
      document.documentElement.lang='ru';
      sdk.on('game_api_pause',()=>pause('sdk',true));
      sdk.on('game_api_resume',()=>pause('sdk',false));
      try {
        player=await limit(sdk.getPlayer());
        const remote=(await limit(player.getData(['detectiveSave']))).detectiveSave;
        if(remote?.version===1 && Number.isFinite(remote.revision) && remote.revision>revision && remote.data && typeof remote.data==='object') {
          for(const key of keys) if(typeof remote.data[key]==='string')write(key,remote.data[key]);
          revision=remote.revision;write(metaKey,String(revision));
        } else if(revision) dirty=true;
        status.cloud='loaded';
      } catch { player=null; status.cloud='offline'; }
    } catch { status.sdk='unavailable'; }
    initialized=true;
  }
  window.addEventListener('blur',()=>pause('blur',true));
  window.addEventListener('focus',()=>pause('blur',false));
  document.addEventListener('visibilitychange',()=>{pause('hidden',document.hidden);if(document.hidden)queueMicrotask(flush);});
  window.addEventListener('pagehide',()=>{pause('hidden',true);queueMicrotask(flush);});
  window.addEventListener('pageshow',()=>pause('hidden',document.hidden));
  document.addEventListener('contextmenu',event=>{if(event.target.closest('#game-root'))event.preventDefault();});
  document.addEventListener('click',event=>{if(reasons.size && event.target.closest('#game-root')){event.preventDefault();event.stopImmediatePropagation();}},true);
  setInterval(flush,10000);
  globalThis.GamePlatform={init,changed,flush,status,paused:()=>reasons.size>0,
    trackAudio(audio){sounds.add(audio);audio.addEventListener('statechange',()=>{if(audio.state==='closed')sounds.delete(audio);});},
    gameplay(value){wanted=value;sync();},
    ready(){if(ready)return;ready=true;try{sdk?.features?.LoadingAPI?.ready();}catch{}sync();}
  };
})();
