export interface IResult<T> {
    success: boolean;
    result?: T;
}

export class Result<T> implements IResult<T> {
    public readonly success;
    public readonly result?: T;

    constructor(success: boolean, result?: T) {
        this.success = success;
        if (success) this.result = result;
    }
}

export class SuccessResult<T> implements IResult<T> {
    public readonly success = true;
    public readonly result;

    constructor(result: T) {
        this.result = result;
    }
}

export class FailedResult<T> implements IResult<T> {
    public readonly success = false;
}
