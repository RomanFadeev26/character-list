import getProp from 'crocks/Maybe/getProp';
import find from 'crocks/Maybe/find';
import pick from 'crocks/helpers/pick';
import compose from 'crocks/helpers/compose';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';

import { createStructuredSelector, createSelector } from 'reselect';

const getCharacters = getProp(['entities', 'characters']);
const getCharactersPreviews = pick(['level', 'classes', 'fullName', 'race', 'photo', 'id']);

export const previews = createStructuredSelector({previews: compose(map(getCharactersPreviews), option([]), getCharacters)});

export const characters = createStructuredSelector({characters: getCharacters});

const getCharacterId = (_, props) => getProp(['match', 'params', 'id'], props);

const findCharacterById = id => find(character => character.id === id);

const characterFinder = createSelector(
    getCharacterId,
    findCharacterById
);

export const character = createSelector(
    [characters, getCharacterId],
    (characters, id) => findCharacterById(id)(characters)
);
