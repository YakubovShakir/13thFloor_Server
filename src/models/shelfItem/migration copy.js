import { ShelfItemTypes } from "./shelfItemModel.js";

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
    shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/цветок-2-полка.png",
    type: ShelfItemTypes.Flower
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
    shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/Бета-полка.png",
    type: ShelfItemTypes.Award
  },
  // {
  //   id: 3,
  //   name: {
  //     ru: "Ретро Консоль",
  //     en: "Retro Console",
  //   },
  //   description: {
  //     ru: "Сразу видно первопроходца",
  //     en: "A true pioneer shines through!",
  //   },
  //   cost: {
  //     coins: 0,
  //     stars: 0,
  //   },
  //   link: "",
  //   type: ShelfItemTypes.Award
  // },
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
  {
    id: 5,
    name: {
      ru: "Шар со Снегом",
      en: "Snow Globe",
    },
    description: {
      ru: "Аккуратнее! А то весь снег рассыпется",
      en: "Careful! You'll Scatter All the Snow",
    },
    cost: {
      coins: 150,
      stars: 0,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/SnowGlass.png",
    shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/шар-полка.png",
    type: ShelfItemTypes.Event
  },
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
    shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/Shelf%2Fstarrr.webp",
    type: ShelfItemTypes.Award
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
      stars: 10000,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/нфт-исходник.gif",
    shelf_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf/нфт-исходник2.gif",
    type: ShelfItemTypes.Neko
  },
]
