const ASSET_ROOT = "./assets/chapter1_blackwood";

const characters = {
  anna: { id: "anna", name: "Анна Блэквуд", shortName: "Анна", role: "племянница", avatar: `${ASSET_ROOT}/characters/anna_blackwood.png`, accent: "#a94848" },
  boris: { id: "boris", name: "Борис Хейл", shortName: "Борис", role: "семейный адвокат", avatar: `${ASSET_ROOT}/characters/boris_hale.png`, accent: "#45566d" },
  elena: { id: "elena", name: "Елена Моррис", shortName: "Елена", role: "секретарь", avatar: `${ASSET_ROOT}/characters/elena_morris.png`, accent: "#8a6f9b" },
  dmitry: { id: "dmitry", name: "Дмитрий Блейк", shortName: "Дмитрий", role: "управляющий", avatar: `${ASSET_ROOT}/characters/dmitry_blake.png`, accent: "#55715a" },
  maria: { id: "maria", name: "Мария Рид", shortName: "Мария", role: "домоправительница", avatar: `${ASSET_ROOT}/characters/maria_reed.png`, accent: "#8b6b73" },
  leon: { id: "leon", name: "Леон Фостер", shortName: "Леон", role: "гость семьи", avatar: null, accent: "#6e6f92" },
};

const chapter = {
  id: "blackwood",
  title: "Особняк Блэквуд",
  subtitle: "Глава 1",
  cover: `${ASSET_ROOT}/chapter/blackwood_mansion_cover.webp`,
  map: `${ASSET_ROOT}/chapter/blackwood_mansion_map.webp`,
  description: "Эдмунд Блэквуд собирает родственников и доверенных людей в своём загородном особняке. Через два дня он собирается объявить об изменении завещания. Но уже в первый вечер начинают происходить странные события.",
};

const chapterFacts = [
  { id: "blackwood_fact_01", unlockAfterCase: 1, sourceCase: 1, optionalCategory: "Событие", text: "Фамильное кольцо исчезло из шкатулки после вечернего чаепития и позже было найдено под диваном. Перед ужином кто-то осматривал старый шкаф в библиотеке." },
  { id: "blackwood_fact_02", unlockAfterCase: 2, sourceCase: 2, optionalCategory: "Находка", text: "На подоконнике открытого окна найден обрывок с цифрами 17-4-92. Дмитрий утверждает, что окно уже было открыто." },
  { id: "blackwood_fact_03", unlockAfterCase: 3, sourceCase: 3, optionalCategory: "Доступ", text: "Старый ключ от семейного архива исчез из шкафа управляющего и был найден в двери архива." },
  { id: "blackwood_fact_04", unlockAfterCase: 4, sourceCase: 4, optionalCategory: "Документ", text: "Из архива пропала папка за 17 апреля 1992 года. Её дата совпадает с записью 17-4-92 с подоконника." },
  { id: "blackwood_fact_05", unlockAfterCase: 5, sourceCase: 5, optionalCategory: "Документ", text: "В камине найдено частично сгоревшее письмо о переводах: «…если Эдмунд узнает о переводах, всё закончено»." },
  { id: "blackwood_fact_06", unlockAfterCase: 6, sourceCase: 6, optionalCategory: "Тайник", text: "Старинные часы были разбиты и остановились на 22:15. Тайник за ними оказался пуст." },
  { id: "blackwood_fact_07", unlockAfterCase: 7, sourceCase: 7, optionalCategory: "Финансы", text: "В скрытой нише за бюстом хранилась копия финансового журнала. Эдмунд подтвердил, что копия исчезла." },
  { id: "blackwood_fact_08", unlockAfterCase: 8, sourceCase: 8, optionalCategory: "Финансы", text: "Пропавший финансовый журнал содержал сведения о крупных переводах. Утром он ещё был в архиве, а к вечеру исчез; Борис несколько раз расспрашивал Марию об архиве." },
  { id: "blackwood_fact_09", unlockAfterCase: 9, sourceCase: 9, optionalCategory: "Свидетельство", text: "Эдмунд сказал: «Завтра утром я всё передам полиции». Во время этого разговора в кабинете с ним находился Борис." },
  { id: "blackwood_fact_10", unlockAfterCase: 10, sourceCase: 10, optionalCategory: "Документ", text: "Елена положила в сейф новый пакет документов по записке Эдмунда. Оригинал завещания был подменён раньше." },
  { id: "blackwood_fact_11", unlockAfterCase: 11, sourceCase: 11, optionalCategory: "Хронология", text: "За ужином Эдмунд объявил, что утром раскроет правду о пропавших деньгах и передаст документы полиции. После ужина в кабинете с ним снова был Борис." },
  { id: "blackwood_fact_12", unlockAfterCase: 12, sourceCase: 12, optionalCategory: "Финал", text: "Борис Хейл переводил деньги через подконтрольные счета. Финансовый журнал содержал доказательства; исчезновение папки, сожжённое письмо и подмена документов были попытками уничтожить следы." },
];

const objectPath = (name) => `${ASSET_ROOT}/objects/${name}.svg`;
const uiPath = (name) => `${ASSET_ROOT}/ui/${name}.svg`;
const uiAssets = {
  back: uiPath("icon_back"), settings: uiPath("icon_settings"),
  hint: uiPath("icon_hint"), notes: uiPath("icon_notes"), check: uiPath("icon_check"),
  lock: uiPath("icon_lock"), star: uiPath("icon_star"), timer: uiPath("icon_timer"), victim: uiPath("marker_victim"),
};

const room4 = [
  "library","library","hall","hall",
  "library","living","hall","hall",
  "living","living","study","study",
  "living","living","study","study",
];

const room5 = [
  "library","library","gallery","gallery","gallery",
  "library","library","gallery","gallery","gallery",
  "music","music","archive","archive","winter",
  "music","music","archive","archive","winter",
  "corridor","corridor","archive","archive","winter",
];

const room6 = [
  "library","library","gallery","gallery","gallery","study",
  "library","library","gallery","gallery","gallery","study",
  "dining","dining","hall","hall","winter","study",
  "dining","dining","hall","hall","winter","winter",
  "archive","archive","hall","hall","winter","winter",
  "archive","archive","service","service","winter","winter",
];

const rooms = {
  library: { label: "Библиотека", color: "#dceaf4" }, hall: { label: "Холл", color: "#efe8d7" },
  living: { label: "Гостиная", color: "#dfecda" }, study: { label: "Кабинет", color: "#e8dfed" },
  gallery: { label: "Галерея", color: "#e0ebf3" }, music: { label: "Муз. салон", color: "#efe2d1" },
  archive: { label: "Архив", color: "#dfeadc" }, winter: { label: "Зимний сад", color: "#dceee4" },
  corridor: { label: "Коридор", color: "#eeeae0" }, dining: { label: "Столовая", color: "#f0e2d3" },
  service: { label: "Служебная", color: "#e4deea" },
};

const o = (cell, id, label, file = id, canOccupy = false) => ({ cell, id, label, path: file ? objectPath(file) : null, canOccupy });

const boardTemplates = {
  4: {
    rooms: room4,
    objects: [o("A1","window","Окно"),o("A4","painting","Портрет"),o("B2","armchair","Кресло","armchair",true),o("B4","plant","Растение"),o("C1","fireplace","Камин"),o("C3","desk","Письменный стол"),o("D2","bookshelf","Книжный шкаф")],
  },
  5: {
    rooms: room5,
    objects: [o("A1","window","Окно"),o("A4","bust","Бюст",null),o("B3","piano","Пианино",null),o("B5","fireplace","Камин"),o("C1","armchair","Кресло","armchair",true),o("C4","bookshelf","Книжный шкаф"),o("D3","desk","Письменный стол"),o("D5","plant","Растение"),o("E2","floor_clock","Часы"),o("E4","safe","Сейф")],
  },
  6: {
    rooms: room6,
    objects: [o("A1","window","Окно"),o("A4","painting","Портрет"),o("B2","lamp","Лампа","candle_lamp"),o("B5","fireplace","Камин"),o("C1","table","Стол"),o("D2","armchair","Кресло","armchair",true),o("D3","statue","Статуя",null),o("D5","sofa","Диван","sofa",true),o("E1","bookshelf","Книжный шкаф"),o("E4","safe","Сейф"),o("E6","plant","Растение"),o("F2","bookshelf","Шкаф"),o("F4","floor_clock","Часы")],
  },
};

const rule = (type, ...args) => ({ type, args });
const clue = (text, logic) => ({ text, rule: logic });
const caseImage = (id, slug) => `${ASSET_ROOT}/cases/case_${String(id).padStart(2,"0")}_${slug}.webp`;

