import { BusinessService, AppInfo, HttpReq, PCOption, HttpReq2 } from '../entity/AccessHubDefine';
import { AccessHubProtoBuf } from '../protocol/AccessHubProtoBuf';
import { NetAgentBusinessRequestMgr } from './NetAgentBusinessRequestMgr';
import { NetHeartBeatHandler } from './NetHeartBeatHandler';
import { NetAgentPCRequestMgr } from './PCMgr/NetAgentPCRequestMgr';
import { EventManager } from '../util/EventManager';
import { NetRetryLinkHandler } from './net/NetRetryLinkHandler';
import { StateCenter } from './stateCenter';
import { ZegoLogger } from '../util/logger';
import { ZegoLink } from './net/ZegoLink';
import { StreamManager } from './stream/StreamManager';
import { NetAgentPCRequest } from './PCMgr/NetAgentPCRequest';
export declare class ZegoConnectionAgent {
    private proxyCtrl?;
    protobuf: AccessHubProtoBuf;
    zegoLink: ZegoLink;
    private _linkCheckTimer;
    businessRequestMgr: NetAgentBusinessRequestMgr;
    netHeartBeatHandler: NetHeartBeatHandler;
    netAgentPCRequestMgr: NetAgentPCRequestMgr;
    streamManager: StreamManager;
    connectServers: string[];
    specifiedServers: string[];
    eventManager: EventManager;
    retryLinkHandler: NetRetryLinkHandler;
    getAppConfigFailCount: number;
    getAppConfigTime: number;
    logger: ZegoLogger;
    inited: boolean;
    stateCenter: StateCenter;
    linkMsgMaxInterval: number;
    linkMsgCheckInterval: number;
    isDestroy: boolean;
    connectedTime: number;
    connectid: string;
    reportSeq: number;
    connectSeq: number;
    primaryDomains: string[];
    get clientIP(): string;
    get timeOffset(): number;
    _linkConnectState: number;
    lastLinkConnectState: number;
    get linkConnectState(): number;
    set linkConnectState(val: number);
    constructor(proxyCtrl?: any);
    /**
     * 初始化
     */
    init(): void;
    /**
     *
     */
    unInit(): void;
    /**
     * 设置 app 信息
     * @param info
     */
    setAppInfo(appInfo: AppInfo): void;
    /**
     * 设置 user 信息
     * @param userId
     */
    setUserInfo(userId: string): void;
    /**
     * 设置统一接入默认连接地址
     * @param servers 默认域名地址
     */
    setNetAgentDefaultServers(servers: string[]): void;
    /**
     * 设置隔离域名 server 地址
     * @param servers
     */
    setNetAgentSpecifiedServers(servers: string[]): void;
    /**
     * 设置主域名、备份域名
     * @param primaryDomains
     */
    setBackupDomains(primaryDomains: string[]): void;
    /**
     * 设置调度连接 servers
     * @param servers 调度域名地址
     */
    setDispatchConnectServers(servers: string[]): void;
    /**
     * 发起http请求，短连接代理
     * @param params 请求参数
     * @param sucFunc 成功回调
     * @param errFunc 失败回调
     * @param ackFunc 接入服务收到回调
     */
    startHttpRequest(req: HttpReq, sucFunc?: Function | null, errFunc?: Function | null, ackFunc?: Function | null, option?: {
        timeout?: number;
    }): void;
    /**
     * 发起http请求，短连接代理
     * @param params 请求参数
     * @param sucFunc 成功回调
     * @param errFunc 失败回调
     * @param ackFunc 接入服务收到回调
     */
    startHttpRequest2(req: HttpReq2, sucFunc?: Function | null, errFunc?: Function | null, ackFunc?: Function | null, option?: {
        timeout?: number;
        extras?: any;
    }): void;
    /**
     * 获取柔性配置
     * @param type 柔性配置类型
     * @param token 鉴权 token
     * @param timeout 超时时间
     * @returns
     */
    getAppConfigByAgent(type: string, token: string, timeout?: number, etag?: number): Promise<any>;
    /**
     * 获取长连接代理请求
     * @param service 后端服务
     * @param option 附加参数
     * @returns
     */
    getPCRequest(service: BusinessService, option?: PCOption): NetAgentPCRequest;
    connectUa(): void;
    destroyConnect(): void;
    destroy(): void;
    /**
     * 是否连接状态
     * @returns
     */
    isConnect(): boolean;
    /**
     * 注册回调监听
     * @param event 事件
     * @param callBack 方法
     * @returns
     */
    on(event: string, callBack: Function): boolean;
    /**
     * 移除事件监听
     * @param event 事件
     * @param callBack 方法
     */
    off(event: string, callBack?: Function): void;
    setLogger(logger: any): void;
    setAccess(isAccess: boolean): void;
    getVersion(): string;
    private _heartBeatHandler;
    private _bindWindowListener;
    private _bindWxListener;
    private _netOnLineHandle;
    private _netOffLineHandle;
    private _checkLinkMsg;
    private _connect;
    private _resetNetAgent;
    private _onConnectedEvent;
    private _onConnectingEvent;
    private _getConfig;
    private _getConfigSuccess;
    private _dispatch;
    private _handleWssGroups;
    private _getConnectionDomains;
    private _getAppConfig;
    private _onDisConnectedEvent;
    private _reportDisConnectEvent;
    private _onPushEvent;
    private _redirect;
    private _connectClosed;
    private _netOnLineHandler;
    private _netOffLineHandler;
    private _connectStart;
    private _reportConnectEvent;
    private _disConnect;
    getNetworkTimeInfo(): {
        timestamp: number;
        maxDeviation: number;
    };
}
