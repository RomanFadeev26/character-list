import getPropOr from 'crocks/helpers/getPropOr';
import curry from 'crocks/helpers/curry';

const defaultFunc = (state, _) => state;

const propWithDefaultFunc = getPropOr(defaultFunc);

const createReducer = curry((reactions, initialState, state, {type, payload}) => {
    const reaction = propWithDefaultFunc(type, reactions);
    return reaction(state || initialState, payload)
});

export default createReducer;
