import { ZegoLogger, ZegoDataReport, ZegoError } from '../zego.entity';
import { StateCenter } from '../stateCenter';
import { LiveRoomService } from '../service';
import { LiveRoomModules } from '.';
import { ZegoRoomServicer } from './ZegoRoomServicer';
export declare class HeartBeatHandler {
    private _zgp_logger;
    private _zgp_stateCenter;
    private _dataReport;
    private _liveRoomHandler;
    private _room;
    private _service?;
    private _tryHeartbeatCount;
    private _heartbeatTimer;
    private _loginHeartbeatTimer;
    private _heartbeatInterval;
    private get _zgp_reporter();
    initCount: number;
    constructor(_zgp_logger: ZegoLogger, _zgp_stateCenter: StateCenter, _dataReport: ZegoDataReport, _liveRoomHandler: ZegoRoomServicer, _room: LiveRoomModules, _service?: LiveRoomService | undefined);
    init(msg: any): void;
    start(heartbeatInterval: number): void;
    private _handleHeartbeatRsp;
    heartbeatRspNotiFy(msg: any, roomID: string): void;
    hbLogout(err: ZegoError): void;
    resetHeartbeat(): void;
}
