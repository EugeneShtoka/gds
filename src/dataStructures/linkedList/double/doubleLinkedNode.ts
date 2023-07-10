import { IDoubleLinkedNode } from '~/dataStructures/linkedList/interfaces/iDoubleLinkedNode';

export class DoubleLinkedNode<T> implements IDoubleLinkedNode<T, DoubleLinkedNode<T>> {
    readonly _data: T;
    public next?: DoubleLinkedNode<T>;
    public prev?: DoubleLinkedNode<T>;

    get data(): T {
        return this._data;
    }

    constructor(data: T, links?: { next?: DoubleLinkedNode<T>; prev?: DoubleLinkedNode<T> }) {
        this._data = data;
        this.next = links?.next;
        this.prev = links?.prev;
    }
}
