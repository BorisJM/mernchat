export declare function getBrowser(): string;
export declare function isUrl(str: string): boolean;
export declare function isKeepTryLogin(code: number): boolean;
export declare function compareVersion(v1: string[] | string, v2: string | string[]): number;
export declare function getLogLevel(level: 'debug' | 'info' | 'warn' | 'error' | 'report' | 'disable'): number;
export declare function getNetType(): string;
export declare function encryptStores(originString: string, secret: string): string;
export declare function decryptStores(ciphertext: string, secret: string): string;
export declare function getCurrentTime(): string;
export declare function isRightServerForAppid(server: string, appid: number): boolean;
export declare function setLocalStorage(key: string, data: any): void;
export declare function getLocalStorage(key: string): any;
export declare function saveWXNetType(): void;
/**
 * @param taskCallBack return async boolean 返回是否成功
 * @param timeout 超时回调
 */
export declare function retryUtilTimeoutTask(taskCallBack: () => Promise<boolean>, timeoutCallback: () => void, option: {
    maxTimeoutDelay: number;
    retryDelay: number;
}): void;
