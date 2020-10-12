const { beforeEach, describe, it } = require('mocha')
const { expect } = require('chai')
const { processRoomRequest } = require('../../src/services/roomhandler')
const { RoomRepo } = require('../../src/repository/roomrepo')
const roomRepo = new RoomRepo()

describe('RoomHandler', () => {
  beforeEach(() => {
    roomRepo.removeAllRooms()
  })
  it('responds appropriately when storing a room', () => {
    const ROOM_CODE = 'ABCD'
    const props = { commandOptions: `add ${ROOM_CODE}`, author: { id: 'PERSONID' } }
    expect(processRoomRequest(props)).to.eql(`Thank you for submitting your room \`${ROOM_CODE}\``)
  })
  it('should return room info', () => {
    const ROOM_CODE = 'EFGH'
    const props = { commandOptions: `add ${ROOM_CODE}`, author: { id: 'PERSONID' } }
    processRoomRequest(props)
    const listprops = { commandOptions: 'list' }
    expect(processRoomRequest(listprops)).to.include(`${ROOM_CODE}\t0 minutes ago`)
  })
  it('should return an empty response object if invalid command', () => {
    const props = { commandOptions: 'not a room' }
    expect(processRoomRequest(props)).to.eql(undefined)
  })
  it('it should limit the number of codes', () => {
    const randomChar = () => String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase()
    const stringBuilder = () => randomChar() + randomChar() + randomChar() + randomChar()
    const ROOM_CODES = []
    for (var i = 0; i <= 20; i++) {
      ROOM_CODES.push(stringBuilder())
    }
    ROOM_CODES.forEach((roomCode) => {
      processRoomRequest({ commandOptions: `add ${roomCode}`, author: { id: `${roomCode}${Math.floor(Math.random() * 1000)}` } })
      const currentDate = Date.now()
      while (currentDate === Date.now()) {}
    })
    const firstItem = ROOM_CODES.splice(0, 1)

    const response = processRoomRequest({ commandOptions: 'list' })
    processRoomRequest({ commandOptions: 'list' })
    ROOM_CODES.forEach((roomCode) => {
      expect(response).to.include(`${roomCode}\t0 minutes ago`)
    })
    expect(response).to.not.include(`${firstItem}\t0 minutes ago`)
  })
  it('should only allow one room per author', () => {
    processRoomRequest({ commandOptions: 'add ABCD', author: { id: 'PERSONID' } })
    const currentDate = Date.now()
    while (currentDate === Date.now()) {}
    processRoomRequest({ commandOptions: 'add EFGH', author: { id: 'PERSONID' } })

    const roomsList = processRoomRequest({ commandOptions: 'list' })

    expect(roomsList).to.contain('EFGH')
    expect(roomsList).to.not.contain('ABCD')
  })
  it('should only allow same room code once', () => {
    processRoomRequest({ commandOptions: 'add ABCD', author: { id: 'PERSONID' } })
    const currentDate = Date.now()
    while (currentDate === Date.now()) {}
    processRoomRequest({ commandOptions: 'add ABCD', author: { id: 'PERSONID2' } })

    const roomsList = processRoomRequest({ commandOptions: 'list' })

    expect((roomsList.match(/ABCD/g) || []).length).to.equal(1)
  })
})
