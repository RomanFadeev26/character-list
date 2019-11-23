import safe from 'crocks/Maybe/safe';
import isEmpty from 'crocks/predicates/isEmpty';
import getPathOr from 'crocks/helpers/getPathOr';
import pick from 'crocks/helpers/pick';
import composeB from 'crocks/combinators/composeB';
import compose from 'crocks/helpers/compose';
import not from 'crocks/logic/not';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';

import { createStructuredSelector } from 'reselect';

const isNotEmpty = not(isEmpty);

const getCharacters = composeB(safe(isNotEmpty), getPathOr(null, ['entities', 'characters']));
const getCharactersPreviews = pick(['level', 'classes', 'fullName', 'race', 'photo', 'id']);

export const previews = createStructuredSelector({previews: compose(map(getCharactersPreviews), option([]), getCharacters)});

export const characters = createStructuredSelector({characters: getCharacters});