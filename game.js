const ASSET_ROOT = "./assets/images/chapter1_blackwood";
const SAVE_VERSION = 5;
const STORAGE_KEY = "detective-sudoku-progress-v1";
const AUDIO_STORAGE_KEY = "detective-sudoku-audio-v1";

const characters = {
  richard: { id: "richard", name: "Ричард Блэквуд", shortName: "Ричард", role: "хозяин особняка", avatar: null, accent: "#7b4e4e" },
  anna: { id: "anna", name: "Анна Блэквуд", shortName: "Анна", role: "племянница", avatar: ASSET_ROOT + "/characters/anna_blackwood.png", accent: "#a94848" },
  boris: { id: "boris", name: "Борис Хейл", shortName: "Борис", role: "семейный адвокат", avatar: ASSET_ROOT + "/characters/boris_hale.png", accent: "#45566d" },
  elena: { id: "elena", name: "Елена Моррис", shortName: "Елена", role: "секретарь", avatar: ASSET_ROOT + "/characters/elena_morris.png", accent: "#8a6f9b" },
  dmitry: { id: "dmitry", name: "Дмитрий Блейк", shortName: "Дмитрий", role: "управляющий", avatar: ASSET_ROOT + "/characters/dmitry_blake.png", accent: "#55715a" },
  maria: { id: "maria", name: "Мария Рид", shortName: "Мария", role: "домоправительница", avatar: ASSET_ROOT + "/characters/maria_reed.png", accent: "#8b6b73" },
  leon: { id: "leon", name: "Леон Фостер", shortName: "Леон", role: "гость семьи", avatar: null, accent: "#6e6f92" },
};

const chapter = {
  id: "blackwood",
  chapterId: "blackwood",
  owner: "richard",
  title: "Особняк Блэквуд",
  subtitle: "Глава 1",
  cover: ASSET_ROOT + "/chapter/blackwood_mansion_cover.webp",
  map: ASSET_ROOT + "/chapter/blackwood_mansion_map.webp",
  description: "Ричард Блэквуд обнаружил махинации по договору K-17 и собирался утром передать оригиналы полиции. Вечером он погиб в кабинете. Теперь нужно восстановить не только кто имел доступ, но и какую цепочку документов пытались скрыть.",
};

const objectPath = (name) => ASSET_ROOT + "/objects/" + name + ".svg";
const uiPath = (name) => ASSET_ROOT + "/ui/" + name + ".svg";
const uiAssets = {
  back: uiPath("icon_back"),
  settings: uiPath("icon_settings"),
  hint: uiPath("icon_hint"),
  notes: uiPath("icon_notes"),
  check: uiPath("icon_check"),
  lock: uiPath("icon_lock"),
  timer: uiPath("icon_timer"),
};

const locations = {
  living_room: { id: "living_room", title: "Гостиная", shortTitle: "гостиная", color: "#dfecda", discovered: true },
  central_hall: { id: "central_hall", title: "Центральный холл", shortTitle: "холл", color: "#efe8d7", discovered: true },
  west_gallery: { id: "west_gallery", title: "Западная галерея", shortTitle: "галерея", color: "#e0ebf3", discovered: true },
  study: { id: "study", title: "Кабинет", shortTitle: "кабинет", color: "#e8dfed", discovered: true },
  library: { id: "library", title: "Библиотека", shortTitle: "библиотека", color: "#dceaf4", discovered: true },
  archive: { id: "archive", title: "Архив", shortTitle: "архив", color: "#dfeadc", discovered: true },
  music_room: { id: "music_room", title: "Музыкальный салон", shortTitle: "салон", color: "#efe2d1", discovered: true },
  kitchen: { id: "kitchen", title: "Кухня", shortTitle: "кухня", color: "#f0e2d3", discovered: true },
  winter_garden: { id: "winter_garden", title: "Зимний сад", shortTitle: "сад", color: "#dceee4", discovered: true },
  service_passage: { id: "service_passage", title: "Служебный проход", shortTitle: "проход", color: "#e4deea", discovered: false, hidden: true },
  service_switch: { id: "service_switch", title: "Рубильник западного крыла", shortTitle: "рубильник", color: "#e4deea", discovered: false, hidden: true },
};

const locationConnections = [
  { from: "living_room", to: "central_hall", travelTime: 25 },
  { from: "central_hall", to: "study", travelTime: 35 },
  { from: "central_hall", to: "west_gallery", travelTime: 60 },
  { from: "central_hall", to: "kitchen", travelTime: 40 },
  { from: "central_hall", to: "winter_garden", travelTime: 45 },
  { from: "west_gallery", to: "library", travelTime: 25 },
  { from: "west_gallery", to: "music_room", travelTime: 25 },
  { from: "west_gallery", to: "archive", travelTime: 30 },
  { from: "west_gallery", to: "service_switch", travelTime: 40 },
  { from: "west_gallery", to: "service_passage", travelTime: 40 },
  { from: "service_switch", to: "study", travelTime: 50 },
  { from: "service_passage", to: "service_switch", travelTime: 0 },
];

function connectionKey(a, b) {
  return a < b ? a + "|" + b : b + "|" + a;
}

const connectionTimes = new Map();
locationConnections.forEach((edge) => connectionTimes.set(connectionKey(edge.from, edge.to), edge.travelTime));

function travelTimeBetween(a, b) {
  if (a === "west_gallery" && b === "service_passage") return 40;
  if (b === "west_gallery" && a === "service_passage") return 40;
  if (a === "service_passage" && b === "study") return 50;
  if (b === "service_passage" && a === "study") return 50;
  return connectionTimes.get(connectionKey(a, b));
}

function locationTitle(id) {
  return locations[id]?.title || id;
}

const evidenceRegistry = [
  { id: "ev-dinner-announcement", title: "Объявление Ричарда", type: "testimony", source: "Протокол ужина", eventTime: "20:42", obtainedAt: "Дело 1", description: "Ричард сообщил, что обнаружил махинации по договору K-17 и утром передаст оригиналы полиции.", directConclusion: "У Ричарда был мотив сохранить оригиналы до утра.", status: "unknown", image: null, unlockedByCase: "case-01", relatedCharacters: ["richard"], relatedLocations: ["living_room"], relatedMaterials: [] },
  { id: "ev-boris-assignment", title: "Поручение у письменного стола", type: "testimony", source: "Записка Ричарда", eventTime: "20:42", obtainedAt: "Дело 1", description: "Ричард попросил Бориса подождать возле письменного стола, пока он соберёт бумаги.", directConclusion: "Присутствие Бориса у стола объясняется обычным поручением.", status: "unknown", image: null, unlockedByCase: "case-01", relatedCharacters: ["richard", "boris"], relatedLocations: ["study"], relatedMaterials: [] },
  { id: "ev-key-return", title: "Возврат запасного ключа", type: "log", source: "Журнал прислуги", eventTime: "20:45", obtainedAt: "Дело 2", description: "Мария вернула запасной ключ на доску. Борис находился рядом, но сам факт взятия ключа не зафиксирован.", directConclusion: "Ключ был на доске в 20:45; наблюдение за ним оставалось неполным.", status: "unknown", image: null, unlockedByCase: "case-02", relatedCharacters: ["maria", "boris"], relatedLocations: ["central_hall"], relatedMaterials: [] },
  { id: "ev-time-window", title: "Окно времени смерти", type: "timeline", source: "Часы и показания", eventTime: "21:05–21:12", obtainedAt: "Дело 3", description: "Ричард был жив около 21:05. Повреждение часов произошло примерно около 21:07, а тело нашли около 21:12.", directConclusion: "Событие нужно искать в интервале 21:05–21:12; 21:07 — наиболее вероятная точка, а не доказанная секунда.", status: "unknown", image: null, unlockedByCase: "case-03", relatedCharacters: ["richard", "maria"], relatedLocations: ["study"], relatedMaterials: [] },
  { id: "ev-body-found", title: "Обнаружение тела", type: "observation", source: "Показание Марии", eventTime: "21:12", obtainedAt: "Дело 3", description: "Мария пришла с лампой после восстановления света и обнаружила Ричарда в кабинете.", directConclusion: "До 21:12 тело не было обнаружено, поэтому окно расследования остаётся ограниченным.", status: "unknown", image: null, unlockedByCase: "case-03", relatedCharacters: ["maria", "richard"], relatedLocations: ["study"], relatedMaterials: ["ev-time-window"] },
  { id: "ev-key-chain", title: "Цепочка запасного ключа", type: "chain", source: "Журнал выдачи и пломба", eventTime: "20:45–21:12", obtainedAt: "Дело 4", description: "Ключ вернули на доску, затем выдали Анне для короткого визита в кабинет, вернули и опечатали. После убийства пломбу вскрыли.", directConclusion: "Анна и Мария действительно скрывали нарушения процедуры, но цепочка сама по себе не доказывает убийство.", status: "unknown", image: null, unlockedByCase: "case-04", relatedCharacters: ["anna", "maria"], relatedLocations: ["central_hall", "study"], relatedMaterials: ["ev-key-return"] },
  { id: "ev-west-schematic", title: "Рабочая схема западного крыла", type: "document", source: "Папка управляющего", eventTime: "20:50", obtainedAt: "Дело 5", description: "Схема показывает расположение библиотеки, галереи, архива и музыкального салона. Дмитрий сверялся с ней в библиотеке в 20:50.", directConclusion: "Этот снимок фиксирует 20:50; для проверки алиби нужны наблюдения за временем преступления.", status: "unknown", image: null, unlockedByCase: "case-05", relatedCharacters: ["dmitry"], relatedLocations: ["library", "west_gallery", "archive", "music_room"], relatedMaterials: [] },
  { id: "ev-service-passage", title: "Служебный проход", type: "map", source: "Рабочая схема и механизм рубильника", eventTime: "после 21:00", obtainedAt: "Дело 6", description: "Скрытый проход соединяет западную галерею с кабинетом через рубильник западного крыла.", directConclusion: "Проход знали Борис, Дмитрий и Мария. Знание маршрута не является доказательством убийства.", status: "unknown", image: null, unlockedByCase: "case-06", relatedCharacters: ["boris", "dmitry", "maria"], relatedLocations: ["west_gallery", "service_passage", "service_switch", "study"], relatedMaterials: ["ev-west-schematic"] },
  { id: "ev-k17-fragment", title: "Обрывок K-17", type: "document", source: "Осмотр повреждённых часов", eventTime: "21:07", obtainedAt: "Дело 7", description: "Фрагмент совпадает с форматом платёжного поручения и содержит номер K-17.", directConclusion: "Речь идёт о части платёжного поручения K-17, а не о бытовой записке.", status: "unknown", image: null, unlockedByCase: "case-07", relatedCharacters: ["richard"], relatedLocations: ["study"], relatedMaterials: [] },
  { id: "ev-blackout-route", title: "Маршрут во время отключения", type: "route", source: "Карта и показания", eventTime: "21:06–21:08", obtainedAt: "Дело 8", description: "Только путь через западную галерею, служебный проход и рубильник укладывается в условия отключения света и доступа к кабинету.", directConclusion: "Ручное отключение через проход физически совместимо с проникновением, но имя вошедшего ещё не установлено.", status: "unknown", image: null, unlockedByCase: "case-08", relatedCharacters: ["boris", "dmitry", "maria"], relatedLocations: ["west_gallery", "service_passage", "service_switch", "study"], relatedMaterials: ["ev-service-passage", "ev-time-window"] },
  { id: "ev-k17-payment", title: "Изменённое платёжное поручение", type: "document", source: "Сравнение договора и копий", eventTime: "до вечера преступления", obtainedAt: "Дело 9", description: "Работы по K-17 частично настоящие, но сумма завышена, а получатель и счёт в поручении изменены.", directConclusion: "У схемы есть финансовый выгодоприобретатель, но документ ещё не связывает его с ударом.", status: "unknown", image: null, unlockedByCase: "case-09", relatedCharacters: ["richard"], relatedLocations: ["archive"], relatedMaterials: ["ev-k17-fragment"] },
  { id: "ev-original-missing", title: "Исчезновение оригинала", type: "chain", source: "Опись Ричарда и фотография Леона", eventTime: "21:00–после 21:12", obtainedAt: "Дело 10", description: "Оригинал K-17 был у Ричарда перед закрытием кабинета, но после обнаружения тела в папке его уже не было.", directConclusion: "Документ похищен после последней описи; конкретный похититель пока не установлен.", status: "unknown", image: null, unlockedByCase: "case-10", relatedCharacters: ["richard", "leon", "elena"], relatedLocations: ["study"], relatedMaterials: ["ev-k17-payment"] },
  { id: "ev-finance-chain", title: "Финансовая цепочка K-17", type: "finance", source: "Реестр платежей", eventTime: "до преступления", obtainedAt: "Дело 11", description: "K-17 связан с платёжным поручением, изменённым получателем, компанией-посредником и счётом под контролем Бориса.", directConclusion: "У Бориса есть убедительный мотив скрыть схему и убрать оригинал.", status: "unknown", image: null, unlockedByCase: "case-11", relatedCharacters: ["boris", "richard"], relatedLocations: ["archive", "study"], relatedMaterials: ["ev-k17-payment", "ev-original-missing"] },
  { id: "ev-boris-route", title: "Противоречие в маршруте Бориса", type: "testimony", source: "Сопоставление сетки и карты", eventTime: "21:04", obtainedAt: "Дело 11", description: "Показание Бориса о непрерывном ожидании в галерее не согласуется с временем, необходимым для его краткого исчезновения.", directConclusion: "Борис имел мотив и физическую возможность, но обвинение должно опираться на всю совокупность материалов.", status: "unknown", image: null, unlockedByCase: "case-11", relatedCharacters: ["boris", "maria"], relatedLocations: ["west_gallery", "study"], relatedMaterials: ["ev-blackout-route", "ev-finance-chain"] },
];

const evidenceById = Object.fromEntries(evidenceRegistry.map((entry) => [entry.id, entry]));
const chapterFacts = evidenceRegistry.map((entry) => ({
  id: entry.id,
  unlockAfterCase: Number(entry.unlockedByCase.slice(-2)),
  sourceCase: Number(entry.unlockedByCase.slice(-2)),
  optionalCategory: entry.type,
  text: entry.description,
}));

const room4 = [
  "library","library","central_hall","central_hall",
  "library","library","central_hall","central_hall",
  "living_room","living_room","study","study",
  "living_room","living_room","study","study",
];
const case02Rooms = [
  "central_hall","central_hall","central_hall","central_hall",
  "central_hall","central_hall","central_hall","central_hall",
  "living_room","living_room","study","study",
  "living_room","living_room","study","study",
];
const room5 = [
  "library","library","west_gallery","west_gallery","west_gallery",
  "library","library","west_gallery","west_gallery","west_gallery",
  "music_room","music_room","archive","archive","winter_garden",
  "music_room","music_room","archive","archive","winter_garden",
  "central_hall","central_hall","archive","archive","winter_garden",
];
const room6 = [
  "library","library","west_gallery","west_gallery","west_gallery","study",
  "library","library","west_gallery","west_gallery","west_gallery","study",
  "kitchen","kitchen","central_hall","central_hall","winter_garden","study",
  "kitchen","kitchen","central_hall","central_hall","winter_garden","winter_garden",
    "library","archive","central_hall","west_gallery","winter_garden","winter_garden",
  "library","archive","service_passage","service_passage","winter_garden","winter_garden",
];

const o = (cell, id, label, file = id, canOccupy = false) => ({ cell, id, label, path: file ? objectPath(file) : null, canOccupy });
const boardTemplates = {
  4: {
    rooms: room4,
    objects: [o("A1", "window", "Окно"), o("A4", "painting", "Портрет"), o("B2", "armchair", "Кресло", "armchair", true), o("B4", "plant", "Растение"), o("C1", "fireplace", "Камин"), o("C3", "desk", "Письменный стол"), o("D2", "bookshelf", "Книжный шкаф")],
  },
  Case02SpareKey4: {
    rooms: case02Rooms,
    objects: [o("A3", "window", "Окно"), o("B1", "plant", "Растение"), o("B3", "key_board", "Доска с ключами"), o("B4", "armchair", "Кресло", "armchair", true), o("C2", "fireplace", "Камин"), o("D2", "bookshelf", "Книжный шкаф")],
  },
  5: {
    rooms: room5,
    objects: [o("A1", "window", "Окно"), o("A4", "bust", "Бюст", null), o("B3", "piano", "Пианино", null), o("B5", "fireplace", "Камин"), o("C1", "armchair", "Кресло", "armchair", true), o("C4", "bookshelf", "Книжный шкаф"), o("D3", "desk", "Письменный стол"), o("D5", "plant", "Растение"), o("E2", "floor_clock", "Часы"), o("E4", "safe", "Сейф")],
  },
  6: {
    rooms: room6,
    objects: [o("A1", "window", "Окно"), o("A4", "painting", "Портрет"), o("C3", "lamp", "Лампа", "candle_lamp"), o("B5", "fireplace", "Камин"), o("C1", "table", "Стол"), o("D2", "armchair", "Кресло", "armchair", true), o("D3", "statue", "Статуя", null), o("D5", "sofa", "Диван", "sofa", true), o("E1", "bookshelf", "Книжный шкаф"), o("E2", "safe", "Сейф"), o("E6", "plant", "Растение"), o("F2", "bookshelf", "Шкаф"), o("F4", "floor_clock", "Часы")],
  },
};

Object.values(boardTemplates).forEach(template => template.objects.forEach(object => {
  if (!object.path) object.path = objectPath(object.id);
}));
const rule = (type, ...args) => ({ type, args });
const gridClue = (id, text, logic, source, hint, hint2 = "Сопоставьте этот факт с уже занятыми строками и столбцами.") => ({ id, text, rule: logic, sourceType: "TESTIMONY", source, hint, hint2 });
const caseImage = (id, slug) => ASSET_ROOT + "/cases/case_" + String(id).padStart(2, "0") + "_" + slug + ".webp";
const caseImages = {
  "case-01": caseImage(1, "last_dinner"),
  "case-02": null,
  "case-03": caseImage(6, "broken_clock"),
  "case-04": caseImage(3, "missing_key"),
  "case-05": caseImage(5, "burnt_letter"),
  "case-06": null,
  "case-07": caseImage(7, "secret_compartment"),
  "case-08": null,
  "case-09": null,
  "case-10": null,
  "case-11": null,
  "case-12": caseImage(12, "murder_in_study"),
};

function makeGridCase(data) {
  const grid = data.puzzleData;
  return Object.assign({}, data, {
    chapterId: "blackwood",
    mechanic: "grid",
    image: data.image === undefined ? caseImages[data.id] : data.image,
    puzzleData: Object.assign({ kind: "grid" }, grid),
    size: grid.size,
    templateId: grid.templateId,
    participants: grid.participants,
    clues: grid.clues,
    slug: data.id,
  });
}

function makeCase(data) {
  return Object.assign({ chapterId: "blackwood", image: caseImages[data.id] || null, materials: [], unlocks: { evidence: [], mapDiscoveries: [] }, hints: [] }, data);
}

