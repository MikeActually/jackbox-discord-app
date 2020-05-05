const ServerStatsService = class {
  constructor () {
    this.guilds = {}
  }

  getGuildStats (guild) {
    if (!Object.keys(this.guilds).includes(guild)) {
      this.guilds[guild] = {}
    }
    return this.guilds[guild]
  }

  logUsage (command, logAs) {
    const guildStats = this.getGuildStats(logAs)
    guildStats[command] = guildStats[command] ? guildStats[command] + 1 : 1
    guildStats.lastUsage = new Date()
  }

  getSummary () {
    return 'Usage report:' + //
        `${Object.keys(this.guilds).map((guildKey) => {
            return `\n>>> ${guildKey}:${Object.keys(this.guilds[guildKey]).map((statKey) => {
                return `\n\t${statKey}: ${this.guilds[guildKey][statKey]}`
            })}`
        })}`
  }
}

exports.ServerStats = class ServerStatsSingleton {
  constructor () {
    if (!ServerStatsSingleton.instance) {
      ServerStatsSingleton.instance = new ServerStatsService()
    }
  }

  get () {
    return ServerStatsSingleton.instance
  }

  getSummary () {
    return ServerStatsSingleton.instance.getSummary()
  }
}
