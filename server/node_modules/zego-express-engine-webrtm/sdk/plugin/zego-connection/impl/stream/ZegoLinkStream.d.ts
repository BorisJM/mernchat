import { AccessHubMessageType, StreamType } from '../../entity/AccessHubDefine';
import { ZegoLink } from '../net/ZegoLink';
export declare class ZegoLinkStream {
    private _type;
    private _streamID;
    private _zegoLink;
    isFree: boolean;
    isFirst: boolean;
    constructor(_type: StreamType, _streamID: number, _zegoLink: ZegoLink);
    get StreamID(): number;
    refresh(streamID: number): void;
    sendMessage(type: AccessHubMessageType, body: any, successFunc?: Function | null, errorFunc?: Function | null, ackFunc?: Function | null, option?: {
        timeout?: number;
        isInSendMap?: boolean;
        extras?: any;
        isMsgCache?: boolean;
    }): void;
    onPushEvent(msgType: AccessHubMessageType, msg: any, extras?: any): void;
    closeStream(code: number, msg: string): void;
    isConnect(): boolean;
}
