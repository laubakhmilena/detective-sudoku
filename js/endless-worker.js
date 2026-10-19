importScripts('puzzle-engine.js','../data/puzzles.js','../data/translations.js','localization.js','endless-generator.js');
onmessage=event=>{try{postMessage({puzzle:DS.generateEndless(event.data.seed,event.data.number,event.data.tier)});}catch(error){postMessage({error:error.message});}};
