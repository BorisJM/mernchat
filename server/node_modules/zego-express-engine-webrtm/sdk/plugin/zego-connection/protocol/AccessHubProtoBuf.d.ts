import { AccessHubMessageType } from '../entity/AccessHubDefine';
export declare class AccessHubProtoBuf {
    constructor();
    private _protoInstance;
    private _protoMap;
    encodeRequest(msgType: AccessHubMessageType, body: any, streamID: number): Uint8Array;
    decodeResponse(uint8: Uint8Array): [number, number, any];
    decodeConfigMessage(buffer: Uint8Array): any;
    private _encode;
    private _decode;
}
