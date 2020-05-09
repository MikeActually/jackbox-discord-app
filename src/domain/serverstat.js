exports.ServerStat = class {
  constructor () {
    this.name = undefined
    this.id = undefined
    this.firstUsage = new Date()
    this.lastUsage = new Date()
    this.commandUsage = {}
    this.isPerson = false
  }

  logCommand (command) {
    this.commandUsage[command] = this.commandUsage[command] ? this.commandUsage[command] + 1 : 1
    this.lastUsage = new Date()
  }

  getStats () {
    return this.commandUsage
  }

  setName (name) {
    this.name = name
  }

  getName () {
    return this.name
  }

  setId (id) {
    this.id = id
  }

  getId () {
    return this.id
  }

  getFirstUsage () {
    return this.firstUsage
  }

  getLastUsage () {
    return this.lastUsage
  }

  setIsPerson (isPerson) {
    this.isPerson = isPerson
  }

  getIsPerson () {
    return this.isPerson
  }

  getSummary () {
    return `Name: ${this.getName()}` + //
    `\nID: ${this.getId()}` + //
    `\nType: ${this.getIsPerson() ? 'Person' : 'Server'}` + //
    `\nFirst action: ${this.getFirstUsage()}` + //
    `\nMost recent log: ${this.getLastUsage()}` + //
    `\nCommand Usage:\n${this.getCommandSummary()}`
  }

  getCommandSummary () {
    return Object.keys(this.getStats()).map(key => {
      return ` - \`${key}\`: ${this.getStats()[key]}`
    }).join('\n')
  }
}
