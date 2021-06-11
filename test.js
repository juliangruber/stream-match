import { test } from 'tap'
import match from './index.js'
import { PassThrough } from 'stream'

test('pattern', async t => {
  const stream = new PassThrough()
  let res

  await Promise.all([
    (async () => {
      res = await match(stream, /(bo+p)/)
    })(),
    (async () => {
      t.notOk(res)
      stream.push('beep ')
      t.notOk(res)
      stream.push('boo')
      t.notOk(res)
      stream.push('p')
    })()
  ])

  t.equal(res, 'boop')
  stream.push('everything else')
})

test('string', async t => {
  const stream = new PassThrough()
  let matched = false

  await Promise.all([
    (async () => {
      await match(stream, 'beep boop')
      matched = true
    })(),
    (async () => {
      t.notOk(matched)
      stream.push('beep ')
      t.notOk(matched)
      stream.push('boo')
      t.notOk(matched)
      stream.push('p')
    })()
  ])

  t.ok(matched)
  stream.push('everything else')
})

test('string with backslashes', async t => {
  const stream = new PassThrough()
  let matched = false

  await Promise.all([
    (async () => {
      await match(stream, 'beep\\boop')
      matched = true
    })(),
    (async () => {
      t.notOk(matched)
      stream.push('beep\\')
      t.notOk(matched)
      stream.push('boo')
      t.notOk(matched)
      stream.push('p')
    })()
  ])

  t.ok(matched)
  stream.push('everything else')
})