const cases = [
  makeGridCase({
    id: "case-01", number: 1, title: "После ужина", difficulty: "Очень легко", snapshotTime: "20:42",
    intro: "После ужина Ричард просит нескольких людей занять привычные места. Восстановите расстановку и выясните, кто ждал у письменного стола по обычному поручению хозяина.",
    materials: ["ev-dinner-announcement"],
    puzzleData: {
      size: 4, templateId: 4, participants: ["anna", "boris", "elena", "dmitry"], targetCell: "C3", targetLabel: "Письменный стол",
      clues: [
        gridClue("c1-dmitry", "Дмитрий задержался рядом с растением в холле.", rule("adj_obj", "dmitry", "plant"), "Мария", "Найдите клетки рядом с растением."),
        gridClue("c1-elena", "Елена закрывала защёлку библиотечного окна.", rule("adj_obj", "elena", "window"), "Елена", "Ищите соседство с окном в библиотеке."),
        gridClue("c1-boris", "Бориса просили ждать возле письменного стола.", rule("adj_obj", "boris", "desk"), "Записка Ричарда", "Письменный стол находится в кабинете."),
      ],
    },
    solution: { anna: "D1", boris: "C4", elena: "A2", dmitry: "B3" },
    nextQuestion: "Борис был у стола по поручению. Кто и когда видел запасной ключ после этого?",
    resultSummary: "Борис действительно ждал у письменного стола по обычному поручению Ричарда. Такое присутствие само по себе не делает его виновным.",
    unlocks: { evidence: ["ev-dinner-announcement", "ev-boris-assignment"], mapDiscoveries: [] },
    hints: [{ text: "Начните с Дмитрия: растение ограничивает его соседние клетки.", mechanic: "grid" }, { text: "После Дмитрия проверьте соседство Елены с окном.", mechanic: "grid" }],
  }),
  makeGridCase({
    id: "case-02", number: 2, title: "Ключ на доске", difficulty: "Легко", snapshotTime: "20:45",
    intro: "Мария возвращает запасной ключ на доску в центральном холле. Восстановите положение участников в этот момент и отделите наблюдение от доказательства кражи.",
    materials: ["ev-dinner-announcement", "ev-boris-assignment"],
    puzzleData: {
      size: 4, templateId: "Case02SpareKey4", participants: ["anna", "boris", "elena", "dmitry"], targetCell: "B3", targetLabel: "Доска с ключами",
      clues: [
        gridClue("c2-boris", "Тот же человек, который ждал Ричарда у стола, стоял рядом с растением, когда ключ вернули.", rule("adj_obj", "boris", "plant"), "Мария", "Сопоставьте это показание с делом 1."),
        gridClue("c2-anna", "В 20:45 Анна лично приняла чай в гостиной.", rule("room", "anna", "living_room"), "Журнал подачи напитков", "Служебная запись подтверждает комнату, а не действие с ключом."),
        gridClue("c2-order", "С верхней площадки Леон видел Анну севернее Елены.", rule("above", "anna", "elena"), "Леон", "Сначала определите порядок по вертикали."),
      ],
    },
    solution: { anna: "C1", boris: "B2", elena: "D3", dmitry: "A4" },
    nextQuestion: "Ключ был на месте в 20:45. Как он прошёл через руки до опечатывания кабинета?",
    resultSummary: "Борис находился рядом с доской, но сетка не показывает, что он брал ключ. Нужна отдельная цепочка выдачи и возврата.",
    unlocks: { evidence: ["ev-key-return"], mapDiscoveries: [] },
    hints: [{ text: "Сначала поставьте Бориса рядом с растением, затем используйте гостиную Анны.", mechanic: "grid" }],
  }),
  makeCase({
    id: "case-03", number: 3, title: "Последние минуты", mechanic: "timeline", snapshotTime: "21:05–21:12",
    intro: "Показания часов, света и Марии дают несколько временных ориентиров. Разложите события так, чтобы не превратить приблизительную отметку 21:07 в ошибочную точную секунду.",
    materials: ["ev-key-return"],
    puzzleData: {
      kind: "timeline",
      events: [
        { id: "clock-check", title: "Сверка часов", time: "20:58", description: "Мария сверяет механические часы с кухонными." },
        { id: "last-talk", title: "Последний разговор Ричарда", time: "21:05", description: "Ричард ещё отвечает из кабинета." },
        { id: "blackout", title: "Отключение света", time: "21:06", description: "Западное крыло погружается во тьму." },
        { id: "clock-damage", title: "Повреждение часов", time: "около 21:07", description: "Падение останавливает механизм." },
        { id: "maria-arrives", title: "Приход Марии", time: "21:10", description: "Мария идёт к кабинету с лампой после восстановления света." },
        { id: "body-found", title: "Обнаружение тела", time: "21:12", description: "Ричарда находят в кабинете." },
      ],
      solution: ["clock-check", "last-talk", "blackout", "clock-damage", "maria-arrives", "body-found"],
    },
    solution: ["clock-check", "last-talk", "blackout", "clock-damage", "maria-arrives", "body-found"],
    nextQuestion: "Теперь известен интервал. Кто мог попасть к кабинету за эти минуты?",
    resultSummary: "Ричард был жив около 21:05, тело нашли около 21:12, а повреждение часов произошло примерно около 21:07.",
    unlocks: { evidence: ["ev-time-window", "ev-body-found"], mapDiscoveries: [] },
    hints: [{ text: "Сначала поставьте событие с самым ранним временем, затем найдите точку, где Ричард ещё жив.", mechanic: "timeline" }],
  }),
  makeCase({
    id: "case-04", number: 4, title: "Незаписанная выдача", mechanic: "itemChain", snapshotTime: "20:45–21:12",
    intro: "Журнал ключей неполон. Восстановите путь запасного ключа и отдельно проверьте два показания, которые скрывают нарушение процедуры, но могут оказаться ложным следом.",
    materials: ["ev-key-return", "ev-time-window"],
    puzzleData: {
      kind: "itemChain", itemTitle: "Запасной ключ",
      items: [
        { id: "return", title: "Возврат ключа на доску", time: "20:45", description: "Мария возвращает ключ после ужина." },
        { id: "anna-receives", title: "Выдача Анне", time: "20:51", description: "Анна получает ключ для короткого визита." },
        { id: "study-visit", title: "Посещение кабинета", time: "20:54", description: "Анна открывает кабинет и забирает папку с бумагами для Ричарда." },
        { id: "key-returned", title: "Возврат ключа", time: "20:58", description: "Ключ возвращают на доску до критического интервала." },
        { id: "sealed", title: "Опечатывание двери", time: "21:00", description: "Мария ставит временную пломбу." },
        { id: "seal-broken", title: "Вскрытие пломбы после убийства", time: "после 21:12", description: "Пломба обнаружена вскрытой при осмотре." },
      ],
      solution: ["return", "anna-receives", "study-visit", "key-returned", "sealed", "seal-broken"],
      testimonies: [
        { id: "anna-denial", character: "anna", text: "Анна говорит, что в кабинет не входила.", expected: "contradicted" },
        { id: "maria-log", character: "maria", text: "Мария утверждает, что выдача была полностью записана.", expected: "contradicted" },
      ],
    },
    solution: { order: ["return", "anna-receives", "study-visit", "key-returned", "sealed", "seal-broken"], testimonies: { "anna-denial": "contradicted", "maria-log": "contradicted" } },
    nextQuestion: "Ключ вернулся на место до критического времени. Какой маршрут объясняет следы из западного крыла?",
    resultSummary: "Анна скрыла короткий вход в кабинет, а Мария — незаписанную выдачу. Обе лжи реальны, но цепочка не доказывает, что кто-то из них убил Ричарда.",
    unlocks: { evidence: ["ev-key-chain"], mapDiscoveries: [] },
    hints: [{ text: "Сначала отделите действия до опечатывания от того, что произошло уже после обнаружения тела.", mechanic: "itemChain" }],
  }),
  makeGridCase({
    id: "case-05", number: 5, title: "След из зимнего сада", difficulty: "Средне", snapshotTime: "20:50",
    intro: "На ковре нашли землю из зимнего сада. Восстановите положение пяти участников по общей карте дома, затем проверьте, что именно скрывал Дмитрий.",
    materials: ["ev-key-chain"],
    puzzleData: {
      size: 5, templateId: 5, participants: ["anna", "boris", "elena", "dmitry", "maria"], targetCell: "A1", targetLabel: "Окно",
      clues: [
        gridClue("c5-anna-room", "Анна находилась в зимнем саду.", rule("room", "anna", "winter_garden"), "Мария", "Оставьте Анне клетки зимнего сада."),
        gridClue("c5-dmitry-room", "Дмитрий сверялся со схемой в библиотеке.", rule("room", "dmitry", "library"), "Рабочая схема", "Библиотека занимает два верхних ряда слева."),
        gridClue("c5-boris-room", "Борис оставался в западной галерее.", rule("room", "boris", "west_gallery"), "Леон", "Галерея находится справа от библиотеки."),
        gridClue("c5-elena-room", "Елена проверяла папку в архиве.", rule("room", "elena", "archive"), "Елена", "Архив отмечен в центральной части поля."),
        gridClue("c5-maria-room", "Мария получала свечи в музыкальном салоне.", rule("room", "maria", "music_room"), "Ведомость прислуги", "Музыкальный салон расположен в нижней левой части."),
        gridClue("c5-dmitry-window", "Дмитрий придерживал библиотечную оконную раму.", rule("adj_obj", "dmitry", "window"), "Мария", "Проверьте клетки рядом с окном."),
        gridClue("c5-boris-above", "Елена видела Бориса севернее Дмитрия.", rule("above", "boris", "dmitry"), "Елена", "Сравните их положение по вертикали."),
        gridClue("c5-anna-no-archive", "Анна в этот момент внутрь архива не входила.", rule("not_room", "anna", "archive"), "Журнал входов", "Это отрицание не отменяет её нахождения в зимнем саду."),
      ],
    },
    solution: { anna: "E5", boris: "A3", elena: "D4", dmitry: "B1", maria: "C2" },
    nextQuestion: "Схема подтверждает, что Дмитрий не успевал к кабинету. Кто ещё мог знать о скрытом проходе?",
    resultSummary: "Дмитрий действительно был связан со схемой западного крыла, но его маршрут не позволяет попасть к кабинету в интервал 21:05–21:12.",
    unlocks: { evidence: ["ev-west-schematic"], mapDiscoveries: [] },
    hints: [{ text: "Начните с пяти указанных помещений: они сразу задают рабочие зоны участников.", mechanic: "grid" }],
  }),
];

cases.push(
  makeCase({
    id: "case-06", number: 6, title: "Служебный проход", mechanic: "route", snapshotTime: "21:02",
    intro: "Рабочая схема западного крыла показывает несколько стен, но не подписывает старый ход. Соедините возможные точки и восстановите маршрут к кабинету через рубильник.",
    materials: ["ev-west-schematic", "ev-time-window"],
    puzzleData: {
      kind: "route", mode: "discoverPassage", start: "west_gallery", target: "study",
      route: ["west_gallery", "service_passage", "service_switch", "study"],
      segments: [
        { from: "west_gallery", to: "service_passage", time: 40, note: "За панелью галереи находится скрытая дверь." },
        { from: "service_passage", to: "service_switch", time: 0, note: "Рубильник расположен внутри прохода." },
        { from: "service_switch", to: "study", time: 50, note: "Лестница выходит за кабинетом." },
      ],
    },
    solution: { path: ["west_gallery", "service_passage", "service_switch", "study"] },
    nextQuestion: "Проход найден, но им могли пользоваться несколько людей. Какой маршрут остаётся возможным во время темноты?",
    resultSummary: "Маршрут западная галерея — служебный проход — рубильник — кабинет существует. Проход знали Борис, Дмитрий и Мария, поэтому знание о нём ещё не доказывает убийство.",
    unlocks: { evidence: ["ev-service-passage"], mapDiscoveries: ["service_passage", "service_switch"] },
    hints: [{ text: "Начните с западной галереи и соедините её с непомеченной служебной зоной.", mechanic: "route" }],
  }),
  makeCase({
    id: "case-07", number: 7, title: "Обрывок K-17", mechanic: "documentCompare", snapshotTime: "21:07",
    intro: "Под повреждёнными часами нашли фрагмент бумаги. Сравните его формат и физические признаки с несколькими документами, не полагаясь только на номер.",
    materials: ["ev-service-passage", "ev-time-window"],
    puzzleData: {
      kind: "documentCompare", mode: "fragment",
      fragment: { title: "Найденный фрагмент", fields: ["K-17", "две колонки с суммой и получателем", "платёжное поручение", "волокна серой папки"] },
      candidates: [
        { id: "k16-invoice", title: "Счёт K-16", fields: ["K-16", "одна колонка", "счёт-фактура", "белая папка"] },
        { id: "k17-payment", title: "Платёжное поручение K-17", fields: ["K-17", "две колонки с суммой и получателем", "платёжное поручение", "волокна серой папки"] },
        { id: "k17-receipt", title: "Квитанция K-17", fields: ["K-17", "одна колонка с печатью", "квитанция", "гладкая синяя бумага"] },
        { id: "work-schedule", title: "График работ", fields: ["без номера платежа", "таблица дат", "рабочий график", "жёлтая папка"] },
      ],
      requiredFields: [0, 1, 2, 3],
      solution: { candidate: "k17-payment", fields: [0, 1, 2, 3] },
    },
    solution: { candidate: "k17-payment", fields: [0, 1, 2, 3] },
    nextQuestion: "K-17 — платёжное поручение. Какие именно поля были изменены в копии?",
    resultSummary: "По номеру, структуре и физическим признакам фрагмент относится к платёжному поручению K-17.",
    unlocks: { evidence: ["ev-k17-fragment"], mapDiscoveries: [] },
    hints: [{ text: "Сравните не только номер: формат полей и бумага должны совпасть одновременно.", mechanic: "documentCompare" }],
  }),
  makeCase({
    id: "case-08", number: 8, title: "Три маршрута во тьме", mechanic: "route", snapshotTime: "21:06–21:08",
    intro: "Служебный проход уже нанесён на карту. Для каждого варианта решите, мог ли человек физически пройти его за время отключения света и попасть к кабинету.",
    materials: ["ev-service-passage", "ev-time-window", "ev-k17-fragment"],
    puzzleData: {
      kind: "route", mode: "routeChoices",
      blackout: { starts: "21:06", duration: 90, switch: "service_switch" },
      options: [
        { id: "front-door", title: "Гостиная → холл → кабинет", path: ["living_room", "central_hall", "study"], time: 60, possible: false, reason: "Обычная дверь в западном крыле была закрыта на время отключения." },
        { id: "kitchen-loop", title: "Кухня → холл → зимний сад → кабинет", path: ["kitchen", "central_hall", "winter_garden", "study"], time: 120, possible: false, reason: "Путь дольше темноты и не приводит к рубильнику." },
        { id: "service-route", title: "Западная галерея → служебный проход → рубильник → кабинет", path: ["west_gallery", "service_passage", "service_switch", "study"], time: 90, possible: true, reason: "Маршрут совпадает со схемой, рубильником и доступным интервалом." },
        { id: "library-loop", title: "Библиотека → галерея → архив → кабинет", path: ["library", "west_gallery", "archive", "study"], time: 115, possible: false, reason: "В архиве нет прямого выхода к кабинету." },
      ],
      solution: { possible: { "front-door": false, "kitchen-loop": false, "service-route": true, "library-loop": false } },
    },
    solution: { possible: { "front-door": false, "kitchen-loop": false, "service-route": true, "library-loop": false } },
    nextQuestion: "Маршрут совместим с проникновением. Что показывает сравнение платёжных полей?",
    resultSummary: "Только маршрут через служебный проход физически совместим с ручным отключением света и доступом к кабинету. Виновник пока не установлен.",
    unlocks: { evidence: ["ev-blackout-route"], mapDiscoveries: [] },
    hints: [{ text: "Сверяйте одновременно время пути, закрытые входы и наличие рубильника на маршруте.", mechanic: "route" }],
  }),
  makeCase({
    id: "case-09", number: 9, title: "Изменённый платёж", mechanic: "documentCompare", snapshotTime: "до 21:00",
    intro: "Сравните договор K-17, исходную копию и изменённое поручение по конкретным полям. Не все отличия означают подделку: часть работ действительно была выполнена.",
    materials: ["ev-k17-fragment", "ev-blackout-route"],
    puzzleData: {
      kind: "documentCompare", mode: "fieldCompare",
      fields: [
        { id: "amount", label: "Сумма", options: [{ id: "original", label: "120 000", note: "в договоре" }, { id: "changed", label: "480 000", note: "в поручении" }], answer: "changed" },
        { id: "recipient", label: "Получатель", options: [{ id: "original", label: "North Quay Works", note: "в договоре" }, { id: "changed", label: "Hale Advisory", note: "в поручении" }], answer: "changed" },
        { id: "date", label: "Дата", options: [{ id: "original", label: "12 октября", note: "совпадает" }, { id: "changed", label: "19 октября", note: "другая дата" }], answer: "original" },
        { id: "account", label: "Счёт", options: [{ id: "original", label: "NW-04", note: "исходный" }, { id: "changed", label: "HA-17", note: "изменённый" }], answer: "changed" },
        { id: "signature", label: "Подпись", options: [{ id: "original", label: "оригинал Ричарда", note: "ручная" }, { id: "changed", label: "воспроизведена", note: "копия образца" }], answer: "changed" },
        { id: "documentOrigin", label: "Происхождение", options: [{ id: "contract", label: "договор K-17", note: "подлинный" }, { id: "payment", label: "платёжное поручение", note: "изменённая копия" }], answer: "payment" },
      ],
    },
    solution: { amount: "changed", recipient: "changed", date: "original", account: "changed", signature: "changed", documentOrigin: "payment" },
    nextQuestion: "У схемы есть выгодоприобретатель. Где находился оригинал непосредственно перед закрытием кабинета?",
    resultSummary: "Работы по K-17 частично настоящие, но сумма завышена, получатель и счёт изменены, а подпись воспроизведена.",
    unlocks: { evidence: ["ev-k17-payment"], mapDiscoveries: [] },
    hints: [{ text: "Отмечайте только те поля, которые действительно расходятся между источником и поручением.", mechanic: "documentCompare" }],
  }),
  makeCase({
    id: "case-10", number: 10, title: "Последняя опись", mechanic: "documentCompare", snapshotTime: "21:00–после 21:12",
    intro: "Сопоставьте опись Ричарда, фотографию Леона и показание Елены. Нужно установить судьбу оригинала, не называя человека, который его забрал.",
    materials: ["ev-k17-payment", "ev-time-window"],
    puzzleData: {
      kind: "documentCompare", mode: "custody",
      prompts: [
        { id: "origin", label: "Кому принадлежал оригинал перед закрытием?", options: [{ id: "richard", label: "Ричарду" }, { id: "elena", label: "Елене" }, { id: "boris", label: "Борису" }], answer: "richard" },
        { id: "beforeClose", label: "Что указано в описи кабинета?", options: [{ id: "present", label: "Оригинал в папке" }, { id: "missing", label: "Папка уже пуста" }], answer: "present" },
        { id: "photo", label: "Что видно на фотографии Леона?", options: [{ id: "sealed", label: "Папка закрыта и лежит у Ричарда" }, { id: "open", label: "Папка уже вскрыта" }], answer: "sealed" },
        { id: "elena", label: "Что подтверждает Елена?", options: [{ id: "closure", label: "Она закрыла кабинет в 21:00" }, { id: "removal", label: "Она забрала оригинал" }], answer: "closure" },
        { id: "afterDeath", label: "Каково состояние папки после обнаружения тела?", options: [{ id: "missing", label: "Оригинала нет" }, { id: "present", label: "Оригинал на месте" }], answer: "missing" },
      ],
    },
    solution: { origin: "richard", beforeClose: "present", photo: "sealed", elena: "closure", afterDeath: "missing" },
    nextQuestion: "Оригинал исчез. Кому шли деньги и кто мог воспользоваться маршрутом?",
    resultSummary: "Оригинал находился у Ричарда непосредственно перед закрытием кабинета, а после убийства исчез. Кто именно его забрал, пока не установлено.",
    unlocks: { evidence: ["ev-original-missing"], mapDiscoveries: [] },
    hints: [{ text: "Сначала отделите состояние папки до закрытия от состояния при последующем осмотре.", mechanic: "documentCompare" }],
  }),
);

