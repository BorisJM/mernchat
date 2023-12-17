import { ZegoLogger } from '../util/logger';
import { StreamManager } from './stream/StreamManager';
import { StateCenter } from './stateCenter';
export declare class NetHeartBeatHandler {
    private _streamManager;
    private _logger;
    private _stateCenter;
    private _hbTimer;
    private _hbInterval;
    private _hbTimeout;
    private _hbTimeoutMaxCount;
    private _tryHbCount;
    private _hbStream;
    constructor(_streamManager: StreamManager, _logger: ZegoLogger, _stateCenter: StateCenter);
    init(msg: {
        data: {
            logic_hb_interval: number;
            logic_hb_timeout: number;
        };
    }): void;
    start(): void;
    netHbLogout(err: any): void;
    reset(): void;
}
