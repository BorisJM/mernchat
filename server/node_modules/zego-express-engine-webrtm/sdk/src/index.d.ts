import { LogConfig, ZegoInnerEvent, ZegoLogger, ZegoDataReport, ZegoError, NetConnection, ZegoGeoFenceType, ZegoProxyInfo } from './zego.entity';
import { ZegoRTMEvent, ZegoRoomConfig, ZegoUser, ZegoInitOptions } from '../code/zh/ZegoExpressEntity';
import { StateCenter } from './stateCenter';
import { LiveRoomModules } from './modules';
import { LiveRoomService } from './service';
import { CloudSetting } from './cloudSetting';
import { ZReporter } from './zego.reporter';
import { ProxyController } from './cloudProxy/CloudProxyController';
export declare class ZegoExpressWebRTM {
    private _zgp_logger;
    private _dataReport;
    private _zgp_reporter;
    version: string;
    private _options?;
    static rtmVersion: string;
    private _zgp_stateCenter;
    liveRoomHandler: any;
    get logger(): ZegoLogger;
    get stateCenter(): StateCenter;
    module: LiveRoomModules;
    service: LiveRoomService | any;
    getReportSeq: Function;
    proxyRes: (dataReport: ZegoDataReport, reportSeq: number, resolve: any, reject: any) => any;
    getServerError: (code: number) => ZegoError;
    generateRandumNumber: (maxNum: number) => number;
    getSeq: Function;
    actionSuccessCallback: (fName: string, callbackList: {
        [index: string]: Function;
    }) => Function;
    actionErrorCallback: (fName: string, callbackList: {
        [index: string]: Function;
    }) => Function;
    unregisterCallback: (fName: string, callbackList: {
        [index: string]: Function;
    }) => void;
    logReportCallback: (logEvent: string, dataReport: ZegoDataReport, reportSeq: number, callbackList: {
        [index: string]: Function;
    }) => void;
    registerCallback: (fName: string, option: {
        success?: Function | undefined;
        error?: Function | undefined;
    }, callbackList: {
        [index: string]: Function;
    }) => void;
    netAgent: NetConnection;
    dispatchServers: string[];
    cloudSettingTimer?: any;
    timeOffsetUpdateTimer?: any;
    static geoFenceType: ZegoGeoFenceType;
    static geoFenceAreaList: number[];
    static engineOptions: any;
    cloudSetting?: CloudSetting;
    get modules(): {
        service: LiveRoomService;
    };
    get isUseNetAgent(): boolean;
    /** tabs id */
    static pageID: string;
    id: string;
    constructor(appID: number, server: string | string[], _zgp_logger: ZegoLogger, _dataReport: ZegoDataReport, _zgp_reporter: ZReporter, version: string, ENV: number, _options?: ZegoInitOptions | undefined);
    destroyRTM(): void;
    getSettingUnify(force?: boolean): boolean;
    private _initCallback;
    private _initSpans;
    private _handleZipLogUrl;
    getStoreAppConfig(): void;
    private _createNetAgent;
    private _getMainDomain;
    private _replaceMainDomain;
    private _getDispatchUrl;
    private _bindWindowListener;
    retryRoom(): void;
    private _netOnLineHandle;
    private _netOffLineHandle;
    setLogConfig(option: LogConfig): boolean;
    setDebugVerbose(enable: boolean): void;
    private _setDebug;
    renewToken(token: string, roomID?: string): boolean;
    protected setCloudSettingURLs(urls: string[]): void;
    private _roomLoginResponseListener;
    loginRoom(roomID: string, token: string, user: ZegoUser, config?: ZegoRoomConfig): Promise<boolean>;
    handleLogUpload(appConfig?: any): void;
    fetchAppConfigByTargetToken(token: string, userID: string): Promise<any>;
    fetchAppConfig(token?: string): Promise<void>;
    private _getCloudSetting;
    private _cloudReportNotify;
    private _loginReport;
    logoutRoom(roomID?: string): void;
    uploadLog(): Promise<{
        errorCode: number;
        extendedData: string;
    }>;
    sendCustomCommand(roomID: string, command: string | Record<string, any>, toUserList: string[]): Promise<{
        errorCode: number;
        extendedData: string;
    }>;
    _sendCustomCommand(roomID: string, command: string | Record<string, any>, toUserList: string[]): Promise<{
        seq: number;
        errorCode: number;
        extendedData: string;
    }>;
    sendBroadcastMessage(roomID: string, message: string): Promise<{
        errorCode: number;
        messageID: number;
        extendedData: string;
    }>;
    _sendBroadcastMessage(roomID: string, message: string, category?: 1 | 2, type?: 1 | 2 | 3): Promise<{
        seq: number;
        errorCode: number;
        messageID: number;
        extendedData: string;
    }>;
    setRoomExtraInfo(roomID: string, type: string, data: string): Promise<{
        errorCode: number;
    }>;
    _setRoomExtraInfo(roomID: string, type: string, data: string): Promise<{
        seq: number;
        errorCode: number;
    }>;
    sendBarrageMessage(roomID: string, message: string): Promise<{
        errorCode: number;
        messageID: string;
        extendedData: string;
    }>;
    _sendBarrageMessage(roomID: string, message: string, category?: 1 | 2, type?: 1 | 2 | 3): Promise<{
        seq: number;
        errorCode: number;
        messageID: string;
        extendedData: string;
    }>;
    sendRelayMessage(type: string, data: string, success: (seq: number) => void, error: (err: ZegoError, seq: number) => void, roomID?: string): void;
    requestJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ZegoError, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void, roomID?: string): boolean;
    inviteJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ZegoError, seq: number) => void, resultCallback: (result: boolean, fromUserId: string, fromUserName: string) => void, roomID?: string): boolean;
    endJoinLive(destIdName: string, success: (seq: number) => void, error: (err: ZegoError, seq: number) => void, roomID?: string): boolean;
    respondJoinLive(requestId: string, respondResult: boolean, success?: (seq: number) => void, error?: (err: ZegoError, seq: number) => void, roomID?: string): boolean;
    getVersion(): string;
    setSdkBizVersion(bizVersion: string): void;
    on<K extends keyof ZegoRTMEvent>(event: K, callBack: ZegoRTMEvent[K]): boolean;
    off<K extends keyof ZegoRTMEvent>(event: K, callBack?: ZegoRTMEvent[K]): boolean;
    _on<K extends keyof ZegoInnerEvent>(event: K, callBack: ZegoInnerEvent[K]): boolean;
    _off<K extends keyof ZegoInnerEvent>(event: K, callBack?: ZegoInnerEvent[K]): boolean;
    isTestEnvironment(): boolean;
    isLogin(roomID?: string): boolean;
    getMultiRoom(): boolean;
    getAppID(): number;
    getUserID(): string;
    getUserName(): string;
    getToken(roomID?: string): string;
    setRoomCreateFlag(flag: number): void;
    setRole(role: 1 | 2): void;
    getSessionId(roomID?: string): string;
    getRoomSessionID(roomID?: string): string;
    getAppConfig(): any;
    setTestPackageSize(test: boolean): void;
    setCloudEnv(env: string): void;
    setAccess(isAccess: boolean): void;
    enableMultiRoom(isMulti: boolean): boolean;
    private getRoomModules;
    private _onAppConfigUpdate;
    private _onBeforePageUnload;
    static use(module: any): void;
    static setGeoFence(geoFenceType: ZegoGeoFenceType, geoFenceAreaList: number[]): void;
    static setEngineOptions(options: any): void;
    resetRoomTokenTimer(roomID: string, remainTime?: number): void;
    isDisConnect(): boolean;
    sendMessage(cmd: string, body: any, suc: Function, err: Function): void;
    getNetworkInfo(): {
        timestamp: number;
        maxDeviation: number;
    };
    setProtoFormat(format?: string): void;
    setSdkLoginRelateService(relateService: Array<string>): void;
    getRoomID(): string;
    getServerTimeOffset(): number;
    getReqHead(roomID?: string): any;
    sendSwitchMessage(cmd: string, body: Uint8Array): number;
    onSwitchMessage(callback: (header: any, body: Uint8Array) => {}): any;
    onAppConfigUpdate(callback: (appConfig: any) => void): void;
    onBeforePageUnload(callback: () => void): void;
    getProtoVer(): number;
    sendBusinessMessage(cmd: number, body: Uint8Array, params?: {
        roomID?: string;
    }): number;
    private _logoutSpan;
    getMsgSpan(spanName: string, roomID: string, isMap?: boolean): any;
    private _updateTimeOffsetInterval;
    setLocalGeoFencing(): void;
    getLocalGeoFencing(): any;
    private _getGeoFencingIDAndDomain;
    static proxyCtrl: ProxyController | null;
    static setCloudProxyConfig(proxyList: ZegoProxyInfo[], token: string, enable: boolean): void;
}