cases.push(makeCase({
  id: "case-11", number: 11, title: "Кому шли деньги", mechanic: "finance", snapshotTime: "21:04",
  intro: "Соберите финансовую цепочку K-17, затем восстановите расстановку участников в 6×6. В конце используйте общую карту и время перехода, но не делайте вывод по одному совпадению.",
  materials: ["ev-k17-payment", "ev-original-missing", "ev-blackout-route"],
  puzzleData: {
    kind: "finance",
    finance: {
      items: [
        { id: "k17", title: "Договор K-17", description: "Исходный контракт" },
        { id: "payment", title: "Платёжное поручение", description: "Изменённая сумма и получатель" },
        { id: "recipient", title: "Получатель Hale Advisory", description: "Имя в изменённом поручении" },
        { id: "company", title: "Компания-посредник", description: "Юридическая оболочка" },
        { id: "boris-control", title: "Счёт под контролем Бориса", description: "Подтверждённая связь" },
      ],
      solution: ["k17", "payment", "recipient", "company", "boris-control"],
    },
    grid: {
      size: 6, templateId: 6, participants: ["anna", "boris", "elena", "dmitry", "maria", "leon"],
      targetLabel: "Кабинет пуст",
      clues: [
        gridClue("c11-dmitry-library", "Дмитрий находился в библиотеке.", rule("room", "dmitry", "library"), "Сетка наблюдений", "Оставьте Дмитрию библиотеку."),
        gridClue("c11-leon-library", "Леон находился в библиотеке.", rule("room", "leon", "library"), "Сетка наблюдений", "Два человека должны занять разные клетки одной зоны."),
        gridClue("c11-anna-winter", "Анна находилась в зимнем саду.", rule("room", "anna", "winter_garden"), "Показание Анны", "Ищите нижнюю правую зелёную зону."),
        gridClue("c11-elena-winter", "Елена находилась в зимнем саду.", rule("room", "elena", "winter_garden"), "Показание Елены", "Проверьте свободные строки и столбцы."),
        gridClue("c11-boris-gallery", "Борис оставался в западной галерее.", rule("room", "boris", "west_gallery"), "Показание Бориса", "Галерея расположена в верхней части поля."),
        gridClue("c11-maria-gallery", "Мария была в другой точке западной галереи.", rule("room", "maria", "west_gallery"), "Показание Марии", "Её клетка не должна совпасть с Борисом."),
        gridClue("c11-dmitry-above", "Дмитрий был севернее Леона.", rule("above", "dmitry", "leon"), "Леон", "Сравните строки библиотеки."),
        gridClue("c11-boris-above", "Борис был севернее Марии.", rule("above", "boris", "maria"), "Мария", "Сравните строки галереи."),
        gridClue("c11-boris-above-dmitry", "Борис был севернее Дмитрия.", rule("above", "boris", "dmitry"), "Сводка маршрутов", "Сопоставьте высоту западной галереи и библиотеки."),
        gridClue("c11-dmitry-left", "Леон был западнее Дмитрия.", rule("left", "leon", "dmitry"), "План библиотеки", "Сравните столбцы."),
        gridClue("c11-boris-left", "Борис был западнее Марии.", rule("left", "boris", "maria"), "План галереи", "Мария находится восточнее Бориса."),
        gridClue("c11-anna-left", "Анна находилась западнее Елены.", rule("left", "anna", "elena"), "План зимнего сада", "Сравните две оставшиеся зимние позиции."),
        gridClue("c11-anna-sofa", "Анна стояла у дивана в зимнем саду.", rule("adj_obj", "anna", "sofa"), "Наблюдение Леона", "Диван ограничивает несколько клеток."),
        gridClue("c11-elena-plant", "Елена была рядом с растением.", rule("adj_obj", "elena", "plant"), "Показание Елены", "Растение отмечено в нижней части поля."),
      ],
    },
  },
  solution: { finance: ["k17", "payment", "recipient", "company", "boris-control"], grid: { anna: "C5", boris: "A3", elena: "D6", dmitry: "B2", maria: "E4", leon: "F1" } },
  nextQuestion: "Мотив и возможность сходятся. Как восстановить всю версию убийства без единственного магического доказательства?",
  resultSummary: "Финансовая цепочка связывает K-17 с контролируемым Борисом счётом. Сетка и карта дают ему физическую возможность и выявляют противоречие в маршруте, но финал должен собрать независимые материалы.",
  unlocks: { evidence: ["ev-finance-chain", "ev-boris-route"], mapDiscoveries: [] },
  hints: [{ text: "В финансовой цепочке начните с договора, а в сетке сначала разместите две пары по комнатам.", mechanic: "finance" }],
}));

cases.push(makeCase({
  id: "case-12", number: 12, title: "Версия убийства", mechanic: "reconstruction", snapshotTime: "21:05–21:12",
  intro: "Все материалы первой главы собраны. Теперь восстановите версию преступления по нескольким независимым решениям: мотив, время, путь, орудие, исчезнувший документ и последовательность действий.",
  materials: ["ev-finance-chain", "ev-boris-route", "ev-original-missing"],
  puzzleData: {
    kind: "reconstruction",
    parts: {
      suspect: { label: "Преступник", options: [{ id: "boris", label: "Борис Хейл" }, { id: "anna", label: "Анна Блэквуд" }, { id: "dmitry", label: "Дмитрий Блейк" }, { id: "maria", label: "Мария Рид" }], answer: "boris" },
      motive: { label: "Мотив", options: [{ id: "hide-k17", label: "Скрыть схему K-17 и убрать оригинал" }, { id: "inheritance", label: "Изменить наследство" }, { id: "revenge", label: "Личная месть" }], answer: "hide-k17" },
      time: { label: "Временной интервал", options: [{ id: "window", label: "21:05–21:12, вероятнее около 21:07" }, { id: "after-midnight", label: "После полуночи" }, { id: "dinner", label: "Сразу после ужина, около 20:45" }], answer: "window" },
      path: { label: "Путь", options: [{ id: "service", label: "Западная галерея → служебный проход → рубильник → кабинет" }, { id: "front", label: "Гостиная → центральный холл → кабинет" }, { id: "garden", label: "Зимний сад → кухня → кабинет" }], answer: "service" },
      blackout: { label: "Зачем отключали свет", options: [{ id: "cover-entry", label: "Скрыть вход и выход через служебный проход" }, { id: "damage-clock", label: "Только остановить часы" }, { id: "frighten-house", label: "Напугать гостей" }], answer: "cover-entry" },
      weapon: { label: "Орудие", options: [{ id: "paperweight", label: "Латунное пресс-папье" }, { id: "key", label: "Запасной ключ" }, { id: "lamp", label: "Керосиновая лампа" }], answer: "paperweight" },
      material: { label: "Похищенный материал", options: [{ id: "k17-original", label: "Оригинал документа K-17" }, { id: "key-log", label: "Журнал выдачи ключей" }, { id: "clock", label: "Механизм часов" }], answer: "k17-original" },
    },
    evidence: ["ev-dinner-announcement", "ev-time-window", "ev-service-passage", "ev-blackout-route", "ev-k17-payment", "ev-original-missing", "ev-finance-chain", "ev-boris-route"],
    sequence: [
      { id: "enter", label: "Вход в служебный проход" },
      { id: "switch-off", label: "Отключение света рубильником" },
      { id: "enter-study", label: "Проникновение в кабинет" },
      { id: "strike", label: "Удар пресс-папье" },
      { id: "take-document", label: "Изъятие оригинала K-17" },
      { id: "return", label: "Возвращение в западное крыло" },
      { id: "switch-on", label: "Включение света" },
      { id: "rejoin", label: "Возвращение к остальным" },
    ],
    sequenceAnswer: ["enter", "switch-off", "enter-study", "strike", "take-document", "return", "switch-on", "rejoin"],
  },
  solution: {
    suspect: "boris", motive: "hide-k17", time: "window", path: "service", blackout: "cover-entry", weapon: "paperweight", material: "k17-original",
    evidence: ["ev-dinner-announcement", "ev-time-window", "ev-service-passage", "ev-blackout-route", "ev-k17-payment", "ev-original-missing", "ev-finance-chain", "ev-boris-route"],
    sequence: ["enter", "switch-off", "enter-study", "strike", "take-document", "return", "switch-on", "rejoin"],
  },
  nextQuestion: "Глава завершена: сохраните материалы и переходите к следующему делу.",
  resultSummary: "Борис скрыл финансовую схему K-17, отключил свет через служебный проход, ударил Ричарда латунным пресс-папье и забрал оригинал документа. Интервал 21:05–21:12, наиболее вероятно около 21:07.",
  unlocks: { evidence: [], mapDiscoveries: [] },
  hints: [{ text: "Финальная версия должна одновременно объяснить K-17, исчезновение оригинала, темноту и маршрут через рубильник.", mechanic: "reconstruction" }],
}));


// Source records are collected on opening a case; deductions unlock only after solving it.
const sourceRecords = {
  3: ['Протокол осмотра', 'Механические часы сверены в 20:58, после падения показывают 21:07. На латунном пресс-папье кровь Ричарда; форма повреждения совпадает с его ребром. Лампа цела, ключ не имеет следов удара.'],
  4: ['Журнал и пломба', 'В журнале есть возврат в 20:45 и 20:58, но нет выдачи. Анну видели с ключом у кабинета в 20:54. Елена заперла дверь в 21:00, Мария опечатала её. В 21:12 Мария при свидетелях вскрыла целую пломбу и обнаружила тело.'],
  6: ['Замеры стен', 'За панелью западной галереи обнаружены потёртости и лестница длиной 40 секунд хода. На площадке — рубильник. От площадки узкий коридор ведёт к задней двери кабинета за 50 секунд. В архиве и зимнем саду выхода в кабинет нет.'],
  8: ['Журнал освещения и наблюдения', 'Свет исчез в 21:06 и вернулся в 21:08. Рубильник ручной, таймера нет. От него до кабинета 50 секунд в одну сторону. Удар и изъятие листа занимают около 20 секунд. Обычная дверь заперта и опечатана. До рубильника из галереи 40 секунд: этот участок можно пройти до отключения.'],
  9: ['Две копии K-17', 'Заверенная копия: 120 000; North Quay Works; NW-04; 12 октября; рукописная подпись Ричарда. Банковская копия: 480 000; Quay Services; QS-17; 12 октября; подпись имеет те же дефекты печати, что и скан образца. Заголовок банковской копии: «Платёжное поручение K-17».'],
  10: ['Опись, снимок и протокол', '20:55: Елена передала оригинал Ричарду, расписка R-17. 20:59: Ричард записал оригинал K-17 в опись серой папки. Снимок Леона в 20:59 показывает закрытую папку у Ричарда. Елена заперла кабинет в 21:00. В 21:12 при свидетелях папку открыли: копия на месте, оригинала нет.'],
  11: ['Банк и непрерывные наблюдения', 'Поручение K-17 перечисляет деньги Quay Services; реестр связывает компанию со счётом QS-17. Единственный распорядитель счёта — Борис Хейл. С 21:05 до 21:09 Анна и Елена вместе в саду, Дмитрий и Леон вместе в библиотеке, Мария разговаривает с кухаркой. Борис ушёл из галереи в 21:05:20 и вернулся в 21:08:40. При осмотре его портфеля найден оригинал с краем, совпадающим с обрывком из-под часов. На манжете — кровь Ричарда и латунная пыль.']
};
for (const [number, [title, description]] of Object.entries(sourceRecords)) {
  const entry = cases[Number(number) - 1];
  const id = 'source-' + number;
  const record = { id, title, description, type: Number(number) === 3 ? 'item' : 'document', source: title, eventTime: entry.snapshotTime, obtainedAt: 'Дело ' + number, directConclusion: 'Сопоставьте наблюдения с остальными материалами.', status: 'unverified', image: null, unlockedByCase: entry.id, relatedCharacters: Number(number) === 11 ? ['boris'] : ['richard'], relatedLocations: ['study'], relatedMaterials: [], onOpen: true };
  evidenceRegistry.push(record); evidenceById[id] = record;
  entry.materials.push(id);
}
const c = number => cases[number - 1];
c(5).nextQuestion = 'Какие соединения скрывает схема западного крыла?';
c(5).resultSummary = 'Позиции в 20:50 установлены. Схема из библиотеки позволит проверить соединения западного крыла; этот снимок ещё не даёт алиби на 21:07.';
evidenceById['ev-west-schematic'].directConclusion = 'Схема требует проверки скрытых соединений; позиция в 20:50 не доказывает алиби в 21:07.';
c(4).puzzleData.items.find(x => x.id === 'seal-broken').description = 'В 21:12 Мария при свидетелях вскрывает целую пломбу и находит тело.';
c(4).puzzleData.items.find(x => x.id === 'seal-broken').time = '21:12';
c(6).puzzleData.segments = [];
c(6).intro = 'Исследуйте замеры стен в материалах и постройте путь от галереи к кабинету через рубильник. Нажатие уже выбранного узла сокращает маршрут до него.';
c(8).puzzleData.blackout.duration = 120;
c(8).puzzleData.options.forEach(x => { x.time = pathTime(x.path); });
c(8).intro = 'Проверьте каждый путь по общей карте. Учтите запертую дверь, ручное управление светом и обратный путь до рубильника: 50 + 20 + 50 секунд.';
c(9).puzzleData.fields.find(x => x.id === 'recipient').options[1].label = 'Quay Services';
c(9).puzzleData.fields.find(x => x.id === 'account').options[1].label = 'QS-17';
c(9).puzzleData.fields.forEach(row => row.options.forEach(option => option.note = 'Сверьте с двумя копиями в материалах'));
c(11).puzzleData.finance.items.find(x => x.id === 'recipient').title = 'Получатель Quay Services';
c(11).puzzleData.finance.items.find(x => x.id === 'company').description = 'Запись реестра о владельце счёта QS-17';
c(12).puzzleData.parts.motive.options[1] = { id: 'theft', label: 'Украсть коллекцию картин' };
c(12).puzzleData.evidence.push('source-3', 'source-11', 'ev-key-return');
c(12).solution.evidence.push('source-3', 'source-11');
c(12).materials = c(12).puzzleData.evidence.slice();
// Pools deliberately differ from the solution order.
for (const entry of cases) {
  for (const pool of [entry.puzzleData.events, entry.puzzleData.items, entry.puzzleData.finance?.items, entry.puzzleData.sequence]) {
    if (pool) pool.sort((a,b) => a.id.localeCompare(b.id));
  }
  const specific = {
    3: 'Сверка → разговор → темнота → повреждение часов → приход Марии → обнаружение тела.',
    4: 'Выдача отсутствует в журнале. Оба показания противоречат наблюдениям; ключ возвращён до опечатывания.',
    6: 'Галерея → служебный проход → рубильник → кабинет. Другие ветви карты не дают скрытого входа.',
    7: 'Платёжное поручение K-17 совпадает по всем четырём признакам: отметьте каждый.',
    8: 'Только служебный маршрут проходит через рубильник. За 120 секунд можно пройти 50 секунд туда, потратить 20 в кабинете и вернуться за 50.',
    9: 'В банковской копии изменены сумма, получатель, счёт и подпись. Дата остаётся 12 октября; вид документа — платёжное поручение.',
    10: 'Следуйте расписке, описи, снимку и осмотру: оригинал был у Ричарда, папка закрыта, кабинет заперт Еленой, после убийства оригинала нет.',
    11: 'Договор → поручение → получатель → компания → распорядитель счёта. Затем решите сетку, сверяя каждое показание.',
    12: 'Сопоставьте счёт Бориса, его отсутствие, оригинал в портфеле и кровь с латунью. В обвинении нужны все предложенные материалы, кроме раннего возврата ключа. Восстановите вход, отключение, вход в кабинет, удар, кражу, возврат, включение и выход.'
  }[entry.number];
  entry.hints.push({ text: specific || 'Сопоставляйте помещения и соседство с предметами, затем исключайте занятые строки и столбцы.', mechanic: entry.mechanic });
}

c(10).puzzleData.custodySteps = [
 {id:'inspection', title:'Осмотр папки — 21:12'}, {id:'receipt',title:'Расписка о передаче — 20:55'},
 {id:'lock',title:'Закрытие кабинета — 21:00'}, {id:'inventory',title:'Опись и снимок — 20:59'}
];
c(10).solution.order = ['receipt','inventory','lock','inspection'];
for (const n of [2,5,6,7,8,9,10,11]) { const candidates=n===8?[6]:n>=9?[7]:[n]; const path=candidates.map(k=>'assets/campaign/ch1/case-'+k+'.webp').find(file=>globalThis.detectiveArtPaths?.includes(file)); if(path)cases[n-1].image=path; }
characters.richard.avatar = globalThis.detectiveArtPaths?.includes('assets/campaign/ch1/richard.webp')?'assets/campaign/ch1/richard.webp':'assets/campaign/ch1/richard.svg';
characters.leon.avatar = globalThis.detectiveArtPaths?.includes('assets/campaign/ch1/leon.webp')?'assets/campaign/ch1/leon.webp':'assets/campaign/ch1/leon.svg';
const caseById = Object.fromEntries(cases.map((entry) => [entry.id, entry]));
const caseOrder = cases.map((entry) => entry.id);
const suspectIds = ["anna", "boris", "elena", "dmitry", "maria", "leon"];

function getGridData(caseData) {
  if (!caseData) return null;
  if (caseData.mechanic === "finance") return caseData.puzzleData.grid;
  return caseData.mechanic === "grid" ? caseData.puzzleData : null;
}

function boardTemplateKey(caseData) {
  const grid = getGridData(caseData);
  return grid?.templateId ?? grid?.size;
}

function getBoardTemplate(caseData) {
  return boardTemplates[boardTemplateKey(caseData)];
}

function cellToPoint(cell) {
  return { row: cell.charCodeAt(0) - 65, col: Number(cell.slice(1)) - 1 };
}

