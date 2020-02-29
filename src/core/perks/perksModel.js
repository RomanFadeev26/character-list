import { createStructuredSelector } from 'reselect';

import curry from 'crocks/helpers/curry';
import getPath from 'crocks/Maybe/getPath';
import getProp from 'crocks/Maybe/getProp';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import {Just} from 'crocks/Maybe';
import listToArray from 'crocks/List/listToArray';
import composeB from 'crocks/combinators/composeB';
import compose from 'crocks/helpers/compose';
import liftA2 from 'crocks/helpers/liftA2';
import compose2 from 'crocks/combinators/compose2';
import branch from 'crocks/Pair/branch';
import toPairs from 'crocks/Pair/toPairs';
import merge from 'crocks/pointfree/merge';
import option from 'crocks/pointfree/option';
import bimap from 'crocks/pointfree/bimap';
import map from 'crocks/pointfree/map';
import ifElse from 'crocks/logic/ifElse';

import includes from 'utilities/includes';
import zip from 'utilities/zip';

const add = curry((a, b) => a + b);
const liftedAdd = liftA2(add);
const getStrength = getPath(['baseCharacteristics', 'strength']);
const getDexterity = getPath(['baseCharacteristics','dexterity']);
const getIntelligence = getPath(['baseCharacteristics','intelligence']);
const getWisdom = getPath(['baseCharacteristics','wisdom']);
const getCharisma = getPath(['baseCharacteristics','charisma']);
const getProficiencies = getPath(['perks','proficiency']);
const getProficiencyBonus = getProp('proficiencyBonus');

export const getArraysOfProficiencies = compose(a => a.flat(), maybeToArray, getProficiencies);
export const isMaster = compose2(includes, (a) => a,  getArraysOfProficiencies);
const calcProficiencyBonus = perk => ifElse(isMaster(perk), getProficiencyBonus, () => Just(0));

const calcPerkValueFromCharacteristic = curry((perk, getCharacteristic) => compose(option(0), merge(liftedAdd), bimap(calcProficiencyBonus(perk), getCharacteristic)));
const composedPerkCalculator = curry((getCharacteristic, perk) => composeB(calcPerkValueFromCharacteristic(perk, getCharacteristic), branch));

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
export const calculatorArray = perksCalculators(perksMap);
const entries = zip(perkNames, calculatorArray);
const perksModel = createStructuredSelector(Object.fromEntries(entries));

export default perksModel;
