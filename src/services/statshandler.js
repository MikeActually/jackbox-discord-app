const { DiscordWrapper } = require('./discordapiwrapper')
const { envs } = require('../config')
const { msToTime } = require('../utility/timetostring')
const { ServerStats } = require('./serverstats')

exports.handleStats = (props) => {
  const discordWrapper = new DiscordWrapper()
  const serverStats = new ServerStats()
  const { author } = props
  const realClient = discordWrapper.getClient()
  const serverCount = realClient.guilds.cache.size // get for all shards?
  const uptimeInHours = msToTime(realClient.uptime)
  const readyTime = realClient.readyAt // tell all shards to reply?

  if (envs.appAdmins &&
    envs.appAdmins.filter(admin => admin.userName === author.userName &&
      admin.discriminator === author.discriminator).length > 0) {
    return `>>> Server count: ${serverCount}\n` + //
    `Last ready date: ${readyTime}\n` + //
    `Uptime: ${uptimeInHours}` + '\n\n' + serverStats.getSummary()
  }
}
