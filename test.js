import test from 'test'
import assert from 'node:assert'
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
      assert(!res)
      stream.push('beep ')
      assert(!res)
      stream.push('boo')
      assert(!res)
      stream.push('p')
    })()
  ])

  assert.strictEqual(res, 'boop')
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
      assert(!matched)
      stream.push('beep ')
      assert(!matched)
      stream.push('boo')
      assert(!matched)
      stream.push('p')
    })()
  ])

  assert(matched)
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
      assert(!matched)
      stream.push('beep\\')
      assert(!matched)
      stream.push('boo')
      assert(!matched)
      stream.push('p')
    })()
  ])

  assert(matched)
  stream.push('everything else')
})
