import {createStructuredSelector} from 'reselect';

import getPath from 'crocks/Maybe/getPath';
import getProp from 'crocks/Maybe/getProp';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import {Just} from 'crocks/Maybe';
import listToArray from 'crocks/List/listToArray';
import {composeB, compose2} from 'crocks/combinators';
import {compose, liftA2, curry} from 'crocks/helpers';
import branch from 'crocks/Pair/branch';
import toPairs from 'crocks/Pair/toPairs';
import {merge, option, bimap, reduce, map} from 'crocks/pointfree';
import {not, and, ifElse} from 'crocks/logic';

import includes from '../../../utilities/includes';
import zip from '../../../utilities/zip';
import fill from '../../../utilities/fill';
import {memoize} from '../../../utilities/RefinementType';

const calcModifier = memoize((characteristic) => {
    const fillArrayForMods = composeB(fill(null), Array);
    const zeroOrOne = count => count === 0 || count === 1;
    const isEven = count => count % 2 === 0;
    const shouldModifierIncrease = and(isEven, not(zeroOrOne));
    const last = arr => arr[arr.length - 1];
    const modsReducer = (acc, _) => {
        const currentMod = last(acc);
        const count = acc.length;
        return shouldModifierIncrease(count) ? acc.concat([currentMod + 1]) : acc.concat([currentMod]);
    };
    const getModifiers = composeB(reduce(modsReducer, [-5]), fillArrayForMods);
    const getModifier = map(x => getModifiers(x)[x]);
    return getModifier(characteristic);
});

const add = curry((a, b) => a + b);
const liftedAdd = liftA2(add);
const getStrength = getPath(['baseCharacteristics', 'strength']);
const getDexterity = getPath(['baseCharacteristics', 'dexterity']);
const getIntelligence = getPath(['baseCharacteristics', 'intelligence']);
const getWisdom = getPath(['baseCharacteristics', 'wisdom']);
const getCharisma = getPath(['baseCharacteristics', 'charisma']);
const getProficiencies = getPath(['perks', 'proficiency']);
const getProficiencyBonus = getProp('proficiencyBonus');

export const getArraysOfProficiencies = compose(a => a.flat(), maybeToArray, getProficiencies);
export const isMaster = compose2(includes, (a) => a, getArraysOfProficiencies);
const calcProficiencyBonus = perk => ifElse(isMaster(perk), getProficiencyBonus, () => Just(0));

const calcPerkValueFromCharacteristic =
    curry((perk, getCharacteristic) =>
        compose(option(0), merge(liftedAdd), bimap(calcProficiencyBonus(perk), composeB(calcModifier, getCharacteristic))));
const composedPerkCalculator =
    curry((getCharacteristic, perk) =>
        composeB(calcPerkValueFromCharacteristic(perk, getCharacteristic), branch));

export const calcStrPerk = composedPerkCalculator(getStrength);
const calcDexPerk = composedPerkCalculator(getDexterity);
const calcIntPerk = composedPerkCalculator(getIntelligence);
export const calcWisPerk = composedPerkCalculator(getWisdom);
const calcCharPerk = composedPerkCalculator(getCharisma);

const perksMap = {
    athletics: calcStrPerk,
    acrobatics: calcDexPerk,
    sleightOfHand: calcDexPerk,
    stealth: calcDexPerk,
    arcana: calcIntPerk,
    history: calcIntPerk,
    investigation: calcIntPerk,
    nature: calcIntPerk,
    religion: calcIntPerk,
    animalHandling: calcWisPerk,
    insight: calcWisPerk,
    medicine: calcWisPerk,
    perception: calcWisPerk,
    survival: calcWisPerk,
    deception: calcCharPerk,
    intimidation: calcCharPerk,
    performance: calcCharPerk,
    persuasion: calcCharPerk
};

const perkNames = Object.keys(perksMap);
const perksCalculators = compose(listToArray, map(merge((fst, snd) => snd(fst))), toPairs);
const calculatorArray = perksCalculators(perksMap);
const entries = zip(perkNames, calculatorArray);
const perksModel = createStructuredSelector(Object.fromEntries(entries));

export default perksModel;
