#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var argv = require('minimist')(process.argv.slice(2));
var FakeBitTorrentClient_1 = __importDefault(require("./FakeBitTorrentClient"));
if (argv.tracker === undefined || argv.hash === undefined) {
    console.error('You must specify --tracker and --hash');
    process.exit(1);
}
if (argv.download === undefined && argv.upload === undefined) {
    console.error('You must specify --upload or --download ( or both )');
    process.exit(2);
}
var client = new FakeBitTorrentClient_1.default(argv.tracker, argv.hash, { timeout: argv.timeout });
if (argv.upload) {
    client
        .upload(argv.upload)
        .then(function () { return console.log(['Uploaded ', argv.upload, ' bytes'].join('')); })
        .catch(function (err) { return console.error(['Error : ', err].join('')); });
}
if (argv.download) {
    client
        .download(argv.download)
        .then(function () { return console.log(['Downloaded ', argv.download, ' bytes'].join('')); })
        .catch(function (err) { return console.error(['Error : ', err].join('')); });
}
