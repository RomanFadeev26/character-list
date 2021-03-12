import {createSelector, createStructuredSelector} from 'reselect';
import {composeB} from 'crocks/combinators';
import {map, merge, option} from 'crocks/pointfree'
import perksModel, {proficienciesGetter} from '../../core/models/perks/perksModel';
import character from './character';
import {compose} from 'crocks/helpers';
import listToArray from 'crocks/List/listToArray';
import toPairs from 'crocks/Pair/toPairs';
import zip from '../../utilities/zip';

const perkNames = Object.keys(perksModel);
const perksCalculators = compose(listToArray, map(merge((fst, snd) => snd(fst))), toPairs);
const calculatorArray = perksCalculators(perksModel);
const entries = zip(perkNames, calculatorArray);
const perksSelector = createStructuredSelector(Object.fromEntries(entries));

const perksList = createSelector(
    character,
    composeB(perksSelector, option({}))
);

const proficiencies = createSelector(
	character,
	composeB(proficienciesGetter, option({}))
);

const perks = createStructuredSelector({
	perks: perksList,
	proficiencies
});

const passivePerceptionSelector = createSelector(
	perksList,
	perks => perks.perception + 10
);

export const passivePerception = createStructuredSelector({
	passivePerception: passivePerceptionSelector
});

export default perks;
