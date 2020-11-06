import getPath from 'crocks/Maybe/getPath';
import getProp from 'crocks/Maybe/getProp';
import {and, not} from 'crocks/logic';
import {composeB} from 'crocks/combinators';
import fill from '../../../utilities/fill';
import {map, reduce} from 'crocks/pointfree';
import {memoize} from '../../../utilities/RefinementType';

export const getStrength = getPath(['baseCharacteristics', 'strength']);
export const getDexterity = getPath(['baseCharacteristics', 'dexterity']);
export const getIntelligence = getPath(['baseCharacteristics', 'intelligence']);
export const getConstitution = getPath(['baseCharacteristics', 'constitution']);
export const getWisdom = getPath(['baseCharacteristics', 'wisdom']);
export const getCharisma = getPath(['baseCharacteristics', 'charisma']);

export const getProficiencyBonus = getProp('proficiencyBonus');

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

export const getModifierFrom = getCharacteristic => composeB(calcModifier, getCharacteristic);
