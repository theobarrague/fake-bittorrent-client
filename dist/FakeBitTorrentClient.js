"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var https_1 = __importDefault(require("https"));
var http_1 = __importDefault(require("http"));
var urlToHttpOptions = require('url').urlToHttpOptions;
var FakeBitTorrentClient = (function () {
    function FakeBitTorrentClient(tracker, hash, options) {
        this.tracker = tracker;
        this.hash = hash;
        this.peerId = options ? options.peerId || '-DE13F0-' + crypto_1.default.randomBytes(6).toString('hex') : '-DE13F0-' + crypto_1.default.randomBytes(6).toString('hex');
        this.port = options ? options.port || Math.floor(Math.random() * (49151 - 1024 + 1) + 1024) : Math.floor(Math.random() * (49151 - 1024 + 1) + 1024);
        this.uploaded = options ? options.uploaded || 0 : 0;
        this.downloaded = options ? options.downloaded || 0 : 0;
        this.timeout = options ? options.timeout || 30000 : 30000;
    }
    FakeBitTorrentClient.prototype.upload = function (bytes) {
        this.uploaded += bytes;
        return this.sendHttpRequest(bytes, 0, this.timeout);
    };
    FakeBitTorrentClient.prototype.download = function (bytes) {
        this.downloaded += bytes;
        return this.sendHttpRequest(0, bytes, this.timeout);
    };
    FakeBitTorrentClient.prototype.sendHttpRequest = function (upload, download, timeout) {
        var _this = this;
        return new Promise(function (accept, reject) {
            var url = [
                _this.tracker,
                '?info_hash=',
                _this.encodeURI(_this.hash),
                '&peer_id=',
                _this.peerId,
                '&port=',
                _this.port,
                '&uploaded=',
                _this.uploaded,
                '&downloaded=',
                _this.downloaded,
                '&compact=1'
            ].join('');
            var options = urlToHttpOptions(new URL(url));
            options.timeout = timeout;
            var handler = null;
            if (_this.tracker.startsWith('http://')) {
                handler = http_1.default;
                options.agent = new http_1.default.Agent({ keepAlive: true, keepAliveMsecs: timeout, timeout: timeout });
            }
            else if (_this.tracker.startsWith('https://')) {
                handler = https_1.default;
                options.agent = new https_1.default.Agent({ keepAlive: true, keepAliveMsecs: timeout, timeout: timeout });
            }
            else {
                throw 'Protocol not recognized';
            }
            var req = handler.get(options, function (res) {
                var statusCode = res.statusCode;
                if (statusCode !== 200) {
                    return reject(statusCode);
                }
                else {
                    return accept();
                }
            }).on('error', function (err) {
                return reject(err);
            });
            req.setTimeout(timeout, function () { return req.destroy(); });
        });
    };
    FakeBitTorrentClient.prototype.encodeURI = function (hash) {
        return hash.replace(/.{2}/g, function (m) {
            var v = parseInt(m, 16);
            if (v <= 127) {
                m = encodeURIComponent(String.fromCharCode(v));
                if (m[0] === '%') {
                    m = m.toLowerCase();
                }
            }
            else {
                m = '%' + m;
            }
            return m;
        });
    };
    return FakeBitTorrentClient;
}());
exports.default = FakeBitTorrentClient;
