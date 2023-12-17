import { StateCenter } from '../stateCenter';
import { ZegoDataReport, ZegoLogger } from '../zego.entity';
import { LiveRoomModules } from '.';
import { ZegoRoomServicer } from './ZegoRoomServicer';
export declare class UserHandler {
    private _zgp_logger;
    private _zgp_stateCenter;
    private _dataReport;
    private _liveRoomHandler;
    private _room;
    private _service?;
    private _userQuerying;
    private _lastUserQueryTime;
    private _userTempList;
    private _userSeq;
    private _minUserSeq;
    private _userList;
    private _userSeqMergeMap;
    private _userSeqMergeTimer;
    private _userQueryTimer;
    private _userListInterval;
    private _userListMergeInterval;
    private _anchor_info;
    constructor(_zgp_logger: ZegoLogger, _zgp_stateCenter: StateCenter, _dataReport: ZegoDataReport, _liveRoomHandler: ZegoRoomServicer, _room: LiveRoomModules, _service?: any);
    loginRsp(msg: any, lastRunState: number): void;
    patchUserList(msg: any): void;
    resetUserHandler(): void;
    private fetchUserList;
    private fetchUserListWithPage;
    /**
     * 主动获取用户列表信息
     * @param msg
     * @param lastRunState
     * @returns
     */
    private handleFetchUserListRsp;
    /**
     * 服务端推送用户更新信息
     * @param msg
     * @returns
     */
    handlePushUserStateUpdateMsg(msg: {
        body: {
            user_actions: any;
            user_list_seq: number;
            room_id: any;
        };
    }): void;
    onUserStateUpdate(roomID: string, updateType: 'DELETE' | 'ADD', userList: {
        userID: string;
        userName: string;
        role: number;
    }[]): void;
    private mergeUserByUserSeq;
    private mergeUser;
    private handleMergeTimeout;
}
