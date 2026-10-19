# Локальная доработка authored-v3

STATUS: COMPLETED

12 самостоятельных дел. Геометрия, предметы, решения, victimId/killerId, движок, solver, validator и deduction analyzer сохранены. Внешние сервисы не использовались; platform/yandex.js не изменялся в этой доработке.

## PUZZLES: 12 / 12

Rules включает внутреннее общее правило жертвы; оно объясняется в обучении, а не повторяется отдельной уликой.

ID | Название | Размер | Сложность | Rules | Solutions | Killer | requiresGuessing | Результат
---|---|---|---|---|---|---|---|---
bookshop|Книжная лавка|5×5|Very Easy|10|1|Елена|false|PASS
cafe|Кафе на углу|5×5|Very Easy|12|1|Лев|false|PASS
garden|Ботанический сад|5×5|Very Easy|11|1|Роман|false|PASS
antiques|Антикварная лавка|5×5|Easy|12|1|Ульяна|false|PASS
hotel|Загородный отель|6×6|Easy|14|1|Зоя|false|PASS
station|Последний поезд|6×6|Medium|16|1|Нина|false|PASS
gallery|Ночная галерея|7×7|Medium|21|1|Тарас|false|PASS
theatre|После занавеса|7×7|Medium|19|1|Белла|false|PASS
yacht|Тихая гавань|7×7|Hard|11|1|Ева|false|PASS
museum|Закрытая экспозиция|8×8|Hard|10|1|Мирон|false|PASS
resort|Снег за окном|8×8|Expert|14|1|Ярослав|false|PASS
laboratory|Опыт после полуночи|8×8|Expert|14|1|Кирилл|false|PASS

## Сложность

Поздние задачи: число условий 22 → 11, 23 → 10, 25 → 14, 30 → 14. В лаборатории нет прямого размещения до сопоставления условий.

ID | Прямые размещения | Сокращения кандидатов | Итерации | Зависимые размещения | Начальные кандидаты
---|---|---|---|---|---
bookshop|1|16|4|4|1, 2, 2, 3, 8
cafe|2|15|3|3|2, 1, 1, 3, 8
garden|1|15|4|4|1, 2, 2, 3, 5
antiques|1|17|4|4|2, 1, 5, 4, 3
hotel|3|19|3|3|1, 1, 5, 4, 1, 32
station|2|19|3|4|1, 1, 3, 3, 3, 7
gallery|3|23|4|4|1, 1, 1, 4, 5, 3, 4
theatre|2|23|3|5|3, 1, 3, 1, 7, 4, 11
yacht|2|31|6|5|1, 1, 4, 6, 9, 45, 45
museum|1|44|9|7|1, 11, 37, 4, 59, 59, 2, 59
resort|1|42|9|7|3, 1, 59, 59, 4, 59, 34, 12
laboratory|0|47|9|8|38, 4, 44, 4, 11, 38, 58, 3

Анализатор использует только исключение кандидатов и поддержку пар условий; solution/killerId удаляются из его входа. Итерации включают последний проход без изменений. Это проверка логической выводимости, а не измерение времени мышления человека.

## MANUAL PLAYTEST

Локальный браузер, действия агента через интерфейс: каталог, вступление, размещение, перенос, отмена, заметка, подсказка, проверка, виновник, результат, повтор. Сохранения не подставлялись.

- Level 1: PASS
- Level 4: PASS
- Level 7: PASS
- Level 10: PASS
- Level 12: PASS

Незаконченный повтор после reload: PASS. Последнее дело при 5/12 не выдаёт ложное «Все дела решены»: PASS. Все 12 дел также пройдены автоматическими кликами в отдельном регрессионном тесте.

## RESPONSIVE

Chrome. Каждая строка проверена в RU и EN; PASS требует отсутствия прокрутки страницы, выхода основных блоков/подписей за экран, наложения поля и панели, сломанных изображений и undefined/NaN. Каталог прокручивается внутри своей области.

Размер | Home | Catalog | 5×5 | 8×8 | Поле 5×5 / 8×8, px
---|---|---|---|---|---
344×882|PASS|PASS|PASS|PASS|324 / 324
375×667|PASS|PASS|PASS|PASS|354 / 320
390×844|PASS|PASS|PASS|PASS|370 / 370
427×952|PASS|PASS|PASS|PASS|407 / 407
440×956|PASS|PASS|PASS|PASS|420 / 420
667×375|PASS|PASS|PASS|PASS|299 / 299
844×390|PASS|PASS|PASS|PASS|314 / 314
882×344|PASS|PASS|PASS|PASS|268 / 268
956×440|PASS|PASS|PASS|PASS|364 / 364
768×1024|PASS|PASS|PASS|PASS|632 / 632
960×1440|PASS|PASS|PASS|PASS|917 / 917
1080×1920|PASS|PASS|PASS|PASS|1037 / 1037
1024×768|PASS|PASS|PASS|PASS|561 / 561
1280×800|PASS|PASS|PASS|PASS|625 / 625
1366×768|PASS|PASS|PASS|PASS|592 / 592
1600×900|PASS|PASS|PASS|PASS|693 / 693
1920×1080|PASS|PASS|PASS|PASS|873 / 873

Смена ориентации: PASS. Плавное изменение ширины: PASS. Повторное открытие подсказки без движения поля: PASS.

## LOCAL CHECKS

- LOCAL SAVE: PASS; active puzzle, positions, notes, hints, mistakes, timer, solved, stars, best time, sound, language.
- TIMER / OFFLINE: PASS; 10 секунд игры, пауза и возврат без добавления времени отсутствия.
- REPLAY: PASS; пустая новая попытка, solved сохранён, время/звёзды/подсказки не ухудшают рекорды.
- LEVEL 12 ENDING: PASS; 12/12 и без перехода на первый уровень.
- RU: PASS.
- EN: PASS.
- FILE BUILD: PASS; прямой запуск index.html, размещение и reload.
- JS ERRORS: 0.
- BROKEN ASSETS: 0.
- EXTERNAL REQUESTS: 0.

## FILES CHANGED

- index.html; package.json; README.md.
- data/puzzles.js; data/translations.js.
- js/app.js; js/ui.js; js/save-system.js.
- styles/main.css; styles/game.css; styles/responsive.css.
- assets/avatars/portrait-01.svg … portrait-77.svg.
- tools/author-scenes.mjs; tools/scene-clue-text.mjs; tools/polish-scenes.mjs; tools/draw-portraits.mjs; tools/build-independent.mjs; tools/write-independent-report.mjs.
- tests/independent-data.test.mjs; tests/independent-browser.mjs; tests/local-polish-browser.mjs.
- reports/: validator, deductions, UI, local save, manual UI, build and this report.

## BUILD

122 files; 300661 bytes unpacked; 109 SVG assets, including 77 distinct portraits. No authoring scripts, offline analyzers, reports, screenshots or old campaign files. SAVE_VERSION=3 remains compatible because geometry and solutions have not changed.

## REMAINING ISSUES

No blocking defects found in the performed local checks. Safari/Firefox and physical touch devices were not tested; viewport emulation used desktop Chrome. Human focus-group calibration is not claimed. Yandex integration, ads, cloud, moderation and publishing are outside this task and were not tested.
