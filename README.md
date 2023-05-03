# stream-match

Match a regexp or string in a stream. Zero dependencies.

## Usage

```js
import match from 'stream-match'

// Given a readable stream,
const res = await match(stream, /(p[^n]+n)/)
// `res` will containt the RegExp result Array once it has been emitted

// You can also wait for a string to be emitted, for example:
await match(ps.stdout, 'continue now')
```

## Installation

```bash
$ npm install stream-match
```

## API

### res = await match(stream, pattern || string)

## License

MIT