function pointToCell(row, col) {
  return String.fromCharCode(65 + row) + (col + 1);
}

function isBoardCell(cell, size) {
  if (typeof cell !== "string") return false;
  const match = /^([A-Z])(\d+)$/.exec(cell);
  if (!match) return false;
  const row = match[1].charCodeAt(0) - 65;
  const col = Number(match[2]) - 1;
  return row >= 0 && row < size && col >= 0 && col < size;
}

function permutations(values) {
  if (values.length < 2) return [values];
  const result = [];
  values.forEach((value, index) => {
    permutations(values.filter((_, i) => i !== index)).forEach((rest) => result.push([value].concat(rest)));
  });
  return result;
}

function evaluateRule(caseData, positions, item) {
  const grid = getGridData(caseData);
  const template = getBoardTemplate(caseData);
  if (!grid || !template || !item) return false;
  const first = item.args[0];
  const second = item.args[1];
  const firstCell = positions[first];
  const firstPoint = firstCell ? cellToPoint(firstCell) : null;
  const roomAt = (cell) => {
    if (!cell) return null;
    const point = cellToPoint(cell);
    return template.rooms[point.row * grid.size + point.col];
  };
  const objects = template.objects.filter((entry) => entry.id === second);
  const adjacent = firstPoint && objects.some((entry) => {
    const objectPoint = cellToPoint(entry.cell);
    return Math.abs(firstPoint.row - objectPoint.row) + Math.abs(firstPoint.col - objectPoint.col) === 1 && roomAt(firstCell) === roomAt(entry.cell);
  });
  switch (item.type) {
    case "room": return roomAt(firstCell) === second;
    case "not_room": return roomAt(firstCell) !== second;
    case "adj_obj": return Boolean(adjacent);
    case "not_adj_obj": return !adjacent;
    case "on_obj": return objects.some((entry) => entry.cell === firstCell && entry.canOccupy);
    case "same_room": return roomAt(firstCell) === roomAt(positions[second]);
    case "left": return firstPoint && positions[second] && firstPoint.col < cellToPoint(positions[second]).col;
    case "above": return firstPoint && positions[second] && firstPoint.row < cellToPoint(positions[second]).row;
    default: return false;
  }
}

function countSolutions(caseData, stopAfter = Infinity) {
  const grid = getGridData(caseData);
  const template = getBoardTemplate(caseData);
  if (!grid || !template) return 0;
  const indexes = Array.from({ length: grid.size }, (_, index) => index);
  const rowPermutations = permutations(indexes);
  const blocked = new Set(template.objects.filter((entry) => !entry.canOccupy).map((entry) => entry.cell));
  let count = 0;
  for (const rowsForPeople of rowPermutations) {
    for (const colsForPeople of rowPermutations) {
      const positions = {};
      let valid = true;
      grid.participants.forEach((person, index) => {
        const cell = pointToCell(rowsForPeople[index], colsForPeople[index]);
        positions[person] = cell;
        if (blocked.has(cell)) valid = false;
      });
      if (!valid) continue;
      if (!grid.clues.every((entry) => evaluateRule(caseData, positions, entry.rule))) continue;
      count += 1;
      if (count >= stopAfter) return count;
    }
  }
  return count;
}

function validateAllCases() {
  return cases.filter((entry) => entry.mechanic === "grid" || entry.mechanic === "finance").map((entry) => ({ id: entry.id, solutionsCount: countSolutions(entry, 2) }));
}

const initialProgress = () => ({
  saveVersion: SAVE_VERSION, completedCases: [], completed: [], unlockedCaseIndex: 1, unlocked: 1, currentCase: "case-01",
  gridState: {}, notes: {}, timelineState: {}, itemChainState: {}, routeState: {}, documentState: {}, financeState: {}, reconstructionState: {},
  unlockedEvidence: [], evidenceStatuses: {}, testimonyStatuses: {}, mapDiscoveries: { service_passage: false, service_switch: false },
  errors: {}, hintsUsed: {}, activePlayTime: {}, stars: {}, active: null, tutorialComplete: false, lastArchiveRange: 0, lastOpenedChapter: 1, lastActiveFolder: 1,
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDefaults(defaults, saved) {
  if (!saved || typeof saved !== "object") return clone(defaults);
  const result = clone(defaults);
  Object.keys(saved).forEach((key) => {
    if (saved[key] && typeof saved[key] === "object" && !Array.isArray(saved[key]) && result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) result[key] = Object.assign(result[key], saved[key]);
    else result[key] = saved[key];
  });
  return result;
}

function normalizeProgress(saved) {
  if (!saved || saved.saveVersion !== SAVE_VERSION) return initialProgress();
  const progress = mergeDefaults(initialProgress(), saved);
  progress.completedCases = Array.from(new Set((progress.completedCases || progress.completed || []).filter((id) => caseById[id])));
  progress.unlockedEvidence = [...new Set((progress.unlockedEvidence || []).filter(id => evidenceById[id]))];
  evidenceRegistry.filter(e => e.onOpen && progress.completedCases.includes(e.unlockedByCase)).forEach(e => {
    if (!progress.unlockedEvidence.includes(e.id)) progress.unlockedEvidence.push(e.id);
  });
  progress.completed = progress.completedCases.slice();
  progress.unlockedCaseIndex = Math.max(1, Math.min(cases.length, Number(progress.unlockedCaseIndex || progress.unlocked || 1)));
  progress.unlocked = progress.unlockedCaseIndex;
  if (!caseById[progress.currentCase]) progress.currentCase = caseOrder[Math.min(progress.unlockedCaseIndex - 1, cases.length - 1)];
  return progress;
}

function loadLocalProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProgress();
    return normalizeProgress(JSON.parse(raw));
  } catch {
    return initialProgress();
  }
}

const state = {
  splash: true, screen: "home", progress: loadLocalProgress(), currentCaseId: null, archiveTab: "cases", menuTab: 0, menuViewedChapter: 1, menuLayout: "portrait", coverChapterId: null, archiveReadOnly: false, caseIntroOpen: false, evidenceOpen: null, settingsOpen: false,
  selectedPerson: null, selectedClue: null, noteMode: false, placements: {}, notes: {}, history: [], elapsed: 0, errors: 0, hints: 0, hintIndex: 0,
  timelineSelected: null, chainSelected: null, routeDraft: null, docDraft: null, financeSelected: null, reconstructionPart: null, toast: null,
};
state.currentCaseId = state.progress.currentCase;

const root = typeof document !== "undefined" ? document.getElementById("game-root") : null;
let timerHandle = null;
let saveTimerHandle = null;

function persistProgress() {
  globalThis.GamePlatform?.changed();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch {
    /* Storage is optional when the file is opened in a restricted context. */
  }
}

function saveAudioPreference(value) {
  globalThis.GamePlatform?.changed();
  try { localStorage.setItem(AUDIO_STORAGE_KEY, value ? "on" : "off"); } catch { /* no-op */ }
}

function audioEnabled() {
  try { return localStorage.getItem(AUDIO_STORAGE_KEY) !== "off"; } catch { return true; }
}

function playSound() {
  if (!audioEnabled() || typeof window === 'undefined' || globalThis.GamePlatform?.paused()) return;
  try { const Audio = window.AudioContext || window.webkitAudioContext; if (!Audio) return;
    const audio = new Audio(), oscillator = audio.createOscillator(), gain = audio.createGain();
    globalThis.GamePlatform?.trackAudio(audio);
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.frequency.value=660;
    gain.gain.setValueAtTime(0.035,audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.001,audio.currentTime+0.22);
    oscillator.start(); oscillator.stop(audio.currentTime+0.24); oscillator.onended=()=>audio.close();
  } catch {}
}

function activeCase() {
  return caseById[state.currentCaseId] || cases[0];
}

function mechanicLabel(type) {
 return ({grid:'План помещения',timeline:'Хронология',itemChain:'Передача предмета',route:'Маршруты',documentCompare:'Документы',finance:'Финансовая цепочка',reconstruction:'Реконструкция'})[type] || type;
}
function caseNumber(caseData) {
  return String(caseData.number).padStart(2, "0");
}

function isCompleted(caseId) {
  return state.progress.completedCases.includes(caseId);
}

function isUnlocked(caseData) {
  const index = caseOrder.indexOf(caseData.id) + 1;
  return index <= state.progress.unlockedCaseIndex || isCompleted(caseData.id);
}

function formatTime(seconds) {
  return String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
}

function htmlEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function icon(src, alt = "", className = "") {
  return '<img class="icon ' + className + '" src="' + htmlEscape(src) + '" alt="' + htmlEscape(alt) + '" draggable="false">';
}

function initials(person) {
  return person.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("");
}

function avatar(personId, size = "md") {
  const person = characters[personId] || characters.richard;
  if (person.avatar) return '<img class="avatar avatar-' + size + '" src="' + person.avatar + '" alt="' + htmlEscape(person.name) + '" draggable="false">';
  return '<span class="avatar avatar-' + size + ' avatar-placeholder" style="background:' + person.accent + '" aria-label="' + htmlEscape(person.name) + '">' + htmlEscape(initials(person)) + "</span>";
}

function mediaMarkup(src, alt, className = "") {
  if (!src) return '<div class="image-placeholder ' + className + '" role="img" aria-label="' + htmlEscape(alt) + '"><span>' + htmlEscape(alt) + "</span></div>";
  return '<img class="' + className + '" src="' + htmlEscape(src) + '" alt="' + htmlEscape(alt) + '" draggable="false">';
}

function topBar(title, backAction = "back-menu", includeTimer = false) {
  return '<header class="topbar"><div class="topbar-side"><button class="icon-button" data-action="' + backAction + '" aria-label="Назад">' + icon(uiAssets.back, "Назад") + '</button></div><strong class="topbar-title">' + htmlEscape(title) + '</strong><div class="topbar-side topbar-actions">' + (includeTimer ? '<span class="timer">' + icon(uiAssets.timer, "Время") + '<span>' + formatTime(state.elapsed) + "</span></span>" : "") + '<button class="icon-button" data-action="settings" aria-label="Настройки">' + icon(uiAssets.settings, "Настройки") + "</button></div></header>";
}

function renderSplash() {
  return '<div class="splash-screen"><div class="logo-mark"><span class="logo-grid"></span><span class="logo-lens"></span></div><h1>Детективное судоку</h1><div class="loading-line"><span></span></div><small>Загружается архив расследований</small></div>';
}

function progressLabel() {
  return state.progress.completedCases.length + " / " + cases.length + " дел";
}

function settingsMarkup() {
  if (!state.settingsOpen) return "";
  return `<div class="modal-layer" data-action="close-settings"><section class="modal-card settings-modal" data-stop-click><div class="modal-heading"><h2>Настройки</h2><button class="icon-button" data-action="close-settings" aria-label="Закрыть">×</button></div><label class="setting-row"><span>Звуковые сигналы</span><input type="checkbox" data-action="audio-toggle" ${audioEnabled() ? "checked" : ""}></label><div class="settings-divider"></div><button class="secondary-button danger-button" data-action="reset-progress">СБРОСИТЬ ПРОГРЕСС</button></section></div>`;
}

function toastMarkup() {
  if (!state.toast) return "";
  return '<div class="toast toast-' + (state.toast.tone || "neutral") + '" role="status"><strong>' + htmlEscape(state.toast.title || "Материал") + '</strong><span>' + htmlEscape(state.toast.message) + "</span></div>";
}

function showToast(message, tone = "neutral", title = "") {
  state.toast = { message, tone, title };
  render();
  window.setTimeout(() => {
    if (state.toast?.message === message) {
      state.toast = null;
      render();
    }
  }, 3400);
}

function chapterCompleted(id) {
  if (id === 1) return state.progress.completedCases.length === cases.length;
  const saved = typeof campaignProgress !== "undefined" ? campaignProgress.chapters?.[id] : null;
  return (saved?.completed?.length || 0) === 10;
}

function currentChapterId() {
  for (let id = 1; id <= 12; id++) if (!chapterCompleted(id)) return id;
  return null;
}

function chapterProgressCount(id) {
  if (id === 1) return state.progress.completedCases.length;
  return typeof campaignProgress !== "undefined" ? campaignProgress.chapters?.[id]?.completed?.length || 0 : 0;
}

function chapterStarted(id) {
  if (chapterProgressCount(id) > 0) return true;
  if (id === 1) return !!state.progress.active;
  const saved = typeof campaignProgress !== "undefined" ? campaignProgress.chapters?.[id] : null;
  return !!saved && (Object.keys(saved.states || {}).length > 0 || saved.stage !== "archive");
}

function chapterFolderMarkup(id) {
  const current = currentChapterId() === id;
  const completed = chapterCompleted(id);
  const started = current && chapterStarted(id);
  const status = completed ? "РАСКРЫТО" : current ? (started ? "В РАБОТЕ" : "ДОСТУПНО") : "СЕКРЕТНО";
  const count = chapterProgressCount(id);
  const progress = current && started ? `<span class="chapter-file-progress">${count} / ${id === 1 ? cases.length : 10} дел</span>` : "";
  const mark = !current && !completed ? `<span class="chapter-file-lock">${icon(uiAssets.lock, "Замок")}</span>` : `<span class="chapter-file-seal" aria-hidden="true">${completed ? "✓" : "✦"}</span>`;
  return `<button class="chapter-file ${current ? "current" : completed ? "completed" : "locked"}" type="button" data-action="chapter-folder" data-chapter="${id}" aria-label="Глава ${id}. ${status.toLowerCase()}"><span class="chapter-file-tab" aria-hidden="true"></span><span class="chapter-file-inner"><span class="chapter-file-number">ГЛАВА <strong>${id}</strong></span>${mark}<span class="chapter-file-status">${status}</span>${progress}</span></button>`;
}

function hasHomeProgress() {
  if (state.progress.active || state.progress.completedCases.length) return true;
  if (typeof campaignProgress === "undefined" || !campaignProgress) return false;
  if (Number(campaignProgress.lastChapter) > 1) return true;
  return Object.values(campaignProgress.chapters || {}).some((chapterState) =>
    (chapterState?.completed?.length || 0) > 0 || Object.keys(chapterState?.states || {}).length > 0
  );
}

function homeProgressLabel() {
  if (typeof campaignProgress !== "undefined" && campaignProgress) {
    const chapterId = Number(campaignProgress.lastChapter);
    if (chapterId > 1) {
      const chapterData = typeof campaignChapters !== "undefined"
        ? campaignChapters.find((entry) => entry.id === chapterId)
        : null;
      const chapterState = campaignProgress.chapters?.[chapterId];
      if (chapterState?.stage === "complete") return `Глава ${chapterId} завершена`;
      const caseIndex = Math.max(0, Math.min((chapterData?.cases.length || 1) - 1, Number(chapterState?.caseIndex || 0)));
      const number = chapterData?.cases[caseIndex]?.number || caseIndex + 1;
      return `Глава ${chapterId} · Дело ${number}`;
    }
  }

  if (state.progress.completedCases.length >= cases.length) return "Глава 1 завершена";
  const savedCaseId = state.progress.active?.caseId || state.progress.currentCase;
  const caseData = caseById[savedCaseId] || cases[0];
  return `Глава 1 · Дело ${caseData.number}`;
}

function renderHome() {
  const current = currentChapterId();
  const currentCase = current === 1
    ? (caseById[state.progress.active?.caseId || state.progress.currentCase]?.number || 1)
    : Math.min(10, Number(typeof campaignProgress !== "undefined" ? campaignProgress.chapters?.[current]?.caseIndex || 0 : 0) + 1);
  const currentLabel = current ? `Глава ${current} · Дело ${currentCase}` : "Все 12 глав раскрыты";
  const actions = hasHomeProgress()
    ? `<div class="home-actions"><button class="primary-button home-action home-continue" data-action="home-resume">Продолжить расследование</button><button class="secondary-button home-action home-menu-button" data-action="home-play">В главное меню</button></div>`
    : `<div class="home-actions"><button class="primary-button home-action" data-action="home-play">Играть</button></div>`;
  return `<div class="app-screen home-screen"><main class="home-stage"><aside class="home-margin-note" aria-hidden="true">ДЕЛА<br>УЛИКИ<br>ЛЮДИ<br>ИСТИНА</aside><section class="home-copy"><div class="home-intro"><span class="home-kicker">АРХИВ ЧАСТНОГО СЛЕДОВАТЕЛЯ</span><h1>Детективное <span>судоку</span></h1><span class="home-divider" aria-hidden="true"></span><p class="home-slogan">Расставьте улики по местам — раскройте тайну.</p></div><div class="home-panel"><div class="home-current"><span>Текущее расследование</span><strong>${htmlEscape(currentLabel)}</strong></div>${actions}</div></section><aside class="home-seal" aria-hidden="true"><span>АРХИВ<br>ДЕЛ</span></aside></main>${settingsMarkup()}${toastMarkup()}</div>`;
}
function chapterMenuLayout(width, height) {
  if (height > width) return "portrait";
  if (width >= 900 && height >= 600) return "six";
  return "short";
}

function chapterMenuSize() {
  const rect = root?.getBoundingClientRect();
  const width = rect?.width || (typeof window !== "undefined" ? window.innerWidth : 0) || 412;
  const height = rect?.height || (typeof window !== "undefined" ? window.innerHeight : 0) || 924;
  return { width, height };
}

function chapterMenuPageSize() {
  const { width, height } = chapterMenuSize();
  state.menuLayout = chapterMenuLayout(width, height);
  return state.menuLayout === "six" ? 6 : 3;
}

function refreshChapterMenuLayout() {
  if (state.screen !== "menu" || state.splash) return;
  const { width, height } = chapterMenuSize();
  if (chapterMenuLayout(width, height) !== state.menuLayout) render();
}

function renderMenu() {
  const pageSize = chapterMenuPageSize();
  const viewed = Math.max(1, Math.min(12, Number(state.menuViewedChapter) || 1));
  const tab = Math.floor((viewed - 1) / pageSize);
  state.menuTab = tab;
  const tabs = Array.from({length: 12 / pageSize}, (_, index) => `<button type="button" role="tab" class="chapter-tab ${index === tab ? "selected" : ""}" data-action="chapter-tab" data-index="${index}" aria-selected="${index === tab}">${index * pageSize + 1}–${(index + 1) * pageSize}</button>`).join("");
  const folders = Array.from({length: pageSize}, (_, offset) => chapterFolderMarkup(tab * pageSize + offset + 1)).join("");
  return `<div class="app-screen chapter-menu-screen chapter-menu-${state.menuLayout}"><header class="topbar"><button class="secondary-button" data-action="home" aria-label="На главный экран">←</button><strong>Архив расследований</strong><button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings, "Настройки")}</button></header><main class="chapter-menu-content"><h1>Выберите главу</h1><nav class="chapter-tab-list" role="tablist" aria-label="Главы">${tabs}</nav><section class="chapter-file-grid" aria-label="Папки расследований">${folders}</section></main>${settingsMarkup()}${toastMarkup()}</div>`;
}

