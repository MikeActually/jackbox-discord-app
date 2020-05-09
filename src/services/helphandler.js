exports.helpIntro = 'It looks like you need some help.'
const helpMessage =
  'Jackbox game picker help:\n' + //
    '>>> usage: `!jackbox <command> <options>`\n' + //
    'commands: \n' + //
    ' - `game` - a random game from the Jackbox party packs\n' + //
    ' - `help` - this response\n' + //
    ' - `room` - add or list recent room codes\n' + //
    'game options:\n' + //
    ' - `X players` - filter by how many players you have\n' + //
    ' - `no audience` - must have player count, but will not show games\n' + //
    ' - `jp1 jp2 jp3 jp4 jp5 jp6` - limit which packs you want to select from\n' + //
    'room options:\n' + //
    ' - `add XXXX` - add a room code to the list of codes\n' + //
    ' - `list` - gets list of room codes\n' + //
    'examples:\n' + //
    ' - `!jackbox game 7 players no audience jp3 jp6`\n' + //
    ' - `!jackbox room add ABCD`\n' + //
    ' - `!jackbox room list`\n' + //
    ' - `!jackbox help`'
exports.helpMessage = helpMessage
exports.handleHelp = () => {
  return helpMessage
}
