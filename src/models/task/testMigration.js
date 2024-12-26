export default [
  {
    id: 1,
    name_ru: "Мотивирующий подкаст",
    name_en: "Motivational Podcast",
    descr_ru: "Послушайте подкаст, который вдохновит вас на новые достижения.",
    descr_en: "Listen to a podcast that will inspire you to achieve more.",
    reward: 100,
    link: "#",
    level: 1,
    category: "learnSkillTask",
    category_parameters: {
      skillId: 1,
    },
  },
  {
    id: 2,
    name_ru: "Займись спортом",
    name_en: "Get Active",
    descr_ru: "Проведите тренировку и почувствуйте прилив позитивных эмоций!",
    descr_en: "Complete a workout andfeel the rush of positive emotions!",
    reward: 100,
    link: "#",
    level: 1,
    category: "doTrainingTask",
  },
  {
    id: 3,
    name_ru: "Пригласи друга",
    name_en: "Invite a Friend",
    descr_ru:
      "Пригласите друга и откройте игровой центр. Получайте дополнительные монеты каждый час.",
    descr_en:
      "Invite a friend and open a game center. Earn extra coins every hour.",
    reward: 100,
    link: "#",
    level: 1,
    category: "inviteFriendTask",
    category_parameters: {
      refCount: 1,
    },
  },
  {
    id: 4,
    name_ru: "Пригласи 5 друзей",
    name_en: "Invite 5 Friends",
    descr_ru:
      "Получите ретро-консоль, которая помогает дольше оставаться счастливым.",
    descr_en:
      "Invite 5 friends to get a retro console that helps maintain happiness.",
    reward: 100,
    link: "#",
    level: 1,
    category: "inviteFriendTask",
    category_parameters: {
      refCount: 5,
    },
  },
  {
    id: 5,
    name_ru: "Достигните 2 уровня",
    name_en: "Reach Level 2",
    descr_ru: "Сделайте первый шаг на пути к успеху.",
    descr_en: "Take the first step on your way to success.",
    reward: 100,
    link: "#",
    level: 2,
    category: "levelTask",
    category_parameters: {
      requiredLevel: 2,
    },
  },
]
