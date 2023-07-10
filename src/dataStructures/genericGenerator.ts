export function* genericGenerator<T>(
    current: T | undefined,
    getNext: (curr: T) => T | undefined,
    isLast: (curr: T) => boolean,
): Generator<T> {
    while (!!current && !isLast(current)) {
        yield current;
        current = getNext(current);
    }
}
