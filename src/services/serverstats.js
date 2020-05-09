const { ServerStat } = require('../domain/serverstat')

const ServerStatsService = class {
  constructor () {
    this.guilds = {}
  }

  getGuildStats (asset) {
    if (Object.keys(this.guilds).includes(`${asset}`)) {
      return this.guilds[`${asset}`]
    }
  }

  addGuildStats (stats) {
    this.guilds[`${stats.getId()}`] = stats
  }

  logUsage (command, message) {
    const identifier = this.getLogAsFromMessage(message)
    let serverStats = this.getGuildStats(identifier)
    if (!serverStats) {
      serverStats = new ServerStat()
      serverStats.setName(this.getHumanReadableFromMessage(message))
      serverStats.setId(identifier)
      serverStats.setIsPerson(!message.guild)
      this.addGuildStats(serverStats)
    }
    this.getGuildStats(serverStats.getId()).logCommand(command)
  }

  getLogAsFromMessage (message) {
    return message.guild ? `${message.guild.id}` : `${message.author.id}`
  }

  getHumanReadableFromMessage (message) {
    return message.guild ? `${message.guild.name}` : `${message.author.username}#${message.author.discriminator}`
  }

  getSummary () {
    const summary = Object.keys(this.guilds).length > 0 ? Object.keys(this.guilds).map((guildKey) => this.guilds[guildKey].getSummary()).join('\n\n')
      : 'no data available'
    return 'Usage report:\n' + summary
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
