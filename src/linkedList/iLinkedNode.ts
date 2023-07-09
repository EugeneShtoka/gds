export interface ILinkedNode<T> {
    next?: ILinkedNode<T>;
    get data(): T;
}
