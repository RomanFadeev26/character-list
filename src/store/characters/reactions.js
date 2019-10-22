import { dissoc, assocPath, assoc } from 'ramda';
import * as charactersActionTypes from './actions/actionTypes';

export const fetchCharacters = (_, payload) => payload;
fetchCharacters.type = charactersActionTypes.FETCH_CHARACTERS;

export const addCharacter = (state, payload) => assoc(payload.id, payload, state);
addCharacter.type = charactersActionTypes.ADD_CHARACTER;

export const removeCharacter = (state, { id }) => dissoc(id, state);
removeCharacter.type = charactersActionTypes.REMOVE_CHARACTER;

export const changeBaseCharacterStats = (state, { id, statName, value }) => assocPath([id, 'baseCharacteristics', statName], value, state);
changeBaseCharacterStats.type = charactersActionTypes.CHANGE_CHARACTER_STATS;