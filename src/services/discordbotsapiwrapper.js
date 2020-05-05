const DBL = require('dblapi.js')

const StatLogger = class {
  constructor (topggkey, discordClient) {
    this.discordBotApi = new DBL(topggkey)
    this.discordClient = discordClient
  }

  postStats () {
    this.discordBotApi.postStats(this.discordClient.guilds.cache.size)
      .then(() => {
        console.log('Posted stats to top.gg')
      })
      .catch(() => {
        console.log('Could not post stats')
      })
  }
}

exports.startStatLogger = (props) => {
  const { topggkey, discordclient } = props
  if (topggkey && discordclient) {
    const statLogger = new StatLogger(topggkey, discordclient)
    statLogger.postStats()
    setInterval(statLogger.postStats, 1800000)
  }
}
