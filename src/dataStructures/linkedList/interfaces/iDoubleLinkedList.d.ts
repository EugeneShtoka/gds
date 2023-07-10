import { ILinkedListBase } from '~/dataStructures/linkedList/iLinkedListBase';
import { DoubleLinkedNode } from '~/dataStructures/linkedList/double/doubleLinkedNode';
import { Predicate } from '~/types/predicate';
import { IResult } from '~/interfaces/iResult';
export interface IDoubleLinkedList<T> extends ILinkedListBase<T, DoubleLinkedNode<T>> {
    findLast(predicate: Predicate<T>): IResult<T>;
    findLastNode(predicate: Predicate<T>): DoubleLinkedNode<T> | undefined;
    retrieveLast(data: T): boolean;
    retrieveLastByPredicate(predicate: Predicate<T>): IResult<T>;
}
