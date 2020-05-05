const { handleHelp, helpIntro, helpMessage } = require('./helphandler')
const { handleStats } = require('./statshandler')
const { randomgamehandler } = require('./randomgamehandler')

const messageCommands = {
  stats: handleStats,
  help: handleHelp,
  game: randomgamehandler,
  room: () => { return 'WIP' }
}

exports.handle = (props) => {
  const jackboxformat = /^!jackbox(?: (\w+)(?: (.+))?)?$/gi
  const { message } = props
  const jackboxinfo = jackboxformat.exec(message.content)
  if (jackboxinfo !== null) {
    let responseText
    if (jackboxinfo[1] !== undefined) {
      const jackboxCmd = jackboxinfo[1].toLowerCase()
      const props = {
        commandOptions: jackboxinfo[2],
        author: message.author,
        guild: message.guild
      }
      responseText = messageCommands[jackboxCmd]
        ? messageCommands[jackboxCmd](props)
        : null
    }
    return responseText || helpIntro + '\n' + helpMessage // add tag to help?
  }
}
