import { Predicate } from '~/types/predicate';
import { ComparerType } from '~/types/comparer';
import { IResult } from '~/interfaces/iResult';

export interface ICollection<T> extends Iterable<T> {
    get count(): number;

    add(data: T): void;
    remove(data: T): boolean;
    removeByPredicate(predicate: Predicate<T>): IResult<T>;
    contains(data: T, comparer: ComparerType<T>): boolean;
    find(predicate: Predicate<T>): IResult<T>;
    clear(): void;
}
