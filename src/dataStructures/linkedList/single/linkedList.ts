import { Predicate } from '~/types/predicate';
import { LinkedNode } from '~/dataStructures/linkedList/single/linkedNode';
import { FailedResult, IResult, SuccessResult } from '~/interfaces/iResult';
import { LinkedListBase } from '~/dataStructures/linkedList/linkedListBase';
import { ILinkedList } from '~/dataStructures/linkedList/interfaces/iLinkedList';
import { ComparerType } from '~/types/comparer';

export class LinkedList<T> extends LinkedListBase<T, LinkedNode<T>> implements ILinkedList<T> {
    private deleteNode(prevNode: LinkedNode<T>, toDelete: LinkedNode<T>) {
        prevNode.next = toDelete.next;
        this._count--;
    }

    public constructor(comparer?: ComparerType<T>) {
        super(comparer);
    }

    protected isLast(current: LinkedNode<T>): boolean {
        return !current;
    }

    protected override createNode(data: T): LinkedNode<T> {
        return new LinkedNode<T>(data);
    }

    public override delete(node: LinkedNode<T>): boolean {
        let prevNode: LinkedNode<T> | undefined = undefined;
        for (const prev of [this._head, ...this.generator()]) {
            if (prev.next === node) {
                prevNode = prev;
                break;
            }
        }
        if (!prevNode) return false;
        this.deleteNode(prevNode, node);
        return true;
    }

    public override retrieveByPredicate(predicate: Predicate<T>): IResult<T> {
        let cursor: LinkedNode<T> | undefined = this._head;
        let next = this._head.next;

        while (next) {
            const data = cursor?.next?.data;
            if (data && predicate(data)) {
                this.deleteNode(cursor, next);
                return new SuccessResult(next.data);
            }
            cursor = next;
            next = next.next;
        }

        return new FailedResult();
    }

    public insert(node: LinkedNode<T>, ...items: T[]): void {
        items.reduce((cursor: LinkedNode<T>, item: T) => {
            cursor.next = new LinkedNode<T>(item, cursor.next);
            this._count++;
            return cursor.next;
        }, node);
    }

    public clear(): void {
        this._head.next = undefined;
        this._count = 0;
    }
}
