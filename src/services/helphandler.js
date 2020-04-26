const help = /^help.*/gi
const helpmessage = 'Jackbox game picker help:\n' + //
    '>>> usage: `!jackbox <command> <options>`\n' + //
    'commands: \n' + //
    ' - `game` - a random game from the Jackbox party packs\n' + //
    ' - `help` - this response\n' + //
    'game options:\n' + //
    ' - `X players` - filter by how many players you have\r\n' + //
    ' - `no audience` - must have player count, but will not show games\r\n' + //
    ' - `jp1 jp2 jp3 jp4 jp5 jp6` - limit which packs you want to select from\r\n' + //
    'examples:\n' + //
    ' - `!jackbox game 7 players no audience jp3 jp6`\r\n' + //
    ' - `!jackbox help`'

const helpbuilder = (props) => {
  const { jackboxrequest } = props
  help.lastIndex = 0
  const helpinfo = help.exec(jackboxrequest)
  if (helpinfo) {
    return helpmessage
  }
}

exports.handle = helpbuilder
exports.helpmessage = helpmessage
