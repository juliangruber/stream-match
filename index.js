const streamMatch = async (stream, pattern) => {
  const match =
    typeof pattern === 'string'
      ? buf => buf.includes(pattern)
      : buf => pattern.exec(buf)
  let buf = ''
  for await (const data of stream) {
    buf += data
    const res = match(buf)
    if (res) {
      return res
    }
  }
  throw new Error('stream ended before pattern matched')
}

export default streamMatch
