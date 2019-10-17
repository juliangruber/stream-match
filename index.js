'use strict'

const match = (stream, string) =>
  new Promise(resolve => {
    let buf = ''
    const onData = data => {
      buf += data
      if (buf.includes(string)) {
        stream.removeListener('data', onData)
        resolve()
      }
    }
    stream.on('data', onData)
  })

module.exports = match
