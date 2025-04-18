import { Bot } from "grammy"

const bot = new Bot(process.env.BOT_TOKEN)

// Message templates dictionary
export const MessageTemplates = {
  hunger_below_49: {
    ru: "🍽️ Голод опустился ниже 49%, ваше настроение падает быстрее 😔",
    en: "🍽️ The feeling of hunger has dropped below 49%, your mood drops faster 😔",
    parse_mode: "Markdown",
  },
  happiness_below_49: {
    ru: "😊 Счастье опустилось ниже 49%, ваш доход уменьшился на 10% 📉",
    en: "😊 Happiness dropped below 49%, your income decreased by 10% 📉",
    parse_mode: "Markdown",
  },
  hunger_below_9: {
    ru: "🍽️ Голод опустился ниже 9%, ваше настроение падает очень быстро 😣",
    en: "🍽️ The feeling of hunger has dropped below 9%, your mood drops very quickly 😣",
    parse_mode: "Markdown",
  },
  happiness_below_9: {
    ru: "😊 Счастье опустилось ниже 9%, ваш доход уменьшился на 50% 📉",
    en: "😊 Happiness dropped below 9%, your income decreased by 50% 📉",
    parse_mode: "Markdown",
  },
  job_completed: (jobTitles, coins, exp) => {
    return {
      ru: `💼 Работа ${jobTitles.ru} окончена, вы заработали ${coins} монет и ${exp} опыта! 🎉`,
      en: `💼 ${jobTitles.ru} shift is over, you have earned ${coins} coins and ${exp} experience! 🎉`,
      parse_mode: "Markdown",
    }
  },
  level_up: (level) => {
    return {
      ru: `🌟 Вы получили ${level} уровень! Поздравляем! 🚀`,
      en: `🌟 You've just reached level ${level}! Congratulations! 🚀`,
      parse_mode: "Markdown",
    }
  },
  skill_learned: () => {
    return {
      ru: "📚 Навык изучен, для вас открылись новые возможности! ✨",
      en: "📚 The skill has been learned, and new opportunities have opened up for you! ✨",
      parse_mode: "Markdown",
    }
  },
  game_center_upgraded: () => {
    return {
      ru: "🎮 Уровень Игрового центра повышен, теперь ваши рефералы приносят больше дохода! 💰",
      en: "🎮 The level of the Game Center has been increased, now your referrals bring you more income! 💰",
      parse_mode: "Markdown",
    }
  },
  investment_ready: (investmentTitles, coins) => {
    return {
      ru: "💸 Инвестиция в ${investmentTitles.ru} готова к сбору, заберите ${coins} монет! 🤑",
      en: "💸 The investment is ready to collect income, collect! 🤑",
      parse_mode: "Markdown",
    }
  },
}

// Function to send message based on type, userId, and language
async function sendBotMessage(type, userId, language = "en") {
  try {
    const template = MessageTemplates[type]

    // Check if message type exists
    if (!MessageTemplates[type]) {
      throw new Error(`Message type "${type}" not found`)
    }

    // Select language, fallback to English if language is invalid
    const messageText = template[language] || template.en
    const options = { parse_mode: template.parse_mode }

    // Send message to user
    await bot.api.sendMessage(userId, messageText, options)
    console.log(`✅ Sent "${type}" message to user ${userId} in ${language}`)
  } catch (error) {
    console.error(`❌ Error sending "${type}" to ${userId}:`, error.message)
    // Send fallback error message
    try {
      const fallbackErrorMessage =
        language === "ru"
          ? "😓 Упс, что-то пошло не так! Попробуйте снова. 🛠️"
          : "😓 Oops, something went wrong! Try again. 🛠️"
      await bot.api.sendMessage(userId, fallbackErrorMessage, {
        parse_mode: "Markdown",
      })
    } catch (err) {
      console.error("❌ Failed to send error message:", err.message)
    }
  }
}

// Stop polling to prevent automatic updates
bot.stop()

module.exports = { sendBotMessage }
