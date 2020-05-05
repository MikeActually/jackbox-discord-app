const { GamesListLoader } = require('../loaders/gameslist')
const gamesListWrapper = new GamesListLoader()

const nogame = 'I could not find a game for you.'

const getgamefilters = (message, packs) => {
  const noaudienceregex = /(?:^| )no ?audience(?: |$)/gi
  const playersregex = /(?:^| )([0-9]+) ?p(?:layers?)?(?: |$)/gi
  const thisfilter = {
    audience: true,
    players: null,
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
    }
    const options = message.split(' ')
    options.forEach(option => {
      const packregex = /jp[1-6]/gi
      if (packregex.test(option) && Object.keys(packs).includes(option.toLowerCase())) {
        thisfilter.packs.push(option.toLowerCase())
        message = message.replace(option, '')
      }
    })
  }
  return thisfilter
}

exports.randomgamehandler = (props) => {
  const { commandOptions } = props

  const gamesList = gamesListWrapper.getList()
  const packs = gamesList.packs
  const thisfilter = getgamefilters(commandOptions, packs)

  const filteredGames = gamesList.games.filter(g =>
    thisfilter.players === null ||
    (g.minPlayers <= thisfilter.players &&
        (g.maxPlayers >= thisfilter.players ||
        (thisfilter.players > g.maxPlayers && g.audience && thisfilter.audience))
    ))
    .filter(g => {
      return thisfilter.packs.length > 0 ? thisfilter.packs.includes(g.pack) : Object.keys(packs).includes(g.pack)
    })
  if (filteredGames.length > 0) {
    const indexid = Math.floor(Math.random() * filteredGames.length)
    return `${filteredGames[indexid].name} - ${packs[filteredGames[indexid].pack]}: ${filteredGames[indexid].minPlayers}-${filteredGames[indexid].maxPlayers} players`
  } else {
    return nogame
  }
}
