const { envs } = require('../config')
const { GamesListLoader } = require('../loaders/gameslist')
new GamesListLoader().init(envs().gamesListUrl)
const commandHandler = require('../services/commandHandler')
const { DiscordWrapper } = require('../services/discordapiwrapper')
const { startStatLogger } = require('../services/discordbotsapiwrapper')
const _newrelic = require("newrelic")
const jackboxformat = /^!(?:jackbox|jb)(?: (\w+)(?: (.+))?)?$/gi
const client = new DiscordWrapper().getClient()

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`)
  startStatLogger({ topggkey: envs().topggkey })
})

client.on('messageCreate', (message) => {
  const handleMessage = () => {
    if (message.author.bot) return

    const jackboxinfo = jackboxformat.exec(message.content)

    if (jackboxinfo !== null) {
      _newrelic.addCustomAttributes({
        'guildid': '' + message.guildId,
        'userId': '' + message.author,
        'userDetails': message.author.username + '#' + message.author.discriminator,
        'channelid': '' + message.channelId
      });

      message.channel.send('`!jackbox` commands are no longer supported due to changes in Discord policies. Please use the new `/jackboxrandom` command.')
    }
  }
  _newrelic.startBackgroundTransaction('messageCreate', 'messageCreate', handleMessage);
})

client.on('interactionCreate', async interaction => {
  const handleCommand = () => {
    _newrelic.addCustomAttributes({
      'guildid': '' + interaction.guildId,
      'userId': '' + interaction.user,
      'userDetails': interaction.user ? interaction.user.username + '#' + interaction.user.discriminator : '' + interaction.user,
      'channelid': '' + interaction.channelId
    });

    if (!interaction.isCommand()) {
      return;
    }
    commandHandler.handle(interaction);
  }
  _newrelic.startBackgroundTransaction(interaction.type, 'interactionCreate', handleCommand);
});

client.login(envs().jackboxkey)
