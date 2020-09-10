import validator from './validator';

export class CacheAdapter {

    constructor(ttl) {
        this.cache = {};
        this.getFromCache = validator(ttl, this.cache);
    }

    addCache({url, method, data}) {
        const key = this.createCacheKey(url, method);

        this.cache[key] = {
            timestamp: Date.now(),
            data
        };
        return this.cache[key];
    }

    createCacheKey(url, method) {
        return `${method.toLowerCase()}:: ${url.toLowerCase()}`;
    }

    static create(ttl){
        return new CacheAdapter(ttl);
    }

    getCache(config) {
        const {url, method} = config;
        const key = this.createCacheKey(url, method);
        return this.getFromCache(key);
    }
}
