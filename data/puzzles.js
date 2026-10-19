/* Twelve authored scenes. Edit tools/author-scenes.mjs, then validate. */
globalThis.DS.puzzles = [
  {
    "id": "bookshop",
    "number": 1,
    "title": {
      "ru": "Книжная лавка",
      "en": "The Bookshop"
    },
    "location": {
      "ru": "Книжная лавка",
      "en": "The Bookshop"
    },
    "difficulty": 0,
    "size": 5,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Книги",
          "en": "Books"
        },
        "themeColor": "#eadcc3",
        "cells": [
          0,
          1,
          2,
          5,
          6,
          7
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Касса",
          "en": "Checkout"
        },
        "themeColor": "#d7e6e9",
        "cells": [
          3,
          4,
          8,
          9
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Читальня",
          "en": "Reading nook"
        },
        "themeColor": "#dbe6d1",
        "cells": [
          10,
          11,
          12,
          15,
          16,
          17,
          20,
          21,
          22
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Склад",
          "en": "Storeroom"
        },
        "themeColor": "#e8d6cf",
        "cells": [
          13,
          14,
          18,
          19,
          23,
          24
        ]
      }
    ],
    "objects": [
      {
        "id": "armchair",
        "type": "chair",
        "row": 0,
        "col": 0,
        "name": {
          "ru": "кресло у витрины",
          "en": "window armchair"
        },
        "occupiable": true
      },
      {
        "id": "checkout",
        "type": "register",
        "row": 1,
        "col": 4,
        "name": {
          "ru": "кассовая стойка",
          "en": "checkout counter"
        },
        "occupiable": false
      },
      {
        "id": "palm",
        "type": "plant",
        "row": 2,
        "col": 0,
        "name": {
          "ru": "большая пальма",
          "en": "large palm"
        },
        "occupiable": false
      },
      {
        "id": "cabinet",
        "type": "shelf",
        "row": 3,
        "col": 3,
        "name": {
          "ru": "шкаф редких книг",
          "en": "rare-book cabinet"
        },
        "occupiable": false
      },
      {
        "id": "desk",
        "type": "table",
        "row": 4,
        "col": 4,
        "name": {
          "ru": "упаковочный стол",
          "en": "packing table"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Анна",
          "en": "Anna"
        },
        "avatar": "assets/avatars/portrait-01.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "armchair",
            "text": {
              "ru": "Анна сидела в кресле у витрины.",
              "en": "Anna sat in the window armchair."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Анна сидела в кресле у витрины.",
          "en": "Anna sat in the window armchair."
        }
      },
      {
        "name": {
          "ru": "Борис",
          "en": "Boris"
        },
        "avatar": "assets/avatars/portrait-02.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Борис находился у кассы.",
              "en": "Boris was in the checkout area."
            },
            "subject": "s1"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "checkout",
            "text": {
              "ru": "Борис стоял рядом с кассовой стойкой.",
              "en": "Boris stood beside the checkout counter."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Борис — у кассы, рядом с кассовой стойкой.",
          "en": "Boris was in the checkout area, beside the counter."
        }
      },
      {
        "name": {
          "ru": "Виктор",
          "en": "Victor"
        },
        "avatar": "assets/avatars/portrait-03.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Виктор находился в читальне.",
              "en": "Victor was in the reading nook."
            },
            "subject": "s2"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "palm",
            "text": {
              "ru": "Виктор стоял рядом с большой пальмой.",
              "en": "Victor stood beside the large palm."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Виктор — в читальне, рядом с большой пальмой.",
          "en": "Victor was in the reading nook, beside the large palm."
        }
      },
      {
        "name": {
          "ru": "Даша",
          "en": "Dasha"
        },
        "avatar": "assets/avatars/portrait-04.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Даша находилась на складе.",
              "en": "Dasha was in the storeroom."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "cabinet",
            "text": {
              "ru": "Даша стояла рядом со шкафом редких книг.",
              "en": "Dasha stood beside the rare-book cabinet."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Даша — на складе, рядом со шкафом редких книг.",
          "en": "Dasha was in the storeroom, beside the rare-book cabinet."
        }
      },
      {
        "name": {
          "ru": "Елена",
          "en": "Elena"
        },
        "avatar": "assets/avatars/portrait-05.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Елена находилась в читальне.",
              "en": "Elena was in the reading nook."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s2",
            "text": {
              "ru": "Елена находилась южнее, чем Виктор.",
              "en": "Elena was south of Victor."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Елена — в читальне, южнее Виктора.",
          "en": "Elena was in the reading nook, south of Victor."
        }
      }
    ],
    "solution": {
      "s0": 0,
      "s1": 8,
      "s2": 11,
      "s3": 19,
      "s4": 22
    },
    "victimId": "s2",
    "killerId": "s4",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s2",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "После закрытия лавки погиб её владелец. Восстановите расположение посетителей и найдите того, кто остался с ним наедине.",
      "en": "The owner died after closing time. Reconstruct the visitors’ positions and find who was alone with him."
    },
    "hints": [
      {
        "ru": "Кресло задаёт первое положение. После этого сравните две клетки рядом с кассовой стойкой.",
        "en": "The armchair gives you a starting point. Then compare the cells beside the checkout counter."
      },
      {
        "ru": "Пальма стоит у края читальни. Сравните соседние места с уже размещённой Анной.",
        "en": "The palm is at the reading nook’s edge. Compare the neighboring places with Anna’s position."
      },
      {
        "ru": "Сравните соседей шкафа с положением Анны и Бориса. Елена должна остаться в читальне южнее Виктора.",
        "en": "Compare the cabinet’s neighbors with Anna and Boris. Elena must stay in the reading nook, south of Viktor."
      }
    ],
    "art": {
      "icon": "shelf",
      "theme": "#ad8051",
      "floor": "boards"
    },
    "authored": true
  },
  {
    "id": "cafe",
    "number": 2,
    "title": {
      "ru": "Кафе на углу",
      "en": "Corner Café"
    },
    "location": {
      "ru": "Кафе на углу",
      "en": "Corner Café"
    },
    "difficulty": 0,
    "size": 5,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Терраса",
          "en": "Terrace"
        },
        "themeColor": "#e9dfc7",
        "cells": [
          0,
          1,
          5,
          6
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Кухня",
          "en": "Kitchen"
        },
        "themeColor": "#d5e4d5",
        "cells": [
          2,
          3,
          4,
          7,
          8,
          9
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Бар",
          "en": "Bar"
        },
        "themeColor": "#d2e2e8",
        "cells": [
          10,
          11,
          15,
          16,
          20,
          21
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Зал",
          "en": "Dining room"
        },
        "themeColor": "#eee2d2",
        "cells": [
          12,
          13,
          14,
          17,
          18,
          19,
          22,
          23,
          24
        ]
      }
    ],
    "objects": [
      {
        "id": "seat",
        "type": "bench",
        "row": 1,
        "col": 0,
        "name": {
          "ru": "скамья на террасе",
          "en": "terrace bench"
        },
        "occupiable": true
      },
      {
        "id": "coffee",
        "type": "coffee",
        "row": 0,
        "col": 2,
        "name": {
          "ru": "кофемашина",
          "en": "coffee machine"
        },
        "occupiable": false
      },
      {
        "id": "bar",
        "type": "bar",
        "row": 3,
        "col": 0,
        "name": {
          "ru": "барная стойка",
          "en": "bar counter"
        },
        "occupiable": false
      },
      {
        "id": "piano",
        "type": "piano",
        "row": 2,
        "col": 3,
        "name": {
          "ru": "пианино",
          "en": "piano"
        },
        "occupiable": false
      },
      {
        "id": "sofa",
        "type": "sofa",
        "row": 4,
        "col": 4,
        "name": {
          "ru": "диван у стены",
          "en": "wall sofa"
        },
        "occupiable": true
      },
      {
        "id": "stool",
        "type": "stool",
        "row": 4,
        "col": 0,
        "name": {
          "ru": "стул у барной стойки",
          "en": "bar chair"
        },
        "occupiable": true
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Феликс",
          "en": "Felix"
        },
        "avatar": "assets/avatars/portrait-06.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Феликс находился на кухне.",
              "en": "Felix was in the kitchen."
            },
            "subject": "s0"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "coffee",
            "text": {
              "ru": "Феликс стоял рядом с кофемашиной.",
              "en": "Felix stood beside the coffee machine."
            },
            "subject": "s0"
          },
          {
            "type": "NORTH_OF",
            "target": "s1",
            "text": {
              "ru": "Феликс находился севернее, чем Галина.",
              "en": "Felix was north of Galina."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Феликс — на кухне, рядом с кофемашиной и севернее Галины.",
          "en": "Felix was in the kitchen, beside the coffee machine and north of Galina."
        }
      },
      {
        "name": {
          "ru": "Галина",
          "en": "Galina"
        },
        "avatar": "assets/avatars/portrait-07.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "seat",
            "text": {
              "ru": "Галина сидела на скамье на террасе.",
              "en": "Galina sat on the terrace bench."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Галина сидела на скамье на террасе.",
          "en": "Galina sat on the terrace bench."
        }
      },
      {
        "name": {
          "ru": "Игорь",
          "en": "Igor"
        },
        "avatar": "assets/avatars/portrait-08.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Игорь находился в зале.",
              "en": "Igor was in the dining room."
            },
            "subject": "s2"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "piano",
            "text": {
              "ru": "Игорь стоял рядом с пианино.",
              "en": "Igor stood beside the piano."
            },
            "subject": "s2"
          },
          {
            "type": "EAST_OF",
            "object": "piano",
            "text": {
              "ru": "Игорь находился восточнее пианино.",
              "en": "Igor was east of the piano."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Игорь — в зале, рядом с пианино, с его восточной стороны.",
          "en": "Igor was in the dining room, beside the piano on its eastern side."
        }
      },
      {
        "name": {
          "ru": "Кира",
          "en": "Kira"
        },
        "avatar": "assets/avatars/portrait-09.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Кира находилась в баре.",
              "en": "Kira was in the bar area."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "bar",
            "text": {
              "ru": "Кира стояла рядом с барной стойкой.",
              "en": "Kira stood beside the bar counter."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Кира — в баре, рядом с барной стойкой.",
          "en": "Kira was in the bar area, beside the counter."
        }
      },
      {
        "name": {
          "ru": "Лев",
          "en": "Lev"
        },
        "avatar": "assets/avatars/portrait-10.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Лев находился в зале.",
              "en": "Lev was in the dining room."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s2",
            "text": {
              "ru": "Лев находился южнее, чем Игорь.",
              "en": "Lev was south of Igor."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Лев — в зале, южнее Игоря.",
          "en": "Lev was in the dining room, south of Igor."
        }
      }
    ],
    "solution": {
      "s0": 3,
      "s1": 5,
      "s2": 14,
      "s3": 16,
      "s4": 22
    },
    "victimId": "s2",
    "killerId": "s4",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s2",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "Перед закрытием кафе погиб пианист. Каждый свидетель помнит лишь часть расположения гостей.",
      "en": "A pianist died before the café closed. Each witness remembers only part of the guests’ arrangement."
    },
    "hints": [
      {
        "ru": "Начните со скамьи. Сравните кухню с положением Галины.",
        "en": "Start with the bench. Compare the kitchen with Galina’s position."
      },
      {
        "ru": "Сравните места у барной стойки с положением Галины: Кира не может стоять с ней на одной вертикали.",
        "en": "Compare the places beside the bar with Galina: Kira cannot share her column."
      },
      {
        "ru": "После размещения Киры и Феликса проверьте восточную сторону пианино. Для Льва останется место южнее Игоря.",
        "en": "After placing Kira and Felix, check the eastern side of the piano. Lev needs a space south of Igor."
      }
    ],
    "art": {
      "icon": "coffee",
      "theme": "#9c6860",
      "floor": "tiles"
    },
    "authored": true
  },
  {
    "id": "garden",
    "number": 3,
    "title": {
      "ru": "Ботанический сад",
      "en": "Botanical Garden"
    },
    "location": {
      "ru": "Ботанический сад",
      "en": "Botanical Garden"
    },
    "difficulty": 0,
    "size": 5,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Оранжерея",
          "en": "Greenhouse"
        },
        "themeColor": "#d5e3cf",
        "cells": [
          0,
          1,
          2,
          5,
          6,
          7
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Пруд",
          "en": "Pond"
        },
        "themeColor": "#d2e5e9",
        "cells": [
          3,
          4,
          8,
          9,
          14
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Аллея",
          "en": "Walkway"
        },
        "themeColor": "#e8dfc6",
        "cells": [
          10,
          11,
          15,
          16,
          20,
          21
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Розарий",
          "en": "Rose garden"
        },
        "themeColor": "#ebd5d5",
        "cells": [
          12,
          13,
          17,
          18,
          22,
          23
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Беседка",
          "en": "Gazebo"
        },
        "themeColor": "#e8e0d6",
        "cells": [
          19,
          24
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 0,
        "col": 1,
        "name": {
          "ru": "кресло садовника",
          "en": "gardener’s armchair"
        },
        "occupiable": true
      },
      {
        "id": "fountain",
        "type": "fountain",
        "row": 1,
        "col": 3,
        "name": {
          "ru": "фонтан у пруда",
          "en": "pond fountain"
        },
        "occupiable": false
      },
      {
        "id": "statue",
        "type": "statue",
        "row": 2,
        "col": 3,
        "name": {
          "ru": "статуя в розарии",
          "en": "rose-garden statue"
        },
        "occupiable": false
      },
      {
        "id": "tree",
        "type": "tree",
        "row": 3,
        "col": 1,
        "name": {
          "ru": "старый дуб",
          "en": "old oak"
        },
        "occupiable": false
      },
      {
        "id": "bench",
        "type": "bench",
        "row": 4,
        "col": 4,
        "name": {
          "ru": "скамья в беседке",
          "en": "gazebo bench"
        },
        "occupiable": true
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Марина",
          "en": "Marina"
        },
        "avatar": "assets/avatars/portrait-11.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Марина сидела в кресле садовника.",
              "en": "Marina sat in the gardener’s armchair."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Марина сидела в кресле садовника.",
          "en": "Marina sat in the gardener’s armchair."
        }
      },
      {
        "name": {
          "ru": "Никита",
          "en": "Nikita"
        },
        "avatar": "assets/avatars/portrait-12.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Никита находился у пруда.",
              "en": "Nikita was in the pond area."
            },
            "subject": "s1"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "fountain",
            "text": {
              "ru": "Никита стоял рядом с фонтаном.",
              "en": "Nikita stood beside the fountain."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Никита — у пруда, рядом с фонтаном.",
          "en": "Nikita was in the pond area, beside the fountain."
        }
      },
      {
        "name": {
          "ru": "Олег",
          "en": "Oleg"
        },
        "avatar": "assets/avatars/portrait-13.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Олег находился в розарии.",
              "en": "Oleg was in the rose garden."
            },
            "subject": "s2"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "statue",
            "text": {
              "ru": "Олег стоял рядом со статуей.",
              "en": "Oleg stood beside the statue."
            },
            "subject": "s2"
          },
          {
            "type": "NORTH_OF",
            "target": "s3",
            "text": {
              "ru": "Олег находился севернее, чем Полина.",
              "en": "Oleg was north of Polina."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Олег — в розарии, рядом со статуей и севернее Полины.",
          "en": "Oleg was in the rose garden, beside the statue and north of Polina."
        }
      },
      {
        "name": {
          "ru": "Полина",
          "en": "Polina"
        },
        "avatar": "assets/avatars/portrait-14.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Полина находилась на аллее.",
              "en": "Polina was on the walkway."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "tree",
            "text": {
              "ru": "Полина стояла рядом со старым дубом.",
              "en": "Polina stood beside the old oak."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Полина — на аллее, рядом со старым дубом.",
          "en": "Polina was on the walkway, beside the old oak."
        }
      },
      {
        "name": {
          "ru": "Роман",
          "en": "Roman"
        },
        "avatar": "assets/avatars/portrait-15.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Роман находился в розарии.",
              "en": "Roman was in the rose garden."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s2",
            "text": {
              "ru": "Роман находился южнее, чем Олег.",
              "en": "Roman was south of Oleg."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Роман — в розарии, южнее Олега.",
          "en": "Roman was in the rose garden, south of Oleg."
        }
      }
    ],
    "solution": {
      "s0": 1,
      "s1": 9,
      "s2": 12,
      "s3": 15,
      "s4": 23
    },
    "victimId": "s2",
    "killerId": "s4",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s2",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "Во время вечерней прогулки погиб ботаник. Растения и садовые скульптуры помогут восстановить сцену.",
      "en": "A botanist died during an evening walk. Plants and garden sculptures help reconstruct the scene."
    },
    "hints": [
      {
        "ru": "Кресло и граница пруда дают первые ориентиры.",
        "en": "The armchair and the pond boundary give the first landmarks."
      },
      {
        "ru": "Сравните соседей дуба с положением Марины: Полина не может стоять с ней на одной вертикали.",
        "en": "Compare the oak’s neighbors with Marina: Polina cannot share her column."
      },
      {
        "ru": "Положение Полины ограничивает соседей статуи с юга. Затем сопоставьте место Романа с розарием.",
        "en": "Polina’s position rules out a southern neighbor of the statue. Then compare Roman’s position with the rose garden."
      }
    ],
    "art": {
      "icon": "tree",
      "theme": "#718d6b",
      "floor": "stone"
    },
    "authored": true
  },
  {
    "id": "antiques",
    "number": 4,
    "title": {
      "ru": "Антикварная лавка",
      "en": "Antique Shop"
    },
    "location": {
      "ru": "Антикварная лавка",
      "en": "Antique Shop"
    },
    "difficulty": 1,
    "size": 5,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Витрины",
          "en": "Showroom"
        },
        "themeColor": "#eadfca",
        "cells": [
          0,
          1,
          2,
          5,
          6,
          7
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Аукцион",
          "en": "Auction room"
        },
        "themeColor": "#e2d9ea",
        "cells": [
          3,
          4,
          8,
          9,
          13,
          14
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Мастерская",
          "en": "Workshop"
        },
        "themeColor": "#d8e4df",
        "cells": [
          10,
          11,
          12,
          15,
          16,
          17,
          20,
          21
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Кладовая",
          "en": "Storage"
        },
        "themeColor": "#d4e1e9",
        "cells": [
          18,
          19,
          22,
          23,
          24
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 1,
        "col": 1,
        "name": {
          "ru": "бархатное кресло",
          "en": "velvet armchair"
        },
        "occupiable": true
      },
      {
        "id": "clock",
        "type": "clock",
        "row": 0,
        "col": 3,
        "name": {
          "ru": "напольные часы",
          "en": "grandfather clock"
        },
        "occupiable": false
      },
      {
        "id": "shelf",
        "type": "shelf",
        "row": 3,
        "col": 1,
        "name": {
          "ru": "шкаф реставратора",
          "en": "restorer’s cabinet"
        },
        "occupiable": false
      },
      {
        "id": "display",
        "type": "display",
        "row": 4,
        "col": 3,
        "name": {
          "ru": "витрина серебра",
          "en": "silver display"
        },
        "occupiable": false
      },
      {
        "id": "statue",
        "type": "statue",
        "row": 2,
        "col": 2,
        "name": {
          "ru": "бронзовый бюст",
          "en": "bronze bust"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "София",
          "en": "Sofia"
        },
        "avatar": "assets/avatars/portrait-16.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "София находилась в аукционном зале.",
              "en": "Sofia was in the auction room."
            },
            "subject": "s0"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "clock",
            "text": {
              "ru": "София стояла рядом с напольными часами.",
              "en": "Sofia stood beside the grandfather clock."
            },
            "subject": "s0"
          },
          {
            "type": "NORTH_OF",
            "target": "s1",
            "text": {
              "ru": "София находилась севернее, чем Тимур.",
              "en": "Sofia was north of Timur."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "София — в аукционном зале, рядом с напольными часами и севернее Тимура.",
          "en": "Sofia was in the auction room, beside the grandfather clock and north of Timur."
        }
      },
      {
        "name": {
          "ru": "Тимур",
          "en": "Timur"
        },
        "avatar": "assets/avatars/portrait-17.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Тимур сидел в бархатном кресле.",
              "en": "Timur sat in the velvet armchair."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Тимур сидел в бархатном кресле.",
          "en": "Timur sat in the velvet armchair."
        }
      },
      {
        "name": {
          "ru": "Ульяна",
          "en": "Ulyana"
        },
        "avatar": "assets/avatars/portrait-18.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Ульяна находилась в аукционном зале.",
              "en": "Ulyana was in the auction room."
            },
            "subject": "s2"
          },
          {
            "type": "SOUTH_OF",
            "target": "s0",
            "text": {
              "ru": "Ульяна находилась южнее, чем София.",
              "en": "Ulyana was south of Sofia."
            },
            "subject": "s2"
          },
          {
            "type": "NORTH_OF",
            "target": "s3",
            "text": {
              "ru": "Ульяна находилась севернее, чем Фёдор.",
              "en": "Ulyana was north of Fyodor."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Ульяна — в аукционном зале, южнее Софии и севернее Фёдора.",
          "en": "Ulyana was in the auction room, south of Sofia and north of Fyodor."
        }
      },
      {
        "name": {
          "ru": "Фёдор",
          "en": "Fyodor"
        },
        "avatar": "assets/avatars/portrait-19.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Фёдор находился в мастерской.",
              "en": "Fyodor was in the workshop."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "shelf",
            "text": {
              "ru": "Фёдор стоял рядом со шкафом реставратора.",
              "en": "Fyodor stood beside the restorer’s cabinet."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Фёдор — в мастерской, рядом со шкафом реставратора.",
          "en": "Fyodor was in the workshop, beside the restorer’s cabinet."
        }
      },
      {
        "name": {
          "ru": "Яна",
          "en": "Yana"
        },
        "avatar": "assets/avatars/portrait-20.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Яна находилась в кладовой.",
              "en": "Yana was in storage."
            },
            "subject": "s4"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "display",
            "text": {
              "ru": "Яна стояла рядом с витриной серебра.",
              "en": "Yana stood beside the silver display."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Яна — в кладовой, рядом с витриной серебра.",
          "en": "Yana was in storage, beside the silver display."
        }
      }
    ],
    "solution": {
      "s0": 4,
      "s1": 6,
      "s2": 13,
      "s3": 15,
      "s4": 22
    },
    "victimId": "s0",
    "killerId": "s2",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s0",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "После небольшого аукциона погиб оценщик. Показания связывают людей с часами, креслом и мастерской.",
      "en": "An appraiser died after a small auction. Witnesses link the people to the clock, armchair and workshop."
    },
    "hints": [
      {
        "ru": "Сравните соседей часов с положением кресла.",
        "en": "Compare the clock’s neighbors with the armchair’s position."
      },
      {
        "ru": "Шкаф в мастерской помогает определить Фёдора; затем проверьте, кто находится между ним и Софией.",
        "en": "The workshop cabinet helps locate Fyodor; then check who is between him and Sofia."
      },
      {
        "ru": "После размещения Софии, Тимура и Ульяны сравните свободные места у витрины серебра. Одно из них подходит Яне.",
        "en": "After placing Sofia, Timur and Ulyana, compare the available places beside the silver display. One fits Yana."
      }
    ],
    "art": {
      "icon": "clock",
      "theme": "#a48060",
      "floor": "boards"
    },
    "authored": true
  },
  {
    "id": "hotel",
    "number": 5,
    "title": {
      "ru": "Загородный отель",
      "en": "Country Hotel"
    },
    "location": {
      "ru": "Загородный отель",
      "en": "Country Hotel"
    },
    "difficulty": 1,
    "size": 6,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Лобби",
          "en": "Lobby"
        },
        "themeColor": "#eadfc9",
        "cells": [
          0,
          1,
          2,
          6,
          7,
          8
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Ресепшен",
          "en": "Reception"
        },
        "themeColor": "#d2e3e8",
        "cells": [
          3,
          4,
          5,
          9,
          10,
          11
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Багажная",
          "en": "Luggage room"
        },
        "themeColor": "#dae4d6",
        "cells": [
          12,
          13,
          14,
          18,
          19,
          20
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Лаунж",
          "en": "Lounge"
        },
        "themeColor": "#e5d6e4",
        "cells": [
          15,
          16,
          17,
          21,
          22,
          23,
          27,
          28,
          29,
          33,
          34,
          35
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Номер",
          "en": "Guest room"
        },
        "themeColor": "#e8d5c8",
        "cells": [
          24,
          25,
          26,
          30,
          31,
          32
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 0,
        "col": 2,
        "name": {
          "ru": "кресло в лобби",
          "en": "lobby armchair"
        },
        "occupiable": true
      },
      {
        "id": "desk",
        "type": "reception",
        "row": 1,
        "col": 4,
        "name": {
          "ru": "стойка регистрации",
          "en": "reception desk"
        },
        "occupiable": false
      },
      {
        "id": "luggage",
        "type": "suitcase",
        "row": 2,
        "col": 1,
        "name": {
          "ru": "красный чемодан",
          "en": "red suitcase"
        },
        "occupiable": false
      },
      {
        "id": "piano",
        "type": "piano",
        "row": 3,
        "col": 4,
        "name": {
          "ru": "рояль в лаунже",
          "en": "lounge grand piano"
        },
        "occupiable": false
      },
      {
        "id": "bed",
        "type": "bed",
        "row": 4,
        "col": 1,
        "name": {
          "ru": "кровать у окна",
          "en": "window bed"
        },
        "occupiable": true
      },
      {
        "id": "plant",
        "type": "plant",
        "row": 5,
        "col": 5,
        "name": {
          "ru": "пальма в лаунже",
          "en": "lounge palm"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Ася",
          "en": "Asya"
        },
        "avatar": "assets/avatars/portrait-21.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Ася сидела в кресле в лобби.",
              "en": "Asya sat in the lobby armchair."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Ася сидела в кресле в лобби.",
          "en": "Asya sat in the lobby armchair."
        }
      },
      {
        "name": {
          "ru": "Вадим",
          "en": "Vadim"
        },
        "avatar": "assets/avatars/portrait-22.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Вадим находился у ресепшена.",
              "en": "Vadim was in reception."
            },
            "subject": "s1"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "desk",
            "text": {
              "ru": "Вадим стоял рядом со стойкой регистрации.",
              "en": "Vadim stood beside the reception desk."
            },
            "subject": "s1"
          },
          {
            "type": "EAST_OF",
            "object": "desk",
            "text": {
              "ru": "Вадим находился восточнее стойки.",
              "en": "Vadim was east of the desk."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Вадим — у ресепшена, рядом со стойкой регистрации, с её восточной стороны.",
          "en": "Vadim was in reception, beside the desk on its eastern side."
        }
      },
      {
        "name": {
          "ru": "Дина",
          "en": "Dina"
        },
        "avatar": "assets/avatars/portrait-23.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Дина находилась в багажной.",
              "en": "Dina was in the luggage room."
            },
            "subject": "s2"
          },
          {
            "type": "WEST_OF",
            "target": "s4",
            "text": {
              "ru": "Дина находилась западнее, чем Жанна.",
              "en": "Dina was west of Zhanna."
            },
            "subject": "s2"
          },
          {
            "type": "NORTH_OF",
            "target": "s3",
            "text": {
              "ru": "Дина находилась севернее, чем Егор.",
              "en": "Dina was north of Yegor."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Дина — в багажной, западнее Жанны и севернее Егора.",
          "en": "Dina was in the luggage room, west of Zhanna and north of Yegor."
        }
      },
      {
        "name": {
          "ru": "Егор",
          "en": "Yegor"
        },
        "avatar": "assets/avatars/portrait-24.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Егор находился в лаунже.",
              "en": "Yegor was in the lounge."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "piano",
            "text": {
              "ru": "Егор стоял рядом с роялем.",
              "en": "Yegor stood beside the grand piano."
            },
            "subject": "s3"
          },
          {
            "type": "NORTH_OF",
            "target": "s4",
            "text": {
              "ru": "Егор находился севернее, чем Жанна.",
              "en": "Yegor was north of Zhanna."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Егор — в лаунже, рядом с роялем и севернее Жанны.",
          "en": "Yegor was in the lounge, beside the piano and north of Zhanna."
        }
      },
      {
        "name": {
          "ru": "Жанна",
          "en": "Zhanna"
        },
        "avatar": "assets/avatars/portrait-25.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "bed",
            "text": {
              "ru": "Жанна сидела на кровати у окна.",
              "en": "Zhanna sat on the window bed."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Жанна сидела на кровати у окна.",
          "en": "Zhanna sat on the window bed."
        }
      },
      {
        "name": {
          "ru": "Зоя",
          "en": "Zoya"
        },
        "avatar": "assets/avatars/portrait-26.svg",
        "rules": [
          {
            "type": "SAME_ROOM",
            "target": "s3",
            "text": {
              "ru": "Зоя и Егор находились в одной зоне.",
              "en": "Zoya and Yegor shared a zone."
            },
            "subject": "s5"
          },
          {
            "type": "SOUTH_OF",
            "target": "s4",
            "text": {
              "ru": "Зоя находилась южнее, чем Жанна.",
              "en": "Zoya was south of Zhanna."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Зоя — в той же зоне, что Егор, но южнее Жанны.",
          "en": "Zoya shared Yegor’s zone, but was south of Zhanna."
        }
      }
    ],
    "solution": {
      "s0": 2,
      "s1": 11,
      "s2": 12,
      "s3": 21,
      "s4": 25,
      "s5": 34
    },
    "victimId": "s3",
    "killerId": "s5",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s3",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "В отеле погиб гость. Чемодан остался в багажной, а свидетели помнят взаимное положение людей.",
      "en": "A hotel guest died. A suitcase remains in the luggage room, and witnesses recall the people’s relative positions."
    },
    "hints": [
      {
        "ru": "Кресло и кровать задают два надёжных ориентира.",
        "en": "The armchair and bed give two reliable starting points."
      },
      {
        "ru": "Дина должна быть севернее Егора, а Егор — севернее Жанны. Сопоставьте эту цепочку с границами зон.",
        "en": "Dina must be north of Yegor, and Yegor north of Zhanna. Compare this chain with the zone boundaries."
      },
      {
        "ru": "Для Зои нужна та же зона, что для Егора, но южнее кровати.",
        "en": "Zoya needs Yegor’s zone, south of the bed."
      }
    ],
    "art": {
      "icon": "reception",
      "theme": "#8f6b80",
      "floor": "carpet"
    },
    "authored": true
  },
  {
    "id": "station",
    "number": 6,
    "title": {
      "ru": "Последний поезд",
      "en": "The Last Train"
    },
    "location": {
      "ru": "Последний поезд",
      "en": "The Last Train"
    },
    "difficulty": 2,
    "size": 6,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Ожидание",
          "en": "Waiting room"
        },
        "themeColor": "#e8dfcc",
        "cells": [
          0,
          1,
          2,
          6,
          7,
          8
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Перрон",
          "en": "Platform"
        },
        "themeColor": "#d6e1e5",
        "cells": [
          3,
          4,
          5,
          9,
          10,
          11,
          16,
          17
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Кассы",
          "en": "Ticket hall"
        },
        "themeColor": "#d9e5d8",
        "cells": [
          12,
          13,
          14,
          15,
          18,
          19,
          20,
          21
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Багаж",
          "en": "Baggage"
        },
        "themeColor": "#e5d4cb",
        "cells": [
          22,
          23,
          28,
          29,
          34,
          35
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Буфет",
          "en": "Buffet"
        },
        "themeColor": "#e8d7e0",
        "cells": [
          24,
          25,
          26,
          27,
          30,
          31,
          32,
          33
        ]
      }
    ],
    "objects": [
      {
        "id": "clock",
        "type": "clock",
        "row": 0,
        "col": 4,
        "name": {
          "ru": "вокзальные часы",
          "en": "station clock"
        },
        "occupiable": false
      },
      {
        "id": "bench",
        "type": "bench",
        "row": 1,
        "col": 1,
        "name": {
          "ru": "скамья ожидания",
          "en": "waiting bench"
        },
        "occupiable": true
      },
      {
        "id": "cart",
        "type": "trolley",
        "row": 2,
        "col": 2,
        "name": {
          "ru": "почтовая тележка",
          "en": "mail trolley"
        },
        "occupiable": false
      },
      {
        "id": "desk",
        "type": "register",
        "row": 3,
        "col": 1,
        "name": {
          "ru": "билетная касса",
          "en": "ticket counter"
        },
        "occupiable": false
      },
      {
        "id": "case",
        "type": "suitcase",
        "row": 4,
        "col": 5,
        "name": {
          "ru": "синий чемодан",
          "en": "blue suitcase"
        },
        "occupiable": false
      },
      {
        "id": "coffee",
        "type": "coffee",
        "row": 5,
        "col": 0,
        "name": {
          "ru": "кофемашина буфета",
          "en": "buffet coffee machine"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Илья",
          "en": "Ilya"
        },
        "avatar": "assets/avatars/portrait-27.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Илья находился на перроне.",
              "en": "Ilya was on the platform."
            },
            "subject": "s0"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "clock",
            "text": {
              "ru": "Илья стоял рядом с вокзальными часами.",
              "en": "Ilya stood beside the station clock."
            },
            "subject": "s0"
          },
          {
            "type": "EAST_OF",
            "object": "clock",
            "text": {
              "ru": "Илья находился восточнее часов.",
              "en": "Ilya was east of the clock."
            },
            "subject": "s0"
          },
          {
            "type": "NORTH_OF",
            "target": "s1",
            "text": {
              "ru": "Илья находился севернее, чем Лада.",
              "en": "Ilya was north of Lada."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Илья — на перроне, рядом с часами, с их восточной стороны; севернее Лады.",
          "en": "Ilya was on the platform, beside the clock on its eastern side; north of Lada."
        }
      },
      {
        "name": {
          "ru": "Лада",
          "en": "Lada"
        },
        "avatar": "assets/avatars/portrait-28.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "bench",
            "text": {
              "ru": "Лада сидела на скамье ожидания.",
              "en": "Lada sat on the waiting bench."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Лада сидела на скамье ожидания.",
          "en": "Lada sat on the waiting bench."
        }
      },
      {
        "name": {
          "ru": "Максим",
          "en": "Maxim"
        },
        "avatar": "assets/avatars/portrait-29.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Максим находился в кассовом зале.",
              "en": "Maxim was in the ticket hall."
            },
            "subject": "s2"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "cart",
            "text": {
              "ru": "Максим стоял рядом с почтовой тележкой.",
              "en": "Maxim stood beside the mail trolley."
            },
            "subject": "s2"
          },
          {
            "type": "NORTH_OF",
            "target": "s3",
            "text": {
              "ru": "Максим находился севернее, чем Нина.",
              "en": "Maxim was north of Nina."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Максим — в кассовом зале, рядом с почтовой тележкой и севернее Нины.",
          "en": "Maxim was in the ticket hall, beside the mail trolley and north of Nina."
        }
      },
      {
        "name": {
          "ru": "Нина",
          "en": "Nina"
        },
        "avatar": "assets/avatars/portrait-30.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Нина находилась в кассовом зале.",
              "en": "Nina was in the ticket hall."
            },
            "subject": "s3"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "desk",
            "text": {
              "ru": "Нина стояла рядом с билетной кассой.",
              "en": "Nina stood beside the ticket counter."
            },
            "subject": "s3"
          },
          {
            "type": "WEST_OF",
            "target": "s1",
            "text": {
              "ru": "Нина находилась западнее, чем Лада.",
              "en": "Nina was west of Lada."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Нина — в кассовом зале, рядом с билетной кассой и западнее Лады.",
          "en": "Nina was in the ticket hall, beside the counter and west of Lada."
        }
      },
      {
        "name": {
          "ru": "Павел",
          "en": "Pavel"
        },
        "avatar": "assets/avatars/portrait-31.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Павел находился в багажном отделении.",
              "en": "Pavel was in baggage."
            },
            "subject": "s4"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "case",
            "text": {
              "ru": "Павел стоял рядом с синим чемоданом.",
              "en": "Pavel stood beside the blue suitcase."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Павел — в багажном отделении, рядом с синим чемоданом.",
          "en": "Pavel was in baggage, beside the blue suitcase."
        }
      },
      {
        "name": {
          "ru": "Рита",
          "en": "Rita"
        },
        "avatar": "assets/avatars/portrait-32.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "E",
            "text": {
              "ru": "Рита находилась в буфете.",
              "en": "Rita was in the buffet."
            },
            "subject": "s5"
          },
          {
            "type": "SOUTH_OF",
            "target": "s3",
            "text": {
              "ru": "Рита находилась южнее, чем Нина.",
              "en": "Rita was south of Nina."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Рита — в буфете, южнее Нины.",
          "en": "Rita was in the buffet, south of Nina."
        }
      }
    ],
    "solution": {
      "s0": 5,
      "s1": 7,
      "s2": 15,
      "s3": 18,
      "s4": 28,
      "s5": 32
    },
    "victimId": "s2",
    "killerId": "s3",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s2",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "Ночью на станции погиб кассир. Последний поезд ещё не ушёл; восстановите расположение оставшихся людей.",
      "en": "A ticket clerk died at night. The last train has not departed; reconstruct where the remaining people were."
    },
    "hints": [
      {
        "ru": "Скамья и часы определяют северную часть плана. У часов важно учесть сторону.",
        "en": "The bench and clock locate the northern part of the plan. The side of the clock matters."
      },
      {
        "ru": "Сначала сопоставьте билетную кассу с положением Лады. Тогда условие Максима станет сильнее.",
        "en": "First compare the ticket counter with Lada’s position. Maxim’s clue then becomes stronger."
      },
      {
        "ru": "Синий чемодан связан только с багажным отделением. Исключите столбцы, уже занятые на перроне.",
        "en": "The blue suitcase belongs to baggage. Exclude columns already occupied on the platform."
      }
    ],
    "art": {
      "icon": "clock",
      "theme": "#69838d",
      "floor": "boards"
    },
    "authored": true
  },
  {
    "id": "gallery",
    "number": 7,
    "title": {
      "ru": "Ночная галерея",
      "en": "Gallery After Dark"
    },
    "location": {
      "ru": "Ночная галерея",
      "en": "Gallery After Dark"
    },
    "difficulty": 2,
    "size": 7,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Вестибюль",
          "en": "Vestibule"
        },
        "themeColor": "#e9dfcd",
        "cells": [
          0,
          1,
          2,
          3,
          7,
          8,
          9,
          10
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Скульптуры",
          "en": "Sculptures"
        },
        "themeColor": "#d5e2e8",
        "cells": [
          4,
          5,
          6,
          11,
          12,
          13,
          18,
          19,
          20
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Графика",
          "en": "Prints"
        },
        "themeColor": "#dbe5d5",
        "cells": [
          14,
          15,
          16,
          17,
          21,
          22,
          23,
          24
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Живопись",
          "en": "Paintings"
        },
        "themeColor": "#e7d7df",
        "cells": [
          25,
          26,
          27,
          31,
          32,
          33,
          34,
          38,
          39,
          40,
          41
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Ателье",
          "en": "Studio"
        },
        "themeColor": "#e6d9c6",
        "cells": [
          28,
          29,
          30,
          35,
          36,
          37,
          42,
          43,
          44
        ]
      },
      {
        "id": "F",
        "name": {
          "ru": "Кабинет",
          "en": "Office"
        },
        "themeColor": "#dce0eb",
        "cells": [
          45,
          46,
          47,
          48
        ]
      }
    ],
    "objects": [
      {
        "id": "bench",
        "type": "bench",
        "row": 0,
        "col": 3,
        "name": {
          "ru": "скамья у входа",
          "en": "entrance bench"
        },
        "occupiable": true
      },
      {
        "id": "register",
        "type": "register",
        "row": 1,
        "col": 1,
        "name": {
          "ru": "стойка билетов",
          "en": "ticket desk"
        },
        "occupiable": false
      },
      {
        "id": "statue",
        "type": "statue",
        "row": 2,
        "col": 5,
        "name": {
          "ru": "мраморная фигура",
          "en": "marble figure"
        },
        "occupiable": false
      },
      {
        "id": "table",
        "type": "table",
        "row": 3,
        "col": 3,
        "name": {
          "ru": "стол каталогов",
          "en": "catalog table"
        },
        "occupiable": false
      },
      {
        "id": "easel",
        "type": "easel",
        "row": 4,
        "col": 4,
        "name": {
          "ru": "мольберт",
          "en": "easel"
        },
        "occupiable": false
      },
      {
        "id": "tree",
        "type": "plant",
        "row": 5,
        "col": 0,
        "name": {
          "ru": "пальма в ателье",
          "en": "studio palm"
        },
        "occupiable": false
      },
      {
        "id": "sofa",
        "type": "sofa",
        "row": 6,
        "col": 6,
        "name": {
          "ru": "диван в кабинете",
          "en": "office sofa"
        },
        "occupiable": true
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Саша",
          "en": "Sasha"
        },
        "avatar": "assets/avatars/portrait-33.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "bench",
            "text": {
              "ru": "Саша сидела на скамье у входа.",
              "en": "Sasha sat on the entrance bench."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Саша сидела на скамье у входа.",
          "en": "Sasha sat on the entrance bench."
        }
      },
      {
        "name": {
          "ru": "Тарас",
          "en": "Taras"
        },
        "avatar": "assets/avatars/portrait-34.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "A",
            "text": {
              "ru": "Тарас находился в вестибюле.",
              "en": "Taras was in the vestibule."
            },
            "subject": "s1"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "register",
            "text": {
              "ru": "Тарас стоял рядом со стойкой билетов.",
              "en": "Taras stood beside the ticket desk."
            },
            "subject": "s1"
          },
          {
            "type": "WEST_OF",
            "object": "register",
            "text": {
              "ru": "Тарас находился западнее стойки.",
              "en": "Taras was west of the desk."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Тарас — в вестибюле, рядом со стойкой билетов, с её западной стороны.",
          "en": "Taras was in the vestibule, beside the ticket desk on its western side."
        }
      },
      {
        "name": {
          "ru": "Вера",
          "en": "Vera"
        },
        "avatar": "assets/avatars/portrait-35.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Вера находилась среди скульптур.",
              "en": "Vera was in the sculpture room."
            },
            "subject": "s2"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "statue",
            "text": {
              "ru": "Вера стояла рядом с мраморной фигурой.",
              "en": "Vera stood beside the marble figure."
            },
            "subject": "s2"
          },
          {
            "type": "EAST_OF",
            "object": "statue",
            "text": {
              "ru": "Вера находилась восточнее фигуры.",
              "en": "Vera was east of the figure."
            },
            "subject": "s2"
          },
          {
            "type": "SOUTH_OF",
            "target": "s1",
            "text": {
              "ru": "Вера находилась южнее, чем Тарас.",
              "en": "Vera was south of Taras."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Вера — среди скульптур, рядом с мраморной фигурой, с её восточной стороны; южнее Тараса.",
          "en": "Vera was in sculptures, beside the marble figure on its eastern side; south of Taras."
        }
      },
      {
        "name": {
          "ru": "Глеб",
          "en": "Gleb"
        },
        "avatar": "assets/avatars/portrait-36.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Глеб находился в зале графики.",
              "en": "Gleb was in the print room."
            },
            "subject": "s3"
          },
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Глеб находился не в углу своей зоны.",
              "en": "Gleb was not in a corner of his zone."
            },
            "subject": "s3"
          },
          {
            "type": "DISTANCE",
            "target": "s0",
            "value": 4,
            "text": {
              "ru": "Между Глебом и Сашей — четыре шага по сетке.",
              "en": "Gleb and Sasha were four grid steps apart."
            },
            "subject": "s3"
          },
          {
            "type": "SOUTH_OF",
            "target": "s2",
            "text": {
              "ru": "Глеб находился южнее, чем Вера.",
              "en": "Gleb was south of Vera."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Глеб — в зале графики, не в углу; южнее Веры и в четырёх шагах по сетке от Саши.",
          "en": "Gleb was in prints, not in a corner; south of Vera and four grid steps from Sasha."
        }
      },
      {
        "name": {
          "ru": "Инна",
          "en": "Inna"
        },
        "avatar": "assets/avatars/portrait-37.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Инна находилась в зале живописи.",
              "en": "Inna was in the painting room."
            },
            "subject": "s4"
          },
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Инна находилась не в углу своей зоны.",
              "en": "Inna was not in a corner of her zone."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s3",
            "text": {
              "ru": "Инна находилась южнее, чем Глеб.",
              "en": "Inna was south of Gleb."
            },
            "subject": "s4"
          },
          {
            "type": "NORTH_OF",
            "target": "s5",
            "text": {
              "ru": "Инна находилась севернее, чем Карл.",
              "en": "Inna was north of Karl."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Инна — в зале живописи, не в углу; южнее Глеба и севернее Карла.",
          "en": "Inna was in paintings, not in a corner; south of Gleb and north of Karl."
        }
      },
      {
        "name": {
          "ru": "Карл",
          "en": "Karl"
        },
        "avatar": "assets/avatars/portrait-38.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "E",
            "text": {
              "ru": "Карл находился в ателье.",
              "en": "Karl was in the studio."
            },
            "subject": "s5"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "tree",
            "text": {
              "ru": "Карл стоял рядом с пальмой в ателье.",
              "en": "Karl stood beside the studio palm."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Карл — в ателье, рядом с пальмой.",
          "en": "Karl was in the studio, beside the palm."
        }
      },
      {
        "name": {
          "ru": "Лина",
          "en": "Lina"
        },
        "avatar": "assets/avatars/portrait-39.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "F",
            "text": {
              "ru": "Лина находилась в кабинете.",
              "en": "Lina was in the office."
            },
            "subject": "s6"
          },
          {
            "type": "ALONE",
            "text": {
              "ru": "Лина была единственным человеком в своей зоне.",
              "en": "Lina was the only person in her zone."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Лина была в кабинете одна.",
          "en": "Lina was alone in the office."
        }
      }
    ],
    "solution": {
      "s0": 3,
      "s1": 7,
      "s2": 20,
      "s3": 23,
      "s4": 33,
      "s5": 36,
      "s6": 46
    },
    "victimId": "s0",
    "killerId": "s1",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s0",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "После закрытого показа погиб куратор. Свидетели запомнили направления и расстояния между посетителями.",
      "en": "A curator died after a private viewing. Witnesses recall directions and distances between visitors."
    },
    "hints": [
      {
        "ru": "Скамья, билетная стойка и мраморная фигура дают три опорных положения.",
        "en": "The bench, ticket desk and marble figure give three starting positions."
      },
      {
        "ru": "Для Глеба совместите расстояние до Саши с условием о Вере. Угловые клетки не подходят.",
        "en": "For Gleb, combine the distance from Sasha with Vera’s clue. Corner cells do not fit."
      },
      {
        "ru": "Положение Карла ограничивает Инну с юга. Мольберт занимает клетку, на которую нельзя поставить человека.",
        "en": "Karl’s position limits Inna from the south. The easel blocks a cell."
      }
    ],
    "art": {
      "icon": "easel",
      "theme": "#818772",
      "floor": "stone"
    },
    "authored": true
  },
  {
    "id": "theatre",
    "number": 8,
    "title": {
      "ru": "После занавеса",
      "en": "After the Curtain"
    },
    "location": {
      "ru": "После занавеса",
      "en": "After the Curtain"
    },
    "difficulty": 2,
    "size": 7,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Фойе",
          "en": "Foyer"
        },
        "themeColor": "#eadfc9",
        "cells": [
          0,
          1,
          2,
          7,
          8,
          9
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Сцена",
          "en": "Stage"
        },
        "themeColor": "#e8d4d3",
        "cells": [
          3,
          4,
          5,
          6,
          10,
          11,
          12,
          13,
          18,
          19,
          20
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Кулисы",
          "en": "Wings"
        },
        "themeColor": "#d6e1e8",
        "cells": [
          14,
          15,
          16,
          17,
          21,
          22,
          23,
          24
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Реквизит",
          "en": "Props"
        },
        "themeColor": "#e3dce9",
        "cells": [
          25,
          26,
          27,
          32,
          33,
          34,
          39,
          40,
          41,
          46,
          47,
          48
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Гримёрная",
          "en": "Dressing room"
        },
        "themeColor": "#dce6d4",
        "cells": [
          28,
          29,
          30,
          31,
          35,
          36,
          37,
          38,
          42,
          43,
          44,
          45
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 1,
        "col": 2,
        "name": {
          "ru": "кресло в фойе",
          "en": "foyer armchair"
        },
        "occupiable": true
      },
      {
        "id": "piano",
        "type": "piano",
        "row": 0,
        "col": 5,
        "name": {
          "ru": "рояль на сцене",
          "en": "stage piano"
        },
        "occupiable": false
      },
      {
        "id": "bench",
        "type": "bench",
        "row": 3,
        "col": 0,
        "name": {
          "ru": "скамья за кулисами",
          "en": "backstage bench"
        },
        "occupiable": true
      },
      {
        "id": "cart",
        "type": "trolley",
        "row": 5,
        "col": 2,
        "name": {
          "ru": "тележка реквизита",
          "en": "prop trolley"
        },
        "occupiable": false
      },
      {
        "id": "sofa",
        "type": "sofa",
        "row": 6,
        "col": 0,
        "name": {
          "ru": "гримёрный диван",
          "en": "dressing-room sofa"
        },
        "occupiable": true
      },
      {
        "id": "display",
        "type": "display",
        "row": 4,
        "col": 6,
        "name": {
          "ru": "шкаф костюмов",
          "en": "costume display"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Майя",
          "en": "Maya"
        },
        "avatar": "assets/avatars/portrait-40.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Майя находилась на сцене.",
              "en": "Maya was on stage."
            },
            "subject": "s0"
          },
          {
            "type": "NORTH_OF",
            "target": "s1",
            "text": {
              "ru": "Майя находилась севернее, чем Артём.",
              "en": "Maya was north of Artyom."
            },
            "subject": "s0"
          },
          {
            "type": "EAST_OF",
            "object": "piano",
            "text": {
              "ru": "Майя находилась восточнее рояля.",
              "en": "Maya was east of the piano."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Майя — на сцене, севернее Артёма и восточнее рояля.",
          "en": "Maya was on stage, north of Artyom and east of the piano."
        }
      },
      {
        "name": {
          "ru": "Артём",
          "en": "Artyom"
        },
        "avatar": "assets/avatars/portrait-41.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Артём сидел в кресле в фойе.",
              "en": "Artyom sat in the foyer armchair."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Артём сидел в кресле в фойе.",
          "en": "Artyom sat in the foyer armchair."
        }
      },
      {
        "name": {
          "ru": "Белла",
          "en": "Bella"
        },
        "avatar": "assets/avatars/portrait-42.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Белла находилась на сцене.",
              "en": "Bella was on stage."
            },
            "subject": "s2"
          },
          {
            "type": "CORNER_OF_ROOM",
            "room": "B",
            "text": {
              "ru": "Белла стояла в углу сцены.",
              "en": "Bella stood in a corner of the stage."
            },
            "subject": "s2"
          },
          {
            "type": "SOUTH_OF",
            "target": "s1",
            "text": {
              "ru": "Белла находилась южнее, чем Артём.",
              "en": "Bella was south of Artyom."
            },
            "subject": "s2"
          },
          {
            "type": "NORTH_OF",
            "target": "s3",
            "text": {
              "ru": "Белла находилась севернее, чем Денис.",
              "en": "Bella was north of Denis."
            },
            "subject": "s2"
          },
          {
            "type": "WEST_OF",
            "object": "piano",
            "text": {
              "ru": "Белла находилась западнее рояля.",
              "en": "Bella was west of the piano."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Белла — в углу сцены, южнее Артёма, севернее Дениса и западнее рояля.",
          "en": "Bella was in a stage corner, south of Artyom, north of Denis and west of the piano."
        }
      },
      {
        "name": {
          "ru": "Денис",
          "en": "Denis"
        },
        "avatar": "assets/avatars/portrait-43.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "bench",
            "text": {
              "ru": "Денис сидел на скамье за кулисами.",
              "en": "Denis sat on the backstage bench."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Денис сидел на скамье за кулисами.",
          "en": "Denis sat on the backstage bench."
        }
      },
      {
        "name": {
          "ru": "Эмма",
          "en": "Emma"
        },
        "avatar": "assets/avatars/portrait-44.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Эмма находилась среди реквизита.",
              "en": "Emma was in the prop room."
            },
            "subject": "s4"
          },
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Эмма находилась не в углу своей зоны.",
              "en": "Emma was not in a corner of her zone."
            },
            "subject": "s4"
          },
          {
            "type": "DISTANCE",
            "target": "s2",
            "value": 3,
            "text": {
              "ru": "Между Эммой и Беллой — три шага по сетке.",
              "en": "Emma and Bella were three grid steps apart."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Эмма — среди реквизита, не в углу; в трёх шагах по сетке от Беллы.",
          "en": "Emma was in props, not in a corner; three grid steps from Bella."
        }
      },
      {
        "name": {
          "ru": "Юрий",
          "en": "Yuri"
        },
        "avatar": "assets/avatars/portrait-45.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "E",
            "text": {
              "ru": "Юрий находился в гримёрной.",
              "en": "Yuri was in the dressing room."
            },
            "subject": "s5"
          },
          {
            "type": "BESIDE_OBJECT",
            "object": "cart",
            "text": {
              "ru": "Юрий стоял рядом с тележкой реквизита.",
              "en": "Yuri stood beside the prop trolley."
            },
            "subject": "s5"
          },
          {
            "type": "EAST_OF",
            "target": "s1",
            "text": {
              "ru": "Юрий находился восточнее, чем Артём.",
              "en": "Yuri was east of Artyom."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Юрий — в гримёрной, рядом с тележкой реквизита и восточнее Артёма.",
          "en": "Yuri was in the dressing room, beside the prop trolley and east of Artyom."
        }
      },
      {
        "name": {
          "ru": "Алина",
          "en": "Alina"
        },
        "avatar": "assets/avatars/portrait-46.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "E",
            "text": {
              "ru": "Алина находилась в гримёрной.",
              "en": "Alina was in the dressing room."
            },
            "subject": "s6"
          },
          {
            "type": "SOUTH_OF",
            "target": "s5",
            "text": {
              "ru": "Алина находилась южнее, чем Юрий.",
              "en": "Alina was south of Yuri."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Алина — в гримёрной, южнее Юрия.",
          "en": "Alina was in the dressing room, south of Yuri."
        }
      }
    ],
    "solution": {
      "s0": 6,
      "s1": 9,
      "s2": 18,
      "s3": 21,
      "s4": 33,
      "s5": 38,
      "s6": 43
    },
    "victimId": "s0",
    "killerId": "s2",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s0",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "После спектакля погибла актриса. На сцене и за кулисами остались семь человек; восстановите их места.",
      "en": "An actress died after the show. Seven people remained on stage and backstage; reconstruct their positions."
    },
    "hints": [
      {
        "ru": "Два места для сидения задают опору. Проверьте, какая часть сцены остаётся для Майи.",
        "en": "Two seats give you a starting point. Check which part of the stage remains for Maya."
      },
      {
        "ru": "Для Беллы важны сразу угол сцены и промежуток между Артёмом и Денисом.",
        "en": "Bella needs both a stage corner and a position between Artyom and Denis."
      },
      {
        "ru": "Расстояние до Беллы выбирает место Эммы. У тележки учитывайте границу гримёрной.",
        "en": "The distance from Bella determines Emma’s space. At the trolley, account for the dressing-room boundary."
      }
    ],
    "art": {
      "icon": "piano",
      "theme": "#a56768",
      "floor": "carpet"
    },
    "authored": true
  },
  {
    "id": "yacht",
    "number": 9,
    "title": {
      "ru": "Тихая гавань",
      "en": "Quiet Harbour"
    },
    "location": {
      "ru": "Тихая гавань",
      "en": "Quiet Harbour"
    },
    "difficulty": 3,
    "size": 7,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Трап",
          "en": "Gangway"
        },
        "themeColor": "#e6dcc9",
        "cells": [
          0,
          1,
          2,
          7,
          14,
          21
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Нос",
          "en": "Bow"
        },
        "themeColor": "#d4e4e8",
        "cells": [
          3,
          4,
          5,
          6,
          11,
          12,
          13
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Салон",
          "en": "Saloon"
        },
        "themeColor": "#e9ded2",
        "cells": [
          8,
          9,
          10,
          15,
          16,
          17,
          22,
          23,
          24,
          31
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Палуба",
          "en": "Deck"
        },
        "themeColor": "#dce6d5",
        "cells": [
          18,
          19,
          20,
          25,
          26,
          27,
          32,
          33,
          34
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Каюта",
          "en": "Cabin"
        },
        "themeColor": "#e3d6e5",
        "cells": [
          28,
          29,
          30,
          35,
          36,
          37,
          42,
          43,
          44
        ]
      },
      {
        "id": "F",
        "name": {
          "ru": "Рубка",
          "en": "Wheelhouse"
        },
        "themeColor": "#dce1ea",
        "cells": [
          38,
          39,
          40,
          41,
          45,
          46,
          47,
          48
        ]
      }
    ],
    "objects": [
      {
        "id": "bench",
        "type": "bench",
        "row": 1,
        "col": 0,
        "name": {
          "ru": "скамья у трапа",
          "en": "gangway bench"
        },
        "occupiable": true
      },
      {
        "id": "wheel",
        "type": "wheel",
        "row": 0,
        "col": 5,
        "name": {
          "ru": "якорная лебёдка",
          "en": "anchor winch"
        },
        "occupiable": false
      },
      {
        "id": "table",
        "type": "table",
        "row": 3,
        "col": 3,
        "name": {
          "ru": "стол в салоне",
          "en": "saloon table"
        },
        "occupiable": false
      },
      {
        "id": "bed",
        "type": "bed",
        "row": 6,
        "col": 0,
        "name": {
          "ru": "койка",
          "en": "bunk"
        },
        "occupiable": true
      },
      {
        "id": "bar",
        "type": "bar",
        "row": 5,
        "col": 6,
        "name": {
          "ru": "навигационная стойка",
          "en": "navigation counter"
        },
        "occupiable": false
      },
      {
        "id": "plant",
        "type": "plant",
        "row": 4,
        "col": 0,
        "name": {
          "ru": "растение у каюты",
          "en": "cabin plant"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Бруно",
          "en": "Bruno"
        },
        "avatar": "assets/avatars/portrait-47.svg",
        "rules": [
          {
            "type": "BESIDE_OBJECT",
            "object": "wheel",
            "text": {
              "ru": "Бруно стоял рядом с якорной лебёдкой.",
              "en": "Bruno stood beside the anchor winch."
            },
            "subject": "s0"
          },
          {
            "type": "WEST_OF",
            "object": "wheel",
            "text": {
              "ru": "Бруно находился западнее лебёдки.",
              "en": "Bruno was west of the winch."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Бруно стоял рядом с лебёдкой, с её западной стороны.",
          "en": "Bruno stood beside the winch, on its western side."
        }
      },
      {
        "name": {
          "ru": "Влада",
          "en": "Vlada"
        },
        "avatar": "assets/avatars/portrait-48.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "bench",
            "text": {
              "ru": "Влада сидела на скамье у трапа.",
              "en": "Vlada sat on the gangway bench."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Влада сидела на скамье у трапа.",
          "en": "Vlada sat on the gangway bench."
        }
      },
      {
        "name": {
          "ru": "Герман",
          "en": "Herman"
        },
        "avatar": "assets/avatars/portrait-49.svg",
        "rules": [
          {
            "type": "CORNER_OF_ROOM",
            "room": "D",
            "text": {
              "ru": "Герман стоял в углу палубы.",
              "en": "Herman stood in a corner of the deck."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Герман стоял в углу палубы.",
          "en": "Herman stood in a deck corner."
        }
      },
      {
        "name": {
          "ru": "Дарья",
          "en": "Darya"
        },
        "avatar": "assets/avatars/portrait-50.svg",
        "rules": [
          {
            "type": "DISTANCE",
            "object": "wheel",
            "value": 6,
            "text": {
              "ru": "Дарья находилась в шести шагах по сетке от якорной лебёдки.",
              "en": "Darya was six grid steps from the anchor winch."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Дарья находилась в шести шагах от лебёдки.",
          "en": "Darya was six steps from the winch."
        }
      },
      {
        "name": {
          "ru": "Ева",
          "en": "Eva"
        },
        "avatar": "assets/avatars/portrait-51.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "D",
            "text": {
              "ru": "Ева находилась на палубе.",
              "en": "Eva was on deck."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s3",
            "text": {
              "ru": "Ева находилась южнее, чем Дарья.",
              "en": "Eva was south of Darya."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Ева — на палубе, южнее Дарьи.",
          "en": "Eva was on deck, south of Darya."
        }
      },
      {
        "name": {
          "ru": "Захар",
          "en": "Zakhar"
        },
        "avatar": "assets/avatars/portrait-52.svg",
        "rules": [
          {
            "type": "WEST_OF",
            "target": "s3",
            "text": {
              "ru": "Захар находился западнее, чем Дарья.",
              "en": "Zakhar was west of Darya."
            },
            "subject": "s5"
          },
          {
            "type": "DISTANCE",
            "target": "s3",
            "value": 3,
            "text": {
              "ru": "Между Захаром и Дарьей — три шага по сетке.",
              "en": "Zakhar and Darya were three grid steps apart."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Захар — западнее Дарьи, в трёх шагах от неё.",
          "en": "Zakhar was west of Darya, three steps away."
        }
      },
      {
        "name": {
          "ru": "Ирина",
          "en": "Irina"
        },
        "avatar": "assets/avatars/portrait-53.svg",
        "rules": [
          {
            "type": "ALONE",
            "text": {
              "ru": "Ирина была единственным человеком в своей зоне.",
              "en": "Irina was the only person in her zone."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Ирина была единственным человеком в своей зоне.",
          "en": "Irina was the only person in her zone."
        }
      }
    ],
    "solution": {
      "s0": 4,
      "s1": 7,
      "s2": 20,
      "s3": 23,
      "s4": 33,
      "s5": 36,
      "s6": 45
    },
    "victimId": "s2",
    "killerId": "s4",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s2",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "На пришвартованной яхте погиб капитан. Узкие проходы и взаимные направления помогут проверить показания экипажа.",
      "en": "A captain died aboard a moored yacht. Narrow spaces and relative directions help check the crew’s accounts."
    },
    "hints": [
      {
        "ru": "Начните с Влады на скамье и Бруно у западной стороны лебёдки.",
        "en": "Start with Vlada on the bench and Bruno beside the western side of the winch."
      },
      {
        "ru": "Отсчитайте расстояние Дарьи от лебёдки. Места на одной линии с Владой и Бруно уже не подойдут.",
        "en": "Count Darya’s distance from the winch. Places in Vlada’s or Bruno’s row or column no longer fit."
      },
      {
        "ru": "От Дарьи перейдите к Захару, затем к Еве. Проверьте оставшиеся углы палубы для Германа.",
        "en": "Use Darya to place Zakhar, then Eva. Check the remaining deck corners for Herman."
      }
    ],
    "art": {
      "icon": "wheel",
      "theme": "#668d99",
      "floor": "boards"
    },
    "authored": true
  },
  {
    "id": "museum",
    "number": 10,
    "title": {
      "ru": "Закрытая экспозиция",
      "en": "Closed Exhibition"
    },
    "location": {
      "ru": "Закрытая экспозиция",
      "en": "Closed Exhibition"
    },
    "difficulty": 3,
    "size": 8,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Вход",
          "en": "Entrance"
        },
        "themeColor": "#e9decb",
        "cells": [
          0,
          1,
          2,
          3,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Античность",
          "en": "Antiquities"
        },
        "themeColor": "#e5d7c9",
        "cells": [
          4,
          5,
          6,
          7,
          12,
          13,
          14,
          15,
          20,
          21,
          22,
          23
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Мозаика",
          "en": "Mosaics"
        },
        "themeColor": "#d6e4d8",
        "cells": [
          16,
          17,
          18,
          19,
          24,
          25,
          26,
          27
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Астрономия",
          "en": "Astronomy"
        },
        "themeColor": "#d4dfeb",
        "cells": [
          28,
          29,
          30,
          31,
          36,
          37,
          38,
          39,
          44,
          45,
          46,
          47
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Архив",
          "en": "Archive"
        },
        "themeColor": "#e2d8e9",
        "cells": [
          32,
          33,
          34,
          35,
          40,
          41,
          42,
          43
        ]
      },
      {
        "id": "F",
        "name": {
          "ru": "Ателье",
          "en": "Studio"
        },
        "themeColor": "#e7ddca",
        "cells": [
          48,
          49,
          50,
          51,
          56,
          57,
          58,
          59
        ]
      },
      {
        "id": "G",
        "name": {
          "ru": "Фонд",
          "en": "Collection"
        },
        "themeColor": "#d4e2e2",
        "cells": [
          52,
          53,
          54,
          55,
          60,
          61,
          62,
          63
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 0,
        "col": 2,
        "name": {
          "ru": "кресло смотрителя",
          "en": "attendant’s armchair"
        },
        "occupiable": true
      },
      {
        "id": "statue",
        "type": "statue",
        "row": 3,
        "col": 1,
        "name": {
          "ru": "каменный лев",
          "en": "stone lion"
        },
        "occupiable": false
      },
      {
        "id": "scope",
        "type": "telescope",
        "row": 2,
        "col": 5,
        "name": {
          "ru": "старинный телескоп",
          "en": "antique telescope"
        },
        "occupiable": false
      },
      {
        "id": "bench",
        "type": "bench",
        "row": 6,
        "col": 0,
        "name": {
          "ru": "скамья реставратора",
          "en": "restorer’s bench"
        },
        "occupiable": true
      },
      {
        "id": "display",
        "type": "display",
        "row": 4,
        "col": 4,
        "name": {
          "ru": "витрина глобусов",
          "en": "globe display"
        },
        "occupiable": false
      },
      {
        "id": "shelf",
        "type": "shelf",
        "row": 5,
        "col": 0,
        "name": {
          "ru": "архивный шкаф",
          "en": "archive cabinet"
        },
        "occupiable": false
      },
      {
        "id": "cart",
        "type": "trolley",
        "row": 7,
        "col": 7,
        "name": {
          "ru": "тележка фонда",
          "en": "collection trolley"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Клим",
          "en": "Klim"
        },
        "avatar": "assets/avatars/portrait-54.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Клим сидел в кресле смотрителя.",
              "en": "Klim sat in the attendant’s armchair."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Клим сидел в кресле смотрителя.",
          "en": "Klim sat in the attendant’s armchair."
        }
      },
      {
        "name": {
          "ru": "Людмила",
          "en": "Lyudmila"
        },
        "avatar": "assets/avatars/portrait-55.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "B",
            "text": {
              "ru": "Людмила находилась в зале античности.",
              "en": "Lyudmila was in antiquities."
            },
            "subject": "s1"
          },
          {
            "type": "NORTH_OF",
            "target": "s2",
            "text": {
              "ru": "Людмила находилась севернее, чем Мирон.",
              "en": "Lyudmila was north of Miron."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Людмила — в зале античности, севернее Мирона.",
          "en": "Lyudmila was in antiquities, north of Miron."
        },
        "fieldName": {
          "ru": "Люда",
          "en": "Lyuda"
        }
      },
      {
        "name": {
          "ru": "Мирон",
          "en": "Miron"
        },
        "avatar": "assets/avatars/portrait-56.svg",
        "rules": [
          {
            "type": "WEST_OF",
            "object": "scope",
            "text": {
              "ru": "Мирон находился западнее телескопа.",
              "en": "Miron was west of the telescope."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Мирон — западнее телескопа.",
          "en": "Miron was west of the telescope."
        }
      },
      {
        "name": {
          "ru": "Нелли",
          "en": "Nelli"
        },
        "avatar": "assets/avatars/portrait-57.svg",
        "rules": [
          {
            "type": "BESIDE_OBJECT",
            "object": "statue",
            "text": {
              "ru": "Нелли стояла рядом с каменным львом.",
              "en": "Nelli stood beside the stone lion."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Нелли — рядом с каменным львом.",
          "en": "Nelli stood beside the stone lion."
        }
      },
      {
        "name": {
          "ru": "Орест",
          "en": "Orest"
        },
        "avatar": "assets/avatars/portrait-58.svg",
        "rules": [
          {
            "type": "DISTANCE",
            "target": "s2",
            "value": 4,
            "text": {
              "ru": "Между Орестом и Мироном — четыре шага по сетке.",
              "en": "Orest and Miron were four grid steps apart."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Орест — в четырёх шагах от Мирона.",
          "en": "Orest was four steps from Miron."
        }
      },
      {
        "name": {
          "ru": "Раиса",
          "en": "Raisa"
        },
        "avatar": "assets/avatars/portrait-59.svg",
        "rules": [
          {
            "type": "DISTANCE",
            "target": "s6",
            "value": 3,
            "text": {
              "ru": "Между Раисой и Степаном — три шага по сетке.",
              "en": "Raisa and Stepan were three grid steps apart."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Раиса — в трёх шагах от Степана.",
          "en": "Raisa was three steps from Stepan."
        }
      },
      {
        "name": {
          "ru": "Степан",
          "en": "Stepan"
        },
        "avatar": "assets/avatars/portrait-60.svg",
        "rules": [
          {
            "type": "BESIDE_OBJECT",
            "object": "bench",
            "text": {
              "ru": "Степан стоял рядом со скамьёй реставратора.",
              "en": "Stepan stood beside the restorer’s bench."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Степан — рядом со скамьёй реставратора.",
          "en": "Stepan stood beside the restorer’s bench."
        }
      },
      {
        "name": {
          "ru": "Таисия",
          "en": "Taisia"
        },
        "avatar": "assets/avatars/portrait-61.svg",
        "rules": [
          {
            "type": "SOUTH_OF",
            "target": "s6",
            "text": {
              "ru": "Таисия находилась южнее, чем Степан.",
              "en": "Taisia was south of Stepan."
            },
            "subject": "s7"
          }
        ],
        "id": "s7",
        "clueText": {
          "ru": "Таисия — южнее Степана.",
          "en": "Taisia was south of Stepan."
        }
      }
    ],
    "solution": {
      "s0": 2,
      "s1": 15,
      "s2": 20,
      "s3": 24,
      "s4": 38,
      "s5": 43,
      "s6": 49,
      "s7": 61
    },
    "victimId": "s1",
    "killerId": "s2",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s1",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "Во время проверки экспозиции погибла хранительница. План музея и показания позволяют восстановить её последний обход.",
      "en": "A curator died during an exhibition inspection. The museum plan and witness accounts reconstruct her final round."
    },
    "hints": [
      {
        "ru": "Кресло определяет место Клима. Сравните его положение со свободными местами рядом со скамьёй.",
        "en": "Klim’s armchair gives a starting point. Compare it with the available places beside the bench."
      },
      {
        "ru": "Когда место Степана известно, проверьте расстояние до Раисы. Каменный лев поможет разместить Нелли.",
        "en": "Once Stepan is placed, check Raisa’s distance from him. The stone lion helps place Nelli."
      },
      {
        "ru": "Сопоставьте положение Мирона относительно телескопа с расстоянием до Ореста. Затем проверьте Людмилу и Таисию.",
        "en": "Compare Miron’s position west of the telescope with his distance from Orest. Then check Lyudmila and Taisia."
      }
    ],
    "art": {
      "icon": "statue",
      "theme": "#a18c66",
      "floor": "stone"
    },
    "authored": true
  },
  {
    "id": "resort",
    "number": 11,
    "title": {
      "ru": "Снег за окном",
      "en": "Snow at the Window"
    },
    "location": {
      "ru": "Снег за окном",
      "en": "Snow at the Window"
    },
    "difficulty": 4,
    "size": 8,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Холл",
          "en": "Hall"
        },
        "themeColor": "#eadfcb",
        "cells": [
          0,
          1,
          2,
          3,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Терраса",
          "en": "Terrace"
        },
        "themeColor": "#d9e7ed",
        "cells": [
          4,
          5,
          6,
          7,
          12,
          13,
          14,
          15,
          20,
          21,
          22,
          23
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Прокат",
          "en": "Rental"
        },
        "themeColor": "#dce5d3",
        "cells": [
          16,
          17,
          18,
          19,
          24,
          25,
          26,
          27,
          34,
          35
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Ресторан",
          "en": "Restaurant"
        },
        "themeColor": "#ead7d4",
        "cells": [
          28,
          29,
          30,
          31,
          36,
          37,
          38,
          39
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Лаунж",
          "en": "Lounge"
        },
        "themeColor": "#e1d8e9",
        "cells": [
          32,
          33,
          40,
          41,
          42,
          43,
          48,
          49,
          50,
          51
        ]
      },
      {
        "id": "F",
        "name": {
          "ru": "Номера",
          "en": "Guest rooms"
        },
        "themeColor": "#d8e1e9",
        "cells": [
          44,
          45,
          46,
          47,
          52,
          53,
          54,
          55,
          60,
          61,
          62,
          63
        ]
      },
      {
        "id": "G",
        "name": {
          "ru": "Гардероб",
          "en": "Cloakroom"
        },
        "themeColor": "#e6dfce",
        "cells": [
          56,
          57,
          58,
          59
        ]
      }
    ],
    "objects": [
      {
        "id": "chair",
        "type": "chair",
        "row": 1,
        "col": 1,
        "name": {
          "ru": "кресло в холле",
          "en": "hall armchair"
        },
        "occupiable": true
      },
      {
        "id": "fire",
        "type": "fireplace",
        "row": 4,
        "col": 1,
        "name": {
          "ru": "камин",
          "en": "fireplace"
        },
        "occupiable": false
      },
      {
        "id": "tree",
        "type": "tree",
        "row": 0,
        "col": 7,
        "name": {
          "ru": "заснеженная ель",
          "en": "snowy fir"
        },
        "occupiable": false
      },
      {
        "id": "desk",
        "type": "reception",
        "row": 3,
        "col": 2,
        "name": {
          "ru": "стойка проката",
          "en": "rental desk"
        },
        "occupiable": false
      },
      {
        "id": "bed",
        "type": "bed",
        "row": 5,
        "col": 5,
        "name": {
          "ru": "кровать в номере",
          "en": "guest bed"
        },
        "occupiable": true
      },
      {
        "id": "cart",
        "type": "trolley",
        "row": 7,
        "col": 0,
        "name": {
          "ru": "тележка для лыж",
          "en": "ski trolley"
        },
        "occupiable": false
      },
      {
        "id": "coffee",
        "type": "coffee",
        "row": 3,
        "col": 6,
        "name": {
          "ru": "кофемашина ресторана",
          "en": "restaurant coffee machine"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Филипп",
          "en": "Philip"
        },
        "avatar": "assets/avatars/portrait-62.svg",
        "rules": [
          {
            "type": "DISTANCE",
            "object": "tree",
            "value": 2,
            "text": {
              "ru": "Филипп находился в двух шагах по сетке от заснеженной ели.",
              "en": "Philip was two grid steps from the snowy fir."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Филипп — в двух шагах от заснеженной ели.",
          "en": "Philip was two steps from the snowy fir."
        }
      },
      {
        "name": {
          "ru": "Элина",
          "en": "Elina"
        },
        "avatar": "assets/avatars/portrait-63.svg",
        "rules": [
          {
            "type": "ON_OBJECT",
            "object": "chair",
            "text": {
              "ru": "Элина сидела в кресле в холле.",
              "en": "Elina sat in the hall armchair."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Элина сидела в кресле в холле.",
          "en": "Elina sat in the hall armchair."
        }
      },
      {
        "name": {
          "ru": "Ярослав",
          "en": "Yaroslav"
        },
        "avatar": "assets/avatars/portrait-64.svg",
        "rules": [
          {
            "type": "EAST_OF",
            "target": "s0",
            "text": {
              "ru": "Ярослав находился восточнее, чем Филипп.",
              "en": "Yaroslav was east of Philip."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Ярослав — восточнее Филиппа.",
          "en": "Yaroslav was east of Philip."
        },
        "fieldName": {
          "ru": "Ярик",
          "en": "Yarik"
        }
      },
      {
        "name": {
          "ru": "Агата",
          "en": "Agata"
        },
        "avatar": "assets/avatars/portrait-65.svg",
        "rules": [
          {
            "type": "DISTANCE",
            "target": "s1",
            "value": 4,
            "text": {
              "ru": "Между Агатой и Элиной — четыре шага по сетке.",
              "en": "Agata and Elina were four grid steps apart."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Агата — в четырёх шагах от Элины.",
          "en": "Agata was four steps from Elina."
        }
      },
      {
        "name": {
          "ru": "Богдан",
          "en": "Bogdan"
        },
        "avatar": "assets/avatars/portrait-66.svg",
        "rules": [
          {
            "type": "BESIDE_OBJECT",
            "object": "fire",
            "text": {
              "ru": "Богдан стоял рядом с камином.",
              "en": "Bogdan stood beside the fireplace."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Богдан — рядом с камином.",
          "en": "Bogdan stood beside the fireplace."
        }
      },
      {
        "name": {
          "ru": "Виола",
          "en": "Viola"
        },
        "avatar": "assets/avatars/portrait-67.svg",
        "rules": [
          {
            "type": "SOUTH_OF",
            "target": "s4",
            "text": {
              "ru": "Виола находилась южнее, чем Богдан.",
              "en": "Viola was south of Bogdan."
            },
            "subject": "s5"
          },
          {
            "type": "DISTANCE",
            "target": "s3",
            "value": 5,
            "text": {
              "ru": "Между Виолой и Агатой — пять шагов по сетке.",
              "en": "Viola and Agata were five grid steps apart."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Виола — южнее Богдана, в пяти шагах от Агаты.",
          "en": "Viola was south of Bogdan, five steps from Agata."
        }
      },
      {
        "name": {
          "ru": "Григорий",
          "en": "Grigory"
        },
        "avatar": "assets/avatars/portrait-68.svg",
        "rules": [
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Григорий находился не в углу своей зоны.",
              "en": "Grigory was not in a corner of his zone."
            },
            "subject": "s6"
          },
          {
            "type": "SOUTH_OF",
            "target": "s4",
            "text": {
              "ru": "Григорий находился южнее, чем Богдан.",
              "en": "Grigory was south of Bogdan."
            },
            "subject": "s6"
          },
          {
            "type": "WEST_OF",
            "target": "s3",
            "text": {
              "ru": "Григорий находился западнее, чем Агата.",
              "en": "Grigory was west of Agata."
            },
            "subject": "s6"
          },
          {
            "type": "DISTANCE",
            "target": "s4",
            "value": 4,
            "text": {
              "ru": "Между Григорием и Богданом — четыре шага по сетке.",
              "en": "Grigory and Bogdan were four grid steps apart."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Григорий — не в углу; южнее Богдана и западнее Агаты. До Богдана — четыре шага.",
          "en": "Grigory was not in a corner; south of Bogdan and west of Agata. Bogdan was four steps away."
        },
        "fieldName": {
          "ru": "Гриша",
          "en": "Grisha"
        }
      },
      {
        "name": {
          "ru": "Диана",
          "en": "Diana"
        },
        "avatar": "assets/avatars/portrait-69.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "F",
            "text": {
              "ru": "Диана находилась в зоне номеров.",
              "en": "Diana was in the guest-room area."
            },
            "subject": "s7"
          },
          {
            "type": "SOUTH_OF",
            "target": "s6",
            "text": {
              "ru": "Диана находилась южнее, чем Григорий.",
              "en": "Diana was south of Grigory."
            },
            "subject": "s7"
          }
        ],
        "id": "s7",
        "clueText": {
          "ru": "Диана — в номерах, южнее Григория.",
          "en": "Diana was in the guest rooms, south of Grigory."
        }
      }
    ],
    "solution": {
      "s0": 5,
      "s1": 9,
      "s2": 23,
      "s3": 27,
      "s4": 32,
      "s5": 46,
      "s6": 50,
      "s7": 60
    },
    "victimId": "s0",
    "killerId": "s2",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s0",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "На зимнем курорте погиб инструктор. За окном метель; внутри осталось восемь человек с разными показаниями.",
      "en": "An instructor died at a winter resort. A blizzard rages outside; eight people inside give different accounts."
    },
    "hints": [
      {
        "ru": "Начните с кресла Элины и расстояния Филиппа от ели. Занятые ими линии сузят выбор.",
        "en": "Start with Elina’s armchair and Philip’s distance from the fir. Their rows and columns narrow the options."
      },
      {
        "ru": "Условия Григория нужно применять вместе: не угол, южнее Богдана и западнее Агаты. Проверьте расстояние до Богдана.",
        "en": "Combine Grigory’s clues: not a corner, south of Bogdan and west of Agata. Check his distance from Bogdan."
      },
      {
        "ru": "Место Богдана связывает условия Виолы и Григория. Через Виолу проверьте Агату; Диана должна быть южнее Григория.",
        "en": "Bogdan connects Viola’s and Grigory’s clues. Use Viola to check Agata; Diana must be south of Grigory."
      }
    ],
    "art": {
      "icon": "fireplace",
      "theme": "#7793a3",
      "floor": "carpet"
    },
    "authored": true
  },
  {
    "id": "laboratory",
    "number": 12,
    "title": {
      "ru": "Опыт после полуночи",
      "en": "Experiment After Midnight"
    },
    "location": {
      "ru": "Опыт после полуночи",
      "en": "Experiment After Midnight"
    },
    "difficulty": 4,
    "size": 8,
    "rooms": [
      {
        "id": "A",
        "name": {
          "ru": "Приёмная",
          "en": "Reception"
        },
        "themeColor": "#e7dfd0",
        "cells": [
          0,
          1,
          2,
          3,
          8,
          9,
          10,
          11
        ]
      },
      {
        "id": "B",
        "name": {
          "ru": "Анализ",
          "en": "Analysis"
        },
        "themeColor": "#d3e3e8",
        "cells": [
          4,
          5,
          6,
          7,
          12,
          13,
          14,
          15,
          20,
          21,
          22,
          23
        ]
      },
      {
        "id": "C",
        "name": {
          "ru": "Биология",
          "en": "Biology"
        },
        "themeColor": "#d6e5d4",
        "cells": [
          16,
          17,
          18,
          19,
          24,
          25,
          26,
          27,
          32,
          33,
          34,
          35
        ]
      },
      {
        "id": "D",
        "name": {
          "ru": "Химия",
          "en": "Chemistry"
        },
        "themeColor": "#e4d9eb",
        "cells": [
          28,
          29,
          30,
          31,
          36,
          37,
          38,
          39,
          44,
          45,
          46,
          47
        ]
      },
      {
        "id": "E",
        "name": {
          "ru": "Отдых",
          "en": "Break room"
        },
        "themeColor": "#e8dacd",
        "cells": [
          40,
          41,
          42,
          43,
          48,
          49,
          50,
          51,
          56,
          57,
          58,
          59
        ]
      },
      {
        "id": "F",
        "name": {
          "ru": "Холодильная",
          "en": "Cold storage"
        },
        "themeColor": "#dce5ed",
        "cells": [
          52,
          53,
          54,
          55,
          60,
          61,
          62,
          63
        ],
        "displayName": {
          "ru": "Холод",
          "en": "Cold"
        }
      }
    ],
    "objects": [
      {
        "id": "lab",
        "type": "labtable",
        "row": 1,
        "col": 3,
        "name": {
          "ru": "лабораторный стол",
          "en": "laboratory bench"
        },
        "occupiable": false
      },
      {
        "id": "shelf",
        "type": "shelf",
        "row": 0,
        "col": 5,
        "name": {
          "ru": "шкаф реактивов",
          "en": "reagent cabinet"
        },
        "occupiable": false
      },
      {
        "id": "centrifuge",
        "type": "centrifuge",
        "row": 2,
        "col": 6,
        "name": {
          "ru": "центрифуга",
          "en": "centrifuge"
        },
        "occupiable": false
      },
      {
        "id": "bench",
        "type": "bench",
        "row": 6,
        "col": 0,
        "name": {
          "ru": "скамья в комнате отдыха",
          "en": "break-room bench"
        },
        "occupiable": true
      },
      {
        "id": "display",
        "type": "display",
        "row": 4,
        "col": 3,
        "name": {
          "ru": "шкаф образцов",
          "en": "specimen display"
        },
        "occupiable": false
      },
      {
        "id": "coffee",
        "type": "coffee",
        "row": 5,
        "col": 0,
        "name": {
          "ru": "кофемашина",
          "en": "coffee machine"
        },
        "occupiable": false
      },
      {
        "id": "sofa",
        "type": "sofa",
        "row": 5,
        "col": 3,
        "name": {
          "ru": "диван",
          "en": "sofa"
        },
        "occupiable": true
      },
      {
        "id": "table",
        "type": "table",
        "row": 6,
        "col": 7,
        "name": {
          "ru": "стол охлаждения",
          "en": "cooling table"
        },
        "occupiable": false
      }
    ],
    "suspects": [
      {
        "name": {
          "ru": "Елисей",
          "en": "Yelisey"
        },
        "avatar": "assets/avatars/portrait-70.svg",
        "rules": [
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Елисей находился не в углу своей зоны.",
              "en": "Yelisey was not in a corner of his zone."
            },
            "subject": "s0"
          }
        ],
        "id": "s0",
        "clueText": {
          "ru": "Елисей — не в углу своей зоны.",
          "en": "Yelisey was not in a corner of his zone."
        },
        "fieldName": {
          "ru": "Елисей",
          "en": "Elisey"
        }
      },
      {
        "name": {
          "ru": "Злата",
          "en": "Zlata"
        },
        "avatar": "assets/avatars/portrait-71.svg",
        "rules": [
          {
            "type": "BESIDE_OBJECT",
            "object": "lab",
            "text": {
              "ru": "Злата стояла рядом с лабораторным столом.",
              "en": "Zlata stood beside the laboratory bench."
            },
            "subject": "s1"
          }
        ],
        "id": "s1",
        "clueText": {
          "ru": "Злата — рядом с лабораторным столом.",
          "en": "Zlata stood beside the laboratory bench."
        }
      },
      {
        "name": {
          "ru": "Кирилл",
          "en": "Kirill"
        },
        "avatar": "assets/avatars/portrait-72.svg",
        "rules": [
          {
            "type": "WEST_OF",
            "object": "centrifuge",
            "text": {
              "ru": "Кирилл находился западнее центрифуги.",
              "en": "Kirill was west of the centrifuge."
            },
            "subject": "s2"
          }
        ],
        "id": "s2",
        "clueText": {
          "ru": "Кирилл — западнее центрифуги.",
          "en": "Kirill was west of the centrifuge."
        }
      },
      {
        "name": {
          "ru": "Лилия",
          "en": "Lilia"
        },
        "avatar": "assets/avatars/portrait-73.svg",
        "rules": [
          {
            "type": "CORNER_OF_ROOM",
            "room": "D",
            "text": {
              "ru": "Лилия стояла в углу химической зоны.",
              "en": "Lilia stood in a corner of chemistry."
            },
            "subject": "s3"
          }
        ],
        "id": "s3",
        "clueText": {
          "ru": "Лилия — в углу химической зоны.",
          "en": "Lilia stood in a chemistry corner."
        }
      },
      {
        "name": {
          "ru": "Марк",
          "en": "Mark"
        },
        "avatar": "assets/avatars/portrait-74.svg",
        "rules": [
          {
            "type": "IN_ROOM",
            "room": "C",
            "text": {
              "ru": "Марк находился в биологической зоне.",
              "en": "Mark was in biology."
            },
            "subject": "s4"
          },
          {
            "type": "SOUTH_OF",
            "target": "s3",
            "text": {
              "ru": "Марк находился южнее, чем Лилия.",
              "en": "Mark was south of Lilia."
            },
            "subject": "s4"
          }
        ],
        "id": "s4",
        "clueText": {
          "ru": "Марк — в биологии, южнее Лилии.",
          "en": "Mark was in biology, south of Lilia."
        }
      },
      {
        "name": {
          "ru": "Оксана",
          "en": "Oksana"
        },
        "avatar": "assets/avatars/portrait-75.svg",
        "rules": [
          {
            "type": "SAME_ROOM",
            "target": "s3",
            "text": {
              "ru": "Оксана находилась в той же зоне, что и Лилия.",
              "en": "Oksana shared Lilia’s zone."
            },
            "subject": "s5"
          },
          {
            "type": "NOT_CORNER",
            "text": {
              "ru": "Оксана находилась не в углу своей зоны.",
              "en": "Oksana was not in a corner of her zone."
            },
            "subject": "s5"
          },
          {
            "type": "DISTANCE",
            "target": "s2",
            "value": 4,
            "text": {
              "ru": "Между Оксаной и Кириллом — четыре шага по сетке.",
              "en": "Oksana and Kirill were four grid steps apart."
            },
            "subject": "s5"
          }
        ],
        "id": "s5",
        "clueText": {
          "ru": "Оксана — в одной зоне с Лилией, не в углу; в четырёх шагах от Кирилла.",
          "en": "Oksana shared Lilia’s zone, not in a corner; four steps from Kirill."
        }
      },
      {
        "name": {
          "ru": "Пётр",
          "en": "Pyotr"
        },
        "avatar": "assets/avatars/portrait-76.svg",
        "rules": [
          {
            "type": "WEST_OF",
            "target": "s4",
            "text": {
              "ru": "Пётр находился западнее, чем Марк.",
              "en": "Pyotr was west of Mark."
            },
            "subject": "s6"
          },
          {
            "type": "SOUTH_OF",
            "target": "s5",
            "text": {
              "ru": "Пётр находился южнее, чем Оксана.",
              "en": "Pyotr was south of Oksana."
            },
            "subject": "s6"
          }
        ],
        "id": "s6",
        "clueText": {
          "ru": "Пётр — западнее Марка и южнее Оксаны.",
          "en": "Pyotr was west of Mark and south of Oksana."
        }
      },
      {
        "name": {
          "ru": "Света",
          "en": "Sveta"
        },
        "avatar": "assets/avatars/portrait-77.svg",
        "rules": [
          {
            "type": "CORNER_OF_ROOM",
            "room": "E",
            "text": {
              "ru": "Света стояла в углу комнаты отдыха.",
              "en": "Sveta stood in a corner of the break room."
            },
            "subject": "s7"
          },
          {
            "type": "EAST_OF",
            "target": "s1",
            "text": {
              "ru": "Света находилась восточнее, чем Злата.",
              "en": "Sveta was east of Zlata."
            },
            "subject": "s7"
          }
        ],
        "id": "s7",
        "clueText": {
          "ru": "Света — в углу комнаты отдыха, восточнее Златы.",
          "en": "Sveta stood in a break-room corner, east of Zlata."
        }
      }
    ],
    "solution": {
      "s0": 6,
      "s1": 10,
      "s2": 20,
      "s3": 31,
      "s4": 33,
      "s5": 45,
      "s6": 48,
      "s7": 59
    },
    "victimId": "s0",
    "killerId": "s2",
    "generalClues": [
      {
        "type": "WITH_EXACTLY_ONE",
        "subject": "s0",
        "text": {
          "ru": "В зоне жертвы находился ровно один другой человек. Он и есть виновник.",
          "en": "Exactly one other person shared the victim’s zone. That person is the culprit."
        }
      }
    ],
    "intro": {
      "ru": "После ночного опыта погиб исследователь. Восстановите сцену по границам лаборатории, направлениям и расстояниям.",
      "en": "A researcher died after a night experiment. Reconstruct the scene using laboratory boundaries, directions and distances."
    },
    "hints": [
      {
        "ru": "Сначала проверьте соседей лабораторного стола для Златы. Сравните их с положением Светы восточнее Златы.",
        "en": "First check the cells beside the laboratory bench for Zlata. Compare them with Sveta’s position east of her."
      },
      {
        "ru": "Марк южнее Лилии, но остаётся в биологии. Это связывает их зоны; затем сравните Марка с Петром.",
        "en": "Mark is south of Lilia but stays in biology. This connects their zones; next compare Mark with Pyotr."
      },
      {
        "ru": "Пётр южнее Оксаны. Оксана делит зону с Лилией, но не стоит в углу. Соедините это с расстоянием до Кирилла.",
        "en": "Pyotr is south of Oksana. Oksana shares Lilia’s zone but is not in a corner. Combine this with her distance from Kirill."
      }
    ],
    "art": {
      "icon": "centrifuge",
      "theme": "#6f9792",
      "floor": "tiles"
    },
    "authored": true
  }
];
