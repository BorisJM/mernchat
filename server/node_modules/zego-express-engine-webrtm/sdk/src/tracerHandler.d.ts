import { ZegoLogger } from 'zego-express-logger';
export declare class TracerHandler {
    private _zgp_logger;
    private _tracer;
    private _product;
    private _commonAttrs;
    commonStates: any;
    isUnload: boolean;
    constructor(_zgp_logger: ZegoLogger);
    init(appID: number, ENV: number, deviceID: string): void;
    setConfig(cfg: {
        bps?: number;
        totalDBSize?: number;
        serverUrl?: string;
    }): void;
    loadScript(isRemote: boolean, url: string, key: string, hash: string): Promise<void>;
    setReporterInfo(userID: string, token: string): void;
    flush(cfg?: {
        bps: number;
    }): void;
    destroy(): void;
    setCommonStates(commonStates: any): void;
    setResource(resource: any): void;
    setCommonAttributes(attributes: any): void;
    deleteCommonAttributes(attr: string[]): void;
    createSpan(level: number, name: string, parentSpan?: any): any;
    spanEnd(span: any, attributes?: any): void;
    spanSetAttributes(span: any, attributes: any): void;
    spanAppendAttribute(span: any, key: string, value: any): void;
    setError(span: any, error: any, externalMsg?: string): void;
    setLogger(_zgp_logger: any): void;
    setTimeOffset(offset: number): void;
    setUnloadState(level: number): void;
    setNetStateCheck(): void;
}
