const sinon = require('sinon')
const { beforeEach, describe, it } = require('mocha')
const { expect } = require('chai')

const randomgamehandler = require('../../src/services/randomgamehandler')
const testGames = {
  "games": [
    {
      "name": "Sample Game",
      "minPlayers": 1,
      "maxPlayers": 4,
      "pack": "jp5",
      "audience": false
    },
    {
      "name": "Example Game",
      "minPlayers": 6,
      "maxPlayers": 20,
      "pack": "jp3",
      "audience": true
    }
  ],
  "packs": {
    "jp3": "Sample Pack",
    "jp5": "Example Pack"
  }
}
const { GamesListLoader } = require('../../src/loaders/gameslist')

describe('RandomGameFinder', () => {
  describe('Jackbox', () => {
    const gamesListStub = sinon.stub(GamesListLoader.instance, 'gamesList')
    const nogame = 'I could not find a game for you.'
    const author = { id: 22222, username: 'Some User', discriminator: '4321' }
    const formatGame = (game, gameslist = testGames) => {
      return `${game.name} - ${gameslist.packs[game.pack]}: ${game.minPlayers}-${game.maxPlayers} players`
    }
    beforeEach(() => {
      gamesListStub.value(testGames)
    })
    it('should be could not find game when props empty', () => {
      const props = {}
      expect(randomgamehandler.randomgamecommand(props)).to.equal(nogame)
    })
    it('should be could not find game when undefined', () => {
      expect(randomgamehandler.randomgamecommand(undefined)).to.equal(nogame)
    })
    it('should be could not find game when null', () => {
      expect(randomgamehandler.randomgamecommand(null)).to.equal(nogame)
    })
    it('should be could not find game when only packs provided', () => {
      expect(randomgamehandler.randomgamecommand({ 'jackpacks': ['jp1', 'jp2', 'jp4'] })).to.equal(nogame)
    })
    it('should be could not find game when only audience provided', () => {
      expect(randomgamehandler.randomgamecommand({ 'audience': true })).to.equal(nogame)
    })
    it('should be could not find game when both audience and packs provided', () => {
      expect(randomgamehandler.randomgamecommand({ 'audience': true, 'jackpacks': ['jp1', 'jp2', 'jp3'] })).to.equal(nogame)
    })
    it('will return a random game when only players are provided', () => {
      const singleGamesList = {
        games: [testGames.games[0]],
        packs: {
          jp5: 'Unit Test Pack'
        }
      }
      gamesListStub.value(singleGamesList)
      const props = { 'players': 1 }
      expect(randomgamehandler.randomgamecommand(props)).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
    })
    it('will return a random game when multiple packs are provided', () => {
      const singleGamesList = {
        games: [testGames.games[0]],
        packs: {
          jp5: 'Unit Test Pack',
          jp6: 'Sample Test Pack'
        }
      }
      gamesListStub.value(singleGamesList)

      expect(randomgamehandler.randomgamecommand({ 'players': 1, 'jackpacks': ['jp5', 'jp6'] })).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
    })
    it('will return a game from correct pack', () => {
      const singleGamesList = {
        games: [{
          'name': 'Sample Game1',
          'minPlayers': 1,
          'maxPlayers': 4,
          'pack': 'jp1'
        }, {
          'name': 'Sample Game2',
          'minPlayers': 1,
          'maxPlayers': 4,
          'pack': 'jp2'
        },],
        packs: {
          'jp1': 'Pack 1',
          'jp2': 'Pack 2'
        }
      }
      gamesListStub.value(singleGamesList)
      expect(randomgamehandler.randomgamecommand({ 'players': 1, 'jackpacks': ['jp1'] })).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
      expect(randomgamehandler.randomgamecommand({ 'players': 1, 'jackpacks': ['jp2'] })).to.equal(formatGame(singleGamesList.games[1], singleGamesList))
    })
    it('will return appropriate game based on player count', () => {
      expect(randomgamehandler.randomgamecommand({ 'players': 7 })).to.equal(formatGame(testGames.games[1]))
    })
    it('will return nothing when player count exceeds all games and audience is not set', () => {
      expect(randomgamehandler.randomgamecommand({ 'players': 21 })).to.equal(nogame)
    })
    it('will return nothing when player count exceeds all games and audience fale', () => {
      expect(randomgamehandler.randomgamecommand({ 'players': 21, 'audience': false })).to.equal(nogame)
    })
    it('will return audience game when audience true and player count exceeds games', () => {
      expect(randomgamehandler.randomgamecommand({ 'players': 21, 'audience': true })).to.equal(formatGame(testGames.games[1]))
    })
    it('will return a game based on combination filter', () => {
      expect(randomgamehandler.randomgamecommand({ 'players': 7, 'audience': false, 'jackpacks':'jp3' })).to.equal(formatGame(testGames.games[1]))
    })
  })
})
