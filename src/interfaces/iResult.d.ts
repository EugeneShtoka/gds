export interface IResult<T> {
    success: boolean;
    result?: T;
}
export declare class Result<T> implements IResult<T> {
    readonly success: boolean;
    readonly result?: T;
    constructor(success: boolean, result?: T);
}
export declare class SuccessResult<T> implements IResult<T> {
    readonly success = true;
    readonly result: T;
    constructor(result: T);
}
export declare class FailedResult<T> implements IResult<T> {
    readonly success = false;
}
