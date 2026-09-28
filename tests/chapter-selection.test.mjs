import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const storage = new Map();
const context = vm.createContext({
  console,
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
  window: { setTimeout: () => 0, innerWidth: 412, innerHeight: 924 },
});
context.globalThis = context;
for (const file of ['game.js', 'campaign/stories.js', 'campaign/engine.js']) {
  vm.runInContext(fs.readFileSync(path.join(base, file), 'utf8'), context, { filename: file });
}
const evaluate = code => vm.runInContext(code, context);
const action = (name, extra = '') => evaluate(`handleAction({dataset:{action:${JSON.stringify(name)},${extra}}})`);
const opening = evaluate('renderHome()');
assert.ok(opening.includes('home-stage') && opening.includes('home-seal'));
assert.ok(!opening.includes('<img'), 'start screen has no photographs');
assert.ok(!opening.includes('ВСЕГДА ОСТАВЛЯЕТ СЛЕДЫ'));
assert.ok(!opening.includes('data-action="settings"'));
assert.ok(opening.includes('Глава 1 · Дело 1'));
assert.ok(opening.includes('>Играть</button>'));

for (let tab = 0; tab < 4; tab++) {
  evaluate(`state.menuViewedChapter=${tab * 3 + 1}`);
  const html = evaluate('renderMenu()');
  assert.equal((html.match(/class="chapter-file /g) || []).length, 3, `tab ${tab + 1} must contain three folders`);
  assert.equal((html.match(/role="tab"/g) || []).length, 4);
  assert.ok(!html.includes('Особняк Блэквуд'), 'folder list must not reveal chapter titles');
  assert.ok(!html.includes('Маяк без огня'), 'folder list must not reveal future titles');
}

evaluate('state.screen="menu";state.menuViewedChapter=1');
action('chapter-folder', 'chapter:"2"');
assert.equal(evaluate('state.screen'), 'menu', 'locked folder cannot enter a chapter');
assert.equal(evaluate('state.toast.message'), 'Сначала завершите текущую главу');
action('chapter-folder', 'chapter:"1"');
assert.equal(evaluate('state.screen'), 'chapter-cover');
const cover = evaluate('renderChapterCover()');
assert.ok(cover.includes('Особняк Блэквуд'));
assert.ok(cover.includes('Начать расследование'));
assert.ok(!cover.includes('После ужина'), 'cover must not reveal case list');
action('cover-back');
assert.equal(evaluate('state.menuViewedChapter'), 1);
assert.equal(evaluate('state.screen'), 'menu');
action('chapter-tab', 'index:"3"');
assert.equal(evaluate('state.menuViewedChapter'), 10);
action('chapter-folder', 'chapter:"12"');
assert.equal(evaluate('state.screen'), 'menu');

evaluate('state.progress.completedCases=cases.map(entry=>entry.id);state.menuViewedChapter=1');
action('chapter-folder', 'chapter:"1"');
assert.equal(evaluate('state.screen'), 'archive');
assert.equal(evaluate('state.archiveReadOnly'), true);
assert.equal(evaluate('state.archiveTab'), 'materials');
action('open-case', 'caseId:"case-01"');
assert.equal(evaluate('state.screen'), 'archive');
evaluate('state.screen="home"');
action('home-resume');
assert.equal(evaluate('state.screen'), 'chapter-cover', 'continue moves to the next current chapter');
assert.equal(evaluate('state.coverChapterId'), 2);

evaluate('state.screen="menu";state.menuViewedChapter=1');
action('chapter-folder', 'chapter:"2"');
assert.equal(evaluate('state.screen'), 'chapter-cover');
assert.ok(evaluate('renderChapterCover()').includes('Начать расследование'));
action('cover-start');
assert.equal(evaluate('state.screen'), 'campaign');
assert.equal(evaluate('campaignView.screen'), 'case');

evaluate('campaignProgress.chapters[2].completed=campaignChapters[0].cases.map(entry=>entry.id);state.screen="menu"');
action('chapter-folder', 'chapter:"2"');
assert.equal(evaluate('campaignView.readOnly'), true);
assert.equal(evaluate('campaignView.tab'), 'materials');
action('campaign-case', 'index:"0"');
assert.equal(evaluate('campaignView.screen'), 'archive', 'completed campaign chapter cannot restart a case');
evaluate('campaignProgress.chapters[3]={completed:campaignChapters[1].cases.map(entry=>entry.id),states:{},evidence:[],caseIndex:9,stage:"complete"};state.screen="home"');
action('home-play');
evaluate('renderMenu()');
assert.equal(evaluate('state.menuTab'), 1, 'entry to archive selects range with current chapter');
action('chapter-folder', 'chapter:"4"');
assert.equal(evaluate('state.screen'), 'chapter-cover');
action('cover-back');
assert.equal(evaluate('state.menuTab'), 1, 'return from cover preserves selected range');

evaluate('state.menuViewedChapter=8;window.innerWidth=1366;window.innerHeight=768');
let wide = evaluate('renderMenu()');
assert.equal((wide.match(/class="chapter-file /g) || []).length, 6);
assert.equal((wide.match(/role="tab"/g) || []).length, 2);
assert.ok(wide.includes('7–12'));
assert.equal(evaluate('state.menuTab'), 1);
evaluate('window.innerWidth=412;window.innerHeight=924');
let narrow = evaluate('renderMenu()');
assert.equal((narrow.match(/class="chapter-file /g) || []).length, 3);
assert.equal(evaluate('state.menuTab'), 2);
assert.ok(narrow.includes('7–9'));
assert.equal(evaluate('state.menuViewedChapter'), 8);

for (const [width, height, expectedCount] of [[412,924,3],[412,968,3],[768,1024,3],[1024,768,6],[882,344,3],[1366,768,6]]) {
  evaluate(`window.innerWidth=${width};window.innerHeight=${height}`);
  const markup = evaluate('renderMenu()');
  assert.equal((markup.match(/class="chapter-file /g) || []).length, expectedCount, `${width}×${height}`);
  assert.equal((markup.match(/role="tab"/g) || []).length, 12 / expectedCount, `${width}×${height}`);
}

for (const [width, height, size] of [[412,924,3],[1024,768,6],[882,344,3]]) {
  evaluate(`window.innerWidth=${width};window.innerHeight=${height};state.screen="menu"`);
  for (let tab = 0; tab < 12 / size; tab++) {
    action('chapter-tab', `index:"${tab}"`);
    const markup = evaluate('renderMenu()');
    assert.equal((markup.match(/class="chapter-file /g) || []).length, size);
    assert.ok(markup.includes(`data-chapter="${tab * size + 1}"`));
    assert.ok(markup.includes(`data-chapter="${(tab + 1) * size}"`));
  }
}

console.log('chapter-selection: responsive groups, viewed chapter, locks, cover, back, read-only archive, chapter start PASS');
