'use strict'

const match = (stream, pattern) =>
  new Promise(resolve => {
    if (typeof pattern === 'string') {
      pattern = new RegExp(pattern)
    }
    let buf = ''
    const onData = data => {
      buf += data
      if (pattern.test(buf)) {
        stream.removeListener('data', onData)
        resolve()
      }
    }
    stream.on('data', onData)
  })

module.exports = match
