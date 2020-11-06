import {composedPerkCalculator, isMasterConstructor, getArraysOfProficiencies} from '../basedOnBaseCharacteristics';

import {
	getCharisma,
	getWisdom,
	getIntelligence,
	getDexterity,
	getStrength
} from '../basedOnBaseCharacteristics/getters'
import getPath from 'crocks/Maybe/getPath';

const getProficiencies = getPath(['perks', 'proficiency']);
export const proficienciesGetter = getArraysOfProficiencies(getProficiencies);
const isMaster = isMasterConstructor(proficienciesGetter);

export const calcStrPerk = composedPerkCalculator(isMaster, getStrength);
const calcDexPerk = composedPerkCalculator(isMaster, getDexterity);
const calcIntPerk = composedPerkCalculator(isMaster, getIntelligence);
export const calcWisPerk = composedPerkCalculator(isMaster, getWisdom);
const calcCharPerk = composedPerkCalculator(isMaster, getCharisma);

const perksModel = {
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

export default perksModel;
