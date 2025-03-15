export default [
  {
    clothing_id: 1,
    name: {
      ru: "Растрепанные седые",
      en: "Windblown Ashen",
    },
    tag: [],
    type: "Hat",
    effect: {
      cant_fall_below_percent: [
        { param: "mood", value: 15 },     // Настроение не опустится ниже 15%
        { param: "energy", value: 10 },   // Энергия не опустится ниже 10%
        // Голод (hungry) отсутствует, значит, может упасть до 0%
      ],
      profit_hourly_percent: [
        { param: "hungry", value: 5 },    // Голод увеличивается на 5% в час (например, еда)
        { param: "energy", value: 10 },   // Энергия увеличивается на 10% в час (например, кофе)
        // Настроение (mood) без почасовой прибыли, зависит от других источников
      ],
      cost_hourly_percent: [
        { param: "mood", value: 3 },      // Настроение уменьшается на 3% в час (например, скука)
        { param: "energy", value: 2 },    // Энергия уменьшается на 2% в час (естественный спад)
        // Голод (hungry) без почасовых затрат, зависит от тиков
      ],
      profit_per_tick_fixed: [
        { param: "energy", value: 1.5 },  // Энергия получает +1.5 единицы за тик (короткий буфф)
        // Голод и настроение без фиксированной прибыли за тик
      ],
      cost_per_tick_fixed: [
        { param: "hungry", value: 0.8 },  // Голод теряет 0.8 единицы за тик (метаболизм)
        { param: "mood", value: 0.2 },    // Настроение теряет 0.2 единицы за тик (легкое раздражение)
        // Энергия без фиксированных затрат за тик, только почасовые
      ],
      autostart: [
        { param: "training_when_mood_below", value: 25 },      // Начать тренировку, если настроение ниже 25%
        { param: "working_when_energy_above", value: 70 },     // Начать работу, если энергия выше 70%
        { param: "sleeping_when_energy_below", value: 20 },    // Начать сон, если энергия ниже 20%
      ],
    },
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Ashen_m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Ashen_f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Ashen_m_-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Ashen_f_-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 2,
    name: {
      ru: "Растрепанные светлые",
      en: "Windblown Blonde",
    },
    tag: [],
    type: "Hat",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Blonde_m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Blonde_f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Blonde_m_-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_Blonde_f_-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 3,
    name: {
      ru: "Растрепанные темные",
      en: "Windblown brown",
    },
    tag: [],
    type: "Hat",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_brown_m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_brown_f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_brown_m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_brown_f_-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 4,
    name: {
      ru: "Растрепанные черные",
      en: "Windblown dark",
    },
    tag: [],
    type: "Hat",
    effects: {
      cant_fall_below_percent: [
        { param: "mood", value: 15 },     // Настроение не опустится ниже 15%
        { param: "energy", value: 10 },   // Энергия не опустится ниже 10%
        // Голод (hungry) отсутствует, значит, может упасть до 0%
      ],
      profit_hourly_percent: [
        { param: "hungry", value: 5 },    // Голод увеличивается на 5% в час (например, еда)
        { param: "energy", value: 10 },   // Энергия увеличивается на 10% в час (например, кофе)
        // Настроение (mood) без почасовой прибыли, зависит от других источников
      ],
      cost_hourly_percent: [
        { param: "mood", value: 3 },      // Настроение уменьшается на 3% в час (например, скука)
        { param: "energy", value: 2 },    // Энергия уменьшается на 2% в час (естественный спад)
        // Голод (hungry) без почасовых затрат, зависит от тиков
      ],
      profit_per_tick_fixed: [
        { param: "energy", value: 1.5 },  // Энергия получает +1.5 единицы за тик (короткий буфф)
        // Голод и настроение без фиксированной прибыли за тик
      ],
      cost_per_tick_fixed: [
        { param: "hungry", value: 0.8 },  // Голод теряет 0.8 единицы за тик (метаболизм)
        { param: "mood", value: 0.2 },    // Настроение теряет 0.2 единицы за тик (легкое раздражение)
        // Энергия без фиксированных затрат за тик, только почасовые
      ],
      autostart: [
        // { param: "training_when_mood_below", value: 25 },      // Начать тренировку, если настроение ниже 25%
        // { param: "working_when_energy_above", value: 70 },     // Начать работу, если энергия выше 70%
        { param: "sleeping_when_energy_below", value: 20 },    // Начать сон, если энергия ниже 20%
      ],
    },
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_dark_m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_dark_f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_dark_m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Head/Windblown_dark_f_-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 5,
    name: {
      ru: "Грязная майка",
      en: "Grime Tank",
    },
    tag: ["Sport"],
    type: "Top",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Body/GrimeTank-m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Body/GrimeTank-f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Body/GrimeTank-m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Body/GrimeTank-f-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 6,
    name: {
      ru: "Грязные Спортивки",
      en: "Street Grind",
    },
    tag: ["Sport"],
    type: "Pants",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Legs/Street_Grind_m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Legs/Street_Grind_f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Legs/Street-Grind-m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Legs/Street-Grind-f-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 7,
    name: {
      ru: "Серые кеды",
      en: "Gray Keds",
    },
    tag: ["Sport"],
    type: "Shoes",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Shoes/M_Keds_Gray.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Shoes/F_Keds_Gray.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Shoes/Icon_M_Keds_Gray-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/0/Shoes/Icon_f_Keds_Gray-icon.png",
    respect: 0,
    price: 0,
    tier: 0,
    requiredLevel: 0,
  },
  {
    clothing_id: 8,
    name: {
      ru: "Униформа курьера",
      en: "Courier's uniform",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCourierUniform%2FCourierUniformM.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCourierUniform%2F2CourierUniformF.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCourierUniform%2FCourierUniformMIcon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCourierUniform%2FCourierUniformFIcon.png",
    respect: 8,
    price: 10,
    tier: 0,
    requiredLevel: 1,
  },
  {
    clothing_id: 9,
    name: {
      ru: "Пустая зеленая футболка",
      en: "Blank green t-shirt",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Eco-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Eco-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Eco-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Eco-f-icon.png",
    respect: 9,
    price: 15,
    tier: 0,
    requiredLevel: 1,
  },
  {
    clothing_id: 10,
    name: {
      ru: "Зеленая Кепка",
      en: "Green Cap",
    },
    tag: [],
    type: "Hat",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FHead%2FCourierUniformMHat.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FHead%2FCourierUniformFHat.png.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FHead%2FCourierUniformMHatIcon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FHead%2FCourierUniformFHatIcon.png",
    respect: 5,
    price: 40,
    tier: 0,
    requiredLevel: 2,
  },
  {
    clothing_id: 11,
    name: {
      ru: "Дешевые джинсы",
      en: "Supermarket jeans",
    },
    tag: "Casual",
    type: "Pants",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCheapJeans%2FCheapJeansM.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Legs/SupermarketJeans-f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FNew%2FTop%2FCheapJeans%2FCheapJeansMIcon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Legs/SupermarketJeans- f-icon.png",
      respect: 7,
      price: 25,
    tier: 0,
    requiredLevel: 2,
  },
  {
    clothing_id: 12,
    name: {
      ru: "Джинсовые шорты",
      en: "Denim Shorts",
    },
    tag: "Casual",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/DenimShorts-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/DenimShorts-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/DenimShorts-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/DenimShorts-f-icon.png",
    respect: 7,
    price: 26,
    tier: 0,
    requiredLevel: 3,
  },
  {
    clothing_id: 13,
    name: {
      ru: "Оливковая жилетка",
      en: "Olive Vest",
    },
    tag: "Casual",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20Vest%2FOliveUniform.webp",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20Vest%2FOliveUniform-f.webp",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20Vest%2FOliveUniformIconM.webp",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20Vest%2FOliveUniformIconF.webp",
    respect: 24,
    price: 75 ,
    tier: 1,
    requiredLevel: 3,
  },
  {
    clothing_id: 14,
    name: {
      ru: "Футболка официанта",
      en: "Waiters Tshirt ",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FWaitersTshirt%2FWaitersTshirt-m.webp",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FWaitersTshirt%2FWaitersTshirt-f.webp",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FWaitersTshirt%2FWaitersTshirt-m-icon.webp",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FWaitersTshirt%2FWaitersTshirt-f-icon.webp",
      respect: 23,
      price: 75,
    tier: 1,
    requiredLevel: 3,
  },
  {
    clothing_id: 15,
    name: {
      ru: "Светлая Укладка",
      en: "Sharp Finish blondie",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishBlondie-m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishBlondie-f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishBlondie-m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishBlondie-f-icon.png",
      respect: 18,
      price: 600,
    tier: 1,
    requiredLevel: 3,
  },
  {
    clothing_id: 16,
    name: {
      ru: "Приглаженные темные",
      en: "Ultra Sleek brown",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekBrown-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekBrown-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekBrown-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekBrown-f-icon.png",
    respect: 19,
    price: 700,
    tier: 1,
    requiredLevel: 3,
  },
  {
    clothing_id: 17,
    name: {
      ru: "Оливковые брюки",
      en: "Olive trousers",
    },
    tag: null,
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20trousers%2FUrbanOlive-m.webp",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20trousers%2FUrbanOlive-f.webp",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20trousers%2FUrbanOlive-m-icon.webp",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FOlive%20trousers%2FUrbanOlive-f-icon.webp",
    respect: 23,
    price: 150,
    tier: 1,
    requiredLevel: 4,
  },
  {
    clothing_id: 18,
    name: {
      ru: "Верблюжьи Штаны",
      en: "Camel Pants",
    },
    tag: "Office",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FCamel%20Pants%2FCamelPants-m.webp",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FCamel%20Pants%2FCamelPants-f.webp",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FCamel%20Pants%2FCamelPants-f-icon.webp",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FCamel%20Pants%2FCamelPants-m-icon-icon.webp",
    respect: 24,
    price: 160,
    tier: 1,
    requiredLevel: 4,
  },
  {
    clothing_id: 19,
    name: {
      ru: "Короткий Шик",
      en: "Short Chic",
    },
    tag: "Sport",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FShort%20Chic%2FShortChic-m.webp",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FShort%20Chic%2FShortChic-f.webp",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FShort%20Chic%2FShortChic-m-icon.webp",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FCommon%2FShort%20Chic%2FShortChic-f-icon.webp",
    respect: 25,
    price: 155,
    tier: 1,
    requiredLevel: 4,
  },
  
  {
    clothing_id: 20,
    name: {
      ru: "Классика",
      en: "Classic",
    },
    tag: "Office",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Classic-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Classic-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Classic-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Classic-f-icon.png",
    respect: 45,
    price: 300,
    tier: 2,
    requiredLevel: 5,
  },
  {
    clothing_id: 21,
    name: {
      ru: "Розовый шик",
      en: "Pink luxe",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2F4%2FBody%2FPinkluxe-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/PinkLuxe-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/PinkLuxe-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/PinkLuxe-f-icon.png",
    respect: 46,
    price: 315,
    tier: 2,
    requiredLevel: 5,
  },
  {
    clothing_id: 22,
    name: {
      ru: "Ботинки",
      en: "Boots",
    },
    tag: "Office",
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Boots_m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Boots-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Boots-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Boots-f-icon.png",
    respect: 38,
    price: 600,
    tier: 2,
    requiredLevel: 6,
  },
  {
    clothing_id: 23,
    name: {
      ru: "Шаг Панка",
      en: "Punk Step",
    },
    tag: null,
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Shoes/PunkStep-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Shoes/PunkStep-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Shoes/PunkStep-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Shoes/PunkStep-f-icon.png",
    respect: 40,
    price: 650,
    tier: 2,
    requiredLevel: 6,
  },
  {
    clothing_id: 24,
    name: {
      ru: "Трудяга",
      en: "Workaholic",
    },
    tag: null,
    type: "Accessory",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Accessories/Workaholic-m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Accessories/Workaholic-f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Accessories/Workaholic-m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Accessories/Workaholic-f-icon.png",
      respect: 78,
      price: 1200,
    tier: 3,
    requiredLevel: 7,
  },
  {
    clothing_id: 25,
    name: {
      ru: "Серебрянная серьга",
      en: "Silver Earring",
    },
    tag: "Casual",
    type: "Accessory",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Accessories/SilverEarring-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Accessories/SilverEarring-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Accessories/SilverEarring-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Accessories/SilverEarring-f-icon.png",
    respect: 80,
    price: 1400,
    tier: 3,
    requiredLevel: 7,
  },
  {
    clothing_id: 26,
    name: {
      ru: "Белый воротничек",
      en: "White collar",
    },
    tag: "Office",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/WhiteCollar-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/WhiteCollar-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/WhiteCollar-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/WhiteCollar-f-icon.png",
    respect: 72,
    price: 1700,
    tier: 3,
    requiredLevel: 8,
  },
  {
    clothing_id: 27,
    name: {
      ru: "Дух Мотора",
      en: "Motor Soul",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/MotorSoul-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/MotorSoul-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/MotorSoul-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/MotorSoul-f-icon.png",
    respect: 80,
    price: 2000,
    tier: 3,
    requiredLevel: 8,
  },
  {
    clothing_id: 28,
    name: {
      ru: "Серая Классика",
      en: "Grey Classic",
    },
    tag: null,
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Legs/GreyClassic-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Legs/GreyClassic-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Legs/GreyClassic-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Legs/GreyClassic-f-icon.png",
    respect: 69,
    price: 2500,
    tier: 3,
    requiredLevel: 9,
  },
  {
    clothing_id: 29,
    name: {
      ru: "Рокер",
      en: "Rocker",
    },
    tag: "Casual",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Rocker-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Rocker-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Rocker-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Rocker-f-icon.png",
    respect: 72,
    price: 2600,
    tier: 3,
    requiredLevel: 9,
  },
  {
    clothing_id: 30,
    name: {
      ru: "Небо Корпората",
      en: "Corporate Sky",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/CorporateSky-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/CorporateSky-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/CorporateSky-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/CorporateSky-f-icon.png",
    respect: 114,
    price: 3800,
    tier: 4,
    requiredLevel: 10,
  },
  {
    clothing_id: 31,
    name: {
      ru: "Худи Чемпиона",
      en: "Rocky Spirit",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/RockySpirit-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/RockySpirit-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/RockySpirit-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Body/RockySpirit-f-icon.png",
    respect: 120,
    price: 4200,
    tier: 4,
    requiredLevel: 10,
  },
  {
    clothing_id: 32,
    name: {
      ru: "Черная дерзость",
      en: "Sassy dark",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyDark-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyDark-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyDark-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyDark-f-icon.png",
    respect: 105,
    price: 5800,
    tier: 4,
    requiredLevel: 11,
  },
  {
    clothing_id: 33,
    name: {
      ru: "Темная Укладка",
      en: "Sharp Finish dark",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishDark-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishDark-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2F2%2FHead%2FSharpFinishDark-m-icon-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Head/SharpFinishDark-f-icon.png",
    respect: 107,
    price: 5900,
    tier: 4,
    requiredLevel: 11,
  },
  {
    clothing_id: 34,
    name: {
      ru: "Глубина индиго",
      en: "Indigo Depth",
    },
    tag: null,
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Legs/IndigoDepth-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Legs/IndigoDepth-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Legs/IndigoDepth-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/4/Legs/IndigoDepth-f-icon.png",
    respect: 110,
    price: 8600,
    tier: 4,
    requiredLevel: 12,
  },
  {
    clothing_id: 35,
    name: {
      ru: "Черные шорты",
      en: "Black Shorts",
    },
    tag: "Sport",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/BlackShorts-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/BlackShorts-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/BlackShorts-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Legs/BlackShorts-f-icon.png",
    respect: 112,
    price: 9500,
    tier: 4,
    requiredLevel: 12,
  },
  {
    clothing_id: 36,
    name: {
      ru: "Черыне Лоферы",
      en: "Black Loafers",
    },
    tag: null,
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/BlackLoafers-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/BlackLoafers-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/BlackLoafers-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/BlackLoafers-f-icon.png",
    respect: 100,
    price: 12000,
    tier: 4,
    requiredLevel: 13,
  },
  {
    clothing_id: 37,
    name: {
      ru: "Дневной свет",
      en: "Dayglow",
    },
    tag: "Sport",
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Dayglow-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Dayglow-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Dayglow-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Shoes/Dayglow-f-icon.png",
    respect: 105,
    price: 13000,
    tier: 4,
    requiredLevel: 13,
  },
  {
    clothing_id: 38,
    name: {
      ru: "Приглаженные Седые",
      en: "Ultra Sleek ashen",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekAshen-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekAshen-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekAshen-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Head/UltraSleekAshen-f-icon.png",
    respect: 150,
    price: 19000,
    tier: 5,
    requiredLevel: 14,
  },
  {
    clothing_id: 39,
    name: {
      ru: "Дерзость Седые",
      en: "Sassy Ashen",
    },
    tag: null,
    type: "Hat",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyAshen-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyAshen-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyAshen-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Head/SassyAshen-f-icon.png",
    respect: 155,
    price: 22000,
    tier: 5,
    requiredLevel: 14,
  },
  {
    clothing_id: 40,
    name: {
      ru: "Шелковистая темнота",
      en: "Silken Darkness",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/SilkenDarkness-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/SilkenDarkness-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/SilkenDarkness-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/SilkenDarkness-f-icon.png",
    respect: 162,
    price: 29000,
    tier: 5,
    requiredLevel: 15,
  },
  {
    clothing_id: 41,
    name: {
      ru: "Тьма",
      en: "Black",
    },
    tag: null,
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/Black-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/Black-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/Black-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Body/Black-f-icon.png",
    respect: 170,
    price: 32000,
    tier: 5,
    requiredLevel: 15,
  },
  {
    clothing_id: 42,
    name: {
      ru: "Тёмная элегантность",
      en: "Dark elegance",
    },
    tag: "Office",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/DarkElegance-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/DarkElegance-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/DarkElegance-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/DarkElegance-f-icon.png",
    respect: 155,
    price: 43000,
    tier: 5,
    requiredLevel: 16,
  },
  {
    clothing_id: 43,
    name: {
      ru: "Аквамарин",
      en: "Aquamarine",
    },
    tag: "Office",
    type: "Pants",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Aquamarine-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Aquamarine-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Aquamarine-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Legs/Aquamarine-f-icon.png",
    respect: 160,
    price: 55000,
    tier: 5,
    requiredLevel: 15,
  },
  {
    clothing_id: 44,
    name: {
      ru: "Туфли",
      en: "Shoes",
    },
    tag: null,
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/Shoes-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/Shoes-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/Shoes-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/Shoes-f-icon.png",
    respect: 142,
    price: 65000,
    tier: 5,
    requiredLevel: 17,
  },
  {
    clothing_id: 45,
    name: {
      ru: "Красные сникеры",
      en: "Sneakers Red",
    },
    tag: null,
    type: "Shoes",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/SneakersRed-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/SneakersRed-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/SneakersRed-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Shoes/SneakersRed-f-icon.png",
    respect: 180,
    price: 80000,
    tier: 5,
    requiredLevel: 17,
  },
  {
    clothing_id: 46,
    name: {
      ru: "Цепь короля",
      en: "King Chain",
    },
    tag: null,
    type: "Accessory",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Accessories/KingChain-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Accessories/KingChain-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Accessories/KingChain-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/5/Accessories/KingChain-f-icon.png",
    respect: 270,
    price: 100000,
    tier: 5,
    requiredLevel: 18,
  },
  {
    clothing_id: 47,
    name: {
      ru: "Минимал",
      en: "Minimal",
    },
    tag: null,
    type: "Accessory",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Accessories/Minimal-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Accessories/Minimal-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Accessories/Minimal-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Accessories/Minimal-f-icon.png",
    respect: 300,
    price: 180000,
    tier: 5,
    requiredLevel: 18,
  },
  {
    clothing_id: 48,
    name: {
      ru: "Нежность",
      en: "Softness",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Softness-m.png",
    female_link: "/https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Softness-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Softness-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/2/Body/Softness-f-icon.png",
    respect: 30,
    price: 0,
    tier: 2,
    requiredLevel: 0,
  },
  {
    clothing_id: 49,
    name: {
      ru: "Пионер",
      en: "Pioneer",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/Pioneer-m.png",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/Pioneer-f.png",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/Pioneer-m-icon.png",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/3/Body/Pioneer-f-icon.png",
    respect: 30,
    price: 0,
    tier: 2,
    requiredLevel: 0,
  },
  {
    clothing_id: 50,
    name: {
      ru: "Фанат",
      en: "Fan",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FUncommon%2FFan%2FFan-m.webp",
    female_link: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FUncommon%2FFan%2FFan-f.webp",
    male_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FUncommon%2FFan%2FFan-m-icon.webp",
    female_icon: "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes%2FUncommon%2FFan%2FFan-f-icon.webp",
    respect: 55,
    price: 0,
    tier: 3,
    requiredLevel: 0,
  },
  {
    clothing_id: 51,
    name: {
      ru: "Белая футболка",
      en: "White T-Shirt",
    },
    tag: "Sport",
    type: "Top",
    effect: null,
    male_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Body/WhiteTShirt-m.png",
    female_link:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Body/WhiteTShirt-f.png",
    male_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Body/WhiteTShirt-m-icon.png",
    female_icon:
      "https://d8bddedf-ac40-4488-8101-05035bb63d25.selstorage.ru/clothes/1/Body/WhiteTShirt-f-icon.png",
      respect: 30,
      price: 0,
    tier: 2,
    requiredLevel: 0,
  },

]
