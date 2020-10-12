const path = require('path')
const { DiscordWrapper } = require('./discordapiwrapper')
const { envs } = require('../config')
const discordWrapper = new DiscordWrapper()

exports.spawnDiscordBot = (jackboxkey) => {
  const pathToBot = path.join(__dirname, 'discordbot.js')
  discordWrapper.spawnShard(pathToBot, envs().jackboxkey)
}
