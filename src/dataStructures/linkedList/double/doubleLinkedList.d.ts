import { ComparerType } from '~/types/comparer';
import { DoubleLinkedNode } from '~/dataStructures/linkedList/double/doubleLinkedNode';
import { IDoubleLinkedList } from '~/dataStructures/linkedList/interfaces/iDoubleLinkedList';
import { LinkedListBase } from '~/dataStructures/linkedList/linkedListBase';
import { Predicate } from '~/types/predicate';
import { IResult } from '~/interfaces/iResult';
export declare class DoubleLinkedList<T> extends LinkedListBase<T, DoubleLinkedNode<T>> implements IDoubleLinkedList<T> {
    private readonly _tail;
    protected isLast(current: DoubleLinkedNode<T>): boolean;
    protected createNode(data: T, next?: DoubleLinkedNode<T>): DoubleLinkedNode<T>;
    protected reverseGenerator(): Generator<DoubleLinkedNode<T>>;
    constructor(comparer?: ComparerType<T>);
    private addFirstSingle;
    addFirst(...items: T[]): void;
    delete(node: DoubleLinkedNode<T>): boolean;
    insert(node: DoubleLinkedNode<T>, ...items: T[]): void;
    clear(): void;
    findLast(predicate: Predicate<T>): IResult<T>;
    findLastNode(predicate: Predicate<T>): DoubleLinkedNode<T> | undefined;
    retrieveLast(data: T): boolean;
    retrieveLastByPredicate(predicate: Predicate<T>): IResult<T>;
}
