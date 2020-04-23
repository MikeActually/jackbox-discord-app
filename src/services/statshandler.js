const { DiscordWrapper } = require('./discordapiwrapper')
const { msToTime } = require('../utility/timetostring')

exports.handleStats = (props) => {
  const { message, discordClient } = props
  const STATS_PATTERN = /^!stats(?: (.+))?/gi

  if (STATS_PATTERN.test(message)) {
    const realClient = discordClient || new DiscordWrapper().getClient()
    const serverCount = realClient.guilds.cache.size
    const uptimeInHours = msToTime(realClient.uptime)
    const readyTime = realClient.readyAt
    return `>>> Server count: ${serverCount}\n` + //
    `Last ready date: ${readyTime}\n` + //
    `Uptime: ${uptimeInHours}`
  }
}
