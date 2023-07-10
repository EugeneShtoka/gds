import { ComparerType } from '~/types/comparer';
import { DoubleLinkedNode } from '~/dataStructures/linkedList/double/doubleLinkedNode';
import { IDoubleLinkedList } from '~/dataStructures/linkedList/interfaces/iDoubleLinkedList';
import { LinkedListBase } from '~/dataStructures/linkedList/linkedListBase';
import { Predicate } from '~/types/predicate';
import { IResult } from '~/interfaces/iResult';
import { genericGenerator } from '~/dataStructures/genericGenerator';

export class DoubleLinkedList<T> extends LinkedListBase<T, DoubleLinkedNode<T>> implements IDoubleLinkedList<T> {
    private readonly _tail: DoubleLinkedNode<T>;

    protected isLast(current: DoubleLinkedNode<T>): boolean {
        return current === this._tail;
    }

    protected override createNode(data: T, next?: DoubleLinkedNode<T>): DoubleLinkedNode<T> {
        return new DoubleLinkedNode<T>(data, next);
    }

    protected reverseGenerator(): Generator<DoubleLinkedNode<T>> {
        return genericGenerator<DoubleLinkedNode<T>>(this._tail.prev, (curr) => curr?.prev, this.isLast.bind(this));
    }

    public constructor(comparer?: ComparerType<T>) {
        super(comparer);
        this._tail = new DoubleLinkedNode(null as any);

        this._head.next = this._tail;
        this._tail.prev = this._head;
    }

    private addFirstSingle(item: T): void {
        const oldHead = this._head.next;
        const newNode = new DoubleLinkedNode(item, { next: oldHead });
        this._head.next = newNode;
        if (oldHead) oldHead.prev = this._head.next;
        newNode.prev = this._head;

        this._count++;
    }

    public addFirst(...items: T[]): void {
        items.forEach((item) => this.addFirstSingle(item));
    }

    // ToDo: need to verify that provided node belongs to this list.
    public delete(node: DoubleLinkedNode<T>): boolean {
        if (!node) return false;
        this._count--;
        if (node.prev) node.prev.next = node.next;
        if (node.next) node.next.prev = node.prev;

        return true;
    }

    // ToDo: need to verify that provided node belongs to this list.
    public insert(node: DoubleLinkedNode<T>, ...items: T[]): void {
        items.reduce((cursor: DoubleLinkedNode<T>, item: T) => {
            const newNode = new DoubleLinkedNode(item, { next: cursor.next, prev: cursor });
            if (cursor.next) cursor.next.prev = newNode;
            cursor.next = newNode;
            this._count++;
            return newNode;
        }, node);
    }

    public clear(): void {
        this._head.next = this._tail;
        this._tail.prev = this._head;
        this._count = 0;
    }

    public findLast(predicate: Predicate<T>): IResult<T> {
        return this.findInternal(predicate, this.reverseGenerator());
    }

    public findLastNode(predicate: Predicate<T>): DoubleLinkedNode<T> | undefined {
        return this.findNodeInternal(predicate, this.reverseGenerator());
    }

    public retrieveLast(data: T): boolean {
        return this.retrieveInternal(data, this.reverseGenerator());
    }

    public retrieveLastByPredicate(predicate: Predicate<T>): IResult<T> {
        return this.retrieveByPredicateInternal(predicate, this.reverseGenerator());
    }
}
