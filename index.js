const Telegraf = require('telegraf')
const Openai = require('openai')
const { message } = require('telegraf/filters')

const telegramToken = '7496899662:AAHrXRrfZzCHx-h4LwS5qpsUZUvQchjyi3g'
const openaiKey = 'sk-proj-65xXQIsCDkGt4Jvj4XiQT3BlbkFJKmdyZvYkVyokZv0RMuKo'

const bot = new Telegraf.Telegraf(telegramToken)
const configuration = new Openai.Configuration({
  apiKey: openaiKey
})

const openai = new Openai.OpenAIApi(configuration)

bot.on('text', async (ctx) => {
  const chatResponse = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: ctx.message.text}]
  })

  ctx.reply(chatResponse.data.choices[0].message.content)
})

bot.launch()