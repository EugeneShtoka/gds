import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';

export class LinkedNode<T> implements ILinkedNode<T, LinkedNode<T>> {
    private readonly _data: T;
    public next?: LinkedNode<T>;

    public get data(): T {
        return this._data;
    }

    constructor(data: T, next?: LinkedNode<T>) {
        this._data = data;
        this.next = next;
    }
}
