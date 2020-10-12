const DBL = require('dblapi.js')
const { DiscordWrapper } = require('../services/discordapiwrapper')
const discordWrapper = new DiscordWrapper()

const StatLogger = class StatLoggerWrap {
  constructor (topggkey, discordWrapper) {
    StatLoggerWrap.discordBotApi = new DBL(topggkey)
    StatLoggerWrap.discordWrapper = discordWrapper
  }

  postStats () {
    StatLoggerWrap.discordWrapper.updateStats().then((response) => {
      StatLoggerWrap.discordBotApi.postStats(response)
        .then(() => console.info('Posted stats to top.gg'))
        .catch((ex) => console.exception('Could not post stats', ex))
    })
  }
}

exports.startStatLogger = (props) => {
  const { topggkey } = props
  if (topggkey) {
    const statLogger = new StatLogger(topggkey, discordWrapper)
    statLogger.postStats()
    setInterval(statLogger.postStats, 1800000)
  }
}
