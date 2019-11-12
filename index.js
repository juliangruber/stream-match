'use strict'

const match = (stream, pattern) =>
  new Promise(resolve => {
    const test = typeof pattern === 'string'
      ? buf => buf.includes(pattern)
      : buf => pattern.test(buf)
    let buf = ''
    const onData = data => {
      buf += data
      if (test(buf)) {
        stream.removeListener('data', onData)
        resolve()
      }
    }
    stream.on('data', onData)
  })

module.exports = match
