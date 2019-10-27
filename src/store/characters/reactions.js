import setProp from 'crocks/helpers/setProp';
import setPath from 'crocks/helpers/setPath';

import unsetProp from 'crocks/helpers/unsetProp';
import * as charactersActionTypes from './actions/actionTypes';

export const fetchCharacters = (_, payload) => payload;

export const addCharacter = (state, payload) => setProp(payload.id, payload, state);

export const removeCharacter = (state, id) => unsetProp(id, state);

export const changeBaseCharacterStats = (state, { id, statName, value }) => setPath([id, 'baseCharacteristics', statName], value, state);

const reactions = {
    [charactersActionTypes.FETCH_CHARACTERS]: fetchCharacters,
    [charactersActionTypes.ADD_CHARACTER]: addCharacter,
    [charactersActionTypes.REMOVE_CHARACTER]: removeCharacter,
    [charactersActionTypes.CHANGE_CHARACTER_STATS]: changeBaseCharacterStats
};

export default reactions;