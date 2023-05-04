import { abortableSource } from 'abortable-iterator'

const streamMatch = async (stream, pattern, { signal } = {}) => {
  const match =
    typeof pattern === 'string'
      ? buf => buf.includes(pattern)
      : buf => pattern.exec(buf)
  let buf = ''
  const it = signal
    ? abortableSource(stream, signal)
    : stream
  for await (const data of it) {
    buf += data
    const res = match(buf)
    if (res) {
      return res
    }
  }
  throw new Error('stream ended before pattern matched')
}

export default streamMatch
