#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
import FakeBitTorrentClient from './FakeBitTorrentClient';

if ( argv.tracker === undefined || argv.hash === undefined ) {
  console.error('You must specify --tracker and --hash');
  process.exit(1);
}

if ( argv.download === undefined && argv.upload === undefined ) {
  console.error('You must specify --upload or --download ( or both )');
  process.exit(2);
}

const client = new FakeBitTorrentClient(
  argv.tracker,
  argv.hash,
  { timeout: argv.timeout }
);

if ( argv.upload ) {
  client
    .upload(argv.upload)
    .then(() => console.log(['Uploaded ', argv.upload, ' bytes'].join('')))
    .catch(err => console.error(['Error : ', err].join('')));
}

if ( argv.download ) {
  client
    .download(argv.download)
    .then(() => console.log(['Downloaded ', argv.download, ' bytes'].join('')))
    .catch(err => console.error(['Error : ', err].join('')));
}
