import { ComparerType } from '~/types/comparer';
import { Predicate } from '~/types/predicate';
export interface IEqualityComparable<T> {
    equals(other: T): boolean;
}
export declare const isEqualityComparable: <T>(o: any) => o is IEqualityComparable<T>;
export declare const getEqualsPredicate: <T>(item: T, comparer?: ComparerType<T> | undefined) => Predicate<T>;
