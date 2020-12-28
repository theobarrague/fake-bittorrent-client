# Fake BitTorrent Client

A Node.js BitTorrent API implementation for testing or cheating on trackers

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

What things you need to install the software and how to install them on Mac OS X with Homebrew

```
$ brew install node
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
$ npm run install
```

End with an example of getting some data out of the system or using it for a little demo

```
const FakeBitTorrentClient = require('FakeBitTorrentClient');

const client = new FakeBitTorrentClient(trackerUrl, torrentHash, options);

const bytes = 1024 * 1024 * 32; // 32 MB

client
  .upload(bytes)
  .then(() => console.log(['Uploaded ', bytes, ' bytes to ', trackerUrl].join('')))
  .catch(err => console.error(['Error : ', err].join('')));
```

## Built With

* [Atom](https://github.com/atom/atom) - The hackable text editord
* [npm](https://github.com/npm/cli) - The package manager for JavaScript
* [Node.js](https://github.com/nodejs/node) - Node.js JavaScript runtime ✨🐢🚀✨

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

I use [GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/theobarrague/fake-bittorrent-client/tags).

## Authors

* **Théo BARRAGUÉ** - *Initial work* - [theobarrague](https://gist.github.com/theobarrague)

See also the list of [contributors](https://github.com/theobarrague/fake-bittorrent-client/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
