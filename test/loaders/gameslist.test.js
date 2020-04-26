const { describe, it } = require('mocha')
const chai = require('chai')
const expect = chai.expect
const url = require('url')
const path = require('path')
const gamesLoader = require('../../src/loaders/gameslist')
const testGames = require('../../src/data/testgames.json')

describe('GamesList', () => {
  it('should return example list of games', async () => {
    const localPath = path.join(__dirname, '..', '..', 'src/data/testgames.json')
    const returnedgames = await gamesLoader.getList(url.pathToFileURL(localPath))
    expect(returnedgames).to.eql(testGames)
  })
})
