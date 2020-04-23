const axios = require('axios')
const fs = require('fs')
let returnedList = null

function downloadGames (url) {
  return axios.get(url)
    .then(res => res.data)
    .catch(error => console.log(error))
}

async function getList (gamePath) {
  if (returnedList != null) {
    console.log('stored list')
    return returnedList
  }
  switch (gamePath.protocol) {
    case 'file:':
      returnedList = JSON.parse(fs.readFileSync(gamePath, 'utf8'))
      return returnedList
    case 'https:':
    case 'http:':
      returnedList = await downloadGames(gamePath.toString())
      return returnedList
  }
};

function refreshList () {
  returnedList = null
  return getList()
}

exports.getList = getList
exports.refreshList = refreshList
