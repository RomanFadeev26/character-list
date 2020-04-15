import {createSelector} from "reselect";
import baseCharacteristicsModel from "../../core/models/baseCharacteristics/baseCharacteristicsModel";
import character from "./character";
import {composeB} from 'crocks/combinators';
import option from 'crocks/pointfree/option';

const baseCharacteristics = createSelector(
    character,
    composeB(baseCharacteristicsModel, option({}))
);

export default baseCharacteristics;
