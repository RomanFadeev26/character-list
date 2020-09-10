import { Just, Nothing } from 'crocks/Maybe';
import getProp from 'crocks/Maybe/getProp';
import {option, map, chain} from 'crocks/pointfree';
import {compose} from 'crocks/helpers'

const validator = (ttl, cache) => key => {
    const keys = Object.keys(cache);
    const cacheKey = keys.find((cacheKey) => new RegExp(`^${cacheKey}`, 'gi').test(key));
    if(!cacheKey) {
        return Nothing();
    }
    const subtractTS = compose(map(ts => Date.now() - ts),chain(getProp('timestamp')), getProp(cacheKey));
    const validateByTtl = compose(map(a => a < ttl), subtractTS);
    const getTtlValidationResult = compose(option(false), validateByTtl);
    return getTtlValidationResult(cache) ? Just(cache[cacheKey].data) : Nothing();
};

export default validator;
