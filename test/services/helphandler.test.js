const { describe, it } = require('mocha')
const { expect } = require('chai')
const { handleHelp, helpMessage } = require('../../src/services/helphandler')

describe('HelpHandler', () => {
  it('should return help when is a help command', () => {
    const props = { jackboxrequest: 'help' }
    expect(handleHelp(props)).to.equal(helpMessage)
  })
  it('should return help when is a help is accompanied with other things', () => {
    const props = { jackboxrequest: 'help and then some' }
    expect(handleHelp(props)).to.equal(helpMessage)
  })
})
