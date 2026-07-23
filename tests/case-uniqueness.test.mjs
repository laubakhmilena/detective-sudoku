import assert from "node:assert/strict";
import test from "node:test";
await import("../game.js");
const { cases, countSolutions } = globalThis.__detectiveSudokuTestApi;
const { auditAllCases } = await import("../tools/audit-clues.mjs");

test("all twelve fixed cases have exactly one logical solution", () => {
  assert.equal(cases.length, 12);
  for (const caseData of cases) {
    assert.equal(countSolutions(caseData, 2), 1, `case ${caseData.id} must have exactly one solution`);
  }
});

test("solutions obey one-person-per-row-and-column", () => {
  for (const caseData of cases) {
    const cells = Object.values(caseData.solution);
    const rows = cells.map((cell) => cell[0]);
    const columns = cells.map((cell) => cell.slice(1));
    assert.equal(new Set(rows).size, caseData.size, `case ${caseData.id}: duplicate row`);
    assert.equal(new Set(columns).size, caseData.size, `case ${caseData.id}: duplicate column`);
  }
});

test("every chapter one clue is logically required", () => {
  for (const caseReport of auditAllCases(cases)) {
    assert.equal(caseReport.fullSolutionsCount, 1, `case ${caseReport.caseId}: full clue set must be unique`);
    for (const clue of caseReport.clues) {
      assert.ok(clue.solutionsWithoutClue > 1, `case ${caseReport.caseId}, clue ${clue.index} is redundant`);
    }
  }
});
