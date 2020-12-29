# Fake BitTorrent Client

A Node.js BitTorrent API implementation for testing or cheating on trackers.

All in name, this API will never upload or download data from peers, it will only notify tracker.

## Usage

```js
import { FakeBitTorrentClient } from 'fake-bittorrent-client';

const trackerUrl = 'http://my.tracker.com:8080/announce';
const torrentHash = 'ee8d8728f435fd550f83852aabab5234ce1da528';
const options = {
  peerId: '-DE13F0-ABCDEF', // Deluge 1.3.15
  port: 31452 // Listen port ( for fake, API will never open a port )
};

const client = new FakeBitTorrentClient(trackerUrl, torrentHash, options);

const bytes = 1024 * 1024 * 32; // 32 MB

client
  .upload(bytes)
  .then(() => console.log(['Uploaded ', bytes, ' bytes to ', trackerUrl].join('')))
  .catch(err => console.error(['Error : ', err].join('')));

client
  .download(bytes)
  .then(() => console.log(['Downloaded ', bytes, ' bytes from ', trackerUrl].join('')))
  .catch(err => console.error(['Error : ', err].join('')));
```

```
$ fake-bittorrent-client --tracker 'http://my.tracker.com:8080/announce' --hash 'ee8d8728f435fd550f83852aabab5234ce1da528' --upload 33554432
Uploaded 33554432 bytes to http://my.tracker.com:8080/announce
```

```
$ fake-bittorrent-client --tracker 'http://my.tracker.com:8080/announce' --hash 'ee8d8728f435fd550f83852aabab5234ce1da528' --download 33554432
Downloaded 33554432 bytes from http://my.tracker.com:8080/announce
```

## Built With

* [Atom](https://github.com/atom/atom) - The hackable text editord
* [npm](https://github.com/npm/cli) - The package manager for JavaScript
* [Node.js](https://github.com/nodejs/node) - Node.js JavaScript runtime ✨🐢🚀✨
* [minimist](https://www.npmjs.com/package/minimist) - Parse argument options

## Contributing

All contributions are welcome, juste open a pull request.

## Versioning

I use [GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/theobarrague/fake-bittorrent-client/tags).

## Authors

* **Théo BARRAGUÉ** - *Initial work* - [theobarrague](https://gist.github.com/theobarrague)

See also the list of [contributors](https://github.com/theobarrague/fake-bittorrent-client/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
