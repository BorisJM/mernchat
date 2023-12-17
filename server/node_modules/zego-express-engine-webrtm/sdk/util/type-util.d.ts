export declare function typeIsNumber(value: unknown): value is number;
export declare function typeIsString(value: unknown): value is string;
export declare function typeIsBoolean(value: unknown): value is boolean;
export declare function typeIsUndefined(value: unknown): value is undefined;
export declare function typeIsObject(value: unknown): value is Record<any, any>;
export declare function typeIsFunction(value: unknown): value is Function;
export declare function typeIsArray<T = any>(value: unknown): value is Array<T>;
export declare function typeIsArrayBuffer(value: unknown): value is ArrayBuffer;
