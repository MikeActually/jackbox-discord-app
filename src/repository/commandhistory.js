class CommandHistoryRepo {
  constructor () {
    if (!CommandHistoryRepo.repo) {
      CommandHistoryRepo.repo = []
    }
  }

  storeCommand (command) {
    this.cleanStaleCommands()
    this.cleanRelatedCommands(command)
    CommandHistoryRepo.repo.push(command)
  }

  cleanStaleCommands () {
    const currentDate = new Date()
    CommandHistoryRepo.repo = CommandHistoryRepo.repo.filter((command) => {
      return !command.isStale(currentDate)
    })
  }

  cleanRelatedCommands (commandToFind) {
    CommandHistoryRepo.repo = CommandHistoryRepo.repo.filter((command) => !command.isCommandRelated(commandToFind))
  }

  findRelatedCommand (commandToFind) {
    this.cleanStaleCommands()
    return CommandHistoryRepo.repo.find((command) => command.isCommandRelated(commandToFind))
  }

  findCommandByStoredAs (serverId) {
    this.cleanStaleCommands()
    return CommandHistoryRepo.repo.find((command) => command.getServer() === serverId)
  }
}

exports.CommandHistoryRepo = CommandHistoryRepo
