import {createStructuredSelector} from 'reselect';

import maybeToArray from 'crocks/Maybe/maybeToArray';
import {Just} from 'crocks/Maybe';
import listToArray from 'crocks/List/listToArray';
import {composeB, compose2} from 'crocks/combinators';
import {compose, curry} from 'crocks/helpers';
import branch from 'crocks/Pair/branch';
import toPairs from 'crocks/Pair/toPairs';
import {merge, option, bimap, map} from 'crocks/pointfree';
import ifElse from 'crocks/logic/ifElse';

import includes from '../../../utilities/includes';
import zip from '../../../utilities/zip';

import {
    getProficiencies,
    getProficiencyBonus,
    liftedAdd,
    getCharisma,
    getWisdom,
    getIntelligence,
    getDexterity,
    getStrength,
    getModifierFrom
} from "../baseCharacteristics/baseCharacteristicsModel";

export const getArraysOfProficiencies = compose(a => a.flat(), maybeToArray, getProficiencies);
export const isMaster = compose2(includes, (a) => a, getArraysOfProficiencies);
const calcProficiencyBonus = perk => ifElse(isMaster(perk), getProficiencyBonus, () => Just(0));

const calcPerkValueFromCharacteristic =
    curry((perk, getCharacteristic) =>
        compose(option(0), merge(liftedAdd), bimap(calcProficiencyBonus(perk), getModifierFrom(getCharacteristic))));
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
