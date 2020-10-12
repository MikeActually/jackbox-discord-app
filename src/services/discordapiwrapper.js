const Discord = require('discord.js')

exports.DiscordWrapper = class DiscordSingleton {
  constructor () {
    if (!DiscordSingleton.discordClient) {
      DiscordSingleton.discordClient = new Discord.Client()
    }
    DiscordSingleton.serverCount = 0
  }

  getClient () {
    return DiscordSingleton.discordClient
  }

  spawnShard (app, key) {
    if (!DiscordSingleton.manager) {
      DiscordSingleton.manager = new Discord.ShardingManager(app, { token: key })
    }
    DiscordSingleton.manager.spawn()
    DiscordSingleton.manager.on('shardCreate', shard => {
      console.info(`Launched shard ${shard.id}`)
    })
  }

  getTotalGuildsPromise () {
    return this.getClient().shard.fetchClientValues('guilds.cache.size')
  }

  getServerCount () {
    return DiscordSingleton.serverCount
  }

  async updateStats () {
    return this.getTotalGuildsPromise().then((response) => {
      DiscordSingleton.serverCount = response.reduce((prev, guildCount) => prev + guildCount, 0)
      return this.getServerCount()
    }).catch((ex) => {
      console.exception('Could not get server count', ex)
    })
  }
}
