import map from 'crocks/pointfree/map';
import mapProps from 'crocks/helpers/mapProps';
import asyncAxios from '../utilities/asyncAxios';
import tryCatch from 'crocks/Result/tryCatch';
import characterContract from '../core/contracts/character';
import resultToAsync from 'crocks/Async/resultToAsync';
import {CHARACTERS} from '../configs/apiRoutes';

const mapCharacterList = map(mapProps(characterContract));
const catchedMapCharacterList = tryCatch(mapCharacterList);

const fetchCharacter = (id) => asyncAxios({
    method: 'get',
    url: `${CHARACTERS}/${id}`
}).chain(resultToAsync(catchedMapCharacterList));

export default fetchCharacter;
