import { AccessHubMessageType, StreamType } from '../../entity/AccessHubDefine';
import { ZegoLink } from '../net/ZegoLink';
import { ZegoLinkStream } from './ZegoLinkStream';
export declare class StreamManager {
    private _zegoLink;
    streamID: number;
    httpStreams: ZegoLinkStream[];
    pcStreams: ZegoLinkStream[];
    constructor(_zegoLink: ZegoLink);
    createStream(streamType: StreamType): ZegoLinkStream;
    onPushEvent(streamID: number, msgType: AccessHubMessageType, msg: any, extras?: any): void;
    getStreamID(): number;
}
