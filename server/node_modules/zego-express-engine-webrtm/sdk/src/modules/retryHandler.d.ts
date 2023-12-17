/// <reference types="node" />
import { ZegoLogger } from '../zego.entity';
import { StateCenter } from '../stateCenter';
export declare abstract class TryHandler {
    protected _zgp_logger: ZegoLogger;
    protected _zgp_stateCenter: StateCenter;
    RETRY_MAX_TIME: number;
    RETRY_START_TIME_INTERVAL: number;
    RETRY_CONTINUE_COUNT: number;
    RETRY_MAX_TIME_INTERVAL: number;
    retryTimer: NodeJS.Timeout | null | number;
    maxTimer: NodeJS.Timeout | null | number;
    private _retryStartTime;
    retryActiveCount: number;
    retryActiveInterval: number;
    isOverTime: boolean;
    constructor(_zgp_logger: ZegoLogger, _zgp_stateCenter: StateCenter);
    init(retryMaxTime?: number, startTimeInterval?: number, retryContinuteCount?: number, maxTimeInterval?: number): void;
    invalid(): void;
    abstract startMaxTime(): void;
    abstract stopMaxTime(): void;
    abstract active(...args: Array<any>): void;
    abstract onactive(...args: Array<any>): void;
}
