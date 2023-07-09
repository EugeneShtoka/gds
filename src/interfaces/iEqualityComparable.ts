import { FUNCTION_TYPE_NAME } from '~/constants';
import { ComparerType, Comparison, DefaultComparer } from '~/types/comparer';
import { Predicate } from '~/types/predicate';

export interface IEqualityComparable<T> {
    equals(other: T): boolean;
}

export const isEqualityComparable = <T>(o: any): o is IEqualityComparable<T> => {
    return typeof o?.equals === FUNCTION_TYPE_NAME;
};

export const getEqualsPredicate = <T>(item: T, comparer?: ComparerType<T>): Predicate<T> => {
    return isEqualityComparable<T>(item)
        ? (other: T) => item.equals(other)
        : (other: T) => (comparer ?? DefaultComparer)(item, other) === Comparison.equals;
};
