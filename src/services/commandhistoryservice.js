const { CommandHistoryRepo } = require('../repository/commandhistory')
const commandHistoryRepo = new CommandHistoryRepo()
const { Command } = require('../domain/command')

exports.getLastCommandForServer = (serverId) => {
  return commandHistoryRepo.findCommandByStoredAs(serverId)
}

exports.storeMostRecentCommand = (props) => {
  const { commandText, options, serverId } = props
  const commandToStore = new Command(commandText, options, serverId)
  commandHistoryRepo.storeCommand(commandToStore)
}
