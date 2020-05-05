const chai = require('chai')
const { describe, it } = require('mocha')
const expect = chai.expect
const path = require('path')
const testGames = require('../../src/data/testgames.json')
const url = require('url')
const { GamesListLoader } = require('../../src/loaders/gameslist')
const gamesListWrapper = new GamesListLoader()

describe('GamesList', () => {
  it('should return example list of games', async () => {
    const localPath = path.join(__dirname, '..', '..', 'src/data/testgames.json')
    gamesListWrapper.init(url.pathToFileURL(localPath))
    expect(gamesListWrapper.getList()).to.eql(testGames)
  })
})
