class Command {
  constructor (commandtext, options, server) {
    this.commandtext = commandtext
    this.options = options
    this.server = server
    this.timestamp = new Date()
  }

  getCommandText () {
    return this.commandtext
  }

  getOptions () {
    return this.options
  }

  getServer () {
    return this.server
  }

  getTimeStamp () {
    return this.timestamp
  }

  isStale (compareToDate) {
    const sixHours = 1000 * 60 * 60 * 6
    const sixHoursBeforeGivenTime = new Date(compareToDate - sixHours)
    return sixHoursBeforeGivenTime >= this.getTimeStamp()
  }

  isCommandRelated (commandToCompare) {
    return commandToCompare.getServer() === this.getServer()
  }

  toString () {
    return `Options used: ${this.getCommandText()} ${this.getOptions()}`
  }
}

exports.Command = Command
