import { ZegoLogger } from '../util/logger';
import { AccessHubProtoBuf } from '../protocol/AccessHubProtoBuf';
import { StateCenter } from './stateCenter';
import { StreamManager } from './stream/StreamManager';
export declare class NetAgentBusinessRequestMgr {
    private _streamManager;
    private _protobuf;
    private _logger;
    protected stateCenter: StateCenter;
    constructor(_streamManager: StreamManager, _protobuf: AccessHubProtoBuf, _logger: ZegoLogger, stateCenter: StateCenter);
    getConfig(suc: Function, err: Function): void;
    dispatchURL(success: Function, fail: Function): void;
    getAppConfig(type: string, userID: string, token: string, timeout?: number, etag?: number): Promise<{
        code: number;
        data?: any;
        etag?: number;
    }>;
    decodeConfigMessage(data: Uint8Array): any;
}
