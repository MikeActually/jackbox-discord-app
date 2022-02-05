const { GamesListLoader } = require('../loaders/gameslist')
const gamesListWrapper = new GamesListLoader()

const nogame = 'I could not find a game for you.'

exports.randomgamecommand = (props) => {
  if(!props) {
    return nogame
  }
  const { players, audience, jackpacks } = props
  if(!players) {
    return nogame
  }

  const gamesList = gamesListWrapper.getList()
  const packs = gamesList.packs
  const thisfilter = {
    audience: typeof audience != 'undefined' && audience != null ? audience : false,
    players,
    packs: jackpacks ? jackpacks : []
  }
  const filteredGames = getPossibleGames(gamesList, thisfilter, packs)
  return getRandomGame(filteredGames, packs);
}
function getRandomGame(filteredGames, packs) {
  if (filteredGames.length > 0) {
    const indexid = Math.floor(Math.random() * filteredGames.length)
    return `${filteredGames[indexid].name} - ${packs[filteredGames[indexid].pack]}: ${filteredGames[indexid].minPlayers}-${filteredGames[indexid].maxPlayers} players`
  } else {
    return nogame
  }
}
function getPossibleGames(gamesList, thisfilter, packs) {
  return gamesList.games.filter(g => thisfilter.players === null ||
    (g.minPlayers <= thisfilter.players &&
      (g.maxPlayers >= thisfilter.players ||
        (thisfilter.players > g.maxPlayers && g.audience && thisfilter.audience))
    ))
    .filter(g => {
      return thisfilter.packs && thisfilter.packs.length > 0 ? thisfilter.packs.includes(g.pack) : Object.keys(packs).includes(g.pack)
    })
}