const cases = [
  {
    id: 1, title: "Пропавшее кольцо", slug: "missing_ring", difficulty: "Легко", size: 4, location: "Гостиная", targetCell: "D2", targetLabel: "Шкатулка",
    intro: "После вечернего чая Анна замечает, что из семейной шкатулки исчезло старое кольцо. Последний раз шкатулку видели в гостиной. Восстановите, где находился каждый человек.",
    question: "Кто был единственным подозреваемым в гостиной со шкатулкой?", participants: ["anna","boris","elena","dmitry"],
    clues: [clue("Дмитрий находился рядом с растением.",rule("adj_obj","dmitry","plant")),clue("Елена находилась рядом с окном.",rule("adj_obj","elena","window")),clue("Борис находился рядом с письменным столом.",rule("adj_obj","boris","desk"))],
    solution: { anna:"D1",boris:"C4",elena:"A2",dmitry:"B3" }, answer: "anna",
    result: "В гостиной находилась только Анна. Она не брала кольцо: позже его нашли под диваном. Но Анна заметила, что перед ужином кто-то осматривал старый шкаф в библиотеке.", image: caseImage(1,"missing_ring"), locationImage: `${ASSET_ROOT}/locations/library_room.webp`,
  },
  {
    id: 2, title: "Открытое окно", slug: "open_window", difficulty: "Легко", size: 4, location: "Библиотека", targetCell: "A1", targetLabel: "Открытое окно",
    intro: "Ночью в библиотеке обнаруживают открытое окно. На подоконнике лежит обрывок бумаги с цифрами 17-4-92. Определите, кто первым оказался в библиотеке после происшествия.",
    question: "Кто был единственным человеком в библиотеке?", participants: ["anna","boris","elena","dmitry"],
    clues: [clue("Борис находился рядом с креслом.",rule("adj_obj","boris","armchair")),clue("Анна находилась рядом с портретом.",rule("adj_obj","anna","painting")),clue("Дмитрий находился рядом с окном.",rule("adj_obj","dmitry","window"))],
    solution: { anna:"A3",boris:"C2",elena:"D4",dmitry:"B1" }, answer: "dmitry",
    result: "Это был Дмитрий. Он утверждает, что окно уже было открыто. Обрывок с цифрами он передаёт Эдмунду, но значение записи пока неизвестно.", image: caseImage(2,"open_window"), locationImage: `${ASSET_ROOT}/locations/library_room.webp`,
  },
  {
    id: 3, title: "Пропавший ключ", slug: "missing_key", difficulty: "Легко", size: 4, location: "Кабинет", targetCell: "D4", targetLabel: "Ключ",
    intro: "Из шкафа управляющего исчез старый ключ от семейного архива. Кто-то использовал его и оставил в двери архива. Восстановите расположение гостей.",
    question: "Кто был единственным человеком в кабинете со шкафом ключей?", participants: ["anna","boris","elena","dmitry"],
    clues: [clue("Анна находилась рядом с креслом.",rule("adj_obj","anna","armchair")),clue("Дмитрий находился рядом с окном.",rule("adj_obj","dmitry","window")),clue("Борис находился левее, чем Елена.",rule("left","boris","elena"))],
    solution: { anna:"C2",boris:"A3",elena:"D4",dmitry:"B1" }, answer: "elena",
    result: "В кабинете находилась Елена. Она отрицает, что брала ключ, и говорит, что пришла за письмом Эдмунда. Сам ключ уже был в двери архива.", image: caseImage(3,"missing_key"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 4, title: "Ночной посетитель", slug: "night_visitor", difficulty: "Средне", size: 5, location: "Архив", targetCell: "E4", targetLabel: "Папка 17-4-92",
    intro: "Ночью срабатывает сигнализация в архивном крыле. Внутри находят пустое место на полке: пропала папка за 17 апреля 1992 года. Определите, кто был в архиве.",
    question: "Кто был единственным человеком в архиве?", participants: ["anna","boris","elena","dmitry","maria"],
    clues: [clue("Мария сидела в кресле.",rule("on_obj","maria","armchair")),clue("Анна и Дмитрий находились в одной комнате.",rule("same_room","anna","dmitry")),clue("Елена находилась рядом с сейфом.",rule("adj_obj","elena","safe")),clue("Дмитрий находился рядом с пианино.",rule("adj_obj","dmitry","piano"))],
    solution: { anna:"A5",boris:"D2",elena:"E3",dmitry:"B4",maria:"C1" }, answer: "elena",
    result: "В архиве находилась Елена. Она утверждает, что искала расписание встреч Эдмунда. Дата пропавшей папки совпадает с записью 17-4-92 с подоконника.", image: caseImage(4,"night_visitor"), locationImage: `${ASSET_ROOT}/locations/archive_room.webp`,
  },
  {
    id: 5, title: "Письмо без адресата", slug: "burnt_letter", difficulty: "Средне", size: 5, location: "Галерея", targetCell: "B5", targetLabel: "Сожжённое письмо",
    intro: "В камине галереи находят частично сгоревшее письмо. Сохранилась фраза: «…если Эдмунд узнает о переводах, всё закончено». Подписи нет.",
    question: "Кто был единственным человеком в галерее, когда письмо оказалось в камине?", participants: ["anna","boris","elena","dmitry","maria"],
    clues: [clue("Мария находилась рядом с креслом.",rule("adj_obj","maria","armchair")),clue("Елена находилась рядом с книжным шкафом.",rule("adj_obj","elena","bookshelf")),clue("Дмитрий находился левее, чем Мария.",rule("left","dmitry","maria")),clue("Анна находилась рядом с растением.",rule("adj_obj","anna","plant"))],
    solution: { anna:"E5",boris:"A3",elena:"D4",dmitry:"B1",maria:"C2" }, answer: "boris",
    result: "В галерее был Борис. Он говорит, что письмо уже горело, когда он вошёл. Впервые семейный адвокат оказывается напрямую связан с исчезнувшими документами.", image: caseImage(5,"burnt_letter"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 6, title: "Сломанные часы", slug: "broken_clock", difficulty: "Средне", size: 5, location: "Коридор", targetCell: "E2", targetLabel: "22:15",
    intro: "Старинные часы в коридоре разбиты, стрелки остановились на 22:15. За корпусом часов обнаружена пустая ниша. Выясните, кто оказался рядом.",
    question: "Кто был единственным человеком в коридоре у часов?", participants: ["anna","boris","elena","dmitry","maria"],
    clues: [clue("Дмитрий находился рядом с часами.",rule("adj_obj","dmitry","floor_clock")),clue("Анна и Борис находились в одной комнате.",rule("same_room","anna","boris")),clue("Елена находилась рядом с растением.",rule("adj_obj","elena","plant")),clue("Анна находилась левее, чем Борис.",rule("left","anna","boris"))],
    solution: { anna:"A3",boris:"B4",elena:"C5",dmitry:"E1",maria:"D2" }, answer: "dmitry",
    result: "Возле часов оказался Дмитрий. Он услышал удар и пришёл проверить источник шума. По его словам, тайник за часами был пуст ещё до его появления.", image: caseImage(6,"broken_clock"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 7, title: "Тайник Блэквуда", slug: "secret_compartment", difficulty: "Средне+", size: 5, location: "Галерея", targetCell: "A4", targetLabel: "Тайник",
    intro: "Эдмунд признаётся, что в скрытой нише за бюстом хранилась копия финансового журнала. Теперь она исчезла.",
    question: "Кто был единственным человеком в галерее рядом с тайником?", participants: ["anna","boris","elena","dmitry","maria"],
    clues: [clue("Мария находилась рядом с креслом.",rule("adj_obj","maria","armchair")),clue("Елена и Дмитрий находились в одной комнате.",rule("same_room","elena","dmitry")),clue("Анна находилась рядом с бюстом.",rule("adj_obj","anna","bust")),clue("Елена находилась выше, чем Дмитрий.",rule("above","elena","dmitry"))],
    solution: { anna:"A5",boris:"B1",elena:"D4",dmitry:"E3",maria:"C2" }, answer: "anna",
    result: "Это была Анна. Но Эдмунд подтверждает: он сам попросил её проверить нишу. Копии финансового журнала действительно нет.", image: caseImage(7,"secret_compartment"), locationImage: `${ASSET_ROOT}/locations/archive_room.webp`,
  },
  {
    id: 8, title: "Исчезнувший журнал", slug: "missing_ledger", difficulty: "Сложно", size: 5, location: "Архив", targetCell: "E4", targetLabel: "Финансовый журнал",
    intro: "Выясняется, что пропавший журнал содержал сведения о крупных переводах. Нужно установить, кто находился в архиве в момент, когда журнал исчез.",
    question: "Кто был единственным человеком в архиве?", participants: ["anna","boris","elena","dmitry","maria"],
    clues: [clue("Дмитрий находился рядом с креслом.",rule("adj_obj","dmitry","armchair")),clue("Мария находилась рядом с книжным шкафом.",rule("adj_obj","maria","bookshelf")),clue("Борис находился левее, чем Дмитрий.",rule("left","boris","dmitry")),clue("Анна находилась рядом с пианино.",rule("adj_obj","anna","piano"))],
    solution: { anna:"A3",boris:"B1",elena:"E5",dmitry:"C2",maria:"D4" }, answer: "maria",
    result: "В архиве была Мария. Она уверена, что утром журнал ещё лежал на месте, а вечером его уже не было. Мария также вспоминает: Борис несколько раз расспрашивал её об архиве.", image: caseImage(8,"missing_ledger"), locationImage: `${ASSET_ROOT}/locations/archive_room.webp`,
  },
  {
    id: 9, title: "Разговор в кабинете", slug: "study_conversation", difficulty: "Сложно", size: 6, location: "Кабинет", targetCell: "C6", targetLabel: "Эдмунд",
    intro: "Анна слышит громкий разговор Эдмунда с неизвестным человеком. Последняя фраза хозяина: «Завтра утром я всё передам полиции». Восстановите расположение всех присутствующих.",
    question: "Кто был единственным человеком в кабинете вместе с Эдмундом?", participants: ["anna","boris","elena","dmitry","maria","leon"],
    clues: [clue("Мария находилась рядом с часами.",rule("adj_obj","maria","floor_clock")),clue("Елена и Дмитрий находились в одной комнате.",rule("same_room","elena","dmitry")),clue("Анна находилась рядом с портретом.",rule("adj_obj","anna","painting")),clue("Леон находился левее, чем Борис.",rule("left","leon","boris")),clue("Дмитрий находился выше, чем Елена.",rule("above","dmitry","elena"))],
    solution: { anna:"B4",boris:"A6",elena:"D1",dmitry:"C2",maria:"F3",leon:"E5" }, answer: "boris",
    result: "В кабинете находился Борис. Он утверждает, что обсуждал с Эдмундом проблемы семейного бизнеса. Эдмунд отказывается сообщать детали разговора.", image: caseImage(9,"study_conversation"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 10, title: "Подменённое завещание", slug: "forged_will", difficulty: "Сложно", size: 6, location: "Холл", targetCell: "E4", targetLabel: "Завещание",
    intro: "Утром Эдмунд обнаруживает, что документ в сейфе — не оригинал завещания. Кто-то подменил бумаги ночью.",
    question: "Кто был единственным человеком в холле возле сейфа?", participants: ["anna","boris","elena","dmitry","maria","leon"],
    clues: [clue("Дмитрий находился рядом с часами.",rule("adj_obj","dmitry","floor_clock")),clue("Елена находилась рядом с сейфом.",rule("adj_obj","elena","safe")),clue("Мария находилась рядом со шкафом.",rule("adj_obj","maria","bookshelf")),clue("Анна находилась левее, чем Мария.",rule("left","anna","maria")),clue("Леон находился в зоне «Зимний сад».",rule("room","leon","winter"))],
    solution: { anna:"B1",boris:"A6",elena:"D4",dmitry:"F3",maria:"E2",leon:"C5" }, answer: "elena",
    result: "У сейфа находилась Елена. Она объясняет, что по поручению Эдмунда положила туда новый пакет документов. Факт подтверждается запиской хозяина. Подмена произошла раньше.", image: caseImage(10,"forged_will"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 11, title: "Последний ужин", slug: "last_dinner", difficulty: "Очень сложно", size: 6, location: "Кабинет", targetCell: "C6", targetLabel: "Эдмунд",
    intro: "За ужином Эдмунд объявляет: утром он раскроет правду о пропавших деньгах и передаст документы полиции. После ужина все расходятся по особняку.",
    question: "Кто оказался единственным человеком в кабинете вместе с Эдмундом после ужина?", participants: ["anna","boris","elena","dmitry","maria","leon"],
    clues: [clue("Елена сидела в кресле.",rule("on_obj","elena","armchair")),clue("Анна находилась рядом с лампой.",rule("adj_obj","anna","lamp")),clue("Мария находилась выше, чем Леон.",rule("above","maria","leon")),clue("Леон находился левее, чем Борис.",rule("left","leon","boris")),clue("Мария находилась рядом с сейфом.",rule("adj_obj","maria","safe"))],
    solution: { anna:"B1",boris:"A6",elena:"D2",dmitry:"C4",maria:"E3",leon:"F5" }, answer: "boris",
    result: "В кабинете снова оказывается Борис. Через некоторое время он покидает крыло. Остальные свидетели подтверждают свои маршруты.", image: caseImage(11,"last_dinner"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
  {
    id: 12, title: "Убийство в кабинете", slug: "murder_in_study", difficulty: "Финал", size: 6, location: "Кабинет", targetCell: "C6", targetLabel: "Жертва",
    intro: "В 23:10 Эдмунда Блэквуда находят мёртвым в кабинете. Дверь закрыта, но не заперта. Следователь уверен: убийца был с ним один на один в этой комнате.",
    question: "Кто убийца?", participants: ["anna","boris","elena","dmitry","maria","leon"],
    clues: [clue("Елена сидела на диване.",rule("on_obj","elena","sofa")),clue("Леон находился рядом со столом.",rule("adj_obj","leon","table")),clue("Анна находилась рядом с книжным шкафом.",rule("adj_obj","anna","bookshelf")),clue("Леон находился выше, чем Мария.",rule("above","leon","maria")),clue("Дмитрий находился левее, чем Борис.",rule("left","dmitry","boris"))],
    solution: { anna:"F1",boris:"A6",elena:"D5",dmitry:"B4",maria:"E3",leon:"C2" }, answer: "boris",
    result: "Убийца — Борис Хейл. Несколько лет он переводил деньги через подконтрольные счета. Финансовый журнал содержал доказательства. Кража ключа, исчезновение папки, сожжённое письмо и подмена документов были попытками уничтожить следы.", image: caseImage(12,"murder_in_study"), locationImage: `${ASSET_ROOT}/locations/study_room.webp`,
  },
];

const caseConclusions = [
  { finalQuestion: "Кто находился в гостиной рядом со шкатулкой?", correctConclusionCharacter: "anna", resultTitle: "У шкатулки находилась Анна Блэквуд", resultExplanation: "Восстановленная расстановка помещает Анну в гостиную рядом со шкатулкой. Это не доказывает, что она брала кольцо: позже его нашли под диваном. Анна лишь становится важным свидетелем первого эпизода." },
  { finalQuestion: "Кто находился у открытого окна?", correctConclusionCharacter: "dmitry", resultTitle: "У открытого окна находился Дмитрий Блейк", resultExplanation: "Восстановленная расстановка показывает, что Дмитрий находился рядом с окном. Это не доказывает, что именно он его открыл: Дмитрий утверждает, что окно уже было открыто, когда он подошёл." },
  { finalQuestion: "Кто находился в кабинете у места хранения ключа?", correctConclusionCharacter: "elena", resultTitle: "В кабинете находилась Елена Моррис", resultExplanation: "По восстановленной расстановке у места хранения ключа находилась Елена. Само присутствие в кабинете не доказывает, что она взяла ключ: Елена говорит, что пришла за письмом Эдмунда." },
  { finalQuestion: "Кто находился в архиве рядом с папкой 17-4-92?", correctConclusionCharacter: "elena", resultTitle: "В архиве находилась Елена Моррис", resultExplanation: "Расстановка подтверждает присутствие Елены в архиве рядом с местом пропавшей папки. Она утверждает, что искала расписание встреч; её присутствие само по себе не доказывает похищение документа." },
  { finalQuestion: "Кто находился в галерее во время эпизода с письмом?", correctConclusionCharacter: "boris", resultTitle: "В галерее находился Борис Хейл", resultExplanation: "Восстановленный маршрут помещает Бориса в галерею. Он говорит, что письмо уже горело, когда он вошёл. Это связывает его с эпизодом, но ещё не устанавливает, кто поджёг письмо." },
  { finalQuestion: "Кто находился у сломанных часов?", correctConclusionCharacter: "dmitry", resultTitle: "У часов находился Дмитрий Блейк", resultExplanation: "Расстановка показывает Дмитрия рядом со сломанными часами. По его словам, он пришёл на звук удара и обнаружил нишу уже пустой; присутствие рядом не доказывает, что часы разбил он." },
  { finalQuestion: "Кто находился рядом с тайником за бюстом?", correctConclusionCharacter: "anna", resultTitle: "У тайника находилась Анна Блэквуд", resultExplanation: "Анна действительно находилась рядом со скрытой нишей. Однако Эдмунд подтверждает, что сам попросил её проверить тайник. Исчезновение копии журнала произошло независимо от этого поручения." },
  { finalQuestion: "Кто находился в архиве у места хранения журнала?", correctConclusionCharacter: "maria", resultTitle: "В архиве находилась Мария Рид", resultExplanation: "Расстановка помещает Марию в архив рядом с местом хранения журнала. Она сообщает, что утром документ ещё был на месте, а вечером исчез. Это делает Марию свидетелем хронологии, но не доказывает кражу." },
  { finalQuestion: "Кто находился с Эдмундом в кабинете во время разговора?", correctConclusionCharacter: "boris", resultTitle: "С Эдмундом разговаривал Борис Хейл", resultExplanation: "В кабинете вместе с Эдмундом находился Борис. Именно тогда прозвучали слова о передаче материалов полиции. Расстановка устанавливает участника разговора, но пока не раскрывает его содержание полностью." },
  { finalQuestion: "Кто находился возле сейфа с документами?", correctConclusionCharacter: "elena", resultTitle: "Возле сейфа находилась Елена Моррис", resultExplanation: "Елена находилась у сейфа и подтверждает, что положила туда пакет по поручению Эдмунда. Записка хозяина подтверждает поручение. Следовательно, её присутствие не доказывает подмену завещания." },
  { finalQuestion: "Кто оставался с Эдмундом в кабинете после ужина?", correctConclusionCharacter: "boris", resultTitle: "После ужина с Эдмундом оставался Борис Хейл", resultExplanation: "Восстановленная расстановка показывает, что после ужина в кабинете с Эдмундом находился Борис. Позже он покинул это крыло, а маршруты остальных участников подтверждаются свидетельствами." },
  { finalQuestion: "Кого подтверждённая цепочка доказательств указывает как виновного?", correctConclusionCharacter: "boris", resultTitle: "Виновен Борис Хейл", resultExplanation: "Борис переводил деньги через подконтрольные счета, а финансовый журнал содержал доказательства. Исчезновение ключа и архивной папки, сожжённое письмо, пропажа журнала и подмена документов последовательно скрывали эти операции. Эдмунд собирался передать материалы полиции, а восстановленная хронология оставляет Бориса с ним в решающий период.", isFinalAccusation: true },
];

cases.forEach((caseData, index) => Object.assign(caseData, caseConclusions[index], {
  unlockedFact: chapterFacts.find((fact) => fact.sourceCase === caseData.id)?.text ?? "",
}));

function cellToPoint(cell) {
  return { row: cell.charCodeAt(0) - 65, col: Number(cell.slice(1)) - 1 };
}

function pointToCell(row, col) {
  return `${String.fromCharCode(65 + row)}${col + 1}`;
}

function permutations(values) {
  if (values.length < 2) return [values];
  const result = [];
  values.forEach((value, index) => {
    for (const rest of permutations(values.filter((_, i) => i !== index))) result.push([value, ...rest]);
  });
  return result;
}

function evaluateRule(caseData, positions, item) {
  const template = boardTemplates[caseData.size];
  const [a, b] = item.args;
  const pa = positions[a];
  const pointA = pa ? cellToPoint(pa) : null;
  const roomAt = (cell) => template.rooms[cellToPoint(cell).row * caseData.size + cellToPoint(cell).col];
  const objects = template.objects.filter((entry) => entry.id === b);
  const adjacent = pointA && objects.some((entry) => {
    const po = cellToPoint(entry.cell);
    return Math.abs(pointA.row - po.row) + Math.abs(pointA.col - po.col) === 1 && roomAt(pa) === roomAt(entry.cell);
  });
  switch (item.type) {
    case "room": return roomAt(pa) === b;
    case "not_room": return roomAt(pa) !== b;
    case "adj_obj": return Boolean(adjacent);
    case "not_adj_obj": return !adjacent;
    case "on_obj": return objects.some((entry) => entry.cell === pa && entry.canOccupy);
    case "same_room": return roomAt(pa) === roomAt(positions[b]);
    case "left": return pointA.col < cellToPoint(positions[b]).col;
    case "above": return pointA.row < cellToPoint(positions[b]).row;
    default: return false;
  }
}

function countSolutions(caseData, stopAfter = Infinity) {
  const n = caseData.size;
  const indexes = Array.from({ length: n }, (_, index) => index);
  const rowPermutations = permutations(indexes);
  const columnPermutations = rowPermutations;
  const blocked = new Set(boardTemplates[n].objects.filter((entry) => !entry.canOccupy).map((entry) => entry.cell));
  let count = 0;
  for (const rowsForPeople of rowPermutations) {
    for (const colsForPeople of columnPermutations) {
      const positions = {};
      let valid = true;
      caseData.participants.forEach((person, index) => {
        const cell = pointToCell(rowsForPeople[index], colsForPeople[index]);
        positions[person] = cell;
        if (blocked.has(cell)) valid = false;
      });
      if (!valid) continue;
      if (!caseData.clues.every((entry) => evaluateRule(caseData, positions, entry.rule))) continue;
      count += 1;
      if (count >= stopAfter) return count;
    }
  }
  return count;
}

function validateAllCases() {
  return cases.map((caseData) => ({ id: caseData.id, solutionsCount: countSolutions(caseData, 2) }));
}

const STORAGE_KEY = "detective-sudoku-progress-v1";
const AUDIO_STORAGE_KEY = "detective-sudoku-audio-v1";
const initialProgress = {
  unlocked: 1,
  completed: [],
  stars: {},
  active: null,
  tutorialComplete: false,
  lastArchiveRange: 0,
  lastOpenedChapter: 1,
  lastActiveFolder: 1,
  chapterDiscovered: [],
  chapterProgress: { 1: 0 },
  currentCase: 1,
  unlockedMaterials: ["participants", "map", "facts"],
  seenFacts: [],
  updatedAt: 0,
};

const state = {
  splash: true,
  screen: "menu",
  progress: { ...initialProgress },
  currentCaseId: 1,
  placements: {},
  notes: {},
  reviewed: [],
  selectedPerson: null,
  noteMode: false,
  activeClue: null,
  cluesOpen: false,
  settingsOpen: false,
  accusationOpen: false,
  accused: null,
  conclusionError: false,
  readyToAccuse: false,
  elapsed: 0,
  mistakes: 0,
  hints: 0,
  toast: null,
  toastTone: "neutral",
  toastTitle: "",
  tutorialStep: 0,
  tutorialRevealPending: false,
  history: [],
  resultStars: 0,
  resultFactIsNew: false,
  soundEnabled: true,
  resetArmed: false,
  resetHolding: false,
  archiveRange: 0,
  openChapterId: null,
  caseIntroOpen: false,
  materialOpen: null,
  completedCasesOpen: false,
};

let root;
let yandexSdk = null;
let yandexPlayer = null;
let cloudSaveTimer = null;
let toastTimer = null;
let audioContext = null;
let resetHoldTimer = null;
let resetHoldStartedAt = 0;
let tutorialRevealTimer = null;
let suppressResetClick = false;

const currentCase = () => cases[state.currentCaseId - 1];
const formatCase = (id) => String(id).padStart(2, "0");
const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
const clone = (value) => JSON.parse(JSON.stringify(value));

function icon(src, alt = "", className = "") {
  return `<img class="icon ${className}" src="${src}" alt="${alt}" draggable="false">`;
}

function avatar(personId, size = "md") {
  const person = characters[personId];
  if (!person?.avatar) return `<span class="avatar avatar-${size} avatar-placeholder" aria-label="${person?.name ?? "Персонаж"}">${person?.shortName?.slice(0, 1) ?? "?"}</span>`;
  return `<img class="avatar avatar-${size}" src="${person.avatar}" alt="${person.name}" draggable="false">`;
}

function loadLocalProgress() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) state.progress = { ...initialProgress, ...JSON.parse(saved) };
  } catch {
    state.progress = { ...initialProgress };
  }
  try {
    state.soundEnabled = window.localStorage.getItem(AUDIO_STORAGE_KEY) !== "off";
  } catch {
    state.soundEnabled = true;
  }
}

function saveAudioPreference() {
  try { window.localStorage.setItem(AUDIO_STORAGE_KEY, state.soundEnabled ? "on" : "off"); } catch {}
}

function getAudioContext() {
  if (!state.soundEnabled || typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  return audioContext;
}

function tone(context, frequency, duration, options = {}) {
  const start = context.currentTime + (options.delay ?? 0);
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = options.type ?? "sine";
  oscillator.frequency.setValueAtTime(frequency, start);
  if (options.to) oscillator.frequency.exponentialRampToValueAtTime(options.to, start + duration);
  gain.gain.setValueAtTime(.0001, start);
  gain.gain.exponentialRampToValueAtTime(options.volume ?? .035, start + .008);
  gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + .02);
}

function paperSound(context) {
  const duration = .11;
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * (1 - index / data.length);
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  filter.type = "bandpass";
  filter.frequency.value = 1450;
  filter.Q.value = .65;
  gain.gain.value = .018;
  source.buffer = buffer;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
}

function playSound(name) {
  const context = getAudioContext();
  if (!context) return;
  if (name === "uiClick") tone(context, 480, .045, { to: 390, volume: .022 });
  else if (name === "characterPlace") tone(context, 310, .09, { to: 470, volume: .032 });
  else if (name === "characterRemove") tone(context, 410, .085, { to: 270, volume: .026 });
  else if (name === "clueOpen") paperSound(context);
  else if (name === "incorrectCheck") tone(context, 230, .14, { to: 165, type: "triangle", volume: .028 });
  else if (name === "caseSolved") {
    tone(context, 261.63, .32, { volume: .026 });
    tone(context, 329.63, .32, { delay: .035, volume: .022 });
    tone(context, 392, .36, { delay: .07, volume: .021 });
  } else if (name === "caseUnlocked") {
    tone(context, 440, .13, { to: 523.25, volume: .025 });
    tone(context, 659.25, .18, { delay: .12, volume: .021 });
  }
}

function scheduleCloudSave() {
  if (!yandexPlayer) return;
  window.clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => {
    yandexPlayer.setData({ detectiveSudokuProgress: state.progress }).catch(() => {});
  }, 700);
}

function persist(nextProgress) {
  state.progress = { ...nextProgress, updatedAt: Date.now() };
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch {}
  scheduleCloudSave();
}

async function initYandexSdk() {
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;
  if (window.YaGames) return connectYandexSdk();
  const script = document.createElement("script");
  script.src = "https://sdk.games.s3.yandex.net/sdk.js";
  script.async = true;
  script.onload = connectYandexSdk;
  script.onerror = () => {};
  document.head.append(script);
}

async function connectYandexSdk() {
  try {
    yandexSdk = await window.YaGames.init();
    yandexPlayer = await yandexSdk.getPlayer();
    const cloud = await yandexPlayer.getData(["detectiveSudokuProgress"]);
    const cloudProgress = cloud?.detectiveSudokuProgress;
    if (cloudProgress?.updatedAt > state.progress.updatedAt) {
      state.progress = { ...initialProgress, ...cloudProgress };
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch {}
      if (state.screen === "menu") render();
    }
    yandexSdk.features?.LoadingAPI?.ready();
  } catch {
    yandexSdk = null;
    yandexPlayer = null;
  }
}

function showToast(message, tone = "neutral", title = "") {
  state.toast = message;
  state.toastTone = tone;
  state.toastTitle = title;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state.toast = null;
    state.toastTitle = "";
    state.toastTone = "neutral";
    document.querySelector(".toast")?.remove();
  }, 2600);
}

function toastMarkup() {
  return state.toast ? `<div class="toast toast-${state.toastTone}" role="status">${state.toastTitle ? `<strong>${state.toastTitle}</strong>` : ""}<span>${state.toast}</span></div>` : "";
}

function topBar(title, backAction = "", includeTimer = false) {
  return `<header class="topbar">
    <div class="topbar-side">${backAction ? `<button class="icon-button" data-action="${backAction}" aria-label="Назад">${icon(uiAssets.back)}</button>` : ""}</div>
    <div class="topbar-title">${title}</div>
    <div class="topbar-side topbar-actions">
      ${includeTimer ? `<span class="timer">${icon(uiAssets.timer)}<span class="timer-value">${formatTime(state.elapsed)}</span></span>` : ""}
      <button class="icon-button" data-action="settings" aria-label="Настройки">${icon(uiAssets.settings)}</button>
    </div>
  </header>`;
}

function pageShell(content, title, backAction = "") {
  return `<main class="app-screen">${topBar(title, backAction)}${content}${settingsMarkup()}${toastMarkup()}</main>`;
}

function renderSplash() {
  return `<main class="splash-screen">
    <div class="logo-mark"><span class="logo-grid"></span><span class="logo-lens"></span></div>
    <p class="eyebrow">ЛОГИЧЕСКОЕ РАССЛЕДОВАНИЕ</p>
    <h1>Детективное судоку</h1>
    <div class="loading-line"><span></span></div>
    <small>Подготовка материалов дела</small>
  </main>`;
}

function renderMenu() {
  return `<main class="app-screen menu-screen">${topBar("Главное меню")}
    <div class="menu-layout page-container">
      <section class="menu-hero surface-card">
        <span class="case-stamp">АРХИВ ЧАСТНОГО СЛЕДОВАТЕЛЯ</span>
        <div class="logo-mark compact"><span class="logo-grid"></span><span class="logo-lens"></span></div>
        <p class="eyebrow">ЛОГИЧЕСКАЯ ДЕТЕКТИВНАЯ ИГРА</p>
        <h1>Детективное<br>судоку</h1>
        <p class="lead">Читайте улики, восстанавливайте маршруты и находите единственного человека, который мог оказаться на месте события.</p>
        <button class="primary-button menu-cta" data-action="menu-play">ИГРАТЬ</button>
      </section>
    </div>${settingsMarkup()}${toastMarkup()}
  </main>`;
}

function unlockedChapterFacts(progress = state.progress) {
  const completed = new Set(progress.completed ?? []);
  return chapterFacts.filter((fact) => completed.has(fact.unlockAfterCase));
}

function unseenChapterFacts(progress = state.progress) {
  const seen = new Set(progress.seenFacts ?? []);
  return unlockedChapterFacts(progress).filter((fact) => !seen.has(fact.id));
}

function factsButtonMarkup() {
  const count = unlockedChapterFacts().length;
  const hasNew = unseenChapterFacts().length > 0;
  return `Факты <b>${count}</b>${hasNew ? `<span class="material-new-badge">НОВОЕ</span>` : ""}`;
}

function archiveFolderMarkup(id) {
  const available = id === 1;
  const discovered = state.progress.chapterDiscovered.includes(id);
  const completedCount = id === 1 ? state.progress.completed.length : 0;
  const completed = completedCount === 12;
  const inProgress = discovered && completedCount > 0 && !completed;
  const active = state.progress.lastActiveFolder === id;
  const status = completed ? `<span class="archive-folder-status completed">${icon(uiAssets.check)} РАСКРЫТО · 12 / 12</span>` : inProgress ? `<span class="archive-folder-status">В РАБОТЕ · ${completedCount} / 12</span>` : "";
  return `<${available ? "button" : "article"} class="archive-folder ${available ? "available" : "locked"} ${active ? "focused" : ""}" ${available ? `data-action="open-folder" data-chapter="${id}"` : ""} data-archive-folder="${id}">
    <span class="archive-folder-tab">АРХИВ ${formatCase(id)}</span>
    <span class="archive-folder-number">${formatCase(id)}</span>
    ${available && discovered ? `<strong>${chapter.title}</strong>${status}` : ""}
    ${available ? "" : `<span class="archive-lock">${icon(uiAssets.lock)}</span>`}
  </${available ? "button" : "article"}>`;
}

function archiveFolderOverlayMarkup() {
  if (state.openChapterId !== 1) return "";
  const completedCount = state.progress.completed.length;
  const hasNewFacts = unseenChapterFacts().length > 0;
  const currentCaseId = Math.min(12, Math.max(1, state.progress.currentCase ?? state.progress.unlocked));
  const current = cases[currentCaseId - 1];
  return `<div class="archive-overlay" data-action="close-folder">
    <section class="open-archive-folder" data-stop-click>
      <header class="open-folder-header"><span>АРХИВ 01</span><button class="icon-button" data-action="close-folder" aria-label="Закрыть папку">×</button></header>
      <div class="open-folder-layout">
        <div class="open-folder-story">
          <span class="eyebrow">ОТКРЫТОЕ РАССЛЕДОВАНИЕ</span>
          <h1>${chapter.title}</h1>
          <div class="open-folder-cover"><img src="${chapter.cover}" alt="Особняк Блэквуд"></div>
          <p class="chapter-summary">${chapter.description}</p><button class="chapter-more-link" data-action="open-chapter-description">Подробнее</button>
          <div class="chapter-progress"><span>РАСКРЫТО: <b>${completedCount} / 12</b></span><div class="progress-track"><span style="width:${completedCount / 12 * 100}%"></span></div></div>
          <div class="archive-materials"><span class="archive-section-label">МАТЕРИАЛЫ</span><button class="mobile-material-summary" data-action="open-material-picker">МАТЕРИАЛЫ · 3 ${hasNewFacts ? `<em class="material-new-badge">НОВОЕ</em>` : ""}<span>Открыть →</span></button><div class="material-actions"><button data-action="open-material" data-material="participants">Участники <b>6</b></button><button data-action="open-material" data-material="map">Карта</button><button data-action="open-material" data-material="facts">${factsButtonMarkup()}</button></div></div>
        </div>
        <aside class="current-case-panel">
          <span class="archive-section-label">ТЕКУЩЕЕ ДЕЛО</span>
          ${completedCount < 12 ? `<button class="case-envelope" data-action="open-current-case" data-case="${currentCaseId}"><span>ДЕЛО ${formatCase(currentCaseId)}</span><small>ЧАСТНЫЙ АРХИВ</small><i>НЕ ВСКРЫТО</i></button>` : `<div class="case-envelope completed-envelope"><span>АРХИВ ЗАВЕРШЁН</span>${icon(uiAssets.check)}</div>`}
          <button class="revealed-cases-link" data-action="open-completed-cases">РАСКРЫТЫЕ ДЕЛА · ${completedCount}<span>Посмотреть →</span></button>
        </aside>
      </div>
    </section>
    ${caseIntroOverlayMarkup(current)}${materialOverlayMarkup()}${completedCasesOverlayMarkup()}
  </div>`;
}

function caseIntroOverlayMarkup(caseData) {
  if (!state.caseIntroOpen || !caseData) return "";
  return `<div class="nested-overlay" data-action="close-case-intro"><section class="archive-case-intro" data-stop-click>
    <button class="icon-button sheet-close" data-action="close-case-intro" aria-label="Закрыть дело">×</button>
    <div class="archive-case-image"><img src="${caseData.image}" alt="Дело ${formatCase(caseData.id)}. ${caseData.title}"></div>
    <div class="archive-case-copy"><span class="eyebrow">ДЕЛО ${formatCase(caseData.id)}</span><h2>${caseData.title}</h2><p>${caseData.intro}</p><div class="metadata-row"><span>Поле ${caseData.size}×${caseData.size}</span><span>${caseData.difficulty}</span></div><span class="archive-section-label">ПОДОЗРЕВАЕМЫЕ</span><div class="participant-row">${caseData.participants.map(participantMarkup).join("")}</div><button class="primary-button" data-action="start-case">НАЧАТЬ РАССЛЕДОВАНИЕ</button></div>
  </section></div>`;
}

function materialOverlayMarkup() {
  if (!state.materialOpen) return "";
  let content = "";
  const facts = unlockedChapterFacts();
  if (state.materialOpen === "participants") content = `<span class="eyebrow">МАТЕРИАЛ · УЧАСТНИКИ</span><h2>Лица в особняке</h2><div class="material-people">${dossierPeopleMarkup()}</div>`;
  if (state.materialOpen === "map") content = `<span class="eyebrow">МАТЕРИАЛ · КАРТА</span><h2>План особняка</h2><div class="material-map"><img src="${chapter.map}" alt="Карта особняка Блэквуд"></div>`;
  if (state.materialOpen === "facts") content = `<span class="eyebrow">МАТЕРИАЛ · ФАКТЫ</span><h2>Установленные факты</h2>${facts.length ? `<div class="facts-list">${facts.map((fact) => `<article class="fact-entry"><div class="fact-meta"><span>ДЕЛО ${formatCase(fact.sourceCase)}</span>${fact.optionalCategory ? `<small>${fact.optionalCategory}</small>` : ""}</div><p>${fact.text}</p></article>`).join("")}</div>` : `<div class="facts-empty"><p>Пока недостаточно сведений.<br>Раскрывайте дела, чтобы пополнять материалы расследования.</p></div>`}`;
  if (state.materialOpen === "picker") content = `<span class="eyebrow">МАТЕРИАЛЫ · 3</span><h2>Материалы главы</h2><div class="material-picker-actions"><button data-action="open-material" data-material="participants">Участники <b>6</b></button><button data-action="open-material" data-material="map">Карта особняка</button><button data-action="open-material" data-material="facts">${factsButtonMarkup()}</button></div>`;
  if (state.materialOpen === "chapter-description") content = `<span class="eyebrow">АРХИВ 01</span><h2>${chapter.title}</h2><p>${chapter.description}</p>`;
  return `<div class="nested-overlay" data-action="close-material"><section class="material-sheet ${state.materialOpen === "facts" ? "facts-sheet" : ""}" data-stop-click><button class="icon-button sheet-close" data-action="close-material" aria-label="Закрыть материал">×</button>${content}</section></div>`;
}

function completedCasesOverlayMarkup() {
  if (!state.completedCasesOpen) return "";
  const items = state.progress.completed.map((id) => `<li>${icon(uiAssets.check)}<span>Дело ${formatCase(id)} — ${cases[id - 1].title}</span></li>`).join("");
  return `<div class="nested-overlay" data-action="close-completed-cases"><section class="completed-cases-sheet" data-stop-click><button class="icon-button sheet-close" data-action="close-completed-cases" aria-label="Закрыть список">×</button><span class="eyebrow">РАСКРЫТЫЕ ДЕЛА</span><h2>Материалы расследований</h2>${items ? `<ul>${items}</ul>` : `<p>Завершённых дел пока нет.</p>`}</section></div>`;
}

function renderArchive() {
  const start = state.archiveRange * 4 + 1;
  const folders = Array.from({ length: 4 }, (_, index) => archiveFolderMarkup(start + index)).join("");
  return `<main class="app-screen archive-screen">${topBar("Архив расследований", "back-menu")}<div class="archive-page page-container"><header class="archive-heading"><span class="eyebrow">АРХИВ РАССЛЕДОВАНИЙ</span><h1>Частный архив</h1><p class="archive-description">Откройте папку и изучите новое расследование.</p></header><nav class="archive-ranges" aria-label="Диапазон архивов">${[0,1,2].map((range) => `<button class="${state.archiveRange === range ? "active" : ""}" data-action="archive-range" data-range="${range}">${formatCase(range * 4 + 1)}–${formatCase(range * 4 + 4)}</button>`).join("")}</nav><div class="archive-folder-rail">${folders}</div></div>${archiveFolderOverlayMarkup()}${settingsMarkup()}${toastMarkup()}</main>`;
}

function renderPreface() {
  return pageShell(`<div class="story-page page-container">
    <div class="story-image"><img src="${chapter.cover}" alt="Особняк Блэквуд вечером"></div>
    <section class="story-card surface-card"><span class="eyebrow">ГЛАВА 1 · ПРЕДИСЛОВИЕ</span><h1>${chapter.title}</h1><p class="lead">${chapter.description}</p><button class="primary-button" data-action="open-dossier">ОТКРЫТЬ ДОСЬЕ</button></section>
  </div>`, "Предисловие главы", "back-archive");
}

function dossierPeopleMarkup() {
  return ["anna", "boris", "elena", "dmitry", "maria", "leon"].map((id) => `<div class="dossier-person">${avatar(id)}<span><strong>${characters[id].name}</strong><small>${characters[id].role}</small></span></div>`).join("");
}

function renderDossier() {
  return pageShell(`<div class="dossier-page page-container">
    <section class="dossier-map surface-card"><div class="material-heading"><span class="eyebrow">МАТЕРИАЛ 01</span><h1>Карта особняка</h1><span class="verified">ПРОВЕРЕНО</span></div><div class="map-frame"><img src="${chapter.map}" alt="Карта особняка Блэквуд"></div><p>${chapter.description}</p></section>
    <section class="dossier-card surface-card"><span class="eyebrow">УЧАСТНИКИ</span><h2>Досье семьи и персонала</h2><div class="dossier-people">${dossierPeopleMarkup()}</div><button class="primary-button" data-action="open-cases">К МАТЕРИАЛАМ ДЕЛ</button></section>
  </div>`, "Досье главы", "back-preface");
}

function caseDocumentsMarkup() {
  return cases.map((caseData) => {
    const unlocked = caseData.id <= state.progress.unlocked || state.progress.completed.includes(caseData.id);
    const completed = state.progress.completed.includes(caseData.id);
    if (!unlocked) return `<article class="case-document locked"><span class="document-number">ДЕЛО ${formatCase(caseData.id)}</span><div class="locked-document">${icon(uiAssets.lock)}</div><h3>Новые материалы ещё не получены</h3><span>Раскройте предыдущее дело</span></article>`;
    return `<button class="case-document ${completed ? "completed" : ""}" data-action="open-case" data-case="${caseData.id}"><span class="document-number">ДЕЛО ${formatCase(caseData.id)}</span><div class="document-thumb"><img src="${caseData.image}" alt=""></div><h3>${caseData.title}</h3><span>${caseData.difficulty} · ${caseData.size}×${caseData.size}</span>${completed ? `<span class="completion-mark">${icon(uiAssets.check)}${state.progress.stars[caseData.id] ?? 1} / 3</span>` : ""}</button>`;
  }).join("");
}

function renderCases() {
  return pageShell(`<div class="page-container cases-page">
    <header class="case-header-card surface-card"><div class="case-header-image"><img src="${chapter.cover}" alt="Особняк Блэквуд"></div><div><span class="eyebrow">ГЛАВА 1 · ДОСЬЕ</span><h1>${chapter.title}</h1><p>Документы открываются последовательно. Закрытые материалы не раскрывают сюжет.</p><div class="progress-row wide"><span><b>${state.progress.completed.length}</b>/12 дел</span><div class="progress-track"><span style="width:${state.progress.completed.length / 12 * 100}%"></span></div></div></div></header>
    <div class="documents-grid">${caseDocumentsMarkup()}</div>
  </div>`, "Материалы главы", "back-dossier");
}

function participantMarkup(id) {
  return `<div class="participant">${avatar(id)}<small>${characters[id].shortName}</small></div>`;
}

function renderIntro() {
  const caseData = currentCase();
  return pageShell(`<div class="case-intro page-container surface-card">
    <div class="intro-image"><img src="${caseData.image}" alt="Дело ${formatCase(caseData.id)}. ${caseData.title}"></div>
    <section class="intro-copy"><span class="eyebrow">ДЕЛО ${formatCase(caseData.id)}</span><h1>${caseData.title}</h1><div class="metadata-row"><span>${caseData.location}</span><span>${caseData.difficulty}</span><span>${caseData.size}×${caseData.size}</span></div><p class="lead">${caseData.intro}</p><h3>Участники расследования</h3><div class="participant-row">${caseData.participants.map(participantMarkup).join("")}</div><button class="primary-button" data-action="start-case">НАЧАТЬ РАССЛЕДОВАНИЕ</button></section>
  </div>`, `Дело ${formatCase(caseData.id)}`, "back-cases");
}

function objectAt(cell) {
  return boardTemplates[currentCase().size].objects.find((entry) => entry.cell === cell);
}

function occupantAt(cell) {
  return Object.entries(state.placements).find(([, value]) => value === cell)?.[0] ?? null;
}

function isObjectBlocked(cell) {
  const object = objectAt(cell);
  return Boolean(object && !object.canOccupy);
}

function rowColumnBlockers(cell, movingPerson = state.selectedPerson) {
  const point = cellToPoint(cell);
  return Object.entries(state.placements).filter(([person, placedCell]) => {
    if (person === movingPerson || placedCell === cell) return false;
    const placed = cellToPoint(placedCell);
    return placed.row === point.row || placed.col === point.col;
  }).map(([person]) => person);
}

function isRowColumnBlocked(cell, movingPerson = state.selectedPerson) {
  return rowColumnBlockers(cell, movingPerson).length > 0;
}

function isBlocked(cell) {
  if (isObjectBlocked(cell)) return true;
  const occupant = occupantAt(cell);
  if (occupant && occupant !== state.selectedPerson) return true;
  return isRowColumnBlocked(cell, state.selectedPerson);
}

function characterListMarkup(compact = false) {
  return `<div class="character-list ${compact ? "compact" : ""}" style="--suspect-count:${currentCase().participants.length}">${currentCase().participants.map((id) => {
    const placed = Boolean(state.placements[id]);
    const selected = state.selectedPerson === id;
    const highlighted = highlightedPeople().has(id);
    return `<button class="character-card ${selected ? "selected" : ""} ${placed ? "placed" : ""} ${highlighted ? "clue-highlight" : ""}" data-action="select-person" data-person="${id}" aria-label="${characters[id].name}${placed ? ", размещён" : `, ${characters[id].role}`}"><span class="avatar-wrap">${avatar(id, compact ? "sm" : "md")}${placed ? `<span class="placed-check">${icon(uiAssets.check)}</span>` : ""}</span><span><strong>${characters[id].shortName}</strong>${compact ? "" : `<small>${placed ? "размещён" : characters[id].role}</small>`}</span></button>`;
  }).join("")}</div>`;
}

function clueListMarkup() {
  return `<div class="clue-list">${currentCase().clues.map((entry, index) => {
    const reviewed = state.reviewed.includes(index);
    return `<div class="clue-item ${state.activeClue === index ? "active" : ""} ${reviewed ? "reviewed" : ""}"><button class="clue-select" data-action="select-clue" data-index="${index}" aria-pressed="${state.activeClue === index}"><span class="clue-number">${index + 1}</span><span>${entry.text}</span></button><button class="clue-status" data-action="review-clue" data-index="${index}" aria-pressed="${reviewed}" aria-label="${reviewed ? "Снять отметку с улики" : "Отметить улику просмотренной"}">${reviewed ? icon(uiAssets.check) : ""}</button></div>`;
  }).join("")}</div>`;
}

function activeRule() {
  return state.activeClue === null ? null : currentCase().clues[state.activeClue]?.rule;
}

function highlightedPeople() {
  const args = activeRule()?.args ?? [];
  return new Set(args.filter((arg) => characters[arg]));
}

function highlightedObject() {
  const active = activeRule();
  return active && (active.type.includes("obj") || active.type === "on_obj") ? active.args[1] : null;
}

function highlightedRoom() {
  const active = activeRule();
  if (!active) return null;
  if (["room", "not_room"].includes(active.type)) return active.args[1];
  return null;
}

function clueRelationCells() {
  const active = activeRule();
  if (!active || active.type !== "adj_obj") return new Set();
  const caseData = currentCase();
  const template = boardTemplates[caseData.size];
  const object = template.objects.find((entry) => entry.id === active.args[1]);
  if (!object) return new Set();
  const origin = cellToPoint(object.cell);
  const objectRoom = template.rooms[origin.row * caseData.size + origin.col];
  return new Set([[-1, 0], [1, 0], [0, -1], [0, 1]].flatMap(([dr, dc]) => {
    const row = origin.row + dr;
    const col = origin.col + dc;
    if (row < 0 || col < 0 || row >= caseData.size || col >= caseData.size) return [];
    return template.rooms[row * caseData.size + col] === objectRoom ? [pointToCell(row, col)] : [];
  }));
}

function roomLabelAnchors(caseData, template) {
  const anchors = {};
  template.rooms.forEach((roomId, index) => {
    const cell = pointToCell(Math.floor(index / caseData.size), index % caseData.size);
    const hasObject = template.objects.some((entry) => entry.cell === cell);
    if (!(roomId in anchors) || (!hasObject && cell !== caseData.targetCell && anchors[roomId].fallback)) anchors[roomId] = { cell, fallback: hasObject || cell === caseData.targetCell };
  });
  return Object.fromEntries(Object.entries(anchors).map(([roomId, value]) => [roomId, value.cell]));
}

function roomBoundaryClasses(index, size, roomIds) {
  const row = Math.floor(index / size);
  const col = index % size;
  const roomId = roomIds[index];
  const classes = [];
  if (row === 0) classes.push("room-edge-top");
  if (col === 0) classes.push("room-edge-left");
  if (col === size - 1 || roomIds[index + 1] !== roomId) classes.push("room-edge-right");
  if (row === size - 1 || roomIds[index + size] !== roomId) classes.push("room-edge-bottom");
  return classes.join(" ");
}

function boardMarkup() {
  const caseData = currentCase();
  const template = boardTemplates[caseData.size];
  const labelAnchors = roomLabelAnchors(caseData, template);
  const tutorialFocusPerson = state.tutorialStep === 3 ? Object.keys(state.placements).at(-1) : null;
  const tutorialFocusCell = tutorialFocusPerson ? state.placements[tutorialFocusPerson] : null;
  const relationCells = clueRelationCells();
  const selectedClueRule = activeRule();
  const cells = Array.from({ length: caseData.size * caseData.size }, (_, index) => pointToCell(Math.floor(index / caseData.size), index % caseData.size));
  return cells.map((cell, index) => {
    const roomId = template.rooms[index];
    const object = objectAt(cell);
    const occupant = occupantAt(cell);
    const objectBlocked = isObjectBlocked(cell);
    const automaticBlockers = rowColumnBlockers(cell, state.selectedPerson);
    const automaticallyBlocked = !occupant && !objectBlocked && automaticBlockers.length > 0;
    const blocked = Boolean(state.selectedPerson && isBlocked(cell));
    const tutorialBlocked = Boolean(tutorialFocusPerson && rowColumnBlockers(cell, null).includes(tutorialFocusPerson));
    const cellNotes = state.notes[cell] ?? [];
    const target = cell === caseData.targetCell;
    const clueHighlight = (object && object.id === highlightedObject()) || (occupant && highlightedPeople().has(occupant));
    const selectedOccupant = Boolean(occupant && occupant === state.selectedPerson);
    const roomHighlighted = highlightedRoom() === roomId;
    const roomExcluded = selectedClueRule?.type === "not_room" && roomHighlighted;
    const relationCell = relationCells.has(cell) && !objectBlocked;
    const focusDistance = tutorialFocusCell ? Math.abs(cellToPoint(cell).row - cellToPoint(tutorialFocusCell).row) + Math.abs(cellToPoint(cell).col - cellToPoint(tutorialFocusCell).col) : 0;
    return `<button class="board-cell room-${roomId} ${roomBoundaryClasses(index, caseData.size, template.rooms)} ${object ? "contains-object" : ""} ${occupant ? "contains-character" : ""} ${selectedOccupant ? "selected-character-cell" : ""} ${objectBlocked ? "blocked-by-object" : ""} ${automaticallyBlocked ? "blocked-by-row-column" : ""} ${blocked ? "placement-blocked" : ""} ${state.selectedPerson && !blocked ? "hover-available" : ""} ${state.noteMode ? "note-mode" : ""} ${clueHighlight ? "clue-entity-highlight" : ""} ${relationCell ? "clue-relation-cell" : ""} ${roomHighlighted ? "clue-room-highlight" : ""} ${roomExcluded ? "clue-room-excluded" : ""} ${occupant === tutorialFocusPerson ? "tutorial-origin" : ""} ${tutorialBlocked ? "tutorial-cross" : ""}" style="background-color:${rooms[roomId].color};--block-delay:${Math.min(focusDistance, 4) * 35}ms" data-action="cell" data-cell="${cell}" data-room="${roomId}" ${objectBlocked || automaticallyBlocked ? `aria-disabled="true"` : ""} aria-label="${cell}, ${rooms[roomId].label}${objectBlocked ? ", занято предметом" : automaticallyBlocked ? ", недоступно по строке или столбцу" : ""}">
      <span class="cell-coordinate">${cell}</span>
      ${labelAnchors[roomId] === cell ? `<span class="room-label ${roomHighlighted ? "clue-room-label" : ""} ${roomExcluded ? "excluded" : ""}">${rooms[roomId].label}</span>` : ""}
      ${object ? `<span class="cell-object ${object.id === highlightedObject() ? "object-highlight" : ""}">${object.path ? `<img src="${object.path}" alt="${object.label}">` : `<span class="object-placeholder" aria-label="${object.label}"></span>`}</span>` : ""}
      ${target ? `<span class="target-marker ${caseData.id >= 9 && caseData.id !== 10 ? "victim-target" : ""}">${caseData.id >= 9 && caseData.id !== 10 ? icon(uiAssets.victim, caseData.targetLabel) : `<span>ЦЕЛЬ</span>${caseData.targetLabel}`}</span>` : ""}
      ${cellNotes.length ? `<span class="notes-layer">${cellNotes.map((id) => avatar(id, "sm")).join("")}</span>` : ""}
      ${occupant ? `<span class="character-layer">${avatar(occupant)}<small>${characters[occupant].shortName}</small></span>` : ""}
      ${automaticallyBlocked ? `<span class="automatic-block-marker" aria-hidden="true"></span>` : ""}
      <span class="state-overlay"></span>
    </button>`;
  }).join("");
}

function tutorialMarkup() {
  if (!state.tutorialStep || state.tutorialRevealPending) return "";
  const titles = ["", "ВЫБЕРИТЕ ПЕРСОНАЖА", "РАЗМЕСТИТЕ ЕГО НА ПЛАНЕ", "ОДИН НА СТРОКУ И СТОЛБЕЦ", "ИСПОЛЬЗУЙТЕ УЛИКИ"];
  const copy = [
    "",
    "Нажмите на карточку любого подозреваемого.",
    "Нажмите на доступную клетку, чтобы разместить подозреваемого.",
    "В каждой строке и каждом столбце может находиться только один подозреваемый.<br><br>Крестики показывают клетки, которые теперь недоступны для остальных.",
    "Улики помогают определить, где находился каждый человек.<br><br>Нажмите на улику — игра подсветит связанного персонажа, предмет или комнату. Использованные улики можно отметить галочкой.",
  ];
  const actionLabel = state.tutorialStep === 3 ? "ПОНЯТНО" : state.tutorialStep === 4 ? "НАЧАТЬ" : "";
  return `<div class="tutorial-layer"><div class="tutorial-card step-${state.tutorialStep}"><span class="eyebrow">ОБУЧЕНИЕ · ${state.tutorialStep}/4</span><h3>${titles[state.tutorialStep]}</h3><p>${copy[state.tutorialStep]}</p>${actionLabel ? `<button class="primary-button" data-action="tutorial-next">${actionLabel}</button>` : ""}</div></div>`;
}

function accusationMarkup() {
  if (!state.accusationOpen) return "";
  const caseData = currentCase();
  const final = caseData.isFinalAccusation;
  if (state.conclusionError) return `<div class="modal-layer" role="dialog" aria-modal="true"><div class="modal-card accusation-modal conclusion-error"><span class="document-stamp">${final ? "ОБВИНЕНИЕ НЕ ПОДТВЕРЖДАЕТСЯ" : "ВЫВОД НЕ ПОДТВЕРЖДАЕТСЯ УЛИКАМИ"}</span><h2>${final ? "Доказательств недостаточно" : "Проверьте вывод"}</h2><p>Проверьте расположение участников и сведения дела ещё раз. Правильный ответ пока не раскрыт.</p><button class="primary-button" data-action="return-to-board">${final ? "ВЕРНУТЬСЯ К МАТЕРИАЛАМ" : "ВЕРНУТЬСЯ К ПЛАНУ"}</button></div></div>`;
  return `<div class="modal-layer" role="dialog" aria-modal="true"><div class="modal-card accusation-modal conclusion-document"><span class="eyebrow">${final ? "ВЫДВИНУТЬ ОБВИНЕНИЕ" : "ВЫВОД РАССЛЕДОВАНИЯ"}</span><h2>${caseData.finalQuestion}</h2><p>${final ? "Все материалы собраны. Осталось назвать виновного." : "Расстановка восстановлена. Теперь определите, кто связан с произошедшим."}</p><div class="accusation-grid">${caseData.participants.map((id) => `<button class="${state.accused === id ? "selected" : ""}" data-action="select-accused" data-person="${id}">${avatar(id)}<span>${characters[id].shortName}</span></button>`).join("")}</div><div class="modal-actions"><button class="secondary-button" data-action="edit-board">Вернуться к расстановке</button><button class="primary-button" data-action="confirm-accusation" ${state.accused ? "" : "disabled"}>${final ? "ВЫДВИНУТЬ ОБВИНЕНИЕ" : "СДЕЛАТЬ ВЫВОД"}</button></div></div></div>`;
}

function clueSheetMarkup() {
  if (!state.cluesOpen) return "";
  return `<div class="bottom-sheet-layer" data-action="close-clues"><section class="clue-bottom-sheet" data-stop-click><div class="sheet-handle"></div><div class="panel-heading clue-sheet-heading"><span><b>Улики</b></span><button class="icon-button" data-action="close-clues" aria-label="Закрыть">×</button></div><div class="investigation-goal"><span>ЦЕЛЬ РАССЛЕДОВАНИЯ</span><p>${currentCase().question}</p></div><div class="clue-sheet-list-heading"><span>УЛИКИ</span><b>${state.reviewed.length}/${currentCase().clues.length}</b></div>${clueListMarkup()}</section></div>`;
}

function mobileClueEntryMarkup() {
  const active = state.activeClue === null ? null : currentCase().clues[state.activeClue];
  if (!active) return `<button class="mobile-clue-entry" data-action="open-clues"><span>${icon(uiAssets.hint)}Улики <b>${state.reviewed.length}/${currentCase().clues.length}</b></span><span class="sheet-chevron" aria-hidden="true"></span></button>`;
  return `<button class="mobile-clue-entry active-clue-preview" data-action="open-clues" aria-label="Открыть список улик"><span class="active-clue-number">${state.activeClue + 1}</span><span class="active-clue-text">${active.text}</span><span class="sheet-chevron" aria-hidden="true"></span></button>`;
}

function settingsMarkup() {
  if (!state.settingsOpen) return "";
  const resetLabel = state.resetArmed ? "ЗАЖМИТЕ НА 3 СЕКУНДЫ ДЛЯ СБРОСА" : "СБРОСИТЬ ПРОГРЕСС";
  return `<div class="modal-layer" role="dialog" aria-modal="true" aria-label="Настройки"><div class="modal-card settings-modal"><div class="modal-heading"><div><span class="eyebrow">ПАРАМЕТРЫ</span><h2>Настройки</h2></div><button class="icon-button" data-action="close-settings" aria-label="Закрыть">×</button></div><label class="setting-row"><span>Звук</span><input type="checkbox" data-action="toggle-sound" ${state.soundEnabled ? "checked" : ""} aria-label="Звук"></label><div class="settings-divider"></div><button class="secondary-button danger-button reset-hold-button ${state.resetHolding ? "holding" : ""}" data-action="reset-progress" aria-label="${resetLabel}"><span>${resetLabel}</span></button></div></div>`;
}

function renderGame() {
  const caseData = currentCase();
  return `<main class="game-screen ${state.readyToAccuse ? "board-solved" : ""} ${state.tutorialStep ? `tutorial-step-${state.tutorialStep}` : ""} ${state.tutorialRevealPending ? "tutorial-reveal-pending" : ""}">
    ${topBar(`Дело ${formatCase(caseData.id)} · ${caseData.title}`, "back-cases", true)}
    <div class="game-layout">
      <section class="board-card"><div class="board-card-heading"><span><b>ПЛАН ПОМЕЩЕНИЯ</b><small>Особняк Блэквуд · Поле ${caseData.size}×${caseData.size}</small></span><span class="board-status">${Object.keys(state.placements).length}/${caseData.participants.length} размещено</span></div><div class="game-board board-${caseData.size}" style="grid-template-columns:repeat(${caseData.size},1fr)">${boardMarkup()}</div><div class="mobile-character-strip"><span class="panel-label">ПОДОЗРЕВАЕМЫЕ</span>${characterListMarkup(true)}</div>${mobileClueEntryMarkup()}</section>
      <aside class="right-panel"><section class="side-card characters-panel"><div class="panel-heading"><span><b>Подозреваемые</b><small>Выберите персонажа</small></span><span>${Object.keys(state.placements).length}/${caseData.participants.length}</span></div>${characterListMarkup()}</section><section class="side-card clues-panel"><div class="panel-heading"><span><b>Улики</b><small>Нажмите, чтобы подсветить связь</small></span><span>${state.reviewed.length}/${caseData.clues.length}</span></div>${clueListMarkup()}</section></aside>
    </div>
    <nav class="bottom-toolbar" aria-label="Действия с полем"><button data-action="undo" ${state.readyToAccuse ? "disabled" : ""}><span class="undo-symbol" aria-hidden="true"></span><span>Отменить</span></button><button class="${state.noteMode ? "active" : ""}" data-action="notes">${icon(uiAssets.notes)}<span>Заметки</span></button><button data-action="hint">${icon(uiAssets.hint)}<span>Подсказка</span></button><button class="toolbar-cta" data-action="verify">${icon(uiAssets.check)}<span>${state.readyToAccuse ? (caseData.isFinalAccusation ? "Выдвинуть обвинение" : "Сделать вывод") : "Проверить"}</span></button></nav>
    ${clueSheetMarkup()}${accusationMarkup()}${tutorialMarkup()}${settingsMarkup()}${toastMarkup()}
  </main>`;
}

function renderResult() {
  const caseData = currentCase();
  const stars = [1, 2, 3].map((star) => icon(uiAssets.star, "", star <= state.resultStars ? "earned" : "")).join("");
  return pageShell(`<div class="result-page page-container"><section class="result-card surface-card result-document"><span class="document-stamp">${caseData.isFinalAccusation ? "ОБВИНЕНИЕ ПОДТВЕРЖДЕНО" : "ВЫВОД ПОДТВЕРЖДЁН"}</span><span class="eyebrow">ДЕЛО ${formatCase(caseData.id)}</span><h1>${caseData.resultTitle}</h1><div class="result-person">${avatar(caseData.correctConclusionCharacter, "lg")}<div><span>${caseData.isFinalAccusation ? "Виновный" : "Установленный участник"}</span><strong>${characters[caseData.correctConclusionCharacter].name}</strong></div></div><div class="stars-row">${stars}</div><p class="result-explanation">${caseData.resultExplanation}</p><div class="established-fact"><span>УСТАНОВЛЕННЫЙ ФАКТ ${state.resultFactIsNew ? "<b>НОВОЕ</b>" : ""}</span><p>${caseData.unlockedFact}</p></div>${caseData.isFinalAccusation ? `<div class="chapter-solved-line"><strong>ГЛАВА РАСКРЫТА</strong><span>12 / 12</span></div>` : ""}<div class="stats-row"><span><b>${formatTime(state.elapsed)}</b>Время</span><span><b>${state.hints}</b>Подсказки</span></div><div class="result-actions"><button class="primary-button" data-action="continue-after-result">ПРОДОЛЖИТЬ</button></div></section></div>`, "Результат расследования");
}

function renderChapterComplete() {
  return pageShell(`<div class="chapter-complete page-container"><div class="chapter-complete-image"><img src="${chapter.map}" alt="Карта особняка Блэквуд"></div><section class="surface-card"><span class="eyebrow">АРХИВ ОБНОВЛЁН</span><h1>Глава завершена</h1><p class="lead">Все двенадцать дел Особняка Блэквуд раскрыты. Доказательства финансовых махинаций собраны, а виновник установлен логическим путём.</p><div class="chapter-score"><b>12/12</b><span>дел раскрыто</span></div><button class="primary-button" data-action="open-archive">К АРХИВУ ГЛАВ</button></section></div>`, "Завершение главы", "back-archive");
}

function render() {
  if (!root) return;
  if (state.splash) root.innerHTML = renderSplash();
  else if (state.screen === "menu") root.innerHTML = renderMenu();
  else if (state.screen === "archive") root.innerHTML = renderArchive();
  else if (state.screen === "preface") root.innerHTML = renderPreface();
  else if (state.screen === "dossier") root.innerHTML = renderDossier();
  else if (state.screen === "cases") root.innerHTML = renderCases();
  else if (state.screen === "intro") root.innerHTML = renderIntro();
  else if (state.screen === "game") root.innerHTML = renderGame();
  else if (state.screen === "result") root.innerHTML = renderResult();
  else root.innerHTML = renderChapterComplete();
  if (state.screen === "archive") window.requestAnimationFrame(() => document.querySelector(`[data-archive-folder="${state.progress.lastActiveFolder}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }));
}

function saveActive(nextPlacements = state.placements, nextNotes = state.notes, nextReviewed = state.reviewed) {
  persist({ ...state.progress, active: { caseId: state.currentCaseId, placements: nextPlacements, notes: nextNotes, reviewed: nextReviewed, elapsed: state.elapsed, tutorialStep: state.tutorialStep, boardSolved: state.readyToAccuse, hasAction: true } });
}

function startCase(id, resume = false) {
  window.clearTimeout(tutorialRevealTimer);
  tutorialRevealTimer = null;
  const saved = resume ? state.progress.active : state.progress.active?.caseId === id ? state.progress.active : null;
  state.currentCaseId = id;
  state.placements = clone(saved?.placements ?? {});
  state.notes = clone(saved?.notes ?? {});
  state.reviewed = [...(saved?.reviewed ?? [])];
  state.elapsed = saved?.elapsed ?? 0;
  state.selectedPerson = null;
  state.noteMode = false;
  state.activeClue = null;
  state.cluesOpen = false;
  state.readyToAccuse = Boolean(saved?.boardSolved);
  state.accusationOpen = false;
  state.accused = null;
  state.conclusionError = false;
  state.mistakes = 0;
  state.hints = 0;
  state.history = [];
  state.resultStars = 0;
  state.resultFactIsNew = false;
  state.tutorialStep = saved?.tutorialStep ?? (id === 1 && !state.progress.tutorialComplete ? 1 : 0);
  state.tutorialRevealPending = false;
  state.screen = "game";
  render();
}

function interactWithCell(cell) {
  if (state.readyToAccuse) return;
  const occupant = occupantAt(cell);
  if (!state.selectedPerson) {
    if (occupant) {
      state.selectedPerson = occupant;
      render();
      return;
    }
    showToast("Сначала выберите персонажа");
    render();
    return;
  }
  if (occupant && occupant !== state.selectedPerson) {
    state.selectedPerson = occupant;
    render();
    return;
  }
  if (occupant === state.selectedPerson && state.placements[state.selectedPerson] === cell) {
    state.history.push(clone(state.placements));
    const nextPlacements = { ...state.placements };
    delete nextPlacements[state.selectedPerson];
    state.placements = nextPlacements;
    playSound("characterRemove");
    state.selectedPerson = null;
    state.readyToAccuse = false;
    saveActive();
    render();
    return;
  }
  if (isBlocked(cell)) return;
  if (state.noteMode) {
    const existing = state.notes[cell] ?? [];
    const nextNotes = clone(state.notes);
    nextNotes[cell] = existing.includes(state.selectedPerson) ? existing.filter((id) => id !== state.selectedPerson) : [...existing, state.selectedPerson];
    if (!nextNotes[cell].length) delete nextNotes[cell];
    state.notes = nextNotes;
    saveActive(state.placements, nextNotes, state.reviewed);
    render();
    return;
  }
  state.history.push(clone(state.placements));
  const oldCell = state.placements[state.selectedPerson];
  const nextNotes = clone(state.notes);
  delete nextNotes[cell];
  if (oldCell) delete nextNotes[oldCell];
  state.placements = { ...state.placements, [state.selectedPerson]: cell };
  playSound(oldCell ? "characterRemove" : "characterPlace");
  state.notes = nextNotes;
  state.selectedPerson = null;
  state.readyToAccuse = false;
  const completedTutorialPlacement = state.tutorialStep === 2;
  if (completedTutorialPlacement) {
    state.tutorialStep = 3;
    state.tutorialRevealPending = true;
  }
  saveActive(state.placements, state.notes, state.reviewed);
  render();
  if (completedTutorialPlacement) {
    window.clearTimeout(tutorialRevealTimer);
    tutorialRevealTimer = window.setTimeout(() => {
      tutorialRevealTimer = null;
      if (state.screen !== "game" || state.tutorialStep !== 3) return;
      state.tutorialRevealPending = false;
      saveActive();
      render();
    }, 420);
  }
}

function undo() {
  if (state.readyToAccuse) return;
  if (!state.history.length) { showToast("Нечего отменять"); render(); return; }
  state.placements = state.history.pop();
  playSound("characterRemove");
  state.readyToAccuse = false;
  saveActive();
  render();
}

function useHint() {
  state.hints += 1;
  if (state.hints < 3) {
    const index = currentCase().clues.findIndex((_, clueIndex) => !state.reviewed.includes(clueIndex));
    state.activeClue = index < 0 ? 0 : index;
    state.cluesOpen = true;
    showToast(state.hints === 1 ? "Полезная улика подсвечена" : "Ищите вывод в подсвеченной связи");
    saveActive();
    render();
    return;
  }
  const person = currentCase().participants.find((id) => !state.placements[id]);
  if (!person) { showToast("Все персонажи уже размещены"); render(); return; }
  state.history.push(clone(state.placements));
  state.placements = { ...state.placements, [person]: currentCase().solution[person] };
  saveActive();
  showToast(`${characters[person].shortName} размещён по подсказке`);
  render();
}

function checkSolution() {
  const caseData = currentCase();
  if (Object.keys(state.placements).length !== caseData.participants.length) {
    showToast("Разместите всех подозреваемых.", "neutral", "РАССТАНОВКА НЕ ЗАВЕРШЕНА");
    render();
    return;
  }
  const incorrect = caseData.participants.filter((id) => state.placements[id] !== caseData.solution[id]).length;
  if (incorrect) {
    state.mistakes += 1;
    playSound("incorrectCheck");
    showToast("Проверьте улики ещё раз.", "error", "В РАССТАНОВКЕ ЕСТЬ ОШИБКА");
    render();
    return;
  }
  state.readyToAccuse = true;
  state.accused = null;
  state.conclusionError = false;
  saveActive();
  showToast("Все участники размещены верно. Теперь сделайте вывод по материалам дела.", "success", "РАССТАНОВКА ВОССТАНОВЛЕНА");
  render();
}

function finishCase() {
  const caseData = currentCase();
  if (state.accused !== caseData.correctConclusionCharacter) {
    state.mistakes += 1;
    playSound("incorrectCheck");
    state.conclusionError = true;
    render();
    return;
  }
  state.resultStars = 1 + (state.mistakes === 0 ? 1 : 0) + (state.hints === 0 ? 1 : 0);
  state.resultFactIsNew = !state.progress.completed.includes(state.currentCaseId);
  state.accusationOpen = false;
  state.conclusionError = false;
  state.screen = "result";
  playSound("caseSolved");
  render();
}

function completeCaseAndContinue() {
  const caseData = currentCase();
  const wasAlreadyCompleted = state.progress.completed.includes(state.currentCaseId);
  const completed = Array.from(new Set([...state.progress.completed, state.currentCaseId]));
  const newlyUnlockedFacts = wasAlreadyCompleted ? [] : chapterFacts.filter((fact) => fact.unlockAfterCase === state.currentCaseId);
  const nextUnlocked = Math.min(12, Math.max(state.progress.unlocked, state.currentCaseId + 1));
  const unlockedNewCase = nextUnlocked > state.progress.unlocked;
  persist({ ...state.progress, completed, unlocked: nextUnlocked, currentCase: nextUnlocked, chapterProgress: { ...state.progress.chapterProgress, 1: completed.length }, lastArchiveRange: 0, lastOpenedChapter: 1, lastActiveFolder: 1, chapterDiscovered: Array.from(new Set([...state.progress.chapterDiscovered, 1])), stars: { ...state.progress.stars, [state.currentCaseId]: state.resultStars }, active: null });
  state.accusationOpen = false;
  state.accused = null;
  state.conclusionError = false;
  state.screen = "archive";
  state.archiveRange = 0;
  state.openChapterId = 1;
  state.caseIntroOpen = false;
  state.materialOpen = null;
  state.completedCasesOpen = false;
  if (unlockedNewCase) window.setTimeout(() => playSound("caseUnlocked"), 420);
  showToast(newlyUnlockedFacts.length ? "Получены новые материалы · добавлен новый факт" : "Дело раскрыто");
  render();
}

function openArchiveFolder(id) {
  if (id !== 1) return;
  state.openChapterId = id;
  state.caseIntroOpen = false;
  state.materialOpen = null;
  state.completedCasesOpen = false;
  persist({ ...state.progress, lastArchiveRange: state.archiveRange, lastOpenedChapter: id, lastActiveFolder: id, chapterDiscovered: Array.from(new Set([...state.progress.chapterDiscovered, id])), chapterProgress: { ...state.progress.chapterProgress, 1: state.progress.completed.length }, currentCase: Math.min(12, Math.max(1, state.progress.currentCase ?? state.progress.unlocked)) });
  render();
}

function returnToOpenArchive() {
  state.screen = "archive";
  state.archiveRange = state.progress.lastArchiveRange ?? 0;
  state.openChapterId = 1;
  state.caseIntroOpen = false;
  state.materialOpen = null;
  state.completedCasesOpen = false;
  render();
}

function resetProgress() {
  persist({ ...initialProgress });
  state.currentCaseId = 1;
  state.placements = {};
  state.notes = {};
  state.reviewed = [];
  state.selectedPerson = null;
  state.noteMode = false;
  state.activeClue = null;
  state.cluesOpen = false;
  state.accusationOpen = false;
  state.conclusionError = false;
  state.accused = null;
  state.conclusionError = false;
  state.readyToAccuse = false;
  state.elapsed = 0;
  state.mistakes = 0;
  state.hints = 0;
  state.tutorialStep = 0;
  state.history = [];
  state.resultStars = 0;
  state.resultFactIsNew = false;
  state.resetArmed = false;
  state.resetHolding = false;
  state.archiveRange = 0;
  state.openChapterId = null;
  state.caseIntroOpen = false;
  state.materialOpen = null;
  state.completedCasesOpen = false;
  state.settingsOpen = false;
  state.screen = "menu";
  showToast("Прогресс сброшен");
  render();
}

function armProgressReset() {
  if (state.resetArmed) return;
  state.resetArmed = true;
  render();
}

function beginProgressResetHold(button) {
  if (!state.resetArmed || state.resetHolding) return;
  state.resetHolding = true;
  resetHoldStartedAt = performance.now();
  button.classList.add("holding");
  resetHoldTimer = window.setTimeout(() => {
    if (!state.resetHolding || performance.now() - resetHoldStartedAt < 2950) return;
    state.resetHolding = false;
    resetHoldTimer = null;
    resetProgress();
  }, 3000);
}

function cancelProgressResetHold() {
  if (!state.resetHolding) return;
  window.clearTimeout(resetHoldTimer);
  resetHoldTimer = null;
  resetHoldStartedAt = 0;
  state.resetHolding = false;
  state.resetArmed = false;
  suppressResetClick = true;
  window.setTimeout(() => { suppressResetClick = false; }, 0);
  render();
}

function handleAction(button) {
  const action = button.dataset.action;
  if (!action) return;
  if (action === "menu-play") return changeScreen("archive");
  if (action === "open-archive") return changeScreen("archive");
  if (action === "open-preface") return changeScreen("preface");
  if (action === "open-dossier") { playSound("clueOpen"); return changeScreen("dossier"); }
  if (action === "open-cases") return changeScreen("cases");
  if (action === "back-menu") return changeScreen("menu");
  if (action === "back-archive") return changeScreen("archive");
  if (action === "back-preface") return changeScreen("preface");
  if (action === "back-dossier") return changeScreen("dossier");
  if (action === "back-cases") return returnToOpenArchive();
  if (action === "archive-range") {
    state.archiveRange = Number(button.dataset.range);
    persist({ ...state.progress, lastArchiveRange: state.archiveRange });
    return render();
  }
  if (action === "open-folder") return openArchiveFolder(Number(button.dataset.chapter));
  if (action === "close-folder") { state.openChapterId = null; state.caseIntroOpen = false; state.materialOpen = null; state.completedCasesOpen = false; return render(); }
  if (action === "open-current-case") { state.currentCaseId = Number(button.dataset.case); state.caseIntroOpen = true; playSound("clueOpen"); return render(); }
  if (action === "close-case-intro") { state.caseIntroOpen = false; return render(); }
  if (action === "open-material") {
    const material = button.dataset.material;
    if (material === "facts") {
      const unlockedIds = unlockedChapterFacts().map((fact) => fact.id);
      const seenFacts = Array.from(new Set([...(state.progress.seenFacts ?? []), ...unlockedIds]));
      if (seenFacts.length !== (state.progress.seenFacts ?? []).length) persist({ ...state.progress, seenFacts });
    }
    state.materialOpen = material;
    playSound("clueOpen");
    return render();
  }
  if (action === "open-material-picker") { state.materialOpen = "picker"; playSound("clueOpen"); return render(); }
  if (action === "open-chapter-description") { state.materialOpen = "chapter-description"; playSound("clueOpen"); return render(); }
  if (action === "close-material") { state.materialOpen = null; return render(); }
  if (action === "open-completed-cases") { state.completedCasesOpen = true; playSound("clueOpen"); return render(); }
  if (action === "close-completed-cases") { state.completedCasesOpen = false; return render(); }
  if (action === "open-case") { playSound("clueOpen"); state.currentCaseId = Number(button.dataset.case); return changeScreen("intro"); }
  if (action === "start-case") return startCase(state.currentCaseId);
  if (action === "select-person") {
    if (state.readyToAccuse) return;
    const id = button.dataset.person;
    state.selectedPerson = state.selectedPerson === id ? null : id;
    if (state.tutorialStep === 1) state.tutorialStep = 2;
    return render();
  }
  if (action === "cell") return interactWithCell(button.dataset.cell);
  if (action === "select-clue") {
    playSound("clueOpen");
    const index = Number(button.dataset.index);
    state.activeClue = index;
    if (window.matchMedia?.("(max-width: 800px) and (orientation: portrait)").matches) state.cluesOpen = false;
    return render();
  }
  if (action === "review-clue") {
    const index = Number(button.dataset.index);
    state.reviewed = state.reviewed.includes(index) ? state.reviewed.filter((value) => value !== index) : [...state.reviewed, index];
    saveActive();
    return render();
  }
  if (action === "undo") return undo();
  if (action === "notes") { state.noteMode = !state.noteMode; return render(); }
  if (action === "hint") return useHint();
  if (action === "verify") {
    if (state.readyToAccuse) { state.accusationOpen = true; state.conclusionError = false; return render(); }
    return checkSolution();
  }
  if (action === "select-accused") { state.accused = button.dataset.person; return render(); }
  if (action === "confirm-accusation") return finishCase();
  if (action === "close-accusation") { state.accusationOpen = false; state.conclusionError = false; return render(); }
  if (action === "edit-board") {
    state.accusationOpen = false;
    state.conclusionError = false;
    state.accused = null;
    state.readyToAccuse = false;
    saveActive();
    return render();
  }
  if (action === "return-to-board") {
    state.accusationOpen = false;
    state.conclusionError = false;
    state.accused = null;
    if (currentCase().isFinalAccusation) state.cluesOpen = true;
    return render();
  }
  if (action === "continue-after-result") return completeCaseAndContinue();
  if (action === "open-clues") { playSound("clueOpen"); state.cluesOpen = true; return render(); }
  if (action === "close-clues") { state.cluesOpen = false; return render(); }
  if (action === "settings") { state.settingsOpen = true; state.resetArmed = false; return render(); }
  if (action === "close-settings") {
    window.clearTimeout(resetHoldTimer);
    resetHoldTimer = null;
    state.settingsOpen = false;
    state.resetArmed = false;
    state.resetHolding = false;
    return render();
  }
  if (action === "reset-progress") return armProgressReset();
  if (action === "toggle-sound") {
    state.soundEnabled = button.checked;
    saveAudioPreference();
    if (state.soundEnabled) playSound("uiClick");
    return render();
  }
  if (action === "tutorial-next") {
    if (state.tutorialStep === 3) {
      state.tutorialStep = 4;
      saveActive();
    } else {
      state.tutorialStep = 0;
      persist({ ...state.progress, tutorialComplete: true, active: state.progress.active ? { ...state.progress.active, tutorialStep: 0 } : null });
    }
    return render();
  }
  if (action === "replay") return startCase(state.currentCaseId);
  if (action === "next-case") {
    if (state.currentCaseId === 12) return changeScreen("chapter-complete");
    state.currentCaseId += 1;
    return changeScreen("intro");
  }
}

function changeScreen(screen) {
  window.clearTimeout(resetHoldTimer);
  resetHoldTimer = null;
  state.resetArmed = false;
  state.resetHolding = false;
  state.screen = screen;
  if (screen === "archive") state.archiveRange = state.progress.lastArchiveRange ?? 0;
  state.openChapterId = null;
  state.caseIntroOpen = false;
  state.materialOpen = null;
  state.completedCasesOpen = false;
  state.settingsOpen = false;
  state.cluesOpen = false;
  state.accusationOpen = false;
  state.conclusionError = false;
  window.scrollTo({ top: 0 });
  render();
}

function boot() {
  root = document.querySelector("#game-root");
  loadLocalProgress();
  state.archiveRange = state.progress.lastArchiveRange ?? 0;
  render();
  window.setTimeout(() => { state.splash = false; render(); }, 650);
  window.setInterval(() => {
    if (state.screen !== "game") return;
    state.elapsed += 1;
    const timer = document.querySelector(".timer-value");
    if (timer) timer.textContent = formatTime(state.elapsed);
  }, 1000);
  root.addEventListener("click", (event) => {
    const resetButton = event.target.closest('[data-action="reset-progress"]');
    if (resetButton && suppressResetClick) {
      suppressResetClick = false;
      event.preventDefault();
      return;
    }
    if (event.target.closest("[data-stop-click]")) {
      const nestedButton = event.target.closest("button[data-action]");
      if (nestedButton) {
        if (!["select-clue", "open-clues", "open-dossier", "open-case", "open-current-case", "open-material", "open-material-picker", "open-chapter-description", "open-completed-cases", "toggle-sound"].includes(nestedButton.dataset.action)) playSound("uiClick");
        handleAction(nestedButton);
      }
      return;
    }
    const button = event.target.closest("[data-action]");
    if (button) {
      if (!["select-clue", "open-clues", "open-dossier", "open-case", "open-current-case", "open-material", "open-material-picker", "open-chapter-description", "open-completed-cases", "toggle-sound"].includes(button.dataset.action)) playSound("uiClick");
      handleAction(button);
    } else if (state.screen === "game" && state.selectedPerson && !state.readyToAccuse) {
      state.selectedPerson = null;
      render();
    }
  });
  root.addEventListener("pointerdown", (event) => {
    const button = event.target.closest('[data-action="reset-progress"]');
    if (!button || !state.resetArmed) return;
    event.preventDefault();
    beginProgressResetHold(button);
  });
  root.addEventListener("pointerup", (event) => {
    if (state.resetHolding && event.target.closest('[data-action="reset-progress"]')) cancelProgressResetHold();
  });
  root.addEventListener("pointercancel", () => cancelProgressResetHold());
  root.addEventListener("pointerout", (event) => {
    const button = event.target.closest('[data-action="reset-progress"]');
    if (button && !button.contains(event.relatedTarget)) cancelProgressResetHold();
  });
  window.addEventListener("blur", () => cancelProgressResetHold());
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || state.screen !== "game" || !state.selectedPerson || state.accusationOpen || state.settingsOpen) return;
    state.selectedPerson = null;
    render();
  });
  initYandexSdk();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
}

// The game intentionally uses a classic script so index.html also works when
// opened directly from the file system (file://), without a local web server.
// The API is exposed only to support the Node regression tests.
if (typeof globalThis !== "undefined") {
  globalThis.__detectiveSudokuTestApi = { cases, countSolutions, validateAllCases };
}
