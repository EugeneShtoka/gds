import { ILinkedListBase } from '~/dataStructures/linkedList/iLinkedListBase';
import { LinkedNode } from '~/dataStructures/linkedList/single/linkedNode';

export type ILinkedList<T> = ILinkedListBase<T, LinkedNode<T>>;
