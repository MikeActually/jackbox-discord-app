const config = require('./config')
const { GamesListLoader } = require('./loaders/gameslist')
new GamesListLoader().init(config.envs.gamesListUrl)
const messagehandler = require('./services/messagehandler')
const { DiscordWrapper } = require('./services/discordapiwrapper')
const { startStatLogger } = require('./services/discordbotsapiwrapper')

const client = new DiscordWrapper().getClient()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  startStatLogger({ topggkey: config.envs.topggkey, discordclient: client })
})

client.on('message', (message) => {
  const props = { message }
  if (message.author.bot) return

  // console.log(message.content)
  const response = messagehandler.handle(props)
  if (response === false) {
    console.log('help')
  } else if (response) {
    console.log(response)
  }
  // replies.forEach(reply => {
  //   // message.reply(reply)
  // })
  // // const channel = client.channels.cache.get(message.channel.id)
  // messages.forEach(amessage => {
  //   // channel.send(amessage)
  // })
})

client.login(config.envs.jackboxkey)
