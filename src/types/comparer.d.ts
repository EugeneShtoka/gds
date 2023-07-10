export declare enum Comparison {
    less = -1,
    equals = 0,
    greater = 1
}
export type ComparerType<T> = (a: T, b: T) => Comparison;
export declare const DefaultComparer: <T>(a: T, b: T) => Comparison;
