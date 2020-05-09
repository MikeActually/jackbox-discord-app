const { envs } = require('../config')
const { GamesListLoader } = require('../loaders/gameslist')
new GamesListLoader().init(envs().gamesListUrl)
const messagehandler = require('../services/messagehandler')
const { DiscordWrapper } = require('../services/discordapiwrapper')
const { startStatLogger } = require('../services/discordbotsapiwrapper')

const client = new DiscordWrapper().getClient()

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`)
  startStatLogger({ topggkey: envs().topggkey })
})

client.on('message', (message) => {
  const props = { message }
  if (message.author.bot) return

  const response = messagehandler.handle(props)
  if (response) {
    client.channels.cache.get(message.channel.id).send(response)
  }
})

client.login(envs().jackboxkey)
