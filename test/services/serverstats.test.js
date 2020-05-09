const { describe, it } = require('mocha')
const { expect } = require('chai')
const { ServerStats } = require('../../src/services/serverstats')
const statsService = new ServerStats().get()

describe('ServerStats', () => {
  it('stores stats for commands to guild', () => {
    const guildName = 'Some Guild'
    const guildId = 11111
    const authorId = 54321
    const authorName = 'Some Guy'
    const authorDiscriminator = '12345'
    const message = {
      guild: {
        id: guildId,
        name: guildName
      },
      author: {
        id: authorId,
        username: authorName,
        discriminator: authorDiscriminator
      }
    }

    statsService.logUsage('help', message)
    const summary = statsService.getSummary()
    expect(summary).to.contain(`Usage report:\nName: ${guildName}\nID: ${guildId}\nType: Server\nFirst action:`)
    expect(summary).to.contain('\nMost recent log:')
    expect(summary).to.contain('\nCommand Usage:\n - `help`: 1')
    statsService.logUsage('help', message)
    const summary2 = statsService.getSummary()
    expect(summary2).to.contain('\nCommand Usage:\n - `help`: 2')
  })
  it('stores stats for commands to author', () => {
    const authorId = 54321
    const authorName = 'Some Guy'
    const authorDiscriminator = '12345'
    const message = {
      author: {
        id: authorId,
        username: authorName,
        discriminator: authorDiscriminator
      }
    }

    statsService.logUsage('help', message)
    const summary = statsService.getSummary()
    expect(summary).to.contain('Usage report:\n')
    expect(summary).to.contain(`Name: ${authorName}#${authorDiscriminator
    }\nID: ${authorId}\nType: Person\nFirst action:`)
    expect(summary).to.contain('\nMost recent log:')
    expect(summary).to.contain('\nCommand Usage:\n - `help`: 1')
  })
})
