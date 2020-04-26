const { describe, it } = require('mocha')
const { expect } = require('chai')
const helphandler = require('../../src/services/helphandler')

describe('HelpHandler', () => {
  it('should return null when not a help message', () => {
    const props = { jackboxrequest: 'not a help message' }
    expect(helphandler.handle(props)).to.be.undefined
  })
  it('should return help when is a help command', () => {
    const props = { jackboxrequest: 'help' }
    expect(helphandler.handle(props)).to.equal(helphandler.helpmessage)
  })
  it('should return help when is a help is accompanied with other things', () => {
    const props = { jackboxrequest: 'help and then some' }
    expect(helphandler.handle(props)).to.equal(helphandler.helpmessage)
  })
})