function renderChapterCover() {
  const id = state.coverChapterId;
  if (id !== currentChapterId()) return renderMenu();
  const data = id === 1 ? chapter : campaignChapters.find(entry => entry.id === id);
  if (!data) return renderMenu();
  return `<div class="app-screen chapter-cover-screen"><header class="topbar"><button class="secondary-button" data-action="cover-back" aria-label="Назад к папкам">←</button><strong>Глава ${id}</strong><button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings, "Настройки")}</button></header><main class="chapter-cover-content"><article class="chapter-cover-card"><div class="chapter-cover-art">${mediaMarkup(data.cover, `Обложка главы ${id}. ${data.title}`)}</div><div class="chapter-cover-copy"><span class="eyebrow">ГЛАВА ${id}</span><h1>${htmlEscape(data.title)}</h1><button class="primary-button" data-action="cover-start">${chapterStarted(id) ? "Продолжить" : "Начать расследование"}</button><button class="secondary-button" data-action="cover-back">Назад</button></div></article></main>${settingsMarkup()}${toastMarkup()}</div>`;
}

function openChapterFolder(id) {
  if (!Number.isInteger(id) || id < 1 || id > 12) return;
  state.menuViewedChapter = id;
  if (chapterCompleted(id)) {
    if (id === 1) { state.archiveReadOnly = true; state.archiveTab = "materials"; state.screen = "archive"; return render(); }
    campaignView.chapter = id; campaignView.screen = "archive"; campaignView.tab = "materials"; campaignView.readOnly = true; state.screen = "campaign"; return render();
  }
  if (id !== currentChapterId()) return showToast("Сначала завершите текущую главу", "neutral", "СЕКРЕТНО");
  state.coverChapterId = id;
  state.screen = "chapter-cover";
  render();
}

function startChapterFromCover() {
  const id = state.coverChapterId;
  if (state.screen !== "chapter-cover" || id !== currentChapterId()) return showToast("Сначала завершите текущую главу", "neutral", "СЕКРЕТНО");
  if (id === 1) {
    state.archiveReadOnly = false;
    if (state.progress.active?.stage === "result") return resumeInvestigation();
    state.currentCaseId = state.progress.active?.caseId || state.progress.currentCase || cases[0].id;
    return startCurrentCase();
  }
  campaignView.readOnly = false;
  campaignOpen(id, true);
  if (campaignView.screen === "archive") campaignStart(chapterProgress(id).caseIndex || 0);
}

function participantMarkup(id) {
  const person = characters[id];
  return '<span class="participant">' + avatar(id, "md") + '<small>' + htmlEscape(person?.shortName || id) + "</small></span>";
}

function caseImageMarkup(caseData, className = "") {
  return mediaMarkup(caseData.image, "Дело " + caseNumber(caseData) + ". " + caseData.title, className);
}

function caseDocumentsMarkup() {
  return cases.map((caseData) => {
    if (!isUnlocked(caseData)) {
      return '<article class="case-document locked"><span class="document-number">ДЕЛО ' + caseNumber(caseData) + '</span><div class="locked-document">' + icon(uiAssets.lock, "Закрыто") + '</div><h3>Материалы закрыты</h3><span>Завершите предыдущее дело</span></article>';
    }
    return '<button class="case-document ' + (isCompleted(caseData.id) ? "completed" : "") + '" data-action="open-case" data-case-id="' + caseData.id + '"><span class="document-number">ДЕЛО ' + caseNumber(caseData) + '</span><div class="document-thumb">' + caseImageMarkup(caseData) + '</div><h3>' + htmlEscape(caseData.title) + '</h3><span>' + htmlEscape(mechanicLabel(caseData.mechanic)) + ' · ' + htmlEscape(caseData.snapshotTime) + '</span>' + (isCompleted(caseData.id) ? '<span class="completion-mark">' + icon(uiAssets.check, "Готово") + " завершено</span>" : "") + "</button>";
  }).join("");
}

function archiveTabs() {
  const tabs = [["cases", "Дела"], ["materials", "Материалы"], ["dossier", "Досье"], ["map", "Карта"], ["timeline", "Хронология"], ["questions", "Текущие вопросы"]];
  return '<nav class="archive-tabs">' + tabs.map((tab) => '<button class="' + (state.archiveTab === tab[0] ? "active" : "") + '" data-action="archive-tab" data-tab="' + tab[0] + '">' + tab[1] + "</button>").join("") + "</nav>";
}

function renderArchiveCases() {
  return '<section class="cases-page page-container"><header class="case-header-card surface-card"><div class="case-header-image">' + mediaMarkup(chapter.cover, "Особняк Блэквуд") + '</div><div><span class="eyebrow">ГЛАВА 1 · ДОСЬЕ</span><h1>' + htmlEscape(chapter.title) + '</h1><p>Каждое дело отвечает на один вопрос и открывает следующий материал.</p><div class="progress-row wide\"><span><b>' + state.progress.completedCases.length + "</b>/" + cases.length + ' дел</span><div class="progress-track"><span style="width:' + (state.progress.completedCases.length / cases.length * 100) + '%"></span></div></div></div></header><div class="documents-grid">' + caseDocumentsMarkup() + "</div></section>";
}

function evidenceStatus(id) {
  return state.progress.evidenceStatuses[id] || "unknown";
}

function statusLabel(status) {
  return ({ unknown: "не изучено", unverified: "не проверено", confirmed: "подтверждено", contradicted: "противоречие", disproved: "опровергнуто" }[status] || status);
}

function evidenceTypeLabel(type) {
  return ({document:'Документ',testimony:'Показание',item:'Предмет',log:'Журнал',timeline:'Хронология',observation:'Наблюдение',chain:'Цепочка хранения',map:'Карта',route:'Маршрут',finance:'Финансы'})[type] || type;
}

function evidenceCard(id, compact = false) {
  const evidence = evidenceById[id];
  if (!evidence || !state.progress.unlockedEvidence.includes(id)) return "";
  const status = evidenceStatus(id);
  return '<button class="material-card evidence-card ' + (compact ? "compact" : "") + '" data-action="open-evidence" data-evidence-id="' + id + '"><div class="material-card-heading"><span class="material-type">' + htmlEscape(evidenceTypeLabel(evidence.type)) + '</span><span class="status-pill status-' + status + '">' + statusLabel(status) + '</span></div><strong>' + htmlEscape(evidence.title) + '</strong><small>' + htmlEscape(evidence.source) + ' · ' + htmlEscape(evidence.eventTime) + "</small>" + (compact ? "" : '<p>' + htmlEscape(evidence.description) + "</p>") + "</button>";
}

function renderArchiveMaterials() {
  const ids = state.progress.unlockedEvidence;
  return '<section class="archive-panel page-container"><div class="page-heading"><div><span class="eyebrow">АРХИВ ДОКАЗАТЕЛЬСТВ</span><h1>Материалы</h1></div><p>Открытые материалы остаются доступны после завершения дела.</p></div><div class="materials-grid">' + (ids.length ? ids.map((id) => evidenceCard(id)).join("") : '<div class="empty-state surface-card">Пока нет подтверждённых материалов. Откройте первое дело.</div>') + "</div></section>";
}

const dossierProfiles = {
  anna: { suspicion: "Скрыла короткий вход в кабинет.", secret: "Получила запасной ключ без записи.", lie: "Отрицает визит в кабинет.", explanation: "Она боялась последствий нарушения процедуры, но её маршрут не совпадает с окном преступления.", fact: "Цепочка ключа показывает, что Анна вернула ключ до критического интервала." },
  boris: { suspicion: "Имеет доступ к документам и противоречивый маршрут.", secret: "Связан с получателем платежей K-17.", lie: "Говорит, что всё время оставался в галерее.", explanation: "Финансовый интерес и физическая возможность появляются только вместе с поздними материалами.", fact: "Сетка, карта и финансовая цепочка складываются в единую версию только в деле 11." },
  elena: { suspicion: "Работала с сейфом и документами.", secret: "Знала время закрытия кабинета.", lie: "Сначала умолчала о точном времени закрытия.", explanation: "Елена скрывала служебную оплошность, но опись подтверждает наличие оригинала у Ричарда.", fact: "Её показание помогает установить, когда оригинал ещё был на месте." },
  dmitry: { suspicion: "Имеет доступ к схемам и служебным зонам.", secret: "Заранее сверял электросхему.", lie: "Сначала отрицал визит в зимний сад.", explanation: "Он скрывал нарушение рабочего маршрута, но подтверждённое время не позволяет ему успеть к кабинету.", fact: "Рабочая схема исключает Дмитрия из критического маршрута." },
  maria: { suspicion: "Контролирует ключи, пломбы и хозяйственные журналы.", secret: "Не записала выдачу Анне.", lie: "Называет журнал полным.", explanation: "Мария защищала порядок в доме и скрывала свою ошибку, но после опечатывания находилась не у кабинета.", fact: "Её показание о находке тела фиксирует конец временного окна." },
  leon: { suspicion: "Фотографировал западное крыло и видел участников.", secret: "Снимал без разрешения.", lie: "Сначала не упомянул фотографию.", explanation: "Леон опасался обвинения в нарушении частной жизни, но фотография подтверждает состояние папки.", fact: "Фотография помогает установить, что оригинал был у Ричарда перед закрытием." },
};

function renderDossier() {
  return '<section class="archive-panel page-container"><div class="page-heading"><div><span class="eyebrow">РАБОЧИЕ ДОСЬЕ</span><h1>Персонажи</h1></div><p>Показания, подтверждённые позиции и найденные противоречия без числовых рейтингов подозрения.</p></div><div class="dossier-grid">' + suspectIds.map((id) => {
    const person = characters[id];
    const profile = isCompleted("case-11") ? dossierProfiles[id] : { suspicion: "Проверьте показания по собранным материалам.", secret: "Ещё не установлен", lie: "Требует проверки", explanation: "Доступ к дому сам по себе не доказывает вину.", fact: "Ниже указаны доступные материалы расследования." };
    const related = state.progress.unlockedEvidence.filter((evidenceId) => evidenceById[evidenceId]?.relatedCharacters.includes(id));
    return '<article class="dossier-person-card surface-card"><div class="dossier-person-head">' + avatar(id, "lg") + '<div><h2>' + htmlEscape(person.name) + '</h2><small>' + htmlEscape(person.role) + '</small></div></div><dl><dt>Почему подозрителен</dt><dd>' + htmlEscape(profile.suspicion) + '</dd><dt>Секрет</dt><dd>' + htmlEscape(profile.secret) + '</dd><dt>Ложь</dt><dd>' + htmlEscape(profile.lie) + '</dd><dt>Почему это не доказывает вину</dt><dd>' + htmlEscape(profile.explanation) + '</dd><dt>Что изменило отношение</dt><dd>' + htmlEscape(profile.fact) + '</dd></dl><div class="related-evidence"><b>Связанные материалы</b><span>' + (related.length ? related.map((id) => htmlEscape(evidenceById[id].title)).join(" · ") : "ещё не открыты") + "</span></div></article>";
  }).join("") + "</div></section>";
}

function mapNodeMarkup(id) {
  const location = locations[id];
  const discovered = !location.hidden || state.progress.mapDiscoveries[id];
  return '<div class="map-node ' + (discovered ? "discovered" : "hidden") + '"><span class="map-node-dot"></span><strong>' + htmlEscape(discovered ? location.title : "Неисследованная зона") + '</strong><small>' + (discovered ? "доступно" : "скрыто в плане") + "</small></div>";
}

function mansionGraph() {
  const points = { living_room:[110,70], central_hall:[310,170], west_gallery:[310,330], study:[590,170], library:[110,330], archive:[310,470], music_room:[110,470], kitchen:[110,170], winter_garden:[590,70], service_passage:[590,470], service_switch:[590,330] };
  const visible = id => !locations[id].hidden || state.progress.mapDiscoveries[id];
  const edges = locationConnections.filter(e => visible(e.from) && visible(e.to) && !(e.from === 'west_gallery' && e.to === 'service_switch'));
  return '<svg class="mansion-graph" viewBox="0 0 720 540" role="img" aria-label="Схема соединений особняка">' + edges.map(e => {
    const a=points[e.from], b=points[e.to];
    return '<line x1="'+a[0]+'" y1="'+a[1]+'" x2="'+b[0]+'" y2="'+b[1]+'" stroke="#967c55" stroke-width="3"/><text x="'+((a[0]+b[0])/2+8)+'" y="'+((a[1]+b[1])/2-8)+'">'+e.travelTime+' с</text>';
  }).join('') + Object.entries(points).filter(([id]) => visible(id)).map(([id,p]) => '<g><rect x="'+(p[0]-83)+'" y="'+(p[1]-24)+'" width="166" height="48" rx="8" fill="'+locations[id].color+'" stroke="#967c55"/><text text-anchor="middle" x="'+p[0]+'" y="'+(p[1]+5)+'">'+htmlEscape(locations[id].shortTitle)+'</text></g>').join('') + '</svg>';
}

function renderMapRegistry() {
  const visibleConnections = locationConnections.filter((edge) => (!locations[edge.from]?.hidden || state.progress.mapDiscoveries[edge.from]) && (!locations[edge.to]?.hidden || state.progress.mapDiscoveries[edge.to]));
  return '<section class="archive-panel page-container"><div class="page-heading"><div><span class="eyebrow">ЕДИНАЯ КАРТА</span><h1>Особняк и маршруты</h1></div><p>Сопоставляйте места, показания и время переходов. Скрытые зоны появляются после исследования.</p></div><div class="map-registry surface-card"><div class="map-registry-image">' + mansionGraph() + '</div><div class="map-node-list">' + Object.keys(locations).map(mapNodeMarkup).join("") + '</div><div class="map-connections"><h3>Связи и время перехода</h3>' + visibleConnections.map((edge) => '<div class="map-connection"><span>' + htmlEscape(locationTitle(edge.from)) + ' ↔ ' + htmlEscape(locationTitle(edge.to)) + '</span><b>' + edge.travelTime + ' сек.</b></div>').join("") + "</div></div></section>";
}

function renderArchiveTimeline() {
  const timeEvidence = state.progress.unlockedEvidence.filter((id) => evidenceById[id].eventTime);
  return '<section class="archive-panel page-container"><div class="page-heading"><div><span class="eyebrow">ОБЩАЯ ХРОНОЛОГИЯ</span><h1>Временная линия</h1></div><p>Приблизительные отметки сохраняются как интервалы, если источник не доказывает точную секунду.</p></div><div class="archive-timeline surface-card">' + (timeEvidence.length ? timeEvidence.map((id) => '<article class="archive-time-row"><time>' + htmlEscape(evidenceById[id].eventTime) + '</time><div><strong>' + htmlEscape(evidenceById[id].title) + '</strong><p>' + htmlEscape(evidenceById[id].directConclusion) + "</p></div></article>").join("") : '<div class="empty-state">Сначала установите время событий в деле 3.</div>') + "</div></section>";
}

function renderArchiveQuestions() {
  return '<section class="archive-panel page-container"><div class="page-heading"><div><span class="eyebrow">ЦЕПОЧКА РАССЛЕДОВАНИЯ</span><h1>Текущие вопросы</h1></div><p>Каждый установленный факт открывает следующий вопрос, а не готовое обвинение.</p></div><div class="question-list">' + cases.filter((entry) => isCompleted(entry.id)).map((entry) => '<article class="question-card ' + (isCompleted(entry.id) ? "answered" : "") + '"><span>ДЕЛО ' + caseNumber(entry) + '</span><h2>' + htmlEscape(entry.nextQuestion) + '</h2><small>' + (isCompleted(entry.id) ? "вопрос использован в расследовании" : "ожидает решения") + "</small></article>").join("") + "</div></section>";
}

function caseIntroOverlayMarkup() {
  if (!state.caseIntroOpen) return "";
  const caseData = caseById[state.currentCaseId];
  if (!caseData) return "";
  const participants = caseData.participants || caseData.puzzleData?.grid?.participants || suspectIds;
  return '<div class="nested-overlay" data-action="close-case-intro"><section class="archive-case-intro" data-stop-click role="dialog" aria-modal="true"><div class="archive-case-image">' + caseImageMarkup(caseData) + '</div><div class="archive-case-copy"><span class="eyebrow">ДЕЛО ' + caseNumber(caseData) + ' · ' + htmlEscape(mechanicLabel(caseData.mechanic)) + '</span><h2>' + htmlEscape(caseData.title) + '</h2><p>' + htmlEscape(caseData.intro) + '</p><div class="metadata-row"><span>' + htmlEscape(caseData.snapshotTime) + '</span><span>' + (isCompleted(caseData.id) ? "ЗАВЕРШЕНО" : "ОТКРЫТО") + '</span></div><div class="participant-row">' + participants.map(participantMarkup).join("") + '</div><button class="primary-button" data-action="start-case">НАЧАТЬ РАССЛЕДОВАНИЕ</button></div></section></div>';
}

function evidenceOverlayMarkup() {
  if (!state.evidenceOpen) return "";
  const entry = evidenceById[state.evidenceOpen];
  if (!entry) return "";
  return '<div class="modal-layer" data-action="close-evidence"><section class="modal-card evidence-modal" data-stop-click><div class="modal-heading"><div><span class="eyebrow">' + htmlEscape(evidenceTypeLabel(entry.type)) + '</span><h2>' + htmlEscape(entry.title) + '</h2></div><button class="icon-button" data-action="close-evidence" aria-label="Закрыть">×</button></div><p class="evidence-source">' + htmlEscape(entry.source) + ' · ' + htmlEscape(entry.eventTime) + '</p><p>' + htmlEscape(entry.description) + '</p><div class="evidence-conclusion"><b>Прямой вывод</b><span>' + htmlEscape(entry.directConclusion) + '</span></div><div class="related-evidence"><b>Связано с</b><span>' + entry.relatedLocations.map(locationTitle).join(" · ") + '</span></div></section></div>';
}

function renderArchive() {
  let panel = renderArchiveCases();
  if (state.archiveTab === "materials") panel = renderArchiveMaterials();
  if (state.archiveTab === "dossier") panel = renderDossier();
  if (state.archiveTab === "map") panel = renderMapRegistry();
  if (state.archiveTab === "timeline") panel = renderArchiveTimeline();
  if (state.archiveTab === "questions") panel = renderArchiveQuestions();
  return '<div class="app-screen archive-screen">' + topBar(chapter.title, "back-menu") + archiveTabs() + panel + caseIntroOverlayMarkup() + evidenceOverlayMarkup() + settingsMarkup() + toastMarkup() + "</div>";
}

function loadCaseState(caseData) {
  const id = caseData.id;
  const grid = getGridData(caseData);
  state.selectedPerson = null;
  state.selectedClue = null;
  state.noteMode = false;
  state.history = [];
  state.elapsed = Number(state.progress.activePlayTime[id] || 0);
  state.errors = Number(state.progress.errors[id] || 0);
  state.hints = Number(state.progress.hintsUsed[id] || 0);
  state.hintIndex = state.hints;
  state.timelineSelected = null;
  state.chainSelected = null;
  state.routeDraft = null;
  state.docDraft = null;
  state.financeSelected = null;
  state.reconstructionPart = null;
  state.placements = grid ? clone(state.progress.gridState[id] || {}) : {};
  state.notes = grid ? clone(state.progress.notes[id] || {}) : {};
}

