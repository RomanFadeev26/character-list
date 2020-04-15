import getPath from "crocks/Maybe/getPath";
import getProp from "crocks/Maybe/getProp";
import {createSelector} from "reselect";
import find from "crocks/Maybe/find";
import {curry, liftA2, compose} from 'crocks/helpers';
import {compose2} from 'crocks/combinators';
import {getCharacters} from "./characters";
import {chain} from 'crocks/pointfree';

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

export default character;
