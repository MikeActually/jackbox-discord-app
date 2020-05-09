const Filter = require('bad-words')
const filter = new Filter()

exports.Room = class {
  constructor (options, authorid = null) {
    if (authorid === null) {
      throw new Error('Invalid author')
    }
    this.parseOptions(options)
    this.createDate = new Date()
    this.setAuthorId(authorid)
  }

  parseOptions (options) {
    const pattern = /^([A-Z]{4,4})( .*)?$/i
    const matches = pattern.exec(options)
    if (matches) {
      this.roomCode = matches[1].toUpperCase()
      if (matches[2]) {
        this.setNotes(matches[2])
      }
    } else {
      throw new Error('Invalid room code')
    }
  }

  setAuthorId (authorId) {
    this.authorId = authorId
  }

  getAuthorId () {
    return this.authorId
  }

  setCreatedDate (date) {
    this.createDate = date
  }

  setNotes (description) {
    const maxlength = 100
    this.description = description && description.length > maxlength
      ? description.substring(0, maxlength) : description
  }

  getCode () {
    return this.roomCode
  }

  getNotes () {
    return this.description
  }

  getCreatedDate () {
    return this.createDate
  }

  getAgeInMinutes () {
    return Math.floor((new Date(new Date() - this.createDate) / (1000 * 60)) % 60)
  }

  getIsStale () {
    const twentyMinutes = 1000 * 60 * 20
    const createdDate = this.getCreatedDate()
    if (createdDate) {
      const fifteenBeforeNow = new Date(new Date() - twentyMinutes)
      return createdDate <= fifteenBeforeNow
    }
    return false
  }

  getRoomNote () {
    return filter.clean(`${this.getCode()}${this.getNotes() ? '\t' + this.getNotes() : ''}\t${this.getAgeInMinutes()} minutes ago`)
  }
}
