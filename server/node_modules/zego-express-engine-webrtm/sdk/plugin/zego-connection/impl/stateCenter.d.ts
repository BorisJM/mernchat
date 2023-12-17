import { AppInfo, ENUM_NETWORK_STATE } from '../entity/AccessHubDefine';
export declare class StateCenter {
    networkState: ENUM_NETWORK_STATE;
    userId: string;
    appInfo: AppInfo;
    useNetAgent: boolean;
    specified: boolean;
    clientIP: string;
    timeOffset: number;
    networkRTT: number;
    ntpTimeInfo?: {
        performanceTime: number;
        ntp: number;
    };
    constructor();
    updateNTP(org: number, xmt: number, now: number): void;
}
