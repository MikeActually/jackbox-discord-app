const Discord = require('discord.js')

exports.DiscordWrapper = class DiscordSingleton {
  constructor () {
    if (!DiscordSingleton.discordClient) {
      DiscordSingleton.discordClient = new Discord.Client()
    }
  }

  getClient () {
    return DiscordSingleton.discordClient
  }
}
