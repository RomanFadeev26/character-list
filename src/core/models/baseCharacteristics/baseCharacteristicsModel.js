import {composeB} from 'crocks/combinators';
import {bimap, option} from 'crocks/pointfree';
import {
	getStrength,
	getConstitution,
	getWisdom,
	getIntelligence,
	getDexterity,
	getCharisma,
	getModifierFrom
} from '../basedOnBaseCharacteristics/getters';
import branch from 'crocks/Pair/branch';

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

export default baseCharacteristicsModel;
