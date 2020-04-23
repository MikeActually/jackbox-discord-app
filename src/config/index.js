const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
const url = require('url')

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

exports.envs = {
  gamesListUrl: gamesList,
  jackboxkey: process.env.JACKBOXKEY
}
