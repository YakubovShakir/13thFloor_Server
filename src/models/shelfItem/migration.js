import { ShelfItemTypes, NEKO_RARITIES } from "./shelfItemModel.js"

export const ShelfItems = [
  {
    id: 1,
    name: {
      ru: "Цветок в Горшке",
      en: "Potted Plant",
    },
    description: {
      ru: "Не забывайте поливать!",
      en: "Don't forget to water!",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/FlowerType1.png",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/цветок-2-полка.png",
    type: ShelfItemTypes.Flower,
    effects: null,
    respect: 100,
  },
  {
    id: 2,
    name: {
      ru: "Медаль за Бета-Тест",
      en: "Beta Tester Medal",
    },
    description: {
      ru: "Спасибо что вы с нами!",
      en: "Thanks for sticking around!",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/Beta.png",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/Бета-полка.png",
    type: ShelfItemTypes.Award,
    respect: 1000,
    effects: {
      profit_hourly_percent: [
        { param: "energy", value: 10 },
      ],
    },
  },
  {
    id: 3,
    name: {
      ru: "Ретро Консоль",
      en: "Retro Console",
    },
    description: {
      ru: "Сразу видно первопроходца",
      en: "A true pioneer shines through!",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Shelf%2FRetroConsole.png",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Shelf%2FChselfRetroConsole.png",
    type: ShelfItemTypes.Award,
    respect: 2000,
    effects: {
      cant_fall_below_percent: [
        { param: "mood", value: 15 },
      ],
    },
  },
  // {
  //   id: 4,
  //   name: {
  //     ru: "Музыкальная Шкатулка",
  //     en: "Music Box",
  //   },
  //   description: {
  //     ru: "Главный трек этого года",
  //     en: "Top track of this year",
  //   },
  //   cost: {
  //     coins: 250,
  //     stars: 0,
  //   },
  //   link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/MusicBox.png",
  //   shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/шкатурка-полка.png",
  //   type: ShelfItemTypes.Event
  // },
  // {
  //   id: 5,
  //   name: {
  //     ru: "Шар со Снегом",
  //     en: "Snow Globe",
  //   },
  //   description: {
  //     ru: "Аккуратнее! А то весь снег рассыпется",
  //     en: "Careful! You'll Scatter All the Snow",
  //   },
  //   cost: {
  //     coins: 150,
  //     stars: 0,
  //   },
  //   link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/SnowGlass.png",
  //   shelf_link:
  //     "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/шар-полка.png",
  //   type: ShelfItemTypes.Event,
  // },
  {
    id: 6,
    name: {
      ru: "Звезда Звездец",
      en: "Gift from Uranus",
    },
    description: {
      ru: "Со всем увожением",
      en: "Sorry, you are cool!",
    },
    cost: {
      coins: 0,
      stars: 10000,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/pdtplf.png",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Shelf%2Fstarrr.webp",
    type: ShelfItemTypes.Award,
    respect: 10000,
    effects: {
      profit_hourly_percent: [
        { param: "mood", value: 15 },
      ],
    },
  },
  // {
  //   id: 7,
  //   name: {
  //     ru: "Будильник",
  //     en: "Alarm Clock",
  //   },
  //   description: {
  //     ru: "ДЗЫНЬ-ДЗЫНЬ-ДЗЫНЬ-ДЗЫНЬ\nЕсли у персонажа закончилась энергия, он автоматически ложится спать.",
  //     en: "RING-RING-RING-RING",
  //   },
  //   cost: {
  //     coins: 200,
  //     stars: 0,
  //   },
  //   link: "",
  // },
  {
    id: 8,
    name: {
      ru: "Неко-кот",
      en: "Neko-cat",
    },
    description: {
      ru: "На удачу!",
      en: "For better luck!",
    },
    cost: {
      coins: 0,
      stars: 700,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/нфт-исходник.gif",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/нфт-исходник2.gif",
    type: ShelfItemTypes.Neko,
    respect: 5000,
    rarity: NEKO_RARITIES.BASE,
  },
  {
    id: 9,
    name: {
      ru: "Pancat",
      en: "Pancat",
    },
    description: {
      ru: "Pancat - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Pancat - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/0.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/0.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 10,
    name: {
      ru: "Meowramen", // Updated from "Meowmen" in second array to match first
      en: "Meowramen",
    },
    description: {
      ru: "Meowramen - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Meowramen - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/1.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/1.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 11,
    name: {
      ru: "Lazyfield",
      en: "Lazyfield",
    },
    description: {
      ru: "Lazyfield - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Lazyfield - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/2.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/2.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 12,
    name: {
      ru: "Catpool",
      en: "Catpool",
    },
    description: {
      ru: "Catpool - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Catpool - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/4.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/4.gif",
    type: ShelfItemTypes.Neko,
    respect: 5000,
    rarity: NEKO_RARITIES.RARE,
    tonPrice: 20,
  },
  {
    id: 13,
    name: {
      ru: "Meowki",
      en: "Meowki",
    },
    description: {
      ru: "Meowki - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Meowki - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/5.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/5.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 14,
    name: {
      ru: "Laserneko",
      en: "Laserneko",
    },
    description: {
      ru: "Laserneko - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Laserneko - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/6.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/6.gif",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.UNCOMMON,
    tonPrice: 15,
  },
  {
    id: 15,
    name: {
      ru: "Saberra",
      en: "Saberra",
    },
    description: {
      ru: "Saberra - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Saberra - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/7.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/7.gif",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.COMMON, // Note: First array says UNCOMMON, second says COMMON
    tonPrice: 15,
  },
  {
    id: 16,
    name: {
      ru: "Bunnymeow",
      en: "Bunnymeow",
    },
    description: {
      ru: "Bunnymeow - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Bunnymeow - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/8.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/8.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 17,
    name: {
      ru: "Goldpaw",
      en: "Goldpaw",
    },
    description: {
      ru: "Goldpaw - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Goldpaw - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/9.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/9.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 18,
    name: {
      ru: "Rockneko",
      en: "Rockneko",
    },
    description: {
      ru: "Rockneko - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Rockneko - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/10.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/10.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 19,
    name: {
      ru: "Meowstronaut",
      en: "Meowstronaut",
    },
    description: {
      ru: "Meowstronaut - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Meowstronaut - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/11.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/11.gif",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.UNCOMMON,
    tonPrice: 15,
  },
  {
    id: 20,
    name: {
      ru: "Nightpaw",
      en: "Nightpaw",
    },
    description: {
      ru: "Nightpaw - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Nightpaw - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/12.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/12.gif",
    type: ShelfItemTypes.Neko,
    respect: 5000,
    rarity: NEKO_RARITIES.RARE,
    tonPrice: 20,
  },
  {
    id: 21,
    name: {
      ru: "Nephritus",
      en: "Nephritus",
    },
    description: {
      ru: "Nephritus - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Nephritus - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/13.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/13.gif",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    tonPrice: 10,
  },
  {
    id: 22,
    name: {
      ru: "Assassipaw",
      en: "Assassipaw",
    },
    description: {
      ru: "Assassipaw - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Assassipaw - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/14.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/14.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    tonPrice: 15,
  },
  {
    id: 23,
    name: {
      ru: "Meowroe",
      en: "Meowroe",
    },
    description: {
      ru: "Meowroe - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Meowroe - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/15.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/15.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 24,
    name: {
      ru: "Magmocat",
      en: "Magmocat",
    },
    description: {
      ru: "Magmocat - A legendary Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Magmocat - A legendary Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/16.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/16.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.LEGENDARY,
    respect: 10000,
    tonPrice: 30,
  },
  {
    id: 25,
    name: {
      ru: "Mandalpurr",
      en: "Mandalpurr",
    },
    description: {
      ru: "Mandalpurr - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Mandalpurr - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/17.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/17.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    tonPrice: 20,
  },
  {
    id: 26,
    name: {
      ru: "Starglem",
      en: "Starglem",
    },
    description: {
      ru: "Starglem - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Starglem - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/19.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/19.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    tonPrice: 15,
  },
  {
    id: 27,
    name: {
      ru: "Xpaw",
      en: "Xpaw",
    },
    description: {
      ru: "Xpaw - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Xpaw - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/20.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/20.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    tonPrice: 20,
  },
  {
    id: 28,
    name: {
      ru: "Yaku-cat",
      en: "Yaku-cat",
    },
    description: {
      ru: "Yaku-cat - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Yaku-cat - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/21.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/21.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 29,
    name: {
      ru: "Steelwhisker",
      en: "Steelwhisker",
    },
    description: {
      ru: "Steelwhisker - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Steelwhisker - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/22.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/22.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 30,
    name: {
      ru: "Guitarcat",
      en: "Guitarcat",
    },
    description: {
      ru: "Guitarcat - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Guitarcat - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/23.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/23.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    tonPrice: 15,
  },
  {
    id: 31,
    name: {
      ru: "Roastie",
      en: "Roastie",
    },
    description: {
      ru: "Roastie - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Roastie - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/24.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/24.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 32,
    name: {
      ru: "Bonefish",
      en: "Bonefish",
    },
    description: {
      ru: "Bonefish - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Bonefish - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/25.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/25.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 33,
    name: {
      ru: "Parisianpaw",
      en: "Parisianpaw",
    },
    description: {
      ru: "Parisianpaw - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Parisianpaw - An uncommon Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/26.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/26.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    tonPrice: 15,
  },
  {
    id: 34,
    name: {
      ru: "Catarachnid",
      en: "Catarachnid",
    },
    description: {
      ru: "Catarachnid - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Catarachnid - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/27.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/27.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    tonPrice: 20,
  },
  {
    id: 35,
    name: {
      ru: "Coffeecat",
      en: "Coffeecat",
    },
    description: {
      ru: "Coffeecat - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Coffeecat - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/28.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/28.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    tonPrice: 10,
  },
  {
    id: 36,
    name: {
      ru: "Venocat",
      en: "Venocat",
    },
    description: {
      ru: "Venocat - A rare Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Venocat - A rare Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/29.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/29.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    tonPrice: 20,
  },
  {
    id: 37,
    name: {
      ru: "Meowhale",
      en: "Meowhale",
    },
    description: {
      ru: "Meowhale - A special Maneki-neko from the 13th Floor Collection for holders of 1 million $13FUTY | Season 1",
      en: "Meowhale - A special Maneki-neko from the 13th Floor Collection for holders of 1 million $13FUTY | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/30.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/30.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.SPECIAL,
    respect: 7500,
    tonPrice: 1,
  },
  {
    id: 38,
    name: {
      ru: "Purrfect Launch",
      en: "Purrfect Launch",
    },
    description: {
      ru: "Purrfect Launch - A special Maneki-neko from the 13th Floor Collection for holders of 10 million $13FUTY | Season 1",
      en: "Purrfect Launch - A special Maneki-neko from the 13th Floor Collection for holders of 10 million $13FUTY | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/31.gif",
    shelf_link:
      "https://361785fd-861d-4cce-a8b5-3e86fc75d291.selstorage.ru/nobg/31.gif",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.SPECIAL,
    respect: 7500,
    tonPrice: 1,
  },
];

export default ShelfItems;