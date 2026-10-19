(() => {
 const D=globalThis.DS;
 D.endless={current:null,unlocked:()=>D.progress?.solvedPuzzleIds.length===D.puzzles.length,
  async prepare(seed,number,tier){
   let puzzle;
   if(location.protocol!=='file:'&&typeof Worker==='function'){
    puzzle=await new Promise((resolve,reject)=>{const worker=new Worker('js/endless-worker.js');const timeout=setTimeout(()=>{worker.terminate();reject(Error('Generation timeout'));},20000);worker.onmessage=e=>{clearTimeout(timeout);worker.terminate();e.data.error?reject(Error(e.data.error)):resolve(e.data.puzzle);};worker.onerror=()=>{clearTimeout(timeout);worker.terminate();reject(Error('Worker unavailable'));};worker.postMessage({seed,number,tier});}).catch(()=>null);
   }
   if(!puzzle){await new Promise(resolve=>setTimeout(resolve,20));puzzle=D.generateEndless(seed,number,tier);}
   D.endless.current=puzzle;return puzzle;
  },seed:()=>{const value=new Uint32Array(1);crypto.getRandomValues(value);return value[0]||1;}
 };
})();
