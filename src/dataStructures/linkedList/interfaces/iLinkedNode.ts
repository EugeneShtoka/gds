export interface ILinkedNode<T, N extends ILinkedNode<T, N>> {
    next?: N;
    get data(): T;
}
