exports.msToTime = (duration) => {
  var milliseconds = parseInt((duration % 1000))
  var seconds = Math.floor((duration / 1000) % 60)
  var minutes = Math.floor((duration / (1000 * 60)) % 60)
  var hours = Math.floor(duration / (1000 * 60 * 60))

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds + '.' + '0'.repeat(3 - milliseconds.toString().length) + milliseconds
}

// 3600000 = 01:00:00.000
