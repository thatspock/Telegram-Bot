const Telegraf = require('telegraf');
const Openai = require('openai');
const { message } = require('telegraf/filters');

const telegramToken = process.env.TELEGRAM_TOKEN;
const openaiKey = process.env.OPENAI_KEY;

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