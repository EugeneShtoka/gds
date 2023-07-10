import { ILinkedNode } from '~/dataStructures/linkedList/interfaces/iLinkedNode';
export interface IDoubleLinkedNode<T, N extends IDoubleLinkedNode<T, N>> extends ILinkedNode<T, N> {
    prev?: N;
}
