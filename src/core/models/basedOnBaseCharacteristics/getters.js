import getPath from 'crocks/Maybe/getPath';
import getProp from 'crocks/Maybe/getProp';
import {map} from 'crocks/pointfree';
import {allModifiers} from '../baseCharacteristics/someLogic';

export const getStrength = getPath(['baseCharacteristics', 'strength']);
export const getDexterity = getPath(['baseCharacteristics', 'dexterity']);
export const getIntelligence = getPath(['baseCharacteristics', 'intelligence']);
export const getConstitution = getPath(['baseCharacteristics', 'constitution']);
export const getWisdom = getPath(['baseCharacteristics', 'wisdom']);
export const getCharisma = getPath(['baseCharacteristics', 'charisma']);

export const getProficiencyBonus = getProp('proficiencyBonus');
