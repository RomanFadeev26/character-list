import {CacheAdapter} from '../CacheAdapter';

describe('CacheAdapter', function () {
    test('run with same route return saved data', () => {
        const adapter = CacheAdapter.create(5000);
        const config = {
            url: '/test',
            method: 'POST',
            data: {
                a: 'a',
                b: 'b',
                c: 'c'
            }
        };
        adapter.run(config);
        const secondResult = adapter.run(config);
        const thirdResult = adapter.run(config);
        expect(secondResult).toBe(thirdResult);
    })
});
