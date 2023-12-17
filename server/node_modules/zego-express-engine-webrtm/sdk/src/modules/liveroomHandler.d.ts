import { LinkedList, ListNode, TermType, ZegoDataReport, ZegoLogger } from '../zego.entity';
import { RoomPacketCmd } from './switchCmd';
import { StateCenter } from '../stateCenter';
import { Crypto } from '../../util/crypto';
import { NetConnection } from '../zego.entity';
import { LiveRoomModules } from '.';
import { ZegoExpressWebRTM } from '..';
export declare enum LIVEROOM_STATE {
    disconnected = 0,
    broken = 1,
    connected = 2
}
type MessageItem = {
    seq: number;
    deleted: boolean;
    sendTime: number;
    timeout: number;
    success: Function | undefined;
    error: Function | undefined;
    params?: Object;
};
interface HeaderExtras {
    contextKey?: number;
}
export declare class LiveRoomHandler {
    private _zgp_logger;
    private _zgp_stateCenter;
    private _ua;
    private _dataReport;
    private rtm;
    liveroomRequest: any;
    crypto: Crypto;
    seq: number;
    controls: Uint8Array;
    sendCommandList: LinkedList<MessageItem>;
    sendCommandMap: {
        [index: number]: ListNode<MessageItem>;
    };
    /** 保存第一次login使用的token, 用于logout校验 */
    logoutCheckToken: string;
    zPushSid: string;
    switchSessionID: any;
    loginKeyTransMap: [string, string][];
    private _sendDataCheckOnceCount;
    private _sendDataDropTimeout;
    private _sendDataCheckTimer;
    private _sendDataCheckInterval;
    private _protoInstance;
    private _roomKeyIDs;
    private _roomIDKeys;
    swPushCmdList: RoomPacketCmd[];
    onSwitchCmdList: RoomPacketCmd[];
    noContextKeyCmdList: number[];
    rtcPushCmdList: number[];
    private _state;
    unStructCmdList: number[];
    reloginToken: string;
    get nickName(): Uint8Array;
    get TermType(): TermType;
    private get _zgp_reporter();
    constructor(_zgp_logger: ZegoLogger, _zgp_stateCenter: StateCenter, _ua: NetConnection, _dataReport: ZegoDataReport, rtm: ZegoExpressWebRTM);
    isDisConnect(): boolean;
    getHeader(cmd: number, extra?: HeaderExtras): [number, Uint8Array];
    isUaConnect(): boolean;
    sendMessage(cmd: string | number, body: Uint8Array, success?: Function, error?: Function, params?: {
        roomID?: string;
    }, option?: {
        timeout: number;
    }, isInSendMap?: boolean): number;
    getHead(headerLen: number, bodyLen: number): Uint8Array;
    handlePush(data: Uint8Array, extras?: any): void;
    handleSwitchPush(header: any, body: any): void;
    handlePushTokenExpire(msg: any): void;
    handlePushKickout(msg: any, isSwitch: boolean): void;
    handlePushStreamMsg(msg: any): void;
    handlePushSignalMsg(msg: any): void;
    handlePushMergeMsg(msg: any): void;
    handlePushCustomMsg(pushReq: {
        header: any;
        body: any;
    }): void;
    handlePushRoomMsg(msg: any): void;
    handlePushTransMsg(pushReq: {
        header: any;
        body: any;
    }): void;
    onSwitchMessage(header: any, decryptBody: Uint8Array): void;
    decodeResponseBody(header: any, bodyData: Uint8Array): any;
    handlePushUserStateUpdateMsg(msg: any): void;
    login(room: LiveRoomModules, suc?: Function, err?: Function): void;
    private _transLoginRspKeys;
    transKeysName(obj: any, keys: [string, string][]): void;
    keysExist(obj: any, keys: string[]): void;
    longToStringNumber(obj: any, keys: string[], type: string): void;
    logout(room: LiveRoomModules, suc: Function, err: Function): number;
    private _checkSendMessageList;
    private _checkMessageListTimeout;
    startCheck(): void;
    stopCheck(): void;
    protected handleSendCommandMsgRsp(msg: {
        [index: string]: any;
    }): void;
    getReqHead(room: LiveRoomModules): any;
    heartBeat(suc: Function, err: Function, room: LiveRoomModules): void;
    fetchUserList(body: {
        user_index: number;
        sort_type: number;
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendRoomMsg(body: {
        msg_category: number;
        msg_type: number;
        msg_priority: number;
        msg_content: string;
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendReliableMessage(body: {
        trans_type: string;
        trans_data: string;
        trans_local_seq: number;
        trans_channel: string;
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    fetchReliableMessage(body: {
        fetch_array: {
            trans_type: string;
            trans_seq: number;
        }[];
        trans_channel: string;
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendCustomCommand(body: {
        dest_id_name: string[];
        custom_msg: string;
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendBigRoomMessage(body: {
        msgs: {
            msg_category: number;
            msg_type: number;
            msg_content: string;
            bigmsg_client_id: string;
        }[];
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendSignalCmd(body: {
        sub_cmd: number;
        signal_msg: string;
        dest_id_name: string[];
    }, suc: Function, err: Function, room: LiveRoomModules): number;
    sendStreamUpdate(body: {
        sub_cmd: number;
        stream_msg: string;
        third_token?: string;
    }, suc: Function, err: Function, room: {
        sessionID: any;
        roomID: any;
        roomSessionID: any;
    }): number;
    getStreamList(body: {}, suc: Function, err: Function, room: {
        sessionID: any;
        roomID: any;
        roomSessionID: any;
    }): void;
    transBuf(msg: any): any;
    transReqBytes(transObj: any, obj: any, key: string): void;
    transHeader(msg: any): any;
    transRsp(res: any): any;
    transBytes(transObj: any, obj: any, key: string): void;
    transRspHead(rspHead: {
        code: number;
        message: string;
    }): {
        err_code?: number;
        err_message?: string;
    };
    private _decode;
    private _handleDisconnected;
    private _handleBroken;
    private _handleConnected;
    renewToken(body: {
        token: string;
    }, sucCallBack: (msg: any, seq: number) => void, failCallBack: (error: any) => void, room: LiveRoomModules): void;
    reset(): void;
    closeRequest(): void;
    resetSessionInfo(): void;
    private _getNumSDKVersion;
}
export {};
