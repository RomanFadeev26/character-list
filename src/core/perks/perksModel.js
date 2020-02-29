import { createStructuredSelector } from 'reselect';

import curry from 'crocks/helpers/curry';
import getPath from 'crocks/Maybe/getPath';
import getProp from 'crocks/Maybe/getProp';
import maybeToArray from 'crocks/Maybe/maybeToArray';
import composeB from 'crocks/combinators/composeB';
import compose2 from 'crocks/combinators/compose2';
import branch from 'crocks/Pair/branch';
import merge from 'crocks/pointfree/merge';
import bimap from 'crocks/pointfree/bimap';

import includes from 'utilities/includes';

const add = curry((a, b) => a + b);
const getStrength = getPath('baseCharacteristics.strength');
const getDexterity = getPath('baseCharacteristics.dexterity');
const getIntelligence = getPath('baseCharacteristics.intelligence');
const getWisdom = getPath('baseCharacteristics.wisdom');
const getCharisma = getPath('baseCharacteristics.charisma');
const getProficiencies = getPath('perks.proficiency');
const getProficiencyBonus = getProp('proficiencyBonus');
//  String -> Character -> Bool
const isMaster = compose2(includes, (a) => a,  composeB(maybeToArray, getProficiencies));
const calcProficiencyBonus = prof => isMaster(prof) ? getProficiencyBonus : () => 0;

const calcPerkValueFromCharacteristic = getCharacteristic => composeB(merge(add), bimap(calcProficiencyBonus, getCharacteristic));
const composedPerkCalculator = getCharacteristic => composeB(calcPerkValueFromCharacteristic(getCharacteristic), branch);

const calcStrPerk = composedPerkCalculator(getStrength);
const calcDexPerk = composedPerkCalculator(getDexterity);
const calcIntPerk = composedPerkCalculator(getIntelligence);
const calcWisPerk = composedPerkCalculator(getWisdom);
const calcCharPerk = composedPerkCalculator(getCharisma);

const perksModel = createStructuredSelector({
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
});

export default perksModel;
