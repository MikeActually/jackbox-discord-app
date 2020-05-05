const { describe, it } = require('mocha')
const { expect } = require('chai')
const { ServerStats } = require('../../src/services/serverstats')
const statsService = new ServerStats().get()

describe('ServerStats', () => {
  it('stores stats for commands', () => {
    const logAs = 'guildId'
    statsService.logUsage('help', logAs)
    expect(statsService.getSummary()).to.contain('Usage report:' + `
>>> ${logAs}:
\thelp: 1,
\tlastUsage:`)
  })
})
