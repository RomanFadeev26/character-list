import {composeB} from 'crocks/combinators';
import option from 'crocks/pointfree/option';
import {createSelector, createStructuredSelector} from 'reselect';
import baseCharacteristicsModel from '../../core/models/baseCharacteristics/baseCharacteristicsModel';
import character from './character';

const baseCharacteristics = createSelector(
    character,
    composeB(createStructuredSelector(baseCharacteristicsModel), option({}))
);

export default baseCharacteristics;
