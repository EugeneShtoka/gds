import { LinkedList } from '~/dataStructures/linkedList/single/linkedList';
import { ICollection } from '~/interfaces/iCollection';
import { DoubleLinkedList } from '~/dataStructures/linkedList/double/doubleLinkedList';

function verifyContentAndCount<T>(collection: ICollection<T>, array: T[], compareFn?: (a: T, b: T) => number) {
    const collectionArray = [...collection].sort(compareFn);
    expect(collection.count).toEqual(array.length);
    expect(collectionArray).toEqual(array);
}

function verifyNumberContentAndCount(collection: ICollection<number>, array: number[]) {
    verifyContentAndCount<number>(collection, array, (a: number, b: number) => (a > b ? 1 : -1));
}

describe.each([() => new LinkedList<number>(), () => new DoubleLinkedList<number>()])(
    'Test collection interface for each implementing DS',
    (constructor) => {
        const className = constructor().constructor.name;

        test(`${className}: verify empty collection ${className}`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);
        });

        test(`${className}: add method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            collection.add(5);
            verifyNumberContentAndCount(collection, [5]);

            collection.add(7);
            verifyNumberContentAndCount(collection, [5, 7]);

            collection.add(4, 6, 8);
            verifyNumberContentAndCount(collection, [4, 5, 6, 7, 8]);
        });

        test(`${className}: remove method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            expect(collection.retrieve(5).valueOf()).toBeFalsy();
            verifyNumberContentAndCount(collection, []);

            collection.add(4);
            verifyNumberContentAndCount(collection, [4]);

            expect(collection.retrieve(5)).toBeFalsy();
            verifyNumberContentAndCount(collection, [4]);

            expect(collection.retrieve(4)).toBeTruthy();
            verifyNumberContentAndCount(collection, []);

            collection.add(4);
            verifyNumberContentAndCount(collection, [4]);
        });

        test(`${className}: removeByPredicate method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            collection.add(5, 4, 6);
            verifyNumberContentAndCount(collection, [4, 5, 6]);

            const predicate = (equalsTo: number) => (num: number) => num > equalsTo;
            for (let i = 0; i < 2; i++) {
                const result = collection.retrieveByPredicate(predicate(4));
                expect(result.success).toBeTruthy();
            }

            verifyNumberContentAndCount(collection, [4]);
        });

        test(`${className}: find method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            collection.add(3, 5, 7, 11, 13, 17, 19, 23);
            verifyNumberContentAndCount(collection, [3, 5, 7, 11, 13, 17, 19, 23]);

            const predicate = (equalsTo: number) => (num: number) => num === equalsTo;
            expect(collection.find(predicate(4)).success).toBeFalsy();

            const result = collection.find(predicate(5));
            expect(result).toMatchObject({ success: true, result: 5 });

            verifyNumberContentAndCount(collection, [3, 5, 7, 11, 13, 17, 19, 23]);
        });

        test(`${className}: contains method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            collection.add(3, 5, 7, 11, 13, 17, 19, 23);
            verifyNumberContentAndCount(collection, [3, 5, 7, 11, 13, 17, 19, 23]);

            expect(collection.contains(4)).toBeFalsy();
            expect(collection.contains(5)).toBeTruthy();

            verifyNumberContentAndCount(collection, [3, 5, 7, 11, 13, 17, 19, 23]);
        });

        test(`${className}: clear method`, () => {
            const collection = constructor();

            verifyNumberContentAndCount(collection, []);

            collection.add(3, 5, 7, 11);
            verifyNumberContentAndCount(collection, [3, 5, 7, 11]);

            collection.retrieve(5);
            verifyNumberContentAndCount(collection, [3, 7, 11]);

            collection.add(13, 17, 19, 23);
            verifyNumberContentAndCount(collection, [3, 7, 11, 13, 17, 19, 23]);

            collection.retrieve(17);
            verifyNumberContentAndCount(collection, [3, 7, 11, 13, 19, 23]);

            collection.clear();
            verifyNumberContentAndCount(collection, []);
        });
    },
);