function saveActiveState() {
  const caseData = activeCase();
  if (!caseData) return;
  const id = caseData.id;
  const grid = getGridData(caseData);
  if (grid) {
    state.progress.gridState[id] = clone(state.placements);
    state.progress.notes[id] = clone(state.notes);
  }
  state.progress.activePlayTime[id] = state.elapsed;
  state.progress.errors[id] = state.errors;
  state.progress.hintsUsed[id] = state.hints;
  state.progress.active = { caseId: id, stage: state.screen === "result" ? "result" : "playing", elapsed: state.elapsed };
  persistProgress();
}

function scheduleSave() {
  if (saveTimerHandle) return;
  saveTimerHandle = window.setTimeout(() => {
    saveTimerHandle = null;
    if (state.screen === "game" || state.screen === "result") saveActiveState();
  }, 400);
}

function getMechanicState(mapName, id, fallback) {
  if (!state.progress[mapName][id]) state.progress[mapName][id] = clone(fallback);
  return state.progress[mapName][id];
}

function objectAt(caseData, cell) {
  return getBoardTemplate(caseData)?.objects.find((entry) => entry.cell === cell);
}

function occupantAt(cell) {
  return Object.keys(state.placements).find((personId) => state.placements[personId] === cell);
}

function isBlockedForPlacement(caseData, cell, personId) {
  const object = objectAt(caseData, cell);
  if (object && !object.canOccupy) return true;
  const point = cellToPoint(cell);
  return Object.entries(state.placements).some(([otherId, otherCell]) => {
    if (otherId === personId) return false;
    const otherPoint = cellToPoint(otherCell);
    return point.row === otherPoint.row || point.col === otherPoint.col;
  });
}

function characterListMarkup(participants) {
  return '<div class="character-list">' + participants.map((id) => {
    const person = characters[id];
    const placed = state.placements[id];
    return '<button class="character-card ' + (state.selectedPerson === id ? "selected " : "") + (placed ? "placed" : "") + '" data-action="select-person" data-person="' + id + '">' + avatar(id, "sm") + '<strong>' + htmlEscape(person.shortName) + '</strong><small>' + (placed ? htmlEscape(placed) : htmlEscape(person.role)) + '</small></button>';
  }).join("") + "</div>";
}

function roomBoundaryClasses(index, size, roomIds) {
  const row = Math.floor(index / size);
  const col = index % size;
  const room = roomIds[index];
  const classes = [];
  if (row > 0 && roomIds[(row - 1) * size + col] !== room) classes.push("room-boundary-top");
  if (col > 0 && roomIds[row * size + col - 1] !== room) classes.push("room-boundary-left");
  return classes.join(" ");
}

function boardMarkup(caseData) {
  const grid = getGridData(caseData);
  const template = getBoardTemplate(caseData);
  const cells = [];
  for (let index = 0; index < grid.size * grid.size; index += 1) {
    const cell = pointToCell(Math.floor(index / grid.size), index % grid.size);
    const roomId = template.rooms[index];
    const object = objectAt(caseData, cell);
    const occupant = occupantAt(cell);
    const selected = state.selectedPerson && state.placements[state.selectedPerson] === cell;
    const blocked = isBlockedForPlacement(caseData, cell, state.selectedPerson);
    const noteIds = state.notes[cell] || [];
    const target = grid.targetCell === cell;
    cells.push('<button class="board-cell room-' + roomId + ' ' + roomBoundaryClasses(index, grid.size, template.rooms) + ' ' + (object ? "contains-object " : "") + (occupant ? "contains-character " : "") + (selected ? "selected-character-cell " : "") + (blocked ? "placement-blocked " : "") + (state.noteMode ? "note-mode" : "") + '" data-action="cell" data-cell="' + cell + '" data-room="' + roomId + '" aria-label="' + cell + ", " + htmlEscape(locationTitle(roomId)) + (object ? ", " + htmlEscape(object.label) : "") + '">' + '<span class="cell-coordinate">' + cell + '</span><span class="room-label">' + htmlEscape(locations[roomId]?.shortTitle || locationTitle(roomId)) + '</span>' + (object ? '<span class="cell-object">' + (object.path ? '<img src="' + object.path + '" alt="' + htmlEscape(object.label) + '">' : '<span class="object-placeholder" aria-label="' + htmlEscape(object.label) + '"></span>') + "</span>" : "") + (target ? '<span class="target-marker">' + htmlEscape(grid.targetLabel || "ЦЕЛЬ") + "</span>" : "") + (occupant ? '<span class="character-layer">' + avatar(occupant, "sm") + '<small>' + htmlEscape(characters[occupant].shortName) + "</small></span>" : "") + (noteIds.length ? '<span class="notes-layer">' + noteIds.map((id) => avatar(id, "sm")).join("") + "</span>" : "") + '<span class="state-overlay"></span></button>');
  }
  return cells.join("");
}

function clueListMarkup(caseData) {
  const grid = getGridData(caseData);
  if (!grid) return "";
  const reviewed = state.progress.testimonyStatuses[caseData.id] || {};
  return '<div class="clue-list">' + grid.clues.map((entry, index) => '<button class="clue-item ' + (state.selectedClue === entry.id ? "active " : "") + (reviewed[entry.id] ? "reviewed" : "") + '" data-action="select-clue" data-clue-id="' + entry.id + '"><span class="clue-number">' + (index + 1) + '</span><span><b>' + htmlEscape(entry.source) + '</b><span class="clue-text">' + htmlEscape(entry.text) + "</span></span></button>").join("") + "</div>";
}

function gridBoardSection(caseData) {
  const grid = getGridData(caseData);
  return `<section class="board-card surface-card"><div class="board-card-heading"><span><b>ПЛАН ПОМЕЩЕНИЯ</b><small>${htmlEscape(chapter.title)} · Поле ${grid.size}×${grid.size} · ${htmlEscape(caseData.snapshotTime)}</small></span><span class="board-status">${Object.keys(state.placements).length}/${grid.participants.length} размещено</span></div><div class="game-board board-${grid.size}" style="grid-template-columns:repeat(${grid.size},1fr)">${boardMarkup(caseData)}</div><div class="mobile-character-strip"><span class="panel-label">УЧАСТНИКИ</span>${characterListMarkup(grid.participants)}</div></section>`;
}

function gridSidePanel(caseData) {
  const grid = getGridData(caseData);
  return '<aside class="right-panel"><section class="side-card characters-panel"><div class="panel-heading"><span><b>Участники</b><small>Выберите человека, затем клетку</small></span><span>' + Object.keys(state.placements).length + "/" + grid.participants.length + "</span></div>" + characterListMarkup(grid.participants) + '</section><section class="side-card clues-panel"><div class="panel-heading"><span><b>Материалы дела</b><small>Отмечайте использованные показания</small></span><span>' + grid.clues.length + "</span></div>" + clueListMarkup(caseData) + "</section></aside>";
}

function mechanicToolbar(caseData, gridMode = false) {
  const gridButtons = gridMode ? `<button data-action="undo" class="secondary-button">↶ <span>Отменить</span></button><button class="${state.noteMode ? "active" : ""} secondary-button" data-action="notes">${icon(uiAssets.notes, "Заметки")}<span>Заметки</span></button>` : "";
  return `<div class="mechanic-toolbar ${gridMode ? "grid-toolbar" : ""}">${gridButtons}<button class="secondary-button" data-action="hint">${icon(uiAssets.hint, "Подсказка")}<span>Подсказка</span></button><button class="primary-button" data-action="verify">${icon(uiAssets.check, "Проверить")}<span>Проверить решение</span></button></div>`;
}

function caseMaterialsPanel(caseData) {
  const unlocked = state.progress.unlockedEvidence.filter((id) => caseData.materials.includes(id) || evidenceById[id].unlockedByCase === caseData.id);
  return `<aside class="evidence-sidebar surface-card"><div class="panel-heading"><span><b>Архив дела</b><small>Материалы и следующий вопрос</small></span><span>${unlocked.length}</span></div><div class="case-question"><span class="eyebrow">СЛЕДУЮЩИЙ ВОПРОС</span><p>${htmlEscape(isCompleted(caseData.id) ? caseData.nextQuestion : "Изучите материалы и проверьте собственную версию.")}</p></div><div class="case-material-list">${unlocked.length ? unlocked.map((id) => evidenceCard(id, true)).join("") : '<div class="empty-state">Материалы открываются из завершённых дел.</div>'}</div><button class="text-button" data-action="open-archive-materials">Открыть весь архив →</button></aside>`;
}

function gameFrame(caseData, mainContent, sideContent, toolbar) {
  return `<div class="app-screen game-screen mechanic-${caseData.mechanic}"><header class="topbar"><div class="topbar-side"><button class="icon-button" data-action="back-cases" aria-label="К делам">${icon(uiAssets.back, "Назад")}</button></div><strong class="topbar-title">Дело ${caseNumber(caseData)} · ${htmlEscape(caseData.title)}</strong><div class="topbar-side topbar-actions"><span class="timer">${icon(uiAssets.timer, "Время")}<span>${formatTime(state.elapsed)}</span></span><button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings, "Настройки")}</button></div></header><main class="investigation-layout"><section class="investigation-main"><div class="mechanic-heading"><div><span class="eyebrow">ЗАДАЧА · ${htmlEscape(mechanicLabel(caseData.mechanic))}</span><h1>${htmlEscape(caseData.title)}</h1><p>${htmlEscape(caseData.intro)}</p></div></div><div class="investigation-workspace">${state.hints ? `<details class="saved-hints surface-card"><summary>Открытые подсказки (${state.hints})</summary>${caseData.hints.slice(0, state.hints).map(h => `<p>${htmlEscape(h.text)}</p>`).join("")}</details>` : ""}${mainContent}${caseData.mechanic === "finance" ? caseMaterialsPanel(caseData) : ""}<details class="shared-map surface-card"><summary>Карта особняка</summary>${renderMapRegistry()}</details></div>${toolbar}</section>${sideContent}</main>${evidenceOverlayMarkup()}${settingsMarkup()}${toastMarkup()}</div>`;
}

function renderGridCase(caseData) {
  const main = gridBoardSection(caseData);
  return gameFrame(caseData, main, gridSidePanel(caseData), mechanicToolbar(caseData, true));
}

function mechanicPanel(title, kicker, body, className = "") {
  return '<section class="mechanic-panel surface-card ' + className + '"><div class="mechanic-panel-heading"><span class="eyebrow">' + htmlEscape(kicker) + '</span><h2>' + htmlEscape(title) + '</h2></div>' + body + "</section>";
}

function nonGridFrame(caseData, mainContent) {
  return gameFrame(caseData, mainContent, caseMaterialsPanel(caseData), mechanicToolbar(caseData));
}

function timelineStateFor(caseData) {
  return getMechanicState("timelineState", caseData.id, { order: [] });
}

function renderTimelineCase(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = timelineStateFor(caseData);
  const order = saved.order || [];
  const placed = new Set(order.filter(Boolean));
  const eventCards = puzzle.events.filter((event) => !placed.has(event.id)).map((event) => '<button class="timeline-event ' + (state.timelineSelected === event.id ? "selected" : "") + '" data-action="select-timeline-event" data-event-id="' + event.id + '"><time>' + htmlEscape(event.time) + '</time><strong>' + htmlEscape(event.title) + '</strong><small>' + htmlEscape(event.description) + "</small></button>").join("");
  const slots = puzzle.events.map((_, index) => {
    const eventId = order[index];
    const event = puzzle.events.find((entry) => entry.id === eventId);
    return '<button class="timeline-slot ' + (event ? "filled" : "") + '" data-action="place-timeline-slot" data-slot="' + index + '"><span>' + (index + 1) + '</span>' + (event ? '<strong>' + htmlEscape(event.title) + '</strong><small>' + htmlEscape(event.time) + '</small>' : "<em>Выберите карточку</em>") + "</button>";
  }).join("");
  const body = '<div class="timeline-workbench"><div class="timeline-instruction">Выберите карточку события, затем свободное место на временной линии.</div><div class="timeline-card-pool">' + (eventCards || '<div class="empty-state">Все карточки размещены. Проверьте порядок.</div>') + '</div><div class="timeline-slots">' + slots + "</div></div>";
  return nonGridFrame(caseData, mechanicPanel("Восстановите последовательность", "ВРЕМЕННАЯ ЛИНИЯ", body, "timeline-panel"));
}

function chainStateFor(caseData) {
  return getMechanicState("itemChainState", caseData.id, { order: [], testimonies: {} });
}

function renderItemChainCase(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = chainStateFor(caseData);
  const order = saved.order || [];
  const placed = new Set(order.filter(Boolean));
  const itemCards = puzzle.items.filter((item) => !placed.has(item.id)).map((item) => '<button class="chain-item ' + (state.chainSelected === item.id ? "selected" : "") + '" data-action="select-chain-item" data-item-id="' + item.id + '"><time>' + htmlEscape(item.time) + '</time><strong>' + htmlEscape(item.title) + '</strong><small>' + htmlEscape(item.description) + "</small></button>").join("");
  const slots = puzzle.items.map((_, index) => {
    const item = puzzle.items.find((candidate) => candidate.id === order[index]);
    return '<button class="chain-slot ' + (item ? "filled" : "") + '" data-action="place-chain-slot" data-slot="' + index + '"><span>' + (index + 1) + '</span>' + (item ? '<strong>' + htmlEscape(item.title) + '</strong><small>' + htmlEscape(item.time) + '</small>' : "<em>Выберите этап</em>") + "</button>";
  }).join("");
  const testimonyRows = puzzle.testimonies.map((testimony) => {
    const selected = saved.testimonies[testimony.id];
    return '<div class="testimony-check"><div><b>' + htmlEscape(characters[testimony.character].shortName) + '</b><p>' + htmlEscape(testimony.text) + '</p></div><div class="binary-choice"><button class="' + (selected === "confirmed" ? "active" : "") + '" data-action="mark-testimony" data-testimony-id="' + testimony.id + '" data-status="confirmed">подтверждено</button><button class="' + (selected === "contradicted" ? "active" : "") + '" data-action="mark-testimony" data-testimony-id="' + testimony.id + '" data-status="contradicted">противоречит</button></div></div>';
  }).join("");
  const body = '<div class="chain-workbench"><div class="timeline-instruction">Соберите историю движения ключа, затем отметьте, какие показания расходятся с журналом.</div><div class="chain-card-pool">' + (itemCards || '<div class="empty-state">Все этапы размещены.</div>') + '</div><div class="chain-slots">' + slots + '</div><div class="testimony-checks"><h3>Проверка показаний</h3>' + testimonyRows + "</div></div>";
  return nonGridFrame(caseData, mechanicPanel("Восстановите путь предмета", "ЦЕПОЧКА ПРЕДМЕТА", body, "chain-panel"));
}

function routePathMarkup(path) {
  return '<div class="route-path">' + path.map((id, index) => '<span class="route-node ' + (locations[id]?.hidden ? "hidden-node" : "") + '">' + htmlEscape(locationTitle(id)) + '</span>' + (index < path.length - 1 ? '<span class="route-arrow">→</span>' : "")).join("") + "</div>";
}

function renderRouteDiscovery(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("routeState", caseData.id, { path: [] });
  const path = saved.path || [];
  const last = path[path.length - 1];
  const candidates = Object.keys(locations);
  const buttons = candidates.map((id) => '<button class="route-location ' + (path.includes(id) ? "visited" : "") + '" data-action="route-add-node" data-location-id="' + id + '" ' + (last && id === last ? "disabled" : "") + '>' + htmlEscape(locationTitle(id)) + '</button>').join("");
  const segmentRows = puzzle.segments.map((segment) => '<div class="route-evidence-row"><span>' + htmlEscape(locationTitle(segment.from)) + ' → ' + htmlEscape(locationTitle(segment.to)) + '</span><b>' + segment.time + ' сек.</b><small>' + htmlEscape(segment.note) + '</small></div>').join("");
  const body = '<div class="route-workbench"><div class="route-map-schematic">' + routePathMarkup(path.length ? path : [puzzle.start]) + '</div><div class="route-location-list">' + buttons + '</div><div class="route-evidence-list"><h3>Фрагменты схемы</h3>' + segmentRows + '</div><p class="route-total">Время восстановленного пути: <b>' + (path.length > 1 ? pathTime(path) : "—") + '</b> сек.</p></div>';
  return nonGridFrame(caseData, mechanicPanel("Найдите скрытое соединение", "КАРТА МАРШРУТА", body, "route-panel"));
}

function routePathOptionMarkup(option, selected) {
  const marked = typeof selected === "boolean";
  const possible = selected === true;
  return `<button class="route-option ${marked ? "selected" : ""} ${marked && possible ? "possible" : ""} ${marked && !possible ? "impossible" : ""}" data-action="toggle-route-option" data-option-id="${option.id}"><div><strong>${htmlEscape(option.title)}</strong>${routePathMarkup(option.path)}</div><span class="route-time">${option.time === null ? "нет соединения" : option.time + " сек."}</span><small>${htmlEscape("Сопоставьте соединения, пломбу и время ручного переключения.")}</small><em>${marked ? (possible ? "отмечен как возможный" : "отмечен как невозможный") : "статус не выбран"}</em></button>`;
}

function renderRouteChoices(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("routeState", caseData.id, { choices: {} });
  const body = '<div class="route-workbench"><div class="route-conditions"><span>Отключение: ' + htmlEscape(puzzle.blackout.starts) + '</span><span>Длительность: ' + puzzle.blackout.duration + ' сек.</span><span>Рубильник: ' + htmlEscape(locationTitle(puzzle.blackout.switch)) + '</span></div><div class="route-options">' + puzzle.options.map((option) => routePathOptionMarkup(option, saved.choices[option.id])).join("") + '</div><p class="route-selection-note">Нажмите на маршрут, чтобы выбрать возможный или невозможный статус.</p></div>';
  return nonGridFrame(caseData, mechanicPanel("Проверьте маршруты во тьме", "МАРШРУТ", body, "route-panel"));
}

function renderRouteCase(caseData) {
  return caseData.puzzleData.mode === "discoverPassage" ? renderRouteDiscovery(caseData) : renderRouteChoices(caseData);
}

function renderFragmentCompare(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("documentState", caseData.id, { candidate: null, fields: [] });
  const cards = puzzle.candidates.map((candidate) => `<article class="document-candidate ${saved.candidate === candidate.id ? "selected" : ""}"><button data-action="select-doc-candidate" data-candidate-id="${candidate.id}"><strong>${htmlEscape(candidate.title)}</strong></button><div class="document-fields">${candidate.fields.map((field, index) => `<button class="${saved.candidate === candidate.id && saved.fields.includes(index) ? "matched" : ""}" data-action="toggle-doc-field" data-candidate-id="${candidate.id}" data-field-index="${index}">${htmlEscape(field)}</button>`).join("")}</div></article>`).join("");
  const body = `<div class="document-workbench"><div class="fragment-card"><span class="eyebrow">ФРАГМЕНТ</span><h3>${htmlEscape(puzzle.fragment.title)}</h3><div class="document-fields">${puzzle.fragment.fields.map((field) => `<span>${htmlEscape(field)}</span>`).join("")}</div></div><div class="document-candidates">${cards}</div><p class="document-instruction">Выберите один документ и отметьте каждый совпавший признак.</p></div>`;
  return nonGridFrame(caseData, mechanicPanel("Сопоставьте источник фрагмента", "СРАВНЕНИЕ ДОКУМЕНТОВ", body, "document-panel"));
}

