import {and, not} from 'crocks/logic';
import {reduce} from 'crocks/pointfree';
import {last} from '../../../utilities/last';
import fill from '../../../utilities/fill';

const zeroOrOne = count => count === 0 || count === 1;
const isEven = count => count % 2 === 0;
export const shouldModifierIncrease = and(isEven, not(zeroOrOne));

const modsReducer = (acc, _) => {
	const currentMod = last(acc);
	const count = acc.length;
	return shouldModifierIncrease(count) ? acc.concat([currentMod + 1]) : acc.concat([currentMod]);
};
const filledArrayForMods = fill(null, Array(30));
export const allModifiers = reduce(modsReducer, [-5], filledArrayForMods);
