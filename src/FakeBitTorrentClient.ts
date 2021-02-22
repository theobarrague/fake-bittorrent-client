import crypto from 'crypto';
import https from 'https';
import http from 'http';
const { urlToHttpOptions } = require('url');

interface FakeBitTorrentClientOptions {
  peerId?: string;
  port?: number;
  uploaded?: number;
  downloaded?: number;
  timeout?: number;
}

export default class FakeBitTorrentClient {
  tracker: string;
  hash: string;
  uploaded: number;
  downloaded: number;
  peerId: string;
  port: number;
  timeout: number;

  constructor(tracker: string, hash: string, options?: FakeBitTorrentClientOptions) {
    this.tracker = tracker;
    this.hash = hash;

    this.peerId = options ? options.peerId || '-DE13F0-' + crypto.randomBytes(6).toString('hex') : '-DE13F0-' + crypto.randomBytes(6).toString('hex');
    this.port = options ? options.port || Math.floor(Math.random() * (49151 - 1024 + 1) + 1024) : Math.floor(Math.random() * (49151 - 1024 + 1) + 1024);
    this.uploaded = options ? options.uploaded || 0 : 0;
    this.downloaded = options ? options.downloaded || 0 : 0;
    this.timeout = options ? options.timeout || 30000 : 30000;
  }

  upload(bytes: number) {
    this.uploaded += bytes;
    return this.sendHttpRequest(bytes, 0, this.timeout);
  }

  download(bytes: number) {
    this.downloaded += bytes;
    return this.sendHttpRequest(0, bytes, this.timeout);
  }

  private sendHttpRequest(upload: number, download: number, timeout: number) {
    return new Promise<void>((accept, reject) => {
      const url = [
        this.tracker,
        '?info_hash=',
        this.encodeURI(this.hash),
        '&peer_id=',
        this.peerId,
        '&port=',
        this.port,
        '&uploaded=',
        this.uploaded,
        '&downloaded=',
        this.downloaded,
        '&compact=1'
      ].join('');

      let handler = null;
      if (this.tracker.startsWith('http://')) {
        handler = http;
      } else if (this.tracker.startsWith('https://')) {
        handler = https;
      } else {
        throw 'Protocol not recognized';
      }

      let options = urlToHttpOptions(new URL(url));
      let req = handler.get(options, res => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          return reject(statusCode);
        } else {
          return accept();
        }
      }).on('error', err => {
        return reject(err);
      });

      req.setTimeout(timeout, () => req.abort());
    });
  }

  private encodeURI(hash: string) {
    return hash.replace(/.{2}/g, function(m) {
      var v = parseInt(m, 16);
      if (v <= 127) {
        m = encodeURIComponent(String.fromCharCode(v));
        if (m[0] === '%') {
          m = m.toLowerCase();
        }
      } else {
        m = '%' + m;
      }
      return m;
    });
  }

}
