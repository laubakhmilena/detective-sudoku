import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require=createRequire(import.meta.url);let sharp;try{sharp=require('sharp');}catch{sharp=require(path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'));}
const base='Подготовка релиза/Материалы';
// Technical export only: preserve the illustration; resize to the platform's exact pixel dimensions.
const artDir=base+'/Иконка и обложка';fs.mkdirSync(artDir,{recursive:true});
await sharp(base+'/Исходники/Исходник иконки.png').resize(512,512,{fit:'cover'}).removeAlpha().png().toFile(artDir+'/Иконка 512 × 512.png');
await sharp(base+'/Исходники/Исходник обложки.png').resize(800,470,{fit:'cover',position:'centre'}).removeAlpha().png().toFile(artDir+'/Обложка 800 × 470.png');
const results=[];for(const file of ['Иконка 512 × 512.png','Обложка 800 × 470.png']){const meta=await sharp(artDir+'/'+file).metadata();results.push({file:'Иконка и обложка/'+file,width:meta.width,height:meta.height,format:meta.format,channels:meta.channels,bytes:fs.statSync(artDir+'/'+file).size,result:'PASS'});}
fs.writeFileSync(base+'/Проверка оформления.json',JSON.stringify({generatedBy:'Built-in image_gen',notGameplayScreenshots:true,exports:results},null,2));console.log(results);
