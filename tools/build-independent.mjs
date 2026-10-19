import fs from 'node:fs';import path from 'node:path';
const target=path.resolve('build/independent');fs.mkdirSync(target,{recursive:true});
// Ship only runtime scripts and referenced art, never solver reports or tooling.
await import('../js/puzzle-engine.js');await import('../data/puzzles.js');await import('../js/scene-art.js');
const html=fs.readFileSync('index.html','utf8');
const runtime=[...html.matchAll(/(?:src|href)="([\w./-]+\.(?:js|css|svg))"/g)].map(m=>m[1]);
const portraits=DS.puzzles.flatMap(p=>p.suspects.map(s=>s.avatar));
const objects=[...new Set([...DS.puzzles.flatMap(p=>p.objects.map(o=>o.type)),...DS.puzzles.map(p=>p.art.icon),'chair','bench','table','plant'])].map(type=>'assets/objects/'+type+'.svg');
const files=[...new Set(['index.html','js/endless-worker.js',...runtime,...portraits,...objects,...DS.sceneArt.files])];
function prune(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const full=path.resolve(dir,item.name);if(!full.startsWith(target+path.sep))throw Error('Outside build');if(item.isDirectory()){prune(full);if(!fs.readdirSync(full).length)fs.rmdirSync(full);}else if(!files.includes(path.relative(target,full).split(path.sep).join('/')))fs.unlinkSync(full);}}
prune(target);
let total=0;for(const file of files){if(!/^[A-Za-z0-9_./-]+$/.test(file))throw Error('Unsafe path '+file);const dest=path.join(target,file);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(file,dest);total+=fs.statSync(file).size;}
const assets=files.filter(f=>f.endsWith('.svg'));let brokenAssets=0;
for(const file of files.filter(f=>/\.(html|js|css)$/.test(f))){const source=fs.readFileSync(file,'utf8');for(const match of source.matchAll(/assets\/[A-Za-z0-9_/-]+\.svg/g))if(!fs.existsSync(match[0]))brokenAssets++;}
if(brokenAssets)throw Error('Broken asset references: '+brokenAssets);
if(total>100*1024*1024)throw Error('Build exceeds 100 MB');fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/build-validation.json',JSON.stringify({files:files.length,unpackedBytes:total,brokenAssets,assetCount:assets.length,legacyFilesIncluded:0,entry:'index.html'},null,2));console.log(`${files.length} files, ${total} bytes. Clean build: ${target}`);
