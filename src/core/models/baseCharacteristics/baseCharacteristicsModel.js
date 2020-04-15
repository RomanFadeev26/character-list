import { createStructuredSelector } from 'reselect';
import {memoize} from "../../../utilities/RefinementType";
import {composeB} from "crocks/combinators";
import fill from "../../../utilities/fill";
import {and, not} from "crocks/logic";
import {map, reduce, bimap, option} from "crocks/pointfree";
import {curry, liftA2} from "crocks/helpers";
import getPath from "crocks/Maybe/getPath";
import getProp from "crocks/Maybe/getProp";
import branch from 'crocks/Pair/branch';

const zeroOrOne = count => count === 0 || count === 1;
const isEven = count => count % 2 === 0;
const shouldModifierIncrease = and(isEven, not(zeroOrOne));
const last = arr => arr[arr.length - 1];
const modsReducer = (acc, _) => {
    const currentMod = last(acc);
    const count = acc.length;
    return shouldModifierIncrease(count) ? acc.concat([currentMod + 1]) : acc.concat([currentMod]);
};
const fillArrayForMods = composeB(fill(null), Array);
const getModifiers = composeB(reduce(modsReducer, [-5]), fillArrayForMods);
const getModifier = map(x => getModifiers(x)[x]);
export const calcModifier = memoize((characteristic) => getModifier(characteristic));

const add = curry((a, b) => a + b);
export const liftedAdd = liftA2(add);
export const getStrength = getPath(['baseCharacteristics', 'strength']);
export const getDexterity = getPath(['baseCharacteristics', 'dexterity']);
export const getIntelligence = getPath(['baseCharacteristics', 'intelligence']);
export const getConstitution = getPath(['baseCharacteristics', 'constitution']);
export const getWisdom = getPath(['baseCharacteristics', 'wisdom']);
export const getCharisma = getPath(['baseCharacteristics', 'charisma']);
export const getProficiencies = getPath(['perks', 'proficiency']);
export const getProficiencyBonus = getProp('proficiencyBonus');

export const getModifierFrom = getCharacteristic => composeB(calcModifier, getCharacteristic);

const baseCharacteristicPair = getCharacteristic => {
    const getCharacteristicFromMaybe = composeB(option(0), getCharacteristic);
    const getModifierFromMaybe = composeB(option(0), getModifierFrom(getCharacteristic));
    return composeB(bimap(getCharacteristicFromMaybe, getModifierFromMaybe), branch);
};

const baseCharacteristicsModel = {
    strength: baseCharacteristicPair(getStrength),
    dexterity: baseCharacteristicPair(getDexterity),
    constitution: baseCharacteristicPair(getConstitution),
    intelligence: baseCharacteristicPair(getIntelligence),
    wisdom: baseCharacteristicPair(getWisdom),
    charisma: baseCharacteristicPair(getCharisma)
};

export default createStructuredSelector(baseCharacteristicsModel);
