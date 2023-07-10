import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';
import { ILinkedListBase } from '~/dataStructures/linkedList/iLinkedListBase';
import { ComparerType } from '~/types/comparer';
import { Predicate } from '~/types/predicate';
import { IResult } from '~/interfaces/iResult';
export declare abstract class LinkedListBase<T, N extends ILinkedNode<T, N>> implements ILinkedListBase<T, N> {
    protected readonly comparer?: ComparerType<T> | undefined;
    protected _count: number;
    protected readonly _head: N;
    protected abstract isLast(current: ILinkedNode<T, N>): boolean;
    protected abstract createNode(data: T): N;
    protected generator(): Generator<N>;
    protected findNodeInternal(predicate: Predicate<T>, generator: Generator<N>): N | undefined;
    protected findInternal(predicate: Predicate<T>, generator: Generator<N>): IResult<T>;
    protected retrieveInternal(data: T, generator: Generator<N>): boolean;
    retrieveByPredicateInternal(predicate: Predicate<T>, generator: Generator<N>): IResult<T>;
    protected constructor(comparer?: ComparerType<T> | undefined);
    abstract insert(node: N, ...items: T[]): void;
    abstract delete(node: N): boolean;
    abstract clear(): void;
    [Symbol.iterator](): Iterator<T>;
    add(...items: T[]): void;
    contains(data: T): boolean;
    get count(): number;
    find(predicate: Predicate<T>): IResult<T>;
    findNode(predicate: Predicate<T>): N | undefined;
    retrieve(data: T): boolean;
    retrieveByPredicate(predicate: Predicate<T>): IResult<T>;
}
