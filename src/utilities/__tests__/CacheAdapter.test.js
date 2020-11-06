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
        adapter.addCache(config);
        const secondResult = adapter.getCache(config).inspect();
        const thirdResult = adapter.getCache(config).inspect();
        expect(secondResult).toBe(thirdResult);
    })
});
