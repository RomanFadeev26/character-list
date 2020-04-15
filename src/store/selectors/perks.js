import {createSelector} from "reselect";
import perksModel from "../../core/models/perks/perksModel";
import character from "./character";
import {composeB} from 'crocks/combinators';
import {option} from 'crocks/pointfree'

const perks = createSelector(
    character,
    composeB(perksModel, option({}))
);

export default perks;
