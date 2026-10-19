# Детективное судоку

Браузерная логическая игра: восстановите расположение участников по уликам и определите виновника. Текущая версия — **3.2.0**: 12 самостоятельных авторских дел на полях от 5×5 до 8×8 и режим «Новые дела» с проверяемой генерацией.

## Как играть

Выберите дело в каталоге, прочитайте завязку и расставьте персонажей по плану. Учитывайте строки, столбцы, помещения, предметы и показания. Используйте заметки, отмену хода и подсказки; после проверки расстановки укажите виновника. Основная попытка, повторное прохождение и новое сгенерированное дело сохраняются отдельно.

## Возможности

- Русский и английский интерфейс и тексты улик.
- Каталог дел, обучение, фильтры и личные лучшие результаты.
- Адаптивный интерфейс для компьютера и телефона, обе ориентации.
- Локальные сохранения, настройка громкости и короткие синтезированные эффекты.
- Интеграция Яндекс Игр: загрузка, игровой статус, облако и реклама; локальный режим работает без SDK.
- Собственные SVG-портреты и предметы.

## Запуск

Для игры достаточно открыть `index.html` или раздать каталог любым статическим HTTP-сервером, например:

```bash
python -m http.server 8000
```

Откройте `http://localhost:8000`. Используйте один адрес и браузер, чтобы продолжать локальное сохранение. Для игры установка Node.js и зависимостей не требуется.

## Структура проекта

| Каталог | Содержимое |
| --- | --- |
| `data/`, `js/`, `styles/` | Данные дел, игровая логика и интерфейс |
| `assets/` | Портреты и объекты сцен |
| `platform/` | Интеграция Яндекс Игр |
| `tests/`, `tools/` | Проверки, генерация и сборка |
| `reports/` | Отчёты аудита и результаты проверок |
| `Релиз для Яндекс Игр/` | Архив игры и материалы для загрузки |

## Проверки и сборка

Запускайте из корня проекта с установленным Node.js:

```bash
node tests/independent-data.test.mjs
node tests/endless-data.test.mjs
node tools/build-independent.mjs
```

Браузерные тесты требуют Playwright и Chrome. Сборка появляется в `build/independent` и не включает инструменты и отчёты.

## Обновление 19 октября 2026

Полностью перенесена актуальная локальная версия: независимые дела v3.2 заменяют прежнюю кампанию по главам. История старой версии сохраняется в Git. Добавлены исходники, ресурсы, тесты, отчёты и готовые релизные архивы. При переносе повторно прошли проверки 12 авторских и 300 сгенерированных дел и сборка.

Проект — кандидат на релиз. Загрузка на GitHub не означает публикацию на Яндекс Играх. Реальные рекламные показы, облако и авторизация требуют проверки на платформе; локальные SDK-тесты используют имитацию.

## Подробная техническая документация

# Detective Sudoku — authored v3.2

12 independent authored spatial mysteries (5×5–8×8), plus verified new cases after the authored series. Open `index.html` directly or serve the directory on localhost. Local play needs no installation or network.

## Runtime

- `data/puzzles.js`: the 12 authored maps, furniture, clues and solutions. Their logical data is unchanged by the release audit.
- `js/puzzle-engine.js`: shared placement policy, constraint evaluation, solver and culprit validation.
- `js/ui.js`, `js/app.js`, `styles/`: responsive paper catalog, top-down board, evidence cards, case brief, tutorial, hints and results.
- `js/endless-generator.js`: seeded version 1 generator. Every returned scene passes uniqueness and culprit checks.
- `js/endless-worker.js`, `js/endless.js`: asynchronous generation on HTTP; deterministic local fallback on file://.
- `js/save-system.js`: main and replay attempts, independent new-case attempt, normalization and monotonic personal bests.
- `assets/avatars/`, `assets/objects/`: 77 original SVG portraits and 32 original illustrated objects.
- `platform/yandex.js`: official relative `/sdk.js`, LoadingAPI, GameplayAPI, SDK language, safe storage, player cloud data, explicit authorization and ads. Local mode on file:// and localhost unless `?yandex` is supplied for the mock.

## Saves

SAVE_VERSION remains **3**, local key `detective-independent-v3`. Existing results and attempts remain compatible. Generated cases save their seed, number, difficulty and attempt independently. Errors, revealed hints, notes, placements and active-play time survive reload. Completed cases unlock new cases; replay cannot increase the authored completion count or duplicate new-case completion rewards.

Local/cloud synchronization unions completed cases and retains better results. The newest save supplies settings and attempts; older missing attempts are retained. Concurrent devices editing the same unfinished attempt are resolved by timestamp, not by combining two placements.

Sound settings include mute, volume and a test effect. The game uses short synthesized effects; there is no music track. Effects stop when the page loses focus or an advertisement pauses play. The active-play timer also pauses while an overlay is open.

## Checks

Run commands directly with Node when npm is unavailable:

- `node tests/independent-data.test.mjs`: all 12 unique solutions, blind deduction, bilingual data and save normalization.
- `node tests/independent-browser.mjs`: all 12 completions, notes, undo, errors, hints, replay, localization, pause, migration and 17 sizes.
- `node tests/endless-data.test.mjs`: 300 reproducible unique generated cases, 300 distinct plans, unlock and save checks.
- `node tests/seating-browser.mjs`: all 23 seats, 13 sitting clues, row/column conflict messages and Anna after reload. Set `BUILT=1` for the packaged build.
- `node tests/case-brief-browser.mjs`: all 12 briefs, victim information, return to the plan, modal stability and unread brief after reload.
- `node tests/local-polish-browser.mjs`: home/catalog/5×5/8×8 in RU and EN at 17 sizes; local saves, offline timer, rotation, continuous resize, asset and external-request checks.
- `node tests/release-audit-browser.mjs`: all 12 boards with all markers at 18 sizes in RU and EN; hint stability, new-case workflow, rotation and WebAudio checks.
- `node tests/independent-sdk-browser.mjs`: SDK mock lifecycle, language, safe storage, player saves, merge, authorization, ads and HTTP Worker. **This is not a test against the live Yandex platform.**

## Build and release audit

`node tools/build-independent.mjs` writes `build/independent` using an explicit runtime manifest. Only referenced artwork and runtime files are shipped. Tools, reports, tests, screenshots and old campaign files are excluded.

The user-facing upload package is in `Релиз для Яндекс Игр/`: `01 — Игра для загрузки.zip` contains the game with `index.html` at its root; `02 — Материалы Яндекс Игр.zip` contains the icon, cover, nine gameplay screenshots grouped by orientation, three H.264 MP4 captures, and a Russian upload guide. Temporary QA screenshots were removed after the final release captures were preserved. Internal export inputs remain in `Подготовка релиза/Материалы/Исходники`; this working folder is not part of the upload package.

See `reports/release-audit.md` and its linked machine-readable checks for measured results and remaining release gates. The Yandex draft/console was not opened or changed. Physical Android/iOS devices and live platform ads/cloud storage still need testing before publication.

## Authoring and references

`node tools/author-scenes.mjs`, `node tools/draw-portraits.mjs` and `node tools/draw-scene-objects.mjs` maintain scene definitions and original art. Murdoku was studied as a presentation reference; its images, logos and puzzles are not included.

Old chapters and the former campaign are outside this active independent-puzzle build. Historical reports remain separate; the current release audit identifies the checks actually performed for this version.
