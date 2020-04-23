const { beforeEach, describe, it } = require('mocha')
const { expect } = require('chai')

const messagehander = require('../../src/services/messagehandler')
const testGames = require('../../src/data/testgames.json')
const randomgame = require('../../src/services/randomgamehandler')
const helper = require('../../src/services/helphandler')
const { msToTime } = require('../../src/utility/timetostring')

describe('MessageHandler', () => {
  describe('Jackbox', () => {
    const expectedObject = {
      replies: [],
      messages: []
    }
    beforeEach(() => {
      expectedObject.replies = []
      expectedObject.messages = []
    })
    it('should return null when unknown', () => {
      const message = { content: 'not a jackbox message' }
      const props = { message, gameslist: testGames }
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return help message when no command provided', () => {
      const message = { content: '!jackbox' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(messagehander.needhelp)
      expectedObject.messages.push(helper.helpmessage)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a random game when only game keyword is provided', () => {
      const message = { content: '!jackbox game' }
      const singleGamesList = {
        games: [testGames.games[0]],
        packs: {
          jp5: 'Unit Test Pack'
        }
      }
      const props = { message: message, gameslist: singleGamesList }
      expectedObject.replies.push(`${singleGamesList.games[0].name} - ${singleGamesList.packs[singleGamesList.games[0].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a random game when multiple packs are provided', () => {
      const message = { content: '!jackbox game jp5 jp6' }
      const singleGamesList = {
        games: [testGames.games[0]],
        packs: {
          jp5: 'Unit Test Pack',
          jp6: 'Sample Test Pack'
        }
      }
      const props = { message: message, gameslist: singleGamesList }
      expectedObject.replies.push(`${singleGamesList.games[0].name} - ${singleGamesList.packs[singleGamesList.games[0].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a game with \'s\' missing from player', () => {
      const message = { content: '!jackbox game 1player' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[0].name} - ${testGames.packs[testGames.games[0].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a game with only a \'p\' indicator', () => {
      const message = { content: '!jackbox game 7p' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a game with only a \'p\' and a space', () => {
      const message = { content: '!jackbox game 7 p' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a default game with incorrect player options', () => {
      const message = { content: '!jackbox game 7 petunias' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[0].name} - ${testGames.packs[testGames.games[0].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return appropriate game based on player count', () => {
      const message = { content: '!jackbox game 7players' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return appropriate game based on player count but including a space', () => {
      const message = { content: '!jackbox game 7 players' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return audience games when player count is over the max', () => {
      const message = { content: '!jackbox game 21players' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return nothing when player count exceeds all games and \'noaudience\' is wanted', () => {
      const message = { content: '!jackbox game 21players noaudience' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(randomgame.nogame)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return nothing when player count exceeds all games and \'no audience\' is wanted', () => {
      const message = { content: '!jackbox game 21players no audience' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(randomgame.nogame)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a game based on jackbox pack', () => {
      const message = { content: '!jackbox game jp5' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[0].name} - ${testGames.packs[testGames.games[0].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return a game based on combination filter', () => {
      const message = { content: '!jackbox game jp3 7p no audience' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(`${testGames.games[1].name} - ${testGames.packs[testGames.games[1].pack]}`)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return help when nonsense is entered', () => {
      const message = { content: '!jackbox nonsense' }
      const props = { message: message, gameslist: testGames }
      expectedObject.replies.push(messagehander.needhelp)
      expectedObject.messages.push(helper.helpmessage)
      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
    it('will return stats when stats are requested', () => {
      const testGuilds = new Map()
      testGuilds.set('guildid1', {})
      testGuilds.set('guildid2', {})
      const testChannels = new Map()
      testChannels.set('channel1', {})
      testChannels.set('channel2', {})
      testChannels.set('channel3', {})

      const mockClient = {
        guilds: { cache: testGuilds },
        uptime: 1234567,
        readyAt: new Date(),
        channels: { cache: testChannels }
      }

      const serverCount = testGuilds.size
      const uptimeInHours = msToTime(mockClient.uptime)
      const readyTime = mockClient.readyAt
      const statsmessage = `>>> Server count: ${serverCount}\n` + //
        `Last ready date: ${readyTime}\n` + //
        `Uptime: ${uptimeInHours}`
      expectedObject.messages.push(statsmessage)

      const message = { content: '!stats' }
      const props = { message: message, gameslist: testGames, discordClient: mockClient }

      expect(messagehander.handle(props)).to.eql(expectedObject)
    })
  })
})
