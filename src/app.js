const gamesLoader = require('./loaders/gameslist')
const messagehandler = require('./services/messagehandler')
const config = require('./config')
const { DiscordWrapper } = require('./services/discordapiwrapper')
const client = new DiscordWrapper().getClient()

let gameslist

client.on('ready', () => {
  gamesLoader.getList(config.envs.gamesListUrl).then((response) => {
    gameslist = response
  })
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message) => {
  const props = { message, gameslist }
  const { replies, messages } = messagehandler.handle(props)
  replies.forEach(reply => {
    message.reply(reply)
  })
  const channel = client.channels.cache.get(message.channel.id)
  messages.forEach(amessage => {
    channel.send(amessage)
  })
})

client.login(config.envs.jackboxkey)
