const roomsList = {}

const getRooms = () => {
  return `>>> ${Object.keys(roomsList).map(key => key).join('\n')}`
}

const addRoom = (roomOptions, author) => {
  roomsList[roomOptions] = { author }
  return `Thank you for submitting your room ${roomOptions}`
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
