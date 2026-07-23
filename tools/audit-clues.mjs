await import("../game.js");

const { cases, countSolutions } = globalThis.__detectiveSudokuTestApi;

export function auditCaseClues(caseData) {
  const fullSolutionsCount = countSolutions(caseData);
  const clues = caseData.clues.map((entry, index) => {
    const withoutClue = { ...caseData, clues: caseData.clues.filter((_, clueIndex) => clueIndex !== index) };
    const solutionsWithoutClue = countSolutions(withoutClue);
    return {
      index: index + 1,
      text: entry.text,
      rule: entry.rule,
      solutionsWithoutClue,
      status: solutionsWithoutClue === fullSolutionsCount ? "REDUNDANT" : "REQUIRED",
    };
  });
  return {
    caseId: caseData.id,
    title: caseData.title,
    totalClues: caseData.clues.length,
    fullSolutionsCount,
    clues,
  };
}

export function auditAllCases(caseList = cases) {
  return caseList.map(auditCaseClues);
}

function printReport(report) {
  for (const caseReport of report) {
    console.log(`Case ${String(caseReport.caseId).padStart(2, "0")} · ${caseReport.title}`);
    console.log(`Total clues: ${caseReport.totalClues}`);
    console.log(`Full solutionsCount: ${caseReport.fullSolutionsCount}`);
    for (const clue of caseReport.clues) {
      console.log(`Clue ${clue.index}:`);
      console.log(`  ${clue.text}`);
      console.log(`  solutions without clue: ${clue.solutionsWithoutClue}`);
      console.log(`  status: ${clue.status}`);
    }
    console.log("");
  }
}

if (process.argv[1] && import.meta.url === new URL(`file:///${process.argv[1].replaceAll("\\", "/")}`).href) {
  const report = auditAllCases();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else printReport(report);
  if (report.some((caseReport) => caseReport.fullSolutionsCount !== 1 || caseReport.clues.some((clue) => clue.status === "REDUNDANT"))) process.exitCode = 1;
}
