import {createSelector, createStructuredSelector} from 'reselect';
import getPath from 'crocks/Maybe';
import getProp from 'crocks/Maybe/getProp';
import find from 'crocks/Maybe/find';
import {compose2} from 'crocks/combinators';
import {chain, option} from 'crocks/pointfree';
import {curry, liftA2, compose} from 'crocks/helpers';
import {getCharacters} from './characters';

const getCharacterId = (_, props) => getPath(['match', 'params', 'id'], props);
const equal = curry((a,b) => a === b);

const characterFinder = compose2(liftA2(equal), a => a, getProp('id'));

const mCharacterFinder = compose(chain, find, characterFinder);

const findCharacter = (characters, finder) => finder(characters);

const getCharacter = compose2(findCharacter, a => a, mCharacterFinder);
const character = createSelector(
    getCharacters,
    getCharacterId,
    getCharacter
);

export const characterName = createSelector(
	character,
	compose(option(''), chain(getProp('fullName')))
);

export const characterLevel = createSelector(
	character,
	compose(option(0), chain(getProp('level')))
);

export const characterClasses = createSelector(
	character,
	compose(option([]), chain(getProp('classes')))
);

export const characterPersonality = createStructuredSelector({
	name: characterName,
	level: characterLevel
});

export default character;
