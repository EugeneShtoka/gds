import { ICollection } from '~/interfaces/iCollection';
import { ILinkedNode } from '~/linkedList/iLinkedNode';
import { Predicate } from '~/types/predicate';

export interface ILinkedList<T> extends ICollection<T> {
    findNode(predicate: Predicate<T>): ILinkedNode<T> | undefined;
}
