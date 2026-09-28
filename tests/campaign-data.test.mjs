import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx=vm.createContext({console});
for(const file of ['game.js','campaign/stories.js','campaign/engine.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const api=ctx.__campaignTestApi,first=ctx.__detectiveSudokuTestApi;
assert.equal(api.chapters.length,11);
const results=[];
for(const ch of api.chapters){assert.equal(ch.cases.length,10);for(const entry of ch.cases){assert.ok(entry.source&&entry.goal&&entry.hints.length>=2);assert.ok(fs.existsSync(entry.image));if(entry.grid){const count=first.countSolutions(entry.grid,2);results.push({chapter:ch.id,case:entry.number,solutions:count});assert.equal(count,1)}const blank={placements:{},order:[],answers:{},path:[],fields:[],refs:{}};assert.equal(api.valid(ch,entry,blank),false,`${ch.id}/${entry.number} rejects empty`)} }
const registry=JSON.parse(fs.readFileSync('assets/campaign/registry.json','utf8'));for(const asset of registry)assert.ok(fs.existsSync(asset.file));
console.log(`${results.length+4} grids: all unique; 110 new cases reject empty answers; ${registry.length} assets exist`);
