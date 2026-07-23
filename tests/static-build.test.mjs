import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("static build contains the three main game files", async () => {
  await Promise.all([
    access(new URL("../dist/index.html", import.meta.url)),
    access(new URL("../dist/styles.css", import.meta.url)),
    access(new URL("../dist/game.js", import.meta.url)),
  ]);
});

test("entrypoint links only the production stylesheet and game script", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /<title>Детективное судоку — Особняк Блэквуд<\/title>/i);
  assert.match(html, /href="\.\/styles\.css"/i);
  assert.match(html, /src="\.\/game\.js"/i);
  assert.doesNotMatch(html, /test\.html|demo\.html|preview\.html|react|vinext/i);
});

test("game script contains all required navigation and persistence contracts", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  for (const contract of ["Новые материалы ещё не получены", "localStorage", "YaGames.init", "checkSolution()", "chapter-complete"]) {
    assert.ok(script.includes(contract), `missing contract: ${contract}`);
  }
  assert.match(script, /data-action="menu-play">ИГРАТЬ<\/button>/);
  assert.match(script, /if \(action === "menu-play"\) return changeScreen\("archive"\);/);
  assert.doesNotMatch(script, /ПРОДОЛЖИТЬ ДЕЛО/);
  assert.doesNotMatch(script, /menu-play"\).*startCase/);
  assert.doesNotMatch(script, /data-action="sound"/);
  assert.doesNotMatch(script, /Вибрация|Показывать число ошибок|Неверно размещено:/);
  assert.match(script, /В РАССТАНОВКЕ ЕСТЬ ОШИБКА/);
  assert.match(script, /Проверьте улики ещё раз\./);
  assert.match(script, /data-action="toggle-sound"/);
  assert.match(script, /window\.setTimeout\(\(\) => \{[\s\S]*resetProgress\(\);[\s\S]*\}, 3000\);/);
  assert.doesNotMatch(script, /if \(action === "reset-progress"\) return resetProgress\(\)/);
  assert.match(script, /АРХИВ 01/);
  assert.match(script, /data-action="archive-range"/);
  assert.match(script, /data-action="open-folder"/);
  assert.match(script, /data-action="open-current-case"/);
  assert.match(script, /НАЧАТЬ РАССЛЕДОВАНИЕ/);
  assert.match(script, /lastArchiveRange/);
  assert.match(script, /chapterDiscovered/);
  assert.match(script, /unlockedMaterials/);
  assert.match(script, /state\.screen = "archive";[\s\S]*state\.openChapterId = 1;[\s\S]*Получены новые материалы · добавлен новый факт/);
});

test("chapter facts unlock only after their source cases", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const facts = [...script.matchAll(/id: "blackwood_fact_(\d+)", unlockAfterCase: (\d+), sourceCase: (\d+)/g)];
  assert.equal(facts.length, 12);
  facts.forEach((match, index) => {
    const expected = String(index + 1);
    assert.equal(String(Number(match[1])), expected);
    assert.equal(match[2], expected);
    assert.equal(match[3], expected);
  });
  assert.match(script, /seenFacts: \[\]/);
  assert.match(script, /Пока недостаточно сведений/);
  assert.doesNotMatch(script, /Раскрыто дел:.*Архив пополняется после каждого расследования/);
});

test("clue selection is independent from the reviewed mark", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(script, /data-action="select-clue"/);
  assert.match(script, /data-action="review-clue"/);
  assert.match(script, /if \(action === "select-clue"\)[\s\S]*state\.activeClue = index/);
  assert.match(script, /if \(action === "review-clue"\)[\s\S]*state\.reviewed =/);
  assert.match(script, /active\.type !== "adj_obj"/);
  assert.match(script, /\[\[-1, 0\], \[1, 0\], \[0, -1\], \[0, 1\]\]/);
  assert.match(script, /template\.rooms\[row \* caseData\.size \+ col\] === objectRoom/);
  assert.match(css, /\.board-cell\.clue-relation-cell/);
  assert.match(css, /\.room-label\.clue-room-label/);
});

