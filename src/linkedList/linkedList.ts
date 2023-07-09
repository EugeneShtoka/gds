import { ComparerType } from '~/types/comparer';
import { Predicate } from '~/types/predicate';
import { ILinkedList } from '~/linkedList/iLinkedList';
import { ILinkedNode } from '~/linkedList/iLinkedNode';
import { getEqualsPredicate } from '~/interfaces/iEqualityComparable';
import { FailedResult, IResult, Result, SuccessResult } from '~/interfaces/iResult';

class LinkedNode<T> implements ILinkedNode<T> {
    readonly _data: T;
    public next?: ILinkedNode<T>;

    get data(): T {
        return this._data;
    }

    constructor(data: T, next?: ILinkedNode<T>) {
        this._data = data;
        this.next = next;
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private readonly _head: ILinkedNode<T> = new LinkedNode(null as any);
    private _count = 0;

    get count(): number {
        return this._count;
    }

    *[Symbol.iterator](): IterableIterator<T> {
        let cursor: ILinkedNode<T> | undefined = this._head.next;
        while (!!cursor) {
            yield cursor.data;
            cursor = cursor.next;
        }
    }

    private addSingle(item: T): void {
        this._head.next = new LinkedNode(item, this._head.next);
        this._count++;
    }

    add(...items: T[]): void {
        items.forEach((item) => this.addSingle(item));
    }

    remove(item: T, comparer?: ComparerType<T>): boolean {
        return this.removeByPredicate(getEqualsPredicate(item, comparer)).success;
    }

    removeByPredicate(predicate: Predicate<T>): IResult<T> {
        let cursor: ILinkedNode<T> | undefined = this._head;
        let next = this._head.next;

        while (next) {
            const data = cursor?.next?.data;
            if (data && predicate(data)) {
                cursor.next = next.next;
                this._count--;
                return new SuccessResult(next.data);
            }
            cursor = next;
            next = next.next;
        }

        return new FailedResult();
    }

    contains(item: T, comparer?: ComparerType<T>): boolean {
        return this.findNode(getEqualsPredicate(item, comparer)) !== undefined;
    }

    find(predicate: Predicate<T>): IResult<T> {
        const node = this.findNode(predicate);
        return new Result(!!node, node?.data);
    }

    findNode(predicate: Predicate<T>): ILinkedNode<T> | undefined {
        let cursor = this._head.next;
        while (cursor) {
            if (predicate(cursor.data)) return cursor;
            cursor = cursor.next;
        }

        return undefined;
    }

    clear(): void {
        this._head.next = undefined;
        this._count = 0;
    }
}
