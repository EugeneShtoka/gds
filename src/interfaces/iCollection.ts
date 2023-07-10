import { Predicate } from '~/types/predicate';
import { IResult } from '~/interfaces/iResult';

export interface ICollection<T> extends Iterable<T> {
    get count(): number;

    add(...data: T[]): void;
    retrieve(data: T): boolean;
    retrieveByPredicate(predicate: Predicate<T>): IResult<T>;
    contains(data: T): boolean;
    find(predicate: Predicate<T>): IResult<T>;
    clear(): void;
}
