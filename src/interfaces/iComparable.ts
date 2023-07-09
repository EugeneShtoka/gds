import { Comparison } from '~/types/comparer';
import { FUNCTION_TYPE_NAME } from '~/constants';

export interface IComparable<T> {
    compare(other: T): Comparison;
}

export const isComparable = <T>(o: any): o is IComparable<T> => {
    return typeof o?.compare === FUNCTION_TYPE_NAME;
};
