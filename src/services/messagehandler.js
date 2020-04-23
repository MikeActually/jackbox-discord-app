const gamerandomizer = require('./randomgamehandler')
const helper = require('./helphandler')
const { handleStats } = require('./statshandler')

const needhelp = 'It looks like you need some help.'

const messagehandler = (props) => {
  const jackboxformat = /^!jackbox(?: (.+))?/gi
  const { message, gameslist, discordClient } = props
  const jackboxinfo = jackboxformat.exec(message.content)
  const responses = {
    replies: [],
    messages: []
  }
  if (jackboxinfo !== null) {
    if (jackboxinfo[1] !== undefined) {
      const randomgameresponse = gamerandomizer.handle({ jackboxrequest: jackboxinfo[1], gameslist })
      if (randomgameresponse) {
        responses.replies.push(randomgameresponse)
      }
      const help = helper.handle({ jackboxrequest: jackboxinfo[1] })
      if (help) {
        responses.messages.push(help)
      }
    }
    if (responses.messages.length === 0 && responses.replies.length === 0) {
      responses.replies.push(needhelp)
      responses.messages.push(helper.helpmessage)
    }
  }
  const stats = handleStats({ message: message.content, discordClient })
  if (stats) {
    responses.messages.push(stats)
  }
  return responses
}

exports.handle = messagehandler
exports.needhelp = needhelp
