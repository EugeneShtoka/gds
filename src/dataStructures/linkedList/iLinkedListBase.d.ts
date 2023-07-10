import { ICollection } from '~/interfaces/iCollection';
import { Predicate } from '~/types/predicate';
import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';
export interface ILinkedListBase<T, N extends ILinkedNode<T, N>> extends ICollection<T> {
    findNode(predicate: Predicate<T>): N | undefined;
    delete(node: N): boolean;
    insert(node: N, ...items: T[]): void;
}
