const streamMatch = (stream, pattern) =>
  new Promise(resolve => {
    const match =
      typeof pattern === 'string'
        ? buf => buf.includes(pattern)
        : buf => pattern.exec(buf) && pattern.exec(buf)[1]
    let buf = ''
    const onData = data => {
      buf += data
      const res = match(buf)
      if (res) {
        stream.removeListener('data', onData)
        resolve(res)
      }
    }
    stream.on('data', onData)
  })

export default streamMatch
