import {createSelector, createStructuredSelector} from 'reselect';
import {composeB} from 'crocks/combinators';
import {option} from 'crocks/pointfree'
import perksModel from '../../core/models/perks/perksModel';
import character from './character';

import {getArraysOfProficiencies as proficiencies} from '../../core/models/perks/perksModel';

const perksList = createSelector(
    character,
    composeB(perksModel, option({}))
);

const perks = createStructuredSelector({
	perks: perksList,
	proficiencies
});

export default perks;
