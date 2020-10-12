const { handleHelp, helpIntro, helpMessage } = require('./helphandler')
const { handleStats } = require('./statshandler')
const { processRoomRequest } = require('./roomhandler')
const { randomgamehandler } = require('./randomgamehandler')

const messageCommands = {
  stats: handleStats,
  help: handleHelp,
  game: randomgamehandler,
  room: processRoomRequest
}

exports.handle = (props) => {
  const jackboxformat = /^!(?:jackbox|jb)(?: (\w+)(?: (.+))?)?$/gi
  const { message } = props
  const jackboxinfo = jackboxformat.exec(message.content)
  if (jackboxinfo !== null) {
    let responseText
    const commandProps = {
      author: message.author,
      guild: message.guild
    }
    const jackboxCmd = jackboxinfo[1] ? jackboxinfo[1].toLowerCase() : undefined
    commandProps.commandOptions = jackboxinfo[2] ? jackboxinfo[2] : undefined
    if (jackboxCmd) {
      responseText = messageCommands[jackboxCmd]
        ? messageCommands[jackboxCmd](commandProps)
        : null
    }
    return responseText || helpIntro + '\n' + helpMessage // add tag to help?
  }
}
