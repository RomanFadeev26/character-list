import {composeB} from 'crocks/combinators';
import {compose} from 'crocks/helpers';
import {bimap, option, map} from 'crocks/pointfree';
import {
	getStrength,
	getConstitution,
	getWisdom,
	getIntelligence,
	getDexterity,
	getCharisma
} from '../basedOnBaseCharacteristics/getters';
import {allModifiers} from './someLogic';
import branch from 'crocks/Pair/branch';

export const baseCharacteristicPair = getCharacteristic => {
    const getCharacteristicFromMaybe = composeB(option(0), getCharacteristic);
    const getModifierFromMaybe = compose(option(0), map(x => allModifiers[x]), getCharacteristic);
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