function renderFieldCompare(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("documentState", caseData.id, { choices: {} });
  const rows = puzzle.fields.map((field) => '<div class="field-compare-row"><div><strong>' + htmlEscape(field.label) + '</strong><small>Выберите значение, которое осталось в изменённом поручении.</small></div><div class="field-options">' + field.options.map((option) => '<button class="' + (saved.choices[field.id] === option.id ? "selected" : "") + '" data-action="select-doc-field" data-field-id="' + field.id + '" data-value="' + option.id + '"><b>' + htmlEscape(option.label) + '</b><small>' + htmlEscape(option.note) + "</small></button>").join("") + "</div></div>").join("");
  return nonGridFrame(caseData, mechanicPanel("Найдите изменённые поля", "СРАВНЕНИЕ ДОКУМЕНТОВ", '<div class="field-compare">' + rows + "</div>", "document-panel"));
}

function renderCustodyCompare(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("documentState", caseData.id, { choices: {} });
  const rows = puzzle.prompts.map((prompt) => '<div class="custody-row"><strong>' + htmlEscape(prompt.label) + '</strong><div class="field-options">' + prompt.options.map((option) => '<button class="' + (saved.choices[prompt.id] === option.id ? "selected" : "") + '" data-action="select-doc-field" data-field-id="' + prompt.id + '" data-value="' + option.id + '">' + htmlEscape(option.label) + "</button>").join("") + "</div></div>").join("");
  return nonGridFrame(caseData, mechanicPanel("Установите судьбу оригинала", "ОПИСЬ ДОКУМЕНТОВ", '<div class="custody-compare"><h3>Цепочка хранения</h3><p>Нажимайте документы в порядке передачи. Нажатие выбранного документа убирает его и последующие звенья.</p>' + puzzle.custodySteps.map(step => '<button class="secondary-button" data-action="custody-step" data-step="'+step.id+'">'+((saved.order || []).includes(step.id) ? ((saved.order.indexOf(step.id)+1)+'. ') : '')+htmlEscape(step.title)+'</button>').join('') + rows + "</div>", "document-panel"));
}

function renderDocumentCompareCase(caseData) {
  const mode = caseData.puzzleData.mode;
  if (mode === "fragment") return renderFragmentCompare(caseData);
  if (mode === "fieldCompare") return renderFieldCompare(caseData);
  return renderCustodyCompare(caseData);
}

function pathTime(path) {
  let total = 0;
  for (let index = 0; index < path.length - 1; index += 1) {
    const time = travelTimeBetween(path[index], path[index + 1]);
    if (typeof time !== "number") return null;
    total += time;
  }
  return total;
}

function renderFinanceChain(caseData) {
  const finance = caseData.puzzleData.finance;
  const saved = getMechanicState("financeState", caseData.id, { order: [] });
  const order = saved.order || [];
  const placed = new Set(order);
  const cards = finance.items.filter((item) => !placed.has(item.id)).map((item) => '<button class="finance-item ' + (state.financeSelected === item.id ? "selected" : "") + '" data-action="select-finance-item" data-item-id="' + item.id + '"><strong>' + htmlEscape(item.title) + '</strong><small>' + htmlEscape(item.description) + "</small></button>").join("");
  const slots = finance.items.map((_, index) => {
    const item = finance.items.find((entry) => entry.id === order[index]);
    return '<button class="finance-slot ' + (item ? "filled" : "") + '" data-action="place-finance-slot" data-slot="' + index + '"><span>' + (index + 1) + '</span>' + (item ? '<strong>' + htmlEscape(item.title) + '</strong>' : "<em>Следующее звено</em>") + "</button>";
  }).join("");
  return mechanicPanel("Отследите путь денег", "ФИНАНСОВАЯ ЦЕПОЧКА", '<div class="finance-workbench"><p>Выстройте связь от договора до счёта, который контролируется одним из участников.</p><div class="finance-card-pool">' + (cards || '<div class="empty-state">Все звенья размещены.</div>') + '</div><div class="finance-slots">' + slots + "</div></div>", "finance-panel");
}

function renderFinanceCase(caseData) {
  const gridCase = Object.assign({}, caseData, { puzzleData: caseData.puzzleData.grid, mechanic: "grid" });
  const main = renderFinanceChain(caseData) + gridBoardSection(gridCase) + '<div class="mobile-clue-panel">' + clueListMarkup(gridCase) + "</div>";
  return gameFrame(caseData, main, gridSidePanel(gridCase), mechanicToolbar(caseData, true));
}

function reconstructionStateFor(caseData) {
  return getMechanicState("reconstructionState", caseData.id, { choices: {}, evidence: [], sequence: [] });
}

function renderReconstructionPart(partId, part, saved) {
  return `<section class="reconstruction-part"><div class="reconstruction-part-heading"><span>${htmlEscape(part.label)}</span><small>${saved.choices[partId] ? "выбрано" : "требуется решение"}</small></div><div class="reconstruction-options">${part.options.map((option) => `<button class="${saved.choices[partId] === option.id ? "selected" : ""}" data-action="reconstruction-select" data-part="${partId}" data-value="${option.id}">${htmlEscape(option.label)}</button>`).join("")}</div></section>`;
}

function renderReconstructionCase(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = reconstructionStateFor(caseData);
  const parts = Object.entries(puzzle.parts).map(([id, part]) => renderReconstructionPart(id, part, saved)).join("");
  const evidenceRows = puzzle.evidence.map((id) => {
    const entry = evidenceById[id];
    const selected = saved.evidence.includes(id);
    const available = state.progress.unlockedEvidence.includes(id);
    return '<button class="reconstruction-evidence ' + (selected ? "selected" : "") + ' ' + (available ? "" : "disabled") + '" data-action="toggle-reconstruction-evidence" data-evidence-id="' + id + '" ' + (!available ? "disabled" : "") + '><span class="evidence-check">' + (selected ? "✓" : "") + '</span><span><strong>' + htmlEscape(entry.title) + '</strong><small>' + htmlEscape(entry.directConclusion) + "</small></span></button>";
  }).join("");
  const sequence = puzzle.sequence;
  const sequencePlaced = new Set(saved.sequence || []);
  const sequenceCards = sequence.filter((item) => !sequencePlaced.has(item.id)).map((item) => '<button class="sequence-card ' + (state.reconstructionPart === item.id ? "selected" : "") + '" data-action="select-reconstruction-step" data-step-id="' + item.id + '">' + htmlEscape(item.label) + "</button>").join("");
  const sequenceSlots = sequence.map((_, index) => {
    const item = sequence.find((candidate) => candidate.id === saved.sequence[index]);
    return '<button class="sequence-slot ' + (item ? "filled" : "") + '" data-action="place-reconstruction-step" data-slot="' + index + '"><span>' + (index + 1) + '</span>' + (item ? htmlEscape(item.label) : "<em>Выберите действие</em>") + "</button>";
  }).join("");
  const body = '<div class="reconstruction-workbench"><div class="reconstruction-parts">' + parts + '</div><section class="reconstruction-evidence"><h3>Ключевые доказательства</h3><p>Выберите только материалы, которые действительно понадобятся для полной версии.</p><div class="reconstruction-evidence-list">' + evidenceRows + '</div></section><section class="reconstruction-sequence"><h3>Последовательность действий</h3><div class="sequence-pool">' + (sequenceCards || '<div class="empty-state">Все действия размещены.</div>') + '</div><div class="sequence-slots">' + sequenceSlots + "</div></section></div>";
  return nonGridFrame(caseData, mechanicPanel("Соберите версию преступления", "ФИНАЛЬНАЯ РЕКОНСТРУКЦИЯ", body, "reconstruction-panel"));
}

function renderCase(caseData) {
  if (caseData.mechanic === "grid") return renderGridCase(caseData);
  if (caseData.mechanic === "timeline") return renderTimelineCase(caseData);
  if (caseData.mechanic === "itemChain") return renderItemChainCase(caseData);
  if (caseData.mechanic === "route") return renderRouteCase(caseData);
  if (caseData.mechanic === "documentCompare") return renderDocumentCompareCase(caseData);
  if (caseData.mechanic === "finance") return renderFinanceCase(caseData);
  if (caseData.mechanic === "reconstruction") return renderReconstructionCase(caseData);
  return nonGridFrame(caseData, mechanicPanel("Материалы дела", "РАССЛЕДОВАНИЕ", "<p>Для этого дела ещё не выбран тип задачи.</p>"));
}

function renderResult() {
  const caseData = activeCase();
  const unlocked = (caseData.unlocks?.evidence || []).filter((id) => state.progress.unlockedEvidence.includes(id));
  const final = caseData.id === "case-12";
  const explanation = final ? caseData.resultSummary : (unlocked.length ? "Решение согласовано. Откройте карточку нового материала и сопоставьте её со следующим вопросом." : "Решение согласовано с доступными материалами.");
  return `<div class="app-screen result-app"><header class="topbar"><div class="topbar-side"><button class="icon-button" data-action="back-cases" aria-label="К делам">${icon(uiAssets.back, "Назад")}</button></div><strong class="topbar-title">Результат дела ${caseNumber(caseData)}</strong><div class="topbar-side topbar-actions"><button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings, "Настройки")}</button></div></header><main class="result-page page-container"><section class="result-card surface-card result-document"><span class="document-stamp">${final ? "ОБВИНЕНИЕ СОБРАНО" : "ВЫВОД ПОДТВЕРЖДЁН"}</span><span class="eyebrow">ДЕЛО ${caseNumber(caseData)}</span><h1>${htmlEscape(caseData.title)}</h1><div class="result-person">${avatar(final ? "boris" : "richard", "lg")}<div><span>${final ? "Итоговая версия" : "Установленный факт"}</span><strong>${htmlEscape(final ? "Цепочка доказательств согласована" : "Материал добавлен в архив")}</strong></div></div><p class="result-explanation">${htmlEscape(explanation)}</p><div class="established-fact"><span class="eyebrow">НОВЫЕ МАТЕРИАЛЫ</span><div class="result-evidence-list">${unlocked.length ? unlocked.map((id) => evidenceCard(id, true)).join("") : (final ? '<p>Финал не создаёт новых обязательных доказательств.</p>' : "<p>Материалы этого дела уже были открыты.</p>")}</div></div><div class="stats-row"><span><b>${formatTime(state.elapsed)}</b>Время</span><span><b>${state.hints}</b>Подсказки</span><span><b>${Math.max(1, 3 - state.errors - state.hints)}</b>Звёзды</span></div><div class="result-actions"><button class="primary-button" data-action="continue-after-result">${final ? "ЗАВЕРШИТЬ ГЛАВУ" : "ПРОДОЛЖИТЬ"}</button></div></section></main>${evidenceOverlayMarkup()}${settingsMarkup()}${toastMarkup()}</div>`;
}

function renderChapterComplete() {
  return `<div class="app-screen"><header class="topbar"><div class="topbar-side"></div><strong class="topbar-title">Глава завершена</strong><div class="topbar-side topbar-actions"><button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings, "Настройки")}</button></div></header><main class="result-page page-container"><section class="result-card surface-card result-document"><span class="document-stamp">ГЛАВА РАСКРЫТА</span><div class="chapter-complete-image">${mediaMarkup(chapter.map, "Карта особняка Блэквуд")}</div><h1>Особняк Блэквуд</h1><p class="result-explanation">Двенадцать дел собрали единую версию: мотив K-17, окно 21:05–21:12, скрытый маршрут, пресс-папье и исчезнувший оригинал.</p><div class="result-actions"><button class="primary-button" data-action="campaign-open" data-chapter="2">СЛЕДУЮЩАЯ ГЛАВА</button><button class="secondary-button" data-action="open-chapter">ОТКРЫТЬ АРХИВ</button><button class="secondary-button" data-action="home-play">ВСЕ ГЛАВЫ</button></div></section></main>${settingsMarkup()}${toastMarkup()}</div>`;
}

function renderGame() {
  return renderCase(activeCase());
}

function render() {
  if (!root) return;
  globalThis.GamePlatform?.gameplay(!state.splash && !state.settingsOpen && (state.screen === "game" || (state.screen === "campaign" && campaignView.screen === "case")));
  if (state.splash) root.innerHTML = renderSplash();
  else if (state.screen === "home") root.innerHTML = renderHome();
  else if (state.screen === "campaign") root.innerHTML = renderCampaign();
  else if (state.screen === "menu") root.innerHTML = renderMenu();
  else if (state.screen === "chapter-cover") root.innerHTML = renderChapterCover();
  else if (state.screen === "archive") root.innerHTML = renderArchive();
  else if (state.screen === "game") root.innerHTML = renderGame();
  else if (state.screen === "result") root.innerHTML = renderResult();
  else if (state.screen === "complete") root.innerHTML = renderChapterComplete();
  else root.innerHTML = renderMenu();
}

function saveStateImmediately() {
  if (["game", "result"].includes(state.screen)) saveActiveState();
  else persistProgress();
}

function openCase(caseId) {
  if (state.archiveReadOnly) return showToast("Эта глава уже раскрыта. Материалы доступны для просмотра.", "neutral", "АРХИВ");
  const caseData = caseById[caseId];
  if (!caseData || !isUnlocked(caseData)) {
    showToast("Это дело пока закрыто.", "error", "АРХИВ");
    return;
  }
  state.currentCaseId = caseId;
  state.progress.currentCase = caseId;
  state.caseIntroOpen = true;
  state.archiveTab = "cases";
  persistProgress();
  render();
}

function startCurrentCase() {
  const caseData = activeCase();
  state.caseIntroOpen = false;
  state.screen = "game";
  state.progress.currentCase = caseData.id;
  loadCaseState(caseData);
  evidenceRegistry.filter(e => e.onOpen && e.unlockedByCase === caseData.id).forEach(e => {
    if (!state.progress.unlockedEvidence.includes(e.id)) state.progress.unlockedEvidence.push(e.id);
    state.progress.evidenceStatuses[e.id] = 'unverified';
  });
  saveActiveState();
  render();
}

function resumeInvestigation() {
  const caseData = caseById[state.progress.currentCase] || cases[0];
  state.currentCaseId = caseData.id;
  if (state.progress.active?.caseId === caseData.id && state.progress.active.stage === "result") {
    loadCaseState(caseData);
    state.screen = "result";
    render();
    return;
  }
  if (state.progress.completedCases.length === cases.length) {
    state.screen = "complete";
    render();
    return;
  }
  state.archiveTab = "cases";
  state.caseIntroOpen = true;
  state.screen = "archive";
  render();
}

function unlockCaseEvidence(caseData) {
  const entries = caseData.unlocks?.evidence || [];
  entries.forEach((id) => {
    if (!state.progress.unlockedEvidence.includes(id)) state.progress.unlockedEvidence.push(id);
    state.progress.evidenceStatuses[id] = caseData.id === "case-04" && ["ev-key-chain"].includes(id) ? "confirmed" : "confirmed";
  });
  (caseData.unlocks?.mapDiscoveries || []).forEach((id) => {
    state.progress.mapDiscoveries[id] = true;
    if (locations[id]) locations[id].discovered = true;
  });
}

function completeCurrentCase() {
  if (state.screen !== "result") return;
  saveActiveState();
  const caseData = activeCase();
  if (!caseData) return;
  if (!state.progress.completedCases.includes(caseData.id)) state.progress.completedCases.push(caseData.id);
  state.progress.completed = state.progress.completedCases.slice();
  unlockCaseEvidence(caseData);
  const index = caseOrder.indexOf(caseData.id);
  state.progress.unlockedCaseIndex = Math.max(state.progress.unlockedCaseIndex, Math.min(cases.length, index + 2));
  state.progress.unlocked = state.progress.unlockedCaseIndex;
  state.progress.stars[caseData.id] = Math.max(1, 3 - state.errors - state.hints);
  state.progress.active = null;
  if (index < cases.length - 1) {
    state.progress.currentCase = caseOrder[index + 1];
    state.currentCaseId = state.progress.currentCase;
    state.screen = "archive";
    state.archiveTab = "cases";
  } else {
    state.progress.currentCase = caseData.id;
    state.screen = "complete";
  }
  persistProgress();
  render();
}

function pushGridHistory() {
  state.history.push({ placements: clone(state.placements), notes: clone(state.notes) });
  if (state.history.length > 30) state.history.shift();
}

function selectPerson(personId) {
  const grid = getGridData(activeCase());
  if (!grid || !grid.participants.includes(personId)) return;
  state.selectedPerson = state.selectedPerson === personId ? null : personId;
  render();
}

function interactWithCell(cell) {
  const caseData = activeCase();
  const grid = getGridData(caseData);
  if (!grid || !isBoardCell(cell, grid.size)) return;
  if (state.noteMode) {
    pushGridHistory();
    const current = new Set(state.notes[cell] || []);
    if (state.selectedPerson) {
      if (current.has(state.selectedPerson)) current.delete(state.selectedPerson);
      else current.add(state.selectedPerson);
    }
    state.notes[cell] = Array.from(current);
    scheduleSave();
    render();
    return;
  }
  if (!state.selectedPerson) {
    const occupant = occupantAt(cell);
    if (occupant) state.selectedPerson = occupant;
    render();
    return;
  }
  const oldCell = state.placements[state.selectedPerson];
  if (oldCell === cell) {
    pushGridHistory();
    delete state.placements[state.selectedPerson];
    scheduleSave();
    render();
    return;
  }
  if (isBlockedForPlacement(caseData, cell, state.selectedPerson)) {
    showToast("Эта клетка занята предметом или нарушает строку/столбец.", "error", "СЕТКА");
    return;
  }
  pushGridHistory();
  Object.keys(state.placements).forEach((id) => {
    if (id !== state.selectedPerson && state.placements[id] === cell) delete state.placements[id];
  });
  state.placements[state.selectedPerson] = cell;
  state.selectedPerson = null;
  scheduleSave();
  render();
}

function undoGrid() {
  const previous = state.history.pop();
  if (!previous) {
    showToast("Нечего отменять.", "neutral", "СЕТКА");
    return;
  }
  state.placements = previous.placements;
  state.notes = previous.notes;
  scheduleSave();
  render();
}

function compareArrays(a, b) {
  return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index) => value === b[index]);
}

function verifyGrid(caseData) {
  const grid = getGridData(caseData);
  if (Object.keys(state.placements).length !== grid.participants.length) {
    showToast("Разместите всех участников на поле.", "error", "СЕТКА");
    return false;
  }
  const expected = caseData.solution.grid || caseData.solution;
  const valid = grid.participants.every((id) => state.placements[id] === expected[id]) && grid.clues.every((entry) => evaluateRule(caseData, state.placements, entry.rule));
  if (!valid) {
    state.errors += 1;
    state.progress.errors[caseData.id] = state.errors;
    scheduleSave();
    showToast("Некоторые положения не согласуются с материалами.", "error", "ПРОВЕРКА");
    return false;
  }
  return true;
}

