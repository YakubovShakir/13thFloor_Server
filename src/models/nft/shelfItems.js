export const ShelfItemTypes = {
  Flower: "flower",
  Event: "event",
  Award: "award",
  Flag: "flag",
  Neko: "neko",
}

export const NEKO_RARITIES = {
  //! BASE - FOR REGULAR NEKO
  BASE: 'Base',
  //!
  COMMON: 'Common',
  UNCOMMON: 'Uncommon',
  RARE: 'Rare',
  LEGENDARY: 'Legendary',
  SPECIAL: 'Special',
}

export const nekoRarityToRespectMap = {
  [NEKO_RARITIES.BASE]: 20,
  [NEKO_RARITIES.COMMON]: 100,
  [NEKO_RARITIES.UNCOMMON]: 200,
  [NEKO_RARITIES.RARE]: 300,
  [NEKO_RARITIES.LEGENDARY]: 400,
  [NEKO_RARITIES.SPECIAL]: 500,
}

export default [
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FPancat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FPancat.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
  },
  {
    id: 10,
    name: {
      ru: "Meowmen",
      en: "Meowmen",
    },
    description: {
      ru: "Meowmen - A common Maneki-neko from the 13th Floor Collection | Season 1",
      en: "Meowmen - A common Maneki-neko from the 13th Floor Collection | Season 1",
    },
    cost: {
      coins: 0,
      stars: 0,
    },
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMeowmen.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMeowmen.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FLazyfield.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FLazyfield.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FCatpool.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FCatpool.webp",
    type: ShelfItemTypes.Neko,
    respect: 5000,
    rarity: NEKO_RARITIES.RARE,
    ton_price: 20,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMeowki.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMeowki.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FLaserneko.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FLaserneko.webp",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.UNCOMMON,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FSaberra.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FSaberra.gif",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FBunnymeow.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FBunnymeow.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FGoldpaw.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FGoldpaw.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FRockneko.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FRockneko.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMeowstronaut.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMeowstronaut.webp",
    type: ShelfItemTypes.Neko,
    respect: 2500,
    rarity: NEKO_RARITIES.UNCOMMON,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FNightpaw.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FNightpaw.webp",
    type: ShelfItemTypes.Neko,
    respect: 5000,
    rarity: NEKO_RARITIES.RARE,
    ton_price: 20,
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
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2Ftpy199pnx7usual8dc3h.webp",
    type: ShelfItemTypes.Neko,
    respect: 1500,
    rarity: NEKO_RARITIES.COMMON,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FAssassipaw.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FAssassipaw.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMeowroe.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMeowroe.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMagmocat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMagmocat.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.LEGENDARY,
    respect: 10000,
    ton_price: 30,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FMandalpurr.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FMandalpurr.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    ton_price: 20,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FStarglem.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FStarglem.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FXpaw.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FXpaw.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    ton_price: 20,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FYaku-cat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FYaku-cat.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FSteelwhisker.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FSteelwhisker.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FGuitarcat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FGuitarcat.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FRoastie.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FRoastie.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FBonefish.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FBonefish.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FParisianpaw.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FParisianpaw.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.UNCOMMON,
    respect: 2500,
    ton_price: 15,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2Fwm1zkkiv5qodleaofouv.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2F%D0%BD%D1%84%D1%82-%D1%87%D0%B5%D0%BA-%D0%BF%D0%B0%D0%B2%D1%83%D0%BA-%D0%B1%D0%B5%D0%B7-%D1%84%D0%BE%D0%BD%D0%B0%20(2).webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    ton_price: 20,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FCoffeecat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FCoffeecat.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.COMMON,
    respect: 1500,
    ton_price: 10,
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
    link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9F%D1%80%D0%B5%D0%B2%D1%8C%D1%8E%2FVenocat.webp",
    shelf_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2FVenocat.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.RARE,
    respect: 5000,
    ton_price: 20,
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
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2F%D0%BD%D1%84%D1%82%D1%81-%D0%BA%D0%B8%D1%82%D0%BE%D0%BC1.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.SPECIAL,
    respect: 7500,
    ton_price: 1,
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
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/shelf%2FNft%2F%D0%9D%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%BA%D1%83%2F%D0%BD%D1%84%D1%82-%D1%81-%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%BE%D0%B91.webp",
    type: ShelfItemTypes.Neko,
    rarity: NEKO_RARITIES.SPECIAL,
    respect: 7500,
    ton_price: 1,
  },
]
