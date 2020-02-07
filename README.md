# stream-match

Match a regexp or string in a stream. Zero dependencies.

## Usage

```js
// Given a readable stream,
const res = await match(stream, /(p[^n]+n)/)
// `res` will containt `pattern` once it has been emitted.

// You can also wait for a string to be emitted, for example:
await match(ps.stdout, 'continue now')
```

## Installation

```bash
$ npm install stream-match
```

## API

### res = await match(stream, pattern || string)

## Sponsors

Development of this module is sponsored by:

![Liberate Science](https://libscie.org/assets/images/image01.png?v33093812210851)

## License

MIT
