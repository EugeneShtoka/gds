import { IDoubleLinkedNode } from '~/dataStructures/linkedList/interfaces/iDoubleLinkedNode';
export declare class DoubleLinkedNode<T> implements IDoubleLinkedNode<T, DoubleLinkedNode<T>> {
    readonly _data: T;
    next?: DoubleLinkedNode<T>;
    prev?: DoubleLinkedNode<T>;
    get data(): T;
    constructor(data: T, links?: {
        next?: DoubleLinkedNode<T>;
        prev?: DoubleLinkedNode<T>;
    });
}