test("a solved board requires a player conclusion before progress advances", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  assert.match(script, /const caseConclusions = \[/);
  assert.equal((script.match(/finalQuestion:/g) ?? []).length, 12);
  assert.equal((script.match(/correctConclusionCharacter:/g) ?? []).length, 12);
  assert.equal((script.match(/resultTitle:/g) ?? []).length, 12);
  assert.equal((script.match(/resultExplanation:/g) ?? []).length, 12);
  assert.match(script, /isFinalAccusation: true/);
  const checkSolutionBlock = script.match(/function checkSolution\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";
  assert.match(checkSolutionBlock, /state\.readyToAccuse = true/);
  assert.doesNotMatch(checkSolutionBlock, /state\.accusationOpen = true/);
  assert.match(script, /function finishCase\(\)[\s\S]*state\.screen = "result"/);
  assert.doesNotMatch(script.match(/function finishCase\(\) \{[\s\S]*?\n\}/)?.[0] ?? "", /persist\(|const completed\s*=/);
  assert.match(script, /function completeCaseAndContinue\(\)[\s\S]*persist\(/);
  assert.match(script, /data-action="continue-after-result"/);
  assert.match(script, /ВЫВОД НЕ ПОДТВЕРЖДАЕТСЯ УЛИКАМИ/);
  assert.match(script, /ОБВИНЕНИЕ НЕ ПОДТВЕРЖДАЕТСЯ/);
});

test("check button preserves the board lifecycle and uses styled status messages", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(script, /РАССТАНОВКА НЕ ЗАВЕРШЕНА/);
  assert.match(script, /В РАССТАНОВКЕ ЕСТЬ ОШИБКА/);
  assert.match(script, /РАССТАНОВКА ВОССТАНОВЛЕНА/);
  assert.match(script, /boardSolved: state\.readyToAccuse/);
  assert.match(script, /state\.readyToAccuse = Boolean\(saved\?\.boardSolved\)/);
  assert.match(script, /if \(state\.readyToAccuse\) return;/);
  assert.match(script, /data-action="edit-board"/);
  assert.doesNotMatch(script, /Можно завершить дело|Завершить дело/);
  assert.match(css, /\.toast-error/);
  assert.match(css, /\.toast-success/);
  assert.doesNotMatch(css, /\.toast[^\{]*\{[^}]*background:\s*#2d3438/);
});

test("responsive chapter copy has one canonical source", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  const canonical = "Эдмунд Блэквуд собирает родственников и доверенных людей в своём загородном особняке. Через два дня он собирается объявить об изменении завещания. Но уже в первый вечер начинают происходить странные события.";
  assert.equal(script.split(canonical).length - 1, 1, "canonical chapter description must exist only in chapter data");
  assert.doesNotMatch(script, /desktopDescription|mobileDescription|landscapeDescription|chapter\.preface|preface:/);
  assert.match(script, /class="chapter-summary">\$\{chapter\.description\}/);
  assert.match(script, /state\.materialOpen === "chapter-description"[\s\S]*\$\{chapter\.description\}/);
  assert.match(script, /class="lead">\$\{chapter\.description\}/);
  assert.match(css, /\.chapter-summary[\s\S]*-webkit-line-clamp:\s*3/);
  assert.match(css, /@media \(max-width: 932px\) and \(orientation: landscape\)[\s\S]*\.chapter-more-link \{ display: inline-flex/);
});

test("open archive folder is height-bounded at intermediate widths", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(css, /\.archive-screen\.app-screen \{ height: 100dvh; min-height: 0; overflow: hidden; \}/);
  assert.match(css, /\.archive-screen \.open-archive-folder \{ height: 100%; min-height: 0; max-height: 100%;[\s\S]*overflow: hidden; \}/);
  assert.match(css, /@media \(min-width: 600px\) and \(max-width: 1023px\) and \(orientation: portrait\)/);
  assert.match(css, /height: clamp\(130px,23dvh,200px\)/);
  assert.match(css, /height: clamp\(126px,18dvh,160px\)/);
  assert.match(css, /@media \(min-width: 720px\) and \(max-width: 1023px\)[\s\S]*grid-template-columns: minmax\(0,1\.25fr\) minmax\(245px,\.75fr\)/);
  assert.match(css, /@media \(min-width: 1024px\) and \(max-height: 900px\)/);
  assert.doesNotMatch(css, /\.open-archive-folder\s*\{[^}]*transform:\s*scale\(/);
});

test("mobile portrait clues collapse to an active clue preview", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(script, /function mobileClueEntryMarkup\(\)/);
  assert.match(script, /class="mobile-clue-entry active-clue-preview"/);
  assert.match(script, /ЦЕЛЬ РАССЛЕДОВАНИЯ/);
  assert.match(script, /class="clue-sheet-list-heading"/);
  assert.match(script, /state\.activeClue = index;[\s\S]*matchMedia\?\.\("\(max-width: 800px\) and \(orientation: portrait\)"\)\.matches\) state\.cluesOpen = false/);
  const reviewBlock = script.match(/if \(action === "review-clue"\) \{[\s\S]*?\n  \}/)?.[0] ?? "";
  assert.doesNotMatch(reviewBlock, /cluesOpen\s*=\s*false/);
  assert.match(css, /\.game-screen \.clue-bottom-sheet \{[\s\S]*height: 58dvh;[\s\S]*max-height: 65dvh/);
  assert.match(css, /\.game-screen \.bottom-sheet-layer \{[\s\S]*backdrop-filter: none/);
  assert.match(css, /\.active-clue-text \{[\s\S]*-webkit-line-clamp: 2/);
  assert.match(css, /\.clue-bottom-sheet \.clue-list \{[\s\S]*overflow-y: auto/);
  assert.match(script, /music: \{ label: "Муз\. салон"/);
});

test("mobile landscape archive header uses normal grid flow", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(script, /class="archive-description">Откройте папку и изучите новое расследование\.<\/p>/);
  assert.match(css, /@media \(max-width: 932px\) and \(orientation: landscape\)[\s\S]*grid-template-columns: minmax\(0,1fr\) auto/);
  assert.match(css, /\.archive-ranges \{ position: static; grid-column: 2; grid-row: 1;[\s\S]*transform: none; \}/);
  assert.match(css, /\.archive-folder-rail \{ grid-column: 1 \/ -1; grid-row: 2;/);
  assert.match(css, /@media \(orientation: landscape\) and \(max-height: 500px\)[\s\S]*\.archive-screen \.archive-description \{ display: none; \}/);
  assert.doesNotMatch(css, /\.archive-ranges \{ position: absolute; top: 50px;/);
});

test("compact landscape open folder favors the chapter information column", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(css, /grid-template-columns: minmax\(0,2fr\) minmax\(220px,1fr\)/);
  assert.match(css, /height: clamp\(70px,20dvh,90px\)/);
  assert.match(css, /\.archive-screen \.material-actions \{ display: flex; flex-wrap: nowrap;/);
  assert.match(css, /\.archive-screen \.current-case-panel \{ width: 100%; max-width: 290px;/);
  assert.match(css, /max-width: 280px;[\s\S]*height: clamp\(140px,45dvh,180px\)/);
  assert.match(css, /@media \(min-width: 933px\) and \(max-width: 1180px\) and \(orientation: landscape\) and \(max-height: 768px\)/);
  assert.match(css, /grid-template-columns: minmax\(0,2fr\) minmax\(260px,1fr\)/);
  assert.match(css, /\.archive-screen \.open-archive-folder \{ width: min\(92vw,1060px\); \}/);
});

test("autosaved placements remain movable and removable after reload", async () => {
  const script = await readFile(new URL("../game.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.doesNotMatch(script, /restoredPlacement|restored-placement|savedPlacementLocked/);
  assert.match(script, /state\.placements = clone\(saved\?\.placements \?\? \{\}\)/);
  assert.match(script, /if \(!state\.selectedPerson\) \{[\s\S]*if \(occupant\) \{[\s\S]*state\.selectedPerson = occupant/);
  assert.match(script, /if \(occupant === state\.selectedPerson && state\.placements\[state\.selectedPerson\] === cell\)/);
  assert.match(script, /state\.history\.push\(clone\(state\.placements\)\);[\s\S]*delete nextPlacements\[state\.selectedPerson\]/);
  assert.match(script, /delete nextPlacements\[state\.selectedPerson\];[\s\S]*saveActive\(\)/);
  assert.match(script, /selectedOccupant \? "selected-character-cell"/);
  assert.match(css, /\.board-cell\.selected-character-cell \.character-layer/);
  assert.match(script, /event\.key !== "Escape"[\s\S]*state\.selectedPerson = null/);
  assert.match(script, /else if \(state\.screen === "game" && state\.selectedPerson && !state\.readyToAccuse\)/);
});
