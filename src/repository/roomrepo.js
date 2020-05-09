class RoomRepo {
  constructor () {
    this.roomsList = []
  }

  saveRoom (room) {
    const authorsRoom = this.findRoomByAuthor(room.getAuthorId())
    if (authorsRoom) {
      this.deleteRoom(authorsRoom)
    }
    if (!this.findRoomByCode(room.getCode())) {
      this.roomsList.push(room)
      this.cleanRooms()
    } else {
      throw new Error('Room already exists')
    }
  }

  deleteRoom (room) {
    const roomIndex = this.roomsList.indexOf(room)
    this.roomsList.splice(roomIndex, 1)
  }

  cleanRooms () {
    const maxRooms = 20
    this.roomsList = this.roomsList.filter(room => !room.getIsStale())
    this.roomsList.sort((a, b) => {
      return a.getCreatedDate() < b.getCreatedDate() ? -1 : a.getCreatedDate() === b.getCreatedDate() ? 0 : 1
    })
    this.roomsList.reverse()
    if (this.roomsList.length > maxRooms) {
      this.roomsList = this.roomsList.slice(0, maxRooms)
    }
  }

  getRooms () {
    return this.roomsList
  }

  findRoomByCode (code) {
    this.cleanRooms()
    return this.roomsList.find(room => room.getCode() === code.toUpperCase())
  }

  findRoomByAuthor (authorid) {
    this.cleanRooms()
    return this.roomsList.find(room => room.getAuthorId() === authorid)
  }

  demolishRooms () {
    this.roomsList = []
  }
}

exports.RoomRepo = class RoomRepoWrapper {
  constructor () {
    if (!RoomRepoWrapper.instance) {
      RoomRepoWrapper.instance = new RoomRepo()
    }
  }

  saveRoom (room) {
    RoomRepoWrapper.instance.saveRoom(room)
  }

  getCurrentRooms () {
    RoomRepoWrapper.instance.cleanRooms()
    return RoomRepoWrapper.instance.getRooms()
  }

  removeAllRooms () {
    RoomRepoWrapper.instance.demolishRooms()
  }
}
