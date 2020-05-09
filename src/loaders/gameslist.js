const axios = require('axios')
const fs = require('fs')

const GameLoader = class GameLoader {
  constructor () {
    this.gamesList = {
      games: [
      ],
      packs: {
      }
    }
  }

  init (path) {
    this.gamePath = path
    this.downloadList()
  }

  downloadGames (url) {
    return axios.get(url)
      .then(res => {
        console.info('Successfully retreived gameslist')
        return res.data
      })
      .catch(error => {
        console.error(error)
        return this.gamesList
      })
  };

  async downloadList () {
    console.info(`loading list from path ${this.gamePath}`)
    switch (this.gamePath.protocol) {
      case 'file:':
        this.gamesList = JSON.parse(fs.readFileSync(this.gamePath, 'utf8'))
        break
      case 'https:':
      case 'http:':
        this.gamesList = await this.downloadGames(this.gamePath.toString())
        break
    }
  }

  getList () {
    return this.gamesList
  }
}

exports.GamesListLoader = class GameLoaderWrapper {
  constructor () {
    if (!GameLoaderWrapper.instance) {
      GameLoaderWrapper.instance = new GameLoader()
    }
  }

  init (path) {
    GameLoaderWrapper.instance.init(path)
  }

  getList () {
    return GameLoaderWrapper.instance.getList()
  }
}
