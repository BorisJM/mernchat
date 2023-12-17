export declare const RTCCmdMap: {
    1002: string;
    1004: string;
    1101: string;
    1103: string;
    1105: string;
    10001: string;
    10002: string;
    10003: string;
    10004: string;
    12001: string;
    12002: string;
    12003: string;
    13001: string;
    14001: string;
    15001: string;
    15002: string;
    301002: string;
    301004: string;
    301006: string;
    301008: string;
    301012: string;
    301014: string;
    302002: string;
    302004: string;
    302006: string;
    302008: string;
    303002: string;
    303006: string;
    303010: string;
    303012: string;
    303014: string;
    303016: string;
    303018: string;
    304002: string;
};
export declare enum RoomPacketCmd {
    LoginRoomReq = 1001,
    LoginRoomRsp = 1002,
    LogoutRoomReq = 1003,
    LogoutRoomRsp = 1004,
    PushReq = 1101,
    PushRsp = 1102,
    MergePushReq = 1103,
    MergePushRsp = 1104,
    PushKickout = 1105,
    PushUserInfoUpdated = 10001,
    PushUserKickout = 10002,
    PushUserLogReport = 10003,
    PushUserTokenExpire = 10004,
    PushIm = 13001,
    PushBigIm = 14001,
    PushTrans = 15001,
    PushUserTrans = 15002,
    EnterRoomReq = 301001,
    EnterRoomRsp = 301002,
    QuitRoomReq = 301003,
    QuitRoomRsp = 301004,
    HbReq = 301005,
    HbRsp = 301006,
    RenewTokenReq = 301007,
    RenewTokenRsp = 301008,
    SetUserAttrReq = 301009,
    SetUserAttrRsp = 301010,
    SetTransReq = 301011,
    SetTransRsp = 301012,
    GetTransReq = 301013,
    GetTransRsp = 301014,
    GetUserTransReq = 301015,
    GetUserTransRsp = 301016,
    AddStreamReq = 302001,
    AddStreamRsp = 302002,
    DeleteStreamReq = 302003,
    DeleteStreamRsp = 302004,
    UpdateStreamReq = 302005,
    UpdateStreamRsp = 302006,
    GetStreamListReq = 302007,
    GetStreamListRsp = 302008,
    SendImReq = 303001,
    SendImRsp = 303002,
    GetImReq = 303003,
    GetImRsp = 303004,
    SendBigImReq = 303005,
    SendBigImRsp = 303006,
    SignalLiveRequestReq = 303009,
    SignalLiveRequestRsp = 303010,
    SignalLiveResultReq = 303011,
    SignalLiveResultRsp = 303012,
    SignalLiveInviteReq = 303013,
    SignalLiveInviteRsp = 303014,
    SignalLiveStopReq = 303015,
    SignalLiveStopRsp = 303016,
    SignalLiveCustomReq = 303017,
    SignalLiveCustomRsp = 303018,
    SignalTransmitReq = 303019,
    SignalTransmitRsp = 303020,
    GetUserlistReq = 304001,
    GetUserlistRsp = 304002
}
