import { DeviceInfo, ZegoLogger, ZegoDataReport, ZegoError, NetType } from '../src/zego.entity';
export declare function checkInteger(num: number | undefined, positive?: boolean): boolean;
export declare function checkConfigParam(appid: number, server: string | Array<string>, logger: ZegoLogger): boolean;
export declare function checkPriConfigParam(appid: number, dispatchServer: string, deviceInfo: DeviceInfo, anType: number, logger: ZegoLogger): boolean;
export declare function checkIllegalCharacters(str: string): boolean;
export declare function registerCallback(fName: string, option: {
    success?: Function;
    error?: Function;
}, callbackList: {
    [index: string]: Function;
}): void;
export declare function actionErrorCallback(fName: string, callbackList: {
    [index: string]: Function;
}): Function;
export declare function actionSuccessCallback(fName: string, callbackList: {
    [index: string]: Function;
}): Function;
export declare function logReportCallback(logEvent: string, dataReport: ZegoDataReport, reportSeq: number, callbackList: {
    [index: string]: Function;
}): void;
export declare function proxyRes(dataReport: ZegoDataReport, reportSeq: number, resolve: any, reject: any): any;
/**
         错误管理
         */
export declare function getServerError(code: number): ZegoError;
export declare function unregisterCallback(fName: string, callbackList: {
    [index: string]: Function;
}): void;
export declare function decodeServerError(code: number, msg: string): {
    code: number;
    message: string;
};
export declare function getLiveRoomError(code: number, useNetAgent?: boolean): string;
export declare function getKickoutError(code: number, useNetAgent: boolean): {
    code: number;
    message: string;
    name?: string;
};
export declare function dataReportEvent(dataReport: ZegoDataReport, reportSeq: number, reportName: string, eventName: string, args: any): void;
export declare function mergeUserList(logger: ZegoLogger, oldUserList: any[], newUserList: any[], callbackResult: (addUserList: any[], delUserList: any[]) => void): void;
export declare function checkValidNumber(param: number, min?: number, max?: number): boolean;
export declare function generateRandumNumber(maxNum: number): number;
export declare function uuid(len?: number, radix?: number): string;
export declare function isTestEnv(server: string): boolean;
export declare function getUint64(byteOffset: number, littleEndian: boolean, dv: DataView): number;
/**
 *  返回 token 过期时间点，单位 s
 */
export declare function decodeTokenExpire(token: string): number;
export declare function bin2hex(s: string): string;
export declare function getCanvasFingerprint(domain: string): string;
export declare function createUUID(env: number): string;
export declare function generateUUID(env?: number): string;
export declare function getNetTypeNum(): NetType;
