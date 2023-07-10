import { Comparison } from '~/types/comparer';
export interface IComparable<T> {
    compare(other: T): Comparison;
}
export declare const isComparable: <T>(o: any) => o is IComparable<T>;
