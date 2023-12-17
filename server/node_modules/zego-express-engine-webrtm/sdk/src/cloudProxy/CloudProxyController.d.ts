import { ZegoProxyInfo } from '../zego.entity';
import { ProxySocket } from './ProxySocket';
export declare class ProxyController {
    private proxyList;
    private token;
    /**
 * "/proxy/http"
"/proxy/ws"  get
"/turn/info"
"/intranet/check"
 */
    constructor(proxyList: ZegoProxyInfo[], token: string);
    userID: string;
    enable: boolean;
    get urls(): string[];
    private activeServer?;
    updateActiveServer(server: string): void;
    destroy(): void;
    appID: number;
    init(parmas: {
        appID: number;
    }): Promise<void>;
    createSocket(target: string): ProxySocket;
    turnExpireTime?: number;
    handleFetch(path: string | undefined, content: Uint8Array): Promise<ArrayBuffer | never[]>;
}
