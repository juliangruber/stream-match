# stream-match

Match a regexp or string in a stream.

## Usage

```js
import match from 'stream-match'

// Given a readable stream,
const res = await match(stream, /(p[^n]+n)/)
// `res` will contain the RegExp result Array once it has been emitted

// You can also wait for a string to be emitted, for example:
await match(ps.stdout, 'continue now')
```

## Installation

```bash
$ npm install stream-match
```

## API

### res = await match(stream, pattern || string, { signal? })

Pass the optional `{ signal }` with an `AbortController#signal` to abort early.
In this case, an `Error` with `.code = 'ABORT_ERR'` will be thrown.

## License

MIT
