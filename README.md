# stream-match

Match a regexp or string in a stream. Zero dependencies.

## Usage

```js
// Given a readable stream,
const res = await match(stream, /(p[^n]+n)/)
// `res` will containt `pattern` once it has been emitted.
```

## Installation

```bash
$ npm install stream-match
```

## API

### res = await match(stream, pattern || string)

## License

MIT