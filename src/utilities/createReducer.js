import { compose, values, reduce, assoc, propOr } from 'ramda';

const defaultFunc = (state, _) => state;

const reduceReactions = compose(reduce((acc, x) => assoc(x.type, x, acc), {}),
values);

const propWithDefaultFunc = propOr(defaultFunc);

const createReducer = (reactions, initialState) =>
    (state = initialState, {type, payload}) => compose(
                propWithDefaultFunc(type),
                reduceReactions
            )(reactions)(state, payload);
    
export default createReducer
