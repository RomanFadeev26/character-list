import axios from 'axios';
import {chain, either} from 'crocks/pointfree';
import {fromPromise} from 'crocks/Async';
import maybeToEither from 'crocks/Either/maybeToEither';
import {CacheAdapter} from './CacheAdapter';
import composeB from 'crocks/combinators/composeB';

const axiosAsync = composeB(chain(({data}) => data), fromPromise(axios));
export const cacheAdapter = CacheAdapter.create(1000 * 60 * 5);
const getFromCache = (requestParams) => {
    const fromCache = cacheAdapter.getCache(requestParams);
    return maybeToEither(requestParams, fromCache);
};
const axiosOrFromCache = either(axiosAsync, a => a);

export default composeB(axiosOrFromCache, getFromCache);
