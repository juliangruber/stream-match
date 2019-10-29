'use strict'

const { test } = require('tap')
const match = require('.')
const { PassThrough } = require('stream')

test('pattern', async t => {
  const stream = new PassThrough()
  let matched = false

  await Promise.all([
    (async () => {
      await match(stream, /beep boop/)
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
