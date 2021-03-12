import {compose, curry, liftA2} from 'crocks/helpers';
import ifElse from 'crocks/logic/ifElse';
import {allModifiers} from '../baseCharacteristics/someLogic';
import {getProficiencyBonus} from './getters';
import {Just} from 'crocks/Maybe';
import {bimap, merge, option, map} from 'crocks/pointfree';
import {compose2, composeB} from 'crocks/combinators';
import branch from 'crocks/Pair/branch';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import includes from '../../../utilities/includes';

const add = curry((a, b) => a + b);
const liftedAdd = liftA2(add);

const calcProficiencyBonus = curry(
	(perk, isMasterPredicate) => ifElse(isMasterPredicate(perk), getProficiencyBonus, () => Just(0))
);
const calcPerkValueFromCharacteristic =
	curry((perk, getCharacteristic, isMasterPredicate) =>
		compose(option(0), merge(liftedAdd), bimap(calcProficiencyBonus(perk, isMasterPredicate), compose(map(x => allModifiers[x]), getCharacteristic))));
export const composedPerkCalculator =
	curry((isMasterPredicate, getCharacteristic, perk) =>
		composeB(calcPerkValueFromCharacteristic(perk, getCharacteristic, isMasterPredicate), branch));

export const getArraysOfProficiencies = getter => compose(a => a.flat(), maybeToArray, getter);
export const isMasterConstructor = getter => compose2(includes, (a) => a, getter);
