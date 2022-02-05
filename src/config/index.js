const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const url = require('url')

const envs = {}

const buildEnv = () => {
// Set the NODE_ENV to 'development' by default
  process.env.NODE_ENV = process.env.NODE_ENV || 'development'

  const envFound = dotenv.config()
  if (!envFound) {
  // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
  }
  let gamesList = process.env.GAMESLIST
  const localPath = path.join(__dirname, '..', gamesList)
  if (fs.existsSync(localPath)) {
    gamesList = url.pathToFileURL(localPath)
  } else {
    gamesList = new URL(gamesList)
  }

  envs.gamesListUrl = gamesList
  envs.jackboxkey = process.env.JACKBOXKEY
  envs.topggkey = process.env.TOPGGKEY
  envs.appId = process.env.APPID
  envs.guildId = process.env.GUILDID
  console.info('Environmentals Successfully loaded')
}

exports.envs = () => {
  if (Object.keys(envs).length === 0) {
    buildEnv()
  }
  return envs
}
