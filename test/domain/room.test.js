const chai = require('chai')
const { describe, it } = require('mocha')
const expect = chai.expect
const { Room } = require('../../src/domain/room.js')

describe('Room', () => {
  const code = 'ABCD'
  const author = { id: 123456 }
  it('should not allow long room codes', () => {
    const buildRoom = () => {
      return new Room('ABCDE', author.id)
    }
    expect(buildRoom).to.throw(Error)
  })
  it('should not allow numeric room codes', () => {
    const buildRoom = () => {
      return new Room('1234', author.id)
    }
    expect(buildRoom).to.throw(Error)
  })
  it('should not allow special char room codes', () => {
    const buildRoom = () => {
      return new Room('+-?`', author.id)
    }
    expect(buildRoom).to.throw(Error)
  })
  it('should description limit characters', () => {
    const room = new Room(code, author.id)
    room.setNotes('a'.repeat(200))
    expect(room.getNotes()).to.equal('a'.repeat(100))
  })
  it('should allow undefined notes', () => {
    const room = new Room(code, author.id)
    room.setNotes(undefined)
    expect(room.getNotes()).to.be.undefined
  })
  it('should allow short notes', () => {
    const room = new Room(code, author.id)
    room.setNotes('a note')
    expect(room.getNotes()).to.equal('a note')
  })
  it('should indicate 20 minutes ago as stale', () => {
    const room = new Room(code, author.id)
    const now = new Date()
    const fifteenMinutesAgo = new Date(now - (20 * 60 * 1000) - 1)
    room.setCreatedDate(fifteenMinutesAgo)
    expect(room.getIsStale()).to.be.true
  })
  it('should indicate 1 minute ago as not stale', () => {
    const room = new Room(code, author.id)
    const now = new Date()
    room.setCreatedDate(new Date(now - (60 * 1000)))
    expect(room.getIsStale()).to.be.false
  })
  it('should return correct age in minutes', () => {
    const room = new Room(code, author.id)
    const now = new Date()
    room.setCreatedDate(new Date(now - (15 * 60 * 1000)))
    expect(room.getAgeInMinutes()).to.equal(15)
  })
})
