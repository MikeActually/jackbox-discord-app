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

  let appAdmins
  try {
    appAdmins = JSON.parse(process.env.APPADMINS)
  } catch {
    appAdmins = process.env.APPADMINS ? [process.env.APPADMINS] : []
  }

  const processedAdmins = appAdmins.map((admin) => {
    const adminParts = admin.split('#')
    return {
      username: adminParts[0],
      discriminator: adminParts[1]
    }
  })
  envs.gamesListUrl = gamesList
  envs.jackboxkey = process.env.JACKBOXKEY
  envs.topggkey = process.env.TOPGGKEY
  envs.appAdmins = processedAdmins
  console.info('Environmentals Successfully loaded')
}

exports.envs = () => {
  if (Object.keys(envs).length === 0) {
    buildEnv()
  }
  return envs
}
