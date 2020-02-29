import zip from '../zip';

describe("should zip two arrays", () => {
    test("should be zipped to [[1,2], [3,4]]", () => {
        expect(zip([1,3], [2,4])).toEqual([[1,2], [3,4]]);
    })
});
