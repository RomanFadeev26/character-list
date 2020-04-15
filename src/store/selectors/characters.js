import getPath from 'crocks/Maybe/getPath';

import pick from 'crocks/helpers/pick';
import compose from 'crocks/helpers/compose';
import map from 'crocks/pointfree/map';
import option from 'crocks/pointfree/option';

import { createStructuredSelector } from 'reselect';

export const getCharacters = getPath(['entities', 'characters']);
const getCharactersPreviews = pick(['level', 'classes', 'fullName', 'race', 'photo', 'id']);

export const previews = createStructuredSelector({previews: compose(map(getCharactersPreviews), option([]), getCharacters)});
