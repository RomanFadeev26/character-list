import {createSelector, createStructuredSelector} from 'reselect';
import {composeB} from 'crocks/combinators';
import {compose} from 'crocks/helpers'
import {option, map, merge} from 'crocks/pointfree';
import safeThrowsModel, {proficienciesGetter} from '../../core/models/safeThrows/safeThrowsModel';
import character from './character';
import listToArray from 'crocks/List/listToArray';
import toPairs from 'crocks/Pair/toPairs';
import zip from '../../utilities/zip';

const safeThrowNames = Object.keys(safeThrowsModel);
const safeThrowsCalculators = compose(listToArray, map(merge((fst, snd) => snd(fst))), toPairs);
const calculatorArray = safeThrowsCalculators(safeThrowsModel);
const entries = zip(safeThrowNames, calculatorArray);
const safeThrowsSelector = createStructuredSelector(Object.fromEntries(entries));

const safeThrowsList = createSelector(
	character,
	composeB(safeThrowsSelector, option({}))
);

const proficiencies = createSelector(
	character,
	composeB(proficienciesGetter, option({}))
);

const safeThrows = createStructuredSelector({
	safeThrows: safeThrowsList,
	proficiencies
});

export default safeThrows;
