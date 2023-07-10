import { genericGenerator } from '~/dataStructures/genericGenerator';
import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';
import { ILinkedListBase } from '~/dataStructures/linkedList/iLinkedListBase';
import { ComparerType } from '~/types/comparer';
import { getEqualsPredicate } from '~/interfaces/iEqualityComparable';
import { Predicate } from '~/types/predicate';
import { FailedResult, IResult, Result, SuccessResult } from '~/interfaces/iResult';

export abstract class LinkedListBase<T, N extends ILinkedNode<T, N>> implements ILinkedListBase<T, N> {
    protected _count = 0;
    protected readonly _head: N = this.createNode(null as any);

    protected abstract isLast(current: ILinkedNode<T, N>): boolean;
    protected abstract createNode(data: T): N;
    protected generator(): Generator<N> {
        return genericGenerator<N>(this._head.next, (curr) => curr?.next, this.isLast.bind(this));
    }

    protected findNodeInternal(predicate: Predicate<T>, generator: Generator<N>): N | undefined {
        for (const node of generator) {
            if (predicate(node.data)) return node;
        }

        return undefined;
    }

    protected findInternal(predicate: Predicate<T>, generator: Generator<N>): IResult<T> {
        const node = this.findNodeInternal(predicate, generator);
        return new Result(!!node, node?.data);
    }

    protected retrieveInternal(data: T, generator: Generator<N>): boolean {
        return this.retrieveByPredicateInternal(getEqualsPredicate(data, this.comparer), generator).success;
    }

    public retrieveByPredicateInternal(predicate: Predicate<T>, generator: Generator<N>): IResult<T> {
        const node = this.findNodeInternal(predicate, generator);
        if (!node) return new FailedResult();
        this.delete(node);
        return new SuccessResult(node.data);
    }

    protected constructor(protected readonly comparer?: ComparerType<T>) {}

    public abstract insert(node: N, ...items: T[]): void;
    public abstract delete(node: N): boolean;
    public abstract clear(): void;

    public *[Symbol.iterator](): Iterator<T> {
        for (const item of this.generator()) {
            yield item.data;
        }
    }

    public add(...items: T[]): void {
        this.insert(this._head, ...items);
    }

    public contains(data: T): boolean {
        return this.findNode(getEqualsPredicate(data, this.comparer)) !== undefined;
    }

    public get count(): number {
        return this._count;
    }

    public find(predicate: Predicate<T>): IResult<T> {
        return this.findInternal(predicate, this.generator());
    }

    public findNode(predicate: Predicate<T>): N | undefined {
        return this.findNodeInternal(predicate, this.generator());
    }

    public retrieve(data: T): boolean {
        return this.retrieveInternal(data, this.generator());
    }

    public retrieveByPredicate(predicate: Predicate<T>): IResult<T> {
        return this.retrieveByPredicateInternal(predicate, this.generator());
    }
}
