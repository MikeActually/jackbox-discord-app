const { DiscordWrapper } = require('./discordapiwrapper')
const { envs } = require('../config')
const { msToTime } = require('../utility/timetostring')
const { ServerStats } = require('./serverstats')
const discordWrapper = new DiscordWrapper()

exports.handleStats = (props) => {
  const serverStats = new ServerStats()
  const { author } = props
  const realClient = discordWrapper.getClient()
  const uptimeInHours = msToTime(realClient.uptime)
  const readyTime = realClient.readyAt // tell all shards to reply?

  if (envs().appAdmins &&
    envs().appAdmins.filter(admin => admin.username === author.username &&
      admin.discriminator === author.discriminator).length > 0) {
    return `>>> Server count: ${discordWrapper.getServerCount()}\n` + //
    `Last ready date: ${readyTime}\n` + //
    `Uptime: ${uptimeInHours}` + '\n\n' + serverStats.getSummary()
  }
}
