import { Mode } from './zego.entity';
import { TRACER_LEVEL } from './zego.entity';
export declare const CLOUD_SETTING: {
    productNum: number;
};
export declare const TRACER_CONFIG: {
    product: string;
    importLevel: TRACER_LEVEL;
    levels: number[];
    bps: number;
};
export declare const INIT = "init";
export declare const ROOM_BASIC = "room";
export declare const RTC = "rtc";
declare const SDK_CONN_TYPE = 2;
declare const CRYPT_VERSION = 1;
declare const PROTO_VER = 131072;
declare const BIZ_TYPE = 0;
declare const STORE_SECRET = "0c9e6e0f8c0a8f4e";
export declare const NET_ACCESS_SERVERS = "z_net_access_servers";
export declare const APP_CONFIG_KEY = "z_appconfig";
export declare const APP_CONFIG_TAG_KEY = "z_appconfig_etag";
export declare const APP_GEO_KEY = "z_geos";
export { SDK_CONN_TYPE, CRYPT_VERSION, PROTO_VER, BIZ_TYPE, STORE_SECRET };
export declare const NET_ACCESS_CONFIG: {
    domains: string[];
    primaryDomains: string[];
    mode: string;
    modeNo: Mode;
    sdkType: number;
    connectVer: number;
    pcEstablishTimeout: number;
    scheme: string;
    location: string;
    wssMessageType: number;
};
export declare const geoFencings: {
    id: number;
    relative_geofencings: number[];
    accesshub: string;
    logreport: string;
    detaillog: string;
}[];
export declare const extGeoFencingIDs: number[];
