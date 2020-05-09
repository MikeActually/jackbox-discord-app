const { RoomRepo } = require('../repository/roomrepo')
const roomRepo = new RoomRepo()
const { Room } = require('../domain/room.js')

const getRooms = () => {
  const roomsList = roomRepo.getCurrentRooms()
  return roomsList.length > 0 ? `>>> ${roomsList.map(room => room.getRoomNote()).join('\n')}` : 'No rooms found'
}

const addRoom = (roomOptions, author) => {
  try {
    const room = new Room(roomOptions, author.id)
    roomRepo.saveRoom(room)
    return `Thank you for submitting your room \`${roomOptions}\``
  } catch (ex) {
    console.error('Could not process %s', roomOptions, ex)
    return `We're sorry, but we could not save that request: ${roomOptions}`
  }
}

const commands = {
  add: addRoom,
  list: getRooms
}

exports.processRoomRequest = (props) => {
  const roomregex = /^(\w+)(?: (.+))?/gi
  const { commandOptions, author } = props
  const roomRequest = roomregex.exec(commandOptions)
  if (roomRequest) {
    const responseText = commands[roomRequest[1].toLowerCase()]
      ? commands[roomRequest[1].toLowerCase()](roomRequest[2], author)
      : null
    if (responseText) { return responseText }
  }
}
