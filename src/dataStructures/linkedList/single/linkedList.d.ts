import { Predicate } from '~/types/predicate';
import { LinkedNode } from '~/dataStructures/linkedList/single/linkedNode';
import { IResult } from '~/interfaces/iResult';
import { LinkedListBase } from '~/dataStructures/linkedList/linkedListBase';
import { ILinkedList } from '~/dataStructures/linkedList/interfaces/iLinkedList';
import { ComparerType } from '~/types/comparer';
export declare class LinkedList<T> extends LinkedListBase<T, LinkedNode<T>> implements ILinkedList<T> {
    private deleteNode;
    constructor(comparer?: ComparerType<T>);
    protected isLast(current: LinkedNode<T>): boolean;
    protected createNode(data: T): LinkedNode<T>;
    delete(node: LinkedNode<T>): boolean;
    retrieveByPredicate(predicate: Predicate<T>): IResult<T>;
    insert(node: LinkedNode<T>, ...items: T[]): void;
    clear(): void;
}