function verifyTimeline(caseData) {
  const saved = timelineStateFor(caseData);
  if (!compareArrays(saved.order, caseData.puzzleData.solution)) {
    state.errors += 1;
    showToast("Временная последовательность ещё не согласована.", "error", "ХРОНОЛОГИЯ");
    return false;
  }
  return true;
}

function verifyItemChain(caseData) {
  const saved = chainStateFor(caseData);
  const correctStatus = caseData.puzzleData.testimonies.every((entry) => saved.testimonies[entry.id] === entry.expected);
  if (!compareArrays(saved.order, caseData.puzzleData.solution) || !correctStatus) {
    state.errors += 1;
    showToast("Цепочка или проверка показаний содержит ошибку.", "error", "ЦЕПОЧКА");
    return false;
  }
  return true;
}

function verifyRoute(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("routeState", caseData.id, puzzle.mode === "discoverPassage" ? { path: [] } : { choices: {} });
  if (puzzle.mode === "discoverPassage") {
    if (!compareArrays(saved.path, puzzle.route)) {
      state.errors += 1;
      showToast("Маршрут ещё не проходит через все точки схемы.", "error", "КАРТА");
      return false;
    }
    return true;
  }
  const expected = puzzle.solution.possible;
  const complete = puzzle.options.every((option) => Object.hasOwn(saved.choices, option.id));
  const good = complete && puzzle.options.every((option) => Boolean(saved.choices[option.id]) === expected[option.id]);
  if (!good) {
    state.errors += 1;
    showToast("Проверьте время перехода и условия отключения света.", "error", "МАРШРУТ");
    return false;
  }
  return true;
}

function verifyDocuments(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("documentState", caseData.id, puzzle.mode === "fragment" ? { candidate: null, fields: [] } : { choices: {} });
  if (puzzle.mode === "fragment") {
    const solution = puzzle.solution;
    if (saved.candidate !== solution.candidate || !compareArrays((saved.fields || []).slice().sort((a, b) => a - b), solution.fields.slice().sort((a, b) => a - b))) {
      state.errors += 1;
      showToast("Нужно сопоставить все физические признаки одного документа.", "error", "ДОКУМЕНТЫ");
      return false;
    }
    return true;
  }
  const rows = puzzle.mode === "fieldCompare" ? puzzle.fields : puzzle.prompts;
  if (!rows.every((row) => saved.choices[row.id] === row.answer) || (puzzle.mode === "custody" && !compareArrays(saved.order || [], caseData.solution.order))) {
    state.errors += 1;
    showToast("Не все поля согласуются с исходной копией.", "error", "ДОКУМЕНТЫ");
    return false;
  }
  return true;
}

function verifyFinance(caseData) {
  const finance = caseData.puzzleData.finance;
  const saved = getMechanicState("financeState", caseData.id, { order: [] });
  if (!compareArrays(saved.order, finance.solution)) {
    state.errors += 1;
    showToast("Финансовая цепочка разорвана.", "error", "ФИНАНСЫ");
    return false;
  }
  const gridCase = Object.assign({}, caseData, { puzzleData: caseData.puzzleData.grid, mechanic: "grid" });
  return verifyGrid(gridCase);
}

function verifyReconstruction(caseData) {
  const puzzle = caseData.puzzleData;
  const saved = reconstructionStateFor(caseData);
  const partsCorrect = Object.keys(puzzle.parts).every((id) => saved.choices[id] === puzzle.parts[id].answer);
  const expectedEvidence = caseData.solution?.evidence || puzzle.evidence;
  const expectedSequence = caseData.solution?.sequence || puzzle.sequenceAnswer;
  const evidenceCorrect = expectedEvidence.every(id => state.progress.unlockedEvidence.includes(id)) && compareArrays((saved.evidence || []).slice().sort(), expectedEvidence.slice().sort());
  const sequenceCorrect = compareArrays(saved.sequence, expectedSequence);
  if (!partsCorrect || !evidenceCorrect || !sequenceCorrect) {
    state.errors += 1;
    showToast("Версия не объясняет все материалы одновременно.", "error", "РЕКОНСТРУКЦИЯ");
    return false;
  }
  return true;
}

function verifyCurrentCase() {
  const caseData = activeCase();
  let valid = false;
  if (caseData.mechanic === "grid") valid = verifyGrid(caseData);
  if (caseData.mechanic === "timeline") valid = verifyTimeline(caseData);
  if (caseData.mechanic === "itemChain") valid = verifyItemChain(caseData);
  if (caseData.mechanic === "route") valid = verifyRoute(caseData);
  if (caseData.mechanic === "documentCompare") valid = verifyDocuments(caseData);
  if (caseData.mechanic === "finance") valid = verifyFinance(caseData);
  if (caseData.mechanic === "reconstruction") valid = verifyReconstruction(caseData);
  if (!valid) {
    saveActiveState();
    render();
    return;
  }
  unlockCaseEvidence(caseData);
  playSound();
  state.screen = "result";
  saveActiveState();
  showToast("Решение согласовано с материалами.", "success", "ДЕЛО РАСКРЫТО");
}

function selectTimelineEvent(eventId) {
  state.timelineSelected = state.timelineSelected === eventId ? null : eventId;
  render();
}

function placeTimelineEvent(slot) {
  const caseData = activeCase();
  const saved = timelineStateFor(caseData);
  if (!state.timelineSelected) {
    if (saved.order[slot]) {
      state.timelineSelected = saved.order[slot];
      saved.order[slot] = null;
      persistProgress();
      render();
    }
    return;
  }
  saved.order = (saved.order || []).map((id) => id === state.timelineSelected ? null : id);
  saved.order[slot] = state.timelineSelected;
  state.timelineSelected = null;
  persistProgress();
  render();
}

function selectChainItem(itemId) {
  state.chainSelected = state.chainSelected === itemId ? null : itemId;
  render();
}

function placeChainItem(slot) {
  const saved = chainStateFor(activeCase());
  if (!state.chainSelected) {
    if (saved.order[slot]) {
      state.chainSelected = saved.order[slot];
      saved.order[slot] = null;
      persistProgress();
      render();
    }
    return;
  }
  saved.order = (saved.order || []).map((id) => id === state.chainSelected ? null : id);
  saved.order[slot] = state.chainSelected;
  state.chainSelected = null;
  persistProgress();
  render();
}

function markTestimony(testimonyId, status) {
  const saved = chainStateFor(activeCase());
  saved.testimonies[testimonyId] = status;
  state.progress.testimonyStatuses[activeCase().id] = clone(saved.testimonies);
  persistProgress();
  render();
}

function routeAddNode(locationId) {
  const caseData = activeCase();
  const puzzle = caseData.puzzleData;
  const saved = getMechanicState("routeState", caseData.id, { path: [] });
  if (puzzle.mode !== "discoverPassage") return;
  const path = saved.path || [];
  if (!path.length && locationId !== puzzle.start) return;
  if (path.length && path[path.length - 1] === locationId) return;
  if (path.includes(locationId)) {
    saved.path = path.slice(0, path.indexOf(locationId) + 1);
  } else if (!path.length || travelTimeBetween(path[path.length - 1], locationId) !== undefined || (path[path.length - 1] === "service_passage" && locationId === "service_switch")) {
    saved.path = path.concat(locationId);
  }
  persistProgress();
  render();
}

function toggleRouteOption(optionId) {
  const saved = getMechanicState("routeState", activeCase().id, { choices: {} });
  saved.choices[optionId] = !Boolean(saved.choices[optionId]);
  persistProgress();
  render();
}

function selectDocumentCandidate(candidateId) {
  const saved = getMechanicState("documentState", activeCase().id, { candidate: null, fields: [] });
  saved.candidate = candidateId;
  saved.fields = [];
  persistProgress();
  render();
}

function toggleDocumentField(candidateId, fieldIndex) {
  const saved = getMechanicState("documentState", activeCase().id, { candidate: null, fields: [] });
  saved.candidate = candidateId;
  const fields = new Set(saved.fields || []);
  if (fields.has(Number(fieldIndex))) fields.delete(Number(fieldIndex));
  else fields.add(Number(fieldIndex));
  saved.fields = Array.from(fields).sort((a, b) => a - b);
  persistProgress();
  render();
}

function selectDocumentField(fieldId, value) {
  const puzzle = activeCase().puzzleData;
  const fallback = puzzle.mode === "fieldCompare" || puzzle.mode === "custody" ? { choices: {} } : { candidate: null, fields: [] };
  const saved = getMechanicState("documentState", activeCase().id, fallback);
  saved.choices[fieldId] = value;
  persistProgress();
  render();
}

function selectFinanceItem(itemId) {
  state.financeSelected = state.financeSelected === itemId ? null : itemId;
  render();
}

function placeFinanceItem(slot) {
  const saved = getMechanicState("financeState", activeCase().id, { order: [] });
  if (!state.financeSelected) {
    if (saved.order[slot]) {
      state.financeSelected = saved.order[slot];
      saved.order[slot] = null;
      persistProgress();
      render();
    }
    return;
  }
  saved.order = (saved.order || []).map((id) => id === state.financeSelected ? null : id);
  saved.order[slot] = state.financeSelected;
  state.financeSelected = null;
  persistProgress();
  render();
}

function selectReconstructionPart(partId, value) {
  const saved = reconstructionStateFor(activeCase());
  saved.choices[partId] = value;
  persistProgress();
  render();
}

function toggleReconstructionEvidence(evidenceId) {
  if (!state.progress.unlockedEvidence.includes(evidenceId)) return;
  const saved = reconstructionStateFor(activeCase());
  const selected = new Set(saved.evidence || []);
  if (selected.has(evidenceId)) selected.delete(evidenceId);
  else selected.add(evidenceId);
  saved.evidence = Array.from(selected);
  persistProgress();
  render();
}

function selectReconstructionStep(stepId) {
  state.reconstructionPart = state.reconstructionPart === stepId ? null : stepId;
  render();
}

function placeReconstructionStep(slot) {
  const saved = reconstructionStateFor(activeCase());
  if (!state.reconstructionPart) {
    if (saved.sequence[slot]) {
      state.reconstructionPart = saved.sequence[slot];
      saved.sequence[slot] = null;
      persistProgress();
      render();
    }
    return;
  }
  saved.sequence = (saved.sequence || []).map((id) => id === state.reconstructionPart ? null : id);
  saved.sequence[slot] = state.reconstructionPart;
  state.reconstructionPart = null;
  persistProgress();
  render();
}

function useHint() {
  const caseData = activeCase();
  const hints = (caseData.hints || []).filter((hint) => hint && typeof hint.text === "string" && hint.text.trim());
  if (!hints.length) {
    showToast("Для этого дела больше нет текстовых подсказок.", "neutral", "ПОДСКАЗКА");
    return;
  }
  const hint = hints[Math.min(state.hints, hints.length - 1)];
  state.hints = Math.min(state.hints + 1, hints.length);
  state.progress.hintsUsed[caseData.id] = state.hints;
  persistProgress();
  showToast(hint.text, "neutral", "ПОДСКАЗКА · " + mechanicLabel(hint.mechanic));
}

function completeProgressReset() {
  state.progress = initialProgress();
  state.currentCaseId = "case-01";
  state.screen = "home";
  state.caseIntroOpen = false;
  state.settingsOpen = false;
  state.splash = false;
  persistProgress();
  render();
}

function handleAction(button) {
  const action = button.dataset.action;
  if (action.startsWith("campaign-")) return handleCampaignAction(button);
  if (state.screen === "game" || state.screen === "result") saveActiveState();
  const caseData = activeCase();
  if (action === 'home-play') { state.menuViewedChapter = currentChapterId() || 12; state.screen='menu'; return render(); }
  if (action === 'home') { state.screen='home'; return render(); }
  if (action === 'chapter-tab') { const index = Number(button.dataset.index); const pageSize = chapterMenuPageSize(); if (Number.isInteger(index) && index >= 0 && index < 12 / pageSize) { const first = index * pageSize + 1; const current = currentChapterId(); state.menuViewedChapter = current && current >= first && current < first + pageSize ? current : first; } return render(); }
  if (action === 'chapter-folder') return openChapterFolder(Number(button.dataset.chapter));
  if (action === 'cover-back') { state.screen = 'menu'; state.coverChapterId = null; return render(); }
  if (action === 'cover-start') return startChapterFromCover();
  if (action === 'home-resume') {
    const current = currentChapterId();
    if (current > 1) {
      if (typeof campaignProgress !== 'undefined' && campaignProgress.lastChapter === current) return campaignOpen(current, true);
      return openChapterFolder(current);
    }
    if (current === null) { state.menuViewedChapter = 12; state.screen = 'menu'; return render(); }
    resumeInvestigation(); if (state.progress.active?.stage === 'playing') startCurrentCase(); return;
  }
  if (action === 'custody-step') {
    const saved = getMechanicState('documentState', caseData.id, {choices:{},order:[]});
    const order = saved.order || []; const index = order.indexOf(button.dataset.step);
    saved.order = index < 0 ? order.concat(button.dataset.step) : order.slice(0,index);
    persistProgress(); return render();
  }
  if (action === "settings") { state.settingsOpen = true; return render(); }
  if (action === "close-settings") { state.settingsOpen = false; return render(); }
  if (action === "audio-toggle") { saveAudioPreference(button.checked); return; }
  if (action === "reset-progress") { if (!window.confirm("Удалить весь прогресс всех 12 глав? Это действие нельзя отменить.")) return; if (typeof campaignProgress !== "undefined") { campaignProgress={version:1,chapters:{},lastChapter:1}; campaignSave(); } return completeProgressReset(); }
  if (action === "menu-resume") { return resumeInvestigation(); }
  if (action === "open-chapter") return openChapterFolder(1);
  if (action === "back-menu") { state.screen = "menu"; state.caseIntroOpen = false; return render(); }
  if (action === "back-cases") { state.screen = "archive"; state.archiveTab = "cases"; state.caseIntroOpen = false; return render(); }
  if (action === "archive-tab") { state.archiveTab = button.dataset.tab; return render(); }
  if (action === "open-archive-materials") { state.screen = "archive"; state.archiveTab = "materials"; return render(); }
  if (action === "open-evidence") { state.evidenceOpen = button.dataset.evidenceId; return render(); }
  if (action === "close-evidence") { state.evidenceOpen = null; return render(); }
  if (action === "open-case") { return openCase(button.dataset.caseId); }
  if (action === "close-case-intro") { if (button.closest("[data-stop-click]") === null) { state.caseIntroOpen = false; render(); } return; }
  if (action === "start-case") { if (state.archiveReadOnly) return; return startCurrentCase(); }
  if (action === "select-person") { return selectPerson(button.dataset.person); }
  if (action === "cell") { return interactWithCell(button.dataset.cell); }
  if (action === "select-clue") { state.selectedClue = button.dataset.clueId; state.progress.testimonyStatuses[caseData.id] = Object.assign({}, state.progress.testimonyStatuses[caseData.id], { [button.dataset.clueId]: true }); persistProgress(); return render(); }
  if (action === "undo") { return undoGrid(); }
  if (action === "notes") { state.noteMode = !state.noteMode; return render(); }
  if (action === "hint") { return useHint(); }
  if (action === "verify") { return verifyCurrentCase(); }
  if (action === "continue-after-result") { return completeCurrentCase(); }
  if (action === "select-timeline-event") { return selectTimelineEvent(button.dataset.eventId); }
  if (action === "place-timeline-slot") { return placeTimelineEvent(Number(button.dataset.slot)); }
  if (action === "select-chain-item") { return selectChainItem(button.dataset.itemId); }
  if (action === "place-chain-slot") { return placeChainItem(Number(button.dataset.slot)); }
  if (action === "mark-testimony") { return markTestimony(button.dataset.testimonyId, button.dataset.status); }
  if (action === "route-add-node") { return routeAddNode(button.dataset.locationId); }
  if (action === "toggle-route-option") { return toggleRouteOption(button.dataset.optionId); }
  if (action === "select-doc-candidate") { return selectDocumentCandidate(button.dataset.candidateId); }
  if (action === "toggle-doc-field") { return toggleDocumentField(button.dataset.candidateId, button.dataset.fieldIndex); }
  if (action === "select-doc-field") { return selectDocumentField(button.dataset.fieldId, button.dataset.value); }
  if (action === "select-finance-item") { return selectFinanceItem(button.dataset.itemId); }
  if (action === "place-finance-slot") { return placeFinanceItem(Number(button.dataset.slot)); }
  if (action === "reconstruction-select") { return selectReconstructionPart(button.dataset.part, button.dataset.value); }
  if (action === "toggle-reconstruction-evidence") { return toggleReconstructionEvidence(button.dataset.evidenceId); }
  if (action === "select-reconstruction-step") { return selectReconstructionStep(button.dataset.stepId); }
  if (action === "place-reconstruction-step") { return placeReconstructionStep(Number(button.dataset.slot)); }
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");
  if (!target || !root.contains(target)) return;
  if (target.closest("[data-stop-click]") && ["close-case-intro", "close-evidence", "close-settings"].includes(target.dataset.action)) return handleAction(target);
  handleAction(target);
}

async function boot() {
  if (!root) return;
  render();
  await globalThis.GamePlatform?.init();
  state.progress = loadLocalProgress();
  state.currentCaseId = state.progress.currentCase;
  if (typeof campaignProgress !== "undefined") campaignProgress = readCampaign();
  Object.keys(locations).forEach((id) => {
    locations[id].discovered = !locations[id].hidden || Boolean(state.progress.mapDiscoveries[id]);
  });
  window.addEventListener("pagehide", () => { if (["game", "result"].includes(state.screen)) saveActiveState(); });
  window.addEventListener("resize", refreshChapterMenuLayout);
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(refreshChapterMenuLayout).observe(root);
  root.addEventListener("click", handleClick);
  window.setTimeout(() => {
    state.splash = false;
    render();
    const images = [...root.querySelectorAll("img")];
    Promise.all(images.map(img => img.decode().catch(() => {}))).then(() => globalThis.GamePlatform?.ready());
  }, 260);
  timerHandle = window.setInterval(() => {
    if (state.screen === "game" && !document.hidden && !state.settingsOpen && !globalThis.GamePlatform?.paused()) {
      state.elapsed += 1;
      if (state.elapsed % 5 === 0) saveActiveState();
      const timer = root.querySelector(".timer > span");
      if (timer) timer.textContent = formatTime(state.elapsed);
    }
  }, 1000);
  document.addEventListener("visibilitychange", () => {
    if (state.screen === "game") saveActiveState();
  });
  render();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
}

if (typeof globalThis !== "undefined") {
  globalThis.__detectiveSudokuTestApi = {
    SAVE_VERSION, allowedMasks: {}, boardTemplates, chapter, chapterFacts, cases, characters, evidenceRegistry, locations, locationConnections,
    countSolutions, evaluateRule, normalizeProgress, validateAllCases, travelTimeBetween,
  };
}
