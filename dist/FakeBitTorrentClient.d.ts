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
    constructor(tracker: string, hash: string, options?: FakeBitTorrentClientOptions);
    upload(bytes: number): Promise<void>;
    download(bytes: number): Promise<void>;
    private sendHttpRequest;
    private encodeURI;
}
export {};
