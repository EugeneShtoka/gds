import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';
export declare class LinkedNode<T> implements ILinkedNode<T, LinkedNode<T>> {
    private readonly _data;
    next?: LinkedNode<T>;
    get data(): T;
    constructor(data: T, next?: LinkedNode<T>);
}
