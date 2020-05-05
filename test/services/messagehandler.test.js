const sinon = require('sinon')
const { beforeEach, describe, it } = require('mocha')
const { expect } = require('chai')

const messagehander = require('../../src/services/messagehandler')
const testGames = require('../../src/data/testgames.json')
const { DiscordWrapper } = require('../../src/services/discordapiwrapper')
const { envs } = require('../../src/config')
const { GamesListLoader } = require('../../src/loaders/gameslist')
const { helpIntro, helpMessage } = require('../../src/services/helphandler')
const { msToTime } = require('../../src/utility/timetostring')

describe('MessageHandler', () => {
  describe('Jackbox', () => {
    const gamesListStub = sinon.stub(GamesListLoader.instance, 'gamesList')
    const nogame = 'I could not find a game for you.'
    const formatGame = (game, gameslist = testGames) => {
      return `${game.name} - ${gameslist.packs[game.pack]}: ${game.minPlayers}-${game.maxPlayers} players`
    }
    beforeEach(() => {
      gamesListStub.value(testGames)
      DiscordWrapper.discordClient = undefined
    })
    it('should return null when unknown', () => {
      const message = { content: 'not a jackbox message' }
      const props = { message }
      expect(messagehander.handle(props)).to.be.undefined
    })
    it('will return help message when no command provided', () => {
      const message = { content: '!jackbox' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(helpIntro + '\n' + helpMessage)
    })
    it('will return a random game when only game keyword is provided', () => {
      const message = { content: '!jackbox game' }
      const singleGamesList = {
        games: [testGames.games[0]],
        packs: {
          jp5: 'Unit Test Pack'
        }
      }
      gamesListStub.value(singleGamesList)
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
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
      gamesListStub.value(singleGamesList)

      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
    })
    it('will return a game with \'s\' missing from player', () => {
      const message = { content: '!jackbox game 1player' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[0]))
    })
    it('will return a game with only a \'p\' indicator', () => {
      const message = { content: '!jackbox game 7p' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return a game with only a \'p\' and a space', () => {
      const message = { content: '!jackbox game 7 p' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return a default game with incorrect player options', () => {
      const message = { content: '!jackbox game 7 petunias' }
      const props = { message: message }
      const singleGamesList = {
        games: [testGames.games[1]],
        packs: {
          jp3: 'Unit Test Pack',
          jp6: 'Sample Test Pack'
        }
      }
      gamesListStub.value(singleGamesList)
      expect(messagehander.handle(props)).to.equal(formatGame(singleGamesList.games[0], singleGamesList))
    })
    it('will return appropriate game based on player count', () => {
      const message = { content: '!jackbox game 7players' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return appropriate game based on player count but including a space', () => {
      const message = { content: '!jackbox game 7 players' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return audience games when player count is over the max', () => {
      const message = { content: '!jackbox game 21players' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return nothing when player count exceeds all games and \'noaudience\' is wanted', () => {
      const message = { content: '!jackbox game 21players noaudience' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(nogame)
    })
    it('will return nothing when player count exceeds all games and \'no audience\' is wanted', () => {
      const message = { content: '!jackbox game 21players no audience' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(nogame)
    })
    it('will return a game based on jackbox pack', () => {
      const message = { content: '!jackbox game jp5' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[0]))
    })
    it('will return a game based on combination filter', () => {
      const message = { content: '!jackbox game jp3 7p no audience' }
      const props = { message: message }
      expect(messagehander.handle(props)).to.equal(formatGame(testGames.games[1]))
    })
    it('will return help when nonsense is entered', () => {
      const message = { content: '!jackbox nonsense' }
      const props = { message: message, gameslist: testGames }
      expect(messagehander.handle(props)).to.equal(helpIntro + '\n' + helpMessage)
    })
    it('will return stats when stats are requested', () => {
      const testGuilds = new Map()
      testGuilds.set('guildid1', {})
      testGuilds.set('guildid2', {})
      const testChannels = new Map()
      testChannels.set('channel1', {})
      testChannels.set('channel2', {})
      testChannels.set('channel3', {})

      const fakeObject = {
        uptime: 1234567,
        guilds: { cache: testGuilds },
        readyAt: new Date(),
        channels: { cache: testChannels }
      }
      DiscordWrapper.discordClient = fakeObject

      envs.appAdmins = [{
        userName: 'testsUser', discriminator: '12345'
      }]

      const serverCount = testGuilds.size
      const uptimeInHours = msToTime(fakeObject.uptime)
      const readyTime = fakeObject.readyAt
      const statsmessage = `>>> Server count: ${serverCount}\n` + //
        `Last ready date: ${readyTime}\n` + //
        `Uptime: ${uptimeInHours}\n\n` + //
        'Usage report:'

      const message = { content: '!jackbox stats', author: envs.appAdmins[0] }
      const props = { message: message }

      const response = messagehander.handle(props)
      expect(response).to.equal(statsmessage)
    })
  })
})
