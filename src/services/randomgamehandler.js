const packregex = /jp[1-6]/gi
const noaudienceregex = /(?:^| )no ?audience(?: |$)/gi
const playersregex = /(?:^| )([0-9]+) ?p(?:layers?)?(?: |$)/gi
const randomgame = /^game(?: (.+))?/gi
const nogame = 'I could not find a game for you.'

const getgamefilters = (message, packs) => {
  const thisfilter = {
    audience: true,
    players: 1,
    packs: []
  }
  if (message) {
    if (noaudienceregex.test(message)) {
      thisfilter.audience = false
      message = message.replace(noaudienceregex, '')
    }
    const playersmatches = playersregex.exec(message)
    if (playersmatches) {
      thisfilter.players = playersmatches[1]
      message = message.replace(playersregex, '')
      playersregex.lastIndex = 0
    }
    const options = message.split(' ')
    options.forEach(option => {
      packregex.lastIndex = 0
      if (packregex.test(option) && Object.keys(packs).includes(option.toLowerCase())) {
        thisfilter.packs.push(option.toLowerCase())
        message = message.replace(option, '')
      }
      packregex.lastIndex = 0
    })
  }
  return thisfilter
}

const randomgamehandler = (props) => {
  const { jackboxrequest, gameslist } = props

  randomgame.lastIndex = 0
  const randomgameinfo = randomgame.exec(jackboxrequest)

  if (randomgameinfo != null) {
    const optionData = randomgameinfo[1]
    const thisfilter = getgamefilters(optionData, gameslist.packs)

    const filteredGames = gameslist.games.filter(g =>
      g.minPlayers <= thisfilter.players && (g.maxPlayers >= thisfilter.players ||
            (thisfilter.players > g.maxPlayers && g.audience && thisfilter.audience)))
      .filter(g => {
        return thisfilter.packs.length > 0 ? thisfilter.packs.includes(g.pack) : Object.keys(gameslist.packs).includes(g.pack)
      })
    if (filteredGames.length > 0) {
      const indexid = Math.floor(Math.random() * filteredGames.length)
      return `${filteredGames[indexid].name} - ${gameslist.packs[filteredGames[indexid].pack]}`
    } else {
      return nogame
    }
  }
}

exports.handle = randomgamehandler
exports.nogame = nogame
