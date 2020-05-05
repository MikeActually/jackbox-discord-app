const { describe, it } = require('mocha')
const { expect } = require('chai')
const { processRoomRequest } = require('../../src/services/roomhandler')

describe('RoomHandler', () => {
  it('responds appropriately when storing a room', () => {
    const ROOM_CODE = 'TESTCODE'
    const props = { commandOptions: `add ${ROOM_CODE}`, author: 'PERSONID' }
    expect(processRoomRequest(props)).to.eql(`Thank you for submitting your room ${ROOM_CODE}`)
  })
  it('should return room info', () => {
    const ROOM_CODE = 'TESTCODE'
    const props = { commandOptions: `add ${ROOM_CODE}`, author: 'PERSONID' }
    processRoomRequest(props)
    const listprops = { commandOptions: 'list', author: 'PERSONID' }
    expect(processRoomRequest(listprops)).to.eql(`>>> ${ROOM_CODE}`)
  })

  it('should return an empty response object if invalid command', () => {
    const props = { commandOptions: 'not a room' }
    expect(processRoomRequest(props)).to.eql(undefined)
  })

  // two rooms from one person only keeps most recent
  // same room from multiple people only keeps oldest
  // rooms expire after 20 minutes
  // rooms list will never be greater than 20
})
