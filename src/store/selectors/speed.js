import {createStructuredSelector, createSelector} from 'reselect';
import {chain, option} from 'crocks/pointfree';
import getProp from 'crocks/Maybe/getProp';
import {compose} from 'crocks/helpers';
import character from './character';

const selectSpeed = createSelector(
	character,
	compose(option(0), chain(getProp('speed')))
);

export default createStructuredSelector({
	speed: selectSpeed
});
