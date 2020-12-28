import crypto from 'crypto';
import https from 'https';
import http from 'http';

interface FakeBitTorrentClientOptions {
  peerId: string;
  port: number;
  uploaded?: number;
  downloaded?: number;
}

export default class FakeBitTorrentClient {
  tracker: string;
  hash: string;
  uploaded: number;
  downloaded: number;
  options: FakeBitTorrentClientOptions;

  constructor(tracker: string, hash: string, options?: FakeBitTorrentClientOptions) {
    this.tracker = tracker;
    this.hash = hash;

    if (options) {
      this.options = options;
      this.uploaded = options.uploaded || 0;
      this.downloaded = options.downloaded || 0;
    } else {
      this.options = {
        peerId: '-DE13F0-' + crypto.randomBytes(6).toString('hex'), // Deluge 1.3.15
        port: Math.floor(Math.random() * (49151 - 1024 + 1) + 1024) // 1024 - 49151
      }
      this.downloaded = 0;
      this.uploaded = 0;
    }
  }

  upload(bytes: number) {
    this.uploaded += bytes;
    return this.sendHttpRequest(bytes, 0);
  }

  download(bytes: number) {
    this.downloaded += bytes;
    return this.sendHttpRequest(0, bytes);
  }

  private sendHttpRequest(upload: number, download: number) {
    return new Promise<void>((accept, reject) => {
      const url = [
        this.tracker,
        '?info_hash=',
        this.encodeURI(this.hash),
        '&peer_id=',
        this.options.peerId,
        '&port=',
        this.options.port,
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

      handler.get(url, res => {
        const { statusCode } = res;
        if (statusCode !== 200) {
          return reject(statusCode);
        } else {
          return accept();
        }
      }).on('error', err => {
        return reject(err);
      })
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
