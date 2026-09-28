import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(projectRoot, "game.js"), "utf8");
const sandbox = { console };
sandbox.globalThis = sandbox;
vm.runInNewContext(source, sandbox, { filename: "game.js" });
const api = sandbox.__detectiveSudokuTestApi;

assert.ok(api, "game.js must expose the verification API");
assert.equal(api.SAVE_VERSION, 5);
assert.equal(api.cases.length, 12);
assert.deepEqual(Array.from(api.cases, (entry) => entry.mechanic), [
  "grid", "grid", "timeline", "itemChain", "grid", "route",
  "documentCompare", "route", "documentCompare", "documentCompare", "finance", "reconstruction",
]);

const requiredFields = ["id", "chapterId", "title", "mechanic", "snapshotTime", "intro", "materials", "puzzleData", "solution", "unlocks", "nextQuestion", "resultSummary", "hints", "image"];
for (const entry of api.cases) {
  for (const field of requiredFields) assert.ok(Object.hasOwn(entry, field), `${entry.id} is missing ${field}`);
  assert.ok(entry.hints.some((hint) => typeof hint?.text === "string" && hint.text.trim()), `${entry.id} needs a working hint`);
  if (entry.image) assert.equal(fs.existsSync(path.resolve(projectRoot, entry.image)), true, `${entry.id} has a broken image path`);
}
assert.equal(fs.existsSync(path.resolve(projectRoot, api.chapter.cover)), true);
assert.equal(fs.existsSync(path.resolve(projectRoot, api.chapter.map)), true);

assert.equal(api.chapter.owner, "richard");
assert.equal(JSON.stringify({ chapter: api.chapter, cases: api.cases }).includes("Эдмунд"), false);
assert.equal(JSON.stringify({ chapter: api.chapter, cases: api.cases }).includes("завещ"), false);

for (const id of ["case-01", "case-02", "case-05", "case-11"]) {
  const entry = api.cases.find((candidate) => candidate.id === id);
  assert.equal(api.countSolutions(entry, 2), 1, `${id} must have exactly one grid solution`);
}
assert.deepEqual(JSON.parse(JSON.stringify(api.validateAllCases())), [
  { id: "case-01", solutionsCount: 1 },
  { id: "case-02", solutionsCount: 1 },
  { id: "case-05", solutionsCount: 1 },
  { id: "case-11", solutionsCount: 1 },
]);

const locationIds = ["living_room", "central_hall", "west_gallery", "study", "library", "archive", "music_room", "kitchen", "winter_garden", "service_passage", "service_switch"];
assert.deepEqual(Object.keys(api.locations), locationIds);
const edge = (a, b, seconds) => api.locationConnections.some((item) => ((item.from === a && item.to === b) || (item.from === b && item.to === a)) && item.travelTime === seconds);
assert.equal(edge("living_room", "central_hall", 25), true);
assert.equal(edge("central_hall", "study", 35), true);
assert.equal(edge("west_gallery", "service_switch", 40), true);
assert.equal(edge("service_switch", "study", 50), true);
assert.equal(api.travelTimeBetween("west_gallery", "service_switch"), 40);
assert.equal(api.travelTimeBetween("service_switch", "study"), 50);

const evidenceIds = new Set(Array.from(api.evidenceRegistry, (entry) => entry.id));
assert.ok(evidenceIds.has("ev-k17-fragment"));
assert.ok(evidenceIds.has("ev-finance-chain"));
const evidenceFields = ["id", "title", "type", "source", "eventTime", "obtainedAt", "description", "directConclusion", "status", "image", "unlockedByCase", "relatedCharacters", "relatedLocations", "relatedMaterials"];
const evidenceStatuses = new Set(["unknown", "unverified", "confirmed", "contradicted", "disproved"]);
for (const entry of api.evidenceRegistry) {
  for (const field of evidenceFields) assert.ok(Object.hasOwn(entry, field), `${entry.id} is missing ${field}`);
  assert.ok(evidenceStatuses.has(entry.status), `${entry.id} has an invalid status`);
}
for (const entry of api.cases) {
  for (const id of [...entry.materials, ...(entry.unlocks?.evidence || [])]) assert.ok(evidenceIds.has(id), `${entry.id} refers to unknown evidence ${id}`);
}
for (const entry of api.evidenceRegistry) {
  assert.ok(api.cases.some((candidate) => candidate.id === entry.unlockedByCase), `${entry.id} has no unlocking case`);
}
const finalEvidence = api.cases.find((entry) => entry.id === "case-12").puzzleData.evidence;
for (const id of finalEvidence) assert.ok(api.evidenceRegistry.find((entry) => entry.id === id)?.unlockedByCase !== "case-12", `${id} is created too late for the final`);

const saved = api.normalizeProgress({ saveVersion: 5, completedCases: ["case-01", "case-01"], currentCase: "case-02", errors: { "case-01": 2 }, hintsUsed: { "case-01": 1 } });
assert.deepEqual(Array.from(saved.completedCases), ["case-01"]);
assert.equal(saved.errors["case-01"], 2);
assert.equal(saved.hintsUsed["case-01"], 1);
assert.deepEqual(Array.from(api.normalizeProgress({ saveVersion: 4, completedCases: ["case-01"] }).completedCases), []);

console.log("chapter1-data: ok");
