import getPath from 'crocks/Maybe/getPath';
import {getArraysOfProficiencies, isMasterConstructor, composedPerkCalculator} from '../basedOnBaseCharacteristics';

import {
	getCharisma,
	getConstitution,
	getDexterity,
	getIntelligence,
	getStrength,
	getWisdom
} from '../basedOnBaseCharacteristics/getters';

export const getSafeThrowsProficiencies = getPath(['perks', 'savingThrows']);

export const safeThrowsGetter = getArraysOfProficiencies(getSafeThrowsProficiencies);

export const isMaster = isMasterConstructor(safeThrowsGetter);

const strength = composedPerkCalculator(isMaster, getStrength);
const dexterity = composedPerkCalculator(isMaster, getDexterity);
const intelligence = composedPerkCalculator(isMaster, getIntelligence);
const wisdom = composedPerkCalculator(isMaster, getWisdom);
const charisma = composedPerkCalculator(isMaster, getCharisma);
const constitution = composedPerkCalculator(isMaster, getConstitution);

const safeThrowsModel = {
	strength,
	dexterity,
	intelligence,
	wisdom,
	charisma,
	constitution
};

export const proficienciesGetter = getArraysOfProficiencies(getSafeThrowsProficiencies);

export default safeThrowsModel;

