export enum Comparison {
    less = -1,
    equals = 0,
    greater = 1,
}

export type ComparerType<T> = (a: T, b: T) => Comparison;

export const DefaultComparer = <T>(a: T, b: T): Comparison => {
    return a === b ? Comparison.equals : a < b ? Comparison.less : Comparison.greater;
};
